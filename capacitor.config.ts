import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'trend.dev.paper',
  appName: 'TrendInsight',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    // hostname: 'localhost'
  },

  ios: {
    allowsLinkPreview: true,
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
