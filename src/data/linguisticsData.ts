export interface LinguisticFigure {
  name: string;
  period: string;
  framework: string;
  concept: string;
  cyberneticConnection: string;
  burroughsCritique: string;
}

export const LINGUISTIC_GENEALOGY: LinguisticFigure[] = [
  {
    name: 'Ferdinand de Saussure',
    period: '1916 (Curso de Linguística Geral)',
    framework: 'Linguística Estrutural & Semiologia',
    concept: 'O signo linguístico é diádico: Significante (imagem acústica/forma gráfica) e Significado (conceito mental). A língua é um sistema abstrato de diferenças puras e valores relativos, sem vínculo natural com as coisas materiais.',
    cyberneticConnection: 'Ao separar o sistema simbólico da realidade material, Saussure abriu caminho para tratar a linguagem como um código fechado formal, preparando o terreno para a cibernética ver o mundo como pura troca de símbolos.',
    burroughsCritique: 'Burroughs denuncia a armadilha do signo: a palavra "cão" não morde, mas a palavra impressa no cérebro comanda reflexos nervosos reais. O signo não é arbitrário e inocente; é a cápsula biológica através da qual o vírus da linguagem injeta sua ordem no hospedeiro.'
  },
  {
    name: 'Roman Jakobson',
    period: '1956 (Fundamentos da Linguagem)',
    framework: 'Linguística Funcional & Teoria da Comunicação',
    concept: 'A linguagem opera no esquema exato da Teoria da Informação: Emissor → Mensagem (via Código compartilhado através de Canal) → Receptor. A estrutura repousa sobre dois eixos: Seleção (Paradigma) e Combinação (Sintaxe).',
    cyberneticConnection: 'Jakobson participou ativamente dos debates cibernéticos nos anos 50. Ele aplicou diretamente o modelo de Claude Shannon e Norbert Wiener à análise poética e linguística, reduzindo a fala a um fluxo codificado que busca eliminar o ruído.',
    burroughsCritique: 'Jakobson acredita que a linguagem é um instrumento neutro de comunicação humana. Burroughs inverte: o "Canal" é o Estúdio da Realidade e a "Mensagem" é a fita pré-gravada do Controle social. Ao cortar os eixos de seleção e combinação com a tesoura Cut-Up, o receptor destrói o monopólio do emissor.'
  },
  {
    name: 'Noam Chomsky',
    period: '1957 (Estruturas Sintáticas)',
    framework: 'Gramática Gerativa & Teoria dos Autômatos',
    concept: 'A linguagem humana é regida por uma Gramática Universal inata ancorada biologicamente no cérebro. A mente opera como um autômato computacional que gera infinitas frases lógicas a partir de regras formais recursivas e árvores sintáticas.',
    cyberneticConnection: 'Chomsky formalizou a sintaxe humana no mesmo molde dos compiladores de linguagens de programação e máquinas de Turing. A cognição humana é expressa como um processador de sintaxe cibernético algorítmico.',
    burroughsCritique: 'Chomsky vê a gramática inata como um dom biológico nobre da espécie humana. Burroughs concorda com a base biológica, mas com sinal inverso: o aparato gramatical inato é a cicatriz da infecção viral! A sintaxe linear (Sujeito → Verbo → Objeto) é o algoritmo de escravização que impede o ser humano de experienciar o tempo não-linear.'
  },
  {
    name: 'Gregory Bateson & Paul Watzlawick',
    period: '1967-1972 (Pragmática da Comunicação Humana)',
    framework: 'Cibernética de Sistemas & Teoria da Comunicação',
    concept: '"É impossível não se comunicar". Toda mensagem possui dois níveis: Conteúdo (dados) e Relação (comando). A linguagem é um vetor de feedback comportamental em loops relacionais contínuos (Double Bind).',
    cyberneticConnection: 'A comunicação deixa de ser mera transmissão de vocábulos e passa a ser reconhecida como o mecanismo pelo qual sistemas sociais ajustam, punem e estabilizam comportamentos homeostáticos.',
    burroughsCritique: 'Burroughs identifica no "nível de comando" o mecanismo exato do Junk e do controle estatal: ordens silenciosas pré-programadas em jornais e emissoras que mantêm a população em estado de hipnose e obediência automática.'
  }
];

