import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onlyshopping.app',
  appName: 'only you shopping',

  webDir: '.next',

  server: {
    url: 'https://only-you-shopping.vercel.app',
    cleartext: true
  }
};

export default config;