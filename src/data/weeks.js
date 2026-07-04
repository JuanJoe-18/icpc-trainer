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
    id:5, title:"Interleaving III: Euler + DP Intervalos + Sliding Window", dates:"Jul 20–26", phase:"vac", tech:"mixed",
    focus:"Caminos Eulerianos, DP de intervalos y subsets, primeras ventanas deslizantes.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["De Bruijn Sequence","C","graph",50,C+"1692",0],
        ["Rectangle Cutting","C","dp",45,C+"1744",0],
        ["Prefix Sum Queries","C","rq",55,C+"2166",0],
        ["Swapity Swap","U","impl",40,U+"1013",1],
      ]],
      ["Mar",[
        ["Teleporters Path","C","graph",55,C+"1693",0],
        ["Money Sums","C","dp",40,C+"1745",0],
        ["Pizzeria Queries","C","rq",60,C+"2206",0],
        ["The Great Revegetation","U","impl",35,U+"916",1],
      ]],
      ["Mié",[
        ["Hamiltonian Flights","C","dp",65,C+"1690",0],
        ["Removal Game","C","dp",55,C+"1097",0],
        ["Subarray Sum Queries","C","rq",50,C+"1190",0],
        ["Sleepy Cow Herding","U","impl",30,U+"915",0],
      ]],
      ["Jue",[
        ["Knight's Tour","C","graph",60,C+"1689",0],
        ["Two Sets II","C","dp",50,C+"1093",0],
        ["Distinct Values Queries","C","rq",55,C+"1734",0],
        ["Where Am I?","U","sort",30,U+"964",1],
      ]],
      ["Vie",[
        ["Download Speed","C","flow",70,C+"1694",0],
        ["Mountain Range","C","dp",60,C+"1743",0],
        ["Forest Queries II","C","rq",55,C+"1739",0],
        ["Year of the Cow","U","sort",35,U+"1107",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo / Virtual","CT","contest",180,"",0],
      ]]
    ]
  },
  {
    id:6, title:"Interleaving IV: Flujo + DP Avanzado + RQ Avanzado", dates:"Jul 27 – Ago 2", phase:"vac", tech:"mixed",
    focus:"Flujo máximo, DP bitmask y conteo, Range Queries avanzados. Última semana de vacaciones.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Police Chase","C","flow",60,C+"1695",0],
        ["Increasing Subsequence","C","dp",45,C+"1145",0],
        ["Range Updates and Sums","C","rq",70,C+"1735",0],
        ["Collecting Numbers","C","sort",30,C+"2216",0],
      ]],
      ["Mar",[
        ["School Dance","C","flow",50,C+"1696",0],
        ["Projects","C","dp",55,C+"1140",0],
        ["Polynomial Queries","C","rq",60,C+"1736",0],
        ["Playlist","C","sort",35,C+"1141",0],
      ]],
      ["Mié",[
        ["Distinct Routes","C","flow",60,C+"1711",0],
        ["Elevator Rides","C","dp",70,C+"1653",0],
        ["Range Queries and Copies","C","rq",65,C+"1737",0],
        ["Towers","C","sort",30,C+"1073",0],
      ]],
      ["Jue",[
        ["Subordinates","C","tree",30,C+"1674",0],
        ["Counting Tilings","C","dp",65,C+"2181",0],
        ["Missing Coin Sum Queries","C","rq",60,C+"2432",0],
        ["Traffic Lights","C","sort",40,C+"1163",0],
      ]],
      ["Vie",[
        ["Tree Matching","C","tree",55,C+"1130",0],
        ["Counting Numbers","C","dp",60,C+"2220",0],
        ["Movie Festival Queries","C","rq",50,C+"1740",0],
        ["Nearest Smaller Values","C","sort",25,C+"1645",0],
      ]],
      ["Sáb",[
        ["🏆 SIMULACRO ICPC con equipo (5hrs)","CT","contest",300,"",0],
      ]]
    ]
  },
  {
    id:7, title:"Interleaving V: Árboles + DP Final + RQ Avanzado", dates:"Ago 3–9", phase:"sem", tech:"mixed",
    focus:"Diámetro y distancias en árboles, últimos DPs, Range Queries avanzados.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Tree Diameter","C","tree",45,C+"1131",0],
        ["Increasing Subsequence II","C","dp",55,C+"1748",0],
        ["Don't Be Last!","U","sort",30,U+"687",1],
      ]],
      ["Mar",[
        ["Tree Distances I","C","tree",50,C+"1132",0],
        ["Hoof Paper Scissors","U","dp",40,U+"691",0],
        ["Social Distancing I","U","greedy",35,U+"1035",0],
      ]],
      ["Mié",[
        ["Tree Distances II","C","tree",55,C+"1133",0],
        ["Sliding Window Sum","C","slide",25,C+"2424",0],
        ["Leaders","U","impl",40,U+"1275",0],
      ]],
      ["Jue",[
        ["Company Queries I","C","tree",50,C+"1687",0],
        ["Sliding Window Minimum","C","slide",35,C+"2425",0],
        ["Room Allocation","C","greedy",45,C+"1164",0],
      ]],
      ["Vie",[
        ["Company Queries II","C","tree",55,C+"1688",0],
        ["Sliding Window Xor","C","slide",30,C+"2426",0],
        ["Factory Machines","C","bs",40,C+"1620",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:8, title:"Interleaving VI: LCA + Queries en Árbol", dates:"Ago 10–16", phase:"sem", tech:"mixed",
    focus:"Binary Lifting, Euler Tour, Subtree/Path Queries. Combinar árboles con Segment Trees.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Distance Queries","C","tree",55,C+"1135",0],
        ["Sliding Window Distinct Values","C","slide",40,C+"2428",0],
        ["Collecting Numbers II","C","sort",50,C+"2217",0],
      ]],
      ["Mar",[
        ["Counting Paths","C","tree",60,C+"1136",0],
        ["Sliding Window Median","C","slide",55,C+"1076",0],
        ["Josephus Problem II","C","sort",55,C+"2163",0],
      ]],
      ["Mié",[
        ["Subtree Queries","C","tree",55,C+"1137",0],
        ["Sliding Window Cost","C","slide",50,C+"1077",0],
        ["Nested Ranges Check","C","sort",55,C+"2168",0],
      ]],
      ["Jue",[
        ["Path Queries","C","tree",55,C+"1138",0],
        ["Sliding Window Inversions","C","slide",55,C+"2430",0],
        ["Nested Ranges Count","C","sort",60,C+"2169",0],
      ]],
      ["Vie",[
        ["Path Queries II","C","tree",80,C+"2134",0],
        ["Cities & States","U","sort",40,U+"667",0],
        ["Tasks and Deadlines","C","greedy",30,C+"1630",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:9, title:"Interleaving VII: Tree Avanzado + Sorting Final", dates:"Ago 17–23", phase:"sem", tech:"mixed",
    focus:"Centroid Decomposition, Fixed-Length Paths. Sorting avanzado y subarrays.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Distinct Colors","C","tree",60,C+"1139",0],
        ["Reading Books","C","greedy",25,C+"1631",0],
        ["Subarray Sums I","C","sort",30,C+"1660",0],
      ]],
      ["Mar",[
        ["Finding a Centroid","C","tree",50,C+"2079",0],
        ["Angry Cows","U","bs",45,U+"594",1],
        ["Cow College","U","greedy",40,U+"1251",0],
      ]],
      ["Mié",[
        ["Fixed-Length Paths I","C","tree",70,C+"2080",0],
        ["Fence Painting","U","impl",25,U+"567",0],
        ["Subarray Sums II","C","sort",40,C+"1661",0],
      ]],
      ["Jue",[
        ["Fixed-Length Paths II","C","tree",80,C+"2081",0],
        ["Subarray Divisibility","C","sort",45,C+"1662",0],
        ["Sum of Three Values","C","sort",50,C+"1641",0],
      ]],
      ["Vie",[
        ["Sum of Four Values","C","sort",55,C+"1642",0],
        ["Distinct Values Subarrays II","C","sort",40,C+"2427",0],
        ["Array Division","C","bs",45,C+"1085",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
      ]]
    ]
  },
  {
    id:10, title:"Interleaving VIII: Greedy + Binary Search + Math", dates:"Ago 24–30", phase:"sem", tech:"mixed",
    focus:"Greedy clásicos, Binary Search paramétrico, fundamentos de matemáticas.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Movie Festival II","C","greedy",50,C+"1632",0],
        ["Maximum Subarray Sum II","C","sort",55,C+"1644",0],
        ["Out of Place","U","greedy",35,U+"785",1],
      ]],
      ["Mar",[
        ["Exponentiation","C","adv",30,C+"1712",1],
        ["Exponentiation II","C","adv",35,C+"1713",1],
        ["Counting Divisors","C","adv",30,C+"1081",1],
      ]],
      ["Mié",[
        ["Binomial Coefficients","C","adv",40,C+"1079",1],
        ["Kayaking","CF","greedy",30,CF+"863/problem/B",0],
        ["Word Combinations","C","str",55,C+"1731",0],
      ]],
      ["Jue",[
        ["String Matching","C","str",35,C+"1753",0],
        ["Finding Borders","C","str",50,C+"1732",0],
        ["Finding Periods","C","str",50,C+"1733",0],
      ]],
      ["Vie",[
        ["Playing in a Casino","CF","sort",30,CF+"1808/problem/B",0],
        ["It's Mooin' Time","U","sort",35,U+"1445",0],
        ["Counting Liars","U","bs",30,U+"1228",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:11, title:"Interleaving IX: Strings Fundamentos", dates:"Ago 31 – Sep 6", phase:"sem", tech:"mixed",
    focus:"KMP, borders, periods, Word Combinations. Fundamentos de string algorithms.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Bovine Genomics","U","impl",30,U+"736",1],
        ["Triangles","U","geo",35,U+"1011",0],
      ]],
      ["Mar",[
        ["Guess the Animal","U","impl",35,U+"893",0],
        ["Minimal Rotation","C","str",55,C+"1110",0],
      ]],
      ["Mié",[
        ["Longest Palindrome","C","str",55,C+"1111",0],
        ["Palindrome Queries","C","str",60,C+"2420",0],
      ]],
      ["Jue",[
        ["Finding Patterns","C","str",50,C+"2102",0],
        ["Counting Patterns","C","str",55,C+"2103",0],
      ]],
      ["Vie",[
        ["Lifeguards","U","greedy",40,U+"786",0],
        ["Photoshoot","U","greedy",35,U+"1227",1],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:12, title:"Interleaving X: Strings Avanzado + Geometry", dates:"Sep 7–13", phase:"sem", tech:"mixed",
    focus:"Rotación mínima, palíndromos, geometría computacional básica.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Load Balancing","U","sort",40,U+"617",1],
        ["Polygon Lattice Points","C","geo",40,C+"2193",0],
      ]],
      ["Mar",[
        ["Minimum Euclidean Distance","C","geo",50,C+"2194",0],
        ["Distinct Substrings","C","str",60,C+"2104",0],
      ]],
      ["Mié",[
        ["Pattern Positions","C","str",55,C+"2105",0],
        ["Repeating Substring","C","str",50,C+"2106",0],
      ]],
      ["Jue",[
        ["Convex Hull","C","geo",55,C+"2195",0],
        ["Sleeping in Class","U","greedy",35,U+"1203",1],
      ]],
      ["Vie",[
        ["Blocked Billboard II","U","geo",35,U+"783",1],
        ["Meet in the Middle","C","adv",60,C+"1628",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
      ]]
    ]
  },
  {
    id:13, title:"Interleaving XI: Geometry + Advanced Techniques", dates:"Sep 14–20", phase:"sem", tech:"mixed",
    focus:"Convex Hull, Meet in the Middle, Counting Bits. Técnicas avanzadas.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["Counting Bits","C","adv",40,C+"2419",0],
        ["Maximum Xor Subarray","C","adv",55,C+"1655",0],
      ]],
      ["Mar",[
        ["Why Did the Cow Cross the Road III","U","sort",35,U+"713",0],
        ["Reachable Nodes","C","adv",50,C+"2138",0],
      ]],
      ["Mié",[
        ["Reachability Queries","C","adv",50,C+"2139",0],
        ["Necessary Roads","C","adv",55,C+"2177",0],
      ]],
      ["Jue",[
        ["Necessary Cities","C","adv",50,C+"2178",0],
        ["Into Blocks","CF","dsu",40,CF+"1209/problem/G1",0],
      ]],
      ["Vie",[
        ["D. Dijkstra?","CF","graph",60,CF+"20/problem/D",0],
        ["E. Tree Painting","CF","tree",60,CF+"1187/problem/E",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:14, title:"Interleaving XII: Advanced + CF Mixed 1600-2000", dates:"Sep 21–27", phase:"sem", tech:"mixed",
    focus:"Reachability, Necessary Roads/Cities, problemas mixtos de Codeforces.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Lun",[
        ["D. Journey","CF","dp",55,CF+"1472/problem/D",0],
        ["E. Minimal Segment Cover","CF","rq",60,CF+"1175/problem/E",0],
      ]],
      ["Mar",[
        ["C. Ski Base","CF","greedy",50,CF+"913/problem/C",0],
        ["E. Almost Shortest Path","CF","sp",65,CF+"843/problem/D",0],
      ]],
      ["Mié",[
        ["D. Prefix-Suffix Palindrome","CF","str",55,CF+"1326/problem/D2",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
    ]
  },
  {
    id:15, title:"Interleaving XIII: CF Mixed Avanzado", dates:"Sep 28 – Oct 4", phase:"sem", tech:"mixed",
    focus:"Problemas mixtos de CF para practicar identificación de técnicas bajo presión.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST con equipo","CT","contest",180,"",0],
      ]]
    ]
  },
  {
    id:16, title:"Interleaving XIV: Cierre Pre-Simulacros", dates:"Oct 5–11", phase:"sem", tech:"mixed",
    focus:"Últimos problemas mixtos. Transición hacia la fase de simulacros.",
    days:[
      ["Dom",[
        ["Upsolving y Backlog semanal","CT","mixed",120,"",0],
      ]],
      ["Sáb",[
        ["🏆 CONTEST VIRTUAL CF Div2","CF","contest",150,CF+"",0],
      ]]
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
