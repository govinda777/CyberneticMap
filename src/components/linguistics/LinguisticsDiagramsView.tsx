import React, { useState, useEffect, useRef } from 'react';
import { 
  GitMerge, 
  Layers, 
  Scissors, 
  Biohazard, 
  Radio, 
  Cpu, 
  ArrowRight, 
  ArrowDown, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  FileText,
  RefreshCw,
  Sparkles,
  BookOpen,
  Clock,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { LINGUISTIC_GENEALOGY, RECAPITULATIONS, LinguisticFigure } from '../../data/linguisticsData';

interface LinguisticsDiagramsViewProps {
  onNavigateToExperiments: (groupId?: string) => void;
  onTriggerGlitch: () => void;
}

export const LinguisticsDiagramsView: React.FC<LinguisticsDiagramsViewProps> = ({
  onNavigateToExperiments,
  onTriggerGlitch
}) => {
  const [activeDiagramTab, setActiveDiagramTab] = useState<'triangle' | 'interactive-channel' | 'virus-anatomy' | 'control-circuit' | 'cut-up-sabotage'>('triangle');
  const [selectedFigure, setSelectedFigure] = useState<LinguisticFigure>(LINGUISTIC_GENEALOGY[1]); // Jakobson
  const [selectedTriangleNode, setSelectedTriangleNode] = useState<'cib' | 'ling' | 'bur'>('bur');

  // Estado do Simulador de Canal Interativo (Jakobson vs Burroughs)
  const channelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [channelMode, setChannelMode] = useState<'linear' | 'cut-up'>('linear');
  const [cutUpCount, setCutUpCount] = useState<number>(0);

  // Estado da Auditoria / Quiz Interativo
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Canvas do Canal de Comunicação Interativo
  useEffect(() => {
    const canvas = channelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    interface Packet {
      x: number;
      text: string;
      speed: number;
      isCorrupted: boolean;
    }
    const packets: Packet[] = [];
    const commandWords = ['OBEDEÇA', 'CONSUMA', 'ESTABILIDADE', 'ORDEM', 'CONTROLE', 'REPETIR', 'HOMEOSTASE'];
    const subversiveWords = ['MUTAR', 'FUTURO', 'SILÊNCIO', 'VAZAR', 'TESOURA', 'DESCONECTAR', 'CAOS'];

    const render = () => {
      time += 1;
      ctx.fillStyle = '#030704';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      // Desenha o Fio/Canal
      ctx.strokeStyle = channelMode === 'linear' ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash(channelMode === 'linear' ? [] : [6, 4]);
      ctx.beginPath();
      ctx.moveTo(70, centerY);
      ctx.lineTo(canvas.width - 70, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Emissor (Estúdio da Realidade)
      ctx.fillStyle = '#0d180d';
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      ctx.fillRect(10, centerY - 28, 60, 56);
      ctx.strokeRect(10, centerY - 28, 60, 56);
      ctx.fillStyle = '#86efac';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText('EMISSOR', 18, centerY - 8);
      ctx.fillText('ESTÚDIO', 18, centerY + 8);
      ctx.fillText('[FITAS]', 20, centerY + 20);

      // Receptor (Soft Machine Humana)
      ctx.fillStyle = channelMode === 'linear' ? '#0d180d' : '#1a0808';
      ctx.strokeStyle = channelMode === 'linear' ? '#22c55e' : '#ef4444';
      ctx.fillRect(canvas.width - 70, centerY - 28, 60, 56);
      ctx.strokeRect(canvas.width - 70, centerY - 28, 60, 56);
      ctx.fillStyle = channelMode === 'linear' ? '#86efac' : '#fca5a5';
      ctx.fillText('RECEPTOR', canvas.width - 64, centerY - 8);
      ctx.fillText('HUMANO', canvas.width - 60, centerY + 8);
      ctx.fillText(channelMode === 'linear' ? '[DÓCIL]' : '[LIVRE]', canvas.width - 62, centerY + 20);

      // Gera pacotes periódicos
      if (time % 45 === 0) {
        const isCorrupt = channelMode === 'cut-up';
        const wordPool = isCorrupt ? subversiveWords : commandWords;
        const text = wordPool[Math.floor(Math.random() * wordPool.length)];
        packets.push({
          x: 75,
          text,
          speed: isCorrupt ? 2.5 + Math.random() * 2 : 2.0,
          isCorrupted: isCorrupt
        });
      }

      // Se for modo Cut-Up, desenha a tesoura cortando no meio
      if (channelMode === 'cut-up') {
        const midX = canvas.width / 2;
        ctx.fillStyle = '#f59e0b';
        ctx.font = '16px monospace';
        ctx.fillText('✂', midX - 8, centerY - 12);
        ctx.fillStyle = '#ef4444';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('TESOURA CUT-UP', midX - 35, centerY + 24);
        ctx.fillText('[RUÍDO INJETADO]', midX - 38, centerY + 36);

        // Faíscas estocásticas no ponto de corte
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
          ctx.fillRect(midX + (Math.random() - 0.5) * 20, centerY + (Math.random() - 0.5) * 15, 2, 2);
        }
      }

      // Atualiza e renderiza pacotes
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.x += p.speed;

        // Se passar pelo meio no modo cut-up, corrompe o texto
        if (channelMode === 'cut-up' && p.x > canvas.width / 2 && !p.isCorrupted) {
          p.isCorrupted = true;
          p.text = subversiveWords[Math.floor(Math.random() * subversiveWords.length)];
        }

        // Desenha o pacote no canal
        ctx.fillStyle = p.isCorrupted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
        ctx.strokeStyle = p.isCorrupted ? '#ef4444' : '#22c55e';
        ctx.fillRect(p.x, centerY - 10, p.text.length * 6.5 + 8, 20);
        ctx.strokeRect(p.x, centerY - 10, p.text.length * 6.5 + 8, 20);

        ctx.fillStyle = p.isCorrupted ? '#fca5a5' : '#86efac';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText(p.text, p.x + 4, centerY + 4);

        if (p.x > canvas.width - 75) {
          packets.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [channelMode]);

  const handleApplyCutUpToChannel = () => {
    onTriggerGlitch();
    setChannelMode(prev => (prev === 'linear' ? 'cut-up' : 'linear'));
    setCutUpCount(prev => prev + 1);
  };

  // Perguntas do Quiz / Auditoria de Assimilação
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      q: '1. Qual foi a contribuição direta de Roman Jakobson para a conexão entre Linguística e Cibernética?',
      options: [
        'A. Ele declarou que a linguagem humana é mística e não pode ser calculada.',
        'B. Ele adotou o modelo matemático de Claude Shannon, reduzindo a linguagem aos eixos de seleção (código) e combinação (canal).',
        'C. Ele inventou a primeira tesoura de retalhamento de jornais em Paris.',
        'D. Ele recusou totalmente o conceito de ruído na comunicação.'
      ],
      correct: 1,
      explanation: 'Jakobson transladou a Teoria da Informação de Shannon para a linguística estrutural, definindo a fala como codificação/decodificação em canais com eliminação de ruído.'
    },
    {
      id: 2,
      q: '2. De acordo com William S. Burroughs, o que é a linguagem humana em sua essência biológica?',
      options: [
        'A. Um dom inato benevolente exclusivo dos primatas superiores.',
        'B. Uma ferramenta neutra e passiva de representação de objetos externos.',
        'C. Um vírus alienígena microscópico que colonizou a glote e os neurônios humanos e vive em simbiose parasitária.',
        'D. Um reflexo condicionado puramente mecânico de Pavlov sem impacto no pensamento.'
      ],
      correct: 2,
      explanation: 'Em The Electronic Revolution e The Soft Machine, Burroughs formula que a palavra é literalmente um organismo invasor que dita a conversa interna constante (subvocalização).'
    },
    {
      id: 3,
      q: '3. Por que a sintaxe linear (Sujeito + Verbo + Predicado) é descrita por Burroughs como a coleira do Controle?',
      options: [
        'A. Porque ela força o cérebro a pensar no tempo linear falso (pre-sent), na ilusão de um Ego fixo e na obediência mecânica de causa-efeito.',
        'B. Porque é muito difícil de aprender na escola primária.',
        'C. Porque os computadores não conseguem processar sujeitos gramaticais.',
        'D. Porque Wiener proibia o uso de verbos transitivos.'
      ],
      correct: 0,
      explanation: 'A sintaxe linear impõe o tempo pré-gravado das Fitas Mestras e impede o pensamento não-linear e a mutação livre da consciência.'
    },
    {
      id: 4,
      q: '4. Como a Tesoura Cut-Up atua ciberneticamente contra o Estúdio da Realidade?',
      options: [
        'A. Aumentando o controle homeostático e eliminando erros gramaticais.',
        'B. Injetando ruído estocástico maciço no canal para romper o feedback da sintaxe e permitir que o futuro vaze.',
        'C. Criando novos regulamentos sanitários para as impressoras de jornais.',
        'D. Apenas como uma brincadeira de crianças sem qualquer impacto semiótico.'
      ],
      correct: 1,
      explanation: 'Enquanto a cibernética busca ruído zero para garantir a obediência, o Cut-Up usa o ruído entrópico da lâmina para desativar o loop de comando do poder.'
    }
  ];

  const handleSelectQuiz = (qId: number, optIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-10 animate-fade-in font-mono text-xs">
      {/* Banner Principal com a Pergunta Guia */}
      <section className="border border-[#06b6d4]/40 bg-[#040e14]/90 p-6 md:p-8 rounded-lg relative overflow-hidden box-glow">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-xs text-[#67e8f9]">
            <GitMerge className="w-3.5 h-3.5" />
            <span>GENEALOGIA SEMIÓTICA // MAPA DA CONEXÃO CONCEITUAL</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Aonde a Linguística entra e <span className="text-[#06b6d4]">aonde fica Burroughs</span>?
          </h1>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            A Cibernética não opera no vácuo mecânico: ela precisou da <strong>Linguística Estrutural</strong> 
            (Saussure, Jakobson, Chomsky) para transformar o pensamento humano em um <strong>código matemático 
            de comando sem ruído</strong>. É exatamente nesta encruzilhada que surge <strong>William S. Burroughs</strong>: 
            ele aceita que a mente é uma máquina programável, mas faz a denúncia biológica mais radical do século XX — 
            <em>a própria linguagem é um vírus parasita</em> que nos colonizou, e a única saída é a 
            <strong>sabotagem entrópica da sintaxe via Cut-Up</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-[11px] text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-[#86efac]">
              1. Linguística = Engenharia do Código
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-cyan-300">
              2. Cibernética = Engenharia do Canal & Feedback
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-red-400">
              3. Burroughs = A Tesoura de Guerrilha
            </span>
          </div>
        </div>
      </section>

      {/* SELETOR DOS 5 DIAGRAMAS ESTRUTURAIS */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#06b6d4]" />
              DIAGRAMAS ARQUITETURAIS: A MÁQUINA DA LINGUAGEM
            </h2>
            <p className="text-[11px] text-zinc-400">
              Selecione um diagrama para auditar o fluxo de sinal, o circuito de controle e o ponto de ruptura
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('triangle'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'triangle'
                  ? 'bg-[#06b6d4] text-black font-bold shadow-lg shadow-[#06b6d4]/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              01. O Triângulo Semiótico
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('interactive-channel'); }}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeDiagramTab === 'interactive-channel'
                  ? 'bg-[#22c55e] text-black font-bold shadow-lg shadow-[#22c55e]/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-[#22c55e]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>02. Simulador de Canal Interativo</span>
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('virus-anatomy'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'virus-anatomy'
                  ? 'bg-red-500 text-black font-bold shadow-lg shadow-red-500/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              03. Anatomia do Vírus
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('control-circuit'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'control-circuit'
                  ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              04. O Loop do Estúdio
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('cut-up-sabotage'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'cut-up-sabotage'
                  ? 'bg-purple-500 text-black font-bold shadow-lg shadow-purple-500/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              05. A Sabotagem Cut-Up
            </button>
          </div>
        </div>

        {/* CONTAINER DOS DIAGRAMAS */}
        <div className="border border-zinc-800 bg-[#060907] p-6 rounded-lg">
          {/* DIAGRAMA 01: O TRIÂNGULO SEMIÓTICO INTERATIVO */}
          {activeDiagramTab === 'triangle' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-[#06b6d4] font-bold">
                  DIAGRAMA 1 // O ENCONTRO HISTÓRICO: ENGENHARIA, CÓDIGO E GUERRILHA
                </span>
                <span className="text-zinc-500 text-[10px]">CLIQUE NOS VÉRTICES PARA INSPECIONAR</span>
              </div>

              {/* Botões dos 3 Vértices */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedTriangleNode('cib')}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    selectedTriangleNode === 'cib'
                      ? 'border-[#22c55e] bg-[#22c55e]/15 shadow-md shadow-[#22c55e]/10'
                      : 'border-zinc-800 bg-black/60 text-zinc-400 hover:border-[#22c55e]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#22c55e] font-bold text-xs flex items-center gap-1.5">
                      <Radio className="w-4 h-4" />
                      VÉRTICE 1: CIBERNÉTICA
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">1948</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">Engenharia do Canal e Feedback</h4>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    Norbert Wiener e Claude Shannon transformando a mensagem em grandeza mensurável (bit) e suprimindo o ruído.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedTriangleNode('ling')}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    selectedTriangleNode === 'ling'
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-md shadow-cyan-950/20'
                      : 'border-zinc-800 bg-black/60 text-zinc-400 hover:border-cyan-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      VÉRTICE 2: LINGUÍSTICA
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">1916-1957</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">Engenharia do Código e Sintaxe</h4>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    Saussure, Jakobson e Chomsky formalizando a fala em códigos de seleção, combinação e autômatos gramaticais.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedTriangleNode('bur')}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    selectedTriangleNode === 'bur'
                      ? 'border-red-500 bg-red-950/30 shadow-md shadow-red-950/20'
                      : 'border-zinc-800 bg-black/60 text-zinc-400 hover:border-red-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                      <Scissors className="w-4 h-4" />
                      VÉRTICE 3: BURROUGHS
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">1959</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">A Sabotagem Semiótica Viral</h4>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    A revelação da palavra como organismo parasita invasor e o uso da Tesoura Cut-Up para injetar ruído estocástico libertador.
                  </p>
                </button>
              </div>

              {/* Detalhe do Vértice Selecionado */}
              <div className="p-5 rounded-lg bg-black border border-zinc-800 space-y-3">
                {selectedTriangleNode === 'cib' && (
                  <div className="space-y-2 text-zinc-300">
                    <span className="text-[10px] text-[#22c55e] uppercase font-bold block">
                      Auditoria do Vértice 1: Cibernética & Teoria da Informação
                    </span>
                    <p className="text-xs leading-relaxed">
                      Wiener e Shannon buscaram transformar a sociedade e a comunicação em uma rede previsível. 
                      Para que o comando seja obedecido (seja um tiro antiaéreo ou uma ordem civil), <strong>o ruído deve tender a zero</strong>. 
                      A cibernética trata a mente humana como um servomecanismo que subtrai o erro para restaurar a ordem.
                    </p>
                    <div className="p-2.5 rounded bg-zinc-950 border border-[#22c55e]/20 text-[11px] text-[#86efac]">
                      <strong>Axioma Cibernético:</strong> Ordem = Negentropia = Vida. Caos e Ruído = Morte.
                    </div>
                  </div>
                )}

                {selectedTriangleNode === 'ling' && (
                  <div className="space-y-2 text-zinc-300">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold block">
                      Auditoria do Vértice 2: Linguística Estrutural & Gerativa
                    </span>
                    <p className="text-xs leading-relaxed">
                      A linguística forneceu o protocolo formal para a cibernética. Ao retirar o aspecto místico ou espiritual da fala, 
                      Jakobson demonstrou que a língua funciona sob as mesmas regras da engenharia telefônica de Shannon. 
                      Chomsky foi além, descrevendo o cérebro humano como um compilador algorítmico inato que processa sintaxe.
                    </p>
                    <div className="p-2.5 rounded bg-zinc-950 border border-cyan-500/20 text-[11px] text-cyan-200">
                      <strong>Axioma Linguístico:</strong> A mente é uma máquina simbólica programada por regras gramaticais.
                    </div>
                  </div>
                )}

                {selectedTriangleNode === 'bur' && (
                  <div className="space-y-2 text-zinc-300">
                    <span className="text-[10px] text-red-400 uppercase font-bold block">
                      Auditoria do Vértice 3: A Inversão Viral de William S. Burroughs
                    </span>
                    <p className="text-xs leading-relaxed">
                      Burroughs compreendeu o perigo totalitário da convergência entre Cibernética e Linguística: se a mente é um autômato 
                      e a linguagem é um código de comando sem ruído, a humanidade está confinada a um campo de concentração semiótico perpétuo. 
                      Sua resposta foi biológica e bélica: a palavra é um vírus parasita; o homem é uma máquina macia programada pelo vício do poder; 
                      e cortar o texto com estilete é o único ato de liberdade autêntica.
                    </p>
                    <div className="p-2.5 rounded bg-zinc-950 border border-red-500/20 text-[11px] text-red-300">
                      <strong>Axioma de Burroughs:</strong> O ruído entrópico da tesoura Cut-Up é o único antídoto contra a fita mestra do Controle.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DIAGRAMA 02: SIMULADOR DE CANAL INTERATIVO (JAKOBSON vs BURROUGHS) */}
          {activeDiagramTab === 'interactive-channel' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-2">
                <div>
                  <span className="text-[#22c55e] font-bold block">
                    DIAGRAMA 2 // SIMULADOR DE CANAL DE INFORMAÇÃO EM TEMPO REAL
                  </span>
                  <span className="text-zinc-500 text-[10px]">
                    Interaja com a transmissão de comandos e dispare a Tesoura de Burroughs
                  </span>
                </div>

                <button
                  onClick={handleApplyCutUpToChannel}
                  className={`px-3 py-1.5 rounded font-bold uppercase transition-all flex items-center gap-2 ${
                    channelMode === 'linear'
                      ? 'bg-red-600 text-black hover:bg-red-500 shadow-lg shadow-red-600/30'
                      : 'bg-[#22c55e] text-black hover:bg-[#86efac] shadow-lg shadow-[#22c55e]/30'
                  }`}
                >
                  <Scissors className="w-4 h-4" />
                  <span>{channelMode === 'linear' ? 'APLICAR TESOURA DE BURROUGHS' : 'RESTAURAR CANAL WIENERIANO'}</span>
                </button>
              </div>

              {/* Canvas da Transmissão */}
              <div className="border border-zinc-800 bg-black rounded p-2 relative">
                <canvas
                  ref={channelCanvasRef}
                  width={640}
                  height={180}
                  className="w-full h-44 rounded block"
                />
                <div className="absolute top-3 left-4 text-[10px] font-mono text-zinc-400 bg-black/80 px-2 py-0.5 rounded border border-zinc-800">
                  ESTADO ATUAL: <span className={channelMode === 'linear' ? 'text-[#22c55e] font-bold' : 'text-red-400 font-bold'}>
                    {channelMode === 'linear' ? 'ORDEM_WIENER_JAKOBSON (RUÍDO=0)' : 'CORTE_SEMIÓTICO_BURROUGHS (CAOS=ATIVO)'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-[#86efac] font-bold">CANAL LINEAR DE JAKOBSON:</div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    No modo linear, as palavras de comando do Estúdio da Realidade (<em>OBEDEÇA</em>, <em>CONSUMA</em>, <em>HOMEOSTASE</em>) 
                    viajam sem perturbação e colonizam o receptor humano, mantendo o loop de submissão fechado.
                  </p>
                </div>

                <div className="p-3 rounded bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-red-400 font-bold">A TESOURA CUT-UP EM AÇÃO ({cutUpCount} CORTES):</div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Ao ativar a tesoura no meio do canal, o sinal é fatiado e recombinado estocasticamente com palavras de libertação 
                    (<em>FUTURO</em>, <em>SILÊNCIO</em>, <em>VAZAR</em>). O receptor humano desconecta-se do transe.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DIAGRAMA 03: ANATOMIA DO VÍRUS DA PALAVRA */}
          {activeDiagramTab === 'virus-anatomy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-red-400 font-bold">
                  DIAGRAMA 3 // A PARASITOLOGIA SEMIÓTICA DE WILLIAM S. BURROUGHS
                </span>
                <span className="text-zinc-500 text-[10px]">CICLO BIOLÓGICO DE INFECÇÃO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded bg-black border border-red-900/60 space-y-2">
                  <div className="text-red-500 font-bold text-xs flex items-center justify-between">
                    <span>ESTÁGIO 01: INVASÃO</span>
                    <span className="text-[10px] bg-red-950 px-1.5 py-0.5 rounded">ORIGEM</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">Vetor Biológico Exógeno</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    A palavra escrita não surgiu organicamente da consciência do primata. Foi um organismo 
                    parasita microscópico alienígena que invadiu o trato vocal e o cérebro humano em tempos pré-históricos.
                  </p>
                </div>

                <div className="p-4 rounded bg-black border border-red-800/60 space-y-2">
                  <div className="text-red-400 font-bold text-xs flex items-center justify-between">
                    <span>ESTÁGIO 02: SIMBIOSE</span>
                    <span className="text-[10px] bg-red-950 px-1.5 py-0.5 rounded">COLONIZAÇÃO</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">A Subvocalização Compulsiva</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    O vírus atinge estabilidade porque o hospedeiro não percebe a invasão. Ele induz uma conversa 
                    interna ininterrupta ("fala subvocal"), forçando os órgãos vocais a micro-contrações constantes.
                  </p>
                </div>

                <div className="p-4 rounded bg-black border border-red-700/60 space-y-2">
                  <div className="text-amber-400 font-bold text-xs flex items-center justify-between">
                    <span>ESTÁGIO 03: DOGMA</span>
                    <span className="text-[10px] bg-amber-950 px-1.5 py-0.5 rounded">CRIAÇÃO DO EGO</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">A Prisão da Sintaxe Linear</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    O vírus estrutura a cognição na fórmula fixa [Sujeito + Ação + Objeto]. Isso fabrica a 
                    ilusão de uma "identidade racional sólida" e tranca a percepção no tempo mecânico de causa e efeito.
                  </p>
                </div>

                <div className="p-4 rounded bg-black border border-[#22c55e]/60 space-y-2">
                  <div className="text-[#86efac] font-bold text-xs flex items-center justify-between">
                    <span>ESTÁGIO 04: ANTÍDOTO</span>
                    <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded">DESCONEXÃO</span>
                  </div>
                  <h4 className="text-white font-bold text-xs">A Ruptura do Silêncio</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Ao cortar o texto com tesoura e forçar a mente a ler fragmentos imprevisíveis, a subvocalização 
                    trava, o hospedeiro atinge o <strong>Silêncio Neural</strong> e o vírus para de se replicar.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-red-950/20 rounded border border-red-500/30 text-[11px] text-red-200">
                <strong>Citação Canônica (Burroughs, The Electronic Revolution):</strong> 
                <em> "A palavra não foi reconhecida como um vírus porque atingiu um estado de equilíbrio perfeito com o hospedeiro... 
                Quando você silencia a fala interior, a coleira de comando do Controle arrebenta."</em>
              </div>
            </div>
          )}

          {/* DIAGRAMA 04: O LOOP DO ESTÚDIO DA REALIDADE */}
          {activeDiagramTab === 'control-circuit' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-amber-400 font-bold">
                  DIAGRAMA 4 // O CIRCUITO DE CONTROLE: ESTÚDIO DA REALIDADE & MÁQUINAS MACIAS
                </span>
                <span className="text-zinc-500 text-[10px]">CIBERNÉTICA DO PODER POLÍTICO</span>
              </div>

              <div className="p-6 rounded-lg bg-black border border-amber-500/30 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                  <div className="p-4 rounded bg-zinc-950 border border-amber-500/40 w-full md:w-1/4 space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">EMISSOR CENTRAL</span>
                    <h4 className="font-bold text-white text-xs">O Estúdio da Realidade</h4>
                    <p className="text-[10px] text-zinc-400">Fitas Mestras pré-gravadas: Mídia, Estado, Dogmas morais.</p>
                  </div>

                  <div className="text-amber-400 font-bold flex flex-col items-center">
                    <span className="text-[10px] font-mono">COMANDO LINEAR</span>
                    <ArrowRight className="w-5 h-5 hidden md:block" />
                    <ArrowDown className="w-5 h-5 md:hidden" />
                  </div>

                  <div className="p-4 rounded bg-zinc-950 border border-cyan-500/40 w-full md:w-1/4 space-y-1">
                    <span className="text-[10px] text-cyan-400 font-bold block uppercase">CANAL TÉCNICO</span>
                    <h4 className="font-bold text-white text-xs">A Sintaxe Semântica</h4>
                    <p className="text-[10px] text-zinc-400">Linguagem oficial, jornais, algoritmos preditivos dopaminérgicos.</p>
                  </div>

                  <div className="text-cyan-400 font-bold flex flex-col items-center">
                    <span className="text-[10px] font-mono">INFECÇÃO VOCAL</span>
                    <ArrowRight className="w-5 h-5 hidden md:block" />
                    <ArrowDown className="w-5 h-5 md:hidden" />
                  </div>

                  <div className="p-4 rounded bg-zinc-950 border border-red-500/40 w-full md:w-1/4 space-y-1">
                    <span className="text-[10px] text-red-400 font-bold block uppercase">RECEPTOR COLONIZADO</span>
                    <h4 className="font-bold text-white text-xs">A Soft Machine (Humano)</h4>
                    <p className="text-[10px] text-zinc-400">Executa o comando julgando ser seu próprio livre-arbítrio.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-zinc-800 flex items-center justify-center">
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-center max-w-lg text-[10px] text-zinc-400">
                    <span className="text-[#86efac] font-bold block mb-0.5">
                      LOOP DE FEEDBACK REVERSO (MANUTENÇÃO DA HOMEOSTASE SOCIAL):
                    </span>
                    O cidadão dócil vigia e policia o desvio do próximo, devolvendo sinal de conformidade ao Estúdio. 
                    O circuito fecha-se como a Equação do Junk de Burroughs: $1 \rightarrow 0 \rightarrow 1$.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DIAGRAMA 05: A SABOTAGEM CUT-UP */}
          {activeDiagramTab === 'cut-up-sabotage' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-purple-400 font-bold">
                  DIAGRAMA 5 // A TESOURA DE GYSIN COMO DISJUNTOR CIBERNÉTICO
                </span>
                <span className="text-zinc-500 text-[10px]">A INJEÇÃO ESTRATÉGICA DE RUÍDO</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded bg-black border border-red-500/30 space-y-3">
                  <span className="text-[10px] text-red-400 font-bold block uppercase">
                    O PLANO DO CONTROLE (WIENER & SHANNON):
                  </span>
                  <div className="p-3 bg-zinc-950 rounded border border-zinc-900 font-mono text-[11px] text-zinc-300">
                    Mensagem Original: <br />
                    <span className="text-red-300">"O cidadão exemplar obedece às diretrizes para manter a estabilidade."</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-zinc-400">
                    <li>• Sintaxe 100% linear e previsível.</li>
                    <li>• Ruído estocástico eliminado rigorosamente.</li>
                    <li>• O feedback tranca o indivíduo no papel prescrito.</li>
                  </ul>
                </div>

                <div className="p-5 rounded bg-black border border-[#22c55e]/50 space-y-3">
                  <span className="text-[10px] text-[#22c55e] font-bold block uppercase">
                    A INTERVENÇÃO DA TESOURA CUT-UP:
                  </span>
                  <div className="p-3 bg-zinc-950 rounded border border-[#22c55e]/30 font-mono text-[11px] text-[#86efac]">
                    Recombinação [Q4 // Q1 // Q3 // Q2]: <br />
                    <span className="text-white">"A estabilidade // O cidadão exemplar // diretrizes para manter // obedece às."</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-zinc-300">
                    <li>• A lógica de causa e efeito desaba instantaneamente.</li>
                    <li>• A fita mestra do estúdio vaza significados ocultos.</li>
                    <li>• O cérebro liberta-se da repetição mecânica do parasita.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GENEALOGIA COMPARATIVA DOS LINGUISTAS & A RÉPLICA DE BURROUGHS */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            O DIÁLOGO CRÍTICO: OS GRANDES LINGUISTAS vs. BURROUGHS
          </h2>
          <p className="text-[11px] text-zinc-400">
            Selecione uma figura histórica para auditar sua formulação teórica e como Burroughs desconstrói sua premissa
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LINGUISTIC_GENEALOGY.map((fig) => {
            const isSelected = selectedFigure.name === fig.name;
            return (
              <button
                key={fig.name}
                onClick={() => setSelectedFigure(fig)}
                className={`p-3 text-left rounded border transition-all ${
                  isSelected
                    ? 'border-[#06b6d4] bg-[#06b6d4]/15 text-white font-bold'
                    : 'border-zinc-800 bg-black/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="text-[10px] text-cyan-400 font-mono">{fig.period}</div>
                <div className="text-xs line-clamp-1">{fig.name}</div>
              </button>
            );
          })}
        </div>

        {/* Detalhamento do Linguista Selecionado */}
        <div className="border border-zinc-800 bg-[#070b08] p-6 rounded-lg space-y-4">
          <div className="border-b border-zinc-800 pb-3 flex flex-wrap justify-between items-center gap-2">
            <div>
              <span className="text-[10px] text-[#06b6d4] uppercase font-mono block">
                {selectedFigure.framework}
              </span>
              <h3 className="text-base font-bold text-white">{selectedFigure.name}</h3>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">{selectedFigure.period}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2 bg-black/60 p-4 rounded border border-zinc-800">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                1. Contribuição Linguística & Conexão Cibernética:
              </span>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                {selectedFigure.concept}
              </p>
              <div className="text-[10px] text-zinc-400 pt-2 border-t border-zinc-900">
                <strong>Ponte Cibernética:</strong> {selectedFigure.cyberneticConnection}
              </div>
            </div>

            <div className="space-y-2 bg-red-950/20 p-4 rounded border border-red-500/30">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                2. A Réplica & Sabotagem de William S. Burroughs:
              </span>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                {selectedFigure.burroughsCritique}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AS 4 RECAPITULAÇÕES ESTRUTURADAS (SÍNTESE DEFINITIVA) */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            RECAPITULAÇÃO GERAL: OS 4 PASSOS DA EQUAÇÃO
          </h2>
          <p className="text-[11px] text-zinc-400">
            Síntese didática passo a passo para compreender a fusão Cibernética + Linguística + Burroughs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECAPITULATIONS.map((recap) => (
            <div 
              key={recap.number}
              className="p-5 rounded-lg bg-black border border-zinc-800 hover:border-[#22c55e]/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-[#22c55e] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center text-[10px] font-mono border border-[#22c55e]/30">
                    {recap.number}
                  </span>
                  {recap.title}
                </span>
              </div>

              <div className="text-[11px] text-amber-300/90 font-bold italic">
                "{recap.question}"
              </div>

              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {recap.coreSynthesis}
              </p>

              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-[#86efac] font-mono">
                <span className="text-zinc-500 block uppercase text-[9px]">Fórmula Teórica:</span>
                {recap.cyberneticFormula}
              </div>

              <div className="text-[10px] text-red-300/90 border-t border-zinc-900 pt-1.5">
                <strong>Contra-Ação de Burroughs:</strong> {recap.burroughsCounterAction}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDITORIA DE ASSIMILAÇÃO EPISTEMOLÓGICA (QUIZ INTERATIVO) */}
      <section className="border border-amber-500/30 bg-[#080a06] p-6 rounded-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>TESTE DE ASSIMILAÇÃO COGNITIVA // AUDITORIA FINAL</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Auditoria Epistemológica: Teste sua Compreensão da Matriz
            </h3>
          </div>

          {quizSubmitted && (
            <div className="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-500 text-amber-300 font-bold text-xs">
              PONTUAÇÃO: {calculateScore()} / {QUIZ_QUESTIONS.length} ACERTOS
            </div>
          )}
        </div>

        <div className="space-y-6">
          {QUIZ_QUESTIONS.map(q => {
            const selectedOpt = quizAnswers[q.id];
            const isCorrect = selectedOpt === q.correct;
            return (
              <div key={q.id} className="p-4 rounded bg-black border border-zinc-800 space-y-3">
                <h4 className="text-white font-bold text-xs">{q.q}</h4>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuiz(q.id, idx)}
                        className={`p-2.5 text-left rounded text-xs transition-all border ${
                          isSelected
                            ? quizSubmitted
                              ? idx === q.correct
                                ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#86efac]'
                                : 'bg-red-500/20 border-red-500 text-red-300'
                              : 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className={`p-2.5 rounded text-[11px] border ${
                    isCorrect
                      ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#86efac]'
                      : 'bg-red-950/20 border-red-500/30 text-red-300'
                  }`}>
                    <strong>Explicação:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => { onTriggerGlitch(); setQuizSubmitted(true); }}
            className="px-4 py-2 rounded bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>SUBMETER RESPOSTAS & AUDITAR RESULTADO</span>
          </button>
        </div>
      </section>
    </div>
  );
};
