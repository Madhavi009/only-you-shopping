import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onlyshopping.app',
  appName: 'only you shopping',
  server: {
    url: 'https://only-you-shopping.vercel.app',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      androidScaleType: "CENTER_INSIDE",
      showSpinner: false
    }
  }
};

export default config;