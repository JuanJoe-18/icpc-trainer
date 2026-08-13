// IndexedDB & Local API Storage Helper for ICPC Trainer Progress

const DB_NAME = "ICPC_Trainer_DB";
const STORE_NAME = "progress_store";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function readIndexedDB() {
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get("user_progress");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn("IndexedDB read error:", err);
    return null;
  }
}

export async function writeIndexedDB(data) {
  try {
    const db = await openDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(data, "user_progress");
  } catch (err) {
    console.warn("IndexedDB write error:", err);
  }
}

export async function fetchServerProgress() {
  try {
    const res = await fetch("/api/progress");
    if (res.ok) {
      const json = await res.json();
      return json && Object.keys(json).length > 0 ? json : null;
    }
  } catch (err) {
    console.warn("Server DB not reachable, using offline storage");
  }
  return null;
}

export async function saveServerProgress(data) {
  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.warn("Server save error:", err);
    return false;
  }
}
