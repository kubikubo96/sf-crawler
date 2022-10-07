export const MINIMAL_ARGS = [
  '--disable-speech-api', // 	Disables the Web Speech API (both speech recognition and synthesis)
  '--disable-background-networking', // Disable several subsystems which run network requests in the background. This is for use when doing network performance testing to avoid noise in the measurements.
  '--disable-background-timer-throttling', // Disable task throttling of timer tasks from background pages.
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--disable-site-isolation-trials',
  '--window-size=1900,1000',
];

export const BLOCKED_ADS = [
  'googlesyndication.com',
  'adservice.google.com',
];