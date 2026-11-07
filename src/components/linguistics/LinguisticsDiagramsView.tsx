import React, { useState } from 'react';
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
  BookOpen
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
  const [activeDiagramTab, setActiveDiagramTab] = useState<'triangle' | 'virus-anatomy' | 'control-circuit' | 'cut-up-sabotage'>('triangle');
  const [selectedFigure, setSelectedFigure] = useState<LinguisticFigure>(LINGUISTIC_GENEALOGY[1]); // Jakobson por padrão

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

      {/* SELETOR DOS 4 DIAGRAMAS ESTRUTURAIS */}
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
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('virus-anatomy'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'virus-anatomy'
                  ? 'bg-red-500 text-black font-bold shadow-lg shadow-red-500/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              02. Anatomia do Vírus
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('control-circuit'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'control-circuit'
                  ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              03. O Loop do Estúdio
            </button>
            <button
              onClick={() => { onTriggerGlitch(); setActiveDiagramTab('cut-up-sabotage'); }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeDiagramTab === 'cut-up-sabotage'
                  ? 'bg-[#22c55e] text-black font-bold shadow-lg shadow-[#22c55e]/20'
                  : 'bg-black text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              04. A Sabotagem Cut-Up
            </button>
          </div>
        </div>

        {/* CONTAINER DOS DIAGRAMAS INTERATIVOS */}
        <div className="border border-zinc-800 bg-[#060907] p-6 rounded-lg">
          {/* DIAGRAMA 01: O TRIÂNGULO SEMIÓTICO-CIBERNÉTICO */}
          {activeDiagramTab === 'triangle' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-[#06b6d4] font-bold">
                  DIAGRAMA 1 // O ENCONTRO HISTÓRICO: ENGENHARIA, CÓDIGO E GUERRILHA
                </span>
                <span className="text-zinc-500 text-[10px]">RELAÇÃO TRIPARTITE</span>
              </div>

              {/* Diagrama Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Vértice 1: Cibernética */}
                <div className="p-5 rounded-lg bg-black border border-[#22c55e]/40 space-y-3 relative group hover:border-[#22c55e] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30">
                      <Radio className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] text-[#86efac]">VÉRTICE_A</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Cibernética & Teoria da Informação</h3>
                  <div className="text-[11px] text-zinc-400">
                    <strong>Protagonistas:</strong> Norbert Wiener & Claude Shannon (1948).
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    A informação é tratada como grandeza matemática. O objetivo máximo é transmitir ordens 
                    e sinais com <strong>ruído tendendo a zero</strong> para garantir que o receptor execute 
                    o comando do sistema sem deriva entrópica.
                  </p>
                  <div className="p-2 rounded bg-zinc-950 border border-[#22c55e]/20 text-[10px] text-[#86efac]">
                    <strong>Papel:</strong> Cria a infraestrutura do Canal, o Bit e o Loop de Feedback.
                  </div>
                </div>

                {/* Vértice 2: Linguística */}
                <div className="p-5 rounded-lg bg-black border border-cyan-500/40 space-y-3 relative group hover:border-cyan-400 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <FileText className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] text-cyan-300">VÉRTICE_B</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Linguística Estrutural & Gerativa</h3>
                  <div className="text-[11px] text-zinc-400">
                    <strong>Protagonistas:</strong> Saussure (1916), Jakobson (1956), Chomsky (1957).
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    Formaliza a linguagem humana como um <strong>código abstrato e fechado</strong> regido por regras 
                    matemáticas (eixos de seleção/combinação e árvores sintáticas). A mente humana vira um autômato 
                    processador de gramáticas.
                  </p>
                  <div className="p-2 rounded bg-zinc-950 border border-cyan-500/20 text-[10px] text-cyan-200">
                    <strong>Papel:</strong> Fornece a sintaxe, o dicionário e a estrutura formal do código.
                  </div>
                </div>

                {/* Vértice 3: Burroughs */}
                <div className="p-5 rounded-lg bg-black border border-red-500/40 space-y-3 relative group hover:border-red-500 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 rounded bg-red-500/10 text-red-500 border border-red-500/30">
                      <Scissors className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] text-red-400">VÉRTICE_C</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">A Guerrilha Semiótica de Burroughs</h3>
                  <div className="text-[11px] text-zinc-400">
                    <strong>Protagonistas:</strong> William S. Burroughs & Brion Gysin (1959).
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    Se a linguagem é um código que opera a mente humana como máquina, então <strong>a palavra é um vírus 
                    parasita alienígena</strong>. A sintaxe linear é a coleira do controle social. A única libertação 
                    é a injeção forçada de ruído entrópico via <strong>Cut-Up</strong>.
                  </p>
                  <div className="p-2 rounded bg-zinc-950 border border-red-500/20 text-[10px] text-red-300">
                    <strong>Papel:</strong> Corta o canal, destrói o código e sabota o feedback da máquina.
                  </div>
                </div>
              </div>

              {/* Conector Central Sintético */}
              <div className="p-4 rounded bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="text-white font-bold text-xs">A SÍNTESE DO VÍNCULO:</div>
                  <div className="text-zinc-400 text-[11px]">
                    A Cibernética forneceu o motor de telecomando; a Linguística forneceu o protocolo de software; 
                    Burroughs revelou a infecção e forneceu a lâmina de desprogramação.
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToExperiments('language-virus')}
                  className="px-3 py-1.5 rounded bg-[#06b6d4] text-black font-bold whitespace-nowrap hover:bg-[#67e8f9] transition-all flex items-center gap-1.5"
                >
                  <span>Testar no Laboratório</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* DIAGRAMA 02: ANATOMIA DO VÍRUS DA PALAVRA */}
          {activeDiagramTab === 'virus-anatomy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-red-400 font-bold">
                  DIAGRAMA 2 // A PARASITOLOGIA SEMIÓTICA DE WILLIAM S. BURROUGHS
                </span>
                <span className="text-zinc-500 text-[10px]">CICLO BIOLÓGICO DE INFECÇÃO</span>
              </div>

              {/* Fluxograma Horizontal de Estágios */}
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

          {/* DIAGRAMA 03: O LOOP DO ESTÚDIO DA REALIDADE */}
          {activeDiagramTab === 'control-circuit' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-amber-400 font-bold">
                  DIAGRAMA 3 // O CIRCUITO DE CONTROLE: ESTÚDIO DA REALIDADE & MÁQUINAS MACIAS
                </span>
                <span className="text-zinc-500 text-[10px]">CIBERNÉTICA DO PODER POLÍTICO</span>
              </div>

              {/* Circuito em Caixa de Bloco */}
              <div className="p-6 rounded-lg bg-black border border-amber-500/30 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                  {/* Bloco 1 */}
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

                  {/* Bloco 2 */}
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

                  {/* Bloco 3 */}
                  <div className="p-4 rounded bg-zinc-950 border border-red-500/40 w-full md:w-1/4 space-y-1">
                    <span className="text-[10px] text-red-400 font-bold block uppercase">RECEPTOR COLONIZADO</span>
                    <h4 className="font-bold text-white text-xs">A Soft Machine (Humano)</h4>
                    <p className="text-[10px] text-zinc-400">Executa o comando julgando ser seu próprio livre-arbítrio.</p>
                  </div>
                </div>

                {/* Linha de Feedback de Volta */}
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

          {/* DIAGRAMA 04: A SABOTAGEM CUT-UP */}
          {activeDiagramTab === 'cut-up-sabotage' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="text-[#22c55e] font-bold">
                  DIAGRAMA 4 // A TESOURA DE GYSIN COMO DISJUNTOR CIBERNÉTICO
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
    </div>
  );
};
