import { useState, useMemo, useEffect, useRef } from "react";
import { CPT_MODULES, DAILY_SCHEDULE } from "./data/cptModules";
import { WEEKS } from "./data/weeks";
import seedDb from "./data/progress.json";
import { readIndexedDB, writeIndexedDB, fetchServerProgress, saveServerProgress } from "./utils/db";

const STORAGE_KEY = "icpc-training-progress";
const CPT_STORAGE_KEY = "cpt-intensive-progress-v1";

export const ICONS = {
  "dp": `<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9.5h17M3.5 15.5h17M9.5 3.5v17M15.5 3.5v17"/><rect x="3.5" y="3.5" width="6" height="6" rx="1" fill="currentColor" stroke="none"/>`,
  "impl": `<path d="M8 5l-5 7 5 7M16 5l5 7-5 7M13.5 4l-3 16"/>`,
  "graph": `<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.3 7.6h7.4M7.4 9l3.4 6.8M16.6 9l-3.4 6.8"/>`,
  "grafos": `<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.3 7.6h7.4M7.4 9l3.4 6.8M16.6 9l-3.4 6.8"/>`,
  "sort": `<path d="M4 20v-5M9 20v-9M14 20v-13"/><circle cx="18" cy="14" r="3"/><path d="M20.2 16.2L22.5 18.5"/>`,
  "rq": `<path d="M3 12h18"/><path d="M8 7.5v9M16 7.5v9"/><path d="M8 12h8" strokeWidth="3" opacity=".35"/>`,
  "tree": `<circle cx="12" cy="5" r="2.1"/><circle cx="6" cy="13" r="2.1"/><circle cx="18" cy="13" r="2.1"/><path d="M10.6 6.4L7.4 11.2M13.4 6.4l3.2 4.8"/><circle cx="3.5" cy="20" r="1.6"/><circle cx="8.5" cy="20" r="1.6"/><path d="M5.2 14.5L4 18.4M6.8 14.5L7.8 18.4"/>`,
  "arboles": `<circle cx="12" cy="5" r="2.1"/><circle cx="6" cy="13" r="2.1"/><circle cx="18" cy="13" r="2.1"/><path d="M10.6 6.4L7.4 11.2M13.4 6.4l3.2 4.8"/><circle cx="3.5" cy="20" r="1.6"/><circle cx="8.5" cy="20" r="1.6"/><path d="M5.2 14.5L4 18.4M6.8 14.5L7.8 18.4"/>`,
  "str": `<rect x="2.5" y="9" width="5.6" height="6" rx="1.6"/><rect x="9.2" y="9" width="5.6" height="6" rx="1.6"/><rect x="15.9" y="9" width="5.6" height="6" rx="1.6"/>`,
  "greedy": `<circle cx="12" cy="12" r="8"/><path d="M12 6.5v11M14.6 9C13.9 8.2 13 7.8 12 7.8c-2 0-2.6 2.2-1 3l2 1c1.7.8 1 3.2-1 3.2-1 0-1.9-.4-2.6-1.2"/>`,
  "sp": `<circle cx="4.5" cy="19.5" r="1.8" fill="currentColor" stroke="none"/><path d="M6 18.5c3-1 3.5-5 6-7" strokeDasharray="0.1 3.6"/><path d="M17 4v10M17 5h4l-1.6 2L21 9h-4"/>`,
  "slide": `<path d="M2.5 12h19"/><rect x="6.5" y="7.5" width="7" height="9" rx="1.4"/><path d="M16.5 9l3 3-3 3"/>`,
  "adv": `<path d="M4 18.5h16M5 18.5L3.4 9.5l4.8 3.8L12 6.5l3.8 6.8 4.8-3.8L19 18.5"/>`,
  "geo": `<path d="M12 4L4 19h16L12 4z"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="19" r="1.5" fill="currentColor" stroke="none"/>`,
  "geometria": `<path d="M12 4L4 19h16L12 4z"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="19" r="1.5" fill="currentColor" stroke="none"/>`,
  "flow": `<path d="M3 7h5c3.5 0 1.5 5 5 5M3 17h5c3.5 0 1.5-5 5-5M13 12h6"/><path d="M16.5 9.5L19 12l-2.5 2.5"/>`,
  "bs": `<path d="M3 12h18M12 6.5v11"/><path d="M8 9l-3 3 3 3M16 9l3 3-3 3"/>`,
  "topo": `<circle cx="5" cy="12" r="2.1"/><circle cx="12" cy="12" r="2.1"/><circle cx="19" cy="12" r="2.1"/><path d="M7.2 12h2.6M14.2 12h2.6"/><path d="M8.6 10.9l1.2 1.1-1.2 1.1M15.6 10.9l1.2 1.1-1.2 1.1"/>`,
  "toposort": `<circle cx="5" cy="12" r="2.1"/><circle cx="12" cy="12" r="2.1"/><circle cx="19" cy="12" r="2.1"/><path d="M7.2 12h2.6M14.2 12h2.6"/>`,
  "dsu": `<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>`,
  "scc": `<path d="M19.5 12a7.5 7.5 0 10-2.4 5.5"/><path d="M17 13.5v4h4"/>`,
  "func": `<circle cx="14" cy="9.5" r="5"/><path d="M11 13.2L7 20"/><path d="M9 18.6L7 20l-.3-2.4"/>`,
  "contest": `<circle cx="12" cy="13.5" r="6.8"/><path d="M12 13.5V9.5M10 2.5h4M18.6 6.4l1.6-1.6"/>`,
  "cses": `<path d="M6 4h11a1.5 1.5 0 011.5 1.5V20H7.5A1.5 1.5 0 016 18.5V4z"/><path d="M6 17.5A1.5 1.5 0 017.5 16H18.5"/><path d="M9.5 8.5h6M9.5 11.5h4"/>`,
  "usaco": `<path d="M5.5 8.5C4 8 3 9 3.4 10.8M18.5 8.5C20 8 21 9 20.6 10.8"/><path d="M5 10c0-3.2 3-5.5 7-5.5s7 2.3 7 5.5c0 5-3 8.5-7 8.5S5 15 5 10z"/>`,
  "st-empty": `<rect x="4" y="4" width="16" height="16" rx="4"/>`,
  "st-practice": `<path d="M13 2.5L5 13h5l-1 8.5L19.5 10H13z" fill="currentColor" stroke="none"/>`,
  "st-done": `<rect x="4" y="4" width="16" height="16" rx="4" opacity=".25"/><path d="M7.5 12.2l3.2 3.3L16.8 9"/>`,
  "st-review": `<path d="M4.5 10A8 8 0 0118 6.5l2.5 2M19.5 14A8 8 0 016 17.5L3.5 15.5"/><path d="M20.5 4v4.5H16M3.5 20v-4.5H8"/>`,
  "st-postponed": `<path d="M5 4l10 8-10 8V4zM19 4v16"/>`,
  "drag-grip": `<circle cx="8" cy="6" r="1.5" fill="currentColor"/><circle cx="14" cy="6" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="1.5" fill="currentColor"/><circle cx="14" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="18" r="1.5" fill="currentColor"/><circle cx="14" cy="18" r="1.5" fill="currentColor"/>`,
  "st-star": `<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.8 6.4 20.6l1.1-6.2L3 8.0l6.2-.9z" fill="currentColor" stroke="none"/>`,
  "map": `<path d="M9 4L3 6.2v14L9 18l6 2.2 6-2.2V4l-6 2.2L9 4z"/><path d="M9 4v14M15 6.2v14"/>`,
  "calendar": `<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><rect x="6.8" y="12.5" width="3.2" height="3.2" rx=".6" fill="currentColor" stroke="none"/>`,
  "book": `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,
  "clock": `<circle cx="12" cy="12" r="8"/><path d="M12 7.5v4.8l3.2 2"/>`
};

const Icon = ({ name, size = 16, className = "", style = {} }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    className={className}
    style={{ shapeRendering: "crispEdges", ...style }}
    dangerouslySetInnerHTML={{ __html: ICONS[name] || ICONS["dp"] }}
  />
);

function MathBlock({ latex }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.katex) {
      try {
        window.katex.render(latex, ref.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch {
        ref.current.textContent = latex;
      }
    } else if (ref.current) {
      ref.current.textContent = latex;
    }
  }, [latex]);
  return <div className="math-display" ref={ref}>{latex}</div>;
}

const TECH_LABELS = {
  impl: "Impl", graph: "Grafos", sp: "ShortPath", topo: "TopoSort", scc: "SCC",
  func: "FuncGraph", dsu: "DSU", flow: "Flow", dp: "DP", tree: "Árboles",
  rq: "RangeQ", str: "Strings", geo: "Geometría", adv: "Advanced", sort: "Sort&Search",
  slide: "SlidingW", bs: "BinSearch", greedy: "Greedy", mixed: "Mix", contest: "Contest"
};

const SRC_LABELS = { C: "CSES", UB: "USACO🥉", US: "USACO🥈", UG: "USACO🥇", UP: "USACO💎", CF: "CF", CT: "Equipo" };

const PHASE_INFO = {
  vac: { label: "VACACIONES", sub: "5 hrs/día", color: "#00e5a0", bg: "rgba(0,229,160,0.06)" },
  sem: { label: "SEMESTRE", sub: "2-3 hrs L-V · 4-5 hrs S-D", color: "#38bdf8", bg: "rgba(56,189,248,0.06)" },
  sim: { label: "SIMULACROS", sub: "Modo competencia", color: "#ff6b9d", bg: "rgba(255,107,157,0.06)" }
};

const IMG = {
  impl: "/res/Implementation.jpg", graph: "/res/Graphs.jpg", sp: "/res/ShortPath-Flow-Advanced.png",
  topo: "/res/Topo.png", scc: "/res/scc.png", func: "/res/FuncGraphs.png", dsu: "/res/DSU.png",
  flow: "/res/ShortPath-Flow-Advanced.png", dp: "/res/DP.png", tree: "/res/tree.png",
  rq: "/res/rq.jpg", str: "/res/strinsg.jpg", geo: "/res/Geom.png", adv: "/res/ShortPath-Flow-Advanced.png",
  sort: "/res/sorting&searching.jpg", slide: "/res/Sliding window.png", bs: "/res/BynarySearch.png",
  greedy: "/res/greedy.png", mixed: "/res/Implementation.jpg", contest: "/gifs/github-copilots.gif"
};

const GIFS = {
  impl: "/gifs/python-animated.gif", graph: "/gifs/framework-valley-react-banner.gif",
  sp: "/gifs/lua-banner.gif", topo: "/gifs/intermediate-python.gif", scc: "/gifs/javascript-course-banner.gif",
  func: "/gifs/custom-phaser.gif", dsu: "/gifs/sqlbanner.gif", flow: "/gifs/css-course-banner.gif",
  dp: "/gifs/matplotlib-banner.gif", tree: "/gifs/numpy-banner.gif", rq: "/gifs/html-parralax-combined.gif",
  str: "/gifs/p5courseimage.gif", geo: "/gifs/seo-bannergif.gif", adv: "/gifs/uiux.gif",
  sort: "/gifs/charp.webp", slide: "/gifs/genai-banner.webp", bs: "/gifs/dsabanner.png",
  greedy: "/gifs/nodejsbannerseo.png", mixed: "/gifs/intermediate-python.gif", contest: "/gifs/github-copilots.gif"
};

const PLATFORM_STYLE = {
  AtCoder: "src-cses",
  CSES: "src-cses",
  USACO: "src-usaco",
  CF: "src-cf",
  UVa: "tech",
  ICPC: "src-cf",
  Equipo: "tech g"
};

const problemKey = (problem) => {
  const [name, source, , , url] = problem;
  const identity = url || name.trim().toLowerCase();
  return `problem:${source}:${identity}`;
};

const POSTPONABLE_TECHS = new Set(["dp", "graph", "sp", "topo", "scc", "func", "dsu", "rq", "sort"]);

function migrateProgress(data) {
  const rawData = data || {};
  const migrated = Object.fromEntries(
    Object.entries(rawData).filter(([key]) => key.startsWith("problem:"))
  );

  WEEKS.forEach((week, wi) => {
    const isWeek6or7 = week.id === 6 || week.id === 7;
    const isEarlierWeek = week.id <= 5;

    week.days.forEach((day, di) => {
      day[1].forEach((problem, pi) => {
        const legacyStatus = rawData[`${wi}-${di}-${pi}`];
        const stableKey = problemKey(problem);

        if (legacyStatus !== undefined && (migrated[stableKey] === undefined || legacyStatus > migrated[stableKey])) {
          migrated[stableKey] = legacyStatus;
        }

        if (migrated[stableKey] === undefined) {
          if (isWeek6or7) migrated[stableKey] = 2;
          else if (isEarlierWeek && POSTPONABLE_TECHS.has(problem[2])) migrated[stableKey] = 4;
        }
      });
    });
  });

  return migrated;
}

function loadLegacyProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : (seedDb.checked || {});
  } catch {
    return seedDb.checked || {};
  }
}

function loadCptLocalState() {
  try {
    const raw = localStorage.getItem(CPT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : (seedDb.cpt || {});
  } catch {
    return seedDb.cpt || {};
  }
}

export default function Planner() {
  // Campamento CPT state
  const [moduleIdx, setModuleIdx] = useState(0);
  const [viewMode, setViewMode] = useState("training"); // 'training' | 'cpt-map' | 'schedule' | 'plan-20w' | 'map-20w'
  const [stageFilter, setStageFilter] = useState("all");
  const [filterStarred, setFilterStarred] = useState(false);
  const [activeRecall, setActiveRecall] = useState(false);
  const [revealedLines, setRevealedLines] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [dbStatus, setDbStatus] = useState("connecting");

  // 20-Week Legacy state (preserved 100%)
  const [weekIdx, setWeekIdx] = useState(5); // Default to Week 6+
  const [checked, setChecked] = useState(() => migrateProgress({ ...(seedDb.checked || {}), ...loadLegacyProgress() }));
  const [weekOverrides, setWeekOverrides] = useState(() => seedDb.weekOverrides || {});
  const [activeTech, setActiveTech] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);

  const [cptProgress, setCptProgress] = useState(() => {
    const init = loadCptLocalState();
    return {
      problems: init.problems || {},
      readings: init.readings || {},
      theorems: init.theorems || {},
      checkpoints: init.checkpoints || {},
      notes: init.notes || {}
    };
  });

  // Sync on Mount: Seed JSON + LocalStorage + IndexedDB + Server API
  useEffect(() => {
    async function syncMount() {
      const idb = await readIndexedDB();
      const srv = await fetchServerProgress();
      const locCpt = loadCptLocalState();
      const locLegacy = loadLegacyProgress();

      const mergedChecked = migrateProgress({
        ...(seedDb.checked || {}),
        ...locLegacy,
        ...(idb?.checked || {}),
        ...(srv?.checked || {})
      });
      setChecked(mergedChecked);

      const mergedOverrides = {
        ...(seedDb.weekOverrides || {}),
        ...(idb?.weekOverrides || {}),
        ...(srv?.weekOverrides || {})
      };
      setWeekOverrides(mergedOverrides);

      const mergedCpt = {
        problems: { ...(seedDb.cpt?.problems || {}), ...(locCpt.problems || {}), ...(idb?.cpt?.problems || {}), ...(srv?.cpt?.problems || {}) },
        readings: { ...(seedDb.cpt?.readings || {}), ...(locCpt.readings || {}), ...(idb?.cpt?.readings || {}), ...(srv?.cpt?.readings || {}) },
        theorems: { ...(seedDb.cpt?.theorems || {}), ...(locCpt.theorems || {}), ...(idb?.cpt?.theorems || {}), ...(srv?.cpt?.theorems || {}) },
        checkpoints: { ...(seedDb.cpt?.checkpoints || {}), ...(locCpt.checkpoints || {}), ...(idb?.cpt?.checkpoints || {}), ...(srv?.cpt?.checkpoints || {}) },
        notes: { ...(seedDb.cpt?.notes || {}), ...(locCpt.notes || {}), ...(idb?.cpt?.notes || {}), ...(srv?.cpt?.notes || {}) }
      };
      setCptProgress(mergedCpt);
      setDbStatus(srv ? "connected" : "offline");
    }
    syncMount();
  }, []);

  // Auto-save whenever CPT or 20-Week state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      localStorage.setItem(CPT_STORAGE_KEY, JSON.stringify(cptProgress));
    } catch {}

    const payload = {
      checked,
      weekOverrides,
      cpt: cptProgress,
      lastUpdated: new Date().toISOString()
    };

    writeIndexedDB(payload);

    const timer = setTimeout(async () => {
      setDbStatus("saving");
      const ok = await saveServerProgress(payload);
      setDbStatus(ok ? "connected" : "offline");
    }, 350);

    return () => clearTimeout(timer);
  }, [checked, weekOverrides, cptProgress]);

  const currentModule = CPT_MODULES[moduleIdx];

  // CPT Handlers
  const toggleReading = (id) => {
    setCptProgress((prev) => ({
      ...prev,
      readings: { ...prev.readings, [id]: !prev.readings[id] }
    }));
  };

  const toggleTheorem = (id) => {
    setCptProgress((prev) => ({
      ...prev,
      theorems: { ...prev.theorems, [id]: !prev.theorems[id] }
    }));
  };

  const cycleProblemStatus = (id) => {
    setCptProgress((prev) => {
      const curr = prev.problems[id] || 0;
      const next = (curr + 1) % 5;
      return {
        ...prev,
        problems: { ...prev.problems, [id]: next }
      };
    });
  };

  const updateNote = (id, text) => {
    setCptProgress((prev) => ({
      ...prev,
      notes: { ...prev.notes, [id]: text }
    }));
  };

  const handleAnswerCheckpoint = (modId, optIndex, correctIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [modId]: optIndex }));
    if (optIndex === correctIndex) {
      setCptProgress((prev) => ({
        ...prev,
        checkpoints: { ...prev.checkpoints, [modId]: true }
      }));
    }
  };

  // CPT Stats
  const moduleStats = useMemo(() => {
    return CPT_MODULES.map((m) => {
      const rTotal = m.readings.length;
      const rDone = m.readings.filter((r) => cptProgress.readings[r.id]).length;
      const tTotal = m.theorems.length;
      const tDone = m.theorems.filter((t) => cptProgress.theorems[t.id]).length;
      const cpDone = cptProgress.checkpoints[m.id] ? 1 : 0;
      const pTotal = m.problems.length;
      let pDone = 0, pPrac = 0, pRev = 0, pPost = 0, starred = 0, starredDone = 0, mins = 0;

      m.problems.forEach((p) => {
        mins += p.mins;
        if (p.starred) starred++;
        const st = cptProgress.problems[p.id] || 0;
        if (st === 2) {
          pDone++;
          if (p.starred) starredDone++;
        } else if (st === 1) pPrac++;
        else if (st === 3) pRev++;
        else if (st === 4) pPost++;
      });

      const totalItems = rTotal + tTotal + 1 + pTotal;
      const doneItems = rDone + tDone + cpDone + pDone + pPost;
      const xpPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

      return {
        rTotal, rDone, tTotal, tDone, cpDone,
        pTotal, pDone, pPrac, pRev, pPost,
        starred, starredDone, mins, totalItems, doneItems, xpPct
      };
    });
  }, [cptProgress]);

  const cptGlobalStats = useMemo(() => {
    return moduleStats.reduce(
      (acc, s) => ({
        rTotal: acc.rTotal + s.rTotal, rDone: acc.rDone + s.rDone,
        tTotal: acc.tTotal + s.tTotal, tDone: acc.tDone + s.tDone,
        cpDone: acc.cpDone + s.cpDone,
        pTotal: acc.pTotal + s.pTotal, pDone: acc.pDone + s.pDone,
        starred: acc.starred + s.starred, starredDone: acc.starredDone + s.starredDone,
        totalItems: acc.totalItems + s.totalItems, doneItems: acc.doneItems + s.doneItems
      }),
      { rTotal: 0, rDone: 0, tTotal: 0, tDone: 0, cpDone: 0, pTotal: 0, pDone: 0, starred: 0, starredDone: 0, totalItems: 0, doneItems: 0 }
    );
  }, [moduleStats]);

  const curStat = moduleStats[moduleIdx];

  // Legacy 20-Week Helpers
  const currentWeek = WEEKS[weekIdx];
  const activeDays = weekOverrides[currentWeek.id] || currentWeek.days;
  const pi = PHASE_INFO[currentWeek.phase];

  const toggleLegacyCheck = (problem) => {
    const key = problemKey(problem);
    setChecked((previous) => {
      const current = previous[key] || 0;
      const next = (current + 1) % 5;
      return { ...previous, [key]: next };
    });
  };

  const handleDragStart = (e, itemData) => {
    setDraggedItem(itemData);
    e.dataTransfer.setData("text/plain", JSON.stringify(itemData));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, targetDow) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverDay !== targetDow) setDragOverDay(targetDow);
  };

  const handleDragLeave = (e, targetDow) => {
    if (dragOverDay === targetDow) setDragOverDay(null);
  };

  const handleDrop = (e, weekId, targetDow) => {
    e.preventDefault();
    setDragOverDay(null);
    if (!draggedItem) return;
    const { sourceDow, problem } = draggedItem;
    if (sourceDow === targetDow) {
      setDraggedItem(null);
      return;
    }
    const newDays = activeDays.map(([dow, problems]) => {
      if (dow === sourceDow) return [dow, problems.filter((p) => problemKey(p) !== problemKey(problem))];
      if (dow === targetDow) return [dow, [...problems, problem]];
      return [dow, problems];
    });
    setWeekOverrides((prev) => ({ ...prev, [weekId]: newDays }));
    setDraggedItem(null);
  };

  const legacyWeekStats = useMemo(() => {
    return WEEKS.map((wk) => {
      const days = weekOverrides[wk.id] || wk.days;
      let total = 0, done = 0, postponed = 0, mins = 0, starred = 0, starredDone = 0;
      days.forEach((d) => {
        d[1].forEach((p) => {
          total++;
          mins += p[3];
          if (p[5]) starred++;
          const st = checked[problemKey(p)] || 0;
          if (st === 2) { done++; if (p[5]) starredDone++; }
          if (st === 4) { postponed++; if (p[5]) starredDone++; }
        });
      });
      return { total, done, postponed, mins, starred, starredDone };
    });
  }, [checked, weekOverrides]);

  const legacyTechStats = useMemo(() => {
    const stats = {};
    WEEKS.forEach((wk) => {
      const days = weekOverrides[wk.id] || wk.days;
      days.forEach((d) => d[1].forEach((p) => {
        const tech = p[2];
        if (!stats[tech]) stats[tech] = { total: 0, done: 0 };
        stats[tech].total++;
        const st = checked[problemKey(p)] || 0;
        if (st === 2 || st === 4) stats[tech].done++;
      }));
    });
    return stats;
  }, [checked, weekOverrides]);

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify({ checked, weekOverrides, cpt: cptProgress }, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "icpc-cpt-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.checked) setChecked(migrateProgress(parsed.checked));
        if (parsed.weekOverrides) setWeekOverrides(parsed.weekOverrides);
        if (parsed.cpt) setCptProgress((prev) => ({ ...prev, ...parsed.cpt }));
        else if (parsed.problems || parsed.readings) setCptProgress((prev) => ({ ...prev, ...parsed }));
      } catch {
        alert("Archivo JSON inválido");
      }
    };
    reader.readAsText(file);
  };

  const daysUntilContest = Math.max(0, Math.ceil((new Date("2026-11-07T00:00:00") - new Date()) / 864e5));

  const renderCptProblemRow = (p) => {
    const status = cptProgress.problems[p.id] || 0;
    const isDone = status === 2;
    const isPostponed = status === 4;
    const note = cptProgress.notes[p.id] || "";

    let boxCls = "";
    let boxContent = null;
    if (status === 1) { boxCls = "s1"; boxContent = <Icon name="st-practice" />; }
    else if (status === 2) { boxCls = "s2"; boxContent = <Icon name="st-done" />; }
    else if (status === 3) { boxCls = "s3"; boxContent = <Icon name="st-review" />; }
    else if (status === 4) { boxCls = "s4"; boxContent = <Icon name="st-postponed" />; }

    return (
      <div key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 4 }}>
        <div className={`prob ${isDone ? "done" : ""} ${isPostponed ? "postponed" : ""}`}>
          <div
            className={`box ${boxCls}`}
            onClick={() => cycleProblemStatus(p.id)}
            title="Click para ciclar estado"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {boxContent}
          </div>
          <div className="star" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {p.starred === 1 ? <Icon name="st-star" /> : null}
          </div>
          <div className="name">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "inherit", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>{p.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--ink-soft)" }}>
                [{p.problemId}] ↗
              </span>
            </a>
          </div>
          <div className="tags" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span
              className="tag"
              style={{
                background: "rgba(61, 155, 214, 0.12)",
                color: "var(--sky)",
                border: "1px solid rgba(61, 155, 214, 0.3)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600
              }}
            >
              🔗 {p.theoryLink}
            </span>
            <span className={`tag ${PLATFORM_STYLE[p.platform] || "tech"}`}>{p.platform}</span>
            <span className="tag tech">{TECH_LABELS[p.tech] || p.tech}</span>
          </div>
          <div className="time">{p.mins}m</div>
        </div>

        <details className="tactical-details">
          <summary>
            <span>🎯 VER ENFOQUE TÁCTICO & NOTAS ({p.problemId})</span>
            <span style={{ color: "var(--ink-soft)" }}>{note ? "📝 Con nota guardada" : "Desplegar pista ▾"}</span>
          </summary>
          <div className="tactical-content">
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: "var(--gold)" }}>Enfoque Táctico (Sin Spoiler de Código): </strong>
              {p.tacticalApproach}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
              <input
                type="text"
                value={note}
                onChange={(e) => updateNote(p.id, e.target.value)}
                placeholder="Escribe tu nota clave, complejidad o caso borde aprendido en este problema..."
                style={{
                  width: "100%",
                  background: "#14141f",
                  border: "1px solid var(--line-strong)",
                  borderRadius: 6,
                  padding: "7px 10px",
                  color: "var(--ink)",
                  fontSize: 12.5,
                  fontFamily: "var(--font-body)"
                }}
              />
            </div>
          </div>
        </details>
      </div>
    );
  };

  const renderLegacyProblem = (p, dow) => {
    const [name, src, tech, mins, url, starred] = p;
    const key = problemKey(p);
    const status = checked[key] || 0;
    const isDone = status === 2;
    const isPostponed = status === 4;
    const isDragging = draggedItem && problemKey(draggedItem.problem) === key;

    let boxCls = "";
    let boxContent = null;
    if (status === 1) { boxCls = "s1"; boxContent = <Icon name="st-practice" />; }
    else if (status === 2) { boxCls = "s2"; boxContent = <Icon name="st-done" />; }
    else if (status === 3) { boxCls = "s3"; boxContent = <Icon name="st-review" />; }
    else if (status === 4) { boxCls = "s4"; boxContent = <Icon name="st-postponed" />; }

    return (
      <div
        key={`${dow}-${key}`}
        draggable
        onDragStart={(e) => handleDragStart(e, { sourceDow: dow, problem: p })}
        className={`prob ${isDone ? "done" : ""} ${isPostponed ? "postponed" : ""} ${isDragging ? "dragging" : ""}`}
      >
        <div className="drag-handle" title="Arrastrar problema">
          <Icon name="drag-grip" size={14} />
        </div>
        <div
          className={`box ${boxCls}`}
          onClick={() => toggleLegacyCheck(p)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {boxContent}
        </div>
        <div className="star" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {starred === 1 ? <Icon name="st-star" /> : null}
        </div>
        <div className="name">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "inherit" }}>
              {name}
            </a>
          ) : (
            name
          )}
        </div>
        <div className="tags">
          {status === 4 && (
            <span
              className="tag"
              style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.4)" }}
            >
              Pospuesto
            </span>
          )}
          <span className={`tag ${src === "C" ? "src-cses" : src.startsWith("U") ? "src-usaco" : src === "CF" ? "src-cf" : "tech g"}`}>
            {SRC_LABELS[src]}
          </span>
          <span className="tag tech">{TECH_LABELS[tech]}</span>
        </div>
        <div className="time">{mins > 0 ? mins + "m" : "—"}</div>
      </div>
    );
  };

  return (
    <div className="wrap">
      {/* HERO BANNER CODEDEX STYLE */}
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: 22,
          border: "1.5px solid var(--line-strong)",
          boxShadow: "var(--shadow)",
          minHeight: 245,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "28px 34px",
          background: "#050508"
        }}
      >
        <img
          src={viewMode === "plan-20w" ? (GIFS[currentWeek.tech] || GIFS.mixed) : currentModule.gif}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
            opacity: 0.55,
            zIndex: 0
          }}
          alt="Hero Banner"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, var(--canvas) 0%, rgba(10,10,16,0.68) 48%, rgba(10,10,16,0.25) 100%)",
            zIndex: 1
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20
          }}
        >
          <div>
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span className="dot"></span> PLAN MAESTRO CPT · CAMPAMENTO INTENSIVO (25 OCT – 6 NOV)
              </span>
              <span className={`db-pill ${dbStatus}`}>
                {dbStatus === "connected" && "🟢 Auto-Sync DB Activo"}
                {dbStatus === "saving" && "🟡 Sincronizando..."}
                {dbStatus === "offline" && "🔵 Guardado Local (IndexedDB)"}
              </span>
            </div>
            <h1 className="title" style={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.85)", marginTop: 10 }}>
              Teoría Necesaria <span className="amp">→</span> Práctica Táctica
            </h1>
            <div className="sub" style={{ color: "var(--ink-soft)", textShadow: "0 1px 2px rgba(0,0,0,0.85)" }}>
              25 Oct → 6 Nov · <b>6 Módulos + Simulacro</b> · <b>{cptGlobalStats.rTotal} lecturas</b> (Halim / CPH / Web) ·{" "}
              <b>{cptGlobalStats.pTotal} problemas</b>
            </div>
          </div>
          <div className="countdown" style={{ textAlign: "right" }}>
            <div className="num" style={{ color: "var(--brand)", textShadow: "0 3px 0 var(--brand-deep)" }}>
              {daysUntilContest}
            </div>
            <span className="lbl" style={{ color: "rgba(255,255,255,0.75)" }}>
              días para el <b>7 de Noviembre</b>
            </span>
          </div>
        </div>
      </div>

      {/* GLOBAL STATS ROW */}
      <div className="stats">
        <div className="stat c-sky">
          <div className="v">
            {cptGlobalStats.rDone + cptGlobalStats.tDone}/{cptGlobalStats.rTotal + cptGlobalStats.tTotal}
          </div>
          <div className="k">📚 Teoría & Fórmulas</div>
        </div>
        <div className="stat c-gold">
          <div className="v">{cptGlobalStats.cpDone}/7</div>
          <div className="k">🧠 Checkpoints</div>
        </div>
        <div className="stat c-green">
          <div className="v">
            {cptGlobalStats.pDone}/{cptGlobalStats.pTotal}
          </div>
          <div className="k">✓ Problemas CPT</div>
        </div>
        <div className="stat c-coral">
          <div className="v">
            {cptGlobalStats.starredDone}/{cptGlobalStats.starred}
          </div>
          <div className="k">⭐ Esenciales CPT</div>
        </div>
        <div className="stat c-grape">
          <div className="v">
            {Math.round((cptGlobalStats.doneItems / Math.max(1, cptGlobalStats.totalItems)) * 100)}%
          </div>
          <div className="k">⚡ XP Campamento</div>
        </div>
      </div>

      {/* MAIN VIEW SWITCHER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div className="switch" style={{ flexWrap: "wrap" }}>
          <button
            className={`sw ${viewMode === "training" ? "on" : ""}`}
            onClick={() => setViewMode("training")}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <Icon name="book" /> Ruta: Teoría → Práctica
          </button>
          <button
            className={`sw ${viewMode === "cpt-map" ? "on" : ""}`}
            onClick={() => setViewMode("cpt-map")}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <Icon name="map" /> Mapa CPT (7)
          </button>
          <button
            className={`sw ${viewMode === "schedule" ? "on" : ""}`}
            onClick={() => setViewMode("schedule")}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <Icon name="calendar" /> Cronograma 13 Días
          </button>
          <button
            className={`sw ${viewMode === "plan-20w" ? "on" : ""}`}
            onClick={() => setViewMode("plan-20w")}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <Icon name="calendar" /> Plan 20 Semanas
          </button>
          <button
            className={`sw ${viewMode === "map-20w" ? "on" : ""}`}
            onClick={() => setViewMode("map-20w")}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <Icon name="map" /> Mapa General
          </button>
        </div>

        <div className="tools">
          <button className={`tool ${filterStarred ? "on" : ""}`} onClick={() => setFilterStarred(!filterStarred)}>
            ⭐ Solo Esenciales
          </button>
          <button className="tool" onClick={exportBackup}>
            💾 Exportar
          </button>
          <label className="tool" style={{ margin: 0 }}>
            📥 Importar
            <input type="file" accept=".json" onChange={importBackup} style={{ display: "none" }} />
          </label>
        </div>
      </div>

      {/* ==================== VIEW 1: MAPA DE MÓDULOS CPT (7 MUNDOS) ==================== */}
      {viewMode === "cpt-map" && (
        <section id="view-map">
          <div className="map-intro">
            Cada módulo del <b>Plan Maestro CPT</b> es un mundo diseñado bajo el ciclo{" "}
            <b>Lectura Exacta → Intuición & Matemática → Pseudocódigo → Práctica</b>. Haz clic en un módulo para entrenarlo.
          </div>
          <div className="grid">
            {CPT_MODULES.map((m, idx) => {
              const s = moduleStats[idx];
              const isDone = s.xpPct === 100;
              return (
                <div
                  key={m.id}
                  className={`tcard ${isDone ? "done-tech" : ""}`}
                  onClick={() => {
                    setModuleIdx(idx);
                    setViewMode("training");
                  }}
                >
                  <div className="ban">
                    <img src={m.img} alt={m.shortTitle} />
                    <div className="lvl">{m.daysLabel}</div>
                    <div className="cnt">XP {s.xpPct}%</div>
                  </div>
                  <div className="body">
                    <div className="nm">
                      <span className="g" style={{ display: "flex", color: m.color }}>
                        <Icon name={m.tech} size={20} />
                      </span>
                      {m.code}: {m.shortTitle}
                    </div>
                    <div className="fl">{m.focus}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        color: "var(--ink-soft)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: 4
                      }}
                    >
                      <span>📚 Teoría: {s.rDone + s.tDone}/{s.rTotal + s.tTotal}</span>
                      <span>⚔️ Práctica: {s.pDone}/{s.pTotal}</span>
                    </div>
                    <div className={`pbar ${m.accent}`}>
                      <i style={{ width: `${s.xpPct}%` }}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================== VIEW 2: CRONOGRAMA TÁCTICO DE 13 DÍAS ==================== */}
      {viewMode === "schedule" && (
        <section id="view-schedule" style={{ marginTop: 18 }}>
          <div className="stage-card">
            <div className="stage-head">
              <div>
                <div className="stage-badge" style={{ background: "var(--grape-tint)", color: "#b49df7" }}>
                  FASE 1 · HOJA DE RUTA DÍA POR DÍA
                </div>
                <h2 className="stage-title">Cronograma Táctico de 13 Días (25 Oct – 6 Nov)</h2>
                <p className="stage-desc">
                  Haz clic en cualquier día para abrir directamente su módulo de Teoría Necesaria → Práctica.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DAILY_SCHEDULE.map((d) => {
                const mod = CPT_MODULES.find((m) => m.id === d.moduleId);
                const dayProbs = mod.problems.filter((p) => p.day === d.day);
                const doneProbs = dayProbs.filter((p) => (cptProgress.problems[p.id] || 0) === 2).length;
                const isToday = d.day === 1;

                return (
                  <div
                    key={d.day}
                    className="reading-item"
                    style={{
                      borderLeft: `4px solid ${mod.color}`,
                      background: isToday ? "rgba(67, 179, 107, 0.08)" : "var(--card)",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setModuleIdx(d.moduleId - 1);
                      setViewMode("training");
                    }}
                  >
                    <div style={{ minWidth: 130 }}>
                      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 9, color: mod.color }}>
                        {d.label}
                      </div>
                      {isToday && (
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 5,
                            fontFamily: "var(--font-pixel)",
                            fontSize: 7.5,
                            padding: "3px 6px",
                            borderRadius: 4,
                            background: "var(--brand)",
                            color: "#06150c"
                          }}
                        >
                          📍 HOY · DÍA 1
                        </span>
                      )}
                    </div>
                    <div className="reading-main">
                      <div className="reading-sec" style={{ color: "#fff" }}>
                        {mod.code}: {mod.title}
                      </div>
                      <div className="reading-topic" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                        {d.focus}
                      </div>
                    </div>
                    <div className="reading-pages">
                      <span className="page-chip">
                        ⚔️ {doneProbs}/{dayProbs.length} ejercicios
                      </span>
                      <span className="pdf-link">Ir al Módulo →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================== VIEW 3: RUTA DE ENTRENAMIENTO (TEORÍA -> PRÁCTICA) ==================== */}
      {viewMode === "training" && (
        <section id="view-training">
          <div className="module-pills">
            {CPT_MODULES.map((m, idx) => {
              const s = moduleStats[idx];
              return (
                <button
                  key={m.id}
                  className={`mpill ${moduleIdx === idx ? "active" : ""}`}
                  onClick={() => {
                    setModuleIdx(idx);
                    setRevealedLines({});
                  }}
                >
                  <div className="m-top">
                    <span>{m.code}</span>
                    <span>{s.xpPct}%</span>
                  </div>
                  <div className="m-title">{m.shortTitle}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{m.daysLabel}</div>
                  <div className="m-bar">
                    <i style={{ width: `${s.xpPct}%` }}></i>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="banner"
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#050508",
              padding: "26px 28px 22px",
              border: "2px solid var(--line-strong)"
            }}
          >
            <img
              src={currentModule.gif}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "pixelated",
                opacity: 0.85,
                zIndex: 0
              }}
              alt="Module bg"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(10,10,16,0.92) 0%, rgba(10,10,16,0.72) 55%, rgba(10,10,16,0.35) 100%)",
                zIndex: 1
              }}
            />

            <div
              className="meta"
              style={{
                position: "relative",
                zIndex: 2,
                marginBottom: 10,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  background: "rgba(0,0,0,0.65)",
                  padding: "5px 10px",
                  borderRadius: 6,
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)"
                }}
              >
                {currentModule.code} · {currentModule.daysLabel}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  background: `${currentModule.color}25`,
                  padding: "5px 10px",
                  borderRadius: 6,
                  color: currentModule.color,
                  border: `1px solid ${currentModule.color}55`
                }}
              >
                📚 Teoría {curStat.rDone + curStat.tDone}/{curStat.rTotal + curStat.tTotal} · ⚔️ Práctica {curStat.pDone}/{curStat.pTotal}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  color: "var(--gold)",
                  marginLeft: "auto",
                  textShadow: "0 2px 4px rgba(0,0,0,0.9)"
                }}
              >
                ⭐ {curStat.starredDone}/{curStat.starred} esenciales · ~{Math.round(curStat.mins / 60)}h práctica
              </span>
            </div>

            <h2
              style={{
                position: "relative",
                zIndex: 2,
                color: "#fff",
                textShadow: "0 3px 6px rgba(0,0,0,0.9)",
                fontFamily: "var(--font-pixel)",
                fontSize: "clamp(14px, 2vw, 19px)",
                fontWeight: 400,
                marginTop: 4,
                textTransform: "uppercase",
                lineHeight: 1.45
              }}
            >
              {currentModule.title}
            </h2>
            <p
              style={{
                position: "relative",
                zIndex: 2,
                color: "rgba(255,255,255,0.88)",
                textShadow: "0 2px 4px rgba(0,0,0,0.9)",
                maxWidth: 720,
                fontSize: 14,
                lineHeight: 1.5,
                margin: "6px 0 0"
              }}
            >
              {currentModule.focus}
            </p>

            <div
              className="xp"
              style={{
                position: "relative",
                zIndex: 2,
                marginTop: 16,
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.14)"
              }}
            >
              <i style={{ width: `${curStat.xpPct}%` }}></i>
            </div>
          </div>

          <div className="flow-stepper">
            <button
              className={`fstep ${stageFilter === "readings" ? "active" : ""} ${curStat.rDone === curStat.rTotal ? "done-step" : ""}`}
              onClick={() => setStageFilter(stageFilter === "readings" ? "all" : "readings")}
            >
              <div className="fstep-num">{curStat.rDone === curStat.rTotal ? "✓" : "1"}</div>
              <div className="fstep-info">
                <div className="fstep-kicker">PASO 1 · BASE</div>
                <div className="fstep-label">Lecturas Guiadas</div>
                <div className="fstep-sub">{curStat.rDone}/{curStat.rTotal} leídas (Halim/CPH)</div>
              </div>
            </button>

            <button
              className={`fstep ${stageFilter === "math" ? "active" : ""} ${curStat.tDone === curStat.tTotal ? "done-step" : ""}`}
              onClick={() => setStageFilter(stageFilter === "math" ? "all" : "math")}
            >
              <div className="fstep-num">{curStat.tDone === curStat.tTotal ? "✓" : "2"}</div>
              <div className="fstep-info">
                <div className="fstep-kicker">PASO 2 · RIGOR</div>
                <div className="fstep-label">Intuición & Matemática</div>
                <div className="fstep-sub">{curStat.tDone}/{curStat.tTotal} teoremas dominados</div>
              </div>
            </button>

            <button
              className={`fstep ${stageFilter === "pseudo" ? "active" : ""} ${curStat.cpDone ? "done-step" : ""}`}
              onClick={() => setStageFilter(stageFilter === "pseudo" ? "all" : "pseudo")}
            >
              <div className="fstep-num">{curStat.cpDone ? "✓" : "3"}</div>
              <div className="fstep-info">
                <div className="fstep-kicker">PASO 3 · PLANTILLA</div>
                <div className="fstep-label">Pseudocódigo & Reto</div>
                <div className="fstep-sub">{curStat.cpDone ? "Checkpoint superado ✓" : "Checkpoint pendiente"}</div>
              </div>
            </button>

            <button
              className={`fstep ${stageFilter === "practice" ? "active" : ""} ${curStat.pDone === curStat.pTotal ? "done-step" : ""}`}
              onClick={() => setStageFilter(stageFilter === "practice" ? "all" : "practice")}
            >
              <div className="fstep-num">{curStat.pDone === curStat.pTotal ? "✓" : "4"}</div>
              <div className="fstep-info">
                <div className="fstep-kicker">PASO 4 · EJECUCIÓN</div>
                <div className="fstep-label">Batería de Ejercicios</div>
                <div className="fstep-sub">{curStat.pDone}/{curStat.pTotal} resueltos</div>
              </div>
            </button>
          </div>

          {stageFilter !== "all" && (
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "flex-end" }}>
              <button className="tool" onClick={() => setStageFilter("all")}>
                👁️ Mostrar las 4 etapas completas del módulo
              </button>
            </div>
          )}

          {(stageFilter === "all" || stageFilter === "readings") && (
            <div className="stage-card">
              <div className="stage-head">
                <div>
                  <div className="stage-badge" style={{ background: "var(--coral-tint)", color: "var(--coral)" }}>
                    ETAPA 1 DE 4 · TEORÍA NECESARIA
                  </div>
                  <h3 className="stage-title">1. Referencias Teóricas Exactas (Halim ES.pdf, CPH.pdf y Web)</h3>
                  <p className="stage-desc">
                    Paginación verificada: <code>p.</code> es la página impresa; <code>PDF</code> indica la página exacta en el visor.
                  </p>
                </div>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--brand)" }}>
                  {curStat.rDone}/{curStat.rTotal} COMPLETADAS
                </div>
              </div>

              <div className="reading-list">
                {currentModule.readings.map((r) => {
                  const isRead = !!cptProgress.readings[r.id];
                  return (
                    <div key={r.id} className={`reading-item ${isRead ? "read-done" : ""}`}>
                      <div
                        className={`box ${isRead ? "s2" : ""}`}
                        onClick={() => toggleReading(r.id)}
                        title="Marcar lectura como completada"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        {isRead ? <Icon name="st-done" /> : null}
                      </div>

                      <span className={`src-badge ${r.badge}`}>{r.source}</span>

                      <div className="reading-main">
                        <div className="reading-sec">
                          {r.section} {r.essential && <span style={{ color: "var(--gold)" }}>★ Esencial</span>}
                        </div>
                        <div className="reading-topic">{r.topic}</div>
                      </div>

                      <div className="reading-pages">
                        <span className="page-chip">{r.printPages}</span>
                        <span className="page-chip" style={{ color: "var(--sky)" }}>
                          {r.pdfPages}
                        </span>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="pdf-link">
                          📖 Abrir {r.source === "ES.pdf" || r.source === "CPH.pdf" ? "PDF" : "Recurso"} ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentModule.coverageNote && (
                <div className="tactical-tip" style={{ marginTop: 14 }}>
                  📌 <b>Nota de cobertura verificada:</b> {currentModule.coverageNote}
                </div>
              )}
            </div>
          )}

          {(stageFilter === "all" || stageFilter === "math") && (
            <div className="stage-card">
              <div className="stage-head">
                <div>
                  <div className="stage-badge" style={{ background: "var(--gold-tint)", color: "var(--gold)" }}>
                    ETAPA 2 DE 4 · INTUICIÓN FÍSICA & RIGOR MATEMÁTICO
                  </div>
                  <h3 className="stage-title">2. Analogía del Mundo Real y Fórmulas Clave</h3>
                  <p className="stage-desc">
                    Comprende primero el modelo mental físico y luego valida cada invariante matemática antes de ver el pseudocódigo.
                  </p>
                </div>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--gold)" }}>
                  {curStat.tDone}/{curStat.tTotal} TEOREMAS DOMINADOS
                </div>
              </div>

              <div className="analogy-grid">
                {currentModule.analogies.map((an, i) => (
                  <div key={i} className="analogy-box">
                    <div className="analogy-title">
                      <span style={{ fontSize: 20 }}>{an.icon}</span>
                      <span>Analogía Física: {an.title}</span>
                    </div>
                    <p className="analogy-body">{an.body}</p>
                  </div>
                ))}
              </div>

              {currentModule.theorems.map((th) => {
                const isMastered = !!cptProgress.theorems[th.id];
                return (
                  <div key={th.id} className={`theorem-card ${isMastered ? "mastered" : ""}`}>
                    <div className="theorem-top">
                      <div className="theorem-title">{th.title}</div>
                      <button
                        className={`tool ${isMastered ? "on" : ""}`}
                        onClick={() => toggleTheorem(th.id)}
                        style={{
                          background: isMastered ? "var(--brand-tint)" : "var(--surface)",
                          color: isMastered ? "var(--brand)" : "var(--ink-soft)",
                          borderColor: isMastered ? "var(--brand)" : "var(--line-strong)"
                        }}
                      >
                        {isMastered ? "✓ Teorema Dominado" : "Marcar como Dominado"}
                      </button>
                    </div>
                    <p style={{ margin: "4px 0 8px", color: "var(--ink-soft)", fontSize: 14 }}>{th.explanation}</p>
                    <MathBlock latex={th.latex} />
                    <div className="tactical-tip">
                      ⚡ <b>Regla Táctica:</b> {th.tacticalNote}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(stageFilter === "all" || stageFilter === "pseudo") && (
            <div className="stage-card">
              <div className="stage-head">
                <div>
                  <div className="stage-badge" style={{ background: "var(--sky-tint)", color: "var(--sky)" }}>
                    ETAPA 3 DE 4 · DEL CONCEPTO AL ALGORITMO
                  </div>
                  <h3 className="stage-title">3. Pseudocódigo Táctico & Checkpoint de Verificación</h3>
                  <p className="stage-desc">
                    Activa el modo <b>Active Recall</b> para ocultar las líneas críticas y poner a prueba tu memoria antes de pasar a los problemas.
                  </p>
                </div>
                <button
                  className={`tool ${activeRecall ? "on" : ""}`}
                  onClick={() => {
                    setActiveRecall(!activeRecall);
                    setRevealedLines({});
                  }}
                >
                  {activeRecall ? "👁️ Mostrar Todo el Pseudocódigo" : "🧠 Active Recall: Ocultar Líneas Clave"}
                </button>
              </div>

              <div className="pseudo-box">
                <div className="pseudo-bar">
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, color: "var(--gold)" }}>
                    ⚙️ {currentModule.pseudocode.title}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--sky)" }}>
                    {currentModule.pseudocode.complexity}
                  </span>
                </div>
                <div className="pseudo-lines">
                  {currentModule.pseudocode.lines.map((ln, idx) => {
                    const isComment = ln.code.trim().startsWith("//");
                    const isBlurred = activeRecall && ln.key && !revealedLines[idx];
                    return (
                      <div key={idx} className="pline">
                        <span className="pline-num">{idx + 1}</span>
                        <span
                          className={`pline-code ${isComment ? "comment" : ""} ${isBlurred ? "blurred" : ""}`}
                          onClick={() => {
                            if (isBlurred) {
                              setRevealedLines((prev) => ({ ...prev, [idx]: true }));
                            }
                          }}
                          title={isBlurred ? "Click para revelar esta línea clave" : ""}
                        >
                          {ln.code || " "}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`checkpoint-box ${cptProgress.checkpoints[currentModule.id] ? "solved" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: 9,
                      color: cptProgress.checkpoints[currentModule.id] ? "var(--brand)" : "var(--sky)"
                    }}
                  >
                    {cptProgress.checkpoints[currentModule.id]
                      ? "✓ CHECKPOINT SUPERADO · LISTO PARA LA BATERÍA DE PRÁCTICA"
                      : "🛡️ CHECKPOINT DE VERIFICACIÓN DE CONCEPTO (ANTES DE CODIFICAR)"}
                  </span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "6px 0 12px", lineHeight: 1.5 }}>
                  {currentModule.checkpoint.question}
                </p>

                <div>
                  {currentModule.checkpoint.options.map((opt, oIdx) => {
                    const chosen = selectedAnswers[currentModule.id];
                    const isCorrect = oIdx === currentModule.checkpoint.correctIndex;
                    const isChosen = chosen === oIdx;
                    const alreadySolved = !!cptProgress.checkpoints[currentModule.id];

                    let cls = "cp-opt";
                    if ((isChosen && isCorrect) || (alreadySolved && isCorrect)) cls += " correct";
                    else if (isChosen && !isCorrect) cls += " wrong";

                    return (
                      <button
                        key={oIdx}
                        className={cls}
                        onClick={() => handleAnswerCheckpoint(currentModule.id, oIdx, currentModule.checkpoint.correctIndex)}
                      >
                        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, marginTop: 3 }}>
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {(selectedAnswers[currentModule.id] !== undefined || cptProgress.checkpoints[currentModule.id]) && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: "11px 14px",
                      borderRadius: 8,
                      background:
                        selectedAnswers[currentModule.id] === currentModule.checkpoint.correctIndex ||
                        cptProgress.checkpoints[currentModule.id]
                          ? "rgba(67, 179, 107, 0.14)"
                          : "rgba(230, 101, 145, 0.14)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: 13.5,
                      lineHeight: 1.55
                    }}
                  >
                    {selectedAnswers[currentModule.id] === currentModule.checkpoint.correctIndex ||
                    cptProgress.checkpoints[currentModule.id] ? (
                      <>
                        <strong style={{ color: "var(--brand)" }}>✓ Razonamiento Exacto: </strong>
                        {currentModule.checkpoint.explanation}
                      </>
                    ) : (
                      <>
                        <strong style={{ color: "var(--coral)" }}>✗ Revisa la invariante: </strong>
                        Piensa en qué dirección se mueven los subproblemas o qué condición garantiza que ningún estado dependa de un valor no calculado. ¡Intenta otra opción!
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {(stageFilter === "all" || stageFilter === "practice") && (
            <div className="stage-card">
              <div className="stage-head">
                <div>
                  <div className="stage-badge" style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
                    ETAPA 4 DE 4 · APLICACIÓN PRÁCTICA EN JUEZ
                  </div>
                  <h3 className="stage-title">4. Batería de Ejercicios ({currentModule.shortTitle})</h3>
                  <p className="stage-desc">
                    Cada problema indica qué lectura o teorema de las Etapas 1–3 aplica. Haz clic en la casilla para cambiar el estado o abre el desplegable táctico si necesitas una pista sin spoilers.
                  </p>
                </div>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--brand)" }}>
                  {curStat.pDone}/{curStat.pTotal} RESUELTOS
                </div>
              </div>

              {currentModule.dayNums.map((dayNum, dIdx) => {
                const dayProbs = currentModule.problems.filter(
                  (p) => p.day === dayNum && (!filterStarred || p.starred === 1)
                );
                if (dayProbs.length === 0) return null;
                const totalMins = dayProbs.reduce((s, p) => s + p.mins, 0);
                const daySchedule = DAILY_SCHEDULE.find((d) => d.day === dayNum);

                return (
                  <div
                    key={dayNum}
                    className={`day ${dIdx === 0 ? "block-theory" : "block-team"}`}
                    style={{ marginBottom: 14 }}
                  >
                    <div className="day-head">
                      <div>
                        <div className="day-name">
                          {daySchedule ? daySchedule.label : `Día ${dayNum}`} ·{" "}
                          {dIdx === 0 ? "Calentamiento & Fijación de Teoría" : "Problemas Jefe & Consolidación"}
                        </div>
                      </div>
                      <div className="day-min">{totalMins} min estimados</div>
                    </div>
                    {dayProbs.map((p) => renderCptProblemRow(p))}
                  </div>
                );
              })}

              <div className="panel" style={{ marginBottom: 0 }}>
                <div className="ph">ESTADOS · HAZ CLICK EN LA CASILLA DEL PROBLEMA PARA CICLAR</div>
                <div className="legend">
                  <div className="leg"><span className="swatch"></span> No hecho</div>
                  <div className="leg"><span className="swatch s1"><Icon name="st-practice" /></span> Practicando</div>
                  <div className="leg"><span className="swatch s2"><Icon name="st-done" /></span> Completado</div>
                  <div className="leg"><span className="swatch s3"><Icon name="st-review" /></span> Repasando</div>
                  <div className="leg"><span className="swatch s4"><Icon name="st-postponed" /></span> Pospuesto</div>
                </div>
              </div>
            </div>
          )}

          <div className="wnav">
            <button
              className="wbtn"
              disabled={moduleIdx === 0}
              onClick={() => {
                setModuleIdx((m) => Math.max(0, m - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ← {moduleIdx > 0 ? CPT_MODULES[moduleIdx - 1].code + ": " + CPT_MODULES[moduleIdx - 1].shortTitle : "Inicio"}
            </button>
            <button
              className="wbtn next"
              disabled={moduleIdx === CPT_MODULES.length - 1}
              onClick={() => {
                setModuleIdx((m) => Math.min(CPT_MODULES.length - 1, m + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {moduleIdx < CPT_MODULES.length - 1
                ? CPT_MODULES[moduleIdx + 1].code + ": " + CPT_MODULES[moduleIdx + 1].shortTitle + " →"
                : "Campamento Completado 🏁"}
            </button>
          </div>
        </section>
      )}

      {/* ==================== VIEW 4: PLAN DE 20 SEMANAS (HISTORIAL COMPLETO) ==================== */}
      {viewMode === "plan-20w" && (
        <section id="view-plan" style={{ marginTop: 14 }}>
          <div className="ph" style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--ink-faint)", marginBottom: 10 }}>
            PLAN GENERAL · 20 SEMANAS (HISTORIAL SINCRONIZADO)
          </div>
          <div className="tabs">
            {WEEKS.map((wk, i) => (
              <div key={i} className={`tab ${weekIdx === i ? "active" : ""}`} onClick={() => setWeekIdx(i)}>
                {i + 1}
              </div>
            ))}
          </div>

          <div
            className="banner"
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#050508",
              padding: "30px 28px 24px",
              border: "2px solid var(--line-strong)"
            }}
          >
            <img
              src={GIFS[currentWeek.tech] || (currentWeek.phase === "sim" ? GIFS.contest : GIFS.mixed)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "pixelated",
                opacity: 1,
                zIndex: 0
              }}
              alt="bg"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(10,10,16,0.85) 0%, rgba(10,10,16,0.5) 50%, transparent 100%)",
                zIndex: 1
              }}
            />

            <div
              className="meta"
              style={{
                position: "relative",
                zIndex: 2,
                marginBottom: 12,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  background: "rgba(0,0,0,0.6)",
                  padding: "5px 10px",
                  borderRadius: 6,
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                SEMANA {currentWeek.id} · {currentWeek.dates}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 9,
                  background: `${pi.color}20`,
                  padding: "5px 10px",
                  borderRadius: 6,
                  color: pi.color,
                  border: `1px solid ${pi.color}40`
                }}
              >
                {pi.label} · {pi.sub}
              </span>
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, color: "#fff", marginLeft: "auto" }}>
                {legacyWeekStats[weekIdx].done + legacyWeekStats[weekIdx].postponed}/{legacyWeekStats[weekIdx].total}
              </span>
            </div>

            <h2
              style={{
                position: "relative",
                zIndex: 2,
                color: "#fff",
                fontFamily: "var(--font-pixel)",
                fontSize: "clamp(14px,2.2vw,20px)",
                fontWeight: 400,
                marginTop: 0,
                textTransform: "uppercase"
              }}
            >
              {currentWeek.title}
            </h2>
            <p style={{ position: "relative", zIndex: 2, color: "rgba(255,255,255,0.85)", maxWidth: 600, fontSize: 14 }}>
              {currentWeek.focus}
            </p>
          </div>

          <div id="days">
            {activeDays.map(([dow, problems]) => {
              const filtered = problems.filter((p) => !filterStarred || p[5] === 1);
              if (filtered.length === 0) return null;
              const mins = filtered.reduce((a, p) => a + p[3], 0);
              const isDragOver = dragOverDay === dow;
              return (
                <div
                  key={dow}
                  className={`day block-theory ${isDragOver ? "drag-over" : ""}`}
                  onDragOver={(e) => handleDragOver(e, dow)}
                  onDragLeave={(e) => handleDragLeave(e, dow)}
                  onDrop={(e) => handleDrop(e, currentWeek.id, dow)}
                >
                  <div className="day-head">
                    <div className="day-name">{dow}</div>
                    <div className="day-min">{mins} min</div>
                  </div>
                  {filtered.map((p) => renderLegacyProblem(p, dow))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================== VIEW 5: MAPA GENERAL DE TÉCNICAS (20 SEMANAS) ==================== */}
      {viewMode === "map-20w" && (
        <section id="view-map-legacy">
          <div className="map-intro">
            Progreso global por técnica a lo largo de las <b>20 semanas</b>.
          </div>
          <div className="grid">
            {Object.keys(TECH_LABELS).map((tech, idx) => {
              const stats = legacyTechStats[tech] || { total: 0, done: 0 };
              if (stats.total === 0) return null;
              const pct = stats.done / stats.total;
              const isDone = stats.done === stats.total;
              const accents = ["accent-green", "accent-grape", "accent-gold", "accent-sky", "accent-coral"];
              const accent = accents[idx % accents.length];

              return (
                <div key={tech} className={`tcard ${isDone ? "done-tech" : ""}`} onClick={() => setActiveTech(tech)}>
                  <div className="ban">
                    <img src={IMG[tech] || IMG.mixed} alt={TECH_LABELS[tech]} />
                    <div className="lvl">LVL {Math.floor(pct * 10)}</div>
                    <div className="cnt">{stats.done}/{stats.total}</div>
                  </div>
                  <div className="body">
                    <div className="nm">
                      <span className="g" style={{ display: "flex", color: "var(--grape)" }}>
                        <Icon name={tech} size={20} />
                      </span>
                      {TECH_LABELS[tech]}
                    </div>
                    <div className="fl">Desafíos completados en esta técnica.</div>
                    <div className={`pbar ${accent}`}>
                      <i style={{ width: `${pct * 100}%` }}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeTech && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(6px)",
                zIndex: 100,
                display: "grid",
                placeItems: "center",
                padding: 16
              }}
              onClick={() => setActiveTech(null)}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid var(--line-strong)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: 520,
                  boxShadow: "0 24px 48px rgba(0,0,0,0.6)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: "20px 22px" }}>
                  <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-pixel)", fontSize: 13 }}>
                    Recursos de {TECH_LABELS[activeTech]}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                    <a
                      href="https://cses.fi/book/book.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--brand-tint)",
                        color: "var(--brand)",
                        padding: "12px 16px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontWeight: 600
                      }}
                    >
                      📖 Leer CSES Handbook (PDF)
                    </a>
                    <a
                      href="https://usaco.guide/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--gold-tint)",
                        color: "var(--gold)",
                        padding: "12px 16px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontWeight: 600
                      }}
                    >
                      🐮 Estudiar en USACO Guide
                    </a>
                  </div>
                  <button
                    onClick={() => setActiveTech(null)}
                    style={{
                      marginTop: 16,
                      width: "100%",
                      background: "transparent",
                      border: "1.5px solid var(--line)",
                      padding: 10,
                      borderRadius: 8,
                      color: "var(--ink-soft)",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 10
                    }}
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      <footer>
        <span>Plan Maestro CPT (25 Oct – 6 Nov) + Plan 20 Semanas</span>·
        <span>Teoría Necesaria → Práctica</span>·<span>Base de datos sincronizada</span>
      </footer>
    </div>
  );
}
