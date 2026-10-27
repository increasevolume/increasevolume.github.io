import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mp3Encoder } from '../lib/lamejs';
import {
  Upload,
  Volume2,
  Play,
  Pause,
  ShieldCheck,
  Zap,
  Lock,
  Download,
  RefreshCw,
  FileAudio,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import type { TranslationDictionary } from '../i18n/translations';

interface Props {
  dropzone: TranslationDictionary['dropzone'];
  studio: TranslationDictionary['studio'];
}

const NUM_WAVEFORM_BARS = 110;

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function percentToDb(percent: number): string {
  if (percent <= 0) return '-∞ dB';
  const db = 20 * Math.log10(percent / 100);
  const rounded = Math.round(db * 10) / 10;
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded.toFixed(1)} dB`;
}

function encodeWavFromAudioBuffer(buffer: AudioBuffer): Blob {
  const numChannels = Math.min(2, Math.max(1, buffer.numberOfChannels));
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const numSamples = buffer.length;
  const dataSize = numSamples * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const raw = channels[c][i];
      const sample = isFinite(raw) ? Math.max(-1, Math.min(1, raw)) : 0;
      const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, int16, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

async function encodeMp3FromAudioBuffer(
  buffer: AudioBuffer,
  onProgress?: (pct: number) => void
): Promise<Blob> {
  if (!Mp3Encoder) {
    throw new Error('MP3 encoder library failed to initialize.');
  }

  const numChannels = 2;
  const sampleRate = buffer.sampleRate;
  const kbps = 192;
  const encoder = new Mp3Encoder(numChannels, sampleRate, kbps);

  const floatTo16BitPCM = (input: Float32Array): Int16Array => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const raw = input[i];
      const s = isFinite(raw) ? Math.max(-1, Math.min(1, raw)) : 0;
      output[i] = s < 0 ? Math.round(s * 32768) : Math.round(s * 32767);
    }
    return output;
  };

  const leftPCM = floatTo16BitPCM(buffer.getChannelData(0));
  const rightPCM =
    buffer.numberOfChannels > 1 ? floatTo16BitPCM(buffer.getChannelData(1)) : leftPCM;

  const sampleBlockSize = 1152;
  const mp3Chunks: BlobPart[] = [];
  const totalSamples = leftPCM.length;
  let chunkCounter = 0;

  for (let i = 0; i < totalSamples; i += sampleBlockSize) {
    const leftChunk = leftPCM.subarray(i, Math.min(i + sampleBlockSize, totalSamples));
    const rightChunk = rightPCM.subarray(i, Math.min(i + sampleBlockSize, totalSamples));
    const mp3buf: Int8Array = encoder.encodeBuffer(leftChunk, rightChunk);

    if (mp3buf && mp3buf.length > 0) {
      const copy = new Uint8Array(mp3buf.length);
      copy.set(mp3buf);
      mp3Chunks.push(copy.buffer);
    }

    chunkCounter++;
    if (onProgress && chunkCounter % 64 === 0) {
      onProgress(Math.min(98, Math.round(((i + sampleBlockSize) / totalSamples) * 100)));
    }
    if (chunkCounter % 256 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  const endBuf: Int8Array = encoder.flush();
  if (endBuf && endBuf.length > 0) {
    const copy = new Uint8Array(endBuf.length);
    copy.set(endBuf);
    mp3Chunks.push(copy.buffer);
  }

  if (onProgress) onProgress(100);
  return new Blob(mp3Chunks, { type: 'audio/mpeg' });
}

export default function AudioBoosterIsland({ dropzone, studio }: Props) {
  const t = { dropzone, studio };
  const [audioFile, setAudioFile] = useState<{ name: string; size: number } | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Studio Controls
  const [boostPercent, setBoostPercent] = useState<number>(200);
  const [displayedPercent, setDisplayedPercent] = useState<number>(200);
  const [limiterEnabled, setLimiterEnabled] = useState<boolean>(true);
  const [compareOriginal, setCompareOriginal] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<'mp3' | 'wav'>('mp3');

  // Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Export State
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Web Audio API & Canvas Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);

  const startTimeRef = useRef<number>(0);
  const pauseOffsetRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  // Spring animation refs for 60fps Canvas & Live Counter
  const animatedGainRef = useRef<number>(2.0);
  const targetGainRef = useRef<number>(2.0);
  const downloadUrlRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
          sourceNodeRef.current.disconnect();
        } catch {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  // Smooth numeric counter animation when boostPercent changes
  useEffect(() => {
    targetGainRef.current = compareOriginal ? 1.0 : boostPercent / 100;
    let rafId: number;
    const animateCounter = () => {
      setDisplayedPercent((prev) => {
        const diff = boostPercent - prev;
        if (Math.abs(diff) < 0.8) return boostPercent;
        rafId = requestAnimationFrame(animateCounter);
        return Math.round(prev + diff * 0.28);
      });
    };
    rafId = requestAnimationFrame(animateCounter);
    return () => cancelAnimationFrame(rafId);
  }, [boostPercent, compareOriginal]);

  // Update live Web Audio API GainNode & DynamicsCompressorNode parameters smoothly
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;
    const compNode = compressorNodeRef.current;
    if (!ctx || !gainNode || !compNode) return;

    const effectiveGain = compareOriginal ? 1.0 : boostPercent / 100;
    gainNode.gain.setTargetAtTime(effectiveGain, ctx.currentTime, 0.015);

    if (limiterEnabled && !compareOriginal) {
      compNode.threshold.setTargetAtTime(-0.5, ctx.currentTime, 0.01);
      compNode.knee.setTargetAtTime(0, ctx.currentTime, 0.01);
      compNode.ratio.setTargetAtTime(20, ctx.currentTime, 0.01);
      compNode.attack.setTargetAtTime(0.001, ctx.currentTime, 0.01);
      compNode.release.setTargetAtTime(0.08, ctx.currentTime, 0.01);
    } else {
      compNode.threshold.setTargetAtTime(0, ctx.currentTime, 0.01);
      compNode.ratio.setTargetAtTime(1, ctx.currentTime, 0.01);
    }
  }, [boostPercent, limiterEnabled, compareOriginal]);

  // Extract peak amplitude buckets for 60fps dual-layer waveform
  const extractPeaks = useCallback((buffer: AudioBuffer): number[] => {
    const channelData = buffer.getChannelData(0);
    const secondChannel = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : null;
    const blockSize = Math.max(1, Math.floor(channelData.length / NUM_WAVEFORM_BARS));
    const extracted: number[] = [];

    for (let i = 0; i < NUM_WAVEFORM_BARS; i++) {
      const start = i * blockSize;
      let max = 0;
      for (let j = 0; j < blockSize && start + j < channelData.length; j += 4) {
        const s1 = Math.abs(channelData[start + j]);
        const s2 = secondChannel ? Math.abs(secondChannel[start + j]) : 0;
        const val = Math.max(s1, s2);
        if (val > max) max = val;
      }
      extracted.push(Math.max(0.05, Math.min(1, max)));
    }
    return extracted;
  }, []);

  const stopPlayback = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.onended = null;
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch {}
      sourceNodeRef.current = null;
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(
    (offsetSeconds: number) => {
      if (!audioBuffer) return;
      stopPlayback();

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = ctx.createGain();
      const effectiveGain = compareOriginal ? 1.0 : boostPercent / 100;
      gainNode.gain.value = effectiveGain;

      const compressor = ctx.createDynamicsCompressor();
      if (limiterEnabled && !compareOriginal) {
        compressor.threshold.value = -0.5;
        compressor.knee.value = 0;
        compressor.ratio.value = 20;
        compressor.attack.value = 0.001;
        compressor.release.value = 0.08;
      } else {
        compressor.threshold.value = 0;
        compressor.ratio.value = 1;
      }

      source.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(ctx.destination);

      const safeOffset = Math.max(0, Math.min(offsetSeconds, audioBuffer.duration - 0.05));
      pauseOffsetRef.current = safeOffset;
      startTimeRef.current = ctx.currentTime - safeOffset;

      source.onended = () => {
        if (isPlayingRef.current) {
          isPlayingRef.current = false;
          setIsPlaying(false);
          pauseOffsetRef.current = 0;
          setCurrentTime(0);
        }
      };

      sourceNodeRef.current = source;
      gainNodeRef.current = gainNode;
      compressorNodeRef.current = compressor;

      source.start(0, safeOffset);
      isPlayingRef.current = true;
      setIsPlaying(true);
    },
    [audioBuffer, boostPercent, compareOriginal, limiterEnabled, stopPlayback]
  );

  const togglePlayPause = () => {
    if (!audioBuffer) return;
    if (isPlaying) {
      if (audioCtxRef.current) {
        const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
        pauseOffsetRef.current = Math.min(elapsed, audioBuffer.duration);
        setCurrentTime(pauseOffsetRef.current);
      }
      stopPlayback();
    } else {
      const nextOffset =
        pauseOffsetRef.current >= audioBuffer.duration - 0.1 ? 0 : pauseOffsetRef.current;
      startPlayback(nextOffset);
    }
  };

  // Load & Decode uploaded audio file
  const handleFileSelected = async (file: File) => {
    setErrorMessage(null);
    stopPlayback();
    pauseOffsetRef.current = 0;
    setCurrentTime(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const decoded = await audioCtxRef.current.decodeAudioData(arrayBuffer);
      const extractedPeaks = extractPeaks(decoded);

      setAudioFile({ name: file.name, size: file.size });
      setAudioBuffer(decoded);
      setPeaks(extractedPeaks);
      setDuration(decoded.duration);
      setBoostPercent(200);
      setStatusMessage(t.studio.fileLoadedBadge);
    } catch (err) {
      console.error('Failed to decode audio file:', err);
      setErrorMessage(
        'Could not decode this audio file. Please select a valid MP3, WAV, M4A, FLAC, or OGG file.'
      );
    }
  };

  // Synthesize a built-in quiet acoustic & voice demo track for instant 1-click testing
  const handleLoadDemoTrack = async () => {
    setErrorMessage(null);
    stopPlayback();
    pauseOffsetRef.current = 0;
    setCurrentTime(0);

    try {
      const sampleRate = 44100;
      const demoDuration = 6.0;
      const offlineCtx = new OfflineAudioContext(2, sampleRate * demoDuration, sampleRate);
      const buffer = offlineCtx.createBuffer(2, sampleRate * demoDuration, sampleRate);

      const notes = [220, 277.18, 329.63, 440, 329.63, 277.18, 246.94, 329.63, 440, 493.88, 440, 329.63];
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        for (let i = 0; i < data.length; i++) {
          const time = i / sampleRate;
          const noteIdx = Math.min(notes.length - 1, Math.floor((time / demoDuration) * notes.length));
          const freq = notes[noteIdx] * (ch === 1 ? 1.002 : 1);
          const localTime = time % (demoDuration / notes.length);
          const env = Math.exp(-localTime * 3.8) * Math.min(1, localTime * 80);
          const wave =
            Math.sin(2 * Math.PI * freq * time) * 0.65 +
            Math.sin(4 * Math.PI * freq * time) * 0.25 +
            Math.sin(6 * Math.PI * freq * time) * 0.1;
          data[i] = wave * env * 0.26;
        }
      }

      const extractedPeaks = extractPeaks(buffer);
      setAudioFile({ name: 'quiet-studio-demo-recording.mp3', size: sampleRate * demoDuration * 4 });
      setAudioBuffer(buffer);
      setPeaks(extractedPeaks);
      setDuration(buffer.duration);
      setBoostPercent(200);
      setStatusMessage(t.studio.fileLoadedBadge);
    } catch (err) {
      console.error(err);
    }
  };

  // Real-time 60fps HTML5 Canvas Dual-Layer Waveform Visualizer with Spring Physics
  useEffect(() => {
    if (!audioBuffer || peaks.length === 0) return;
    let animationFrameId: number;

    const renderWaveform = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();
          if (
            canvas.width !== Math.floor(rect.width * dpr) ||
            canvas.height !== Math.floor(rect.height * dpr)
          ) {
            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(rect.height * dpr);
          }

          ctx.save();
          ctx.scale(dpr, dpr);
          const width = rect.width;
          const height = rect.height;
          ctx.clearRect(0, 0, width, height);

          let progressRatio = duration > 0 ? pauseOffsetRef.current / duration : 0;
          if (isPlayingRef.current && audioCtxRef.current && duration > 0) {
            const elapsed = audioCtxRef.current.currentTime - startTimeRef.current;
            const clamped = Math.max(0, Math.min(duration, elapsed));
            progressRatio = clamped / duration;
            setCurrentTime(clamped);
          }

          const desiredGain = compareOriginal ? 1.0 : boostPercent / 100;
          animatedGainRef.current += (desiredGain - animatedGainRef.current) * 0.16;
          const currentGain = animatedGainRef.current;

          const isDark = document.documentElement.classList.contains('dark');
          const centerY = height / 2;
          const maxBarHalfHeight = height * 0.44;
          const barCount = peaks.length;
          const step = width / barCount;
          const barWidth = Math.max(2.5, step * 0.62);

          if (limiterEnabled) {
            ctx.strokeStyle = isDark ? 'rgba(183, 216, 148, 0.25)' : 'rgba(32, 39, 52, 0.18)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, centerY - maxBarHalfHeight * 0.94);
            ctx.lineTo(width, centerY - maxBarHalfHeight * 0.94);
            ctx.moveTo(0, centerY + maxBarHalfHeight * 0.94);
            ctx.lineTo(width, centerY + maxBarHalfHeight * 0.94);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          for (let i = 0; i < barCount; i++) {
            const x = i * step + (step - barWidth) / 2;
            const basePeak = peaks[i];
            const barProgress = i / barCount;
            const isPlayed = barProgress <= progressRatio;

            let rawBoosted = basePeak * currentGain;
            let isClippingBar = false;
            if (limiterEnabled) {
              if (rawBoosted > 0.94) {
                rawBoosted = 0.94 + Math.tanh((rawBoosted - 0.94) * 2) * 0.04;
              }
            } else if (rawBoosted > 1.0) {
              isClippingBar = true;
              rawBoosted = 1.0;
            }

            const baseHalfH = Math.max(3, basePeak * maxBarHalfHeight);
            const boostedHalfH = Math.max(3, rawBoosted * maxBarHalfHeight);

            if (currentGain >= 1.0) {
              if (isClippingBar) {
                ctx.fillStyle = '#EF4444';
              } else if (isPlayed) {
                ctx.fillStyle = '#B7D894';
              } else {
                ctx.fillStyle = isDark ? 'rgba(183, 216, 148, 0.78)' : '#B7D894';
              }
              ctx.beginPath();
              ctx.roundRect(x, centerY - boostedHalfH, barWidth, boostedHalfH * 2, 4);
              ctx.fill();
            }

            ctx.fillStyle = isPlayed
              ? isDark
                ? '#E0F8C7'
                : '#202734'
              : isDark
              ? '#36415A'
              : 'rgba(54, 65, 90, 0.55)';
            const innerHalfH = currentGain < 1.0 ? boostedHalfH : baseHalfH;
            ctx.beginPath();
            ctx.roundRect(x, centerY - innerHalfH, barWidth, innerHalfH * 2, 4);
            ctx.fill();
          }

          if (progressRatio > 0 && progressRatio < 1) {
            const playheadX = progressRatio * width;
            ctx.strokeStyle = isDark ? '#E0F8C7' : '#202734';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(playheadX, 6);
            ctx.lineTo(playheadX, height - 6);
            ctx.stroke();
          }

          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(renderWaveform);
    };

    animationFrameId = requestAnimationFrame(renderWaveform);
    return () => cancelAnimationFrame(animationFrameId);
  }, [audioBuffer, peaks, boostPercent, limiterEnabled, compareOriginal, duration]);

  // Seek on waveform click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioBuffer || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * audioBuffer.duration;
    pauseOffsetRef.current = newTime;
    setCurrentTime(newTime);
    if (isPlaying) {
      startPlayback(newTime);
    }
  };

  // OfflineAudioContext Render + MP3/WAV Export
  const handleExportBoostedAudio = async () => {
    if (!audioBuffer || isExporting) return;
    setErrorMessage(null);
    setIsExporting(true);
    setExportProgress(10);
    setStatusMessage(t.studio.renderingProgress);

    try {
      const targetChannels = 2;
      const targetSampleRate = audioBuffer.sampleRate === 48000 ? 48000 : 44100;
      const targetLength = Math.max(1, Math.ceil(audioBuffer.duration * targetSampleRate));

      const offlineCtx = new OfflineAudioContext(
        targetChannels,
        targetLength,
        targetSampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = offlineCtx.createGain();
      gainNode.gain.value = boostPercent / 100;

      const compressor = offlineCtx.createDynamicsCompressor();
      if (limiterEnabled) {
        compressor.threshold.value = -0.5;
        compressor.knee.value = 0;
        compressor.ratio.value = 20;
        compressor.attack.value = 0.001;
        compressor.release.value = 0.08;
      } else {
        compressor.threshold.value = 0;
        compressor.ratio.value = 1;
      }

      source.connect(gainNode);
      gainNode.connect(compressor);
      compressor.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      setExportProgress(45);

      if (limiterEnabled) {
        const ceiling = 0.944;
        for (let c = 0; c < renderedBuffer.numberOfChannels; c++) {
          const chan = renderedBuffer.getChannelData(c);
          for (let i = 0; i < chan.length; i++) {
            if (chan[i] > ceiling) {
              chan[i] = ceiling + Math.tanh((chan[i] - ceiling) * 2) * (1 - ceiling);
            } else if (chan[i] < -ceiling) {
              chan[i] = -ceiling - Math.tanh((-chan[i] - ceiling) * 2) * (1 - ceiling);
            }
          }
        }
      }

      let outputBlob: Blob;
      if (outputFormat === 'mp3') {
        setStatusMessage(t.studio.encodingMp3Progress);
        outputBlob = await encodeMp3FromAudioBuffer(renderedBuffer, (pct) => {
          setExportProgress(45 + Math.round(pct * 0.55));
        });
      } else {
        outputBlob = encodeWavFromAudioBuffer(renderedBuffer);
        setExportProgress(100);
      }

      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
      const url = URL.createObjectURL(outputBlob);
      downloadUrlRef.current = url;

      const baseName = (audioFile?.name || 'audio').replace(/\.[^/.]+$/, '');
      const downloadName = `${baseName}-boosted-${boostPercent}pct.${outputFormat}`;

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 1000);

      setStatusMessage(t.studio.downloadReady);
    } catch (err) {
      console.error('Export failed:', err);
      setErrorMessage('Error exporting audio. Please try WAV format or another file.');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 900);
    }
  };

  const dbReadout = percentToDb(displayedPercent);
  const maxPeak = peaks.length > 0 ? Math.max(...peaks) : 0.5;
  const wouldClip = maxPeak * (boostPercent / 100) > 0.95;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.m4a,.flac,.ogg,.aac,.opus,.webm"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelected(file);
        }}
        className="sr-only"
        aria-label={t.dropzone.selectButton}
      />

      {/* Live Polite Status Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" role="status">
        {statusMessage} {`${boostPercent}% (${dbReadout})`}
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-5 rounded-2xl bg-red-100 dark:bg-red-950/70 border-2 border-red-600 text-red-950 dark:text-red-200 font-bold text-lg flex items-center gap-3"
        >
          <AlertTriangle className="w-7 h-7 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {!audioBuffer ? (
        /* STATE 1: OVERSIZED ACCESSIBLE DROPZONE (min-h-[360px]) */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileSelected(file);
          }}
          className={`relative min-h-[380px] md:min-h-[420px] rounded-3xl border-4 border-dashed transition-all duration-300 ease-spring flex flex-col items-center justify-center p-6 sm:p-10 md:p-14 text-center shadow-xl ${
            isDragging
              ? 'scale-[1.02] border-sage-lime bg-mint-cream dark:bg-slate-navy shadow-[0_0_40px_rgba(183,216,148,0.6)]'
              : 'border-midnight-navy/35 dark:border-mint-cream/35 bg-white dark:bg-slate-navy hover:border-midnight-navy dark:hover:border-sage-lime'
          }`}
        >
          {/* Breathing Oversized Icon (w-16 h-16 md:w-24 md:h-24) */}
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-mint-cream dark:bg-midnight-navy border-2 border-midnight-navy/20 dark:border-sage-lime/40 flex items-center justify-center mb-6 animate-studio-breath shadow-md"
            aria-hidden="true"
          >
            <Upload className="w-12 h-12 md:w-16 md:h-16 text-midnight-navy dark:text-sage-lime stroke-[2.2]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-navy dark:text-mint-cream mb-3 max-w-2xl">
            {isDragging ? t.dropzone.dragActiveTitle : t.dropzone.title}
          </h2>
          <p className="text-lg md:text-xl font-medium text-slate-navy dark:text-mint-cream/85 mb-8 max-w-xl">
            {t.dropzone.subtitle}
          </p>

          {/* Huge Primary CTA Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[64px] px-8 py-5 rounded-2xl bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy text-xl md:text-2xl font-extrabold tracking-tight shadow-lg hover:shadow-[0_0_28px_rgba(183,216,148,0.85)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-sage-lime"
          >
            <FileAudio className="w-7 h-7 md:w-8 md:h-8 shrink-0" aria-hidden="true" />
            <span>{t.dropzone.selectButton}</span>
          </button>

          {/* Instant Demo Audio Track Button */}
          <button
            type="button"
            onClick={handleLoadDemoTrack}
            className="mt-4 min-h-[48px] px-5 py-2.5 rounded-xl bg-mint-cream/80 dark:bg-midnight-navy/80 border-2 border-midnight-navy/20 dark:border-sage-lime/30 text-midnight-navy dark:text-sage-lime hover:bg-sage-lime hover:text-midnight-navy dark:hover:bg-sage-lime dark:hover:text-midnight-navy text-base md:text-lg font-bold transition-all duration-200 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-sage-lime"
          >
            <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>{t.dropzone.sampleButton}</span>
          </button>

          <p className="mt-5 text-sm md:text-base font-semibold text-slate-navy/80 dark:text-mint-cream/70">
            {t.dropzone.supportedFormats}
          </p>

          {/* 3 Big Trust Pills */}
          <div className="mt-8 pt-6 border-t-2 border-midnight-navy/10 dark:border-mint-cream/10 w-full flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="px-5 py-3 rounded-2xl bg-mint-cream dark:bg-midnight-navy border border-midnight-navy/15 dark:border-sage-lime/30 text-midnight-navy dark:text-mint-cream font-extrabold text-base md:text-lg flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-midnight-navy dark:text-sage-lime shrink-0" aria-hidden="true" />
              <span>{t.dropzone.trustPill1}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-mint-cream dark:bg-midnight-navy border border-midnight-navy/15 dark:border-sage-lime/30 text-midnight-navy dark:text-mint-cream font-extrabold text-base md:text-lg flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-midnight-navy dark:text-sage-lime shrink-0" aria-hidden="true" />
              <span>{t.dropzone.trustPill2}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-mint-cream dark:bg-midnight-navy border border-midnight-navy/15 dark:border-sage-lime/30 text-midnight-navy dark:text-mint-cream font-extrabold text-base md:text-lg flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-midnight-navy dark:text-sage-lime shrink-0" aria-hidden="true" />
              <span>{t.dropzone.trustPill3}</span>
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: INTERACTIVE BOOSTER STUDIO */
        <div className="rounded-3xl border-2 border-midnight-navy dark:border-sage-lime/40 bg-white dark:bg-slate-navy p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl transition-all duration-300 space-y-6 md:space-y-8 overflow-hidden">
          {/* Top Studio File Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-midnight-navy/15 dark:border-mint-cream/15">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy flex items-center justify-center shrink-0 shadow-md">
                <Volume2 className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sage-lime text-midnight-navy text-xs font-black tracking-wider uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-midnight-navy animate-ping shrink-0" />
                  <span className="truncate">{t.studio.fileLoadedBadge}</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-midnight-navy dark:text-mint-cream truncate">
                  {audioFile?.name}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto min-h-[50px] px-5 py-3 rounded-2xl border-2 border-midnight-navy dark:border-mint-cream/30 bg-mint-alabaster dark:bg-midnight-navy text-midnight-navy dark:text-mint-cream hover:bg-sage-lime dark:hover:bg-sage-lime dark:hover:text-midnight-navy font-bold text-base md:text-lg flex items-center justify-center gap-2.5 shrink-0 transition-all"
            >
              <RefreshCw className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.studio.changeFileButton}</span>
            </button>
          </div>

          {/* 1. Interactive 60fps Animated Waveform Player + A/B Compare Toggle */}
          <div className="rounded-3xl bg-mint-alabaster dark:bg-midnight-navy border-2 border-midnight-navy/20 dark:border-mint-cream/20 p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm md:text-base font-bold">
                <span className="inline-flex items-center gap-2 text-slate-navy dark:text-mint-cream">
                  <span className="w-3.5 h-3.5 rounded-sm bg-slate-navy dark:bg-mint-cream inline-block shrink-0" />
                  <span>{t.studio.waveformLegendOriginal}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-midnight-navy dark:text-sage-lime">
                  <span className="w-3.5 h-3.5 rounded-sm bg-sage-lime border border-midnight-navy inline-block shrink-0" />
                  <span>{t.studio.waveformLegendBoosted}</span>
                </span>
              </div>

              {/* A/B Compare Original vs. Boosted Toggle */}
              <button
                type="button"
                onClick={() => setCompareOriginal((prev) => !prev)}
                aria-pressed={compareOriginal}
                className={`w-full md:w-auto min-h-[46px] px-4 py-2.5 rounded-xl font-extrabold text-sm md:text-base border-2 transition-all flex items-center justify-center gap-2 shrink-0 ${
                  compareOriginal
                    ? 'bg-slate-navy text-mint-cream border-mint-cream'
                    : 'bg-sage-lime text-midnight-navy border-midnight-navy'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {compareOriginal ? t.studio.compareOriginalActive : t.studio.compareBoostedActive}
                </span>
              </button>
            </div>

            {/* 60fps Dual-Layer Waveform Canvas */}
            <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-2xl bg-white dark:bg-slate-navy/60 border-2 border-midnight-navy/15 dark:border-mint-cream/15 overflow-hidden cursor-pointer">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                aria-label="Interactive 60fps Audio Waveform Visualizer - Click to seek playback position"
                className="w-full h-full block"
              />
            </div>

            {/* Playback Transport & Scrub Bar */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? t.studio.pauseButton : t.studio.playButton}
                className="min-h-[54px] px-6 py-3 rounded-2xl bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy font-extrabold text-base sm:text-lg md:text-xl flex items-center gap-3 shadow-md hover:scale-[1.02] transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6 fill-current shrink-0" aria-hidden="true" />
                    <span>{t.studio.pauseButton}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-current shrink-0" aria-hidden="true" />
                    <span>{t.studio.playButton}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 sm:gap-3 font-mono text-base sm:text-lg md:text-xl font-black text-midnight-navy dark:text-mint-cream">
                <span>{formatTime(currentTime)}</span>
                <span className="opacity-40">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* 2. Giant Volume Boost Slider (0% to 500%) & Live Decibel Counter */}
          <div className="rounded-3xl bg-mint-cream/55 dark:bg-midnight-navy/90 border-2 border-midnight-navy/20 dark:border-sage-lime/35 p-5 sm:p-6 md:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="min-w-0">
                <label
                  htmlFor="master-volume-slider"
                  className="block text-xl sm:text-2xl md:text-3xl font-extrabold text-midnight-navy dark:text-mint-cream"
                >
                  {t.studio.volumeControlTitle}
                </label>
                {/* Glowing Anti-Clipping Status Indicator */}
                <div className="mt-2 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold">
                  {limiterEnabled ? (
                    <span className="inline-flex items-center gap-2 text-midnight-navy dark:text-sage-lime">
                      <span className="w-3 h-3 rounded-full bg-sage-lime ring-4 ring-sage-lime/40 animate-pulse shrink-0" />
                      <span>{wouldClip ? t.studio.statusLimiting : t.studio.statusClean}</span>
                    </span>
                  ) : wouldClip ? (
                    <span className="inline-flex items-center gap-2 text-red-700 dark:text-red-400">
                      <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>{t.studio.statusClippingRisk}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-slate-navy dark:text-mint-cream">
                      <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>{t.studio.statusClean}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Big Typography Live Decibel & Percentage Readout */}
              <div
                aria-live="polite"
                className="px-5 py-3.5 rounded-2xl bg-midnight-navy dark:bg-slate-navy border-2 border-sage-lime text-mint-cream dark:text-sage-lime font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-center shadow-lg shrink-0"
              >
                <span>{displayedPercent}%</span>
                <span className="mx-2.5 text-sage-lime/60 text-xl sm:text-2xl md:text-3xl">/</span>
                <span className="text-sage-lime">{dbReadout}</span>
              </div>
            </div>

            {/* Oversized Range Input (0% to 500%) */}
            <div className="py-2">
              <input
                id="master-volume-slider"
                type="range"
                min={0}
                max={500}
                step={5}
                value={boostPercent}
                aria-label={t.studio.volumeSliderAria}
                aria-valuemin={0}
                aria-valuemax={500}
                aria-valuenow={boostPercent}
                aria-valuetext={`${boostPercent}% (${dbReadout})`}
                onChange={(e) => {
                  setCompareOriginal(false);
                  setBoostPercent(Number(e.target.value));
                }}
                style={{
                  background: `linear-gradient(to right, #B7D894 0%, #B7D894 ${(boostPercent / 500) * 100}%, #36415A ${(boostPercent / 500) * 100}%, #36415A 100%)`,
                }}
                className="w-full studio-volume-slider"
              />
              <div className="flex justify-between text-xs sm:text-sm md:text-base font-extrabold text-slate-navy dark:text-mint-cream/80 mt-3 px-1">
                <span>
                  0% <span className="hidden md:inline">(Mute)</span>
                </span>
                <span>
                  100% <span className="hidden md:inline">(0.0 dB)</span>
                </span>
                <span>
                  200% <span className="hidden md:inline">(+6.0 dB)</span>
                </span>
                <span>
                  300% <span className="hidden md:inline">(+9.5 dB)</span>
                </span>
                <span>
                  500% <span className="hidden md:inline">(+14.0 dB)</span>
                </span>
              </div>
            </div>

            {/* 4 Big One-Click Preset Buttons */}
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-midnight-navy dark:text-mint-cream mb-3">
                {t.studio.presetsTitle}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { value: 150, label: t.studio.preset150, db: '+3.5 dB' },
                  { value: 200, label: t.studio.preset200, db: '+6.0 dB' },
                  { value: 300, label: t.studio.preset300, db: '+9.5 dB' },
                  { value: 500, label: t.studio.preset500, db: '+14.0 dB' },
                ].map((preset) => {
                  const isActive = boostPercent === preset.value && !compareOriginal;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => {
                        setCompareOriginal(false);
                        setBoostPercent(preset.value);
                      }}
                      aria-pressed={isActive}
                      className={`min-h-[60px] px-4 py-3 rounded-2xl border-2 font-extrabold text-base sm:text-lg md:text-xl transition-all flex flex-col items-center justify-center ${
                        isActive
                          ? 'bg-sage-lime text-midnight-navy border-midnight-navy shadow-md scale-[1.01]'
                          : 'bg-white dark:bg-slate-navy text-midnight-navy dark:text-mint-cream border-midnight-navy/20 dark:border-mint-cream/25 hover:border-sage-lime'
                      }`}
                    >
                      <span className="whitespace-nowrap">{preset.label}</span>
                      <span className="text-xs font-mono font-bold opacity-80 mt-0.5">
                        {preset.db}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Anti-Clipping Smart Limiter (Prevent Distortion) Toggle Switch - Fully Responsive on Mobile/Tablet */}
          <div className="rounded-3xl bg-mint-alabaster dark:bg-midnight-navy border-2 border-midnight-navy/20 dark:border-mint-cream/20 p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 overflow-hidden">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-start sm:items-center gap-3">
                <ShieldCheck
                  className="w-6 h-6 sm:w-7 sm:h-7 text-midnight-navy dark:text-sage-lime shrink-0 mt-0.5 sm:mt-0"
                  aria-hidden="true"
                />
                <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-midnight-navy dark:text-mint-cream leading-snug break-words">
                  {t.studio.limiterTitle}
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-medium text-slate-navy dark:text-mint-cream/80 break-words">
                {t.studio.limiterDesc}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={limiterEnabled}
              aria-label={t.studio.limiterTitle}
              onClick={() => setLimiterEnabled((prev) => !prev)}
              className={`w-full lg:w-auto min-h-[54px] px-5 py-3 rounded-2xl border-2 font-extrabold text-sm sm:text-base md:text-lg shrink-0 transition-all flex items-center justify-center gap-2.5 ${
                limiterEnabled
                  ? 'bg-sage-lime text-midnight-navy border-midnight-navy shadow-md'
                  : 'bg-white dark:bg-slate-navy text-slate-navy dark:text-mint-cream border-midnight-navy/30'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                  limiterEnabled ? 'bg-midnight-navy' : 'bg-slate-navy/40 dark:bg-mint-cream/40'
                }`}
              />
              <span className="truncate">
                {limiterEnabled ? t.studio.limiterActiveBadge : t.studio.limiterBypassedBadge}
              </span>
            </button>
          </div>

          {/* 4. Output Format Selector (.MP3 or .WAV) + Giant Download Boosted Audio CTA */}
          <div className="pt-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-3">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-midnight-navy dark:text-mint-cream shrink-0">
                {t.studio.outputFormatLabel}:
              </span>
              <div className="grid grid-cols-2 sm:inline-flex rounded-2xl p-1.5 bg-mint-cream dark:bg-midnight-navy border-2 border-midnight-navy/20 dark:border-mint-cream/20">
                <button
                  type="button"
                  onClick={() => setOutputFormat('mp3')}
                  aria-pressed={outputFormat === 'mp3'}
                  className={`min-h-[46px] px-4 sm:px-5 py-2 rounded-xl font-extrabold text-sm sm:text-base md:text-lg whitespace-nowrap transition-all ${
                    outputFormat === 'mp3'
                      ? 'bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy shadow'
                      : 'text-midnight-navy dark:text-mint-cream hover:opacity-80'
                  }`}
                >
                  {t.studio.formatMp3}
                </button>
                <button
                  type="button"
                  onClick={() => setOutputFormat('wav')}
                  aria-pressed={outputFormat === 'wav'}
                  className={`min-h-[46px] px-4 sm:px-5 py-2 rounded-xl font-extrabold text-sm sm:text-base md:text-lg whitespace-nowrap transition-all ${
                    outputFormat === 'wav'
                      ? 'bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy shadow'
                      : 'text-midnight-navy dark:text-mint-cream hover:opacity-80'
                  }`}
                >
                  {t.studio.formatWav}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 lg:justify-end">
              <button
                type="button"
                onClick={handleExportBoostedAudio}
                disabled={isExporting}
                className="w-full lg:w-auto relative overflow-hidden min-h-[62px] px-7 py-4 sm:py-5 rounded-2xl bg-midnight-navy dark:bg-sage-lime text-mint-cream dark:text-midnight-navy text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight shadow-xl hover:shadow-[0_0_28px_rgba(183,216,148,0.85)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-75"
              >
                {isExporting && (
                  <span
                    style={{ width: `${exportProgress}%` }}
                    className="absolute left-0 top-0 bottom-0 bg-sage-lime/35 dark:bg-midnight-navy/25 transition-all duration-150"
                  />
                )}
                <Download className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 relative z-10" aria-hidden="true" />
                <span className="relative z-10 truncate">
                  {isExporting ? `${statusMessage} (${exportProgress}%)` : t.studio.downloadButton}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
