import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onlyyoushopping.app',
  appName: 'Only You Shopping',
  webDir: '.next',
  server: {
    url: 'https://only-you-shopping.vercel.app',
    cleartext: true
  }
};

export default config;