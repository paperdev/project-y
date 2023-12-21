import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'trend.dev.paper',
  appName: 'paper',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
