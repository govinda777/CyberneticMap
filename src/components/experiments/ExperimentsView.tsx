import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Layers, 
  Biohazard, 
  Play, 
  Pause, 
  RefreshCw, 
  Activity, 
  Radio, 
  Eye, 
  Crosshair, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Disc,
  Flame,
  ArrowRight
} from 'lucide-react';
import { EXPERIMENT_GROUPS, EXPERIMENTS_LIST } from '../../data/experimentsData';
import { VIRAL_PACKETS, COMMAND_WORDS } from '../../data/viralPackets';
import { ExperimentGroupId } from '../../types';

interface ExperimentsViewProps {
  initialGroupId?: ExperimentGroupId;
  onTriggerGlitch: () => void;
}

export const ExperimentsView: React.FC<ExperimentsViewProps> = ({ 
  initialGroupId = 'language-virus',
  onTriggerGlitch 
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<ExperimentGroupId>(initialGroupId);

  // ========================================================
  // ESTADO DO EXPERIMENTO 1: A LINGUAGEM É UM VÍRUS
  // ========================================================
  const [selectedPacketId, setSelectedPacketId] = useState<string>(VIRAL_PACKETS[0].id);
  const [customText, setCustomText] = useState<string>(VIRAL_PACKETS[0].primaryText);
  const [secondaryText, setSecondaryText] = useState<string>(VIRAL_PACKETS[0].secondaryText);
  const [currentText, setCurrentText] = useState<string>(VIRAL_PACKETS[0].primaryText);
  const [isInfected, setIsInfected] = useState<boolean>(false);
  const [viralLoad, setViralLoad] = useState<number>(18);
  const [syntacticRigidity, setSyntacticRigidity] = useState<number>(25);
  const [generativeChaos, setGenerativeChaos] = useState<number>(75);
  const [quadrants, setQuadrants] = useState<{ q1: string; q2: string; q3: string; q4: string } | null>(null);
  const [mutationLogs, setMutationLogs] = useState<string[]>([
    '[INIT] Sistema de laboratório semiótico online. Aguardando inoculação de pacote viral.'
  ]);

  // Fita Cassete e Web Audio API
  const [isPlayingTape, setIsPlayingTape] = useState<boolean>(false);
  const [tapeSpeed, setTapeSpeed] = useState<number>(1.0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Canvas da Rede Neural Viral
  const neuralCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ========================================================
  // ESTADO DO EXPERIMENTO 2: FEEDBACK & SERVOMECANISMOS
  // ========================================================
  const [wienerGain, setWienerGain] = useState<number>(70);
  const [windPerturbation, setWindPerturbation] = useState<number>(30);
  const [feedbackMode, setFeedbackMode] = useState<'negative' | 'positive'>('negative');
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ========================================================
  // ESTADO DO EXPERIMENTO 3: HOMEOSTATO DE ASHBY
  // ========================================================
  const [homeostatUnits, setHomeostatUnits] = useState<number[]>([0, 0, 0, 0]);
  const [ashbyShockActive, setAshbyShockActive] = useState<boolean>(false);
  const [ashbyAdaptCount, setAshbyAdaptCount] = useState<number>(0);

  // ========================================================
  // ESTADO DO EXPERIMENTO 4: SHANNON NOISY CHANNEL
  // ========================================================
  const [shannonSourceText, setShannonSourceText] = useState<string>('ORDEM CIBERNETICA');
  const [channelNoise, setChannelNoise] = useState<number>(25);
  const [useRedundancy, setUseRedundancy] = useState<boolean>(true);

  // ========================================================
  // ESTADO DO EXPERIMENTO 5: PONTO CEGO DO OBSERVADOR
  // ========================================================
  const [blindSpotDistance, setBlindSpotDistance] = useState<number>(45);

  // ========================================================
  // LOGICA: EXPERIMENTO 1 (A LINGUAGEM É UM VÍRUS)
  // ========================================================

  const handleSelectPacket = (packetId: string) => {
    const packet = VIRAL_PACKETS.find(p => p.id === packetId);
    if (!packet) return;
    setSelectedPacketId(packet.id);
    setCustomText(packet.primaryText);
    setSecondaryText(packet.secondaryText);
    setCurrentText(packet.primaryText);
    setIsInfected(false);
    setViralLoad(15);
    setSyntacticRigidity(20);
    setGenerativeChaos(80);
    setQuadrants(null);
    setMutationLogs(prev => [
      `[PACOTE CARREGADO] "${packet.name}" injetado na câmara.`,
      ...prev.slice(0, 8)
    ]);
  };

  const inoculateVirus = () => {
    onTriggerGlitch();
    const base = customText.trim() || VIRAL_PACKETS[0].primaryText;
    const infected = `${base} [COMANDO DE CONTROLE: A ORDEM É A ÚNICA VIDA] ${base.toUpperCase()}`;
    setCurrentText(infected);
    setIsInfected(true);
    setViralLoad(96);
    setSyntacticRigidity(95);
    setGenerativeChaos(5);
    setQuadrants(null);
    setMutationLogs(prev => [
      '[BIOHAZARD] Vírus da palavra inoculado com sucesso. Sintaxe linear trancada.',
      ...prev.slice(0, 8)
    ]);
  };

  const applyCutUp = () => {
    onTriggerGlitch();
    const words = currentText.split(/\s+/).filter(Boolean);
    if (words.length < 4) return;

    const quarter = Math.ceil(words.length / 4);
    const q1 = words.slice(0, quarter).join(' ');
    const q2 = words.slice(quarter, quarter * 2).join(' ');
    const q3 = words.slice(quarter * 2, quarter * 3).join(' ');
    const q4 = words.slice(quarter * 3).join(' ');

    setQuadrants({ q1, q2, q3, q4 });

    // Fatiamento canônico de Burroughs: Q4 // Q1 // Q3 // Q2
    const cutUpResult = `${q4} // ${q1} // ${q3} // ${q2}`;
    setCurrentText(cutUpResult);

    setViralLoad(prev => Math.max(10, prev - 35));
    setSyntacticRigidity(prev => Math.max(12, prev - 45));
    setGenerativeChaos(prev => Math.min(98, prev + 45));
    setMutationLogs(prev => [
      '[TESOURA CUT-UP] Página fatiada em 4 quadrantes [Q4 // Q1 // Q3 // Q2]. Loop quebrado.',
      ...prev.slice(0, 8)
    ]);
  };

  const applyFoldIn = () => {
    onTriggerGlitch();
    const wordsA = currentText.split(/\s+/).filter(Boolean);
    const wordsB = secondaryText.split(/\s+/).filter(Boolean);

    const merged: string[] = [];
    const maxLen = Math.max(wordsA.length, wordsB.length);
    for (let i = 0; i < maxLen; i++) {
      if (wordsA[i]) merged.push(wordsA[i]);
      if (wordsB[i] && i % 2 === 0) merged.push(`[${wordsB[i]}]`);
    }

    setCurrentText(merged.join(' '));
    setViralLoad(prev => Math.max(15, prev - 25));
    setSyntacticRigidity(prev => Math.max(18, prev - 30));
    setGenerativeChaos(prev => Math.min(95, prev + 35));
    setMutationLogs(prev => [
      '[FOLD-IN] Fita temporal dobrada com texto exógeno beatnik. Ruído poético inserido.',
      ...prev.slice(0, 8)
    ]);
  };

  const applyCommandScramble = () => {
    onTriggerGlitch();
    const words = currentText.split(/\s+/).map(w => {
      const clean = w.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúçñ]/gi, '');
      if (COMMAND_WORDS.includes(clean)) {
        return `[NULO:${clean.split('').reverse().join('')}]`;
      }
      return w;
    });

    setCurrentText(words.join(' '));
    setViralLoad(prev => Math.max(5, prev - 30));
    setSyntacticRigidity(prev => Math.max(8, prev - 40));
    setGenerativeChaos(prev => Math.min(99, prev + 40));
    setMutationLogs(prev => [
      '[SCRAMBLE] Palavras de comando neutralizadas e invertidas no buffer.',
      ...prev.slice(0, 8)
    ]);
  };

  // Web Audio Synth para Fita Cassete
  const toggleTapePlayback = () => {
    try {
      if (isPlayingTape) {
        setIsPlayingTape(false);
        if (audioContextRef.current) {
          audioContextRef.current.suspend();
        }
      } else {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Gera som lo-fi de fita cassete (ruído filtrado + zumbido 60Hz)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.08;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800 * tapeSpeed;
        filter.Q.value = 3.0;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        noiseNodeRef.current = whiteNoise;
        setIsPlayingTape(true);
      }
    } catch {
      // Fallback gracioso caso Web Audio seja restrito no navegador
      setIsPlayingTape(!isPlayingTape);
    }
  };

  // Canvas da Rede Neural Viral
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const nodesCount = 20;
    const nodes = Array.from({ length: nodesCount }, (_, i) => ({
      x: 30 + (i % 5) * 60 + Math.random() * 15,
      y: 30 + Math.floor(i / 5) * 45 + Math.random() * 15,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      isInfected: false
    }));

    const render = () => {
      ctx.fillStyle = '#030703';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Movimentação dos nós
      nodes.forEach((node, idx) => {
        if (!isInfected) {
          node.x += node.vx * (generativeChaos / 50);
          node.y += node.vy * (generativeChaos / 50);
          if (node.x < 10 || node.x > canvas.width - 10) node.vx *= -1;
          if (node.y < 10 || node.y > canvas.height - 10) node.vy *= -1;
        } else {
          // Quando infectado, os nós congelam em formação geométrica rígida
          const targetX = 35 + (idx % 5) * 60;
          const targetY = 35 + Math.floor(idx / 5) * 45;
          node.x += (targetX - node.x) * 0.1;
          node.y += (targetY - node.y) * 0.1;
        }

        // Conexões sinápticas
        nodes.forEach((otherNode, oIdx) => {
          if (idx >= oIdx) return;
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = isInfected 
              ? `rgba(239, 68, 68, ${0.8 - dist / 90})`
              : `rgba(34, 197, 94, ${0.5 - dist / 120})`;
            ctx.lineWidth = isInfected ? 1.5 : 0.8;
            ctx.stroke();
          }
        });

        // Desenha o nó
        ctx.beginPath();
        ctx.arc(node.x, node.y, isInfected ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isInfected ? '#ef4444' : '#22c55e';
        ctx.shadowColor = isInfected ? '#ef4444' : '#22c55e';
        ctx.shadowBlur = isInfected ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isInfected, generativeChaos]);

  // ========================================================
  // LOGICA: EXPERIMENTO 2 (PREDITOR ANTIAÉREO DE WIENER)
  // ========================================================
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let targetX = 150;
    let targetY = 100;
    let turretAngle = 0;

    const renderRadar = () => {
      t += 0.03;
      // Movimento estocástico suave do alvo aéreo
      targetX = canvas.width / 2 + Math.cos(t * 0.9) * 90 + Math.sin(t * 2.1) * 30;
      targetY = canvas.height / 2 + Math.sin(t * 0.7) * 70 + (Math.random() - 0.5) * (windPerturbation * 0.15);

      // Centro do radar (arma antiaérea)
      const gunX = canvas.width / 2;
      const gunY = canvas.height - 20;

      // Cálculo de predição do tiro
      const dx = targetX - gunX;
      const dy = targetY - gunY;
      const idealAngle = Math.atan2(dy, dx);

      // Loop de correção
      const kP = wienerGain / 100;
      if (feedbackMode === 'negative') {
        turretAngle += (idealAngle - turretAngle) * kP * 0.2;
      } else {
        // Feedback positivo cria descontrole exponencial
        turretAngle += (idealAngle - turretAngle) * -kP * 0.15 + (Math.random() - 0.5) * 0.3;
      }

      // Fundo Radar militar
      ctx.fillStyle = '#030803';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Círculos concêntricos do radar
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
      ctx.lineWidth = 1;
      for (let r = 40; r < 200; r += 40) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Linha de varredura
      const sweepX = canvas.width / 2 + Math.cos(t * 2) * 180;
      const sweepY = canvas.height / 2 + Math.sin(t * 2) * 180;
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Desenha o Alvo (Avião inimigo em voo)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(targetX - 9, targetY - 9, 18, 18);

      // Traçado do vetor da mira do canhão
      const barrelLen = 65;
      const barrelEndX = gunX + Math.cos(turretAngle) * barrelLen;
      const barrelEndY = gunY + Math.sin(turretAngle) * barrelLen;

      ctx.strokeStyle = feedbackMode === 'negative' ? '#22c55e' : '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(gunX, gunY);
      ctx.lineTo(barrelEndX, barrelEndY);
      ctx.stroke();

      // Linha preditiva pontilhada
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = feedbackMode === 'negative' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)';
      ctx.beginPath();
      ctx.moveTo(barrelEndX, barrelEndY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(renderRadar);
    };

    renderRadar();
    return () => cancelAnimationFrame(animId);
  }, [wienerGain, windPerturbation, feedbackMode]);

  // ========================================================
  // LOGICA: EXPERIMENTO 3 (HOMEOSTATO DE ASHBY)
  // ========================================================
  const triggerAshbyShock = () => {
    setAshbyShockActive(true);
    setAshbyAdaptCount(prev => prev + 1);

    // Desloca agulhas violentamente
    setHomeostatUnits([
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 90,
      (Math.random() - 0.5) * 75,
      (Math.random() - 0.5) * 85
    ]);

    // Simula a busca cega por novo equilíbrio
    const timer = setInterval(() => {
      setHomeostatUnits(prev => {
        const next = prev.map(val => val * 0.72);
        const isStable = next.every(v => Math.abs(v) < 1.5);
        if (isStable) {
          clearInterval(timer);
          setAshbyShockActive(false);
          return [0, 0, 0, 0];
        }
        return next;
      });
    }, 120);
  };

  // ========================================================
  // LOGICA: EXPERIMENTO 4 (SHANNON NOISY CHANNEL)
  // ========================================================
  const corruptedChannelData = useMemo(() => {
    const chars = shannonSourceText.split('');
    const noiseFrac = channelNoise / 100;
    const noisyChars = chars.map(ch => {
      if (Math.random() < noiseFrac) {
        const randCode = 65 + Math.floor(Math.random() * 26);
        return String.fromCharCode(randCode);
      }
      return ch;
    });

    const parityRecovered = noisyChars.map((ch, idx) => {
      if (useRedundancy && chars[idx]) {
        // Simulação de código de repetição/Hamming (recupera 70% dos erros com redundância)
        return Math.random() > noiseFrac * 0.35 ? chars[idx] : ch;
      }
      return ch;
    });

    return {
      received: noisyChars.join(''),
      recovered: parityRecovered.join('')
    };
  }, [shannonSourceText, channelNoise, useRedundancy]);

  const activeGroup = EXPERIMENT_GROUPS.find(g => g.id === selectedGroupId) || EXPERIMENT_GROUPS[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho da Página de Experimentos */}
      <section className="border border-[#06b6d4]/40 bg-[#040d12]/90 p-6 md:p-8 rounded-lg relative overflow-hidden box-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-xs text-[#67e8f9] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LABORATÓRIO DE EXPERIMENTOS CIBERNÉTICOS & GUERRILHA SEMIÓTICA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Bancada Experimental: <span className="text-[#06b6d4]">Ideias em Ação</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Explore os simuladores interativos organizados por <strong>núcleos conceituais</strong>. 
              Da desprogramação viral da palavra formulada por Burroughs às equações balísticas 
              de Norbert Wiener e a auto-estabilização cega do Homeostato de Ross Ashby.
            </p>
          </div>

          <div className="p-3 bg-black/60 rounded border border-[#06b6d4]/30 font-mono text-xs text-zinc-400 space-y-1">
            <div className="text-[#67e8f9] font-bold">TELEMETRIA DO LAB:</div>
            <div>STATUS: <span className="text-[#22c55e]">INTERATIVO_ONLINE</span></div>
            <div>MÓDULOS_DISPONÍVEIS: 5</div>
          </div>
        </div>

        {/* Barra de Filtro / Seleção por Ideias */}
        <div className="mt-6 pt-4 border-t border-[#06b6d4]/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-zinc-400 uppercase font-mono mr-2 hidden sm:inline">
            AGRUPAR POR IDEIA:
          </span>
          {EXPERIMENT_GROUPS.map((group) => {
            const isSelected = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id as ExperimentGroupId)}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? group.id === 'language-virus'
                      ? 'bg-red-500 text-black shadow-lg shadow-red-500/20'
                      : 'bg-[#06b6d4] text-black shadow-lg shadow-[#06b6d4]/20'
                    : 'bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {group.id === 'language-virus' ? (
                  <Biohazard className="w-3.5 h-3.5 text-black" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-black" />
                )}
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sumário da Ideia Selecionada */}
      <div className="p-4 rounded-lg bg-black/50 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-zinc-500 font-mono uppercase text-[10px] block">Núcleo Epistemológico:</span>
          <h2 className="text-base font-bold text-white">{activeGroup.title} // {activeGroup.subtitle}</h2>
          <p className="text-zinc-400 italic font-mono mt-0.5">{activeGroup.quote} — {activeGroup.author}</p>
        </div>
        <p className="text-zinc-300 max-w-xl text-[11px] leading-relaxed hidden lg:block">
          {activeGroup.description}
        </p>
      </div>

      {/* ======================================================== */}
      {/* 01. IDEIA: A LINGUAGEM É UM VÍRUS (DESTAQUE MÁXIMO) */}
      {/* ======================================================== */}
      {selectedGroupId === 'language-virus' && (
        <div className="space-y-8 animate-fade-in">
          {/* Seletor de Pacotes de Controle */}
          <div className="border border-red-500/30 bg-[#0d0404] p-5 rounded-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Biohazard className="w-4 h-4 text-red-500" />
                  FASE 1: INOCULAÇÃO DO VÍRUS DA LINGUAGEM LINEAR
                </h3>
                <p className="text-xs text-zinc-400">
                  Carregue um vetor semiótico de controle institucional ou insira sua própria sintaxe
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={inoculateVirus}
                  className="px-3 py-1.5 rounded bg-red-600 text-black font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>INOCULAR VÍRUS NO SISTEMA</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {VIRAL_PACKETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPacket(p.id)}
                  className={`p-2.5 text-left rounded border text-xs transition-all ${
                    selectedPacketId === p.id
                      ? 'border-red-500 bg-red-950/40 text-white font-bold'
                      : 'border-zinc-800 bg-black/60 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-[10px] text-red-400 font-mono mb-1">{p.category}</div>
                  <div className="line-clamp-1">{p.name}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">
                  Texto Primário (Vetor de Controle):
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    setCurrentText(e.target.value);
                  }}
                  rows={3}
                  className="w-full bg-black border border-zinc-800 p-2 text-xs text-[#86efac] font-mono rounded focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">
                  Texto Exógeno para Dobradura (Fold-In Beatnik):
                </label>
                <textarea
                  value={secondaryText}
                  onChange={(e) => setSecondaryText(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-zinc-800 p-2 text-xs text-amber-300/80 font-mono rounded focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bancada de Ruptura: Cut-Up, Fold-In e Scrambler */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="border border-[#22c55e]/30 bg-[#060a06] p-5 rounded-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22c55e]/20 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-[#22c55e]" />
                      FASE 2: ARSENAL DE CORTE & DESPROGRAMAÇÃO (BRION GYSIN)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Disjuntores entrópicos que quebram o feedback da sintaxe de controle
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={applyCutUp}
                      className="px-3 py-1.5 rounded bg-[#22c55e] text-black font-bold text-xs hover:bg-[#86efac] transition-all flex items-center gap-1.5"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>TESOURA CUT-UP (4Q)</span>
                    </button>
                    <button
                      onClick={applyFoldIn}
                      className="px-3 py-1.5 rounded bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>FOLD-IN TEMPORAL</span>
                    </button>
                    <button
                      onClick={applyCommandScramble}
                      className="px-3 py-1.5 rounded bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>SCRAMBLE DE COMANDOS</span>
                    </button>
                  </div>
                </div>

                {/* Display do Texto Mutado */}
                <div className="p-4 bg-black rounded border border-[#22c55e]/40 font-mono text-xs leading-relaxed space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-800 pb-1.5">
                    <span>BUFFER ATUAL DE SAÍDA:</span>
                    <span>CARACTERES: {currentText.length}</span>
                  </div>
                  <div className="text-[#86efac] whitespace-pre-wrap selection:bg-[#22c55e] selection:text-black min-h-24">
                    {currentText}
                  </div>
                </div>

                {/* Visualização dos 4 Quadrantes do Cut-Up */}
                {quadrants && (
                  <div className="p-3 bg-black/80 rounded border border-dashed border-[#22c55e]/50 space-y-2">
                    <span className="text-[10px] font-mono text-[#22c55e] font-bold block">
                      DECOMPOSIÇÃO NOS 4 QUADRANTES DE GYSIN // ORDEM DE CORTE [Q4 // Q1 // Q3 // Q2]:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded">
                        <span className="text-[#22c55e] font-bold block">[Q1]</span>
                        <span className="text-zinc-300">{quadrants.q1}</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded">
                        <span className="text-[#22c55e] font-bold block">[Q2]</span>
                        <span className="text-zinc-300">{quadrants.q2}</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded">
                        <span className="text-[#22c55e] font-bold block">[Q3]</span>
                        <span className="text-zinc-300">{quadrants.q3}</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded">
                        <span className="text-[#22c55e] font-bold block">[Q4]</span>
                        <span className="text-zinc-300">{quadrants.q4}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Simulador de Fita Cassete Analógica com Web Audio */}
              <div className="border border-zinc-800 bg-[#070b07] p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full border ${
                    isPlayingTape ? 'border-[#22c55e] bg-[#22c55e]/20 animate-spin' : 'border-zinc-700 bg-black'
                  }`}>
                    <Disc className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">GRAVADOR DE FITAS MAGNÉTICAS:</span>
                    <h4 className="text-xs font-bold text-white">Simulador de Fita Mestra & Eco Analógico</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                    <span>VELOCIDADE:</span>
                    {[0.5, 1.0, 1.5].map(speed => (
                      <button
                        key={speed}
                        onClick={() => setTapeSpeed(speed)}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          tapeSpeed === speed 
                            ? 'bg-[#22c55e] text-black font-bold' 
                            : 'bg-black text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={toggleTapePlayback}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                      isPlayingTape
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                        : 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20'
                    }`}
                  >
                    {isPlayingTape ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingTape ? 'PAUSAR FITA' : 'RODAR FITA'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Painel Lateral de Telemetria e Canvas Neural */}
            <div className="space-y-4">
              {/* Telemetria das Métricas */}
              <div className="border border-zinc-800 bg-[#080d08] p-4 rounded-lg space-y-4 text-xs font-mono">
                <h4 className="text-white font-bold uppercase border-b border-zinc-800 pb-2 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#22c55e]" />
                  TELEMETRIA PARASITOLÓGICA
                </h4>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Carga Viral no Hospedeiro:</span>
                    <span className={viralLoad > 60 ? 'text-red-400 font-bold' : 'text-[#86efac]'}>{viralLoad}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden">
                    <div 
                      className="bg-red-500 h-full transition-all duration-300"
                      style={{ width: `${viralLoad}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Rigidez Sintática (Controle):</span>
                    <span className="text-amber-400 font-bold">{syntacticRigidity}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-300"
                      style={{ width: `${syntacticRigidity}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Caos Generativo (Entropia Poética):</span>
                    <span className="text-[#22c55e] font-bold">{generativeChaos}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden">
                    <div 
                      className="bg-[#22c55e] h-full transition-all duration-300"
                      style={{ width: `${generativeChaos}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Canvas da Rede Neural */}
              <div className="border border-zinc-800 bg-black p-3 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>SINAPSES NO SISTEMA NERVOSO:</span>
                  <span className={isInfected ? 'text-red-400' : 'text-[#22c55e]'}>
                    {isInfected ? 'LOOP_FECHADO' : 'FLUXO_MUTANTE'}
                  </span>
                </div>
                <canvas
                  ref={neuralCanvasRef}
                  width={320}
                  height={180}
                  className="w-full h-36 rounded block border border-zinc-900"
                />
              </div>

              {/* Terminal Logs */}
              <div className="border border-zinc-800 bg-black p-3 rounded-lg space-y-1.5 text-[11px] font-mono">
                <span className="text-[10px] text-zinc-500 block uppercase">Log de Mutações:</span>
                <div className="max-h-24 overflow-y-auto space-y-1 text-zinc-400">
                  {mutationLogs.map((log, i) => (
                    <div key={i} className="text-[#86efac]/90 leading-tight">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 02. IDEIA: FEEDBACK & SERVOMECANISMOS */}
      {/* ======================================================== */}
      {selectedGroupId === 'feedback-servos' && (
        <div className="border border-[#22c55e]/30 bg-[#050905] p-6 rounded-lg space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22c55e]/20 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-widest block">
                NORBERT WIENER (MIT, 1942) // ARTILHARIA ANTIAÉREA
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white mt-1">
                Preditor Balístico & O Loop de Feedback Negativo vs. Positivo
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFeedbackMode('negative')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                  feedbackMode === 'negative'
                    ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20'
                    : 'bg-black text-zinc-400 border border-zinc-800'
                }`}
              >
                Feedback Negativo (Atenuação)
              </button>
              <button
                onClick={() => setFeedbackMode('positive')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                  feedbackMode === 'positive'
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-black text-zinc-400 border border-zinc-800'
                }`}
              >
                Feedback Positivo (Explosão)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-[#22c55e]/30 bg-black rounded p-2 relative">
              <canvas
                ref={radarCanvasRef}
                width={640}
                height={300}
                className="w-full h-64 sm:h-72 rounded block"
              />
              <div className="absolute top-4 left-4 text-[10px] font-mono text-[#86efac] bg-black/80 px-2 py-1 rounded border border-[#22c55e]/30">
                PONTO VERMELHO = ALVO AÉREO // LINHA VERDE = MIRA DO SERVOMOTOR
              </div>
            </div>

            <div className="space-y-4 bg-black/60 p-4 rounded border border-zinc-800 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Ganho do Feedback (kP):</span>
                  <span className="text-[#22c55e] font-bold">{wienerGain}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={wienerGain}
                  onChange={(e) => setWienerGain(Number(e.target.value))}
                  className="w-full accent-[#22c55e] bg-zinc-800"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Perturbação do Vento:</span>
                  <span className="text-red-400 font-bold">{windPerturbation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={windPerturbation}
                  onChange={(e) => setWindPerturbation(Number(e.target.value))}
                  className="w-full accent-red-500 bg-zinc-800"
                />
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
                <strong>Fundamento Cibernético:</strong> O canhão de Wiener não sabe "o que" é o avião. 
                Ele só mede o ângulo de erro Δθ = θ(alvo) - θ(canhão) 
                e aplica força mecânica para zerar a diferença.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 03. IDEIA: O HOMEOSTATO DE ASHBY */}
      {/* ======================================================== */}
      {selectedGroupId === 'ashby-homeostat' && (
        <div className="border border-[#22c55e]/30 bg-[#050805] p-6 rounded-lg space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22c55e]/20 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-widest block">
                W. ROSS ASHBY (1948) // DESIGN FOR A BRAIN
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white mt-1">
                O Homeostato de 4 Unidades: A Ultrastabilidade sem Inteligência
              </h3>
            </div>

            <button
              onClick={triggerAshbyShock}
              disabled={ashbyShockActive}
              className={`px-4 py-2 rounded text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 ${
                ashbyShockActive
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-red-600 text-black hover:bg-red-500 shadow-lg shadow-red-600/30'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{ashbyShockActive ? 'AUTO-ESTABILIZANDO...' : 'APLICAR CHOQUE NO SISTEMA'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeostatUnits.map((val, idx) => (
              <div key={idx} className="border border-zinc-800 bg-black p-4 rounded-lg space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#86efac] font-bold">UNIDADE_0{idx + 1}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    Math.abs(val) < 5 ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {Math.abs(val) < 5 ? 'ESTÁVEL' : 'INSTÁVEL'}
                  </span>
                </div>

                {/* Mostrador analógico de ponteiro */}
                <div className="relative w-full h-24 bg-zinc-950 rounded border border-zinc-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-2 text-[9px] text-zinc-600">-90° &nbsp; 0° &nbsp; +90°</div>
                  <div 
                    className="w-1 h-16 bg-[#22c55e] origin-bottom transition-all duration-150 rounded"
                    style={{ transform: `rotate(${val}deg)` }}
                  />
                  <div className="absolute bottom-1 w-3 h-3 rounded-full bg-zinc-500" />
                </div>

                <div className="text-[10px] text-zinc-400 text-center">
                  Potenciômetro: <span className="text-white font-bold">{val.toFixed(1)}°</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono flex items-center justify-between">
            <div>
              <strong>Adaptações Autônomas Registradas:</strong> {ashbyAdaptCount} ciclos de re-equilíbrio.
            </div>
            <span className="text-zinc-500 text-[11px]">
              O Homeostato recombina conexões aleatórias até que todos os 4 ponteiros retornem ao centro.
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 04. IDEIA: ENTROPIA VS NEGENTROPIA (SHANNON) */}
      {/* ======================================================== */}
      {selectedGroupId === 'entropy-information' && (
        <div className="border border-[#22c55e]/30 bg-[#050805] p-6 rounded-lg space-y-6 animate-fade-in">
          <div className="border-b border-[#22c55e]/20 pb-3">
            <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-widest block">
              CLAUDE SHANNON (BELL LABS, 1948) // TEORIA MATEMÁTICA DA COMUNICAÇÃO
            </span>
            <h3 className="text-base sm:text-xl font-bold text-white mt-1">
              O Canal com Ruído Estocástico & A Salvação pela Redundância
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-3 bg-black p-4 rounded border border-zinc-800">
              <label className="text-zinc-400 font-bold block uppercase text-[10px]">
                1. Mensagem na Fonte (Negentropia Pura):
              </label>
              <input
                type="text"
                value={shannonSourceText}
                onChange={(e) => setShannonSourceText(e.target.value.toUpperCase())}
                className="w-full bg-zinc-950 border border-zinc-800 p-2 text-sm text-[#86efac] rounded uppercase focus:border-[#22c55e] outline-none"
              />
              <p className="text-[10px] text-zinc-500">
                A informação inicial emitida sem nenhuma contaminação térmica.
              </p>
            </div>

            <div className="space-y-3 bg-black p-4 rounded border border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">2. Ruído no Canal:</span>
                <span className="text-red-400 font-bold">{channelNoise}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={channelNoise}
                onChange={(e) => setChannelNoise(Number(e.target.value))}
                className="w-full accent-red-500 bg-zinc-800"
              />
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="redundancy"
                  checked={useRedundancy}
                  onChange={(e) => setUseRedundancy(e.target.checked)}
                  className="accent-[#22c55e]"
                />
                <label htmlFor="redundancy" className="text-zinc-300 text-[11px] cursor-pointer">
                  Habilitar Bits de Redundância (Paridade)
                </label>
              </div>
            </div>

            <div className="space-y-3 bg-black p-4 rounded border border-[#22c55e]/30">
              <span className="text-zinc-400 font-bold block uppercase text-[10px]">
                3. Sinal Decodificado no Receptor:
              </span>
              <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-sm text-white font-bold min-h-9 flex items-center">
                {corruptedChannelData.recovered}
              </div>
              <div className="text-[10px] text-zinc-500">
                Bruto do Canal (sem paridade): <span className="text-red-400">{corruptedChannelData.received}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 05. IDEIA: CIBERNÉTICA DE 2ª ORDEM & O OBSERVADOR */}
      {/* ======================================================== */}
      {selectedGroupId === 'second-order' && (
        <div className="border border-cyan-500/30 bg-[#03090c] p-6 rounded-lg space-y-6 animate-fade-in">
          <div className="border-b border-cyan-500/20 pb-3">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
              HEINZ VON FOERSTER & HUMBERTO MATURANA // REFLEXIVIDADE COGNITIVA
            </span>
            <h3 className="text-base sm:text-xl font-bold text-white mt-1">
              O Teste do Ponto Cego: "Nós Não Vemos que Não Vemos"
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="bg-black p-6 rounded border border-cyan-500/30 flex flex-col items-center justify-center space-y-6">
              <div className="text-zinc-400 text-center max-w-sm text-[11px]">
                <strong>Instrução:</strong> Feche o olho esquerdo. Fixe o olho direito na <strong>cruz (+)</strong>. 
                Aproxime ou afaste seu rosto da tela devagar. Em torno de 30-40 cm, a <strong>bolinha vermelha (●)</strong> desaparecerá!
              </div>

              <div className="w-full flex items-center justify-around py-8 px-4 bg-zinc-950 rounded border border-zinc-900">
                <span className="text-3xl font-bold text-[#22c55e]">+</span>
                <span 
                  className="w-6 h-6 rounded-full bg-red-500 transition-all duration-200"
                  style={{
                    opacity: blindSpotDistance > 40 && blindSpotDistance < 50 ? 0 : 1,
                    transform: `scale(${blindSpotDistance > 40 && blindSpotDistance < 50 ? 0.2 : 1})`
                  }}
                />
              </div>

              <div className="w-full space-y-1">
                <div className="flex justify-between text-zinc-400 text-[10px]">
                  <span>Distância Simulada dos Olhos:</span>
                  <span className="text-cyan-400 font-bold">{blindSpotDistance} cm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={blindSpotDistance}
                  onChange={(e) => setBlindSpotDistance(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-zinc-800"
                />
              </div>
            </div>

            <div className="bg-black/60 p-5 rounded border border-zinc-800 space-y-4">
              <h4 className="text-cyan-400 font-bold uppercase text-xs">
                A Revelação Epistemológica de Von Foerster:
              </h4>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                Onde o nervo óptico deixa a retina não existem fotorreceptores. Há literalmente um buraco 
                na sua visão física. Porém, você nunca viu um buraco preto no seu campo visual.
              </p>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                O cérebro calcula e inventa uma textura artificial contínua para preencher o vazio. 
                Isso demonstra que a cognição não é uma janela neutra para a realidade, mas uma máquina 
                fechada que inventa a coerência do mundo para estabilizar sua própria homeostase.
              </p>
              <div className="p-3 bg-cyan-950/20 rounded border border-cyan-500/20 text-cyan-200 text-[11px]">
                "Qualquer observação diz mais sobre o observador do que sobre o sistema observado."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
