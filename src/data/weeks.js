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
        ["Exponentiation","C","adv",30,C+"1712",1],
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
        ["Exponentiation II","C","adv",35,C+"1713",1],
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
        ["Counting Divisors","C","adv",30,C+"1081",1],
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
        ["Binomial Coefficients","C","adv",40,C+"1079",1],
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
        ["Kth Largest (Coord Compress + Segtree)","CF","rq",60,"https://codeforces.com/contest/1093/problem/G",1],
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
        ["Emergency Rations (Regional 2025 - E)","CF","rq",90,"https://codeforces.com/gym/106178/problem/E",1],
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
