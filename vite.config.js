import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const localDbPath = path.resolve(__dirname, 'src/data/progress.json')
const workspaceDbPath = '\\\\wsl.localhost\\Arch\\root\\CodeForces\\Training System\\icpc-trainer\\src\\data\\progress.json'

function readExistingDb() {
  for (const p of [localDbPath, workspaceDbPath]) {
    try {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf-8') || '{}')
      }
    } catch {}
  }
  return {}
}

function mergeDbData(existing, incoming) {
  return {
    ...existing,
    ...incoming,
    checked: { ...(existing.checked || {}), ...(incoming.checked || {}) },
    weekOverrides: { ...(existing.weekOverrides || {}), ...(incoming.weekOverrides || {}) },
    cpt: {
      problems: { ...(existing.cpt?.problems || {}), ...(incoming.cpt?.problems || {}) },
      readings: { ...(existing.cpt?.readings || {}), ...(incoming.cpt?.readings || {}) },
      theorems: { ...(existing.cpt?.theorems || {}), ...(incoming.cpt?.theorems || {}) },
      checkpoints: { ...(existing.cpt?.checkpoints || {}), ...(incoming.cpt?.checkpoints || {}) },
      notes: { ...(existing.cpt?.notes || {}), ...(incoming.cpt?.notes || {}) },
    },
    lastUpdated: incoming.lastUpdated || new Date().toISOString()
  }
}

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
            const data = readExistingDb()
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify(data))
          }
          
          if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk.toString() })
            req.on('end', () => {
              try {
                const incoming = JSON.parse(body || '{}')
                const existing = readExistingDb()
                const merged = mergeDbData(existing, incoming)
                const serialized = JSON.stringify(merged)

                fs.mkdirSync(path.dirname(localDbPath), { recursive: true })
                fs.writeFileSync(localDbPath, serialized, 'utf-8')
                try {
                  fs.mkdirSync(path.dirname(workspaceDbPath), { recursive: true })
                  fs.writeFileSync(workspaceDbPath, serialized, 'utf-8')
                } catch {}
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
  base: process.env.GITHUB_PAGES ? '/icpc-trainer/' : './',
  plugins: [react(), localDatabasePlugin()],
  server: {
    watch: {
      ignored: ['**/src/data/progress.json']
    }
  }
})
