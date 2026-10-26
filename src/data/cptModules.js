// Plan Maestro CPT · Campamento Intensivo (25 Oct – 6 Nov · Rumbo al 7 de Noviembre)
// Estructura: Teoría Necesaria (Lecturas + Analogía Física + Rigor Matemático + Pseudocódigo + Checkpoint) -> Práctica Guiada

export const CPT_MODULES = [
  {
    id: 1,
    code: "MÓDULO 1",
    daysLabel: "Días 1–2 · 25–26 Oct",
    dayNums: [1, 2],
    title: "DP de Conteo, Combinatoria e Inclusión-Exclusión",
    shortTitle: "DP de Conteo & Comb.",
    tech: "dp",
    accent: "accent-coral",
    color: "#E66591",
    img: "/res/DP.png",
    gif: "/gifs/matplotlib-banner.gif",
    focus: "Representación canónica para evitar doble conteo, inversión de estados, inserción combinatoria y DP sobre DAGs implícitos (con y sin obstáculos).",
    coverageNote: "La Inclusión-Exclusión tiene como referencia específica CPH.pdf §22.3; no se atribuye a Halim §5.4.",
    readings: [
      {
        id: "m1-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§3.5 y §§3.5.1–3.5.3",
        topic: "Programación Dinámica clásica, estados y ejemplos base",
        printPages: "pp. 111–138",
        pdfPages: "PDF 149–176",
        url: "/docs/ES.pdf#page=149",
        essential: true
      },
      {
        id: "m1-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "§4.7.1",
        topic: "Grafo Acíclico Dirigido (DAG), conteo de caminos y ejemplo UVa 10943",
        printPages: "pp. 203–211",
        pdfPages: "PDF 241–249",
        url: "/docs/ES.pdf#page=244",
        essential: true
      },
      {
        id: "m1-r3",
        source: "ES.pdf",
        badge: "halim",
        section: "§5.4 y §§5.4.1–5.4.4",
        topic: "Combinatoria, coeficientes binomiales y números de Catalan",
        printPages: "pp. 244–251",
        pdfPages: "PDF 282–289",
        url: "/docs/ES.pdf#page=282",
        essential: true
      },
      {
        id: "m1-r4",
        source: "ES.pdf",
        badge: "halim",
        section: "§§8.3.5–8.3.6",
        topic: "Representación de estados y eliminación de parámetros redundantes",
        printPages: "pp. 373–377",
        pdfPages: "PDF 411–415",
        url: "/docs/ES.pdf#page=411",
        essential: true
      },
      {
        id: "m1-r5",
        source: "CPH.pdf",
        badge: "cph",
        section: "§7.3 y §7.6",
        topic: "Paths in a Grid y Counting Tilings",
        printPages: "pp. 71–72 y 75–76",
        pdfPages: "PDF 81–82 y 85–86",
        url: "/docs/CPH.pdf#page=81",
        essential: false
      },
      {
        id: "m1-r6",
        source: "CPH.pdf",
        badge: "cph",
        section: "§22.1 y §22.3",
        topic: "Binomial Coefficients e Inclusion-Exclusion Principle",
        printPages: "pp. 208–209 y 212–213",
        pdfPages: "PDF 218–219 y 222–223",
        url: "/docs/CPH.pdf#page=222",
        essential: true
      },
      {
        id: "m1-r7",
        source: "CP-Algorithms",
        badge: "web",
        section: "Complementos Web",
        topic: "Binomial Coefficients, Inclusion-Exclusion & Broken Profile DP",
        printPages: "Web",
        pdfPages: "Sin paginación",
        url: "https://cp-algorithms.com/combinatorics/inclusion-exclusion.html",
        essential: false
      }
    ],
    analogies: [
      {
        title: "El Método del Detective en la Ciudad con Baches",
        icon: "🕵️",
        body: "Imagina que quieres contar de cuántas formas puedes llegar caminando desde la esquina noroeste de una ciudad cuadriculada hasta la esquina sureste, pero hay baches gigantes en ciertas intersecciones. Si la ciudad mide 100,000 × 100,000 calles, es imposible dibujar un mapa completo de toda la ciudad en tu libreta (te quedarías sin hojas — Memory Limit Exceeded). Sin embargo, si solo hay 2,000 baches, usas el método del detective: calculas todos los caminos posibles como si la ciudad fuera perfecta usando combinatoria directa, y luego restas únicamente los caminos que pisan algún bache, clasificándolos según cuál fue el PRIMER bache que pisaron para jamás restar el mismo camino dos veces."
      }
    ],
    theorems: [
      {
        id: "m1-t1",
        title: "1. Regla de la Biyección / Primer Fallo Canónico (Evitar Doble Conteo)",
        explanation: "Cuando cuentas objetos válidos restando los inválidos del total, clasificas cada camino inválido únicamente por el PRIMER obstáculo v que visita:",
        latex: String.raw`\text{Válidos}(u) = \text{Total}(u) - \sum_{v \prec u} \text{Válidos}(v) \times \text{Caminos}(v \to u)`,
        tacticalNote: "Donde v ≺ u significa que v puede alcanzar a u. Al exigir que v sea el PRIMER obstáculo visitado (usando Válidos(v) en vez de Total(v)) y multiplicar por todos los caminos libres de v a u, particionas los caminos inválidos en subconjuntos mutuamente excluyentes."
      },
      {
        id: "m1-t2",
        title: "2. Transiciones con Inserción Combinatoria",
        explanation: "Al construir permutaciones o secuencias válidas insertando grupos de elementos iguales, si tienes un estado con i elementos ya ordenados y quieres insertar k elementos nuevos manteniendo su orden relativo:",
        latex: String.raw`\binom{i + k}{k} = \frac{(i+k)!}{i! \, k!}`,
        tacticalNote: "Precalcula factoriales fact[N] e inversos modulares invFact[N] con exponenciación rápida en O(N) antes de la DP para responder cada coeficiente binomial en O(1)."
      }
    ],
    pseudocode: {
      title: "DP de Conteo con Primer Obstáculo (Coordenadas Comprimidas)",
      complexity: "Tiempo: O(M² + H + W) · Memoria: O(M + H + W)",
      lines: [
        { code: "FUNCION contar_caminos_sin_obstaculos(H, W, lista_obstaculos):", key: false },
        { code: "    Agregar el destino final (H, W) al final de lista_obstaculos", key: true },
        { code: "    Ordenar lista_obstaculos por coordenada (fila, columna) ascendente", key: true },
        { code: "    M = tamaño de lista_obstaculos", key: false },
        { code: "", key: false },
        { code: "    PARA i desde 0 hasta M - 1:", key: false },
        { code: "        (f_i, c_i) = lista_obstaculos[i]", key: false },
        { code: "        // Total de caminos desde (1, 1) hasta (f_i, c_i) sin importar obstáculos", key: false },
        { code: "        DP[i] = Combinatoria((f_i - 1) + (c_i - 1), f_i - 1)", key: true },
        { code: "", key: false },
        { code: "        // Restar caminos que chocaron por PRIMERA vez en un obstáculo previo j", key: false },
        { code: "        PARA j desde 0 hasta i - 1:", key: false },
        { code: "            (f_j, c_j) = lista_obstaculos[j]", key: false },
        { code: "            SI f_j <= f_i Y c_j <= c_i:", key: true },
        { code: "                caminos_entre_j_e_i = Combinatoria((f_i - f_j) + (c_i - c_j), f_i - f_j)", key: true },
        { code: "                DP[i] = (DP[i] - DP[j] * caminos_entre_j_e_i) MOD P", key: true },
        { code: "", key: false },
        { code: "    RETORNAR DP[M - 1]", key: false }
      ]
    },
    checkpoint: {
      question: "En la transición DP[i] = DP[i] - DP[j] * caminos_entre_j_e_i, ¿por qué usamos DP[j] (caminos sin obstáculos hasta j) multiplicado por TODOS los caminos entre j e i (incluso los que pisan otros obstáculos entre j e i)?",
      options: [
        "Porque entre j e i no puede haber otros obstáculos si ordenamos por fila y columna.",
        "Porque al fijar j como el PRIMER obstáculo del camino, cualquier obstáculo posterior entre j e i ya forma parte de ese mismo camino inválido y no debe descontarse otra vez.",
        "Para reducir la complejidad de O(M³) a O(M²) sacrificando exactitud cuando hay colisiones."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Todo camino inválido tiene un único PRIMER obstáculo j. Hasta j no pisó ningún obstáculo (hay DP[j] formas), y después de pisar j no importa cuántos obstáculos más pise rumbo a i: todas esas continuaciones (caminos_entre_j_e_i) tienen a j como su primer obstáculo canónico."
    },
    problems: [
      {
        id: "m1-p1",
        name: "How do you add?",
        platform: "UVa",
        problemId: "UVa 10943",
        tech: "dp",
        mins: 35,
        day: 1,
        starred: 1,
        url: "https://vjudge.net/problem/UVA-10943",
        theoryLink: "Lectura ES.pdf §3.5 & §4.7.1",
        tacticalApproach: "DP de conteo base en O(N·K) o fórmula directa con Barras y Estrellas: C(N + K - 1, K - 1). Úsalo para calentar el pre-cálculo de Pascal y verificar casos base."
      },
      {
        id: "m1-p2",
        name: "Grid 2",
        platform: "AtCoder",
        problemId: "AtCoder DP Y",
        tech: "dp",
        mins: 55,
        day: 1,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_y",
        theoryLink: "Teorema 1 + Pseudocódigo M1",
        tacticalApproach: "Aplicación directa del pseudocódigo: comprime coordenadas ordenando los N obstáculos + la meta (H, W) y resta caminos clasificando por el primer obstáculo visitado en O(N²)."
      },
      {
        id: "m1-p3",
        name: "Permutation",
        platform: "AtCoder",
        problemId: "AtCoder DP T",
        tech: "dp",
        mins: 55,
        day: 1,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_t",
        theoryLink: "ES.pdf §8.3.5 (Estado Canónico)",
        tacticalApproach: "DP de conteo de permutaciones usando rangos relativos: dp[i][j] = formas de armar prefijo de longitud i donde el último elemento tiene rango relativo j entre los i usados. Optimiza la transición con sumas prefijas para bajar de O(N³) a O(N²)."
      },
      {
        id: "m1-p4",
        name: "Tiling Dominoes",
        platform: "UVa",
        problemId: "UVa 11270",
        tech: "dp",
        mins: 65,
        day: 2,
        starred: 0,
        url: "https://vjudge.net/problem/UVA-11270",
        theoryLink: "CPH §7.6 + Halim §8.3",
        tacticalApproach: "DP de conteo con perfil quebrado (Broken Profile) procesando celda por celda. Asegúrate de rotar la grilla para que la dimensión menor sea ≤ 10 y la máscara tenga a lo sumo 2^10 estados."
      },
      {
        id: "m1-p5",
        name: "Marbles",
        platform: "CF",
        problemId: "CF 1215E",
        tech: "dp",
        mins: 55,
        day: 2,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/1215/E",
        theoryLink: "ES.pdf §8.3.6 (Inversión de Parámetros)",
        tacticalApproach: "Solo hay 20 colores. Precalcula cost[c1][c2] = inversiones necesarias para poner todos los del color c1 antes que c2. El orden dentro de un mismo color no importa; el problema se reduce a ordenar los 20 bloques de colores."
      },
      {
        id: "m1-p6",
        name: "Cow Poetry",
        platform: "USACO",
        problemId: "USACO Gold 897",
        tech: "dp",
        mins: 60,
        day: 2,
        starred: 1,
        url: "https://usaco.org/index.php?page=viewproblem2&cpid=897",
        theoryLink: "ES.pdf §5.4 + DP de Conteo",
        tacticalApproach: "Primero haz una DP tipo mochila ordenada (Unbounded Knapsack por longitud de línea K) para contar cuántos versos terminan en cada clase de rima c. Luego agrupa las estrofas por su letra de rima y suma (ways[c])^freq para cada clase c usando exponenciación rápida."
      }
    ]
  },
  {
    id: 2,
    code: "MÓDULO 2",
    daysLabel: "Días 3–4 · 27–28 Oct",
    dayNums: [3, 4],
    title: "DP de Probabilidad, Valor Esperado (EV) y Ciclos",
    shortTitle: "Probabilidad & EV",
    tech: "func",
    accent: "accent-grape",
    color: "#7B5BDD",
    img: "/res/FuncGraphs.png",
    gif: "/gifs/custom-phaser.gif",
    focus: "Push DP para probabilidades hacia adelante, Pull DP para Valor Esperado hacia atrás, eliminación algebraica de auto-ciclos (self-loops), Gauss-Jordan y Linealidad del Valor Esperado.",
    coverageNote: "Incluye la Verificación de Concepto oficial del Día 1 sobre el orden topológico iterativo de Sushi (AtCoder DP J).",
    readings: [
      {
        id: "m2-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§5.6 y §5.8.1",
        topic: "Teoría de probabilidad y árboles de decisión",
        printPages: "pp. 265–266 y 270–271",
        pdfPages: "PDF 303–304 y 308–309",
        url: "/docs/ES.pdf#page=303",
        essential: true
      },
      {
        id: "m2-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "§8.3.6",
        topic: "Abandono de un parámetro recuperable en el estado DP",
        printPages: "pp. 374–377",
        pdfPages: "PDF 412–415",
        url: "/docs/ES.pdf#page=412",
        essential: true
      },
      {
        id: "m2-r3",
        source: "ES.pdf",
        badge: "halim",
        section: "§9.9",
        topic: "Algoritmo de Eliminación Gaussiana para sistemas con ciclos",
        printPages: "pp. 404–406",
        pdfPages: "PDF 442–444",
        url: "/docs/ES.pdf#page=442",
        essential: true
      },
      {
        id: "m2-r4",
        source: "CPH.pdf",
        badge: "cph",
        section: "§§24.1–24.2",
        topic: "Calculation & Events (Espacio muestral y eventos)",
        printPages: "pp. 225–227",
        pdfPages: "PDF 235–237",
        url: "/docs/CPH.pdf#page=235",
        essential: false
      },
      {
        id: "m2-r5",
        source: "CPH.pdf",
        badge: "cph",
        section: "§24.3 y §24.4",
        topic: "Random Variables (Valor Esperado, Linealidad) & Markov Chains",
        printPages: "pp. 228–231",
        pdfPages: "PDF 238–241",
        url: "/docs/CPH.pdf#page=238",
        essential: true
      }
    ],
    analogies: [
      {
        title: "Probabilidad (Push hacia adelante) — La Pirámide de Agua",
        icon: "💧",
        body: "Imagina que viertes 1 litro de agua en la cima de una pirámide de canales. En cada bifurcación, el agua se divide según el ancho de cada tubería. Para saber cuánta agua llega a un depósito inferior, simplemente empujas el agua que tienes en el nivel actual hacia los niveles de abajo."
      },
      {
        title: "Valor Esperado (Pull hacia atrás) — El Laberinto de Peajes",
        icon: "🚪",
        body: "Imagina que quieres saber cuánto dinero en promedio te costará salir de un laberinto de peajes. En la puerta de salida el costo restante es $0. Si retrocedes un cuarto, el costo esperado desde ahí es el peaje de la puerta que acabas de cruzar MÁS el promedio ponderado del costo de los cuartos a los que esa puerta te puede llevar."
      }
    ],
    theorems: [
      {
        id: "m2-t1",
        title: "1. Linealidad del Valor Esperado (El arma secreta contra el TLE)",
        explanation: "Para cualquier conjunto de variables aleatorias X₁, X₂, ..., Xₙ (¡incluso si NO son independientes!):",
        latex: String.raw`E\left[\sum_{i=1}^n X_i\right] = \sum_{i=1}^n E[X_i], \qquad I_i \in \{0,1\} \implies E[I_i] = P(\text{evento } i \text{ ocurre})`,
        tacticalNote: "Transforma un problema de DP global imposible en sumar las probabilidades individuales de piezas pequeñas (como pares adyacentes, inversiones o contribución de cada nodo)."
      },
      {
        id: "m2-t2",
        title: "2. Eliminación Algebraica de Auto-Lazos vs. Gauss-Jordan",
        explanation: "Si un estado u transita a sí mismo con probabilidad p_uu y costo c, pasamos el término E[u] al lado izquierdo y despejamos:",
        latex: String.raw`E[u] = c + p_{uu} E[u] + \sum_{v \neq u} p_{uv} E[v] \implies E[u] = \frac{c + \sum_{v \neq u} p_{uv} E[v]}{1 - p_{uu}}`,
        tacticalNote: "Si hay un componente fuertemente conexo de estados de tamaño K ≤ 100 sin orden topológico, plantea el sistema lineal E[u] - ∑ P(u→v) E[v] = C(u) y resuélvelo en O(K³) con Eliminación Gaussiana."
      }
    ],
    pseudocode: {
      title: "Valor Esperado con Maximización de Decisiones (Juegos / Dados)",
      complexity: "Tiempo: O(|Estados| · |Eventos| · |Acciones|)",
      lines: [
        { code: "FUNCION valor_esperado_optimo(estado_u):", key: false },
        { code: "    SI estado_u es terminal:", key: false },
        { code: "        RETORNAR 0.0", key: true },
        { code: "    SI visitado[estado_u]:", key: false },
        { code: "        RETORNAR memo[estado_u]", key: false },
        { code: "", key: false },
        { code: "    acumulador_esperado = 0.0", key: false },
        { code: "    PARA cada evento_aleatorio r con probabilidad P(r):", key: true },
        { code: "        // Una vez que la suerte decide 'r', el jugador toma la decisión óptima", key: false },
        { code: "        mejor_decision = -INFINITO", key: true },
        { code: "        PARA cada accion_valida a disponible tras salir r:", key: false },
        { code: "            estado_v = transicion(estado_u, r, a)", key: false },
        { code: "            costo_o_ganancia = recompensa(estado_u, r, a) + valor_esperado_optimo(estado_v)", key: true },
        { code: "            mejor_decision = MAX(mejor_decision, costo_o_ganancia)", key: true },
        { code: "", key: false },
        { code: "        acumulador_esperado += P(r) * mejor_decision", key: true },
        { code: "", key: false },
        { code: "    visitado[estado_u] = VERDADERO", key: false },
        { code: "    memo[estado_u] = acumulador_esperado", key: false },
        { code: "    RETORNAR acumulador_esperado", key: false }
      ]
    },
    checkpoint: {
      question: "VERIFICACIÓN OFICIAL (Sushi · AtCoder DP J): El estado E[c1][c2][c3] depende de E[c1-1][c2][c3], E[c1+1][c2-1][c3] y E[c1][c2+1][c3-1]. Si escribes 3 ciclos 'for' anidados (Bottom-Up), ¿cuál variable debe ir obligatoriamente en el ciclo MÁS EXTERNO y cuál en el MÁS INTERNO?",
      options: [
        "c1 en el más externo, c2 en el medio y c3 en el más interno.",
        "c3 en el más externo, c2 en el medio y c1 en el más interno.",
        "c2 en el más externo, c3 en el medio y c1 en el más interno."
      ],
      correctIndex: 1,
      explanation: "¡Brillante! Al comer de un plato con 3 sushis, pasa a tener 2 (c3 disminuye a c3-1, pero c2 AUMENTA a c2+1). Al comer de uno con 2, pasa a tener 1 (c2 baja a c2-1, pero c1 AUMENTA a c1+1). Como c3 nunca aumenta, DEBE ir en el ciclo más externo; para un c3 fijo, c2 solo depende de c2-1, así que va en el medio; y para (c3, c2) fijos, c1 solo depende de c1-1, por lo que c1 va en el ciclo más interno."
    },
    problems: [
      {
        id: "m2-p1",
        name: "Coins",
        platform: "AtCoder",
        problemId: "AtCoder DP I",
        tech: "dp",
        mins: 35,
        day: 3,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_i",
        theoryLink: "Analogía 1 (Push DP) + ES.pdf §8.3.6",
        tacticalApproach: "DP de probabilidad pura en O(N²): solo necesitas llevar el conteo de caras j tras lanzar i monedas, ya que el número de cruces es i - j."
      },
      {
        id: "m2-p2",
        name: "Sushi",
        platform: "AtCoder",
        problemId: "AtCoder DP J",
        tech: "dp",
        mins: 55,
        day: 3,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_j",
        theoryLink: "Teorema 2 (Auto-lazos) + Checkpoint Oficial",
        tacticalApproach: "EV hacia atrás: agrupa platos por cantidad de sushis (c1, c2, c3). El número de platos vacíos es c0 = N - (c1+c2+c3). Despeja el auto-lazo de elegir un plato vacío multiplicando por N / (c1 + c2 + c3)."
      },
      {
        id: "m2-p3",
        name: "Dice Throwing",
        platform: "UVa",
        problemId: "UVa 10759",
        tech: "dp",
        mins: 35,
        day: 3,
        starred: 0,
        url: "https://vjudge.net/problem/UVA-10759",
        theoryLink: "ES.pdf §5.6 (Espacio Muestral)",
        tacticalApproach: "Cuenta casos favorables con DP en enteros de 64 bits (unsigned long long) y divide entre 6^n simplificando la fracción con gcd()."
      },
      {
        id: "m2-p4",
        name: "Bad Luck Island",
        platform: "CF",
        problemId: "CF 540D",
        tech: "dp",
        mins: 45,
        day: 3,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/540/D",
        theoryLink: "Teorema 2 (Colisiones del mismo tipo)",
        tacticalApproach: "DP 3D de probabilidad (r, s, p). Condiciona únicamente en los encuentros entre especies distintas: hay r·s + s·p + p·r pares útiles que cambian el estado."
      },
      {
        id: "m2-p5",
        name: "Bag of Mice",
        platform: "CF",
        problemId: "CF 148D",
        tech: "dp",
        mins: 50,
        day: 4,
        starred: 0,
        url: "https://codeforces.com/problemset/problem/148/D",
        theoryLink: "ES.pdf §5.8.1 (Árbol de decisión)",
        tacticalApproach: "DP(w, b) para la probabilidad de que gane la princesa cuando quedan w ratones blancos y b negros. En el turno del dragón, ramifica según si el ratón que escapa asustado es blanco o negro."
      },
      {
        id: "m2-p6",
        name: "Little Pony and Expected Maximum",
        platform: "CF",
        problemId: "CF 453A",
        tech: "func",
        mins: 35,
        day: 4,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/453/A",
        theoryLink: "CPH §24.3 (Distribución Acumulada)",
        tacticalApproach: "Valor esperado sin DP usando diferencias de probabilidades acumuladas: P(max ≤ k) = (k/m)^n, por lo tanto P(max = k) = (k/m)^n - ((k-1)/m)^n."
      },
      {
        id: "m2-p7",
        name: "Wet Shark and Flowers",
        platform: "CF",
        problemId: "CF 621C",
        tech: "func",
        mins: 40,
        day: 4,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/621/C",
        theoryLink: "Teorema 1 (Linealidad del EV)",
        tacticalApproach: "Aplica Linealidad del Valor Esperado sobre cada par adyacente (i, i+1) en el anillo. Un par aporta 2000 dólares con probabilidad 1 - P(ninguno de los dos sea múltiplo de p)."
      },
      {
        id: "m2-p8",
        name: "Journey",
        platform: "CF",
        problemId: "CF 839C",
        tech: "tree",
        mins: 30,
        day: 4,
        starred: 0,
        url: "https://codeforces.com/problemset/problem/839/C",
        theoryLink: "Analogía 2 (Pull DP en Árbol)",
        tacticalApproach: "Valor esperado de longitud de camino en un árbol: E[u] = 1 + promedio de E[v] sobre todos los hijos v de u."
      }
    ]
  },
  {
    id: 3,
    code: "MÓDULO 3",
    daysLabel: "Días 5–6 · 29–30 Oct",
    dayNums: [5, 6],
    title: "Bitmask DP, Iteración de Submáscaras y SOS DP",
    shortTitle: "Bitmask & SOS DP",
    tech: "adv",
    accent: "accent-sky",
    color: "#3D9BD6",
    img: "/res/ShortPath-Flow-Advanced.png",
    gif: "/gifs/uiux.gif",
    focus: "Transiciones de permutación a subconjunto O(N 2^N), enumeración de submáscaras O(3^N) y Sum Over Subsets (SOS DP) para evitar TLE en consultas de subconjuntos/superconjuntos.",
    coverageNote: "SOS DP no tiene sección propia en ES.pdf ni en CPH.pdf; se estudia directamente con la matemática de este módulo y USACO Guide.",
    readings: [
      {
        id: "m3-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§8.2.1 y §8.3.1",
        topic: "Backtracking con máscara de bits y DP con máscara de bits (Forming Quiz Teams)",
        printPages: "pp. 354–358 y 369–370",
        pdfPages: "PDF 392–396 y 407–408",
        url: "/docs/ES.pdf#page=407",
        essential: true
      },
      {
        id: "m3-r2",
        source: "CPH.pdf",
        badge: "cph",
        section: "§§10.1–10.3",
        topic: "Representación de bits, operaciones bit a bit y representación de subconjuntos",
        printPages: "pp. 95–99",
        pdfPages: "PDF 105–109",
        url: "/docs/CPH.pdf#page=105",
        essential: false
      },
      {
        id: "m3-r3",
        source: "CPH.pdf",
        badge: "cph",
        section: "§10.5",
        topic: "Dynamic Programming con máscaras de bits (de permutaciones a subconjuntos)",
        printPages: "pp. 102–106",
        pdfPages: "PDF 112–116",
        url: "/docs/CPH.pdf#page=112",
        essential: true
      },
      {
        id: "m3-r4",
        source: "USACO Guide",
        badge: "web",
        section: "Platinum · SOS DP",
        topic: "Sum Over Subsets (SOS) DP & Submask Enumeration",
        printPages: "Web",
        pdfPages: "Sin paginación",
        url: "https://usaco.guide/plat/dp-sos",
        essential: true
      }
    ],
    analogies: [
      {
        title: "Los 20 Ingredientes de Cocina y el Recetario Mágico",
        icon: "🍳",
        body: "Imagina que tienes 20 ingredientes de cocina y quieres saber para cada combinación posible (un interruptor 1 o 0 en un panel de 20 botones) cuántas recetas puedes preparar usando únicamente un subconjunto de los ingredientes en tu mesa. Revisar todas contra todas toma 4^20 ≈ 10^12 pasos (TLE). Iterar solo submáscaras toma 3^20 ≈ 3.4×10^9 pasos (perfecto para N ≤ 15, pero lento para N = 20). ¡SOS DP agrupa las recetas decidiendo ingrediente por ingrediente del 1 al 20 y resuelve TODAS las combinaciones en apenas 20 × 2^20 ≈ 2×10^7 operaciones!"
      }
    ],
    theorems: [
      {
        id: "m3-t1",
        title: "1. Complejidad de Iterar Submáscaras O(3^N)",
        explanation: "Por el Teorema del Binomio, si para cada máscara con k bits encendidos iteras únicamente sobre sus 2^k submáscaras usando sub = (sub - 1) & mask:",
        latex: String.raw`\sum_{k=0}^N \binom{N}{k} 2^k = (1 + 2)^N = 3^N`,
        tacticalNote: "Regla de oro en competencia: usa iteración de submáscaras O(3^N) cuando N ≤ 15; cambia obligatoriamente a SOS DP O(N 2^N) cuando 16 ≤ N ≤ 22."
      },
      {
        id: "m3-t2",
        title: "2. Recurrencia de SOS DP O(N 2^N)",
        explanation: "Definimos DP(mask, i) como la suma de A[sub] para todas las submáscaras sub ⊆ mask que solo pueden diferir de mask en los primeros i bits (0 ... i):",
        latex: String.raw`DP(\text{mask}, i) = \begin{cases} DP(\text{mask}, i-1) & \text{si el bit } i \text{ de mask es } 0 \\ DP(\text{mask}, i-1) + DP(\text{mask} \oplus 2^i, i-1) & \text{si el bit } i \text{ de mask es } 1 \end{cases}`,
        tacticalNote: "Al iterar el bit i en el ciclo externo, podemos comprimir la dimensión i y calcular F[mask] in-place en un solo arreglo de tamaño 2^N."
      }
    ],
    pseudocode: {
      title: "SOS DP en Memoria 1D In-Place",
      complexity: "Tiempo: O(N · 2^N) · Memoria: O(2^N)",
      lines: [
        { code: "FUNCION calcular_SOS_DP(N, arreglo_A):", key: false },
        { code: "    // Copiar valores iniciales", key: false },
        { code: "    PARA mask desde 0 hasta (2^N) - 1:", key: false },
        { code: "        F[mask] = arreglo_A[mask]", key: true },
        { code: "", key: false },
        { code: "    // Iterar bit por bit (el ciclo externo DEBE ser el bit i)", key: false },
        { code: "    PARA i desde 0 hasta N - 1:", key: true },
        { code: "        PARA mask desde 0 hasta (2^N) - 1:", key: true },
        { code: "            SI el bit i de mask está ENCENDIDO:", key: true },
        { code: "                mascara_sin_bit_i = mask XOR (2^i)", key: true },
        { code: "                F[mask] = F[mask] + F[mascara_sin_bit_i]", key: true },
        { code: "", key: false },
        { code: "    RETORNAR F", key: false }
      ]
    },
    checkpoint: {
      question: "En el pseudocódigo 1D in-place de SOS DP, ¿qué pasaría si intercambiamos los dos ciclos (poniendo 'PARA mask' afuera y 'PARA i' adentro)?",
      options: [
        "Daría exactamente el mismo resultado pero con peor localidad de caché.",
        "Solo sumaría las submáscaras que difieren de 'mask' en un único bit (distancia de Hamming 1), porque al consultar F[mask XOR 2^i] esa casilla aún no habría acumulado las diferencias en los bits previos.",
        "Entraría en un ciclo infinito por modificar F[mask] en el mismo paso."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Para que F[mask XOR 2^i] ya contenga la suma de todas las submáscaras que difieren en los bits 0...(i-1), todas las máscaras deben haber completado primero las fases 0...(i-1). Por eso el ciclo del bit i DEBE ser el externo."
    },
    problems: [
      {
        id: "m3-p1",
        name: "Forming Quiz Teams",
        platform: "UVa",
        problemId: "UVa 10911",
        tech: "dp",
        mins: 45,
        day: 5,
        starred: 1,
        url: "https://vjudge.net/problem/UVA-10911",
        theoryLink: "ES.pdf §8.3.1 (Canónico de Halim)",
        tacticalApproach: "Para evitar un factor extra de O(N) en la transición, obliga siempre a emparejar al PRIMER bit libre p1 (el de menor índice) con cualquier otro bit libre p2 > p1. Eso baja la complejidad de O(N² 2^(2N)) a O(N 2^(2N))."
      },
      {
        id: "m3-p2",
        name: "Matching",
        platform: "AtCoder",
        problemId: "AtCoder DP O",
        tech: "dp",
        mins: 40,
        day: 5,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_o",
        theoryLink: "ES.pdf §8.3.6 + CPH §10.5",
        tacticalApproach: "Conteo de emparejamientos bipartitos perfectos en O(N 2^N): el índice del hombre actual no se guarda en el estado porque es exactamente igual a __builtin_popcount(mask)."
      },
      {
        id: "m3-p3",
        name: "Grouping",
        platform: "AtCoder",
        problemId: "AtCoder DP U",
        tech: "dp",
        mins: 50,
        day: 5,
        starred: 1,
        url: "https://atcoder.jp/contests/dp/tasks/dp_u",
        theoryLink: "Teorema 1 (Submáscaras en O(3^N))",
        tacticalApproach: "Precalcula el puntaje de cada grupo en O(N² 2^N) y luego aplica la iteración de submáscaras sub = (sub - 1) & mask para particionar óptimamente en O(3^N) con N ≤ 16."
      },
      {
        id: "m3-p4",
        name: "Compatible Numbers",
        platform: "CF",
        problemId: "CF 165E",
        tech: "adv",
        mins: 50,
        day: 6,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/165/E",
        theoryLink: "Teorema 2 + Pseudocódigo SOS DP",
        tacticalApproach: "Dos números x, y tienen x & y = 0 si y solo si y es submáscara del complemento bit a bit (~x) en 22 bits. Guarda un representante en F[y] y propaga con SOS DP."
      },
      {
        id: "m3-p5",
        name: "Vowels",
        platform: "CF",
        problemId: "CF 383E",
        tech: "adv",
        mins: 60,
        day: 6,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/383/E",
        theoryLink: "SOS DP + Inclusión-Exclusión (M1)",
        tacticalApproach: "En vez de contar palabras que comparten al menos una vocal con el conjunto V, cuenta cuántas palabras tienen TODAS sus letras dentro del complemento (24 - V): ¡eso es exactamente la suma sobre submáscaras (SOS DP) con N = 24!"
      },
      {
        id: "m3-p6",
        name: "Guard Mark",
        platform: "USACO",
        problemId: "USACO Gold 494",
        tech: "dp",
        mins: 50,
        day: 6,
        starred: 0,
        url: "https://usaco.org/index.php?page=viewproblem2&cpid=494",
        theoryLink: "CPH §10.5 (Bitmask Bottleneck)",
        tacticalApproach: "El orden óptimo de apilamiento depende solo del subconjunto usado. Guarda en DP[mask] el máximo factor de seguridad restante al apilar el subconjunto mask."
      }
    ]
  },
  {
    id: 4,
    code: "MÓDULO 4",
    daysLabel: "Días 7–8 · 31 Oct–1 Nov",
    dayNums: [7, 8],
    title: "Geometría Computacional Extra-Hard",
    shortTitle: "Geometría Extra-Hard",
    tech: "geo",
    accent: "accent-gold",
    color: "#E6A11E",
    img: "/res/Geom.png",
    gif: "/gifs/seo-bannergif.gif",
    focus: "Ordenamiento radial exacto sin pérdida de precisión (sin atan2), Barrido Radial (Angular Sweep), Intersección de Semiplanos (HPI en O(N log N)) y Sumas de Minkowski.",
    coverageNote: "El comparador radial entero, HPI en O(N log N) y la Suma de Minkowski son extensiones externas a Halim Cap. 7.",
    readings: [
      {
        id: "m4-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§§7.2.1–7.2.3",
        topic: "Puntos, vectores, líneas, producto cruz y círculos",
        printPages: "pp. 321–330",
        pdfPages: "PDF 359–368",
        url: "/docs/ES.pdf#page=359",
        essential: true
      },
      {
        id: "m4-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "§§7.3.1–7.3.7",
        topic: "Polígonos, área, punto interior, cutPolygon y Convex Hull",
        printPages: "pp. 338–348",
        pdfPages: "PDF 376–386",
        url: "/docs/ES.pdf#page=376",
        essential: true
      },
      {
        id: "m4-r3",
        source: "CPH.pdf",
        badge: "cph",
        section: "Cap. 29 y §30.3",
        topic: "Geometría compleja, producto cruz, área de polígonos y Convex Hull",
        printPages: "pp. 265–274 y 278–280",
        pdfPages: "PDF 275–284 y 288–290",
        url: "/docs/CPH.pdf#page=275",
        essential: false
      },
      {
        id: "m4-r4",
        source: "CP-Algorithms",
        badge: "web",
        section: "Geometría Avanzada",
        topic: "Half-plane Intersection O(N log N) & Minkowski Sum of Convex Polygons",
        printPages: "Web",
        pdfPages: "Sin paginación",
        url: "https://cp-algorithms.com/geometry/halfplane-intersection.html",
        essential: true
      }
    ],
    analogies: [
      {
        title: "El Reloj en la Pared (Ordenamiento Radial sin atan2)",
        icon: "🕒",
        body: "Si intentas ordenar manecillas midiendo sus grados con un transportador escolar (atan2 en punto flotante), dos manecillas casi encimadas a 10^9 metros parecerán iguales por error de redondeo. En cambio, si primero separas las manecillas que apuntan a la mitad superior del reloj [0, π) de las que apuntan a la mitad inferior [π, 2π), dentro de cada mitad puedes saber cuál va antes usando únicamente multiplicaciones enteras (el producto cruz), ¡con precisión infinita!"
      },
      {
        title: "La Guillotina de Papel (Intersección de Semiplanos HPI)",
        icon: "✂️",
        body: "Imagina una hoja de papel infinita y varios cortes de guillotina rectos. Cada corte elimina todo el papel a su derecha y conserva lo que queda a su izquierda. En vez de recortar el polígono entero una y otra vez en O(N²) como cutPolygon, ordenas los cortes por el ángulo de la guillotina y vas envolviendo la región sobreviviente en una cola doble (deque) en O(N log N)."
      }
    ],
    theorems: [
      {
        id: "m4-t1",
        title: "1. Predicado de Orden Radial Exacto (360° en Enteros de 64 bits)",
        explanation: "Definimos la función hemisferio H(p) ∈ {0, 1} para un vector p = (x, y) ≠ (0, 0), donde H(p) = 0 si y > 0 o (y = 0 ∧ x > 0), y H(p) = 1 en caso contrario. Entonces u va antes que v en sentido antihorario si y solo si:",
        latex: String.raw`H(u) < H(v) \quad \lor \quad \big(H(u) = H(v) \land (u \times v > 0)\big), \qquad u \times v = u_x v_y - u_y v_x`,
        tacticalNote: "Cero trigonometría, cero pérdida de precisión. Recuerda usar long long (o __int128 si las coordenadas alcanzan 10^9 y restas vectores)."
      },
      {
        id: "m4-t2",
        title: "2. Condición de Redundancia en Intersección de Semiplanos (HPI)",
        explanation: "Al insertar un nuevo semiplano L_nuevo = (P_nuevo, D_nuevo) en el deque ordenado polarmente, el último semiplano del deque (L_top) es redundante y se elimina si el vértice de intersección entre L_top y L_penúltimo cae a la derecha de L_nuevo:",
        latex: String.raw`D_{\text{nuevo}} \times \big(\text{Interseccion}(L_{\text{top}}, L_{\text{penúltimo}}) - P_{\text{nuevo}}\big) < -\epsilon`,
        tacticalNote: "No olvides agregar los 4 semiplanos de una Caja Infinita [-INF, INF]² al inicio para acotar regiones abiertas."
      },
      {
        id: "m4-t3",
        title: "3. Suma de Minkowski de Polígonos Convexos A ⊕ B",
        explanation: "Como los lados de dos polígonos convexos ya están ordenados por ángulo polar, su suma de Minkowski A ⊕ B se construye en O(|A| + |B|) fusionando sus vectores de aristas como en Merge Sort:",
        latex: String.raw`A \oplus B = \{a + b \mid a \in A, b \in B\}, \qquad A \cap B \neq \emptyset \iff (0,0) \in A \oplus (-B)`,
        tacticalNote: "Además, la distancia mínima entre dos polígonos convexos A y B es exactamente la distancia desde el origen (0,0) al polígono convexo A ⊕ (-B)."
      }
    ],
    pseudocode: {
      title: "Intersección de Semiplanos (HPI) en O(N log N)",
      complexity: "Tiempo: O(N log N) · Memoria: O(N)",
      lines: [
        { code: "FUNCION interseccion_semiplanos(lista_semiplanos):", key: false },
        { code: "    Agregar 4 semiplanos de una 'Caja Infinita' [-INF, INF] x [-INF, INF]", key: true },
        { code: "    Ordenar lista_semiplanos por ángulo polar usando H(D) y producto cruz", key: true },
        { code: "    Crear un deque vacío Q", key: false },
        { code: "", key: false },
        { code: "    PARA cada semiplano L en lista_semiplanos:", key: false },
        { code: "        MIENTRAS tamaño(Q) >= 2 Y interseccion(Q.ultimo, Q.penultimo) está a la DERECHA de L:", key: true },
        { code: "            Q.quitar_ultimo()", key: true },
        { code: "        MIENTRAS tamaño(Q) >= 2 Y interseccion(Q.primero, Q.segundo) está a la DERECHA de L:", key: true },
        { code: "            Q.quitar_primero()", key: false },
        { code: "", key: false },
        { code: "        SI Q no está vacío Y L es paralelo con igual sentido que Q.ultimo:", key: false },
        { code: "            SI L está más a la izquierda (es más restrictivo) que Q.ultimo:", key: true },
        { code: "                Q.quitar_ultimo()", key: false },
        { code: "            SINO: CONTINUAR al siguiente L", key: false },
        { code: "        Q.agregar_al_final(L)", key: false },
        { code: "", key: false },
        { code: "    // Cerrar el ciclo entre el final y el inicio del deque", key: false },
        { code: "    MIENTRAS tamaño(Q) >= 3 Y interseccion(Q.ultimo, Q.penultimo) está a la DERECHA de Q.primero:", key: true },
        { code: "        Q.quitar_ultimo()", key: false },
        { code: "    MIENTRAS tamaño(Q) >= 3 Y interseccion(Q.primero, Q.segundo) está a la DERECHA de Q.ultimo:", key: false },
        { code: "        Q.quitar_primero()", key: false },
        { code: "    SI tamaño(Q) < 3: RETORNAR Polígono Vacío", key: false },
        { code: "    RETORNAR intersecciones de semiplanos adyacentes en Q", key: false }
      ]
    },
    checkpoint: {
      question: "Al ordenar vectores en 360° usando únicamente el producto cruz (u × v > 0) SIN dividir primero por hemisferios H(p), ¿qué falla catastróficamente?",
      options: [
        "El producto cruz desborda enteros de 64 bits cuando los ángulos superan 180°.",
        "La relación deixa de ser transitiva (rompe std::sort con Undefined Behavior / Crash), porque entre vectores separados por más de 180° el signo del producto cruz se invierte y forma un ciclo A < B < C < A.",
        "Solo funciona en sentido horario pero no antihorario."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Tres vectores a 0°, 120° y 240° tienen u×v > 0 en ciclo (A < B < C < A), violando el Strict Weak Ordering de std::sort y provocando Runtime Error o resultados corruptos. Separar primero por hemisferio H(p) restringe los ángulos a un intervalo de 180° donde el producto cruz es estrictamente transitivo."
    },
    problems: [
      {
        id: "m4-p1",
        name: "Hotter Colder / Triathlon",
        platform: "UVa",
        problemId: "UVa 10084 / 11168",
        tech: "geo",
        mins: 45,
        day: 7,
        starred: 0,
        url: "https://vjudge.net/problem/UVA-10084",
        theoryLink: "ES.pdf §7.3.6 (cutPolygon)",
        tacticalApproach: "Calentamiento con corte de polígonos mediante semiplanos (cutPolygon en O(N²)) y propiedades de envolvente convexa."
      },
      {
        id: "m4-p2",
        name: "Nearest Vectors / Engines",
        platform: "CF",
        problemId: "CF 598C / ABC139F",
        tech: "geo",
        mins: 45,
        day: 7,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/598/C",
        theoryLink: "Teorema 1 (Orden Radial Exacto)",
        tacticalApproach: "Ordena por hemisferio H(p) y producto cruz. Para comparar ángulos entre pares adyacentes sin perder precisión en long double, compara sign(u·v) y (u×v)² / (|u|²|v|²) en __int128."
      },
      {
        id: "m4-p3",
        name: "Runaway to a Shadow",
        platform: "CF",
        problemId: "CF 681E",
        tech: "geo",
        mins: 60,
        day: 7,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/681/E",
        theoryLink: "ES.pdf §7.2.3 (Círculos y Tangentes)",
        tacticalApproach: "Calcula el intervalo angular [θ - α, θ + α] que cubre cada círculo desde el origen (usando tangentes o ley de cosenos según si el círculo de alcance R = v·T corta o envuelve al círculo i) y haz unión de intervalos en [0, 2π]."
      },
      {
        id: "m4-p4",
        name: "Jungle Outpost",
        platform: "ICPC",
        problemId: "POJ 3525",
        tech: "geo",
        mins: 65,
        day: 8,
        starred: 1,
        url: "https://vjudge.net/problem/POJ-3525",
        theoryLink: "Teorema 2 + Pseudocódigo HPI",
        tacticalApproach: "Búsqueda binaria sobre el radio R (o sobre cuántos vértices eliminar) + verificación de factibilidad comprobando si la Intersección de Semiplanos (HPI) es no vacía."
      },
      {
        id: "m4-p5",
        name: "Polygon Kernel / Feng Shui",
        platform: "ICPC",
        problemId: "POJ 3335 / 1279",
        tech: "geo",
        mins: 55,
        day: 8,
        starred: 1,
        url: "https://vjudge.net/problem/POJ-1279",
        theoryLink: "Pseudocódigo HPI O(N log N)",
        tacticalApproach: "El núcleo (kernel) de un polígono desde donde se ve todo su interior es exactamente la intersección de los semiplanos definidos por todas sus aristas orientadas en sentido antihorario."
      },
      {
        id: "m4-p6",
        name: "Mogohu-Rea Idol (Minkowski)",
        platform: "CF",
        problemId: "CF 87E",
        tech: "geo",
        mins: 65,
        day: 8,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/87/E",
        theoryLink: "Teorema 3 (Suma de Minkowski)",
        tacticalApproach: "Un punto p = (a + b + c)/3 equivale a verificar si 3p pertenece a la Suma de Minkowski A ⊕ B ⊕ C. Construye P = A ⊕ B ⊕ C en O(N) y responde cada consulta en O(log N) por búsqueda binaria angular desde P[0]."
      }
    ]
  },
  {
    id: 5,
    code: "MÓDULO 5",
    daysLabel: "Días 9–10 · 2–3 Nov",
    dayNums: [9, 10],
    title: "Grafos Avanzados, Conectividad y Flujos de Red",
    shortTitle: "Grafos, 2-SAT & Flujos",
    tech: "flow",
    accent: "accent-green",
    color: "#43B36B",
    img: "/res/Graphs.jpg",
    gif: "/gifs/css-course-banner.gif",
    focus: "Árbol DFS (puentes y puntos de articulación), condensación de grafos dirigidos (SCC), 2-SAT, modelado táctico de Flujo Máximo / Corte Mínimo (Dinic), Matching Bipartito y MCMF.",
    coverageNote: "En redes unitarias (Bipartite Matching), Dinic corre en O(E √V) y nunca dará TLE hasta V, E ≤ 10^5.",
    readings: [
      {
        id: "m5-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§§4.2.8–4.2.9",
        topic: "Puntos de articulación, puentes y SCC mediante Tarjan",
        printPages: "pp. 154–162",
        pdfPages: "PDF 192–200",
        url: "/docs/ES.pdf#page=192",
        essential: true
      },
      {
        id: "m5-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "§§4.6.1–4.6.6 y §4.7.4",
        topic: "Flujo máximo, Corte mínimo, modelado y Grafo Bipartito (MVC / MIS)",
        printPages: "pp. 193–202 y 215–222",
        pdfPages: "PDF 231–240 y 253–260",
        url: "/docs/ES.pdf#page=231",
        essential: true
      },
      {
        id: "m5-r3",
        source: "ES.pdf",
        badge: "halim",
        section: "§9.1, §9.7, §9.12, §§9.23–9.24",
        topic: "2-SAT, Dinic, Hopcroft-Karp, Min-Cost Max-Flow y Cobertura de caminos en DAG",
        printPages: "pp. 394–395, 402–403, 412–413, 430–432",
        pdfPages: "PDF 432, 440, 450, 468–470",
        url: "/docs/ES.pdf#page=432",
        essential: true
      },
      {
        id: "m5-r4",
        source: "CPH.pdf",
        badge: "cph",
        section: "§§17.1–17.2 y §§20.1–20.4",
        topic: "Kosaraju, 2-SAT, Flujos, Cortes, Matchings y Disjoint Paths",
        printPages: "pp. 157–162 y 181–194",
        pdfPages: "PDF 167–172 y 191–204",
        url: "/docs/CPH.pdf#page=167",
        essential: true
      }
    ],
    analogies: [
      {
        title: "Negocios Rentables vs. Máquinas Costosas (Project Selection / Min-Cut)",
        icon: "🏭",
        body: "Imagina que puedes elegir varios negocios rentables (con ganancia +G_i), pero cada negocio exige comprar ciertas máquinas costosas (con costo -C_j). Una misma máquina sirve para varios negocios. Conectas la fuente S a cada negocio con capacidad G_i, cada máquina al sumidero T con capacidad C_j, y si el negocio i requiere la máquina j pones una tubería INDESTRUCTIBLE (capacidad ∞) de i a j. Cortar una tubería desde S significa 'renunciar a la ganancia G_i'. Cortar una tubería hacia T significa 'pagar el costo C_j de la máquina'. ¡El Corte Mínimo (= Flujo Máximo) encuentra automáticamente la menor pérdida posible!"
      }
    ],
    theorems: [
      {
        id: "m5-t1",
        title: "1. Diccionario Bipartito: Teorema de König y Teorema de Dilworth",
        explanation: "En todo grafo bipartito, el Minimum Vertex Cover (MVC) coincide con el Maximum Matching (MCBM). En un DAG, la cobertura mínima de caminos disjuntos en vértices se reduce a matching bipartito:",
        latex: String.raw`\text{MVC} = \text{MCBM}, \qquad \text{MIS} = |V| - \text{MCBM}, \qquad \text{Min Path Cover (DAG)} = N - \text{MCBM}(u_{\text{out}} \to v_{\text{in}})`,
        tacticalNote: "Para reconstruir el MVC tras correr Dinic desde S (izquierda) a T (derecha): haz DFS desde S en la red residual; el MVC lo forman los nodos izquierdos NO visitados y los nodos derechos SÍ visitados."
      },
      {
        id: "m5-t2",
        title: "2. Condición de Puente y Punto de Articulación (Tarjan DFS Tree)",
        explanation: "En el árbol DFS con tiempos de entrada tin[u] y menor tiempo alcanzable low[u] con a lo sumo una back-edge:",
        latex: String.raw`(u, v) \text{ es Puente} \iff \text{low}[v] > \text{tin}[u], \qquad u \text{ (no raíz) es Articulación} \iff \exists v \text{ hijo}: \text{low}[v] \ge \text{tin}[u]`,
        tacticalNote: "La raíz del DFS es punto de articulación si y solo si tiene ≥ 2 hijos independientes en el árbol DFS."
      }
    ],
    pseudocode: {
      title: "Plantilla de Modelado de Closure / Ganancia Máxima con Dependencias",
      complexity: "Tiempo: O(V² E) general · O(E √V) unitario con Dinic",
      lines: [
        { code: "FUNCION maxima_ganancia_con_dependencias(ganancias_proyectos, costos_maquinas, dependencias):", key: false },
        { code: "    Crear red de flujo con Fuente S y Sumidero T", key: false },
        { code: "    suma_ganancias_positivas = 0", key: false },
        { code: "", key: false },
        { code: "    PARA cada proyecto i con ganancia G_i > 0:", key: false },
        { code: "        suma_ganancias_positivas += G_i", key: true },
        { code: "        Agregar_Arista(S -> proyecto_i, capacidad = G_i)", key: true },
        { code: "", key: false },
        { code: "    PARA cada maquina j con costo C_j > 0:", key: false },
        { code: "        Agregar_Arista(maquina_j -> T, capacidad = C_j)", key: true },
        { code: "", key: false },
        { code: "    PARA cada par (proyecto_i requiere maquina_j) en dependencias:", key: false },
        { code: "        // Capacidad INFINITO impide que el corte mínimo rompa una dependencia lógica", key: false },
        { code: "        Agregar_Arista(proyecto_i -> maquina_j, capacidad = INFINITO)", key: true },
        { code: "", key: false },
        { code: "    perdida_minima = Flujo_Maximo_Dinic(S, T)", key: true },
        { code: "    RETORNAR suma_ganancias_positivas - perdida_minima", key: true }
      ]
    },
    checkpoint: {
      question: "En el modelado de Maximum Weight Closure (proyectos y máquinas), tras calcular el flujo máximo / corte mínimo (S, T), ¿cuáles proyectos y máquinas quedan finalmente SELECCIONADOS para ejecutarse?",
      options: [
        "Los nodos cuyas aristas fueron saturadas al 100% por el flujo máximo.",
        "Todos los nodos alcanzables desde la fuente S en el grafo residual (donde las aristas aún tienen capacidad residual > 0).",
        "Los nodos que tienen aristas directas hacia T con flujo cero."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Si un proyecto i sigue siendo alcanzable desde S en la red residual, significa que la arista (S → i) NO fue cortada (no renunciamos a su ganancia). Como las aristas de dependencia (i → j) tienen capacidad INFINITO, nunca pueden saturarse ni cortarse, obligando a que toda máquina j requerida también sea alcanzable desde S y por ende que su arista (j → T) SÍ haya sido cortada (pagamos la máquina)."
    },
    problems: [
      {
        id: "m5-p1",
        name: "Critical Links / Network",
        platform: "UVa",
        problemId: "UVa 796 / 315",
        tech: "graph",
        mins: 40,
        day: 9,
        starred: 1,
        url: "https://vjudge.net/problem/UVA-796",
        theoryLink: "Teorema 2 (Tarjan Puentes/Articulación)",
        tacticalApproach: "Implementación limpia de Tarjan para extraer puentes (low[v] > tin[u]) y puntos de articulación. Cuidado con grafos desconectados y aristas múltiples."
      },
      {
        id: "m5-p2",
        name: "Bertown Roads",
        platform: "CF",
        problemId: "CF 118E",
        tech: "graph",
        mins: 45,
        day: 9,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/118/E",
        theoryLink: "Árbol DFS + Puentes (ES.pdf §4.2.8)",
        tacticalApproach: "Por el Teorema de Robbins, un grafo conexo se puede orientar para ser fuertemente conexo si y solo si NO tiene puentes. Orienta las tree-edges hacia abajo en el árbol DFS y las back-edges hacia arriba."
      },
      {
        id: "m5-p3",
        name: "Giant Pizza (2-SAT)",
        platform: "CSES",
        problemId: "CSES 1684",
        tech: "scc",
        mins: 50,
        day: 9,
        starred: 1,
        url: "https://cses.fi/problemset/task/1684",
        theoryLink: "ES.pdf §9.1 + CPH §17.2 (2-SAT)",
        tacticalApproach: "Transforma cada cláusula (a ∨ b) en dos implicaciones (~a → b) y (~b → a). Corre Kosaraju o Tarjan SCC; es satisfacible si ningún literal x está en el mismo SCC que ~x. Asigna verdadero al que aparezca después en orden topológico."
      },
      {
        id: "m5-p4",
        name: "Software Allocation",
        platform: "UVa",
        problemId: "UVa 259",
        tech: "flow",
        mins: 40,
        day: 10,
        starred: 0,
        url: "https://vjudge.net/problem/UVA-259",
        theoryLink: "ES.pdf §4.6 (Flujo de Asignación)",
        tacticalApproach: "Modelado clásico de flujo máximo: Fuente → Aplicaciones (cap = usuarios), Aplicaciones → Computadoras válidas (cap = 1), Computadoras → Sumidero (cap = 1)."
      },
      {
        id: "m5-p5",
        name: "School Dance / Coin Grid",
        platform: "CSES",
        problemId: "CSES 1696 / 1709",
        tech: "flow",
        mins: 50,
        day: 10,
        starred: 1,
        url: "https://cses.fi/problemset/task/1709",
        theoryLink: "Teorema 1 (Teorema de König MVC)",
        tacticalApproach: "En Coin Grid (CSES 1709), las filas son el lado izquierdo y las columnas el derecho; cada moneda en (r, c) es una arista r → c. Piden el Minimum Vertex Cover y su reconstrucción exacta."
      },
      {
        id: "m5-p6",
        name: "Petya and Graph",
        platform: "CF",
        problemId: "CF 1082G",
        tech: "flow",
        mins: 55,
        day: 10,
        starred: 1,
        url: "https://codeforces.com/problemset/problem/1082/G",
        theoryLink: "Analogía + Pseudocódigo Closure",
        tacticalApproach: "Aplicación directa del pseudocódigo de Maximum Weight Closure: cada arista e es un 'proyecto' con ganancia w_e que requiere comprar sus dos extremos u y v ('máquinas' con costo a_u y a_v)."
      }
    ]
  },
  {
    id: 6,
    code: "MÓDULO 6",
    daysLabel: "Días 11–12 · 4–5 Nov",
    dayNums: [11, 12],
    title: "Range Queries (RQ), DSU con Rollback y Árboles",
    shortTitle: "Range Queries, DSU & Árboles",
    tech: "tree",
    accent: "accent-grape",
    color: "#7B5BDD",
    img: "/res/tree.png",
    gif: "/gifs/html-parralax-combined.gif",
    focus: "Segment Tree con Lazy Propagation, barrido offline con Fenwick/SegTree, DSU con Rollback (conectividad dinámica offline) y descomposición en árboles (LCA / Euler Tour / HLD).",
    coverageNote: "Para Lazy Propagation, la lectura con páginas verificadas es CPH.pdf §28.1. DSU con Rollback y HLD se estudian con el pseudocódigo de este bloque y CP-Algorithms.",
    readings: [
      {
        id: "m6-r1",
        source: "ES.pdf",
        badge: "halim",
        section: "§§2.4.2–2.4.4",
        topic: "Conjuntos disjuntos (DSU), Árbol de Segmentos y Árbol de Fenwick (BIT)",
        printPages: "pp. 61–75",
        pdfPages: "PDF 99–113",
        url: "/docs/ES.pdf#page=99",
        essential: true
      },
      {
        id: "m6-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "§9.18",
        topic: "Ancestro Común Mínimo (LCA) mediante recorrido Euleriano y RMQ",
        printPages: "pp. 419–421",
        pdfPages: "PDF 457–459",
        url: "/docs/ES.pdf#page=457",
        essential: true
      },
      {
        id: "m6-r3",
        source: "CPH.pdf",
        badge: "cph",
        section: "§§9.2–9.3 y §28.1",
        topic: "Binary Indexed Tree, Segment Tree y Lazy Propagation",
        printPages: "pp. 86–92 y 258–260",
        pdfPages: "PDF 96–102 y 268–270",
        url: "/docs/CPH.pdf#page=268",
        essential: true
      },
      {
        id: "m6-r4",
        source: "CPH.pdf",
        badge: "cph",
        section: "§§18.1–18.4",
        topic: "Ancestros con Binary Lifting, Subárboles (Euler Tour), Caminos y LCA",
        printPages: "pp. 163–172",
        pdfPages: "PDF 173–182",
        url: "/docs/CPH.pdf#page=173",
        essential: true
      },
      {
        id: "m6-r5",
        source: "CP-Algorithms",
        badge: "web",
        section: "Data Structures & Trees",
        topic: "Deleting from a Data Structure in O(T(n) log n) (DSU Rollback) & HLD",
        printPages: "Web",
        pdfPages: "Sin paginación",
        url: "https://cp-algorithms.com/data_structures/deleting_in_log_n.html",
        essential: true
      }
    ],
    analogies: [
      {
        title: "El Libro de Historia (Barrido Offline con Fenwick Tree)",
        icon: "📖",
        body: "Imagina que te hacen 200,000 preguntas sobre un libro de historia: '¿Cuántos personajes distintos aparecen entre la página L y la página R?'. En lugar de releer de L a R para cada pregunta, ordenas todas las preguntas por su página final R y vas leyendo el libro una sola vez de la página 1 a la última, manteniendo en tu Fenwick Tree únicamente la aparición más reciente de cada personaje."
      },
      {
        title: "Pintura con Ctrl+Z (DSU con Rollback y Árbol del Tiempo)",
        icon: "⏪",
        body: "En un DSU normal con compresión de caminos, unir dos grupos es como mezclar pintura roja y azul: altera decenas de punteros y es imposible deshacerlo en O(1). Pero si SOLO usas unión por tamaño (que por sí sola garantiza altura ≤ log₂ N), cada unión modifica un único puntero padre[raiz_v] y un tamaño. Anotas ese cambio en una pila (stack) y puedes presionar 'Ctrl+Z' (rollback) en O(1) exacto al salir de una rama del Segment Tree sobre el tiempo."
      }
    ],
    theorems: [
      {
        id: "m6-t1",
        title: "1. Invariante de Lazy Propagation (Composición de Operaciones Afines)",
        explanation: "Si un nodo representa el intervalo [L, R] y soporta la operación x ↦ a·x + b (que generaliza asignación a=0 y suma a=1), al empujar un nuevo tag (a_new, b_new) sobre un nodo que ya tenía (a_old, b_old):",
        latex: String.raw`a_{\text{combinado}} = a_{\text{new}} \cdot a_{\text{old}}, \qquad b_{\text{combinado}} = a_{\text{new}} \cdot b_{\text{old}} + b_{\text{new}}`,
        tacticalNote: "Y la suma del intervalo de longitud len = R - L + 1 se actualiza en O(1) como: sum = a_new · sum + b_new · len."
      },
      {
        id: "m6-t2",
        title: "2. Distancia y Punto de Encuentro Central en Árboles con LCA",
        explanation: "La distancia entre u y v y el único nodo central que pertenece simultáneamente a los caminos entre tres nodos a, b, c están dados por:",
        latex: String.raw`\text{dist}(u, v) = \text{depth}[u] + \text{depth}[v] - 2\,\text{depth}[\text{LCA}(u, v)], \qquad \text{Centro}(a,b,c) = \text{LCA}(a,b) \oplus \text{LCA}(b,c) \oplus \text{LCA}(a,c)`,
        tacticalNote: "Porque de los tres LCAs por pares, al menos dos son idénticos (el más alto) y se cancelan con XOR, dejando exactamente el LCA más profundo."
      }
    ],
    pseudocode: {
      title: "DSU con Rollback para Conectividad Dinámica Offline",
      complexity: "find/unir: O(log N) · rollback: O(1) · Con SegTree del Tiempo: O(Q log Q log N)",
      lines: [
        { code: "ESTRUCTURA DSU_Rollback:", key: false },
        { code: "    padre[1..N], tamano[1..N], pila_historial = Pila vacía, componentes = N", key: false },
        { code: "", key: false },
        { code: "    FUNCION encontrar_raiz(u):", key: false },
        { code: "        // ¡PROHIBIDO usar compresión de caminos aquí! Solo subir por punteros", key: true },
        { code: "        MIENTRAS u != padre[u]: u = padre[u]", key: true },
        { code: "        RETORNAR u", key: false },
        { code: "", key: false },
        { code: "    FUNCION unir(u, v):", key: false },
        { code: "        raiz_u = encontrar_raiz(u); raiz_v = encontrar_raiz(v)", key: false },
        { code: "        SI raiz_u == raiz_v:", key: false },
        { code: "            pila_historial.apilar(NINGUN_CAMBIO); RETORNAR FALSO", key: true },
        { code: "        SI tamano[raiz_u] < tamano[raiz_v]: INTERCAMBIAR(raiz_u, raiz_v)", key: true },
        { code: "        pila_historial.apilar( (raiz_v, raiz_u, tamano[raiz_u]) )", key: true },
        { code: "        padre[raiz_v] = raiz_u; tamano[raiz_u] += tamano[raiz_v]; componentes -= 1", key: true },
        { code: "        RETORNAR VERDADERO", key: false },
        { code: "", key: false },
        { code: "    FUNCION deshacer_ultimo_cambio(): // Ctrl + Z en O(1)", key: false },
        { code: "        registro = pila_historial.desapilar()", key: false },
        { code: "        SI registro != NINGUN_CAMBIO:", key: false },
        { code: "            (hijo, padre_antiguo, tamano_antiguo) = registro", key: false },
        { code: "            padre[hijo] = hijo; tamano[padre_antiguo] = tamano_antiguo; componentes += 1", key: true }
      ]
    },
    checkpoint: {
      question: "Cuando usamos DSU con Rollback dentro de un DFS sobre el Segment Tree del tiempo (Dynamic Connectivity), cada arista viva en el intervalo de tiempo [L, R] se inserta en O(log Q) nodos del Segment Tree. ¿Cómo deshacemos las uniones al salir de un nodo del Segment Tree?",
      options: [
        "Reiniciamos todo el DSU desde cero al llegar a cada hoja del Segment Tree.",
        "Guardamos tamano_pila_inicial = pila_historial.size() al entrar al nodo del Segment Tree, y al salir de sus dos hijos llamamos a deshacer_ultimo_cambio() mientras pila_historial.size() > tamano_pila_inicial.",
        "Eliminamos la arista buscando el nodo en el árbol y reconectando sus hijos."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Guardar el snapshot del tamaño de la pila al entrar al nodo del Segment Tree (o apilar NINGUN_CAMBIO por cada intento de unión y desapilar exactamente la cantidad de aristas en ese nodo) restaura el estado del DSU al instante exacto previo a entrar a ese subárbol en O(1) por operación."
    },
    problems: [
      {
        id: "m6-p1",
        name: "Potentiometers",
        platform: "UVa",
        problemId: "UVa 12086",
        tech: "rq",
        mins: 25,
        day: 11,
        starred: 0,
        url: "https://vjudge.net/problem/UVA-12086",
        theoryLink: "ES.pdf §2.4.4 (Fenwick Tree)",
        tacticalApproach: "Calentamiento de velocidad con Fenwick Tree (BIT) para sumas dinámicas en punto y rango."
      },
      {
        id: "m6-p2",
        name: "Ahoy, Pirates!",
        platform: "UVa",
        problemId: "UVa 11402",
        tech: "rq",
        mins: 55,
        day: 11,
        starred: 1,
        url: "https://vjudge.net/problem/UVA-11402",
        theoryLink: "ES.pdf §2.4.3 + CPH §28.1",
        tacticalApproach: "El problema jefe de Lazy Propagation de Halim: soporta asignar 0, asignar 1 e invertir (flip). Al componer un flip sobre un nodo que ya tenía asignar 0/1, simplemente invierte el tag de asignación; si tenía flip, se cancelan."
      },
      {
        id: "m6-p3",
        name: "Distinct Values Queries",
        platform: "CSES",
        problemId: "CSES 1734",
        tech: "rq",
        mins: 40,
        day: 11,
        starred: 1,
        url: "https://cses.fi/problemset/task/1734",
        theoryLink: "Analogía 1 (Barrido Offline)",
        tacticalApproach: "Ordena las queries por su extremo derecho R. Avanza r de 1 a N; si el valor a[r] ya había aparecido en prevPos, resta 1 en prevPos y suma 1 en r en tu Fenwick Tree."
      },
      {
        id: "m6-p4",
        name: "Range Updates and Sums",
        platform: "CSES",
        problemId: "CSES 1735",
        tech: "rq",
        mins: 45,
        day: 11,
        starred: 1,
        url: "https://cses.fi/problemset/task/1735",
        theoryLink: "Teorema 1 (Composición Afín Lazy)",
        tacticalApproach: "Aplica directamente el Teorema 1: representa tanto 'asignar x' (como multiplicar por 0 y sumar x) como 'sumar x' (multiplicar por 1 y sumar x) con un único par (a, b) por nodo."
      },
      {
        id: "m6-p5",
        name: "Dynamic Connectivity",
        platform: "CSES",
        problemId: "CSES 2133",
        tech: "dsu",
        mins: 65,
        day: 12,
        starred: 1,
        url: "https://cses.fi/problemset/task/2133",
        theoryLink: "Analogía 2 + Pseudocódigo DSU Rollback",
        tacticalApproach: "Cada arista existe en uno o varios intervalos de tiempo [t_inicio, t_fin]. Insértalos en un Segment Tree sobre el tiempo [0..K] y haz un único DFS sobre el Segment Tree manteniendo el DSU con Rollback."
      },
      {
        id: "m6-p6",
        name: "Cow Land",
        platform: "USACO",
        problemId: "USACO Gold 921",
        tech: "tree",
        mins: 60,
        day: 12,
        starred: 1,
        url: "https://usaco.org/index.php?page=viewproblem2&cpid=921",
        theoryLink: "Teorema 2 (LCA) + CPH §18.2 (Euler Tour)",
        tacticalApproach: "Como XOR es invertible, el XOR del camino u–v es prefXor(u) ^ prefXor(v) ^ val[LCA(u,v)]. Con Euler Tour (tin[u], tout[u]) y un Fenwick Tree, actualizar un nodo u equivale a hacer XOR en tin[u] y en tout[u]+1."
      }
    ]
  },
  {
    id: 7,
    code: "DÍA 13 · FINAL",
    daysLabel: "Día 13 · 6 Nov",
    dayNums: [13],
    title: "Simulacro General, Repaso de Notebook y Descanso Mental",
    shortTitle: "Simulacro & Notebook",
    tech: "contest",
    accent: "accent-coral",
    color: "#E66591",
    img: "/res/Implementation.jpg",
    gif: "/gifs/github-copilots.gif",
    focus: "Revisión de casos borde (overflow, EPS en geometría, grafos desconectados, N=1), repaso rápido de plantillas del notebook y descanso temprano antes del Día D (7 de noviembre).",
    coverageNote: "El Día 13 es de consolidación táctica y frescura mental: nada de aprender algoritmos nuevos a medianoche.",
    readings: [
      {
        id: "m7-r1",
        source: "setup_cp.md",
        badge: "halim",
        section: "Protocolo de Competencia",
        topic: "Flags de compilación (-O2 -Wall -Wextra), plantilla de Stress Test (gen/sol/brute) y debug.h",
        printPages: "Guía Local",
        pdfPages: "docs/setup_cp.md",
        url: "#notebook-checklist",
        essential: true
      },
      {
        id: "m7-r2",
        source: "ES.pdf",
        badge: "halim",
        section: "Cap. 1 y Cap. 9",
        topic: "Repaso visual rápido de complejidades máximas según N y catálogo del Capítulo 9",
        printPages: "pp. 16–20",
        pdfPages: "PDF 54–58",
        url: "/docs/ES.pdf#page=54",
        essential: true
      }
    ],
    analogies: [
      {
        title: "El Pit-Stop antes de la Carrera (Taper & Precisión)",
        icon: "🏁",
        body: "Un piloto de Fórmula 1 no desarma el motor una hora antes de la largada: revisa la presión de los neumáticos, repasa las curvas críticas con su ingeniero de pista y duerme temprano. Hoy tu único trabajo es blindar tus casos borde y saber en qué página exacta de tu notebook está cada plantilla."
      }
    ],
    theorems: [
      {
        id: "m7-t1",
        title: "1. Checklist Anti-WA / Anti-TLE de Último Minuto",
        explanation: "Antes de enviar cualquier solución el 7 de noviembre, verifica estas 4 invariantes:",
        latex: String.raw`\text{1) Overflow: } 10^9 \times 10^9 \to \texttt{long long / \_\_int128}, \quad \text{2) Multi-test: limpiar } \texttt{adj[1..n]} \text{ sin } \texttt{memset} \text{ global}`,
        tacticalNote: "3) Casos borde N=1, K=0, grafos desconectados o árboles estrella/línea. 4) En Geometría: usar comparador entero en producto cruz siempre que las coordenadas sean enteras."
      }
    ],
    pseudocode: {
      title: "Protocolo de Stress Testing en Competencia (5 minutos que salvan un AC)",
      complexity: "Encuentra el contraejemplo mínimo automáticamente",
      lines: [
        { code: "// 1. Escribir brute.cpp (fuerza bruta O(2^N) o O(N^3) para N <= 8)", key: false },
        { code: "// 2. Escribir gen.cpp con mt19937 rng(atoi(argv[1])) y N pequeño (N = 5)", key: true },
        { code: "PARA seed desde 1 hasta 1000:", key: false },
        { code: "    ./gen seed > in.txt", key: true },
        { code: "    ./sol < in.txt > out_sol.txt", key: false },
        { code: "    ./brute < in.txt > out_brute.txt", key: false },
        { code: "    SI diff(out_sol.txt, out_brute.txt) != VACIO:", key: true },
        { code: "        IMPRIMIR 'Contraejemplo encontrado en in.txt!' y DETENER", key: true }
      ]
    },
    checkpoint: {
      question: "En un problema con múltiples casos de prueba donde ∑ N ≤ 2·10^5 y T ≤ 10^4, ¿qué error clásico convierte una solución O(N) en un TLE de O(T · MAXN)?",
      options: [
        "Usar '\\n' en lugar de std::endl.",
        "Hacer memset(vis, 0, sizeof(vis)) o limpiar todo el arreglo de tamaño MAXN = 200005 en cada caso en vez de limpiar solo con un for de 1 a n.",
        "Pasar vectores por referencia constante const vector<int>&."
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Si T = 10^4 y haces memset sobre MAXN = 2·10^5 en cada caso, harás 2·10^9 operaciones y tendrás TLE garantizado. Limpia siempre únicamente los índices 0..n usados en el caso actual."
    },
    problems: [
      {
        id: "m7-p1",
        name: "Checklist de Plantillas del Notebook (Dinic, HPI, SOS DP, Lazy SegTree, DSU Rollback)",
        platform: "Equipo",
        problemId: "Notebook Check",
        tech: "contest",
        mins: 45,
        day: 13,
        starred: 1,
        url: "#notebook",
        theoryLink: "Módulos 1 al 6",
        tacticalApproach: "Verifica que ubicas en menos de 15 segundos cada plantilla en tu notebook: 1) Combinatoria & nCr O(1), 2) Gauss-Jordan, 3) SOS DP 1D, 4) Orden Radial + HPI + Minkowski, 5) Dinic + Tarjan + 2-SAT, 6) Lazy SegTree + DSU Rollback + LCA."
      },
      {
        id: "m7-p2",
        name: "Warm-up de Precisión y Stress-Test Setup",
        platform: "Equipo",
        problemId: "Simulacro Corto",
        tech: "contest",
        mins: 60,
        day: 13,
        starred: 1,
        url: "https://codeforces.com/gyms",
        theoryLink: "setup_cp.md",
        tacticalApproach: "Haz una prueba rápida de 1 hora en equipo para calibrar lectura cruzada de enunciados, uso de impresora/notebook y script de stress test. Después: descanso total."
      }
    ]
  }
];

export const DAILY_SCHEDULE = [
  { day: 1, date: "25 Oct", label: "Día 1 · Dom 25 Oct", moduleId: 1, focus: "Teoría Módulo 1 (Lecturas Halim §3.5, §5.4, CPH §22.3) + Primer Obstáculo Canónico + Primeros 3 problemas (UVa 10943, Grid 2, Permutation)." },
  { day: 2, date: "26 Oct", label: "Día 2 · Lun 26 Oct", moduleId: 1, focus: "Inversión de Estados & Broken Profile (Lectura Halim §§8.3.5–8.3.6) + Cerrar Módulo 1 (Tiling Dominoes, Marbles, Cow Poetry)." },
  { day: 3, date: "27 Oct", label: "Día 3 · Mar 27 Oct", moduleId: 2, focus: "Teoría Módulo 2 (Push vs Pull DP, Auto-lazos, Verificación de Sushi) + Coins, Sushi (AtCoder DP J), Dice Throwing y Bad Luck Island." },
  { day: 4, date: "28 Oct", label: "Día 4 · Mié 28 Oct", moduleId: 2, focus: "Linealidad del Valor Esperado & Eliminación Gaussiana (Halim §9.9, CPH §24.3) + Bag of Mice, Little Pony, Wet Shark y Journey." },
  { day: 5, date: "29 Oct", label: "Día 5 · Jue 29 Oct", moduleId: 3, focus: "Teoría Módulo 3 (Bitmask DP O(N 2^N) e Iteración de Submáscaras O(3^N)) + Forming Quiz Teams, Matching y Grouping." },
  { day: 6, date: "30 Oct", label: "Día 6 · Vie 30 Oct", moduleId: 3, focus: "Dominio de SOS DP en 1D In-Place (O(N 2^N)) + Compatible Numbers (CF 165E), Vowels (CF 383E) y Guard Mark." },
  { day: 7, date: "31 Oct", label: "Día 7 · Sáb 31 Oct", moduleId: 4, focus: "Teoría Módulo 4 (Ordenamiento Radial Exacto por Hemisferios sin atan2 y Círculos) + Hotter Colder, Nearest Vectors y Runaway to a Shadow." },
  { day: 8, date: "1 Nov", label: "Día 8 · Dom 1 Nov", moduleId: 4, focus: "Intersección de Semiplanos HPI en O(N log N) y Suma de Minkowski + Jungle Outpost, Polygon Kernel y Mogohu-Rea Idol (CF 87E)." },
  { day: 9, date: "2 Nov", label: "Día 9 · Lun 2 Nov", moduleId: 5, focus: "Teoría Módulo 5 Parte A (Árbol DFS de Tarjan: Puentes, Articulación, SCC y 2-SAT) + Critical Links, Bertown Roads y Giant Pizza." },
  { day: 10, date: "3 Nov", label: "Día 10 · Mar 3 Nov", moduleId: 5, focus: "Teoría Módulo 5 Parte B (Dinic, Teorema de König MVC/MIS y Project Selection / Closure) + Software Allocation, Coin Grid y Petya and Graph." },
  { day: 11, date: "4 Nov", label: "Día 11 · Mié 4 Nov", moduleId: 6, focus: "Teoría Módulo 6 Parte A (Fenwick Barrido Offline y Lazy Propagation Afín) + Potentiometers, Ahoy Pirates!, Distinct Values y Range Updates." },
  { day: 12, date: "5 Nov", label: "Día 12 · Jue 5 Nov", moduleId: 6, focus: "Teoría Módulo 6 Parte B (DSU con Rollback en Árbol del Tiempo, LCA y Euler Tour) + Dynamic Connectivity (CSES 2133) y Cow Land." },
  { day: 13, date: "6 Nov", label: "Día 13 · Vie 6 Nov", moduleId: 7, focus: "Simulacro Corto, Repaso de Plantillas del Notebook, Checklist Anti-WA/TLE y Descanso Mental Temprano rumbo al 7 de Noviembre." }
];
