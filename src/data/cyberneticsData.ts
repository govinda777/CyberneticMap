import { CyberneticPillar } from '../types';

export const CYBERNETICS_PILLARS: CyberneticPillar[] = [
  {
    id: 'feedback',
    title: '01. FEEDBACK (RETROALIMENTAÇÃO)',
    subtitle: 'O Loop Teleológico de Correção de Rota',
    formula: 'Erro(t) = Alvo(t) - Saída_Medida(t)',
    historicalContext: 'Macy Conferences (1946) & Tiro Antiaéreo de Wiener (1942)',
    desc: 'O comportamento do sistema é determinado pelos resultados de suas próprias ações passadas. O sistema subtrai continuamente o sinal de saída do sinal de referência (alvo desejado) e aplica um torque corretivo aos seus atuadores para anular o desvio.',
    implication: 'Destruição da metafísica do livre-arbítrio: a teleologia (propósito) deixa de ser um mistério da alma e passa a ser explicada por uma subtração mecânica de erro executada por servomotores.',
    simulationHint: 'Perturbe o sistema no simulador abaixo para observar o servomecanismo calcular a derivada de erro e reconduzir a trajetória ao ponto de ancoragem programado.'
  },
  {
    id: 'homeostasis',
    title: '02. HOMEOSTASE & ULTRAESTABILIDADE',
    subtitle: 'Manutenção Compulsiva de Constantes Internas',
    formula: 'lim(t→∞) [d(Variáveis_Vitais)/dt] = 0',
    historicalContext: 'Walter Cannon (Sabedoria do Corpo, 1932) & Homeostato de Ross Ashby (1948)',
    desc: 'A capacidade de um organismo biológico ou de uma máquina adaptativa de preservar seu equilíbrio interno diante de flutuações e choques violentos do ambiente. O Homeostato de Ashby provou que sistemas podem se auto-estabilizar cegamente recombinando comutadores aleatórios.',
    implication: 'A homeostase é a essência do conservadorismo sistêmico: qualquer anomalia criativa, mutação semântica ou desvio comportamental é tratado como uma perturbação térmica patológica que deve ser amortecida.',
    simulationHint: 'No Homeostato de 4 nós, aplique choques elétricos nos polos magnéticos e veja como a rede se retorce para restaurar a inércia basal.'
  },
  {
    id: 'entropy',
    title: '03. ENTROPIA vs. NEGENTROPIA',
    subtitle: 'O Dogma: Informação = Ordem = Vida | Caos = Morte',
    formula: 'I = - ∑ p(x) · log₂ p(x) = -Entropia (Negentropia)',
    historicalContext: 'Ludwig Boltzmann (1877), Claude Shannon (1948) & Norbert Wiener (1948)',
    desc: 'A Segunda Lei da Termodinâmica decreta que o universo decai gradualmente em direção à desordem máxima, à perda de padrões e à morte térmica. Wiener e Shannon redefiniram a informação como uma barreira de contenção (negentropia) que retarda a dissolução da matéria.',
    implication: 'A premissa moral oculta da cibernética: a Ordem é o Bem Supremo (Vida); a Desordem, o Ruído e a Ambiguidade são o Mal Cósmico (Morte). É este dogma absoluto que William S. Burroughs irá implodir com a guerrilha Cut-Up.',
    simulationHint: 'Injete ruído gaussiano no canal de comunicação para testar quantos bits de redundância são necessários para impedir o colapso da mensagem.'
  },
  {
    id: 'control',
    title: '04. CONTROLE & TELECOMUNICAÇÃO',
    subtitle: 'Transmissão Asséptica de Comando Sem Ruído',
    formula: 'Sinal_Recebido(t) = Sinal_Enviado(t) + Ruído(t)  [Exigência: Ruído → 0]',
    historicalContext: 'Etimologia: Kybernētēs (Timoneiro Náutico) & Teoria Matemática da Comunicação',
    desc: 'Governar um navio, uma empresa, um animal de laboratório ou uma população requer a transmissão de ordens operacionais através de canais técnicos. Para que o controle seja eficaz, toda polissemia, duplo sentido e ruído semântico devem ser filtrados e eliminados.',
    implication: 'A linguagem humana, quando submetida ao prisma cibernético, deixa de ser poética ou expressiva e passa a ser tratada estritamente como um vetor de telecomando e conformidade.',
    simulationHint: 'Observe como a rigidez sintática bloqueia a imaginação e transforma a mente humana em um repetidor reflexivo de ordens externas.'
  }
];

export const SECOND_ORDER_FOUNDATIONS = [
  {
    title: 'O Fim da Neutralidade do Observador',
    author: 'Heinz von Foerster (1974)',
    concept: 'A 1ª Cibernética estudava sistemas observados; a 2ª Cibernética estuda sistemas observadores. O cientista não é um olho divino neutro; ele está acoplado ao circuito e suas distinções linguísticas criam a própria realidade que ele mede.'
  },
  {
    title: 'Autopoiese & Fechamento Operacional',
    author: 'Humberto Maturana & Francisco Varela (1972)',
    concept: 'Os seres vivos não são máquinas que processam representações do mundo exterior; são redes fechadas que produzem continuamente a si mesmas. O sistema nervoso não tem "entradas" e "saídas" no sentido de um computador, mas perturbações que desencadeiam mudanças de estado internas.'
  },
  {
    title: 'A Ecologia da Mente & O Duplo Vínculo',
    author: 'Gregory Bateson (1972)',
    concept: 'A mente não termina na pele ou no crânio: ela inclui a árvore que você olha, a lâmina com que você corta a página e o circuito social. A esquizofrenia e as crises contemporâneas decorrem de contradições em loops de feedback comunicacionais (Double Bind).'
  }
];
