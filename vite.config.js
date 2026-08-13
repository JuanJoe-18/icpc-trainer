import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const dbPath = path.resolve(__dirname, 'src/data/progress.json')

function localDatabasePlugin() {
  return {
    name: 'local-database-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/progress') {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          
          if (req.method === 'OPTIONS') {
            res.statusCode = 204
            return res.end()
          }
          
          if (req.method === 'GET') {
            try {
              if (fs.existsSync(dbPath)) {
                const data = fs.readFileSync(dbPath, 'utf-8')
                res.setHeader('Content-Type', 'application/json')
                return res.end(data || '{}')
              }
            } catch (err) {
              console.error('Error reading progress db:', err)
            }
            res.setHeader('Content-Type', 'application/json')
            return res.end('{}')
          }
          
          if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk.toString() })
            req.on('end', () => {
              try {
                fs.mkdirSync(path.dirname(dbPath), { recursive: true })
                fs.writeFileSync(dbPath, body, 'utf-8')
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }))
              } catch (err) {
                console.error('Error writing progress db:', err)
                res.statusCode = 500
                return res.end(JSON.stringify({ error: err.message }))
              }
            })
            return
          }
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), localDatabasePlugin()],
})

