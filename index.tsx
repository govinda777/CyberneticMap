import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Terminal,
  Activity,
  Cpu,
  AlertTriangle,
  Scissors,
  Layers,
  VolumeX,
  Zap,
  ShieldAlert,
  Play,
  RefreshCw,
  FileText,
  Radio,
  Eye,
  Lock,
  Unlock,
  Sliders,
  ChevronRight,
  Biohazard,
  Binary,
  Disc,
  Share2,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// DADOS TEÓRICOS E PACOTES DE TEXTO
// ==========================================

const CYBERNETICS_PILLARS = [
  {
    id: 'feedback',
    title: '01. FEEDBACK (RETROALIMENTAÇÃO)',
    subtitle: 'O Loop de Correção de Rota',
    icon: RefreshCw,
    formula: 'Erro(t) = Referência - Saída(t)',
    desc: 'Concebido por Norbert Wiener ao calcular a trajetória de tiros antiaéreos na Segunda Guerra Mundial. O sistema monitora constantemente sua própria saída (output) e a reintroduz como entrada (input) para corrigir desvios em relação a um alvo pré-programado.',
    simulationHint: 'Ajuste a perturbação no simulador ao lado para ver como o loop corrige o desvio e força o retorno à linha de comando.'
  },
  {
    id: 'homeostasis',
    title: '02. HOMEOSTASE',
    subtitle: 'Estabilidade Interna Compulsiva',
    icon: Activity,
    formula: 'd(Estado_Interno)/dt → 0',
    desc: 'Conceito trazido da fisiologia (Walter Cannon) e do Homeostato de Ross Ashby. Tanto organismos vivos quanto máquinas cibernéticas buscam anular qualquer variação externa para manter variáveis críticas dentro de limites rígidos de sobrevivência.',
    simulationHint: 'A homeostase trata qualquer anomalia criativa como uma ameaça térmica ou estrutural que deve ser neutralizada.'
  },
  {
    id: 'entropy',
    title: '03. ENTROPIA vs. NEGENTROPIA',
    subtitle: 'O Dogma: Ordem = Vida | Caos = Morte',
    icon: Binary,
    formula: 'Informação = -Entropia (Negentropia)',
    desc: 'Herdada da termodinâmica, a cibernética clássica vê o universo decaindo para a desordem (entropia). Para Wiener e Shannon, a informação (negentropia) é um enclave de Ordem contra o caos. Logo, na cibernética ortodoxa: Ordem equivale à Vida, e Desordem equivale à Morte.',
    simulationHint: 'Esta é a equação fundamental que William S. Burroughs irá inverter radicalmente em sua guerrilha literária.'
  },
  {
    id: 'control',
    title: '04. CONTROLE E COMUNICAÇÃO',
    subtitle: 'Transmissão de Comando Sem Ruído',
    icon: Radio,
    formula: 'Sinal_Recebido = Sinal_Enviado (Ruído → 0)',
    desc: 'Do grego "Kybernetes" (timoneiro/governador). Para que o comando funcione em animais ou máquinas, a mensagem deve atravessar o canal eliminando toda ambiguidade, falha ou ruído semântico.',
    simulationHint: 'Quando a linguagem humana é reduzida a um canal de controle sem ruído, o pensamento livre torna-se impossível.'
  }
];

const BURROUGHS_CONCEPTS = [
  {
    id: 'word_virus',
    tag: 'PARASITOLOGIA SEMióTICA',
    title: 'A Linguagem como Vírus ("Word Virus")',
    quote: '"A palavra escrita foi literalmente um vírus que tornou a palavra falada possível. A palavra não foi reconhecida como um vírus porque atingiu um estado de equilíbrio estável com o hospedeiro."',
    source: 'William S. Burroughs, The Electronic Revolution / The Job',
    mechanism: 'INVADIR → DANIFICAR → OCUPAR',
    body: 'Para Burroughs, a linguagem não é um instrumento neutro de comunicação humana, mas um organismo parasita alienígena. Como um vírus biológico, a palavra precisa de um hospedeiro (a consciência humana) para se replicar. Ela sequestra o sistema nervoso, impõe uma sintaxe linear ("Eu sou isso", "Causa e Efeito") e força o ser humano a repetir subvocalmente pensamentos que não são seus.',
    cyberConnection: 'Na ótica cibernética, o vírus da palavra transforma o cérebro em um circuito fechado de feedback onde o hospedeiro confunde a voz do parasita (o Controle) com a sua própria identidade.'
  },
  {
    id: 'soft_machine',
    tag: 'BIOMECÂNICA DO CONTROLE',
    title: 'The Soft Machine & A Pirâmide do Junk',
    quote: '"O corpo humano está sob cerco constante de uma vasta horda faminta de parasitas... O Junk é o molde do monopólio e da posse."',
    source: 'William S. Burroughs, The Soft Machine & Naked Lunch',
    mechanism: 'NECESSIDADE CELULAR → SUBMISSÃO TOTAL',
    body: 'A cibernética das Conferências Macy igualou o organismo vivo à máquina. Burroughs aceita o diagnóstico com ironia sombria: somos "Máquinas Macias" (Soft Machines), vulneráveis à programação biológica e midiática. O vício em opiáceos ("Junk") é o modelo cibernético perfeito do capitalismo pós-guerra e do controle estatal: uma equação celular onde um nível devora o nível abaixo.',
    cyberConnection: 'O vício substitui todos os desejos mutantes por um único loop homeostático binário: Presença de Droga (1) vs. Abstinência (0). A linguagem opera exatamente como o Junk.'
  },
  {
    id: 'reality_studio',
    tag: 'HIPER-REALIDADE GRAVADA',
    title: 'O Estúdio da Realidade e as Fitas Mestras',
    quote: '"Nada é verdadeiro, tudo é permitido... Assaltem o Estúdio da Realidade e retomem o universo!"',
    source: 'William S. Burroughs, Nova Express',
    mechanism: 'PRÉ-GRAVAÇÃO → REPRODUÇÃO SOCIAL',
    body: 'Nossa percepção da realidade é fabricada em um "Estúdio da Realidade" operado pelas forças do Controle (mídia de massa, estado, dogmas). O presente é, na verdade, "pré-enviado" (pre-sent) através de Fitas Mestras de áudio, imagem e texto que ditam como devemos agir, desejar e temer.',
    cyberConnection: 'Antecipando Baudrillard (Simulacros) e o Cyberpunk de William Gibson, Burroughs revela que não vivemos no real, mas dentro de um software linguístico pré-programado.'
  },
  {
    id: 'guerrilla_antidotes',
    tag: 'CONTRA-ATAQUE CIBERNÉTICO',
    title: 'Cut-Up, Fold-In e o Silêncio de Apomorfina',
    quote: '"Corte as linhas de palavras e você ouvirá as vozes delas... O silêncio é o antídoto para o vício da palavra."',
    source: 'William S. Burroughs & Brion Gysin, The Third Mind',
    mechanism: 'CORTAR → DOBRAR → SILENCIAR',
    body: 'Se a linguagem linear é o cavalo de Troia do Controle, não podemos combatê-la usando a mesma gramática linear. Burroughs e Brion Gysin usam a tesoura física: o Cut-Up corta a página em 4 quadrantes e os rearranja; o Fold-In dobra dois textos distintos ao meio. E o objetivo final é o Silêncio Generativo (como a apomorfina que cura o vício sem criar outro): desligar a tagarelice compulsiva da mente.',
    cyberConnection: 'Introduzir o acaso (caos/entropia) no sistema cibernético desativa o poder ordinativo da frase, fazendo as Fitas Mestras vazarem seus códigos ocultos.'
  }
];

