import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose to LAN
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    }
  }
})
