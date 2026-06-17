import { useMemo } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";

const TECH_COLORS = {
  impl:"#94a3b8", graph:"#00e5a0", sp:"#00e5a0", topo:"#00e5a0", scc:"#00e5a0",
  func:"#00e5a0", dsu:"#00e5a0", flow:"#38bdf8", dp:"#ff6b6b", tree:"#ffd43b",
  rq:"#fb923c", str:"#c084fc", geo:"#f472b6", adv:"#e879f9", sort:"#94a3b8",
  slide:"#fb923c", bs:"#94a3b8", greedy:"#94a3b8",
};

const TECH_LABELS = {
  impl:"Impl", graph:"Grafos", sp:"ShortPath", topo:"TopoSort", scc:"SCC",
  func:"FuncGraph", dsu:"DSU", flow:"Flow", dp:"DP", tree:"Árboles",
  rq:"RangeQ", str:"Strings", geo:"Geometría", adv:"Advanced", sort:"Sort",
  slide:"SlidingW", bs:"BinSearch", greedy:"Greedy",
};

export default function Dashboard({ weeks, checked }) {
  const radarData = useMemo(() => {
    const stats = {};
    weeks.forEach((wk, wi) => wk.days.forEach((d, di) => d[1].forEach((p, pi) => {
      const tech = p[2];
      if (["mixed", "contest"].includes(tech)) return;
      if (!stats[tech]) stats[tech] = { total: 0, done: 0, practicing: 0 };
      stats[tech].total++;
      const st = checked[`${wi}-${di}-${pi}`] || 0;
      if (st >= 2) stats[tech].done++;
      if (st === 1) stats[tech].practicing++;
    })));
    
    return Object.entries(stats)
      .filter(([_, v]) => v.total >= 2)
      .map(([tech, v]) => ({
        technique: TECH_LABELS[tech] || tech,
        progress: Math.round((v.done / v.total) * 100),
        practicing: Math.round((v.practicing / v.total) * 100),
        total: v.total,
        done: v.done,
        color: TECH_COLORS[tech] || "#64748b"
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 12);
  }, [weeks, checked]);

  const weeklyData = useMemo(() => {
    return weeks.map((wk, wi) => {
      let total = 0, done = 0, practicing = 0;
      wk.days.forEach((d, di) => d[1].forEach((p, pi) => {
        total++;
        const st = checked[`${wi}-${di}-${pi}`] || 0;
        if (st >= 2) done++;
        if (st === 1) practicing++;
      }));
      return {
        week: `S${wi + 1}`,
        completados: done,
        practicando: practicing,
        pendientes: total - done - practicing,
        total,
        phase: wk.phase
      };
    });
  }, [weeks, checked]);

  const cumulativeData = useMemo(() => {
    let cumulative = 0;
    return weeks.map((wk, wi) => {
      let weekDone = 0;
      wk.days.forEach((d, di) => d[1].forEach((p, pi) => {
        const st = checked[`${wi}-${di}-${pi}`] || 0;
        if (st >= 2) weekDone++;
      }));
      cumulative += weekDone;
      return {
        week: `S${wi + 1}`,
        acumulado: cumulative,
        semanal: weekDone
      };
    });
  }, [weeks, checked]);

  const platformData = useMemo(() => {
    const stats = { CSES: 0, USACO: 0, CF: 0, Equipo: 0 };
    weeks.forEach((wk, wi) => wk.days.forEach((d, di) => d[1].forEach((p, pi) => {
      const st = checked[`${wi}-${di}-${pi}`] || 0;
      if (st < 2) return;
      if (p[1] === "C") stats.CSES++;
      else if (p[1].startsWith("U")) stats.USACO++;
      else if (p[1] === "CF") stats.CF++;
      else if (p[1] === "CT") stats.Equipo++;
    })));
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [weeks, checked]);

  const totalStats = useMemo(() => {
    let total = 0, done = 0, practicing = 0, reviewing = 0;
    weeks.forEach((wk, wi) => wk.days.forEach((d, di) => d[1].forEach((p, pi) => {
      total++;
      const st = checked[`${wi}-${di}-${pi}`] || 0;
      if (st >= 2) done++;
      if (st === 1) practicing++;
      if (st === 3) reviewing++;
    })));
    return { total, done, practicing, reviewing, pending: total - done - practicing - reviewing };
  }, [weeks, checked]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "16px",
        marginBottom: 12
      }}>
        <h3 style={{
          fontSize: 14,
          fontFamily: "monospace",
          color: "#fff",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          📊 Dashboard de Progreso
        </h3>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Completados", value: totalStats.done, total: totalStats.total, color: "#00e5a0" },
            { label: "Practicando", value: totalStats.practicing, total: totalStats.total, color: "#fbbf24" },
            { label: "Repasando", value: totalStats.reviewing, total: totalStats.total, color: "#38bdf8" },
            { label: "Pendientes", value: totalStats.pending, total: totalStats.total, color: "#94a3b8" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: `${stat.color}10`,
              border: `1px solid ${stat.color}30`,
              borderRadius: 8,
              padding: "12px 8px",
              textAlign: "center"
            }}>
              <div style={{
                fontFamily: "monospace",
                fontSize: 24,
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.4)",
                marginTop: 4,
                fontFamily: "monospace"
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: 10,
                color: stat.color,
                marginTop: 2,
                fontFamily: "monospace"
              }}>
                {Math.round((stat.value / stat.total) * 100)}%
              </div>
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: 1
          }}>
            PROGRESO POR TÉCNICA
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="technique"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "monospace" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
              />
              <Radar
                name="Completado"
                dataKey="progress"
                stroke="#00e5a0"
                fill="#00e5a0"
                fillOpacity={0.3}
              />
              <Radar
                name="Practicando"
                dataKey="practicing"
                stroke="#fbbf24"
                fill="#fbbf24"
                fillOpacity={0.2}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a24",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  fontSize: 11,
                  fontFamily: "monospace"
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress Bar Chart */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: 1
          }}>
            PROGRESO SEMANAL
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="week"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace" }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a24",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  fontSize: 11,
                  fontFamily: "monospace"
                }}
              />
              <Bar dataKey="completados" stackId="a" fill="#00e5a0" />
              <Bar dataKey="practicando" stackId="a" fill="#fbbf24" />
              <Bar dataKey="pendientes" stackId="a" fill="rgba(255,255,255,0.1)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Progress Line Chart */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: 1
          }}>
            PROGRESO ACUMULADO
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="week"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace" }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a24",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  fontSize: 11,
                  fontFamily: "monospace"
                }}
              />
              <Area
                type="monotone"
                dataKey="acumulado"
                stroke="#a78bfa"
                fill="#a78bfa"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="semanal"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ fill: "#38bdf8", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div>
          <h4 style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: 1
          }}>
            DISTRIBUCIÓN POR PLATAFORMA
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {platformData.map((platform, i) => {
              const colors = ["#00e5a0", "#fbbf24", "#ff6b6b", "#ff6b9d"];
              const total = platformData.reduce((sum, p) => sum + p.value, 0);
              const pct = total > 0 ? Math.round((platform.value / total) * 100) : 0;
              return (
                <div key={i} style={{
                  background: `${colors[i]}10`,
                  border: `1px solid ${colors[i]}30`,
                  borderRadius: 8,
                  padding: "12px 8px",
                  textAlign: "center"
                }}>
                  <div style={{
                    fontFamily: "monospace",
                    fontSize: 20,
                    fontWeight: 800,
                    color: colors[i],
                    lineHeight: 1
                  }}>
                    {platform.value}
                  </div>
                  <div style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                    fontFamily: "monospace"
                  }}>
                    {platform.name}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: colors[i],
                    marginTop: 2,
                    fontFamily: "monospace"
                  }}>
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
