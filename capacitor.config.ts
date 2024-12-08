import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agniguide.app',
  appName: 'AgniGuide',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
