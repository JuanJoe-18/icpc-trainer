import fs from 'node:fs';
import path from 'node:path';

let memoryCache = null;

function loadSeedData() {
  if (memoryCache) return memoryCache;
  try {
    const seedPath = path.resolve(process.cwd(), 'src/data/progress.json');
    if (fs.existsSync(seedPath)) {
      memoryCache = JSON.parse(fs.readFileSync(seedPath, 'utf-8') || '{}');
      return memoryCache;
    }
  } catch {}
  return {};
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const current = loadSeedData();
    return res.status(200).json(current);
  }

  if (req.method === 'POST') {
    try {
      const existing = loadSeedData();
      const incoming = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      memoryCache = {
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
        lastUpdated: new Date().toISOString()
      };
      return res.status(200).json({ status: 'ok', timestamp: Date.now() });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