export interface RecapitulationStep {
  number: string;
  title: string;
  question: string;
  coreSynthesis: string;
  cyberneticFormula: string;
  burroughsCounterAction: string;
}

export const RECAPITULATIONS: RecapitulationStep[] = [
  {
    number: '01',
    title: 'A LINGUÍSTICA COMO ENGENHARIA DE COMANDO',
    question: 'Aonde a Linguística entra no mapa cibernético?',
    coreSynthesis: 'A linguística entra no momento em que Saussure, Jakobson e Chomsky formalizam a linguagem não como sopro místico ou livre expressão, mas como um CÓDIGO FECHADO, UMA MÁQUINA SINTÁTICA E UM CANAL DE TRANSMISSÃO. A cibernética absorve a linguística porque para controlar um animal ou uma máquina é necessário comunicar-se através de um protocolo formal sem ruído.',
    cyberneticFormula: 'Linguagem = Código(Sinal) - Ruído = Vetor de Telecomando',
    burroughsCounterAction: 'Recusa da neutralidade: a linguagem é o software com o qual o poder nos programa.'
  },
  {
    number: '02',
    title: 'A NATUREZA DO PARASITA',
    question: 'Afinal, onde fica Burroughs em relação aos linguistas?',
    coreSynthesis: 'Burroughs NÃO é um linguista de gabinete: é um cirurgião de guerrilha semiótica. Enquanto os linguistas acreditam que o homem inventou a palavra para expressar pensamentos, Burroughs postula a virada radical: A PALAVRA É UM ORGANISMO BIOLÓGICO ALIENÍGENA EXÓGENO. Ela colonizou o sistema nervoso central do primata e vive em simbiose predatória com a mente humana.',
    cyberneticFormula: 'Hospedeiro Humano + Vírus da Linguagem = Máquina Macia (Soft Machine) Programável',
    burroughsCounterAction: 'Identificar a subvocalização constante (conversa interna) como o eco do parasita se replicando.'
  },
  {
    number: '03',
    title: 'A COLEIRA DA SINTAXE LINEAR',
    question: 'Por que a estrutura gramatical é o instrumento do Controle?',
    coreSynthesis: 'A sintaxe linear [Sujeito + Verbo de Ação + Predicado] aprisiona a consciência em três dogmas: (1) O Ego Rígido ("Eu sou isso"); (2) A Causalidade Mecânica ("Isso causa aquilo, portanto obedeça"); (3) O Tempo Pré-Gravado ("Passado dita o presente"). Quem controla a sintaxe determina o limite do que é pensável.',
    cyberneticFormula: 'Sintaxe Linear = Tempo Falso (Pre-Sent) = Submissão Inevitável à Ordem',
    burroughsCounterAction: 'Interromper a fala interior forçando a mente a experimentar o silêncio através da escrita fragmentada.'
  },
  {
    number: '04',
    title: 'A TESOURA CUT-UP COMO DISJUNTOR ENTRÓPICO',
    question: 'Como a guerrilha semiótica sabota o circuito cibernético?',
    coreSynthesis: 'Para Wiener e Shannon, o ruído é o inimigo que destrói a mensagem. Burroughs descobre a inversão genial: SE A MENSAGEM É A PRISÃO, O RUÍDO É A LIBERDADE! Ao cortar o papel em quatro pedaços e recombiná-los aleatoriamente com a Tesoura de Brion Gysin, a ordem linear desmorona, a fita mestra do estúdio quebra e o futuro não programado começa a vazar.',
    cyberneticFormula: 'Tesoura Cut-Up = Injeção Maciça de Ruído Entrópico = Colapso do Loop de Feedback do Controle',
    burroughsCounterAction: '"Quando você corta as linhas de palavras, o futuro vaza e os mestres do estúdio perdem o controle."'
  }
];
