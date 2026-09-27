// Format: [name, source, technique, minutes, url, starred]
// Sources: C=CSES, UB=USACO Bronze, US=USACO Silver, UG=USACO Gold, UP=USACO Plat, CF=Codeforces, CT=Team
// Techniques: impl, graph, dp, tree, rq, str, geo, adv, sort, slide, flow, dsu, scc, bs, greedy, topo, sp, func
// starred: 1=essential, 0=optional

const C = "https://cses.fi/problemset/task/";
const U = "http://www.usaco.org/index.php?page=viewproblem2&cpid=";
const CF = "https://codeforces.com/contest/";

export const WEEKS = [
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
        ["Game Routes","C","topo",45,C+"1681",0],
        ["Investigation","C","sp",55,C+"1202",0],
        ["Milk Measurement","UB","impl",40,U+"761",0],
        ["Reflection","UB","impl",40,U+"1491",0],
        ["Upsolving de la semana","CT","mixed",60,"",0],
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
      ["Vie",[
        ["Flight Routes","C","sp",60,C+"1196",0],
        ["Hoofball","UB","graph",40,U+"808",1],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",180,"",0],
        ["Upsolving 1 problema","CF","mixed",60,"",0],
      ]],
    ]
  },
  {
    id:3, title:"Interleaving I: Grafos Funcionales + DP Lineal + RQ Básico", dates:"Jul 6–12", phase:"vac", tech:"mixed",
    focus:"Primeros pasos en DP (recurrencias lineales), Range Queries estáticos, y avance en grafos funcionales.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Planets Queries I","C","func",55,C+"1750",0],
        ["Dice Combinations","C","dp",30,C+"1633",0],
        ["Static Range Sum Queries","C","rq",25,C+"1646",0],
        ["Distinct Numbers","C","sort",25,C+"1621",0],
      ]],
      ["Mar",[
        ["Planets Queries II","C","func",65,C+"1160",0],
        ["Minimizing Coins","C","dp",35,C+"1634",0],
        ["Static Range Minimum Queries","C","rq",30,C+"1647",0],
        ["Apartments","C","sort",30,C+"1084",0],
      ]],
      ["Mié",[
        ["Planets Cycles","C","func",50,C+"1751",0],
        ["Coin Combinations I","C","dp",35,C+"1635",0],
        ["Dynamic Range Sum Queries","C","rq",30,C+"1648",0],
        ["Ferris Wheel","C","sort",30,C+"1090",0],
      ]],
      ["Jue",[
        ["Road Reparation","C","dsu",45,C+"1675",0],
        ["Coin Combinations II","C","dp",40,C+"1636",0],
        ["Dynamic Range Minimum Queries","C","rq",40,C+"1649",0],
        ["Concert Tickets","C","sort",35,C+"1091",0],
      ]],
      ["Vie",[
        ["Road Construction","C","dsu",40,C+"1676",0],
        ["Removing Digits","C","dp",30,C+"1637",0],
        ["Range Xor Queries","C","rq",35,C+"1650",0],
        ["Restaurant Customers","C","sort",30,C+"1619",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo / Virtual","CT","contest",180,"",0],
      ]]
    ]
  },
  {
    id:4, title:"Interleaving II: SCC + DP Grids + Segment Trees", dates:"Jul 13–19", phase:"vac", tech:"mixed",
    focus:"Componentes fuertemente conexas, DP en grillas y mochila, primeros Segment Trees.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Flight Routes Check","C","graph",50,C+"1682",0],
        ["Grid Paths I","C","dp",45,C+"1638",0],
        ["Range Update Queries","C","rq",45,C+"1651",0],
        ["Movie Festival","C","sort",30,C+"1629",0],
      ]],
      ["Mar",[
        ["Planets and Kingdoms","C","scc",70,C+"1683",0],
        ["Book Shop","C","dp",50,C+"1158",0],
        ["Forest Queries","C","rq",40,C+"1652",0],
        ["Sum of Two Values","C","sort",35,C+"1640",0],
      ]],
      ["Mié",[
        ["Giant Pizza","C","scc",70,C+"1684",0],
        ["Array Description","C","dp",55,C+"1746",0],
        ["Hotel Queries","C","rq",55,C+"1143",0],
        ["Maximum Subarray Sum","C","sort",30,C+"1643",0],
      ]],
      ["Jue",[
        ["Coin Collector","C","scc",50,C+"1686",0],
        ["Counting Towers","C","dp",60,C+"2413",0],
        ["List Removals","C","rq",50,C+"1749",0],
        ["Stick Lengths","C","sort",25,C+"1074",0],
      ]],
      ["Vie",[
        ["Mail Delivery","C","graph",60,C+"1691",0],
        ["Edit Distance","C","dp",45,C+"1639",0],
        ["Salary Queries","C","rq",60,C+"1144",0],
        ["Missing Coin Sum","C","sort",30,C+"2183",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
      ]]
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
        ["Counting Divisors","C","adv",30,C+"1081",1],
      ]],
      ["Mié",[
        ["Longest Common Subsequence","C","dp",50,C+"3403",0],
        ["Rectangle Cutting","C","dp",45,C+"1744",0],
        ["Playing in a Casino","CF","sort",30,CF+"1808/problem/B",0],
      ]],
      ["Jue",[
        ["Money Sums","C","dp",40,C+"1745",0],
        ["Removal Game","C","dp",55,C+"1097",0],
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
    id:6, title:"DP Intermedio + USACO Gold DP · Transición", dates:"Jul 27 – Ago 2", phase:"sem", tech:"dp",
    focus:"Semestre en marcha: Mar y Jue con 1 problema (carga de clases). Lun y Vie aprovechan la monitoria del Club CP para avanzar más.",
    days:[
      ["Lun",[
        ["Increasing Subsequence","C","dp",45,C+"1145",1],
      ]],
      ["Mar",[
        ["Projects","C","dp",55,C+"1140",1],
      ]],
      ["Mié",[
        ["Elevator Rides","C","dp",70,C+"1653",1],
        ["Counting Tilings","C","dp",65,C+"2181",0],
      ]],
      ["Jue",[
        ["Counting Numbers","C","dp",60,C+"2220",1],
      ]],
      ["Vie",[
        ["Increasing Subsequence II","C","dp",55,C+"1748",1],
        ["Subarray Divisibility","C","sort",45,C+"1662",0],
        ["It's Mooin' Time","UB","sort",35,U+"1445",0],
      ]],
      ["Sáb",[
        ["🏆 SIMULACRO ICPC con equipo (3hrs)","CT","contest",180,"",1],
        ["Post-mortem + análisis","CT","mixed",45,"",1],
      ]],
      ["Dom",[
        ["Mountain Range","C","dp",60,C+"1743",0],
        ["Out of Place","UB","greedy",35,U+"785",1],
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
    id:8, title:"Árboles: LCA, Euler Tour (Recalibración)", dates:"Ago 10–16", phase:"sem", tech:"tree",
    focus:"Recalibración Jue-Vie. Cubrir deuda de Distance Queries/Counting Paths. [L]=Learn, [C]=Consolidate, [R]=Recognition, [S]=Speed",
    days:[
      ["Dom",[
        ["[L] Distance Queries","C","tree",55,"https://cses.fi/problemset/task/1135",0],
        ["[L] Counting Paths","C","tree",60,"https://cses.fi/problemset/task/1136",0]
      ]],
      ["Lun",[
        ["[C] Subtree Queries","C","tree",55,"https://cses.fi/problemset/task/1137",0]
      ]],
      ["Mar",[
        ["[C] Path Queries","C","tree",55,"https://cses.fi/problemset/task/1138",0]
      ]],
      ["Mié",[
        ["[C] Distinct Colors","C","tree",60,"https://cses.fi/problemset/task/1139",0]
      ]],
      ["Jue",[
        ["[L] Finding a Centroid","C","tree",50,"https://cses.fi/problemset/task/2079",0],
        ["Slot: Recuperación Árboles (Si quedaron de Dom-Mié)","CT","mixed",60,"",1]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento Adaptativo (Debilidad)","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2 (Transición)","CF","contest",150,"",0],
        ["Post-mortem (Categorizar Debilidad)","CT","mixed",40,"",1]
      ]]
    ]
  },
  {
    id:9, title:"Árboles Avanzados + Func Graphs", dates:"Ago 17–23", phase:"sem", tech:"func",
    focus:"Principal: Trees HLD/Path Queries. Secundaria: Ninguna. Mantenimiento: Slot adaptativo el domingo.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo (De Contest Sáb)","CT","mixed",60,"",1],
        ["[V] Repaso guiado (Opcional)","CT","mixed",40,"",0]
      ]],
      ["Lun",[
        ["[L] Planets Queries II","C","func",65,"https://cses.fi/problemset/task/1160",1]
      ]],
      ["Mar",[
        ["[L] Path Queries II (HLD/SegTree en árbol)","C","tree",80,"https://cses.fi/problemset/task/2134",1]
      ]],
      ["Mié",[
        ["[C] Fixed-Length Paths I","C","tree",70,"https://cses.fi/problemset/task/2080",1]
      ]],
      ["Jue",[
        ["[C] Fixed-Length Paths II","C","tree",80,"https://cses.fi/problemset/task/2081",0]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento Adaptativo (Velocidad/Reconocimiento)","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo (3h)","CT","contest",180,"",1],
        ["Post-mortem + Upsolving","CT","mixed",60,"",1]
      ]]
    ]
  },
  {
    id:10, title:"Range Queries Básico + Sliding Window", dates:"Ago 24–30", phase:"sem", tech:"rq",
    focus:"Principal: SegTree/Fenwick [S] (10 min memo). Secundaria: Sliding Window inicial.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo (Post-Mortem)","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[S] Dynamic Range Minimum Queries","C","rq",30,"https://cses.fi/problemset/task/1649",1]
      ]],
      ["Mar",[
        ["[S] Range Xor Queries","C","rq",30,"https://cses.fi/problemset/task/1650",1]
      ]],
      ["Mié",[
        ["[S] Range Update Queries","C","rq",40,"https://cses.fi/problemset/task/1651",1]
      ]],
      ["Jue",[
        ["[L] Sliding Window Median","C","slide",55,"https://cses.fi/problemset/task/1076",1]
      ]],
      ["Vie",[
        ["[L] Sliding Window Cost","C","slide",50,"https://cses.fi/problemset/task/1077",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",1],
        ["Post-mortem","CF","mixed",40,"",1]
      ]]
    ]
  },
  {
    id:11, title:"Range Queries Lazy", dates:"Ago 31 – Sep 6", phase:"sem", tech:"rq",
    focus:"Principal: Lazy propagation. Mantenimiento: Grafos (Reconocimiento).",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo (Grafos)","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[L] Prefix Sum Queries","C","rq",55,"https://cses.fi/problemset/task/2166",1]
      ]],
      ["Mar",[
        ["[C] Pizzeria Queries","C","rq",60,"https://cses.fi/problemset/task/2206",1]
      ]],
      ["Mié",[
        ["[C] Subarray Sum Queries","C","rq",50,"https://cses.fi/problemset/task/1190",1]
      ]],
      ["Jue",[
        ["[C] Range Updates and Sums","C","rq",70,"https://cses.fi/problemset/task/1735",1]
      ]],
      ["Vie",[
        ["[R] Mantenimiento: CF Graph / DP (1500-1600)","CF","graph",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo (3h)","CT","contest",180,"",1],
        ["Post-mortem + Upsolving","CT","mixed",60,"",1]
      ]]
    ]
  },
  {
    id:12, title:"RQ Avanzado + Coord Compress", dates:"Sep 7–13", phase:"sem", tech:"rq",
    focus:"Principal: 2D Queries, Coord Compression. Secundaria: Sliding Window Adv.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[L] Forest Queries II","C","rq",55,"https://cses.fi/problemset/task/1739",1]
      ]],
      ["Mar",[
        ["[C] Range Queries and Copies","C","rq",65,"https://cses.fi/problemset/task/1737",1]
      ]],
      ["Mié",[
        ["[C] Kth Largest (Coord Compress)","CF","rq",60,"https://codeforces.com/contest/1093/problem/G",1]
      ]],
      ["Jue",[
        ["[C] Sliding Window Inversions","C","slide",55,"https://cses.fi/problemset/task/2430",1]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento Adaptativo (DP o Debilidad)","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",1],
        ["Post-mortem","CF","mixed",40,"",1]
      ]]
    ]
  },
  {
    id:13, title:"String Algorithms", dates:"Sep 14–20", phase:"sem", tech:"str",
    focus:"Principal: Hashing como herramienta O(1), Borders. Mantenimiento: RQ Lazy.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo (RQ Lazy / Debilidad)","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[L] Word Combinations","C","str",55,"https://cses.fi/problemset/task/1731",1]
      ]],
      ["Mar",[
        ["[L] Finding Borders","C","str",50,"https://cses.fi/problemset/task/1732",1]
      ]],
      ["Mié",[
        ["[C] Finding Periods","C","str",50,"https://cses.fi/problemset/task/1733",1]
      ]],
      ["Jue",[
        ["[C] Longest Palindrome","C","str",55,"https://cses.fi/problemset/task/1111",1]
      ]],
      ["Vie",[
        ["[S] Mantenimiento: Implementar Hashing / KMP rápido","CT","str",30,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo (3h)","CT","contest",180,"",1],
        ["Post-mortem + Upsolving","CT","mixed",60,"",1]
      ]]
    ]
  },
  {
    id:14, title:"Técnicas Avanzadas Selectivas", dates:"Sep 21–27", phase:"sem", tech:"adv",
    focus:"Principal: Meet in the Middle, Bitwise. Secundario: Strings. Prioridad a profundidad.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[L] Meet in the Middle (Teoría + Guiado)","C","adv",60,"https://cses.fi/problemset/task/1628",1]
      ]],
      ["Mar",[
        ["[C] Meet in the Middle (Variante CF)","CF","adv",60,"",1]
      ]],
      ["Mié",[
        ["[L] Counting Bits / Bitwise tricks","C","adv",40,"https://cses.fi/problemset/task/2419",1]
      ]],
      ["Jue",[
        ["[C] Reachable Nodes (Bitset)","C","adv",50,"https://cses.fi/problemset/task/2138",1]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento (Strings KMP/Hashing)","CT","mixed",50,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,"",1],
        ["Post-mortem","CF","mixed",40,"",1]
      ]]
    ]
  },
  {
    id:15, title:"Reconocimiento I (Mixtos CF)", dates:"Sep 28 – Oct 4", phase:"sem", tech:"mixed",
    focus:"[R] Romper la dependencia de las categorías. Seleccionar CF (1500-1700) para reconocimiento.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Estricto de Debilidades","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[R] Problema Mixto CF (Ej. Greedy/DP)","CF","mixed",60,"https://codeforces.com/contest/913/problem/C",1]
      ]],
      ["Mar",[
        ["[R] Problema Mixto CF (Ej. Graph/Tree)","CF","mixed",60,"https://codeforces.com/contest/1187/problem/E",1]
      ]],
      ["Mié",[
        ["[R] Problema Mixto CF (Ej. RQ/Sort)","CF","mixed",60,"https://codeforces.com/contest/1175/problem/E",1]
      ]],
      ["Jue",[
        ["[R] Problema Mixto CF","CF","mixed",60,"https://codeforces.com/contest/1472/problem/D",1]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento Adaptativo","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo (3h)","CT","contest",180,"",1],
        ["Post-mortem + Upsolving","CT","mixed",60,"",1]
      ]]
    ]
  },
  {
    id:16, title:"Reconocimiento II + Simulacro Transición", dates:"Oct 5–11", phase:"sem", tech:"mixed",
    focus:"Preparación directa para ICPC. Dificultad 1700-1900. Sábado: Simulacro corto de 2.5h.",
    days:[
      ["Dom",[
        ["Slot: Mantenimiento Adaptativo (Debilidades)","CT","mixed",60,"",1]
      ]],
      ["Lun",[
        ["[R] Problema Mixto CF","CF","mixed",60,"https://codeforces.com/contest/20/problem/D",1]
      ]],
      ["Mar",[
        ["[R] Problema Mixto CF","CF","mixed",60,"https://codeforces.com/contest/843/problem/D",1]
      ]],
      ["Mié",[
        ["[R] Problema Mixto CF","CF","mixed",60,"https://codeforces.com/contest/1326/problem/D2",1]
      ]],
      ["Jue",[
        ["[R] Problema Mixto CF","CF","mixed",60,"",1]
      ]],
      ["Vie",[
        ["Slot: Mantenimiento Adaptativo","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 SIMULACRO ICPC DE TRANSICIÓN (2.5h)","CT","contest",150,"",1],
        ["Post-mortem y categorización","CT","mixed",40,"",1]
      ]]
    ]
  },
  {
    id:17, title:"Simulacro ICPC #1 (Rendimiento Equipo)", dates:"Oct 12–18", phase:"sim", tech:"contest",
    focus:"Simulacro formal 5h. El resto de la semana se enfoca en Upsolving y atacar debilidades exactas.",
    days:[
      ["Dom",[
        ["🏆 ICPC Regional Formal (equipo, 5hrs)","CT","contest",300,"",1]
      ]],
      ["Lun",[
        ["Upsolving Problema A o B","CT","mixed",60,"",1]
      ]],
      ["Mar",[
        ["Upsolving Problema C o D","CT","mixed",70,"",1]
      ]],
      ["Mié",[
        ["Debilidad Detectada: Problema de Recuperación","CT","mixed",60,"",1]
      ]],
      ["Jue",[
        ["Debilidad Detectada: Problema de Recuperación","CT","mixed",60,"",1]
      ]],
      ["Vie",[
        ["Notebook: Escribir/verificar templates","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2 (Mantenimiento)","CF","contest",150,"",1]
      ]]
    ]
  },
  {
    id:18, title:"Simulacro ICPC #2", dates:"Oct 19–25", phase:"sim", tech:"contest",
    focus:"Ajustar estrategia de equipo, roles y velocidad. Post-mortem riguroso.",
    days:[
      ["Dom",[
        ["🏆 ICPC Regional Formal (equipo, 5hrs)","CT","contest",300,"",1]
      ]],
      ["Lun",[
        ["Upsolving Problema más difícil","CT","mixed",70,"",1]
      ]],
      ["Mar",[
        ["Upsolving + editorial analysis","CT","mixed",60,"",1]
      ]],
      ["Mié",[
        ["Debilidad Detectada: Recuperación","CT","mixed",60,"",1]
      ]],
      ["Jue",[
        ["Debilidad Detectada: Recuperación","CT","mixed",60,"",1]
      ]],
      ["Vie",[
        ["Notebook: Completar + probar en stress test","CT","mixed",60,"",1]
      ]],
      ["Sáb",[
        ["🏆 CONTEST equipo (set internacional/corto)","CT","contest",180,"",1]
      ]]
    ]
  },
  {
    id:19, title:"Simulacro ICPC #3 + Notebook Final", dates:"Oct 26 – Nov 1", phase:"sim", tech:"contest",
    focus:"Último simulacro. Bajar la carga cognitiva al final de la semana. Notebook impreso.",
    days:[
      ["Dom",[
        ["🏆 ICPC Regional Formal (equipo, 5hrs)","CT","contest",300,"",1]
      ]],
      ["Lun",[
        ["Upsolving final","CT","mixed",60,"",1]
      ]],
      ["Mar",[
        ["Verificar TODOS los templates del notebook","CT","mixed",90,"",1]
      ]],
      ["Mié",[
        ["[S] Speed Drill: Implementar DP Clásica","C","dp",30,"https://cses.fi/problemset/task/1636",0],
        ["[S] Speed Drill: Grafos Básico","C","graph",30,"https://cses.fi/problemset/task/1666",0]
      ]],
      ["Jue",[
        ["[S] Speed Drill: Trees/LCA","C","tree",30,"https://cses.fi/problemset/task/1131",0],
        ["[S] Speed Drill: Hashing/Strings","C","str",30,"https://cses.fi/problemset/task/1753",0]
      ]],
      ["Vie",[
        ["Práctica ligera con equipo (2hrs max)","CT","contest",120,"",1]
      ]],
      ["Sáb",[
        ["Imprimir notebook final","CT","mixed",60,"",1],
        ["Revisión estrategia equipo","CT","mixed",30,"",1]
      ]]
    ]
  },
  {
    id:20, title:"TAPER → REGIONAL 🏁", dates:"Nov 2–7", phase:"sim", tech:"contest",
    focus:"Bajar carga. Descansar. Llegar fresco el 7 de noviembre. Ya estás listo.",
    days:[
      ["Dom",[
        ["1 problema fácil de warm-up","C","impl",20,"https://cses.fi/problemset/task/1068",0],
        ["Repasar notebook grafos","CT","mixed",20,"",0]
      ]],
      ["Lun",[
        ["Repasar notebook DP + Trees","CT","mixed",30,"",0]
      ]],
      ["Mar",[
        ["Repasar notebook RQ + Strings","CT","mixed",30,"",0]
      ]],
      ["Mié",[
        ["Estrategia final equipo: roles, tiempos","CT","mixed",40,"",0]
      ]],
      ["Jue",[
        ["🛌 DESCANSO TOTAL — no tocar código","CT","mixed",0,"",1]
      ]],
      ["Vie",[
        ["🛌 Descanso + buena alimentación + dormir temprano","CT","mixed",0,"",1]
      ]],
      ["Sáb",[
        ["🏁 REGIONAL ICPC — A GANAR","CT","contest",300,"",1]
      ]]
    ]
  }
];
