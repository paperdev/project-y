import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'trend.dev.paper',
  appName: 'paper',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
