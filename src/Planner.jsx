import { useState, useMemo, useEffect } from "react";
import Dashboard from "./Dashboard";

// Format: [name, source, technique, minutes, url, starred]
// Sources: C=CSES, UB=USACO Bronze, US=USACO Silver, UG=USACO Gold, UP=USACO Plat, CF=Codeforces, CT=Team
// Techniques: impl, graph, dp, tree, rq, str, geo, adv, sort, slide, flow, dsu, scc, bs, greedy, topo, sp, func
// starred: 1=essential, 0=optional

const C = "https://cses.fi/problemset/task/";
const U = "http://www.usaco.org/index.php?page=viewproblem2&cpid=";
const CF = "https://codeforces.com/contest/";

const WEEKS = [
  // ===== VACATION PHASE: 5hrs/day =====
  {
    id:1, title:"Cerrar Intro + Arrancar Grafos", dates:"Jun 22–28", phase:"vac", tech:"graph",
    focus:"Limpiar los 3 fallidos de CSES Intro, cerrar huecos, y meter las primeras 5 sesiones de grafos BFS/DFS",
    days:[
      ["Dom",[
        ["Number Spiral","C","impl",60,C+"1071",0],
        ["Trailing Zeros","C","impl",30,C+"1618",0],
        ["Gray Code","C","impl",50,C+"2205",0],
      ]],
      ["Lun",[
        ["Two Sets","C","impl",45,C+"1092",0],
        ["Tower of Hanoi","C","impl",40,C+"2165",0],
        ["Digit Queries","C","impl",50,C+"2431",0],
      ]],
      ["Mar",[
        ["Creating Strings","C","impl",35,C+"1622",0],
        ["Apple Division","C","impl",40,C+"1623",0],
        ["Chessboard and Queens","C","impl",50,C+"1624",0],
      ]],
      ["Mié",[
        ["Counting Rooms","C","graph",40,C+"1192",0],
        ["Labyrinth","C","graph",50,C+"1193",0],
        ["The Bucket List","UB","impl",30,U+"856",0],
      ]],
      ["Jue",[
        ["Building Roads","C","graph",30,C+"1666",0],
        ["Message Route","C","graph",45,C+"1667",0],
        ["Speeding Ticket","UB","impl",35,U+"568",1],
      ]],
      ["Vie",[
        ["Building Teams","C","graph",50,C+"1668",0],
        ["Round Trip","C","graph",60,C+"1669",0],
        ["Cow Gymnastics","UB","impl",35,U+"963",1],
      ]],
      ["Sáb",[
        ["Monsters","C","graph",70,C+"1194",0],
        ["Milk Factory","UB","graph",40,U+"940",1],
        ["Block Game","UB","impl",35,U+"664",1],
      ]],
    ]
  },
  {
    id:2, title:"Caminos Cortos + DAGs", dates:"Jun 29 – Jul 5", phase:"vac", tech:"sp",
    focus:"Dijkstra, Bellman-Ford, Floyd-Warshall, topological sort. Implementar Dijkstra de memoria.",
    days:[
      ["Dom",[
        ["Shortest Routes I","C","sp",60,C+"1671",0],
        ["Shortest Routes II","C","sp",50,C+"1672",0],
        ["Circular Barn","UB","impl",35,U+"616",0],
      ]],
      ["Lun",[
        ["High Score","C","sp",60,C+"1673",0],
        ["Flight Discount","C","sp",60,C+"1195",0],
        ["The Lost Cow","UB","impl",30,U+"735",0],
      ]],
      ["Mar",[
        ["Cycle Finding","C","graph",50,C+"1197",0],
        ["Round Trip II","C","graph",50,C+"1678",0],
        ["Stuck in a Rut","UB","impl",45,U+"1061",0],
      ]],
      ["Mié",[
        ["Course Schedule","C","topo",40,C+"1679",0],
        ["Longest Flight Route","C","topo",50,C+"1680",0],
        ["Censoring","UB","str",45,U+"526",0],
      ]],
      ["Jue",[
        ["Game Routes","C","topo",45,C+"1681",0],
        ["Investigation","C","sp",55,C+"1202",0],
        ["Milk Measurement","UB","impl",40,U+"761",0],
      ]],
      ["Vie",[
        ["Flight Routes","C","sp",60,C+"1196",0],
        ["Hoofball","UB","graph",40,U+"808",1],
        ["Reflection","UB","impl",40,U+"1491",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",180,"",0],
        ["Upsolving 1 problema","CF","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:3, title:"MST, DSU, SCC, Functional Graphs", dates:"Jul 6–12", phase:"vac", tech:"dsu",
    focus:"Union-Find, Kruskal, componentes fuertemente conexas, grafos funcionales. Templates propios de DSU.",
    days:[
      ["Dom",[
        ["Road Reparation","C","dsu",45,C+"1675",0],
        ["Road Construction","C","dsu",40,C+"1676",0],
        ["Swapity Swap","UB","graph",40,U+"1013",1],
      ]],
      ["Lun",[
        ["Flight Routes Check","C","graph",50,C+"1682",0],
        ["Planets and Kingdoms","C","scc",70,C+"1683",0],
        ["The Great Revegetation","UB","graph",35,U+"916",1],
      ]],
      ["Mar",[
        ["Planets Queries I","C","func",55,C+"1750",0],
        ["Planets Cycles","C","func",50,C+"1751",0],
        ["Milk Factory","UB","graph",35,U+"940",1],
      ]],
      ["Mié",[
        ["Giant Pizza","C","scc",70,C+"1684",0],
        ["Coin Collector","C","scc",50,C+"1686",0],
        ["Sleepy Cow Herding","UB","impl",30,U+"915",0],
      ]],
      ["Jue",[
        ["Mail Delivery","C","graph",60,C+"1691",0],
        ["Teleporters Path","C","graph",55,C+"1693",0],
        ["Social Distancing I","UB","greedy",35,U+"1035",0],
      ]],
      ["Vie",[
        ["De Bruijn Sequence","C","graph",50,C+"1692",0],
        ["Hamiltonian Flights","C","dp",65,C+"1690",0],
        ["Leaders","UB","impl",40,U+"1275",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",180,"",0],
        ["Upsolving 2 problemas","CF","mixed",80,"",0],
      ]],
    ]
  },
  {
    id:4, title:"Flujo + Gaps de S&S + USACO Silver", dates:"Jul 13–19", phase:"vac", tech:"flow",
    focus:"Max-flow/matching basics, cerrar sorting gaps, arrancar USACO Silver modules.",
    days:[
      ["Dom",[
        ["Download Speed","C","flow",70,C+"1694",0],
        ["Police Chase","C","flow",60,C+"1695",0],
        ["Where Am I?","UB","sort",30,U+"964",1],
      ]],
      ["Lun",[
        ["School Dance","C","flow",50,C+"1696",0],
        ["Distinct Routes","C","flow",60,C+"1711",0],
        ["Year of the Cow","UB","sort",35,U+"1107",0],
      ]],
      ["Mar",[
        ["Collecting Numbers II","C","sort",50,C+"2217",0],
        ["Josephus Problem II","C","sort",55,C+"2163",0],
        ["Don't Be Last!","UB","sort",30,U+"687",1],
      ]],
      ["Mié",[
        ["Nested Ranges Check","C","sort",55,C+"2168",0],
        ["Nested Ranges Count","C","sort",60,C+"2169",0],
        ["Cities & States","US","sort",40,U+"667",0],
      ]],
      ["Jue",[
        ["Room Allocation","C","greedy",45,C+"1164",0],
        ["Factory Machines","C","bs",40,C+"1620",0],
        ["Angry Cows","US","bs",45,U+"594",1],
      ]],
      ["Vie",[
        ["Tasks and Deadlines","C","greedy",30,C+"1630",0],
        ["Reading Books","C","greedy",25,C+"1631",0],
        ["Cow College","UB","greedy",40,U+"1251",0],
        ["Fence Painting","UB","impl",25,U+"567",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo (4hrs)","CT","contest",240,"",0],
        ["Upsolving","CT","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:5, title:"DP Foundation", dates:"Jul 20–26", phase:"vac", tech:"dp",
    focus:"DP lineal, grid, string. Regla: escribir la recurrencia en papel ANTES de codear cada problema.",
    days:[
      ["Dom",[
        ["Coin Combinations II","C","dp",40,C+"1636",0],
        ["Removing Digits","C","dp",30,C+"1637",0],
        ["Grid Paths I","C","dp",45,C+"1638",0],
      ]],
      ["Lun",[
        ["Book Shop","C","dp",50,C+"1158",0],
        ["Array Description","C","dp",55,C+"1746",0],
        ["Hoof Paper Scissors","US","dp",40,U+"691",0],
      ]],
      ["Mar",[
        ["Counting Towers","C","dp",60,C+"2413",0],
        ["Edit Distance","C","dp",45,C+"1639",0],
        ["Kayaking","CF","greedy",30,CF+"863/problem/B",0],
      ]],
      ["Mié",[
        ["Longest Common Subsequence","C","dp",50,C+"1746",0],
        ["Rectangle Cutting","C","dp",45,C+"1745",0],
        ["Playing in a Casino","CF","sort",30,CF+"1808/problem/B",0],
      ]],
      ["Jue",[
        ["Money Sums","C","dp",40,C+"1745",0],
        ["Removal Game","C","dp",55,C+"1745",0],
        ["Why Did the Cow Cross the Road III","UB","sort",35,U+"713",0],
      ]],
      ["Vie",[
        ["Two Sets II","C","dp",50,C+"1093",0],
        ["Minimal Grid Path","C","dp",70,C+"3359",0],
        ["Sum of Three Values","C","sort",50,C+"1641",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",180,"",0],
        ["Upsolving 2 problemas","CF","mixed",80,"",0],
      ]],
    ]
  },
  {
    id:6, title:"DP Intermedio + USACO Gold DP", dates:"Jul 27 – Ago 2", phase:"vac", tech:"dp",
    focus:"Bitmask DP, digit DP, LIS. Última semana de vacaciones — aprovechar las 5hrs al máximo.",
    days:[
      ["Dom",[
        ["Increasing Subsequence","C","dp",45,C+"1145",0],
        ["Projects","C","dp",55,C+"1140",0],
        ["Mountain Range","C","dp",60,C+"1743",0],
      ]],
      ["Lun",[
        ["Elevator Rides","C","dp",70,C+"1653",0],
        ["Counting Tilings","C","dp",65,C+"2181",0],
        ["Out of Place","UB","greedy",35,U+"785",1],
      ]],
      ["Mar",[
        ["Counting Numbers","C","dp",60,C+"2220",0],
        ["Increasing Subsequence II","C","dp",55,C+"1748",0],
        ["It's Mooin' Time","UB","sort",35,U+"1445",0],
      ]],
      ["Mié",[
        ["Sum of Four Values","C","sort",55,C+"1642",0],
        ["Subarray Sums II","C","sort",45,C+"1661",0],
        ["Into Blocks","CF","dsu",40,CF+"1209/problem/G1",0],
      ]],
      ["Jue",[
        ["Subarray Divisibility","C","sort",45,C+"1662",0],
        ["Distinct Values Subarrays II","C","sort",40,C+"2427",0],
        ["Made Up","CF","sort",35,"https://atcoder.jp/contests/abc202/tasks/abc202_c",0],
      ]],
      ["Vie",[
        ["Array Division","C","bs",45,C+"1085",0],
        ["Movie Festival II","C","greedy",50,C+"1632",0],
        ["Maximum Subarray Sum II","C","sort",55,C+"1644",0],
      ]],
      ["Sáb",[
        ["🏆 SIMULACRO ICPC con equipo (5hrs)","CT","contest",300,"",0],
        ["Post-mortem + análisis","CT","mixed",60,"",0],
      ]],
    ]
  },
  // ===== SEMESTER PHASE: 2-3hrs weekdays, 4-5hrs weekends =====
  {
    id:7, title:"Árboles Foundation", dates:"Ago 3–9", phase:"sem", tech:"tree",
    focus:"Tree DP, diámetro, distancias. Cambio de ritmo: 1-2 problemas entre semana, 2-3 fines de semana.",
    days:[
      ["Dom",[
        ["Tree Matching","C","tree",55,C+"1130",0],
        ["Tree Diameter","C","tree",45,C+"1131",0],
      ]],
      ["Lun",[
        ["Tree Distances I","C","tree",50,C+"1132",0],
      ]],
      ["Mar",[
        ["Tree Distances II","C","tree",55,C+"1133",0],
      ]],
      ["Mié",[
        ["Counting Liars","UB","bs",30,U+"1228",0],
        ["Bovine Genomics","UB","impl",30,U+"736",1],
      ]],
      ["Jue",[
        ["Company Queries I","C","tree",50,C+"1687",0],
      ]],
      ["Vie",[
        ["Company Queries II","C","tree",55,C+"1688",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",0],
        ["Upsolving","CF","mixed",40,"",0],
      ]],
    ]
  },
  {
    id:8, title:"Árboles: LCA, Euler Tour, Queries", dates:"Ago 10–16", phase:"sem", tech:"tree",
    focus:"Binary lifting, Euler tour para convertir problemas de árboles en problemas de rangos.",
    days:[
      ["Dom",[
        ["Distance Queries","C","tree",55,C+"1135",0],
        ["Counting Paths","C","tree",60,C+"1136",0],
      ]],
      ["Lun",[
        ["Subtree Queries","C","tree",55,C+"1137",0],
      ]],
      ["Mar",[
        ["Path Queries","C","tree",55,C+"1138",0],
      ]],
      ["Mié",[
        ["Distinct Colors","C","tree",60,C+"1139",0],
      ]],
      ["Jue",[
        ["Finding a Centroid","C","tree",50,C+"2079",0],
      ]],
      ["Vie",[
        ["Triangles","UB","geo",35,U+"1011",0],
        ["Guess the Animal","UB","impl",35,U+"893",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
        ["Upsolving","CT","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:9, title:"Árboles Avanzados + Functional Graphs", dates:"Ago 17–23", phase:"sem", tech:"func",
    focus:"Path Queries II (HLD/Segtree en árbol), Fixed-Length Paths, Planets Queries II.",
    days:[
      ["Dom",[
        ["Path Queries II","C","tree",80,C+"2134",0],
        ["Fixed-Length Paths I","C","tree",70,C+"2080",0],
      ]],
      ["Lun",[
        ["Planets Queries II","C","func",65,C+"1160",0],
      ]],
      ["Mar",[
        ["Knight's Tour","C","graph",60,C+"1689",0],
      ]],
      ["Mié",[
        ["Lifeguards","US","greedy",40,U+"786",0],
        ["Photoshoot","UB","greedy",35,U+"1227",1],
      ]],
      ["Jue",[
        ["Fixed-Length Paths II","C","tree",80,C+"2081",0],
      ]],
      ["Vie",[
        ["Sliding Window Median","C","slide",55,C+"1076",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",0],
        ["Upsolving","CF","mixed",40,"",0],
      ]],
    ]
  },
  {
    id:10, title:"Range Queries Foundation", dates:"Ago 24–30", phase:"sem", tech:"rq",
    focus:"Segment Tree iterativo/recursivo, Fenwick. Debe salirte el Segtree en 10 minutos de memoria.",
    days:[
      ["Dom",[
        ["Dynamic Range Minimum Queries","C","rq",40,C+"1649",0],
        ["Range Xor Queries","C","rq",35,C+"1650",0],
        ["Range Update Queries","C","rq",45,C+"1651",0],
      ]],
      ["Lun",[
        ["Forest Queries","C","rq",40,C+"1652",0],
      ]],
      ["Mar",[
        ["Hotel Queries","C","rq",55,C+"1143",0],
      ]],
      ["Wed",[
        ["List Removals","C","rq",50,C+"1749",0],
      ]],
      ["Jue",[
        ["Salary Queries","C","rq",60,C+"1144",0],
      ]],
      ["Vie",[
        ["Load Balancing","UB","sort",40,U+"617",1],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
        ["Upsolving","CT","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:11, title:"Range Queries Advanced + Lazy", dates:"Ago 31 – Sep 6", phase:"sem", tech:"rq",
    focus:"Lazy propagation, 2D queries, problemas combinados. Template de Segtree+Lazy propio.",
    days:[
      ["Dom",[
        ["Prefix Sum Queries","C","rq",55,C+"2166",0],
        ["Pizzeria Queries","C","rq",60,C+"2206",0],
      ]],
      ["Lun",[
        ["Subarray Sum Queries","C","rq",50,C+"1190",0],
      ]],
      ["Mar",[
        ["Distinct Values Queries","C","rq",55,C+"1734",0],
      ]],
      ["Mié",[
        ["Range Updates and Sums","C","rq",70,C+"1735",0],
      ]],
      ["Jue",[
        ["Polynomial Queries","C","rq",60,C+"1736",0],
      ]],
      ["Vie",[
        ["Forest Queries II","C","rq",55,C+"1739",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",0],
        ["Upsolving","CF","mixed",40,"",0],
      ]],
    ]
  },
  {
    id:12, title:"Range Queries Pro + Sliding Window", dates:"Sep 7–13", phase:"sem", tech:"slide",
    focus:"Queries más difíciles de CSES + la sección Sliding Window completa.",
    days:[
      ["Dom",[
        ["Range Queries and Copies","C","rq",65,C+"1737",0],
        ["Missing Coin Sum Queries","C","rq",60,C+"2432",0],
      ]],
      ["Lun",[
        ["Sliding Window Sum","C","slide",25,C+"2424",0],
        ["Sliding Window Minimum","C","slide",35,C+"2425",0],
      ]],
      ["Mar",[
        ["Sliding Window Xor","C","slide",30,C+"2426",0],
        ["Sliding Window Distinct Values","C","slide",40,C+"2428",0],
      ]],
      ["Mié",[
        ["Sliding Window Cost","C","slide",50,C+"1077",0],
      ]],
      ["Jue",[
        ["Sliding Window Inversions","C","slide",55,C+"2430",0],
      ]],
      ["Vie",[
        ["Movie Festival Queries","C","rq",50,C+"1740",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
        ["Upsolving","CT","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:13, title:"String Algorithms", dates:"Sep 14–20", phase:"sem", tech:"str",
    focus:"Hashing, KMP, borders, periods. String hashing como herramienta universal O(1) substring compare.",
    days:[
      ["Dom",[
        ["Word Combinations","C","str",55,C+"1731",0],
        ["Finding Borders","C","str",50,C+"1732",0],
      ]],
      ["Lun",[
        ["Finding Periods","C","str",50,C+"1733",0],
      ]],
      ["Mar",[
        ["Minimal Rotation","C","str",55,C+"1110",0],
      ]],
      ["Mié",[
        ["Longest Palindrome","C","str",55,C+"1111",0],
      ]],
      ["Jue",[
        ["Palindrome Queries","C","str",60,C+"2420",0],
      ]],
      ["Vie",[
        ["Finding Patterns","C","str",50,C+"2102",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",0],
        ["Upsolving","CF","mixed",40,"",0],
      ]],
    ]
  },
  {
    id:14, title:"Strings Avanzados + Geometry gaps", dates:"Sep 21–27", phase:"sem", tech:"geo",
    focus:"Suffix arrays conceptos, Aho-Corasick intro, cerrar geometry gaps.",
    days:[
      ["Dom",[
        ["Counting Patterns","C","str",55,C+"2103",0],
        ["Distinct Substrings","C","str",60,C+"2104",0],
      ]],
      ["Lun",[
        ["Pattern Positions","C","str",55,C+"2105",0],
      ]],
      ["Mar",[
        ["Repeating Substring","C","str",50,C+"2106",0],
      ]],
      ["Mié",[
        ["Polygon Lattice Points","C","geo",40,C+"2193",0],
        ["Minimum Euclidean Distance","C","geo",50,C+"2194",0],
      ]],
      ["Jue",[
        ["Convex Hull","C","geo",55,C+"2195",0],
      ]],
      ["Vie",[
        ["Sleeping in Class","UB","greedy",35,U+"1203",1],
        ["Blocked Billboard II","UB","geo",35,U+"783",1],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
        ["Upsolving","CT","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:15, title:"Advanced Techniques + Bitwise", dates:"Sep 28 – Oct 4", phase:"sem", tech:"adv",
    focus:"Meet in the Middle, SOS DP, bitwise tricks. Problemas de Advanced Techniques de CSES.",
    days:[
      ["Dom",[
        ["Meet in the Middle","C","adv",60,C+"1628",0],
        ["Counting Bits","C","adv",40,C+"2419",0],
      ]],
      ["Lun",[
        ["Maximum Xor Subarray","C","adv",55,C+"1655",0],
      ]],
      ["Mar",[
        ["Reachable Nodes","C","adv",50,C+"2138",0],
      ]],
      ["Mié",[
        ["Reachability Queries","C","adv",50,C+"2139",0],
      ]],
      ["Jue",[
        ["Necessary Roads","C","adv",55,C+"2177",0],
      ]],
      ["Vie",[
        ["Necessary Cities","C","adv",50,C+"2178",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",0],
        ["Upsolving","CF","mixed",40,"",0],
      ]],
    ]
  },
  {
    id:16, title:"Problemas Mixtos Rating 1600–2000", dates:"Oct 5–11", phase:"sem", tech:"impl",
    focus:"Ya no por categoría sino por habilidad: leer, identificar técnica, implementar limpio y rápido.",
    days:[
      ["Dom",[
        ["D. Dijkstra?","CF","graph",60,CF+"20/problem/D",0],
        ["E. Tree Painting","CF","tree",60,CF+"1187/problem/E",0],
      ]],
      ["Lun",[
        ["D. Journey","CF","dp",55,CF+"1472/problem/D",0],
      ]],
      ["Mar",[
        ["E. Minimal Segment Cover","CF","rq",60,CF+"1175/problem/E",0],
      ]],
      ["Mié",[
        ["C. Ski Base","CF","greedy",50,CF+"913/problem/C",0],
      ]],
      ["Jue",[
        ["E. Almost Shortest Path","CF","sp",65,CF+"843/problem/D",0],
      ]],
      ["Vie",[
        ["D. Prefix-Suffix Palindrome","CF","str",55,CF+"1326/problem/D2",0],
      ]],
      ["Sáb",[
        ["🏆 SIMULACRO ICPC con equipo (5hrs)","CT","contest",300,"",0],
      ]],
    ]
  },
  {
    id:17, title:"Simulacro ICPC #1", dates:"Oct 12–18", phase:"sim", tech:"contest",
    focus:"Set ICPC Latam Regional 2023. Post-mortem detallado. Upsolving completo.",
    days:[
      ["Dom",[
        ["🏆 ICPC Latam Regional 2023 (equipo, 5hrs)","CT","contest",300,"",0],
      ]],
      ["Lun",[
        ["Upsolving Problema A o B","CT","mixed",60,"",0],
      ]],
      ["Mar",[
        ["Upsolving Problema C o D","CT","mixed",70,"",0],
      ]],
      ["Mié",[
        ["D. Treelabeling","CF","tree",55,CF+"1611/problem/D",0],
      ]],
      ["Jue",[
        ["E. Editor","CF","rq",55,CF+"1263/problem/E",0],
      ]],
      ["Vie",[
        ["Notebook: escribir/verificar templates","CT","mixed",60,"",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST CF Div2 individual","CF","contest",150,"",0],
      ]],
    ]
  },
  {
    id:18, title:"Simulacro ICPC #2", dates:"Oct 19–25", phase:"sim", tech:"contest",
    focus:"Set ICPC Latam Regional 2024. Ajustar estrategia de equipo.",
    days:[
      ["Dom",[
        ["🏆 ICPC Latam Regional 2024 (equipo, 5hrs)","CT","contest",300,"",0],
      ]],
      ["Lun",[
        ["Upsolving Problema más difícil","CT","mixed",70,"",0],
      ]],
      ["Mar",[
        ["Upsolving + editorial analysis","CT","mixed",60,"",0],
      ]],
      ["Mié",[
        ["F. Array Partition","CF","dp",55,CF+"1454/problem/F",0],
      ]],
      ["Jue",[
        ["E. Greedy Shopping","CF","greedy",55,CF+"1800/problem/E",0],
      ]],
      ["Vie",[
        ["Notebook: completar + probar","CT","mixed",60,"",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST equipo (set internacional)","CT","contest",180,"",0],
      ]],
    ]
  },
  {
    id:19, title:"Simulacro ICPC #3 + Notebook Final", dates:"Oct 26 – Nov 1", phase:"sim", tech:"contest",
    focus:"Último simulacro formal. Notebook impreso y verificado. Empezar a bajar la carga.",
    days:[
      ["Dom",[
        ["🏆 ICPC Latam Regional 2022 (equipo, 5hrs)","CT","contest",300,"",0],
      ]],
      ["Lun",[
        ["Upsolving final","CT","mixed",60,"",0],
      ]],
      ["Mar",[
        ["Verificar TODOS los templates del notebook","CT","mixed",90,"",0],
      ]],
      ["Mié",[
        ["Coin Combinations II (repaso)","C","dp",30,C+"1636",0],
        ["Building Roads (repaso)","C","graph",30,C+"1666",0],
      ]],
      ["Jue",[
        ["Tree Diameter (repaso)","C","tree",30,C+"1131",0],
        ["String Matching (repaso)","C","str",30,C+"1753",0],
      ]],
      ["Vie",[
        ["Práctica ligera con equipo (2-3hrs)","CT","contest",150,"",0],
      ]],
      ["Sáb",[
        ["Imprimir notebook final","CT","mixed",60,"",0],
        ["Revisión estrategia equipo","CT","mixed",30,"",0],
      ]],
    ]
  },
  {
    id:20, title:"TAPER → REGIONAL 🏁", dates:"Nov 2–7", phase:"sim", tech:"contest",
    focus:"Bajar carga. Descansar. Llegar fresco el 7 de noviembre. Ya estás listo.",
    days:[
      ["Dom",[
        ["1 problema fácil de warm-up","C","impl",20,C+"1068",0],
        ["Repasar notebook grafos","CT","mixed",20,"",0],
      ]],
      ["Lun",[
        ["Repasar notebook DP + Trees","CT","mixed",30,"",0],
      ]],
      ["Mar",[
        ["Repasar notebook RQ + Strings","CT","mixed",30,"",0],
      ]],
      ["Mié",[
        ["Estrategia final equipo: quién lee qué, roles","CT","mixed",40,"",0],
      ]],
      ["Jue",[
        ["🛌 DESCANSO TOTAL — no tocar código","CT","mixed",0,"",0],
      ]],
      ["Vie",[
        ["🛌 Descanso + buena alimentación + dormir temprano","CT","mixed",0,"",0],
      ]],
      ["Sáb",[
        ["🏁 REGIONAL ICPC — A GANAR","CT","contest",300,"",0],
      ]],
    ]
  },
];

const TECH_COLORS = {
  impl:"#94a3b8", graph:"#00e5a0", sp:"#00e5a0", topo:"#00e5a0", scc:"#00e5a0",
  func:"#00e5a0", dsu:"#00e5a0", flow:"#38bdf8", dp:"#ff6b6b", tree:"#ffd43b",
  rq:"#fb923c", str:"#c084fc", geo:"#f472b6", adv:"#e879f9", sort:"#94a3b8",
  slide:"#fb923c", bs:"#94a3b8", greedy:"#94a3b8", mixed:"#64748b", contest:"#ff6b9d",
};
const TECH_LABELS = {
  impl:"Impl", graph:"Grafos", sp:"ShortPath", topo:"TopoSort", scc:"SCC",
  func:"FuncGraph", dsu:"DSU", flow:"Flow", dp:"DP", tree:"Árboles",
  rq:"RangeQ", str:"Strings", geo:"Geometría", adv:"Advanced", sort:"Sort&Search",
  slide:"SlidingW", bs:"BinSearch", greedy:"Greedy", mixed:"Mix", contest:"Contest",
};
const SRC_COLORS = { C:"#00e5a0", UB:"#fbbf24", US:"#38bdf8", UG:"#f59e0b", UP:"#a78bfa", CF:"#ff6b6b", CT:"#ff6b9d" };
const SRC_LABELS = { C:"CSES", UB:"USACO🥉", US:"USACO🥈", UG:"USACO🥇", UP:"USACO💎", CF:"CF", CT:"Equipo" };
const PHASE_INFO = {
  vac:{ label:"VACACIONES", sub:"5 hrs/día", color:"#00e5a0", bg:"rgba(0,229,160,0.06)" },
  sem:{ label:"SEMESTRE", sub:"2-3 hrs L-V · 4-5 hrs S-D", color:"#38bdf8", bg:"rgba(56,189,248,0.06)" },
  sim:{ label:"SIMULACROS", sub:"Modo competencia", color:"#ff6b9d", bg:"rgba(255,107,157,0.06)" },
};

const IMG = {
  impl: "/res/Implementation.jpg",
  graph: "/res/Graphs.jpg",
  sp: "/res/ShortPath-Flow-Advanced.png",
  topo: "/res/Topo.png",
  scc: "/res/scc.png",
  func: "/res/FuncGraphs.png",
  dsu: "/res/DSU.png",
  flow: "/res/ShortPath-Flow-Advanced.png",
  dp: "/res/DP.png",
  tree: "/res/tree.png",
  rq: "/res/rq.jpg",
  str: "/res/strinsg.jpg",
  geo: "/res/Geom.png",
  adv: "/res/ShortPath-Flow-Advanced.png",
  sort: "/res/sorting&searching.jpg",
  slide: "/res/Sliding window.png",
  bs: "/res/BynarySearch.png",
  greedy: "/res/greedy.png",
  mixed: "https://www.codedex.io/images/machine-learning/machine-learning-header.png",
  contest: "https://www.codedex.io/images/courses/github-copilots.gif",
};

const GIFS = {
  impl: "/gifs/python-animated.gif",
  graph: "/gifs/framework-valley-react-banner.gif",
  sp: "/gifs/lua-banner.gif",
  topo: "/gifs/intermediate-python.gif",
  scc: "/gifs/javascript-course-banner.gif",
  func: "/gifs/custom-phaser.gif",
  dsu: "/gifs/sqlbanner.gif",
  flow: "/gifs/css-course-banner.gif",
  dp: "/gifs/matplotlib-banner.gif",
  tree: "/gifs/numpy-banner.gif",
  rq: "/gifs/html-parralax-combined.gif",
  str: "/gifs/p5courseimage.gif",
  geo: "/gifs/seo-bannergif.gif",
  adv: "/gifs/uiux.gif",
  sort: "/gifs/charp.webp",
  slide: "/gifs/genai-banner.webp",
  bs: "/gifs/dsabanner.png",
  greedy: "/gifs/nodejsbannerseo.png",
  mixed: "/gifs/intermediate-python.gif",
  contest: "/gifs/github-copilots.gif",
};

const STORAGE_KEY = "icpc-training-progress";

export const ICONS = {
  "dp": `<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9.5h17M3.5 15.5h17M9.5 3.5v17M15.5 3.5v17"/><rect x="3.5" y="3.5" width="6" height="6" rx="1" fill="currentColor" stroke="none"/>`,
  "impl": `<path d="M8 5l-5 7 5 7M16 5l5 7-5 7M13.5 4l-3 16"/>`,
  "grafos": `<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.3 7.6h7.4M7.4 9l3.4 6.8M16.6 9l-3.4 6.8"/>`,
  "sortsearch": `<path d="M4 20v-5M9 20v-9M14 20v-13"/><circle cx="18" cy="14" r="3"/><path d="M20.2 16.2L22.5 18.5"/>`,
  "rangeq": `<path d="M3 12h18"/><path d="M8 7.5v9M16 7.5v9"/><path d="M8 12h8" strokeWidth="3" opacity=".35"/>`,
  "arboles": `<circle cx="12" cy="5" r="2.1"/><circle cx="6" cy="13" r="2.1"/><circle cx="18" cy="13" r="2.1"/><path d="M10.6 6.4L7.4 11.2M13.4 6.4l3.2 4.8"/><circle cx="3.5" cy="20" r="1.6"/><circle cx="8.5" cy="20" r="1.6"/><path d="M5.2 14.5L4 18.4M6.8 14.5L7.8 18.4"/>`,
  "strings": `<rect x="2.5" y="9" width="5.6" height="6" rx="1.6"/><rect x="9.2" y="9" width="5.6" height="6" rx="1.6"/><rect x="15.9" y="9" width="5.6" height="6" rx="1.6"/>`,
  "greedy": `<circle cx="12" cy="12" r="8"/><path d="M12 6.5v11M14.6 9C13.9 8.2 13 7.8 12 7.8c-2 0-2.6 2.2-1 3l2 1c1.7.8 1 3.2-1 3.2-1 0-1.9-.4-2.6-1.2"/>`,
  "shortpath": `<circle cx="4.5" cy="19.5" r="1.8" fill="currentColor" stroke="none"/><path d="M6 18.5c3-1 3.5-5 6-7" strokeDasharray="0.1 3.6"/><path d="M17 4v10M17 5h4l-1.6 2L21 9h-4"/>`,
  "slidingw": `<path d="M2.5 12h19"/><rect x="6.5" y="7.5" width="7" height="9" rx="1.4"/><path d="M16.5 9l3 3-3 3"/>`,
  "advanced": `<path d="M4 18.5h16M5 18.5L3.4 9.5l4.8 3.8L12 6.5l3.8 6.8 4.8-3.8L19 18.5"/><circle cx="12" cy="6.5" r="0" /><path d="M4 18.5h16" strokeWidth="0"/>`,
  "geometria": `<path d="M12 4L4 19h16L12 4z"/><circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="19" r="1.5" fill="currentColor" stroke="none"/>`,
  "flow": `<path d="M3 7h5c3.5 0 1.5 5 5 5M3 17h5c3.5 0 1.5-5 5-5M13 12h6"/><path d="M16.5 9.5L19 12l-2.5 2.5"/>`,
  "binsearch": `<path d="M3 12h18M12 6.5v11"/><path d="M8 9l-3 3 3 3M16 9l3 3-3 3"/>`,
  "toposort": `<circle cx="5" cy="12" r="2.1"/><circle cx="12" cy="12" r="2.1"/><circle cx="19" cy="12" r="2.1"/><path d="M7.2 12h2.6M14.2 12h2.6"/><path d="M8.6 10.9l1.2 1.1-1.2 1.1M15.6 10.9l1.2 1.1-1.2 1.1"/>`,
  "dsu": `<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>`,
  "scc": `<path d="M19.5 12a7.5 7.5 0 10-2.4 5.5"/><path d="M17 13.5v4h4"/>`,
  "funcgraph": `<circle cx="14" cy="9.5" r="5"/><path d="M11 13.2L7 20"/><path d="M9 18.6L7 20l-.3-2.4"/>`,
  "cses": `<path d="M6 4h11a1.5 1.5 0 011.5 1.5V20H7.5A1.5 1.5 0 016 18.5V4z"/><path d="M6 17.5A1.5 1.5 0 017.5 16H18.5"/><path d="M9.5 8.5h6M9.5 11.5h4"/>`,
  "usaco": `<path d="M5.5 8.5C4 8 3 9 3.4 10.8M18.5 8.5C20 8 21 9 20.6 10.8"/><path d="M5 10c0-3.2 3-5.5 7-5.5s7 2.3 7 5.5c0 5-3 8.5-7 8.5S5 15 5 10z"/><circle cx="9.6" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.4" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><ellipse cx="12" cy="15" rx="3.4" ry="2.4"/><circle cx="10.6" cy="15" r=".7" fill="currentColor" stroke="none"/><circle cx="13.4" cy="15" r=".7" fill="currentColor" stroke="none"/>`,
  "cf": `<circle cx="12" cy="9.5" r="5.5"/><path d="M12 7v2.5l1.7 1"/><path d="M8.6 14l-1 6.5 4.4-2.3 4.4 2.3-1-6.5"/>`,
  "st-empty": `<rect x="4" y="4" width="16" height="16" rx="4"/>`,
  "st-practice": `<path d="M13 2.5L5 13h5l-1 8.5L19.5 10H13z" fill="currentColor" stroke="none"/>`,
  "st-done": `<rect x="4" y="4" width="16" height="16" rx="4" opacity=".25"/><path d="M7.5 12.2l3.2 3.3L16.8 9"/>`,
  "st-review": `<path d="M4.5 10A8 8 0 0118 6.5l2.5 2M19.5 14A8 8 0 016 17.5L3.5 15.5"/><path d="M20.5 4v4.5H16M3.5 20v-4.5H8"/>`,
  "st-star": `<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.8 6.4 20.6l1.1-6.2L3 8.0l6.2-.9z" fill="currentColor" stroke="none"/>`,
  "map": `<path d="M9 4L3 6.2v14L9 18l6 2.2 6-2.2V4l-6 2.2L9 4z"/><path d="M9 4v14M15 6.2v14"/>`,
  "calendar": `<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><rect x="6.8" y="12.5" width="3.2" height="3.2" rx=".6" fill="currentColor" stroke="none"/>`,
  "dashboard": `<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 16.5v-3.5M12 16.5v-7M16 16.5v-5"/>`,
  "sync": `<path d="M4 11a8 8 0 0114-5l2.5 2M20 13a8 8 0 01-14 5l-2.5-2"/><path d="M20.5 3.5V8H16M3.5 20.5V16H8"/>`,
  "filter": `<path d="M3.5 5.5h17l-6.5 7.5v6l-4-2v-4z"/>`,
  "prev": `<path d="M14.5 5l-7 7 7 7"/>`,
  "next": `<path d="M9.5 5l7 7-7 7"/>`,
  "clock": `<circle cx="12" cy="12" r="8"/><path d="M12 7.5v4.8l3.2 2"/>`,
  "ph-vac": `<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,
  "ph-sem": `<path d="M12 4.5L2.5 8.5 12 12.5l9.5-4L12 4.5z"/><path d="M6.5 10.5v4.2c0 1.6 2.8 2.8 5.5 2.8s5.5-1.2 5.5-2.8v-4.2M21.5 8.5v5.5"/>`,
  "ph-sim": `<circle cx="12" cy="13.5" r="6.8"/><path d="M12 13.5V9.5M10 2.5h4M18.6 6.4l1.6-1.6"/>`
};

const Icon = ({ name, size=16, className="", style={} }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
       width={size} height={size} className={className} style={{shapeRendering:"crispEdges",...style}} dangerouslySetInnerHTML={{__html: ICONS[name]||""}} />
);

const STATUS = {
  0: { label: "No hecho", color: "rgba(255,255,255,0.15)", bg: "transparent", icon: "" },
  1: { label: "Practicando", color: "#fbbf24", bg: "#fbbf2420", icon: "⚡" },
  2: { label: "Completado", color: "#00e5a0", bg: "#00e5a0", icon: "✓" },
  3: { label: "Repasando", color: "#38bdf8", bg: "#38bdf820", icon: "🔄" },
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function Countdown() {
  const d = Math.max(0, Math.ceil((new Date("2026-11-07") - new Date()) / 864e5));
  return (
    <div style={{display:"flex",alignItems:"baseline",gap:6}}>
      <span style={{fontSize:32,fontWeight:800,fontFamily:"monospace",color:"#ff6b9d",lineHeight:1}}>{d}</span>
      <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>días para la Regional</span>
    </div>
  );
}

export default function Planner() {
  const [weekIdx, setWeekIdx] = useState(0);
  const [checked, setChecked] = useState(loadProgress);
  const [filterStarred, setFilterStarred] = useState(false);
  const [viewMode, setViewMode] = useState('map');
  const [activeTech, setActiveTech] = useState(null);

  useEffect(() => { saveProgress(checked); }, [checked]);

  const w = WEEKS[weekIdx];
  const pi = PHASE_INFO[w.phase];
  const toggleCheck = (dayI, probI) => {
    const k = `${weekIdx}-${dayI}-${probI}`;
    setChecked(p => {
      const current = p[k] || 0;
      const next = (current + 1) % 4;
      return { ...p, [k]: next };
    });
  };

  const weekStats = useMemo(() => {
    return WEEKS.map((wk, wi) => {
      let total = 0, done = 0, mins = 0, starred = 0, starredDone = 0, practicing = 0, reviewing = 0;
      wk.days.forEach((d, di) => {
        d[1].forEach((p, pi) => {
          total++;
          mins += p[3];
          if (p[5]) starred++;
          const st = checked[`${wi}-${di}-${pi}`] || 0;
          if (st >= 2) {
            done++;
            if (p[5]) starredDone++;
          }
          if (st === 1) practicing++;
          if (st === 3) reviewing++;
        });
      });
      return { total, done, mins, starred, starredDone, practicing, reviewing };
    });
  }, [checked]);

  const globalStats = useMemo(() => {
    let total=0, done=0, cses=0, usaco=0, cf=0, starred=0, starredDone=0, practicing=0, reviewing=0;
    WEEKS.forEach((wk,wi) => wk.days.forEach((d,di) => d[1].forEach((p,pi) => {
      total++;
      const st = checked[`${wi}-${di}-${pi}`] || 0;
      if(st >= 2) done++;
      if(st === 1) practicing++;
      if(st === 3) reviewing++;
      if(p[1]==="C") cses++;
      else if(p[1].startsWith("U")) usaco++;
      else if(p[1]==="CF") cf++;
      if(p[5]) { starred++; if(st >= 2) starredDone++; }
    })));
    return {total,done,cses,usaco,cf,starred,starredDone,practicing,reviewing};
  }, [checked]);

  const techStats = useMemo(() => {
    const stats = {};
    WEEKS.forEach((wk,wi) => wk.days.forEach((d,di) => d[1].forEach((p,pi) => {
      const tech = p[2];
      if (!stats[tech]) stats[tech] = { total:0, done:0 };
      stats[tech].total++;
      const st = checked[`${wi}-${di}-${pi}`] || 0;
      if (st >= 2) stats[tech].done++;
    })));
    return stats;
  }, [checked]);

  const st = weekStats[weekIdx];

  const exportData = () => {
    const blob = new Blob([JSON.stringify(checked, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "icpc-progress.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setChecked(data);
      } catch { alert("Invalid file"); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="wrap">
      <div style={{
        position:"relative", borderRadius:"16px", overflow:"hidden", marginBottom:24,
        border:"1.5px solid var(--line-strong)", boxShadow:"var(--shadow)", height: 260,
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding: "30px 40px", background:"#050508"
      }}>
        <img src={viewMode === 'plan' && WEEKS[weekIdx] ? (GIFS[WEEKS[weekIdx].tech] || (WEEKS[weekIdx].phase === 'sim' ? GIFS.contest : GIFS.mixed)) : (activeTech ? (GIFS[activeTech] || GIFS.mixed) : GIFS.mixed)} 
             style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",imageRendering:"pixelated",opacity:0.6,zIndex:0}} alt="Hero" />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, var(--canvas) 0%, rgba(10,10,16,0.6) 40%, transparent 100%)",zIndex:1}}></div>
        <div style={{position:"relative",zIndex:2, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20}}>
          <div>
            <div className="eyebrow"><span className="dot"></span> ICPC 2026 · DAILY TRAINING PLANNER</div>
            <h1 className="title" style={{color:"#fff", textShadow:"0 2px 4px rgba(0,0,0,0.8)"}}>Plan Diario de Problemas</h1>
            <div className="sub" style={{color:"var(--ink-soft)", textShadow:"0 1px 2px rgba(0,0,0,0.8)"}}>Jun 22 → Nov 7 · <b>20 semanas</b> · <b>{globalStats.total} problemas</b> · ⭐ {globalStats.starred} starred</div>
          </div>
          <div className="countdown" style={{textAlign:"right"}}>
            <div className="num" style={{color:"var(--brand)", textShadow:"0 2px 0 var(--brand-deep)"}}>{Math.max(0, Math.ceil((new Date("2026-11-07") - new Date()) / 864e5))}</div>
            <span className="lbl" style={{color:"rgba(255,255,255,0.6)"}}>días para la Regional</span>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat c-green"><div className="v" id="st-comp">{globalStats.done}/{globalStats.total}</div><div className="k">Completados</div></div>
        <div className="stat c-gold"><div className="v" id="st-prac">{globalStats.practicing}</div><div className="k" style={{display:"flex",alignItems:"center",gap:4}}><Icon name="st-practice"/> Practicando</div></div>
        <div className="stat c-sky"><div className="v" id="st-rep">{globalStats.reviewing}</div><div className="k" style={{display:"flex",alignItems:"center",gap:4}}><Icon name="st-review"/> Repasando</div></div>
        <div className="stat c-grape"><div className="v" id="st-prog">{Math.round((globalStats.done/Math.max(globalStats.total,1))*100)}%</div><div className="k">Progreso</div></div>
      </div>
      <div className="stats">
        <div className="stat c-green"><div className="v">{globalStats.cses}</div><div className="k">CSES</div></div>
        <div className="stat c-gold"><div className="v">{globalStats.usaco}</div><div className="k">USACO Guide</div></div>
        <div className="stat c-coral"><div className="v">{globalStats.cf}</div><div className="k">CF / Contest</div></div>
        <div className="stat c-gold"><div className="v" id="st-star">{globalStats.starredDone}/{globalStats.starred}</div><div className="k" style={{display:"flex",alignItems:"center",gap:4}}><Icon name="st-star"/> Starred</div></div>
      </div>

      <div className="switch">
        <button className={`sw ${viewMode === 'map' ? 'on' : ''}`} onClick={() => setViewMode('map')} style={{display:"flex",alignItems:"center",gap:6}}><Icon name="map"/> Mapa de Técnicas</button>
        <button className={`sw ${viewMode === 'plan' ? 'on' : ''}`} onClick={() => setViewMode('plan')} style={{display:"flex",alignItems:"center",gap:6}}><Icon name="calendar"/> Plan Semanal</button>
      </div>

      {viewMode === 'map' && (
        <section id="view-map">

          <div className="map-intro">Cada técnica es un <b>mundo</b> que vas dominando. Selecciona una para ver los recursos recomendados.</div>
          <div className="grid">
            {Object.keys(TECH_LABELS).map(tech => {
              const stats = techStats[tech] || { total: 0, done: 0 };
              if (stats.total === 0) return null;
              const pct = stats.done / stats.total;
              const isDone = stats.done === stats.total;
              const accents = ['accent-green', 'accent-grape', 'accent-gold', 'accent-sky', 'accent-coral'];
              const accent = accents[Object.keys(TECH_LABELS).indexOf(tech) % accents.length];
              
              return (
                <div key={tech} className={`tcard ${isDone ? 'done-tech' : ''}`} onClick={() => setActiveTech(tech)}>
                  <div className={`ban ${!IMG[tech] ? 'ph ph-green' : ''}`}>
                    {IMG[tech] ? <img src={IMG[tech]} alt={TECH_LABELS[tech]} /> : <div className="glyph" style={{display:"flex"}}><SVG.Misc/></div>}
                    <div className="lvl">LVL {Math.floor(pct*10)}</div>
                    <div className="cnt">{stats.done}/{stats.total}</div>
                  </div>
                  <div className="body">
                    <div className="nm">
                      <span className="g" style={{display:"flex", color:"var(--grape)"}}>
                        <Icon name={ICONS[{graph:"grafos", tree:"arboles", geom:"geometria", topo:"toposort"}[tech] || tech] ? ({graph:"grafos", tree:"arboles", geom:"geometria", topo:"toposort"}[tech] || tech) : "advanced"} size={20} />
                      </span> 
                      {TECH_LABELS[tech]}
                    </div>
                    <div className="fl">Desafíos completados. ¡Sigue avanzando en esta técnica!</div>
                    <div className={`pbar ${accent}`}><i style={{width: `${pct*100}%`}}></i></div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeTech && (
            <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)", zIndex:100, display:"grid", placeItems:"center", padding:16}} onClick={() => setActiveTech(null)}>
              <div style={{background:"var(--surface)", border:"1.5px solid var(--line-strong)", borderRadius:"var(--radius)", overflow:"hidden", width:"100%", maxWidth:520, boxShadow:"0 24px 48px rgba(0,0,0,0.6)"}} onClick={e => e.stopPropagation()}>
                {/* GIF Banner */}
                <div style={{position:"relative", height:160, overflow:"hidden"}}>
                  <img src={GIFS[activeTech] || GIFS.mixed} style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"pixelated"}} alt="" />
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, var(--surface) 0%, rgba(17,17,22,0.4) 50%, transparent 100%)"}}></div>
                  <div style={{position:"absolute", bottom:12, left:16, zIndex:1, display:"flex", alignItems:"center", gap:10}}>
                    <span style={{color:"var(--brand)", display:"flex"}}><Icon name="cses" size={24}/></span>
                    <h3 style={{margin:0, fontFamily:"var(--font-pixel)", fontSize:14, color:"#fff", textShadow:"0 2px 4px rgba(0,0,0,0.8)"}}>Intro a {TECH_LABELS[activeTech]}</h3>
                  </div>
                </div>
                <div style={{padding:"16px 20px 24px"}}>
                  <p style={{color:"var(--ink-soft)", fontSize:15, lineHeight:1.5, marginBottom:20, marginTop:0}}>
                     Este es el mundo de <b>{TECH_LABELS[activeTech]}</b>. Aquí resolverás desafíos clásicos que pondrán a prueba tus habilidades algorítmicas y de optimización en la programación competitiva.
                  </p>
                  <div style={{display:"flex", flexDirection:"column", gap:10}}>
                     <a href="https://cses.fi/book/book.pdf" target="_blank" rel="noopener noreferrer" style={{background:"var(--brand-tint)", color:"var(--brand)", padding:"12px 16px", borderRadius:8, textDecoration:"none", display:"flex", alignItems:"center", gap:10, fontWeight:600, fontSize:14}}>
                       <Icon name="cses"/> Leer CSES Handbook (PDF)
                     </a>
                     <a href="https://usaco.guide/" target="_blank" rel="noopener noreferrer" style={{background:"var(--gold-tint)", color:"var(--gold)", padding:"12px 16px", borderRadius:8, textDecoration:"none", display:"flex", alignItems:"center", gap:10, fontWeight:600, fontSize:14}}>
                       <Icon name="usaco"/> Estudiar en USACO Guide
                     </a>
                  </div>
                  <button onClick={() => setActiveTech(null)} style={{marginTop:20, width:"100%", background:"transparent", border:"1.5px solid var(--line)", padding:"10px", borderRadius:8, color:"var(--ink-soft)", cursor:"pointer", fontFamily:"var(--font-pixel)", fontSize:10, transition:"all .2s"}}>CERRAR</button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === 'plan' && (
        <section id="view-plan">
          <div className="ph" style={{fontFamily:"var(--font-pixel)", fontSize:10, color:"var(--ink-faint)", marginBottom:10}}>SEMANAS</div>
          <div className="tabs">
            {WEEKS.map((wk, i) => (
              <div key={i} className={`tab ${weekIdx === i ? 'active' : ''}`} onClick={() => setWeekIdx(i)}>
                {i+1}
              </div>
            ))}
          </div>
          <div className="legend-row">
            <div className="phases">
              <span className="ph-vac"><b>S1-6</b>Vacaciones</span>
              <span className="ph-sem"><b>S7-16</b>Semestre</span>
              <span className="ph-sim"><b>S17-20</b>Simulacros</span>
            </div>
            <div className="tools">
              <button className={`tool ${filterStarred ? 'on' : ''}`} onClick={() => setFilterStarred(!filterStarred)}>⭐ Solo Starred</button>
              <button className="tool" onClick={exportData}>💾 Export Sync</button>
              <label className="tool" style={{margin:0}}>📥 Import Sync<input type="file" accept=".json" onChange={importData} style={{display:"none"}}/></label>
            </div>
          </div>

          <div className="banner" style={{position:"relative", overflow:"hidden", background:"#050508", padding:"30px 28px 24px", border:"2px solid var(--line-strong)"}}>
            <img src={GIFS[w.tech] || (w.phase === 'sim' ? GIFS.contest : GIFS.mixed)} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",imageRendering:"pixelated",opacity:1,zIndex:0}} alt="bg" />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(10,10,16,0.85) 0%, rgba(10,10,16,0.5) 50%, transparent 100%)",zIndex:1}}></div>

            <div className="meta" style={{position:"relative", zIndex:2, marginBottom:12, display:"flex", flexWrap:"wrap", alignItems:"center", gap:8}}>
               <span style={{fontFamily:"var(--font-pixel)", fontSize:9, background:"rgba(0,0,0,0.6)", padding:"5px 10px", borderRadius:6, backdropFilter:"blur(4px)", color:"#fff", border:"1px solid rgba(255,255,255,0.1)"}}>SEMANA {w.id} · {w.dates}</span>
               <span style={{fontFamily:"var(--font-pixel)", fontSize:9, background:`${pi.color}20`, padding:"5px 10px", borderRadius:6, color:pi.color, border:`1px solid ${pi.color}40`}}>{pi.label} · {pi.sub}</span>
               <span style={{fontFamily:"var(--font-pixel)", fontSize:9, color:"#fff", marginLeft:"auto", textShadow:"0 2px 4px rgba(0,0,0,0.9)"}}>{st.done}/{st.total}</span>
               <span style={{fontFamily:"var(--font-pixel)", fontSize:9, color:"var(--gold)", textShadow:"0 2px 4px rgba(0,0,0,0.9)"}}>⭐ {st.starredDone}/{st.starred}</span>
            </div>

            <h2 style={{position:"relative", zIndex:2, color:"#fff", textShadow:"0 3px 6px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9)", fontFamily:"var(--font-pixel)", fontSize:"clamp(14px,2.2vw,20px)", fontWeight:400, marginTop:0, letterSpacing:"0px", textTransform:"uppercase", lineHeight:1.5}}>{w.title}</h2>
            <p style={{position:"relative", zIndex:2, color:"rgba(255,255,255,0.85)", textShadow:"0 2px 4px rgba(0,0,0,0.9)", maxWidth:600, fontSize:14, fontWeight:500, lineHeight:1.5, margin:"4px 0 0"}}>{w.focus}</p>

            <div style={{position:"relative", zIndex:2, display:"flex", alignItems:"center", gap:24, marginTop:18, flexWrap:"wrap"}}>
               <button className="btn-codedex" onClick={() => {
                 const el = document.getElementById('days');
                 if(el) el.scrollIntoView({behavior:'smooth'});
               }}>
                 Comenzar Semana
               </button>
               <span style={{fontFamily:"var(--font-pixel)", fontSize:9, color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:8}}><Icon name="clock" size={14}/> ~{Math.round(st.mins/60)}hrs estimadas</span>
            </div>
            
            <div className="xp" style={{position:"relative", zIndex:2, marginTop:18, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)"}}><i style={{width:`${st.total > 0 ? (st.done/st.total)*100 : 0}%`}}></i></div>
          </div>

          <div id="days">
            {w.days.map(([dow, problems], di) => {
              const filteredProblems = filterStarred ? problems.filter(p => p[5] === 1) : problems;
              if (filteredProblems.length === 0) return null;
              
              const dayTotalMins = filteredProblems.reduce((a,p) => a+p[3], 0);
              const dayCls = dow === 'Dom' ? 'day-0' : dow === 'Sáb' ? 'day-6' : '';

              return (
                <div key={di} className="day">
                  <div className="day-head">
                    <div className={`day-name ${dayCls}`}>{dow}</div>
                    <div className="day-min">{dayTotalMins} min</div>
                  </div>
                  {filteredProblems.map((p) => {
                    const piOriginalIdx = problems.indexOf(p);
                    const [name, src, tech, mins, url, starred] = p;
                    const status = checked[`${weekIdx}-${di}-${piOriginalIdx}`] || 0;
                    const isDone = status >= 2;
                    
                    let boxCls = "";
                    let boxContent = null;
                    if (status === 1) { boxCls = "s1"; boxContent = <Icon name="st-practice"/>; }
                    else if (status === 2) { boxCls = "s2"; boxContent = <Icon name="st-done"/>; }
                    else if (status === 3) { boxCls = "s3"; boxContent = <Icon name="st-review"/>; }

                    return (
                      <div key={piOriginalIdx} className={`prob ${isDone ? 'done' : ''}`}>
                        <div className={`box ${boxCls}`} onClick={() => toggleCheck(di, piOriginalIdx)} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{boxContent}</div>
                        <div className="star" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{starred === 1 ? <Icon name="st-star"/> : null}</div>
                        <div className="name">
                          {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{color:'inherit', textDecoration:'inherit'}}>{name}</a> : name}
                        </div>
                        <div className="tags">
                          <span className={`tag ${src==='C' ? 'src-cses' : src.startsWith('U') ? 'src-usaco' : src==='CF' ? 'src-cf' : 'tech g'}`}>{SRC_LABELS[src]}</span>
                          <span className="tag tech">{TECH_LABELS[tech]}</span>
                        </div>
                        <div className="time">{mins > 0 ? mins+"m" : "—"}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="panel">
            <div className="ph">ESTADOS · click en la casilla para ciclar</div>
            <div className="legend">
              <div className="leg"><span className="swatch"></span> No hecho</div>
              <div className="leg"><span className="swatch s1"><Icon name="st-practice"/></span> Practicando</div>
              <div className="leg"><span className="swatch s2"><Icon name="st-done"/></span> Completado</div>
              <div className="leg"><span className="swatch s3"><Icon name="st-review"/></span> Repasando</div>
            </div>
          </div>

          <div className="panel">
            <div className="ph">PROGRESO POR TÉCNICA</div>
            <div className="tech-grid">
              {Object.keys(techStats).map(tech => {
                const s = techStats[tech];
                if (s.total === 0) return null;
                const pct = s.done / s.total;
                return (
                  <div key={tech} className={`tchip ${pct === 1 ? 'live' : ''}`}>
                    <div className="tn">{TECH_LABELS[tech]}</div>
                    <div className="tbar"><i style={{width: `${pct*100}%`}}></i></div>
                    <div className="tc">{s.done}/{s.total}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="wnav">
            <button className="wbtn" disabled={weekIdx === 0} onClick={() => setWeekIdx(weekIdx-1)}>← Semana {weekIdx}</button>
            <button className="wbtn next" disabled={weekIdx === WEEKS.length-1} onClick={() => setWeekIdx(weekIdx+1)}>Semana {weekIdx+2} →</button>
          </div>
        </section>
      )}

      <footer><span>Plan calibrado</span>·<span>20 semanas</span>·<span>CSES + USACO Guide + CF</span>·<span>Progreso guardado localmente</span></footer>
    </div>
  );
}