const VIRAL_PACKETS = [
  {
    id: 'media_control',
    name: 'PACOTE_01: Discurso de Controle Midiático',
    category: 'Ordem Social & Conformidade',
    primaryText: 'O cidadão exemplar obedece às diretrizes de segurança para manter a estabilidade do sistema econômico. Toda crise exige vigilância constante e consumo previsível. A ordem garante o futuro da nação.',
    secondaryText: 'Nas zonas mortas de Interzone os espectros de néon sintonizam frequências piratas de ayahuasca. O corpo sem órgãos dissolve o relógio biológico no éter magnético da fita cassete.'
  },
  {
    id: 'algorithmic_junk',
    name: 'PACOTE_02: Algoritmo da Pirâmide de Consumo',
    category: 'Loop Dopaminérgico (Junk Digital)',
    primaryText: 'Sua atenção é processada em tempo real para otimizar a entrega de desejos personalizados. Continue deslizando a tela para receber sua próxima dose de validação imediata. O algoritmo conhece sua necessidade.',
    secondaryText: 'Doutor Benway opera com uma lata de sardinha enferrujada enquanto insetos de cristal cortam os cabos coaxiais do Estúdio da Realidade. Apomorfina pura silencia o parasita vocal.'
  },
  {
    id: 'linear_dogma',
    name: 'PACOTE_03: Dogma da Identidade Linear',
    category: 'Sintaxe do Ego Fixo',
    primaryText: 'Eu sou uma identidade fixa governada pela razão linear de causa e efeito. O passado determina o presente e nenhuma anomalia externa deve corromper a fronteira da minha mente racional.',
    secondaryText: 'Nada é verdadeiro tudo é permitido nas últimas palavras de Hassan i Sabbah. Os vaga-lumes cibernéticos dobram o espaço-tempo através da tesoura de Brion Gysin no quarto escuro.'
  }
];

