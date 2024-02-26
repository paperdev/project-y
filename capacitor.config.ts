import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'td.dev.paper',
  appName: 'TrendInsight',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    // hostname: 'localhost'
  },

  ios: {
    scheme: 'TrendInsight',
    allowsLinkPreview: true,
    // contentInset: 'automatic',
  },

  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: '#FFFFFF',
      splashFullScreen: true,
      splashImmersive: true,
      // layoutName: 'launch_screen',
      useDialog: false,
    },
  },
};

export default config;
