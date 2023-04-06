import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isGitHubPages = true
const folderName = path.basename(process.cwd()) + '/'
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' && isGitHubPages ? '/' + folderName : '/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  mode,
  publicDir: './public',
  plugins: [react()],
  build: {
    outDir: './dist',
    assetsDir: './'
  }
})
