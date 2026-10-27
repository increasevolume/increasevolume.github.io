export type LangCode = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh' | 'ru';

export interface LanguageOption {
  code: LangCode;
  badge: string;
  label: string;
  path: string;
  hreflang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', badge: 'US', label: 'English', path: '/', hreflang: 'en' },
  { code: 'es', badge: 'ES', label: 'Español', path: '/es/', hreflang: 'es' },
  { code: 'pt', badge: 'BR', label: 'Português', path: '/pt/', hreflang: 'pt' },
  { code: 'de', badge: 'DE', label: 'Deutsch', path: '/de/', hreflang: 'de' },
  { code: 'fr', badge: 'FR', label: 'Français', path: '/fr/', hreflang: 'fr' },
  { code: 'ja', badge: 'JP', label: '日本語', path: '/ja/', hreflang: 'ja' },
  { code: 'zh', badge: 'CN', label: '简体中文', path: '/zh/', hreflang: 'zh' },
  { code: 'ru', badge: 'RU', label: 'Русский', path: '/ru/', hreflang: 'ru' },
];

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  breadcrumbs: {
    home: string;
    current: string;
  };
  nav: {
    brand: string;
    tagline: string;
    languageLabel: string;
    themeToggleLight: string;
    themeToggleDark: string;
    installPwa: string;
    installPwaAria: string;
    supportDev: string;
    supportDevAria: string;
    iosInstallTitle: string;
    iosInstallStep1: string;
    iosInstallStep2: string;
    iosInstallClose: string;
  };
  hero: {
    badge: string;
    h1: string;
    subtitle: string;
  };
  dropzone: {
    title: string;
    subtitle: string;
    selectButton: string;
    dragActiveTitle: string;
    supportedFormats: string;
    sampleButton: string;
    trustPill1: string;
    trustPill2: string;
    trustPill3: string;
  };
  studio: {
    fileLoadedBadge: string;
    changeFileButton: string;
    playButton: string;
    pauseButton: string;
    compareToggleLabel: string;
    compareOriginalActive: string;
    compareBoostedActive: string;
    waveformLegendOriginal: string;
    waveformLegendBoosted: string;
    volumeControlTitle: string;
    volumeSliderAria: string;
    presetsTitle: string;
    preset150: string;
    preset200: string;
    preset300: string;
    preset500: string;
    limiterTitle: string;
    limiterDesc: string;
    limiterActiveBadge: string;
    limiterBypassedBadge: string;
    statusClean: string;
    statusLimiting: string;
    statusClippingRisk: string;
    outputFormatLabel: string;
    formatMp3: string;
    formatWav: string;
    downloadButton: string;
    renderingProgress: string;
    encodingMp3Progress: string;
    downloadReady: string;
    resetButton: string;
  };
  howTo: {
    sectionTitle: string;
    sectionSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  features: {
    limiterHeading: string;
    limiterParagraph1: string;
    limiterParagraph2: string;
    limiterBullet1: string;
    limiterBullet2: string;
    limiterBullet3: string;
    privacyHeading: string;
    privacyParagraph1: string;
    privacyParagraph2: string;
    privacyStat1Label: string;
    privacyStat1Value: string;
    privacyStat2Label: string;
    privacyStat2Value: string;
    privacyStat3Label: string;
    privacyStat3Value: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    description: string;
    QuickLinks: string;
    languagesHeading: string;
    builtWith: string;
    supportCta: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<LangCode, TranslationDictionary> = {
  en: {
    meta: {
      title: 'Increase Audio Volume Online | Free MP3 Volume Booster (100% Client-Side)',
      description:
        'Increase volume of audio and MP3 files online up to 500% (+14 dB) for free. Learn how to increase audio volume without distortion using our 100% client-side MP3 volume booster with smart anti-clipping limiter.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3',
    },
    breadcrumbs: {
      home: 'Home',
      current: 'Increase Audio Volume Online',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: '500% Studio Audio Booster',
      languageLabel: 'Select Language',
      themeToggleLight: 'Switch to Light Mode',
      themeToggleDark: 'Switch to Dark Mode',
      installPwa: 'Add to Home Screen',
      installPwaAria: 'Install IncreaseVolume Progressive Web App to Home Screen',
      supportDev: 'Support the Developer',
      supportDevAria: 'Support the Developer on Ko-fi',
      iosInstallTitle: 'Install IncreaseVolume App',
      iosInstallStep1: '1. Tap the Share button in your Safari toolbar.',
      iosInstallStep2: '2. Scroll down and tap "Add to Home Screen" for instant offline access.',
      iosInstallClose: 'Got It',
    },
    hero: {
      badge: '100% Client-Side Web Audio Engine • Up to 500% (+14.0 dB)',
      h1: 'Increase Audio Volume Online',
      subtitle:
        'Amplify quiet MP3, WAV, M4A, FLAC, and OGG recordings up to 500% directly inside your browser. Zero server uploads, real-time 60fps waveform preview, and a smart anti-clipping peak limiter.',
    },
    dropzone: {
      title: 'Drop your quiet audio file here to boost volume',
      subtitle: 'Or click below to browse from your device, recorder, or phone',
      selectButton: 'Select Audio File (MP3, WAV, M4A)',
      dragActiveTitle: 'Release to Load Audio into Studio Booster!',
      supportedFormats: 'Supports MP3, WAV, M4A, FLAC, OGG, AAC • Unlimited File Size • 100% Local Processing',
      sampleButton: 'Try with Built-in Demo Voice & Acoustic Track',
      trustPill1: '100% Offline & Private',
      trustPill2: 'Up to 500% Volume Boost',
      trustPill3: 'Zero Distortion Limiter',
    },
    studio: {
      fileLoadedBadge: 'STUDIO MASTERING ENGINE READY',
      changeFileButton: 'Load Another Audio File',
      playButton: 'Play Preview',
      pauseButton: 'Pause Preview',
      compareToggleLabel: 'A/B Compare Mode:',
      compareOriginalActive: 'Listening: Original (100%)',
      compareBoostedActive: 'Listening: Boosted Master',
      waveformLegendOriginal: 'Original Baseline (100%)',
      waveformLegendBoosted: 'Boosted Output Amplitude',
      volumeControlTitle: 'Master Volume Boost Level',
      volumeSliderAria: 'Master Volume Boost Percentage Slider (0% to 500%)',
      presetsTitle: 'One-Click Studio Boost Presets',
      preset150: '150% Gentle',
      preset200: '200% Double',
      preset300: '300% Voice',
      preset500: '500% Max',
      limiterTitle: 'Anti-Clipping Smart Limiter (Prevent Distortion)',
      limiterDesc: 'Engages a -0.5 dB brickwall ceiling compressor so loud peaks never crackle or clip.',
      limiterActiveBadge: 'SMART LIMITER ON (-0.5 dB)',
      limiterBypassedBadge: 'SMART LIMITER OFF',
      statusClean: 'Clean Headroom • Zero Clipping Detected',
      statusLimiting: 'Smart Anti-Clipping Active • Protecting Peaks at -0.5 dB',
      statusClippingRisk: 'High Gain Warning • Enable Smart Limiter to Prevent Distortion',
      outputFormatLabel: 'Export Audio Format',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (Lossless)',
      downloadButton: 'Download Boosted Audio',
      renderingProgress: 'Rendering OfflineAudioContext Master...',
      encodingMp3Progress: 'Encoding High-Bitrate MP3 Stream...',
      downloadReady: 'Boosted Audio Exported Successfully!',
      resetButton: 'Start Over',
    },
    howTo: {
      sectionTitle: 'How to Increase Audio Volume Online in 3 Steps',
      sectionSubtitle:
        'Whether you need to rescue a quiet lecture, amplify a voice memo, or increase MP3 volume for your car stereo, our client-side volume increase MP3 studio completes the job in seconds.',
      step1Title: '1. Select Your Audio File (MP3, WAV, M4A, FLAC)',
      step1Desc:
        'Click "Select Audio File" or drag and drop your recording into the oversized dropzone. Because our audio sound increase engine runs 100% locally via the Web Audio API, your file opens instantaneously without uploading a single byte to the cloud.',
      step2Title: '2. Adjust the Volume Increase Slider up to 500% (+14 dB)',
      step2Desc:
        'Drag the oversized slider or tap a one-click preset (150% Gentle, 200% Double, 300% Podcast/Voice, or 500% Max Boost). Watch the 60fps dual-layer waveform expand in real time while toggling A/B comparison to hear how you increase volume MP3 and WAV tracks cleanly.',
      step3Title: '3. Enable Smart Anti-Clipping & Download Boosted Audio',
      step3Desc:
        'Keep the Anti-Clipping Smart Limiter checked to prevent harsh digital distortion, choose .MP3 or lossless .WAV output, and click "Download Boosted Audio" to save your amplified file immediately.',
    },
    features: {
      limiterHeading: 'Increase MP3 Volume Without Distortion (Smart Peak Limiter)',
      limiterParagraph1:
        'When you increase volume of audio using basic gain boosters, any waveform peak that crosses 0.0 dBFS gets brutally chopped off—resulting in harsh digital crackling and ear-fatiguing clipping. Traditional tools force you to choose between quiet dialog and distorted peaks.',
      limiterParagraph2:
        'IncreaseVolume solves this by chaining a high-precision Web Audio GainNode directly into a studio-grade DynamicsCompressorNode configured as a fast-attack brickwall limiter at -0.5 dB. When you increase MP3 volume to 200%, 300%, or even 500% (+14.0 dB), quiet spoken words and soft acoustic details are lifted dramatically while sudden laughs, plosives, or drum hits are transparently cushioned below the clipping threshold.',
      limiterBullet1: 'Brickwall Ceiling at -0.5 dB: Prevents 0 dBFS digital clipping across all boost levels.',
      limiterBullet2: '60fps Dual-Layer Waveform: Visually inspect how boosted amplitude compares against your original baseline.',
      limiterBullet3: 'Real-Time A/B Bypass Switch: Audition Original (100%) vs. Boosted output seamlessly during playback.',
      privacyHeading: '100% Client-Side Privacy: Why Local Web Audio Processing Matters',
      privacyParagraph1:
        'Most volume increase online websites require you to upload your private voice recordings, unreleased podcasts, legal interviews, or personal music tracks to remote cloud servers, wait in a processing queue, and download a re-compressed file.',
      privacyParagraph2:
        'IncreaseVolume is architected as a 100% client-side Progressive Web App (PWA). Every stage—from decoding your file via AudioContext.decodeAudioData() to rendering the boosted master via OfflineAudioContext and encoding the final MP3 or WAV—executes strictly inside your device’s RAM and CPU. Once loaded, you can disconnect from Wi-Fi or install the app to your Home Screen and increase audio volume completely offline.',
      privacyStat1Label: 'Server Uploads',
      privacyStat1Value: '0 Bytes (100% Local)',
      privacyStat2Label: 'Maximum Boost Gain',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'Offline PWA Support',
      privacyStat3Value: 'iOS, Android & Desktop',
    },
    faq: {
      title: 'Frequently Asked Questions: Increase Volume of Audio & MP3',
      subtitle: 'Everything you need to know about how to increase audio volume safely, privately, and without losing sound quality.',
      items: [
        {
          q: 'How can I increase the volume of an audio file online for free?',
          a: 'Simply open IncreaseVolume, click "Select Audio File" to load your MP3, WAV, M4A, FLAC, or OGG recording, slide the volume booster up to 500% (+14 dB), and click "Download Boosted Audio". It is 100% free with no watermarks, sign-ups, or file size limits.',
        },
        {
          q: 'How do I increase MP3 volume without causing distortion or crackling?',
          a: 'Leave the "Anti-Clipping Smart Limiter (Prevent Distortion)" switch turned ON (enabled by default). It uses a studio-grade Web Audio DynamicsCompressorNode with a -0.5 dB ceiling and 20:1 compression ratio to catch loud transients while allowing quiet speech and music details to be amplified cleanly.',
        },
        {
          q: 'Is my audio uploaded to any server when I use this volume increase online tool?',
          a: 'No. Your audio files never leave your device. All decoding, real-time waveform previewing, dynamic limiting, and MP3/WAV encoding happen 100% inside your web browser using the HTML5 Web Audio API.',
        },
        {
          q: 'What is the decibel (dB) equivalent of 150%, 200%, 300%, and 500% volume boost?',
          a: 'In acoustic amplitude terms: 100% is 0.0 dB (original unity gain), 150% is +3.5 dB (gentle loudness lift), 200% is +6.0 dB (doubles perceived waveform height), 300% is +9.5 dB (ideal for quiet podcasts, lectures, and voice memos), and 500% is +14.0 dB (maximum rescue amplification).',
        },
        {
          q: 'Should I export my boosted audio as .MP3 or .WAV?',
          a: 'Choose .MP3 (192 kbps) if you want a compact, universally compatible file to share on messaging apps, podcast hosts, or mobile devices. Choose .WAV (16-bit lossless PCM) if you are editing video or audio in a DAW and want zero generation loss.',
        },
        {
          q: 'Can I install IncreaseVolume on my phone or computer for offline use?',
          a: 'Yes! Click the "Add to Home Screen" button in the top navigation bar. Because IncreaseVolume is a full Progressive Web App (PWA) with Service Worker caching, it works completely offline on Windows, macOS, Linux, Android, and iOS.',
        },
      ],
    },
    footer: {
      description:
        'Free, 100% client-side online audio & MP3 volume booster powered by the Web Audio API. Amplify quiet recordings up to 500% (+14 dB) with zero distortion and complete privacy.',
      QuickLinks: 'Studio Navigation',
      languagesHeading: 'Available in 8 Languages',
      builtWith: 'Engineered with Astro, React Islands & Web Audio API',
      supportCta: 'Support the Developer on Ko-fi',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). Released under the MIT License.',
    },
  },
  es: {
    meta: {
      title: 'Aumentar Volumen de Audio Online | Amplificador de Volumen MP3 Gratis',
      description:
        'Aumenta el volumen de archivos de audio y MP3 online hasta un 500% (+14 dB) gratis. Aprende cómo subir el volumen de un audio sin distorsión 100% en tu navegador.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, aumentar volumen audio, subir volumen mp3',
    },
    breadcrumbs: {
      home: 'Inicio',
      current: 'Aumentar Volumen de Audio Online',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: 'Amplificador de Audio 500%',
      languageLabel: 'Seleccionar idioma',
      themeToggleLight: 'Cambiar a modo claro',
      themeToggleDark: 'Cambiar a modo oscuro',
      installPwa: 'Añadir a Inicio',
      installPwaAria: 'Instalar aplicación web IncreaseVolume en la pantalla de inicio',
      supportDev: 'Apoyar al Creador',
      supportDevAria: 'Apoyar al desarrollador en Ko-fi',
      iosInstallTitle: 'Instalar App IncreaseVolume',
      iosInstallStep1: '1. Toca el botón Compartir en la barra de Safari.',
      iosInstallStep2: '2. Selecciona "Añadir a la pantalla de inicio" para usar sin conexión.',
      iosInstallClose: 'Entendido',
    },
    hero: {
      badge: 'Motor Web Audio 100% Local • Hasta 500% (+14.0 dB)',
      h1: 'Aumentar Volumen de Audio Online',
      subtitle:
        'Amplifica grabaciones silenciosas MP3, WAV, M4A, FLAC y OGG hasta un 500% directamente en tu navegador. Cero subidas al servidor, onda en tiempo real a 60fps y limitador inteligente antidistorsión.',
    },
    dropzone: {
      title: 'Arrastra tu archivo de audio aquí para subir el volumen',
      subtitle: 'O haz clic abajo para elegir un archivo desde tu dispositivo',
      selectButton: 'Seleccionar Archivo de Audio (MP3, WAV, M4A)',
      dragActiveTitle: '¡Suelta para cargar el audio en el Estudio!',
      supportedFormats: 'Soporta MP3, WAV, M4A, FLAC, OGG • Sin límite de tamaño • 100% Privado',
      sampleButton: 'Probar con pista de demostración integrada',
      trustPill1: '100% Offline y Privado',
      trustPill2: 'Aumento hasta 500%',
      trustPill3: 'Limitador Cero Distorsión',
    },
    studio: {
      fileLoadedBadge: 'ESTUDIO DE MASTERIZACIÓN LISTO',
      changeFileButton: 'Cambiar Archivo de Audio',
      playButton: 'Reproducir',
      pauseButton: 'Pausar',
      compareToggleLabel: 'Comparación A/B:',
      compareOriginalActive: 'Escuchando: Original (100%)',
      compareBoostedActive: 'Escuchando: Audio Amplificado',
      waveformLegendOriginal: 'Onda Original (100%)',
      waveformLegendBoosted: 'Onda Amplificada',
      volumeControlTitle: 'Nivel de Aumento de Volumen',
      volumeSliderAria: 'Control deslizante de porcentaje de aumento de volumen (0% a 500%)',
      presetsTitle: 'Ajustes Rápidos en Un Clic',
      preset150: '150% Suave',
      preset200: '200% Doble',
      preset300: '300% Voz',
      preset500: '500% Máx',
      limiterTitle: 'Limitador Inteligente Anti-Clipping (Evitar Distorsión)',
      limiterDesc: 'Activa un techo compresor a -0.5 dB para evitar saturación en picos altos.',
      limiterActiveBadge: 'LIMITADOR ACTIVO (-0.5 dB)',
      limiterBypassedBadge: 'LIMITADOR INACTIVO',
      statusClean: 'Rango Dinámico Limpio • Cero Saturación',
      statusLimiting: 'Limitador Inteligente Activo • Protegiendo Picos a -0.5 dB',
      statusClippingRisk: 'Aviso de Ganancia Alta • Activa el Limitador para evitar distorsión',
      outputFormatLabel: 'Formato de Salida',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (Sin Pérdida)',
      downloadButton: 'Descargar Audio Amplificado',
      renderingProgress: 'Procesando audio amplificado...',
      encodingMp3Progress: 'Codificando archivo MP3...',
      downloadReady: '¡Audio amplificado descargado con éxito!',
      resetButton: 'Reiniciar',
    },
    howTo: {
      sectionTitle: 'Cómo Aumentar el Volumen de un Audio Online en 3 Pasos',
      sectionSubtitle:
        'Amplifica notas de voz, conferencias o música MP3 en segundos directamente desde tu navegador sin perder calidad.',
      step1Title: '1. Selecciona tu archivo de audio (MP3, WAV, M4A, FLAC)',
      step1Desc:
        'Haz clic en "Seleccionar Archivo de Audio" o arrastra tu grabación. El procesamiento ocurre 100% en tu dispositivo sin subir nada a internet.',
      step2Title: '2. Ajusta el aumento de volumen hasta 500% (+14 dB)',
      step2Desc:
        'Desliza el control gigante o elige un ajuste preestablecido (150%, 200%, 300% o 500%) mientras visualizas la onda a 60fps en tiempo real.',
      step3Title: '3. Activa el Limitador Inteligente y Descarga en MP3 o WAV',
      step3Desc:
        'Mantén activado el limitador anti-clipping para evitar distorsiones, elige formato .MP3 o .WAV y descarga tu archivo al instante.',
    },
    features: {
      limiterHeading: 'Subir Volumen MP3 Sin Distorsión (Limitador de Picos Inteligente)',
      limiterParagraph1:
        'Los amplificadores básicos recortan las ondas cuando superan los 0.0 dBFS, generando ruidos molestos. IncreaseVolume protege tu audio automáticamente.',
      limiterParagraph2:
        'Nuestro motor conecta un GainNode con un DynamicsCompressorNode calibrado a -0.5 dB para elevar voces bajas hasta un 500% manteniendo los picos fuertes bajo control.',
      limiterBullet1: 'Techo Brickwall a -0.5 dB: Previene la saturación digital en todos los niveles.',
      limiterBullet2: 'Visualizador de Doble Capa a 60fps: Compara visualmente la amplitud original frente a la amplificada.',
      limiterBullet3: 'Comparación A/B en Vivo: Alterna entre el audio original y el amplificado durante la reproducción.',
      privacyHeading: 'Privacidad 100% Local: Procesamiento Web Audio en tu Navegador',
      privacyParagraph1:
        'No arriesgues tus grabaciones privadas subiéndolas a servidores externos. Todo se procesa localmente en la memoria de tu dispositivo.',
      privacyParagraph2:
        'Como Aplicación Web Progresiva (PWA), puedes instalar IncreaseVolume en tu móvil o PC y subir el volumen de cualquier audio sin conexión a internet.',
      privacyStat1Label: 'Subidas al Servidor',
      privacyStat1Value: '0 Bytes (100% Local)',
      privacyStat2Label: 'Ganancia Máxima',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'Soporte Offline PWA',
      privacyStat3Value: 'iOS, Android y PC',
    },
    faq: {
      title: 'Preguntas Frecuentes sobre Aumentar Volumen de Audio y MP3',
      subtitle: 'Respuestas claras sobre cómo amplificar archivos de sonido gratis y sin distorsión.',
      items: [
        {
          q: '¿Cómo puedo aumentar el volumen de un audio online gratis?',
          a: 'Carga tu archivo MP3, WAV, M4A, FLAC u OGG en IncreaseVolume, ajusta el deslizador hasta 500% (+14 dB) y pulsa "Descargar Audio Amplificado". Es 100% gratuito.',
        },
        {
          q: '¿Cómo subir el volumen de un MP3 sin que suene distorsionado?',
          a: 'Deja activado el "Limitador Inteligente Anti-Clipping". Este compresor limita los picos a -0.5 dB para evitar que el sonido sature.',
        },
        {
          q: '¿Mis archivos de audio se suben a algún servidor?',
          a: 'Nunca. Todo el procesamiento se realiza dentro de tu navegador mediante la API Web Audio.',
        },
        {
          q: '¿Qué formato debo elegir al exportar: MP3 o WAV?',
          a: 'Elige .MP3 (192 kbps) para un archivo ligero y compatible con cualquier reproductor, o .WAV (16-bit PCM) para máxima calidad sin pérdidas.',
        },
      ],
    },
    footer: {
      description:
        'Amplificador de volumen de audio y MP3 online 100% local y gratuito. Sube el volumen hasta un 500% (+14 dB) sin distorsión.',
      QuickLinks: 'Navegación',
      languagesHeading: 'Disponible en 8 Idiomas',
      builtWith: 'Desarrollado con Astro, React Islands y Web Audio API',
      supportCta: 'Apoyar al Desarrollador en Ko-fi',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). Bajo Licencia MIT.',
    },
  },
  pt: {
    meta: {
      title: 'Aumentar Volume de Áudio Online | Amplificador de MP3 Grátis',
      description:
        'Aumente o volume de arquivos de áudio e MP3 online em até 500% (+14 dB) gratuitamente. Saiba como aumentar o volume do áudio sem distorção direto no navegador.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, aumentar volume audio, aumentar volume mp3',
    },
    breadcrumbs: {
      home: 'Início',
      current: 'Aumentar Volume de Áudio Online',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: 'Amplificador de Áudio 500%',
      languageLabel: 'Selecionar Idioma',
      themeToggleLight: 'Mudar para Modo Claro',
      themeToggleDark: 'Mudar para Modo Escuro',
      installPwa: 'Adicionar à Tela Inicial',
      installPwaAria: 'Instalar aplicativo IncreaseVolume na tela inicial',
      supportDev: 'Apoiar o Criador',
      supportDevAria: 'Apoiar o desenvolvedor no Ko-fi',
      iosInstallTitle: 'Instalar App IncreaseVolume',
      iosInstallStep1: '1. Toque no botão Compartilhar na barra do Safari.',
      iosInstallStep2: '2. Toque em "Adicionar à Tela de Início" para usar offline.',
      iosInstallClose: 'Entendi',
    },
    hero: {
      badge: 'Motor Web Audio 100% Local • Até 500% (+14.0 dB)',
      h1: 'Aumentar Volume de Áudio Online',
      subtitle:
        'Amplifique gravações baixas em MP3, WAV, M4A, FLAC e OGG em até 500% diretamente no navegador. Zero upload para servidores, forma de onda a 60fps e limitador inteligente anti-clipping.',
    },
    dropzone: {
      title: 'Solte seu arquivo de áudio baixo aqui para aumentar o volume',
      subtitle: 'Ou clique abaixo para selecionar do seu computador ou celular',
      selectButton: 'Selecionar Arquivo de Áudio (MP3, WAV, M4A)',
      dragActiveTitle: 'Solte para carregar o áudio no Estúdio!',
      supportedFormats: 'Suporta MP3, WAV, M4A, FLAC, OGG • Sem limite de tamanho • 100% Local',
      sampleButton: 'Testar com faixa de demonstração integrada',
      trustPill1: '100% Offline e Privado',
      trustPill2: 'Aumento de até 500%',
      trustPill3: 'Limitador Zero Distorção',
    },
    studio: {
      fileLoadedBadge: 'ESTÚDIO DE AMPLIFICAÇÃO PRONTO',
      changeFileButton: 'Trocar Arquivo de Áudio',
      playButton: 'Reproduzir',
      pauseButton: 'Pausar',
      compareToggleLabel: 'Comparação A/B:',
      compareOriginalActive: 'Ouvindo: Original (100%)',
      compareBoostedActive: 'Ouvindo: Áudio Amplificado',
      waveformLegendOriginal: 'Onda Original (100%)',
      waveformLegendBoosted: 'Onda Amplificada',
      volumeControlTitle: 'Nível de Aumento de Volume',
      volumeSliderAria: 'Controle deslizante de aumento de volume (0% a 500%)',
      presetsTitle: 'Predefinições Rápidas em Um Clique',
      preset150: '150% Suave',
      preset200: '200% Dobro',
      preset300: '300% Voz',
      preset500: '500% Máx',
      limiterTitle: 'Limitador Inteligente Anti-Clipping (Evitar Distorção)',
      limiterDesc: 'Ativa um compressor de teto em -0.5 dB para evitar chiados e cortes digitais.',
      limiterActiveBadge: 'LIMITADOR ATIVO (-0.5 dB)',
      limiterBypassedBadge: 'LIMITADOR INATIVO',
      statusClean: 'Sinal Limpo • Zero Distorção Detectada',
      statusLimiting: 'Limitador Inteligente Ativo • Protegendo Picos em -0.5 dB',
      statusClippingRisk: 'Aviso de Ganho Alto • Ative o Limitador para evitar distorção',
      outputFormatLabel: 'Formato de Exportação',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (Sem Perdas)',
      downloadButton: 'Baixar Áudio Amplificado',
      renderingProgress: 'Renderizando áudio amplificado...',
      encodingMp3Progress: 'Codificando arquivo MP3...',
      downloadReady: 'Áudio amplificado exportado com sucesso!',
      resetButton: 'Recomeçar',
    },
    howTo: {
      sectionTitle: 'Como Aumentar o Volume de um Áudio Online em 3 Passos',
      sectionSubtitle: 'Amplifique áudios de voz, palestras e músicas MP3 em segundos com segurança total.',
      step1Title: '1. Selecione seu arquivo de áudio (MP3, WAV, M4A, FLAC)',
      step1Desc: 'Clique em "Selecionar Arquivo de Áudio" ou arraste o arquivo. Tudo roda 100% localmente no seu navegador.',
      step2Title: '2. Ajuste o volume em até 500% (+14 dB)',
      step2Desc: 'Arraste o controle deslizante ou use os botões de 150%, 200%, 300% e 500% acompanhando a forma de onda em tempo real.',
      step3Title: '3. Ative o Limitador Anti-Clipping e Baixe seu Áudio',
      step3Desc: 'Mantenha o limitador ativo para proteger os picos de som, escolha .MP3 ou .WAV e baixe instantaneamente.',
    },
    features: {
      limiterHeading: 'Aumentar Volume MP3 Sem Distorção (Limitador de Pico Inteligente)',
      limiterParagraph1:
        'Aumentar o ganho sem proteção corta os picos da onda acima de 0.0 dBFS, gerando ruídos desagradáveis.',
      limiterParagraph2:
        'O IncreaseVolume combina um GainNode com um DynamicsCompressorNode ajustado em -0.5 dB para levantar vozes baixas mantendo os picos cristalinos.',
      limiterBullet1: 'Teto Brickwall em -0.5 dB: Impede cortes digitais em qualquer nível de amplificação.',
      limiterBullet2: 'Forma de Onda Dupla a 60fps: Veja em tempo real o ganho aplicado sobre o áudio original.',
      limiterBullet3: 'Modo Comparação A/B: Ouça a diferença exata entre o som original e o amplificado.',
      privacyHeading: 'Privacidade 100% Client-Side: Processamento Local no Navegador',
      privacyParagraph1: 'Seus arquivos confidenciais nunca saem do seu computador ou celular.',
      privacyParagraph2: 'Funciona totalmente offline após instalado como Progressive Web App (PWA).',
      privacyStat1Label: 'Uploads para Servidor',
      privacyStat1Value: '0 Bytes (100% Local)',
      privacyStat2Label: 'Ganho Máximo',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'Suporte Offline PWA',
      privacyStat3Value: 'iOS, Android e Desktop',
    },
    faq: {
      title: 'Perguntas Frequentes: Aumentar Volume de Áudio e MP3',
      subtitle: 'Tire suas dúvidas sobre amplificação de áudio online sem perda de qualidade.',
      items: [
        {
          q: 'Como aumentar o volume de um áudio online grátis?',
          a: 'Carregue seu arquivo MP3, WAV, M4A, FLAC ou OGG no IncreaseVolume, deslize o volume até 500% (+14 dB) e clique em "Baixar Áudio Amplificado".',
        },
        {
          q: 'Como aumentar o volume do MP3 sem distorcer o som?',
          a: 'Mantenha a opção "Limitador Inteligente Anti-Clipping" ativada para proteger picos acima de -0.5 dB.',
        },
        {
          q: 'Meus arquivos são enviados para algum servidor?',
          a: 'Não! Todo o processamento acontece 100% localmente no seu navegador via Web Audio API.',
        },
        {
          q: 'Devo baixar em MP3 ou WAV?',
          a: 'Use .MP3 (192 kbps) para arquivos leves e compatíveis, ou .WAV (16-bit PCM) para edição profissional sem perdas.',
        },
      ],
    },
    footer: {
      description:
        'Amplificador de volume de áudio e MP3 online 100% gratuito e local via Web Audio API. Aumente até 500% (+14 dB) sem distorção.',
      QuickLinks: 'Navegação',
      languagesHeading: 'Disponível em 8 Idiomas',
      builtWith: 'Criado com Astro, React Islands e Web Audio API',
      supportCta: 'Apoiar o Desenvolvedor no Ko-fi',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). Licença MIT.',
    },
  },
  de: {
    meta: {
      title: 'Audio Lautstärke Erhöhen Online | Kostenloser MP3 Volume Booster',
      description:
        'Erhöhen Sie die Lautstärke von Audio- und MP3-Dateien online kostenlos um bis zu 500% (+14 dB). 100% lokal im Browser mit intelligentem Anti-Clipping-Limiter.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, audio lautstärke erhöhen, mp3 lauter machen',
    },
    breadcrumbs: {
      home: 'Startseite',
      current: 'Audio Lautstärke Erhöhen Online',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: '500% Studio Audio-Verstärker',
      languageLabel: 'Sprache wählen',
      themeToggleLight: 'Zum hellen Modus wechseln',
      themeToggleDark: 'Zum dunklen Modus wechseln',
      installPwa: 'Zum Startbildschirm',
      installPwaAria: 'IncreaseVolume Web-App zum Startbildschirm hinzufügen',
      supportDev: 'Entwickler unterstützen',
      supportDevAria: 'Entwickler auf Ko-fi unterstützen',
      iosInstallTitle: 'IncreaseVolume App installieren',
      iosInstallStep1: '1. Tippen Sie in Safari auf das Teilen-Symbol.',
      iosInstallStep2: '2. Wählen Sie "Zum Home-Bildschirm" für die Offline-Nutzung.',
      iosInstallClose: 'Verstanden',
    },
    hero: {
      badge: '100% Lokale Web Audio Engine • Bis zu 500% (+14.0 dB)',
      h1: 'Audio Lautstärke Erhöhen Online',
      subtitle:
        'Verstärken Sie leise MP3-, WAV-, M4A-, FLAC- und OGG-Aufnahmen um bis zu 500% direkt in Ihrem Browser. Kein Server-Upload, 60fps Wellenform-Vorschau und intelligenter Anti-Clipping-Limiter.',
    },
    dropzone: {
      title: 'Leise Audiodatei hier ablegen, um die Lautstärke zu erhöhen',
      subtitle: 'Oder klicken Sie unten, um eine Datei von Ihrem Gerät auszuwählen',
      selectButton: 'Audiodatei auswählen (MP3, WAV, M4A)',
      dragActiveTitle: 'Loslassen, um Audio im Studio-Booster zu öffnen!',
      supportedFormats: 'Unterstützt MP3, WAV, M4A, FLAC, OGG • Unbegrenzte Dateigröße • 100% Lokal',
      sampleButton: 'Mit integrierter Demo-Audiospur testen',
      trustPill1: '100% Offline & Privat',
      trustPill2: 'Bis zu 500% Verstärkung',
      trustPill3: 'Verzerrungsfreier Limiter',
    },
    studio: {
      fileLoadedBadge: 'STUDIO-MASTERING BEREIT',
      changeFileButton: 'Andere Audiodatei laden',
      playButton: 'Abspielen',
      pauseButton: 'Pause',
      compareToggleLabel: 'A/B-Vergleich:',
      compareOriginalActive: 'Hören: Original (100%)',
      compareBoostedActive: 'Hören: Verstärktes Audio',
      waveformLegendOriginal: 'Original-Wellenform (100%)',
      waveformLegendBoosted: 'Verstärkte Wellenform',
      volumeControlTitle: 'Master-Lautstärke-Verstärkung',
      volumeSliderAria: 'Lautstärke-Schieberegler (0% bis 500%)',
      presetsTitle: 'Ein-Klick-Studio-Presets',
      preset150: '150% Sanft',
      preset200: '200% Doppelt',
      preset300: '300% Sprache',
      preset500: '500% Max',
      limiterTitle: 'Intelligenter Anti-Clipping-Limiter (Verzerrungsschutz)',
      limiterDesc: 'Aktiviert einen -0.5 dB Brickwall-Limiter gegen Übersteuerung.',
      limiterActiveBadge: 'LIMITER AKTIV (-0.5 dB)',
      limiterBypassedBadge: 'LIMITER INAKTIV',
      statusClean: 'Sauberer Headroom • Kein Clipping erkannt',
      statusLimiting: 'Smart-Limiter Aktiv • Schützt Spitzen bei -0.5 dB',
      statusClippingRisk: 'Warnung bei hoher Verstärkung • Limiter aktivieren gegen Verzerrung',
      outputFormatLabel: 'Export-Format',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (Verlustfrei)',
      downloadButton: 'Verstärktes Audio herunterladen',
      renderingProgress: 'Verarbeite Audio im OfflineAudioContext...',
      encodingMp3Progress: 'Codiere MP3-Datei...',
      downloadReady: 'Verstärktes Audio erfolgreich exportiert!',
      resetButton: 'Zurücksetzen',
    },
    howTo: {
      sectionTitle: 'Wie man die Audio-Lautstärke in 3 Schritten online erhöht',
      sectionSubtitle: 'Machen Sie leise Sprachmemos, Podcasts und MP3-Dateien in Sekunden lauter.',
      step1Title: '1. Audiodatei auswählen (MP3, WAV, M4A, FLAC)',
      step1Desc: 'Klicken Sie auf "Audiodatei auswählen" oder ziehen Sie Ihre Datei in das Feld. Alles bleibt 100% lokal auf Ihrem Gerät.',
      step2Title: '2. Lautstärke auf bis zu 500% (+14 dB) erhöhen',
      step2Desc: 'Bewegen Sie den großen Regler oder nutzen Sie die Schnellwahl-Tasten mit 60fps Live-Wellenform.',
      step3Title: '3. Smart-Limiter nutzen & MP3 oder WAV herunterladen',
      step3Desc: 'Der aktivierte Anti-Clipping-Limiter verhindert Übersteuerungen beim sofortigen Download.',
    },
    features: {
      limiterHeading: 'MP3 Lauter Machen Ohne Verzerrung (Smart Peak Limiter)',
      limiterParagraph1:
        'Einfache Lautstärke-Booster schneiden Spitzen über 0.0 dBFS ab und erzeugen unangenehmes Kratzen.',
      limiterParagraph2:
        'IncreaseVolume kombiniert einen GainNode mit einem DynamicsCompressorNode bei -0.5 dB, damit leise Stimmen kräftig angehoben werden, ohne dass laute Passagen übersteuern.',
      limiterBullet1: 'Brickwall-Grenze bei -0.5 dB: Verhindert digitales Clipping zuverlässig.',
      limiterBullet2: '60fps Dual-Wellenform: Sehen Sie den Unterschied zwischen Original und Verstärkung sofort.',
      limiterBullet3: 'Echtzeit A/B-Vergleich: Schalten Sie während der Wiedergabe nahtlos um.',
      privacyHeading: '100% Client-Side Datenschutz: Lokale Web-Audio-Verarbeitung',
      privacyParagraph1: 'Ihre vertraulichen Sprachaufnahmen und Musikdateien verlassen niemals Ihren Browser.',
      privacyParagraph2: 'Dank Progressive Web App (PWA) funktioniert das Tool auch komplett offline.',
      privacyStat1Label: 'Server-Uploads',
      privacyStat1Value: '0 Bytes (100% Lokal)',
      privacyStat2Label: 'Maximaler Boost',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'Offline PWA',
      privacyStat3Value: 'iOS, Android & Desktop',
    },
    faq: {
      title: 'Häufig gestellte Fragen (FAQ): Audio & MP3 Lautstärke erhöhen',
      subtitle: 'Alles Wichtige zur verzerrungsfreien Lautstärke-Erhöhung im Browser.',
      items: [
        {
          q: 'Wie kann ich kostenlos die Lautstärke einer Audiodatei online erhöhen?',
          a: 'Laden Sie Ihre MP3-, WAV-, M4A-, FLAC- oder OGG-Datei in IncreaseVolume, stellen Sie den Regler auf bis zu 500% (+14 dB) und klicken Sie auf "Verstärktes Audio herunterladen".',
        },
        {
          q: 'Wie verhindere ich Verzerrungen beim Verstärken von MP3-Dateien?',
          a: 'Lassen Sie den "Intelligenten Anti-Clipping-Limiter" aktiviert. Er begrenzt Spitzenwerte sanft bei -0.5 dB.',
        },
        {
          q: 'Werden meine Audiodateien auf einen Server hochgeladen?',
          a: 'Nein. Die gesamte Berechnung erfolgt lokal auf Ihrem Gerät über die Web Audio API.',
        },
        {
          q: 'Soll ich als MP3 oder WAV exportieren?',
          a: '.MP3 (192 kbps) eignet sich perfekt für kleine Dateigrößen, .WAV (16-Bit PCM) für verlustfreie Studioqualität.',
        },
      ],
    },
    footer: {
      description:
        'Kostenloser, 100% lokaler Online-Audio- und MP3-Lautstärke-Booster. Verstärken Sie Aufnahmen um bis zu 500% (+14 dB) ohne Verzerrung.',
      QuickLinks: 'Navigation',
      languagesHeading: 'Verfügbar in 8 Sprachen',
      builtWith: 'Entwickelt mit Astro, React Islands & Web Audio API',
      supportCta: 'Entwickler auf Ko-fi unterstützen',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). MIT-Lizenz.',
    },
  },
  fr: {
    meta: {
      title: 'Augmenter le Volume Audio en Ligne | Booster MP3 Gratuit',
      description:
        'Augmentez le volume de vos fichiers audio et MP3 en ligne jusqu’à 500% (+14 dB) gratuitement. Amplificateur audio 100% local sans distorsion avec limiteur anti-saturation.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, augmenter volume audio, augmenter son mp3',
    },
    breadcrumbs: {
      home: 'Accueil',
      current: 'Augmenter le Volume Audio en Ligne',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: 'Booster Audio Studio 500%',
      languageLabel: 'Choisir la langue',
      themeToggleLight: 'Passer en mode clair',
      themeToggleDark: 'Passer en mode sombre',
      installPwa: 'Ajouter à l’écran d’accueil',
      installPwaAria: 'Installer l’application IncreaseVolume sur l’écran d’accueil',
      supportDev: 'Soutenir le Développeur',
      supportDevAria: 'Soutenir le développeur sur Ko-fi',
      iosInstallTitle: 'Installer l’application IncreaseVolume',
      iosInstallStep1: '1. Appuyez sur le bouton Partager dans Safari.',
      iosInstallStep2: '2. Sélectionnez "Sur l’écran d’accueil" pour un accès hors-ligne.',
      iosInstallClose: 'Compris',
    },
    hero: {
      badge: 'Moteur Web Audio 100% Local • Jusqu’à 500% (+14.0 dB)',
      h1: 'Augmenter le Volume Audio en Ligne',
      subtitle:
        'Amplifiez vos fichiers MP3, WAV, M4A, FLAC et OGG silencieux jusqu’à 500% directement dans votre navigateur. Aucun envoi sur serveur, forme d’onde à 60fps et limiteur anti-écrêtage intelligent.',
    },
    dropzone: {
      title: 'Glissez votre fichier audio ici pour augmenter le volume',
      subtitle: 'Ou cliquez ci-dessous pour parcourir vos fichiers',
      selectButton: 'Sélectionner un Fichier Audio (MP3, WAV, M4A)',
      dragActiveTitle: 'Relâchez pour charger l’audio dans le Studio !',
      supportedFormats: 'Compatible MP3, WAV, M4A, FLAC, OGG • Taille illimitée • 100% Privé',
      sampleButton: 'Essayer avec la piste audio de démonstration',
      trustPill1: '100% Hors-ligne & Privé',
      trustPill2: 'Boost jusqu’à 500%',
      trustPill3: 'Limiteur Zéro Distorsion',
    },
    studio: {
      fileLoadedBadge: 'STUDIO D’AMPLIFICATION PRÊT',
      changeFileButton: 'Changer de fichier audio',
      playButton: 'Lecture',
      pauseButton: 'Pause',
      compareToggleLabel: 'Comparaison A/B :',
      compareOriginalActive: 'Écoute : Original (100%)',
      compareBoostedActive: 'Écoute : Audio Amplifié',
      waveformLegendOriginal: 'Onde Originale (100%)',
      waveformLegendBoosted: 'Onde Amplifiée',
      volumeControlTitle: 'Niveau d’Amplification du Volume',
      volumeSliderAria: 'Curseur d’augmentation du volume (0% à 500%)',
      presetsTitle: 'Préréglages Rapides en Un Clic',
      preset150: '150% Doux',
      preset200: '200% Double',
      preset300: '300% Voix',
      preset500: '500% Max',
      limiterTitle: 'Limiteur Intelligent Anti-Écrêtage (Éviter la Distorsion)',
      limiterDesc: 'Active un plafond compresseur à -0.5 dB pour éviter toute saturation numérique.',
      limiterActiveBadge: 'LIMITEUR ACTIF (-0.5 dB)',
      limiterBypassedBadge: 'LIMITEUR DÉSACTIVÉ',
      statusClean: 'Marge Dynamique Propre • Aucune Saturation',
      statusLimiting: 'Limiteur Intelligent Actif • Protection des Crêtes à -0.5 dB',
      statusClippingRisk: 'Gain Élevé • Activez le limiteur pour éviter la distorsion',
      outputFormatLabel: 'Format d’Exportation',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (Sans Perte)',
      downloadButton: 'Télécharger l’Audio Amplifié',
      renderingProgress: 'Rendu du master audio...',
      encodingMp3Progress: 'Encodage du fichier MP3...',
      downloadReady: 'Audio amplifié exporté avec succès !',
      resetButton: 'Recommencer',
    },
    howTo: {
      sectionTitle: 'Comment Augmenter le Volume d’un Audio en Ligne en 3 Étapes',
      sectionSubtitle: 'Amplifiez vos mémos vocaux, conférences et fichiers MP3 en quelques secondes.',
      step1Title: '1. Sélectionnez votre fichier audio (MP3, WAV, M4A, FLAC)',
      step1Desc: 'Cliquez sur "Sélectionner un Fichier Audio" ou déposez votre fichier. Tout est traité à 100% dans votre navigateur.',
      step2Title: '2. Réglez le volume jusqu’à 500% (+14 dB)',
      step2Desc: 'Faites glisser le curseur géant ou choisissez un préréglage (150%, 200%, 300%, 500%) avec aperçu 60fps en direct.',
      step3Title: '3. Activez le limiteur anti-saturation et téléchargez',
      step3Desc: 'Conservez le limiteur actif pour un son pur sans grésillement et téléchargez en .MP3 ou .WAV.',
    },
    features: {
      limiterHeading: 'Augmenter le Volume MP3 Sans Distorsion (Limiteur de Crête Intelligent)',
      limiterParagraph1:
        'Les amplificateurs classiques coupent les crêtes au-delà de 0.0 dBFS, provoquant une saturation désagréable.',
      limiterParagraph2:
        'IncreaseVolume associe un GainNode et un DynamicsCompressorNode réglé à -0.5 dB pour amplifier les voix faibles tout en protégeant les passages forts.',
      limiterBullet1: 'Plafond Brickwall à -0.5 dB : Zéro écrêtage numérique.',
      limiterBullet2: 'Forme d’onde double couche 60fps : Visualisez l’amplification en temps réel.',
      limiterBullet3: 'Comparaison A/B instantanée : Comparez l’original et la version amplifiée en un clic.',
      privacyHeading: 'Confidentialité 100% Client-Side : Traitement Web Audio Local',
      privacyParagraph1: 'Vos enregistrements privés ne quittent jamais votre ordinateur ou votre téléphone.',
      privacyParagraph2: 'Installez la PWA sur votre écran d’accueil pour amplifier vos audios même hors connexion.',
      privacyStat1Label: 'Envoi Serveur',
      privacyStat1Value: '0 Octet (100% Local)',
      privacyStat2Label: 'Amplification Max',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'Support Hors-ligne PWA',
      privacyStat3Value: 'iOS, Android & PC',
    },
    faq: {
      title: 'Questions Fréquentes : Augmenter le Volume Audio et MP3',
      subtitle: 'Tout savoir pour booster le son de vos fichiers audio gratuitement et sans perte.',
      items: [
        {
          q: 'Comment augmenter le volume d’un fichier audio en ligne gratuitement ?',
          a: 'Importez votre fichier MP3, WAV, M4A, FLAC ou OGG dans IncreaseVolume, réglez le curseur jusqu’à 500% (+14 dB) et cliquez sur "Télécharger l’Audio Amplifié".',
        },
        {
          q: 'Comment éviter la distorsion en augmentant le son d’un MP3 ?',
          a: 'Laissez le "Limiteur Intelligent Anti-Écrêtage" activé afin de plafonner les crêtes à -0.5 dB.',
        },
        {
          q: 'Mes fichiers audio sont-ils envoyés sur internet ?',
          a: 'Non, le traitement est 100% local dans votre navigateur grâce à la Web Audio API.',
        },
        {
          q: 'Quel format choisir entre MP3 et WAV ?',
          a: 'Choisissez .MP3 (192 kbps) pour un fichier léger et universel, ou .WAV (16-bit PCM) pour une qualité studio sans perte.',
        },
      ],
    },
    footer: {
      description:
        'Amplificateur de volume audio et MP3 en ligne gratuit et 100% local. Boostez vos fichiers jusqu’à 500% (+14 dB) sans distorsion.',
      QuickLinks: 'Navigation',
      languagesHeading: 'Disponible en 8 Langues',
      builtWith: 'Conçu avec Astro, React Islands & Web Audio API',
      supportCta: 'Soutenir le Développeur sur Ko-fi',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). Licence MIT.',
    },
  },
  ja: {
    meta: {
      title: 'オーディオ音量をオンラインで上げる | 無料MP3音量ブースター (100%ブラウザ処理)',
      description:
        'MP3・WAV・M4Aなどの音声ファイルの音量をオンラインで最大500% (+14 dB) まで無料で増幅。音割れを防ぐスマートリミッター搭載、サーバー送信なしの100%安全なWeb Audioツール。',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, 音量 上げる オンライン, MP3 音量 増幅',
    },
    breadcrumbs: {
      home: 'ホーム',
      current: 'オーディオ音量をオンラインで上げる',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: '最大500% 音量ブースター',
      languageLabel: '言語を選択',
      themeToggleLight: 'ライトモードに切替',
      themeToggleDark: 'ダークモードに切替',
      installPwa: 'ホーム画面に追加',
      installPwaAria: 'IncreaseVolumeアプリをホーム画面にインストール',
      supportDev: '開発者を支援',
      supportDevAria: 'Ko-fiで開発者をサポートする',
      iosInstallTitle: 'IncreaseVolumeアプリをインストール',
      iosInstallStep1: '1. Safariの共有ボタンをタップします。',
      iosInstallStep2: '2. 「ホーム画面に追加」を選択するとオフラインでも使えます。',
      iosInstallClose: '閉じる',
    },
    hero: {
      badge: '100% ブラウザ内Web Audio処理 • 最大 500% (+14.0 dB)',
      h1: 'オーディオ音量をオンラインで上げる',
      subtitle:
        '小さな音のMP3、WAV、M4A、FLAC、OGGファイルをブラウザ上で直接最大500%まで増幅。サーバーへのアップロード不要、60fpsのリアルタイム波形プレビュー、音割れ防止スマートリミッター搭載。',
    },
    dropzone: {
      title: '音量を上げたい音声ファイルをここにドロップ',
      subtitle: 'または下の巨大ボタンをクリックして端末からファイルを選択',
      selectButton: '音声ファイルを選択 (MP3, WAV, M4A)',
      dragActiveTitle: 'ドロップしてスタジオブースターに読み込む！',
      supportedFormats: 'MP3, WAV, M4A, FLAC, OGG対応 • 容量無制限 • 100%ローカル処理',
      sampleButton: '内蔵デモ音声トラックで試す',
      trustPill1: '100% オフライン＆秘密厳守',
      trustPill2: '最大500% 音量ブースト',
      trustPill3: '音割れゼロ・リミッター',
    },
    studio: {
      fileLoadedBadge: 'スタジオ・マスタリング準備完了',
      changeFileButton: '別の音声ファイルを選択',
      playButton: 'プレビュー再生',
      pauseButton: '一時停止',
      compareToggleLabel: 'A/B 聴き比べ:',
      compareOriginalActive: '再生中: オリジナル (100%)',
      compareBoostedActive: '再生中: ブースト適用後',
      waveformLegendOriginal: '元の波形 (100%)',
      waveformLegendBoosted: '増幅後の波形',
      volumeControlTitle: 'マスター音量ブーストレベル',
      volumeSliderAria: '音量ブースト調整スライダー (0% 〜 500%)',
      presetsTitle: 'ワンクリック音量プリセット',
      preset150: '150% 控えめ',
      preset200: '200% 2倍',
      preset300: '300% 音声',
      preset500: '500% 最大',
      limiterTitle: '音割れ防止スマートリミッター (歪み・クリッピング防止)',
      limiterDesc: '-0.5 dBのブリックウォール・リミッターを有効化し、ピーク時の音割れを防ぎます。',
      limiterActiveBadge: 'リミッター ON (-0.5 dB)',
      limiterBypassedBadge: 'リミッター OFF',
      statusClean: 'クリアな音質 • クリッピングなし',
      statusLimiting: 'スマートリミッター作動中 • -0.5 dBでピーク保護中',
      statusClippingRisk: '高ゲイン警告 • 音割れを防ぐにはリミッターをONにしてください',
      outputFormatLabel: '出力フォーマット',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (無劣化)',
      downloadButton: '音量を上げた音声をダウンロード',
      renderingProgress: '高音質オーディオをレンダリング中...',
      encodingMp3Progress: 'MP3ファイルをエンコード中...',
      downloadReady: '音声ファイルの出力が完了しました！',
      resetButton: '最初からやり直す',
    },
    howTo: {
      sectionTitle: 'オンラインで音声の音量を上げる3つのステップ',
      sectionSubtitle: '小さなボイスメモや会議録音、MP3音楽を数秒で聞き取りやすく増幅します。',
      step1Title: '1. 音声ファイルを選択 (MP3, WAV, M4A, FLAC)',
      step1Desc: '「音声ファイルを選択」をクリックするかドラッグ＆ドロップします。サーバーへの送信は一切行われません。',
      step2Title: '2. スライダーで最大500% (+14 dB) まで音量を調整',
      step2Desc: '60fpsで滑らかに動く波形を確認しながら、150%〜500%までリアルタイムで音量を調整・A/B比較できます。',
      step3Title: '3. スマートリミッターで音割れを防いでMP3/WAV保存',
      step3Desc: '音割れ防止リミッターをONにしたまま、MP3またはWAV形式で即座にダウンロードできます。',
    },
    features: {
      limiterHeading: '音割れ・歪みなしでMP3の音量を上げる (スマートピークリミッター)',
      limiterParagraph1:
        '通常の音量増幅ツールでは、0.0 dBFSを超えた波形が切り捨てられ、耳障りなデジタルノイズ（クリッピング）が発生します。',
      limiterParagraph2:
        'IncreaseVolumeはGainNodeと-0.5 dB設定のDynamicsCompressorNodeを直列接続し、小さな話し声を最大500%まで持ち上げつつ突発的な大音量を滑らかに保護します。',
      limiterBullet1: '-0.5 dB ブリックウォール制御: どのブースト倍率でも音割れを防止。',
      limiterBullet2: '60fps デュアル波形表示: 元の音量と増幅後の振幅を一目で比較。',
      limiterBullet3: 'リアルタイムA/B比較: 再生中にオリジナルとブースト後を瞬時に切り替え。',
      privacyHeading: '100% クライアントサイド処理: プライバシーが完全に守られる理由',
      privacyParagraph1: '大切な会議録音やプライベートな音声ファイルを外部サーバーにアップロードする必要はありません。',
      privacyParagraph2: 'PWA（プログレッシブWebアプリ）対応のため、ホーム画面に追加すればオフライン環境でも動作します。',
      privacyStat1Label: 'サーバー送信量',
      privacyStat1Value: '0 バイト (完全ローカル)',
      privacyStat2Label: '最大増幅率',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: 'オフラインPWA',
      privacyStat3Value: 'iOS / Android / PC対応',
    },
    faq: {
      title: 'よくある質問 (FAQ): 音声・MP3の音量増幅について',
      subtitle: '音質を落とさずに安全・無料で音量を上げる方法の解説。',
      items: [
        {
          q: '無料でオンラインで音声ファイルの音量を上げるには？',
          a: 'IncreaseVolumeでMP3、WAV、M4A、FLAC、OGGファイルを選択し、スライダーを最大500% (+14 dB) に合わせてダウンロードボタンを押すだけです。完全無料です。',
        },
        {
          q: 'MP3の音量を上げたときの音割れを防ぐには？',
          a: 'デフォルトでONになっている「音割れ防止スマートリミッター」を有効にしておくことで、-0.5 dB以上のピーク歪みを自動的に防ぎます。',
        },
        {
          q: '音声ファイルはサーバーにアップロードされますか？',
          a: 'いいえ。すべての処理はお使いのブラウザ内（Web Audio API）で完結するため、外部に送信されることはありません。',
        },
        {
          q: 'MP3とWAVのどちらで保存すべきですか？',
          a: 'ファイルサイズを抑えてスマホやPCで幅広く再生したい場合は.MP3、動画編集や無劣化保存には.WAVをお選びください。',
        },
      ],
    },
    footer: {
      description:
        'Web Audio APIを活用した100%ブラウザ完結の無料オーディオ＆MP3音量ブースター。音割れなしで最大500% (+14 dB) まで増幅。',
      QuickLinks: 'ナビゲーション',
      languagesHeading: '8言語に対応',
      builtWith: 'Astro, React Islands & Web Audio APIで構築',
      supportCta: 'Ko-fiで開発者を支援する',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). MIT License.',
    },
  },
  zh: {
    meta: {
      title: '在线提高音频音量 | 免费 MP3 音量放大器 (100% 本地浏览器处理)',
      description:
        '免费在线将音频和 MP3 文件音量放大高达 500% (+14 dB)。采用 100% 客户端 Web Audio 技术与智能防破音限制器，无需上传服务器即可无损放大声音。',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, 在线提高音量, mp3音量放大',
    },
    breadcrumbs: {
      home: '首页',
      current: '在线提高音频音量',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: '500% 专业音频音量放大器',
      languageLabel: '选择语言',
      themeToggleLight: '切换到浅色模式',
      themeToggleDark: '切换到深色模式',
      installPwa: '添加到主屏幕',
      installPwaAria: '将 IncreaseVolume 渐进式 Web 应用安装到主屏幕',
      supportDev: '支持开发者',
      supportDevAria: '在 Ko-fi 上支持开发者',
      iosInstallTitle: '安装 IncreaseVolume 应用',
      iosInstallStep1: '1. 点击 Safari 底部工具栏的“分享”按钮。',
      iosInstallStep2: '2. 向下滚动并点击“添加到主屏幕”即可离线使用。',
      iosInstallClose: '知道了',
    },
    hero: {
      badge: '100% 本地 Web Audio 引擎 • 高达 500% (+14.0 dB)',
      h1: '在线提高音频音量',
      subtitle:
        '直接在浏览器内将声音过小的 MP3、WAV、M4A、FLAC 和 OGG 音频放大至 500%。零服务器上传、60fps 实时双层波形预览，内置智能防削波防破音限制器。',
    },
    dropzone: {
      title: '将声音过小的音频文件拖放到此处以提高音量',
      subtitle: '或者点击下方大按钮从您的电脑或手机中选择文件',
      selectButton: '选择音频文件 (MP3, WAV, M4A)',
      dragActiveTitle: '松开鼠标即可将音频加载到音量放大工作室！',
      supportedFormats: '支持 MP3, WAV, M4A, FLAC, OGG • 不限文件大小 • 100% 本地隐私处理',
      sampleButton: '使用内置演示人声与吉他音频试用',
      trustPill1: '100% 离线与隐私安全',
      trustPill2: '高达 500% 音量放大',
      trustPill3: '零失真防破音限制器',
    },
    studio: {
      fileLoadedBadge: '母带级音量放大引擎已就绪',
      changeFileButton: '更换音频文件',
      playButton: '播放预览',
      pauseButton: '暂停预览',
      compareToggleLabel: 'A/B 实时对比:',
      compareOriginalActive: '当前试听: 原始音量 (100%)',
      compareBoostedActive: '当前试听: 放大后效果',
      waveformLegendOriginal: '原始基准波形 (100%)',
      waveformLegendBoosted: '放大后输出波形',
      volumeControlTitle: '主音量放大倍数',
      volumeSliderAria: '音量放大百分比滑块 (0% 至 500%)',
      presetsTitle: '一键预设放大档位',
      preset150: '150% 轻度',
      preset200: '200% 双倍',
      preset300: '300% 人声',
      preset500: '500% 极限',
      limiterTitle: '智能防削波限制器 (防止破音与失真)',
      limiterDesc: '启用 -0.5 dB 砖墙式动态压限器，确保高音峰值绝不破音。',
      limiterActiveBadge: '智能限制器开启 (-0.5 dB)',
      limiterBypassedBadge: '限制器已关闭',
      statusClean: '动态余量充足 • 零削波失真',
      statusLimiting: '智能防破音保护中 • 峰值锁定于 -0.5 dB',
      statusClippingRisk: '高增益警告 • 建议开启智能限制器以防破音',
      outputFormatLabel: '导出音频格式',
      formatMp3: '.MP3 (192 kbps)',
      formatWav: '.WAV (无损 PCM)',
      downloadButton: '下载放大后的音频',
      renderingProgress: '正在渲染放大后的音频...',
      encodingMp3Progress: '正在编码高品质 MP3...',
      downloadReady: '放大后的音频已成功导出！',
      resetButton: '重新开始',
    },
    howTo: {
      sectionTitle: '如何通过 3 个步骤在线提高音频音量',
      sectionSubtitle: '无论是救援声音微弱的课堂录音、会议语音备忘录，还是放大 MP3 音乐，只需几秒即可完成。',
      step1Title: '1. 选择您的音频文件 (MP3, WAV, M4A, FLAC)',
      step1Desc: '点击“选择音频文件”或直接拖入录音。所有解码均在浏览器本地完成，无需等待上传。',
      step2Title: '2. 拖动滑块将音量放大至最高 500% (+14 dB)',
      step2Desc: '使用超大滑块或一键预设（150%、200%、300%、500%），实时观看 60fps 波形变化并进行 A/B 对比。',
      step3Title: '3. 开启防破音保护并下载 MP3 或 WAV',
      step3Desc: '保持智能防削波限制器开启，选择 .MP3 或无损 .WAV 格式，点击下载即可立即保存。',
    },
    features: {
      limiterHeading: '提高 MP3 音量且不失真 (智能峰值限制器)',
      limiterParagraph1:
        '普通音量放大器会直接切掉超过 0.0 dBFS 的波形峰值，导致刺耳的爆音与失真。',
      limiterParagraph2:
        'IncreaseVolume 将高精度 GainNode 与 -0.5 dB 砖墙式 DynamicsCompressorNode 结合，在将微弱人声放大 500% 的同时平滑压制突发高音。',
      limiterBullet1: '-0.5 dB 砖墙上限：在任何放大倍数下彻底杜绝数字削波。',
      limiterBullet2: '60fps 双层动态波形：直观对比原始波形与放大后的振幅。',
      limiterBullet3: '实时 A/B 切换试听：播放过程中一键对比原始与放大效果。',
      privacyHeading: '100% 客户端隐私安全：为什么本地 Web Audio 处理至关重要',
      privacyParagraph1: '您的私人录音、未公开播客或会议文件绝不会离开您的设备。',
      privacyParagraph2: '作为渐进式 Web 应用 (PWA)，您可以将其安装到桌面或手机主屏幕，断网也能正常放大音频。',
      privacyStat1Label: '服务器上传数据',
      privacyStat1Value: '0 字节 (100% 本地)',
      privacyStat2Label: '最大音量增益',
      privacyStat2Value: '500% (+14.0 dB)',
      privacyStat3Label: '离线 PWA 支持',
      privacyStat3Value: 'iOS, Android 与电脑',
    },
    faq: {
      title: '常见问题解答：在线提高音频与 MP3 音量',
      subtitle: '关于如何安全、免费且无损地放大音频文件声音的完整指南。',
      items: [
        {
          q: '如何免费在线提高音频文件的音量？',
          a: '在 IncreaseVolume 中选择您的 MP3、WAV、M4A、FLAC 或 OGG 文件，将滑块调节至最高 500% (+14 dB)，然后点击“下载放大后的音频”即可。完全免费且无文件大小限制。',
        },
        {
          q: '放大 MP3 音量时如何避免破音或杂音？',
          a: '请保持默认开启“智能防削波限制器 (防止破音与失真)”。它会将峰值限制在 -0.5 dB 以内，确保声音洪亮且清晰。',
        },
        {
          q: '我的音频文件会被上传到云端服务器吗？',
          a: '绝对不会。所有音频解码、波形渲染与 MP3/WAV 编码均通过 HTML5 Web Audio API 在您的浏览器本地完成。',
        },
        {
          q: '导出时应该选择 .MP3 还是 .WAV 格式？',
          a: '如果您需要体积小、兼容性强的音频，请选择 .MP3 (192 kbps)；如果您用于后期剪辑并追求无损音质，请选择 .WAV (16-Bit PCM)。',
        },
      ],
    },
    footer: {
      description:
        '基于 Web Audio API 的免费 100% 本地在线音频与 MP3 音量放大器。无失真放大音量高达 500% (+14 dB)。',
      QuickLinks: '快速导航',
      languagesHeading: '支持 8 种语言',
      builtWith: '基于 Astro, React Islands & Web Audio API 构建',
      supportCta: '在 Ko-fi 上支持开发者',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). 基于 MIT 许可证发布。',
    },
  },
  ru: {
    meta: {
      title: 'Увеличить Громкость Аудио Онлайн | Бесплатный Усилитель MP3',
      description:
        'Увеличьте громкость аудио и MP3 файлов онлайн до 500% (+14 дБ) бесплатно. 100% локальная обработка в браузере без потери качества и искажений с умным лимитером.',
      keywords:
        'increase volume of audio, how to increase audio volume, increase audio volume online, volume increase online, audio sound increase, volume increase mp3, increase mp3 volume, increase volume mp3, увеличить громкость аудио, сделать mp3 громче',
    },
    breadcrumbs: {
      home: 'Главная',
      current: 'Увеличить Громкость Аудио Онлайн',
    },
    nav: {
      brand: 'IncreaseVolume',
      tagline: 'Усилитель Звука 500%',
      languageLabel: 'Выбрать язык',
      themeToggleLight: 'Включить светлую тему',
      themeToggleDark: 'Включить тёмную тему',
      installPwa: 'На главный экран',
      installPwaAria: 'Установить приложение IncreaseVolume на главный экран',
      supportDev: 'Поддержать автора',
      supportDevAria: 'Поддержать разработчика на Ko-fi',
      iosInstallTitle: 'Установить IncreaseVolume',
      iosInstallStep1: '1. Нажмите кнопку «Поделиться» в панели Safari.',
      iosInstallStep2: '2. Выберите «На экран „Домой“» для работы офлайн.',
      iosInstallClose: 'Понятно',
    },
    hero: {
      badge: '100% Локальный Web Audio Движок • До 500% (+14.0 дБ)',
      h1: 'Увеличить Громкость Аудио Онлайн',
      subtitle:
        'Усиливайте тихие записи MP3, WAV, M4A, FLAC и OGG до 500% прямо в браузере. Без загрузки на сервер, плавная волна 60fps в реальном времени и умный лимитер против хрипов.',
    },
    dropzone: {
      title: 'Перетащите тихий аудиофайл сюда для увеличения громкости',
      subtitle: 'Или нажмите огромную кнопку ниже, чтобы выбрать файл на устройстве',
      selectButton: 'Выбрать Аудиофайл (MP3, WAV, M4A)',
      dragActiveTitle: 'Отпустите файл для загрузки в Студию!',
      supportedFormats: 'Поддержка MP3, WAV, M4A, FLAC, OGG • Без лимита размера • 100% Локально',
      sampleButton: 'Попробовать на встроенном демо-треке',
      trustPill1: '100% Офлайн и Приватно',
      trustPill2: 'Усиление до 500%',
      trustPill3: 'Лимитер Без Искажений',
    },
    studio: {
      fileLoadedBadge: 'СТУДИЯ УСИЛЕНИЯ ГОТОВА',
      changeFileButton: 'Выбрать другой файл',
      playButton: 'Слушать',
      pauseButton: 'Пауза',
      compareToggleLabel: 'Сравнение A/B:',
      compareOriginalActive: 'Звучит: Оригинал (100%)',
      compareBoostedActive: 'Звучит: Усиленный Мастер',
      waveformLegendOriginal: 'Исходная волна (100%)',
      waveformLegendBoosted: 'Усиленная волна',
      volumeControlTitle: 'Уровень Усиления Громкости',
      volumeSliderAria: 'Ползунок усиления громкости (от 0% до 500%)',
      presetsTitle: 'Быстрые Пресеты в Один Клик',
      preset150: '150% Мягко',
      preset200: '200% Вдвое',
      preset300: '300% Голос',
      preset500: '500% Макс',
      limiterTitle: 'Умный Анти-Клиппинг Лимитер (Защита от хрипов)',
      limiterDesc: 'Включает потолок компрессора на -0.5 дБ, предотвращая перегрузку на пиках.',
      limiterActiveBadge: 'ЛИМИТЕР ВКЛ (-0.5 дБ)',
      limiterBypassedBadge: 'ЛИМИТЕР ВЫКЛ',
      statusClean: 'Чистый звук • Перегрузок не обнаружено',
      statusLimiting: 'Умный лимитер активен • Защита пиков на -0.5 дБ',
      statusClippingRisk: 'Высокое усиление • Включите лимитер для защиты от искажений',
      outputFormatLabel: 'Формат экспорта',
      formatMp3: '.MP3 (192 кбит/с)',
      formatWav: '.WAV (Без Потерь)',
      downloadButton: 'Скачать Усиленное Аудио',
      renderingProgress: 'Рендеринг усиленного аудио...',
      encodingMp3Progress: 'Кодирование MP3 файла...',
      downloadReady: 'Усиленный аудиофайл готов!',
      resetButton: 'Сбросить',
    },
    howTo: {
      sectionTitle: 'Как увеличить громкость аудио онлайн за 3 шага',
      sectionSubtitle: 'Сделайте тихие голосовые сообщения, лекции и MP3-треки громкими и четкими за пару секунд.',
      step1Title: '1. Выберите аудиофайл (MP3, WAV, M4A, FLAC)',
      step1Desc: 'Нажмите «Выбрать Аудиофайл» или перетащите запись. Файл обрабатывается на 100% внутри вашего браузера.',
      step2Title: '2. Настройте усиление громкости до 500% (+14 дБ)',
      step2Desc: 'Передвигайте крупный ползунок или используйте пресеты (150%, 200%, 300%, 500%) с живой визуализацией волны 60fps.',
      step3Title: '3. Включите анти-клиппинг и скачайте MP3 или WAV',
      step3Desc: 'Умный лимитер защитит звук от хрипов, после чего вы сможете мгновенно сохранить готовый файл.',
    },
    features: {
      limiterHeading: 'Увеличить Громкость MP3 Без Искажений (Умный Пиковый Лимитер)',
      limiterParagraph1:
        'Обычные усилители срезают верхушки звуковой волны выше 0.0 dBFS, из-за чего появляется неприятный треск.',
      limiterParagraph2:
        'IncreaseVolume объединяет GainNode и студийный DynamicsCompressorNode с порогом -0.5 дБ, поднимая тихую речь до 500% и мягко сдерживая резкие пики.',
      limiterBullet1: 'Потолок Brickwall -0.5 дБ: Полная защита от цифрового клиппинга.',
      limiterBullet2: 'Двухслойная волна 60fps: Наглядное сравнение исходной и усиленной амплитуды.',
      limiterBullet3: 'Мгновенное сравнение A/B: Переключайтесь между оригиналом и усиленным звуком на лету.',
      privacyHeading: '100% Приватность: Локальная Обработка Web Audio в Браузере',
      privacyParagraph1: 'Ваши личные голосовые записи и подкасты никогда не покидают ваше устройство.',
      privacyParagraph2: 'Установите PWA-приложение на главный экран и работайте со звуком даже без интернета.',
      privacyStat1Label: 'Загрузка на сервер',
      privacyStat1Value: '0 Байт (100% Локально)',
      privacyStat2Label: 'Макс. усиление',
      privacyStat2Value: '500% (+14.0 дБ)',
      privacyStat3Label: 'Офлайн PWA',
      privacyStat3Value: 'iOS, Android и ПК',
    },
    faq: {
      title: 'Частые вопросы (FAQ): Увеличение громкости аудио и MP3',
      subtitle: 'Всё, что нужно знать о безопасном усилении звука без потери качества.',
      items: [
        {
          q: 'Как бесплатно увеличить громкость аудиофайла онлайн?',
          a: 'Откройте IncreaseVolume, загрузите файл MP3, WAV, M4A, FLAC или OGG, установите ползунок до 500% (+14 дБ) и нажмите «Скачать Усиленное Аудио».',
        },
        {
          q: 'Как сделать MP3 громче без хрипов и искажений?',
          a: 'Оставьте включенным «Умный Анти-Клиппинг Лимитер». Он удерживает пики на уровне -0.5 дБ, сохраняя чистоту звука.',
        },
        {
          q: 'Загружаются ли мои файлы на чужой сервер?',
          a: 'Нет. Вся обработка выполняется локально в вашем браузере с помощью Web Audio API.',
        },
        {
          q: 'Какой формат выбрать при сохранении: MP3 или WAV?',
          a: 'Выбирайте .MP3 (192 кбит/с) для компактного размера и совместимости, или .WAV (16-бит PCM) для студийного качества без потерь.',
        },
      ],
    },
    footer: {
      description:
        'Бесплатный 100% локальный онлайн-усилитель громкости аудио и MP3 на базе Web Audio API. Усиление до 500% (+14 дБ) без искажений.',
      QuickLinks: 'Навигация',
      languagesHeading: 'Доступно на 8 языках',
      builtWith: 'Создано на Astro, React Islands и Web Audio API',
      supportCta: 'Поддержать разработчика на Ko-fi',
      copyright: '© 2026 IncreaseVolume (increasevolume.github.io). Лицензия MIT.',
    },
  },
};