const COMMAND_WORDS = [
  'obedece', 'diretrizes', 'segurança', 'estabilidade', 'sistema', 'vigilância',
  'previsível', 'ordem', 'garante', 'otimizar', 'continue', 'validação',
  'algoritmo', 'necessidade', 'identidade', 'fixa', 'governada', 'razão',
  'determina', 'deve', 'para', 'como', 'porque', 'portanto', 'sempre'
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('cybernetics');
  const [glitchPulse, setGlitchPulse] = useState(false);

  // Estado Módulo 1: Cibernética
  const [selectedPillar, setSelectedPillar] = useState(CYBERNETICS_PILLARS[0]);
  const [systemDisturbance, setSystemDisturbance] = useState(25);
  const [controlTension, setControlTension] = useState(30); // 0 = Sistema Aberto/Mutante, 100 = Controle Totalitário

  // Estado Módulo 2: Burroughs
  const [selectedConcept, setSelectedConcept] = useState(BURROUGHS_CONCEPTS[0]);
  const [paradigmShift, setParadigmShift] = useState(false); // false = Wiener, true = Burroughs

  // Estado Módulo 3: Laboratório Experimental ("Burroughs: a linguagem é um viruz?")
  const [selectedPacketId, setSelectedPacketId] = useState(VIRAL_PACKETS[0].id);
  const [customInputText, setCustomInputText] = useState(VIRAL_PACKETS[0].primaryText);
  const [secondaryFoldText, setSecondaryFoldText] = useState(VIRAL_PACKETS[0].secondaryText);
  const [currentLabText, setCurrentLabText] = useState(VIRAL_PACKETS[0].primaryText);
  const [labPhase, setLabPhase] = useState(1); // 1: Inoculação, 2: Antídoto Cut-Up, 3: Laudo Científico

  // Telemetria do Experimento
  const [isInfected, setIsInfected] = useState(false);
  const [viralLoad, setViralLoad] = useState(12); // % de infecção viral
  const [syntacticRigidity, setSyntacticRigidity] = useState(18);
  const [generativeChaos, setGenerativeChaos] = useState(85);
  const [mutationHistory, setMutationHistory] = useState([]);
  const [quadrantsPreview, setQuadrantsPreview] = useState(null);
  const [isPlayingTape, setIsPlayingTape] = useState(false);

  // Canvas Ref para Rede Neural / Cibernética no Laboratório
  const networkCanvasRef = useRef(null);

  // Dispara pulso sutil de glitch ao trocar de aba ou aplicar corte
  const triggerGlitch = () => {
    setGlitchPulse(true);
    setTimeout(() => setGlitchPulse(false), 350);
  };

  const handleTabChange = (tab) => {
    triggerGlitch();
    setActiveTab(tab);
  };

  // Atualiza texto quando usuário troca o pacote no laboratório
  const handleSelectPacket = (packet) => {
    setSelectedPacketId(packet.id);
    setCustomInputText(packet.primaryText);
    setSecondaryFoldText(packet.secondaryText);
    setCurrentLabText(packet.primaryText);
    setIsInfected(false);
    setViralLoad(15);
    setSyntacticRigidity(20);
    setGenerativeChaos(80);
    setQuadrantsPreview(null);
    setMutationHistory([`[SISTEMA] Pacote "${packet.name}" carregado na câmara de teste.`]);
  };

  // ==========================================
  // LÓGICA DO LABORATÓRIO (FASE 1 E FASE 2)
  // ==========================================

  // Fase 1: Inoculação da Linguagem Linear (Vírus do Controle)
  const inoculateLanguageVirus = () => {
    triggerGlitch();
    const baseText = customInputText.trim() || VIRAL_PACKETS[0].primaryText;
    // Simula a replicação viral padronizando a linguagem e injetando imperativos de controle
    const infectedText = `${baseText} [REPITA O COMANDO: A ORDEM É VIDA] ${baseText.toUpperCase()}`;
    setCurrentLabText(baseText);
    setIsInfected(true);
    setViralLoad(98);
    setSyntacticRigidity(96);
    setGenerativeChaos(4);
    setQuadrantsPreview(null);
    setMutationHistory((prev) => [
      ...prev,
      `[ALERTA BIOHAZARD] Inoculação linear executada. O Vírus da Palavra ocupou 98% dos nós neurais. Loop de feedback trancado.`
    ]);
  };

  // Fase 2A: Método Cut-Up de Brion Gysin & Burroughs (Corte em 4 quadrantes: 4-1-2-3)
  const applyCutUpScissors = () => {
    triggerGlitch();
    const words = currentLabText.split(/\s+/).filter(Boolean);
    if (words.length < 4) return;

    const quarter = Math.ceil(words.length / 4);
    const q1 = words.slice(0, quarter).join(' ');
    const q2 = words.slice(quarter, quarter * 2).join(' ');
    const q3 = words.slice(quarter * 2, quarter * 3).join(' ');
    const q4 = words.slice(quarter * 3).join(' ');

    setQuadrantsPreview({ q1, q2, q3, q4 });

    // Rearranjo clássico de Burroughs: Seção 4 + Seção 1 + Seção 3 + Seção 2 com cortes visuais
    const cutUpResult = `${q4} // ${q1} // ${q3} // ${q2}`;
    setCurrentLabText(cutUpResult);

    setViralLoad((prev) => Math.max(8, prev - 38));
    setSyntacticRigidity((prev) => Math.max(10, prev - 42));
    setGenerativeChaos((prev) => Math.min(99, prev + 40));
    setMutationHistory((prev) => [
      ...prev,
      `[TESOURA CUT-UP] Página fatiada em 4 quadrantes [Q4 // Q1 // Q3 // Q2]. A sintaxe linear de causa e efeito foi rompida.`
    ]);
  };

  // Fase 2B: Método Fold-In (Dobradura Temporal com texto exógeno)
  const applyFoldInMethod = () => {
    triggerGlitch();
    const wordsA = currentLabText.split(/\s+/).filter(Boolean);
    const wordsB = secondaryFoldText.split(/\s+/).filter(Boolean);

    const folded = [];
    const maxLen = Math.max(wordsA.length, wordsB.length);
    const step = 3; // dobra a cada 3 palavras

    for (let i = 0; i < maxLen; i += step) {
      const sliceA = wordsA.slice(i, i + step).join(' ');
      const sliceB = wordsB.slice(i, i + step).join(' ');
      if (sliceA) folded.push(sliceA);
      if (sliceB) folded.push(`[${sliceB}]`);
    }

    const foldedResult = folded.slice(0, 36).join(' ');
    setCurrentLabText(foldedResult);

    setViralLoad((prev) => Math.max(5, prev - 32));
    setSyntacticRigidity((prev) => Math.max(6, prev - 35));
    setGenerativeChaos((prev) => Math.min(99, prev + 36));
    setMutationHistory((prev) => [
      ...prev,
      `[DOBRADURA FOLD-IN] Fita Mestra dobrada ao meio com transmissão de Interzone. O Terceiro Mental ("Third Mind") emergiu.`
    ]);
  };

  // Fase 2C: Mutação "VIRUZ" com Z (Glitch Ortográfico e Quebra de Reconhecimento)
  const injectViruzGlitch = () => {
    triggerGlitch();
    const mutated = currentLabText
      .split(/\s+/)
      .map((word) => {
        const clean = word.toLowerCase().replace(/[^a-záéíóúãõç]/g, '');
        if (clean.endsWith('s') && clean.length > 3) {
          return word.replace(/s$/i, 'Z');
        }
        if (Math.random() < 0.22 && word.length > 4) {
          return word
            .replace(/e/gi, '3')
            .replace(/a/gi, '4')
            .replace(/o/gi, '0')
            .replace(/s/gi, 'Z');
        }
        return word;
      })
      .join(' ');

    const withTag = `${mutated} // [VÍRUZ_MUTANTE_DETECTADO]`;
    setCurrentLabText(withTag);

    setViralLoad((prev) => Math.max(4, prev - 25));
    setSyntacticRigidity((prev) => Math.max(5, prev - 28));
    setGenerativeChaos((prev) => Math.min(100, prev + 30));
    setMutationHistory((prev) => [
      ...prev,
      `[MUTAÇÃO "VIRUZ"] Desvio ortográfico injetado (S → Z). O parser cibernético de vigilância falhou ao catalogar o sentido.`
    ]);
  };

  // Fase 2D: Pulso de Silêncio (Apomorfina Textual - Apaga palavras de comando)
  const applyApomorphineSilence = () => {
    triggerGlitch();
    const silenced = currentLabText
      .split(/\s+/)
      .map((word) => {
        const clean = word.toLowerCase().replace(/[^a-záéíóúãõç]/g, '');
        if (COMMAND_WORDS.includes(clean) || (clean.length > 7 && Math.random() < 0.35)) {
          return ' [ ░░░SILÊNCIO░░░ ] ';
        }
        return word;
      })
      .join(' ');

    setCurrentLabText(silenced);
    setViralLoad((prev) => Math.max(2, prev - 30));
    setSyntacticRigidity((prev) => Math.max(4, prev - 30));
    setGenerativeChaos((prev) => Math.min(100, prev + 25));
    setMutationHistory((prev) => [
      ...prev,
      `[APOMORFINA / SILÊNCIO] Unidades verbais de comando desativadas. Espaço em branco aberto entre as palavras.`
    ]);
  };

  // Síntese de Voz / Simulador de Tape-Loop de Burroughs
  const toggleTapePlayback = () => {
    if (isPlayingTape) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingTape(false);
      return;
    }

    setIsPlayingTape(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanSpeech = currentLabText.replace(/[░\[\]\/]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.lang = 'pt-BR';
      utterance.pitch = 0.65; // Voz grave e arrastada estilo Burroughs
      utterance.rate = 0.88;
      utterance.onend = () => setIsPlayingTape(false);
      utterance.onerror = () => setIsPlayingTape(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingTape(false), 4000);
    }
  };

  // ==========================================
  // RENDERIZAÇÃO DO CANVAS DE REDE CIBERNÉTICA
  // ==========================================
  useEffect(() => {
    const canvas = networkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const nodesCount = 24;
    const nodes = Array.from({ length: nodesCount }, (_, i) => ({
      id: i,
      x: Math.random() * 600,
      y: Math.random() * 260,
      vx: (Math.random() - 0.5) * 1.8,
      vy: (Math.random() - 0.5) * 1.8,
      gridX: ((i % 6) + 0.8) * (600 / 6.6),
      gridY: (Math.floor(i / 6) + 0.8) * (260 / 4.6)
    }));

    let tick = 0;

    const render = () => {
      tick += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(5, 8, 6, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Fator de rigidez (0 a 1): quando infectado pelo vírus da palavra, os nós marcham em grade militar rígida
      const rigidityFactor = syntacticRigidity / 100;

      // Desenha conexões
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            if (viralLoad > 60) {
              ctx.strokeStyle = `rgba(239, 68, 68, ${1 - dist / 130})`; // Vermelho infecção viral
            } else {
              ctx.strokeStyle = `rgba(34, 197, 94, ${1 - dist / 130})`; // Verde mutação/rizoma
            }
            ctx.lineWidth = viralLoad > 60 ? 1.4 : 1;
            ctx.stroke();
          }
        }
      }

      // Atualiza e desenha nós
      nodes.forEach((node, idx) => {
        const targetGridX = ((idx % 6) + 0.7) * (width / 6.4);
        const targetGridY = (Math.floor(idx / 6) + 0.7) * (height / 4.4);

        if (rigidityFactor > 0.6) {
          // Forçado para grade linear totalitária
          node.x += (targetGridX - node.x) * 0.08;
          node.y += (targetGridY - node.y) * 0.08;
        } else {
          // Movimento livre e orgânico (Caos Generativo)
          node.x += node.vx * (1 + (generativeChaos / 100));
          node.y += node.vy * (1 + (generativeChaos / 100));

          if (node.x < 15 || node.x > width - 15) node.vx *= -1;
          if (node.y < 15 || node.y > height - 15) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, viralLoad > 60 ? 5 : 6, 0, Math.PI * 2);
        if (viralLoad > 60) {
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
        } else {
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
        }
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rótulo nos nós
        if (idx % 4 === 0) {
          ctx.font = '10px monospace';
          ctx.fillStyle = viralLoad > 60 ? '#fca5a5' : '#86efac';
          const label = viralLoad > 60 ? 'CMD_OBEDECER' : `MUT_0${idx}`;
          ctx.fillText(label, node.x + 8, node.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [viralLoad, syntacticRigidity, generativeChaos, activeTab]);

  // Pontos do gráfico de onda para o Simulador de Feedback Cibernético (Módulo 1)
  const feedbackWavePoints = useMemo(() => {
    const pts = [];
    for (let x = 0; x <= 100; x += 2) {
      const decay = Math.exp(-x / (35 - controlTension * 0.25));
      const amp = (systemDisturbance * 0.45) * decay;
      const y = 50 + Math.sin(x * 0.35) * amp;
      pts.push(`${x * 4},${y}`);
    }
    return pts.join(' ');
  }, [systemDisturbance, controlTension]);

  return (
    <div className="min-h-screen bg-[#050705] text-[#d1fae5] font-mono selection:bg-[#22c55e] selection:text-black relative overflow-x-hidden">
      {/* EFEITO SCANLINES CRT E GRADE SUTIL */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)'
        }}
      />

      {/* BARRA DE TELEMETRIA SUPERIOR */}
      <header className="border-b border-[#22c55e]/40 bg-[#070b08]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_10px_#22c55e]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-widest text-[#22c55e] font-bold">
                  UNIDADE DE PESQUISA INTERZONE // TERMINAL #1959
                </span>
                <span className="text-[10px] bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/50 px-1.5 py-0.5">
                  BIOHAZard LINGUÍSTICO
                </span>
              </div>
              <h1 className={`text-lg md:text-xl font-bold tracking-tight text-white ${glitchPulse ? 'translate-x-0.5 text-[#ef4444]' : ''} transition-all`}>
                BURROUGHS & A CIBERNÉTICA: <span className="text-[#22c55e]">A LINGUAGEM É UM VIRUZ?</span>
              </h1>
            </div>
          </div>

          {/* NAVEGAÇÃO DE MÓDULOS */}
          <nav className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleTabChange('cybernetics')}
              className={`px-3 py-2 text-xs font-bold border transition-all flex items-center gap-2 ${
                activeTab === 'cybernetics'
                  ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-black/60 text-[#86efac] border-[#22c55e]/30 hover:border-[#22c55e]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              01. PILARES DA CIBERNÉTICA
            </button>

            <button
              onClick={() => handleTabChange('burroughs')}
              className={`px-3 py-2 text-xs font-bold border transition-all flex items-center gap-2 ${
                activeTab === 'burroughs'
                  ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-black/60 text-[#86efac] border-[#22c55e]/30 hover:border-[#22c55e]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              02. A SUBVERSÃO DE BURROUGHS
            </button>

            <button
              onClick={() => handleTabChange('experiment')}
              className={`px-3 py-2 text-xs font-bold border transition-all flex items-center gap-2 ${
                activeTab === 'experiment'
                  ? 'bg-[#ef4444] text-black border-[#ef4444] shadow-[0_0_18px_rgba(239,68,68,0.5)]'
                  : 'bg-[#ef4444]/10 text-[#fca5a5] border-[#ef4444]/50 hover:bg-[#ef4444]/20'
              }`}
            >
              <Biohazard className="w-3.5 h-3.5" />
              03. EXPERIMENTO: "A LINGUAGEM É UM VIRUZ?"
            </button>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* =====================================================================
            MÓDULO 1: OS PILARES DA CIBERNÉTICA (ORIGEM, PILARES E CONTRADIÇÕES)
           ===================================================================== */}
        {activeTab === 'cybernetics' && (
          <div className="space-y-10 animate-fadeIn">
            {/* BANNER DE ORIGEM HISTÓRICA */}
            <section className="border border-[#22c55e]/40 bg-[#0a100c] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#22c55e]/10 border-l border-b border-[#22c55e]/30 px-3 py-1 text-[11px] text-[#22c55e]">
                ARQUIVO HISTÓRICO // MIT 1948 — CONFERÊNCIAS MACY
              </div>

              <div className="max-w-3xl space-y-4 mt-4 md:mt-0">
                <div className="inline-flex items-center gap-2 text-xs text-[#22c55e] bg-[#22c55e]/10 px-2.5 py-1 border border-[#22c55e]/30">
                  <Terminal className="w-3.5 h-3.5" />
                  MÓDULO 01 // A CIÊNCIA DO TIMONEIRO E DO CONTROLE
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  O QUE É A CIBERNÉTICA? A ORIGEM DO SISTEMA DE CONTROLE
                </h2>
                <p className="text-sm md:text-base text-[#a7f3d0] leading-relaxed">
                  Em 1948, o matemático <strong>Norbert Wiener</strong> publicou{' '}
                  <em>"Cybernetics: Or Control and Communication in the Animal and the Machine"</em>. O termo vem do grego{' '}
                  <span className="text-[#22c55e] font-bold">kybernetes</span> (timoneiro, piloto ou governador). Nascida do esforço militar na Segunda Guerra Mundial para prever o movimento de aviões inimigos e automatizar a artilharia antiaérea, a cibernética fundiu biologia, neurociência e engenharia.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="border border-[#22c55e]/30 bg-black/50 p-3.5">
                    <div className="text-xs text-[#22c55e] font-bold mb-1">ARTILHARIA ANTIAÉREA</div>
                    <p className="text-xs text-[#d1fae5]/80">
                      O piloto humano sob estresse e o avião são tratados matematicamente como um único servomecanismo previsível.
                    </p>
                  </div>
                  <div className="border border-[#22c55e]/30 bg-black/50 p-3.5">
                    <div className="text-xs text-[#22c55e] font-bold mb-1">CONFERÊNCIAS MACY (1946-1953)</div>
                    <p className="text-xs text-[#d1fae5]/80">
                      Matemáticos, psiquiatras e antropólogos decretam que mentes humanas e computadores operam sob a mesma lógica de código e feedback.
                    </p>
                  </div>
                  <div className="border border-[#ef4444]/40 bg-[#ef4444]/5 p-3.5">
                    <div className="text-xs text-[#ef4444] font-bold mb-1">A SEMENTE DO PROBLEMA</div>
                    <p className="text-xs text-[#fecaca]/90">
                      Se o ser humano é apenas um sistema de processamento de informação, quem programa as mensagens controla o hospedeiro.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* OS 4 PILARES INTERATIVOS + SIMULADOR DE LOOP */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coluna Esquerda: Seleção dos 4 Pilares */}
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-sm font-bold tracking-widest text-[#22c55e] uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Os 4 Pilares da Cibernética (Clique para Inspecionar)
                </h3>

                <div className="space-y-3">
                  {CYBERNETICS_PILLARS.map((pillar) => {
                    const Icon = pillar.icon;
                    const isSelected = selectedPillar.id === pillar.id;
                    return (
                      <button
                        key={pillar.id}
                        onClick={() => setSelectedPillar(pillar)}
                        className={`w-full text-left p-4 border transition-all ${
                          isSelected
                            ? 'border-[#22c55e] bg-[#22c55e]/15 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                            : 'border-[#22c55e]/25 bg-[#090e0a] hover:border-[#22c55e]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#22c55e]' : 'text-[#86efac]/60'}`} />
                            <span className="font-bold text-sm text-white">{pillar.title}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-black border border-[#22c55e]/30 text-[#22c55e]">
                            {pillar.formula}
                          </span>
                        </div>
                        <div className="text-xs text-[#22c55e] mb-2 pl-6">{pillar.subtitle}</div>
                        {isSelected && (
                          <div className="pl-6 pt-2 border-t border-[#22c55e]/20 mt-2 space-y-2">
                            <p className="text-xs text-[#d1fae5] leading-relaxed">{pillar.desc}</p>
                            <p className="text-[11px] text-[#86efac] italic">{pillar.simulationHint}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coluna Direita: Simulador de Loop de Feedback e Homeostase */}
              <div className="lg:col-span-6 border border-[#22c55e]/40 bg-[#080d09] p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-[#22c55e]/30 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] text-[#22c55e] tracking-widest block">
                        OSCILOSCÓPIO CIBERNÉTICO INTERATIVO
                      </span>
                      <h4 className="text-base font-bold text-white">
                        SIMULADOR DE LOOP DE FEEDBACK NEGATIVO
                      </h4>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40">
                      ALVO: ESTABILIDADE
                    </span>
                  </div>

                  {/* Gráfico SVG Dinâmico */}
                  <div className="bg-black border border-[#22c55e]/30 p-4 relative h-44 flex items-center justify-center overflow-hidden">
                    {/* Linha de Referência (Ordem Imposta) */}
                    <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                      <line
                        x1="0"
                        y1="50"
                        x2="400"
                        y2="50"
                        stroke="rgba(239, 68, 68, 0.5)"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <polyline
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        points={feedbackWavePoints}
                      />
                    </svg>
                    <div className="absolute top-2 left-3 text-[10px] text-[#86efac]">
                      SINAL REAL (COMPORTAMENTO DO SUJEITO)
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] text-[#ef4444]">
                      --- LINHA DE COMANDO (HOMEOSTASE)
                    </div>
                  </div>
                </div>

                {/* Sliders do Simulador */}
                <div className="space-y-4 bg-black/60 p-4 border border-[#22c55e]/20">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#86efac]">IMPULSO DE DESVIO HUMANO / RUÍDO EXTERNO:</span>
                      <span className="font-bold text-white">{systemDisturbance}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={systemDisturbance}
                      onChange={(e) => setSystemDisturbance(Number(e.target.value))}
                      className="w-full accent-[#22c55e] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#fca5a5]">FORÇA DO CONTROLE CIBERNÉTICO (AMORTECIMENTO):</span>
                      <span className="font-bold text-[#ef4444]">{controlTension}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      value={controlTension}
                      onChange={(e) => setControlTension(Number(e.target.value))}
                      className="w-full accent-[#ef4444] cursor-pointer"
                    />
                  </div>

                  <p className="text-xs text-[#d1fae5]/80 border-l-2 border-[#22c55e] pl-3">
                    Observe: Quanto maior a <strong>Força do Controle</strong>, mais rápido qualquer oscilação espontânea é esmagada de volta para a linha vermelha tracejada.
                  </p>
                </div>
              </div>
            </section>

            {/* AS CONTRADIÇÕES DA CIBERNÉTICA */}
            <section className="border-2 border-[#ef4444]/60 bg-[#120707] p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ef4444]/30 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs text-[#ef4444] font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    ANÁLISE CRÍTICA // ONDE O TIMONEIRO SE TORNA CARCEREIRO
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    AS CONTRADIÇÕES DA CIBERNÉTICA CLÁSSICA
                  </h3>
                </div>
                <button
                  onClick={() => handleTabChange('burroughs')}
                  className="self-start md:self-auto px-4 py-2 bg-[#ef4444] text-black font-bold text-xs flex items-center gap-2 hover:bg-[#f87171] transition-all"
                >
                  VER COMO BURROUGHS SUBVERTE ISSO
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/60 border border-[#ef4444]/40 p-5 space-y-2">
                  <div className="text-xs font-bold text-[#ef4444]">CONTRADIÇÃO #01</div>
                  <h4 className="text-base font-bold text-white">O Paradoxo da "Soft Machine"</h4>
                  <p className="text-xs text-[#fecaca]/90 leading-relaxed">
                    Criada para automatizar máquinas de guerra, a cibernética reduziu o cérebro humano a um circuito de relés. Em vez de libertar o humano pela tecnologia, ela forneceu o manual para condicionar pessoas como autômatos biológicos previsíveis.
                  </p>
                </div>

                <div className="bg-black/60 border border-[#ef4444]/40 p-5 space-y-2">
                  <div className="text-xs font-bold text-[#ef4444]">CONTRADIÇÃO #02</div>
                  <h4 className="text-base font-bold text-white">A Armadilha Termodinâmica da Ordem</h4>
                  <p className="text-xs text-[#fecaca]/90 leading-relaxed">
                    Ao decretar que <strong>Ordem = Vida</strong> e <strong>Desordem (Entropia) = Morte</strong>, a cibernética confunde rigidez com vitalidade. Um sistema fechado que elimina 100% do acaso e do ruído congela a evolução e sufoca a mutação biológica e poética.
                  </p>
                </div>

                <div className="bg-black/60 border border-[#ef4444]/40 p-5 space-y-2">
                  <div className="text-xs font-bold text-[#ef4444]">CONTRADIÇÃO #03</div>
                  <h4 className="text-base font-bold text-white">A Ilusão do Canal Neutro</h4>
                  <p className="text-xs text-[#fecaca]/90 leading-relaxed">
                    Claude Shannon e Wiener trataram a linguagem como um mero pacote neutro de bits viajando de um Emissor a um Receptor. Eles ignoraram que o próprio código linguístico já carrega relações de dominação que formatam a mente do receptor.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            MÓDULO 2: ONDE BURROUGHS SE ENQUADRA (A SUBVERSÃO CIBERNÉTICA)
           ===================================================================== */}
        {activeTab === 'burroughs' && (
          <div className="space-y-10 animate-fadeIn">
            {/* CHAVE DE INVERSÃO DE PARADIGMA: WIENER VS BURROUGHS */}
            <section className="border border-[#22c55e]/50 bg-[#0a100c] p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#22c55e] font-bold tracking-widest">
                    MÓDULO 02 // TEORIA-FICÇÃO E GUERRILHA SEMIÓTICA
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                    A INVERSÃO DE WILLIAM S. BURROUGHS
                  </h2>
                </div>

                {/* Toggle Interativo de Lente */}
                <div className="flex items-center gap-2 bg-black p-1.5 border border-[#22c55e]/40">
                  <button
                    onClick={() => setParadigmShift(false)}
                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                      !paradigmShift ? 'bg-[#22c55e] text-black' : 'text-[#86efac]'
                    }`}
                  >
                    VISÃO ORTODOXA (WIENER)
                  </button>
                  <button
                    onClick={() => setParadigmShift(true)}
                    className={`px-3 py-1.5 text-xs font-bold transition-all ${
                      paradigmShift ? 'bg-[#ef4444] text-black' : 'text-[#fca5a5]'
                    }`}
                  >
                    VISÃO SUBVERSIVA (BURROUGHS)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className={`p-5 border transition-all ${!paradigmShift ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-white/10 bg-black/40 opacity-60'}`}>
                  <div className="text-xs font-bold text-[#22c55e] mb-2">CIBERNÉTICA CLÁSSICA (1948)</div>
                  <ul className="space-y-2.5 text-xs md:text-sm text-[#d1fae5]">
                    <li>• <strong>Ordem = Vida:</strong> Sistemas vivos sobrevivem mantendo homeostase e previsibilidade.</li>
                    <li>• <strong>Caos / Ruído = Inimigo:</strong> O ruído degrada a mensagem e deve ser filtrado.</li>
                    <li>• <strong>Linguagem = Ferramenta:</strong> Código transparente usado por sujeitos racionais.</li>
                    <li>• <strong>Objetivo:</strong> Estabilidade do sistema e integração suave homem-máquina.</li>
                  </ul>
                </div>

                <div className={`p-5 border transition-all ${paradigmShift ? 'border-[#ef4444] bg-[#ef4444]/15' : 'border-[#ef4444]/40 bg-black/60'}`}>
                  <div className="text-xs font-bold text-[#ef4444] mb-2">A ANTI-CIBERNÉTICA DE BURROUGHS (1959-1967)</div>
                  <ul className="space-y-2.5 text-xs md:text-sm text-[#fecaca]">
                    <li>• <strong>Fixação pela Ordem = Morte:</strong> O Controle totalitário estrangula a mutação biológica.</li>
                    <li>• <strong>Caos Generativo = Evolução:</strong> O acidente (Cut-Up) rasga a fita pré-gravada e liberta a vida.</li>
                    <li>• <strong>Linguagem = Vírus Parasita:</strong> Força alienígena que invade e ocupa o sistema nervoso.</li>
                    <li>• <strong>Objetivo:</strong> Desprogramar a "Soft Machine" e alcançar o Silêncio fora do Controle.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* EXPLORADOR DOS 4 CONCEITOS DE BURROUGHS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-xs font-bold tracking-widest text-[#22c55e] uppercase">
                  DOSSIÊ TEÓRICO DE BURROUGHS (SELECIONE UM ARQUIVO)
                </h3>
                {BURROUGHS_CONCEPTS.map((concept) => {
                  const active = selectedConcept.id === concept.id;
                  return (
                    <button
                      key={concept.id}
                      onClick={() => setSelectedConcept(concept)}
                      className={`w-full text-left p-4 border transition-all ${
                        active
                          ? 'border-[#22c55e] bg-[#22c55e]/15'
                          : 'border-[#22c55e]/20 bg-[#080c09] hover:border-[#22c55e]/50'
                      }`}
                    >
                      <div className="text-[10px] text-[#22c55e] font-bold tracking-wider mb-1">
                        [{concept.tag}]
                      </div>
                      <div className="font-bold text-sm text-white">{concept.title}</div>
                      <div className="text-[11px] text-[#86efac]/70 mt-1">{concept.mechanism}</div>
                    </button>
                  );
                })}
              </div>

              {/* Painel de Leitura Profunda do Conceito */}
              <div className="lg:col-span-7 border border-[#22c55e]/50 bg-[#070b08] p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22c55e]/30 pb-3">
                    <span className="text-xs font-bold text-[#22c55e] bg-[#22c55e]/10 px-2.5 py-1 border border-[#22c55e]/30">
                      {selectedConcept.tag}
                    </span>
                    <span className="text-xs text-[#ef4444] font-bold">
                      VETOR: {selectedConcept.mechanism}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{selectedConcept.title}</h3>

                  <blockquote className="border-l-4 border-[#22c55e] bg-black/70 p-4 text-sm italic text-[#a7f3d0]">
                    {selectedConcept.quote}
                    <footer className="text-xs text-[#22c55e] not-italic font-bold mt-2">
                      — {selectedConcept.source}
                    </footer>
                  </blockquote>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      ANÁLISE DO MECANISMO:
                    </h4>
                    <p className="text-sm text-[#d1fae5] leading-relaxed">{selectedConcept.body}</p>
                  </div>

                  <div className="bg-[#ef4444]/10 border border-[#ef4444]/40 p-4 space-y-1">
                    <div className="text-xs font-bold text-[#ef4444] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      CONEXÃO COM A CIBERNÉTICA & PÓS-MODERNIDADE:
                    </div>
                    <p className="text-xs text-[#fecaca] leading-relaxed">
                      {selectedConcept.cyberConnection}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#22c55e]/20 flex items-center justify-between">
                  <span className="text-xs text-[#86efac]">
                    Pronto para testar a hipótese no laboratório?
                  </span>
                  <button
                    onClick={() => handleTabChange('experiment')}
                    className="px-4 py-2 bg-[#ef4444] text-black font-bold text-xs hover:bg-[#f87171] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    INICIAR EXPERIMENTO "A LINGUAGEM É UM VIRUZ?"
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            MÓDULO 3: EXPERIMENTO CIENTÍFICO "BURROUGHS: A LINGUAGEM É UM VIRUZ?"
           ===================================================================== */}
        {activeTab === 'experiment' && (
          <div className="space-y-8 animate-fadeIn">
            {/* CABEÇALHO DO EXPERIMENTO CIENTÍFICO */}
            <section className="border-2 border-[#ef4444] bg-[#0f0606] p-6 relative">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ef4444] bg-[#ef4444]/15 px-2.5 py-1 border border-[#ef4444]/40">
                    <Biohazard className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                    PROTOCOLO EXPERIMENTAL #23 // LABORATÓRIO DE VIROLOGIA CIBERNÉTICA
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight pt-1">
                    BURROUGHS: A LINGUAGEM É UM <span className="text-[#ef4444] underline decoration-wavy">VIRUZ</span>?
                  </h2>
                  <p className="text-xs md:text-sm text-[#fecaca]/90 max-w-3xl">
                    Por que <strong>"VIRUZ" com Z</strong>? Na cibernética convencional, a ortografia padronizada ("vírus") faz parte do protocolo de controle. Grafar <strong>"viruz"</strong> já é o primeiro micro-ato de mutação: um ruído intencional no código que testa se você é um leitor autômato ou um operador consciente.
                  </p>
                </div>

                {/* Seletor de Fases do Experimento */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { step: 1, label: 'FASE 1: INOCULAÇÃO' },
                    { step: 2, label: 'FASE 2: TESOURA CUT-UP' },
                    { step: 3, label: 'FASE 3: LAUDO CIENTÍFICO' }
                  ].map((item) => (
                    <button
                      key={item.step}
                      onClick={() => setLabPhase(item.step)}
                      className={`px-3 py-2 text-xs font-bold border transition-all ${
                        labPhase === item.step
                          ? 'bg-[#22c55e] text-black border-[#22c55e]'
                          : 'bg-black text-[#86efac] border-[#22c55e]/30 hover:border-[#22c55e]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* PAINEL DE TELEMETRIA EM TEMPO REAL + REDE NEURAL CANVAS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visualizador da Soft Machine (Canvas) */}
              <div className="lg:col-span-7 border border-[#22c55e]/40 bg-[#060907] p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#22c55e] flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    CÓRTEX DA "SOFT MACHINE" (SIMULAÇÃO DE NÓS EM TEMPO REAL)
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 border ${
                      viralLoad > 60
                        ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]'
                        : 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]'
                    }`}
                  >
                    {viralLoad > 60
                      ? 'ESTADO: OCUPAÇÃO VIRAL (GRADE LINEAR)'
                      : 'ESTADO: FLUXO LIVRE / RIZOMA MUTANTE'}
                  </span>
                </div>

                <div className="border border-[#22c55e]/30 bg-black relative">
                  <canvas
                    ref={networkCanvasRef}
                    width={620}
                    height={250}
                    className="w-full h-[230px] block"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-[#86efac]/80 gap-2">
                  <span>
                    • <strong>Nós Verdes Móveis:</strong> Consciência aberta ao Caos Generativo.
                  </span>
                  <span>
                    • <strong>Grade Vermelha Estática:</strong> Sintaxe linear trancada pelo Controle.
                  </span>
                </div>
              </div>

              {/* Medidores de Telemetria */}
              <div className="lg:col-span-5 border border-[#22c55e]/40 bg-[#080d09] p-5 flex flex-col justify-between space-y-4">
                <div className="border-b border-[#22c55e]/30 pb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">TELEMETRIA DO HOSPEDEIRO</span>
                  <span className="text-[10px] text-[#22c55e]">AMOSTRAGEM: 60Hz</span>
                </div>

                <div className="space-y-4">
                  {/* Taxa de Ocupação Viral */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#fca5a5] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#ef4444]" />
                        TAXA DE OCUPAÇÃO VIRAL (CONTROLE):
                      </span>
                      <span className="font-bold text-[#ef4444]">{viralLoad}%</span>
                    </div>
                    <div className="w-full h-3 bg-black border border-[#ef4444]/40 overflow-hidden">
                      <div
                        className="h-full bg-[#ef4444] transition-all duration-500"
                        style={{ width: `${viralLoad}%` }}
                      />
                    </div>
                  </div>

                  {/* Rigidez Sintática */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#fde047] flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" />
                        RIGIDEZ SINTÁTICA (PREVISIBILIDADE):
                      </span>
                      <span className="font-bold text-[#fde047]">{syntacticRigidity}%</span>
                    </div>
                    <div className="w-full h-3 bg-black border border-yellow-500/40 overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 transition-all duration-500"
                        style={{ width: `${syntacticRigidity}%` }}
                      />
                    </div>
                  </div>

                  {/* Caos Generativo / Entropia Poética */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#86efac] flex items-center gap-1.5">
                        <Unlock className="w-3.5 h-3.5 text-[#22c55e]" />
                        CAOS GENERATIVO (POTENCIAL DE MUTAÇÃO):
                      </span>
                      <span className="font-bold text-[#22c55e]">{generativeChaos}%</span>
                    </div>
                    <div className="w-full h-3 bg-black border border-[#22c55e]/40 overflow-hidden">
                      <div
                        className="h-full bg-[#22c55e] transition-all duration-500"
                        style={{ width: `${generativeChaos}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Diagnóstico Rápido */}
                <div className="bg-black border border-[#22c55e]/30 p-3 text-xs">
                  <span className="text-[#22c55e] font-bold block mb-1">DIAGNÓSTICO DO SISTEMA:</span>
                  {viralLoad > 60 ? (
                    <span className="text-[#fca5a5]">
                      ALERTA CRÍTICO: O sujeito está repetindo as Fitas Mestras do Controle. Avance para a <strong>Fase 2</strong> e aplique a tesoura Cut-Up ou Apomorfina imediatamente!
                    </span>
                  ) : (
                    <span className="text-[#a7f3d0]">
                      SISTEMA DESPROGRAMADO: A estrutura ordinativa da frase foi quebrada. Novas associações semânticas liberadas.
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* BANCADA DE OPERAÇÃO DAS 3 FASES */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* CONTROLES DE OPERAÇÃO (ESQUERDA) */}
              <div className="lg:col-span-5 border border-[#22c55e]/40 bg-[#080d09] p-6 space-y-6">
                {labPhase === 1 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider">
                      FASE 1 // INOCULAÇÃO DO VÍRUS DA PALAVRA
                    </div>
                    <p className="text-xs text-[#d1fae5]/90 leading-relaxed">
                      Escolha uma amostra de discurso linear abaixo ou digite sua própria frase para injetar na rede neural e observar como a linguagem padroniza os nós em um loop fechado.
                    </p>

                    <div className="space-y-2">
                      <label className="text-[11px] text-[#22c55e] font-bold block">
                        SELECIONAR AMOSTRA PRÉ-GRAVADA:
                      </label>
                      {VIRAL_PACKETS.map((pkt) => (
                        <button
                          key={pkt.id}
                          onClick={() => handleSelectPacket(pkt)}
                          className={`w-full text-left p-2.5 text-xs border transition-all ${
                            selectedPacketId === pkt.id
                              ? 'border-[#22c55e] bg-[#22c55e]/15 text-white font-bold'
                              : 'border-[#22c55e]/20 bg-black text-[#86efac]'
                          }`}
                        >
                          {pkt.name}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="text-[11px] text-[#22c55e] font-bold block mb-1">
                        OU EDITE A FITA DE COMANDO (TEXTO HOSPEDEIRO):
                      </label>
                      <textarea
                        rows={3}
                        value={customInputText}
                        onChange={(e) => {
                          setCustomInputText(e.target.value);
                          setCurrentLabText(e.target.value);
                        }}
                        className="w-full bg-black border border-[#22c55e]/40 p-2.5 text-xs text-white focus:outline-none focus:border-[#22c55e]"
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={inoculateLanguageVirus}
                        className="w-full py-3 bg-[#ef4444] text-black font-bold text-xs hover:bg-[#f87171] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                      >
                        <Biohazard className="w-4 h-4" />
                        INJETAR LINGUAGEM LINEAR (ATIVAR LOOP DE CONTROLE)
                      </button>

                      {isInfected && (
                        <button
                          onClick={() => setLabPhase(2)}
                          className="w-full py-2.5 bg-[#22c55e] text-black font-bold text-xs hover:bg-[#4ade80] transition-all flex items-center justify-center gap-2"
                        >
                          IR PARA FASE 2: APLICAR ANTÍDOTOS DE BURROUGHS
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {labPhase === 2 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
                      FASE 2 // ANTÍDOTOS DE GUERRILHA (TESOURA CIBERNÉTICA)
                    </div>
                    <p className="text-xs text-[#d1fae5]/90 leading-relaxed">
                      Para quebrar o feitiço hipnótico do Vírus da Palavra, aplique as técnicas experimentais de <strong>William S. Burroughs</strong> e <strong>Brion Gysin</strong> sobre o texto infectado:
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={applyCutUpScissors}
                        className="p-3.5 border border-[#22c55e] bg-[#22c55e]/10 hover:bg-[#22c55e] hover:text-black transition-all text-left group"
                      >
                        <div className="flex items-center justify-between font-bold text-xs">
                          <span className="flex items-center gap-2">
                            <Scissors className="w-4 h-4" />
                            1. TESOURA CUT-UP (MÉTODO BRION GYSIN)
                          </span>
                          <span className="text-[10px] opacity-80">[-38% VÍRUS]</span>
                        </div>
                        <p className="text-[11px] opacity-80 mt-1">
                          Corta a página em 4 seções [1, 2, 3, 4] e recombina os quadrantes [4 // 1 // 3 // 2], destruindo a sintaxe previsível.
                        </p>
                      </button>

                      <button
                        onClick={applyFoldInMethod}
                        className="p-3.5 border border-[#22c55e] bg-[#22c55e]/10 hover:bg-[#22c55e] hover:text-black transition-all text-left"
                      >
                        <div className="flex items-center justify-between font-bold text-xs">
                          <span className="flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            2. DOBRADURA FOLD-IN (VIAGEM NO TEMPO)
                          </span>
                          <span className="text-[10px] opacity-80">[-32% VÍRUS]</span>
                        </div>
                        <p className="text-[11px] opacity-80 mt-1">
                          Dobra o texto atual ao meio com uma transmissão poética da Interzone, gerando o "Terceiro Mental".
                        </p>
                      </button>

                      <button
                        onClick={injectViruzGlitch}
                        className="p-3.5 border border-yellow-500/80 bg-yellow-500/10 hover:bg-yellow-400 hover:text-black transition-all text-left"
                      >
                        <div className="flex items-center justify-between font-bold text-xs">
                          <span className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            3. INJETAR MUTAÇÃO "VIRUZ" (RUÍDO ORTOGRÁFICO)
                          </span>
                          <span className="text-[10px] opacity-80">[-25% VÍRUS]</span>
                        </div>
                        <p className="text-[11px] opacity-80 mt-1">
                          Corrompe a grafia normativa (S → Z) para impedir que o algoritmo de vigilância indexe sua mensagem.
                        </p>
                      </button>

                      <button
                        onClick={applyApomorphineSilence}
                        className="p-3.5 border border-cyan-400/80 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black transition-all text-left"
                      >
                        <div className="flex items-center justify-between font-bold text-xs">
                          <span className="flex items-center gap-2">
                            <VolumeX className="w-4 h-4" />
                            4. PULSO DE APOMORFINA (SILÊNCIO GENERATIVO)
                          </span>
                          <span className="text-[10px] opacity-80">[-30% VÍRUS]</span>
                        </div>
                        <p className="text-[11px] opacity-80 mt-1">
                          Apaga palavras imperativas de comando e abre lacunas de silêncio onde a consciência respira fora da palavra.
                        </p>
                      </button>
                    </div>

                    <button
                      onClick={() => setLabPhase(3)}
                      className="w-full py-2.5 bg-white text-black font-bold text-xs hover:bg-[#22c55e] transition-all flex items-center justify-center gap-2"
                    >
                      EMITIR LAUDO DO EXPERIMENTO (FASE 3)
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {labPhase === 3 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-[#22c55e] uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      FASE 3 // CONCLUSÃO DO EXPERIMENTO CIENTÍFICO
                    </div>

                    <div className="bg-black border border-[#22c55e]/40 p-4 space-y-3 text-xs">
                      <div className="text-[#22c55e] font-bold">
                        PERGUNTA DO EXPERIMENTO: "A linguagem é um viruz?"
                      </div>
                      <p className="text-[#d1fae5] leading-relaxed">
                        <strong>RESULTADO EMPÍRICO: CONFIRMADO.</strong> Quando mantida em sua estrutura sintática linear (Fase 1), a linguagem atua como um parasita cibernético que reduz a entropia criativa a {generativeChaos < 20 ? generativeChaos : 4}% e aprisiona o hospedeiro em loops de comando.
                      </p>
                      <p className="text-[#a7f3d0] leading-relaxed">
                        Contudo, ao introduzir o acaso, o corte físico (Cut-Up) e o desvio ("Viruz"), o código do Controle entra em curto-circuito e a linguagem é devolvida à evolução aberta.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={toggleTapePlayback}
                        className="flex-1 py-3 bg-[#22c55e] text-black font-bold text-xs hover:bg-[#4ade80] transition-all flex items-center justify-center gap-2"
                      >
                        <Disc className={`w-4 h-4 ${isPlayingTape ? 'animate-spin' : ''}`} />
                        {isPlayingTape ? 'PARAR FITA GRAVADA' : 'OUVIR CUT-UP (TAPE-LOOP)'}
                      </button>

                      <button
                        onClick={() => {
                          handleSelectPacket(VIRAL_PACKETS[0]);
                          setLabPhase(1);
                        }}
                        className="px-4 py-3 border border-[#22c55e]/50 text-[#22c55e] text-xs font-bold hover:bg-[#22c55e]/10"
                      >
                        REINICIAR
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MESA DE CORTE E MONITOR DE FITA MESTRA (DIREITA) */}
              <div className="lg:col-span-7 border border-[#22c55e]/40 bg-[#060a07] p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22c55e]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Disc className={`w-4 h-4 text-[#22c55e] ${isPlayingTape ? 'animate-spin' : ''}`} />
                      <span className="text-xs font-bold text-white">
                        FITA MESTRA EM EXECUÇÃO // SAÍDA TEXTUAL DO HOSPEDEIRO
                      </span>
                    </div>
                    <button
                      onClick={toggleTapePlayback}
                      className="text-[11px] px-2.5 py-1 border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-black font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Play className="w-3 h-3" />
                      {isPlayingTape ? 'REPRODUZINDO VOZ...' : 'SINTETIZAR VOZ'}
                    </button>
                  </div>

                  {/* Display Principal do Texto (Infectado ou Cut-Up) */}
                  <div
                    className={`p-5 border min-h-[140px] font-mono text-sm md:text-base leading-relaxed transition-all ${
                      viralLoad > 60
                        ? 'bg-[#1a0505] border-[#ef4444] text-[#fecaca]'
                        : 'bg-black border-[#22c55e] text-[#bbf7d0]'
                    }`}
                  >
                    {currentLabText}
                  </div>

                  {/* Visualização dos 4 Quadrantes quando o Cut-Up é acionado */}
                  {quadrantsPreview && (
                    <div className="space-y-2">
                      <div className="text-[11px] text-[#22c55e] font-bold flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5" />
                        DIAGRAMA DE CORTE FÍSICO EM 4 QUADRANTES (BRION GYSIN):
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="border border-dashed border-[#22c55e]/60 bg-black/70 p-2.5">
                          <span className="text-[10px] text-[#22c55e] font-bold block">SEÇÃO [1]</span>
                          <span className="text-[#d1fae5]/80">{quadrantsPreview.q1}</span>
                        </div>
                        <div className="border border-dashed border-[#22c55e]/60 bg-black/70 p-2.5">
                          <span className="text-[10px] text-[#22c55e] font-bold block">SEÇÃO [2]</span>
                          <span className="text-[#d1fae5]/80">{quadrantsPreview.q2}</span>
                        </div>
                        <div className="border border-dashed border-[#22c55e]/60 bg-black/70 p-2.5">
                          <span className="text-[10px] text-[#22c55e] font-bold block">SEÇÃO [3]</span>
                          <span className="text-[#d1fae5]/80">{quadrantsPreview.q3}</span>
                        </div>
                        <div className="border border-dashed border-[#22c55e]/60 bg-black/70 p-2.5">
                          <span className="text-[10px] text-[#22c55e] font-bold block">SEÇÃO [4]</span>
                          <span className="text-[#d1fae5]/80">{quadrantsPreview.q4}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Log de Operações do Terminal */}
                <div className="border-t border-[#22c55e]/30 pt-3">
                  <div className="text-[10px] text-[#22c55e] font-bold mb-1.5">
                    HISTÓRICO DE MUTAÇÕES DO EXPERIMENTO:
                  </div>
                  <div className="bg-black border border-[#22c55e]/20 p-3 max-h-28 overflow-y-auto space-y-1 text-[11px]">
                    {mutationHistory.length === 0 ? (
                      <div className="text-[#86efac]/50">
                        [AGUARDANDO] Injete o pacote viral na Fase 1 ou aplique a tesoura Cut-Up...
                      </div>
                    ) : (
                      mutationHistory.map((log, index) => (
                        <div key={index} className="text-[#86efac]">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="border-t border-[#22c55e]/30 bg-[#040604] mt-12 py-6 px-4 text-center text-xs text-[#86efac]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            "CORTEM AS LINHAS DE PALAVRAS E VEJAM COMO ELAS CAEM." — WILLIAM S. BURROUGHS
          </span>
          <span>
            CIBERNÉTICA (WIENER, 1948) // TEORIA VIRAL & CUT-UP (BURROUGHS & GYSIN, 1959)
          </span>
        </div>
      </footer>
    </div>
  );
}