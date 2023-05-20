import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.sample.app',
  appName: 'testing',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
