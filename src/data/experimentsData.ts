import { ExperimentMetadata } from '../types';

export const EXPERIMENT_GROUPS = [
  {
    id: 'language-virus',
    title: 'A Linguagem é um Vírus',
    subtitle: 'Parasitologia Semiótica, Cut-Up & Ruptura de Linhas de Comando',
    quote: '"A palavra escrita foi literalmente um vírus que tornou a palavra falada possível."',
    author: 'William S. Burroughs & Brion Gysin (1959-1970)',
    description: 'Experimentos de desconstrução da sintaxe linear e quebra do loop de feedback do controle midiático e psicológico através de cortes de tesoura, dobraduras temporais e injeção de ruído.'
  },
  {
    id: 'feedback-servos',
    title: 'Feedback & Servomecanismos',
    subtitle: 'A Teleologia Mecânica e o Tiro Antiaéreo de Wiener',
    quote: '"O comportamento teleológico nada mais é do que um comportamento controlado por um loop de feedback negativo."',
    author: 'Norbert Wiener & Arturo Rosenblueth (1943)',
    description: 'Simulações interativas dos circuitos de mira preditiva e amortecimento de erro que transformaram o propósito em um cálculo eletromecânico.'
  },
  {
    id: 'ashby-homeostat',
    title: 'O Homeostato de Ashby',
    subtitle: 'Ultrastabilidade e a Adaptação Cega de Sistemas Complexos',
    quote: '"O Homeostato não precisa de inteligência: precisa apenas de comutadores aleatórios para anular a perturbação externa."',
    author: 'W. Ross Ashby (1948)',
    description: 'Simulação da célebre máquina de Ashby composta por nós acoplados que buscam equilíbrio dinâmico quando perturbados por choques e variações.'
  },
  {
    id: 'entropy-information',
    title: 'Entropia vs. Negentropia',
    subtitle: 'Claude Shannon, o Canal com Ruído e a Morte Térmica',
    quote: '"Informação é a redução da incerteza contra a dissolução entrópica do universo."',
    author: 'Claude Shannon & Warren Weaver (1949)',
    description: 'Experimentos de transmissão de código, injeção de ruído estocástico gaussiano e a compensação matemática por redundância de bits.'
  },
  {
    id: 'second-order',
    title: 'Cibernética de 2ª Ordem & O Observador',
    subtitle: 'O Ponto Cego Cognitivo e o Fechamento Autopoiético',
    quote: '"Nós não vemos que não vemos."',
    author: 'Heinz von Foerster, Humberto Maturana & Francisco Varela (1974)',
    description: 'Testes de reflexividade perceptiva onde o observador é forçado a confrontar seu próprio ponto cego e o fechamento recursivo da cognição.'
  }
];

export const EXPERIMENTS_LIST: ExperimentMetadata[] = [
  {
    id: 'exp-inoculation-cutup',
    groupId: 'language-virus',
    groupTitle: 'A Linguagem é um Vírus',
    title: 'Câmara de Inoculação & Tesoura Cut-Up',
    subtitle: 'Injeção viral de comando e retalhamento em 4 quadrantes clássicos',
    authorReference: 'Burroughs & Gysin (Beat Hotel, 1959)',
    epistemology: 'Ruptura da sintaxe linear de causa e efeito',
    iconName: 'Scissors'
  },
  {
    id: 'exp-fold-in',
    groupId: 'language-virus',
    groupTitle: 'A Linguagem é um Vírus',
    title: 'Dobra Temporal (Fold-In Method)',
    subtitle: 'Costura estocástica de fita contemporânea com poesia alucinatória',
    authorReference: 'Burroughs, Nova Express (1964)',
    epistemology: 'Vazamento do futuro através de colisões semióticas',
    iconName: 'Layers'
  },
  {
    id: 'exp-command-scramble',
    groupId: 'language-virus',
    groupTitle: 'A Linguagem é um Vírus',
    title: 'Extirpação de Palavras de Comando',
    subtitle: 'Identificação e scrambler de imperativos de conformidade e controle',
    authorReference: 'Burroughs, The Electronic Revolution (1970)',
    epistemology: 'Desativação do loop de obediência subvocal',
    iconName: 'Biohazard'
  },
  {
    id: 'exp-wiener-anti-aircraft',
    groupId: 'feedback-servos',
    groupTitle: 'Feedback & Servomecanismos',
    title: 'Preditor Antiaéreo de Wiener',
    subtitle: 'Rastreamento balístico de alvo e cálculo em tempo real do desvio de rota',
    authorReference: 'Norbert Wiener (MIT, 1942)',
    epistemology: 'Teleologia matemática e anulação de erro por servomotor',
    iconName: 'Crosshair'
  },
  {
    id: 'exp-positive-vs-negative-feedback',
    groupId: 'feedback-servos',
    groupTitle: 'Feedback & Servomecanismos',
    title: 'Feedback Positivo (Avalanche) vs. Negativo (Homeostático)',
    subtitle: 'Comparação de amortecimento de choque versus catástrofe explosiva',
    authorReference: 'Macy Conferences (1946–1953)',
    epistemology: 'Estabilidade dinâmica vs colapso de fase em sistemas acoplados',
    iconName: 'RefreshCw'
  },
  {
    id: 'exp-ashby-homeostat-sim',
    groupId: 'ashby-homeostat',
    groupTitle: 'O Homeostato de Ashby',
    title: 'Simulador do Homeostato (4 Nós Acoplados)',
    subtitle: 'Agulhas magnéticas e potenciômetros aleatórios buscando estabilidade cega',
    authorReference: 'W. Ross Ashby, Design for a Brain (1952)',
    epistemology: 'Ultrastabilidade sem programa central ou consciência',
    iconName: 'Activity'
  },
  {
    id: 'exp-shannon-noisy-channel',
    groupId: 'entropy-information',
    groupTitle: 'Entropia vs. Negentropia',
    title: 'O Canal de Comunicação com Ruído',
    subtitle: 'Degradação de sinal por ruído gaussiano e restauração por redundância',
    authorReference: 'Claude Shannon (Bell Labs, 1948)',
    epistemology: 'Informação como entropia negativa (Negentropia)',
    iconName: 'Radio'
  },
  {
    id: 'exp-observer-blind-spot',
    groupId: 'second-order',
    groupTitle: 'Cibernética de 2ª Ordem',
    title: 'O Teste do Ponto Cego do Observador',
    subtitle: 'Demonstração empírica de fechamento cognitivo: não vemos que não vemos',
    authorReference: 'Heinz von Foerster (1974) & Humberto Maturana (1980)',
    epistemology: 'O observador incluído recursivamente no sistema',
    iconName: 'Eye'
  }
];
