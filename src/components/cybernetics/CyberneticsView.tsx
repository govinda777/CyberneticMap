import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  RefreshCw, 
  Binary, 
  Radio, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { CYBERNETICS_PILLARS, SECOND_ORDER_FOUNDATIONS } from '../../data/cyberneticsData';
import { CyberneticPillar } from '../../types';

interface CyberneticsViewProps {
  onNavigateToExperiments: (groupId?: string) => void;
}

export const CyberneticsView: React.FC<CyberneticsViewProps> = ({ onNavigateToExperiments }) => {
  const [selectedPillar, setSelectedPillar] = useState<CyberneticPillar>(CYBERNETICS_PILLARS[0]);
  const [disturbance, setDisturbance] = useState<number>(35);
  const [systemGain, setSystemGain] = useState<number>(65); // Força de restauração do loop
  const [dampingFactor, setDampingFactor] = useState<number>(50); // Amortecimento
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulação contínua do Servomecanismo em Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const points: number[] = new Array(80).fill(0);
    let currentPosition = 0;
    let velocity = 0;

    const render = () => {
      time += 0.05;
      const target = Math.sin(time * 0.8) * 15; // Alvo dinâmico oscilante
      const externalShock = (Math.random() - 0.5) * (disturbance * 0.8);

      // Equação diferencial discreta de servomecanismo de 2ª ordem:
      // Aceleração = Ganho * (Alvo - Posição) - Amortecimento * Velocidade + Perturbação
      const error = target - currentPosition;
      const kP = (systemGain / 100) * 0.4;
      const kD = (dampingFactor / 100) * 0.25;
      const acceleration = kP * error - kD * velocity + externalShock * 0.1;

      velocity += acceleration;
      currentPosition += velocity;

      // Desloca histórico de pontos
      points.push(currentPosition);
      points.shift();

      // Renderização no Canvas
      ctx.fillStyle = '#040804';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid de Fundo Militar
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Linha de Referência Central (Zero / Alvo)
      const centerY = canvas.height / 2;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY + target * 2);
      ctx.lineTo(canvas.width, centerY + target * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traçado do Erro / Posição do Servomecanismo
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const stepX = canvas.width / (points.length - 1);
      points.forEach((val, i) => {
        const x = i * stepX;
        const y = centerY + val * 2.2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ponto Atuador no Fim da Linha
      const lastY = centerY + currentPosition * 2.2;
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(canvas.width - 8, lastY, 5, 0, Math.PI * 2);
      ctx.fill();

      // HUD de Telemetria no Canvas
      ctx.fillStyle = '#86efac';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`ERRO_INSTANTÂNEO: ${error.toFixed(2)}`, 12, 20);
      ctx.fillText(`GANHO_P: ${(systemGain / 100).toFixed(2)} | AMORTECIMENTO: ${(dampingFactor / 100).toFixed(2)}`, 12, 36);
      ctx.fillText(`ESTADO: ${Math.abs(error) < 5 ? 'HOMEOSTASE_ESTÁVEL' : 'CORREÇÃO_ATIVA'}`, 12, 52);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [disturbance, systemGain, dampingFactor]);

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'feedback': return <RefreshCw className="w-5 h-5 text-[#22c55e]" />;
      case 'homeostasis': return <Activity className="w-5 h-5 text-[#22c55e]" />;
      case 'entropy': return <Binary className="w-5 h-5 text-[#22c55e]" />;
      case 'control': return <Radio className="w-5 h-5 text-[#22c55e]" />;
      default: return <Cpu className="w-5 h-5 text-[#22c55e]" />;
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Teórico */}
      <section className="border border-[#22c55e]/30 bg-[#060c06]/80 p-6 md:p-8 rounded-lg relative overflow-hidden box-glow">
        <div className="absolute top-0 right-0 px-4 py-1 bg-[#22c55e]/20 border-b border-l border-[#22c55e]/40 text-[10px] text-[#86efac] font-bold">
          CONFERÊNCIAS MACY (1946–1953) // MATRIX DE CONTROLE
        </div>

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-[#86efac] px-2.5 py-1 rounded bg-[#22c55e]/10 border border-[#22c55e]/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>EPISTEMOLOGIA DA 1ª ORDEM: SISTEMAS OBSERVADOS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            A Cibernética e a Redução do Mundo a <span className="text-[#22c55e] text-glow">Loops de Informação</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Nascida no turbilhão da 2ª Guerra Mundial e formalizada por <strong>Norbert Wiener</strong> em 1948, 
            a Cibernética unificou a biologia, a computação e as ciências sociais sob um dogma radical: 
            <em> não há distinção de princípio entre o comando de um ser vivo e a regulação de uma máquina</em>. 
            Tudo é mensagem, tudo é retroalimentação, e a ordem é mantida subtraindo-se o erro contra a deriva entrópica universal.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>Norbert Wiener (MIT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>Claude Shannon (Bell Labs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>W. Ross Ashby (Homeostato)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>John von Neumann (Autômatos)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Os Quatro Pilares da Cibernética */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#22c55e]/20 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#22c55e]" />
              OS QUATRO PILARES DO CONTROLE CIBERNÉTICO
            </h2>
            <p className="text-xs text-zinc-400">
              Selecione um pilar para auditar sua formulação matemática e premissa epistemológica
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CYBERNETICS_PILLARS.map((p) => {
            const isSelected = selectedPillar.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p)}
                className={`p-4 text-left rounded-lg border transition-all relative ${
                  isSelected
                    ? 'border-[#22c55e] bg-[#22c55e]/15 shadow-md shadow-[#22c55e]/10'
                    : 'border-[#22c55e]/20 bg-[#060c06]/60 hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-black/50 border border-[#22c55e]/30">
                    {getPillarIcon(p.id)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#86efac] border border-[#22c55e]/20">
                    PILAR_0{CYBERNETICS_PILLARS.indexOf(p) + 1}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{p.title}</h3>
                <p className="text-xs text-[#86efac]/80 line-clamp-2">{p.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Detalhamento do Pilar Selecionado */}
        <div className="border border-[#22c55e]/30 bg-[#040804] p-6 rounded-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#22c55e]/20 pb-4">
            <div>
              <span className="text-[11px] text-[#22c55e] font-mono tracking-widest block uppercase">
                {selectedPillar.historicalContext}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedPillar.title}</h3>
              <p className="text-xs text-zinc-300 mt-0.5">{selectedPillar.subtitle}</p>
            </div>

            <div className="bg-black/80 px-4 py-2 rounded border border-[#22c55e]/40 font-mono text-xs text-[#86efac] text-glow">
              <span className="text-[10px] text-zinc-500 block uppercase">Equação / Princípio:</span>
              {selectedPillar.formula}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#22c55e] tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Definição Técnica e Mecanismo:
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                {selectedPillar.desc}
              </p>
            </div>

            <div className="space-y-3 bg-[#22c55e]/5 p-4 rounded border border-[#22c55e]/20">
              <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Implicação Filosófica & Controle Social:
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                {selectedPillar.implication}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador Interativo do Servomecanismo */}
      <section className="border border-[#22c55e]/30 bg-[#060a06] p-6 rounded-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22c55e]/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] text-[#86efac] px-2 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/20 mb-1">
              <Sliders className="w-3 h-3" />
              <span>SIMULADOR DE RETROALIMENTAÇÃO E ERRO (2ª ORDEM)</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              O Servomecanismo em Tempo Real: Anulação Forçada da Perturbação
            </h3>
          </div>

          <button
            onClick={() => onNavigateToExperiments('feedback-servos')}
            className="px-3 py-1.5 rounded bg-[#06b6d4]/20 border border-[#06b6d4]/40 text-[#67e8f9] hover:bg-[#06b6d4]/30 text-xs flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Abrir no Laboratório Avançado</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas da Oscilação */}
          <div className="lg:col-span-2 border border-[#22c55e]/30 bg-black rounded p-2 relative">
            <canvas
              ref={canvasRef}
              width={640}
              height={260}
              className="w-full h-56 sm:h-64 rounded block"
            />
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-500 bg-black/80 px-2 py-1 rounded border border-[#22c55e]/20">
              VERDE = TRAJETÓRIA REAL // LARANJA = ALVO
            </div>
          </div>

          {/* Controles de Telemetria */}
          <div className="space-y-4 bg-black/60 p-4 rounded border border-[#22c55e]/20 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-zinc-400">Perturbação Externa (Ruído):</span>
                <span className="text-red-400 font-bold">{disturbance}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={disturbance}
                onChange={(e) => setDisturbance(Number(e.target.value))}
                className="w-full accent-red-500 bg-zinc-800"
              />
              <p className="text-[10px] text-zinc-500">
                Simula o vento, a instabilidade térmica ou a interferência estocástica.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-zinc-400">Ganho do Feedback (kP):</span>
                <span className="text-[#22c55e] font-bold">{systemGain}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={systemGain}
                onChange={(e) => setSystemGain(Number(e.target.value))}
                className="w-full accent-[#22c55e] bg-zinc-800"
              />
              <p className="text-[10px] text-zinc-500">
                A agressividade com que o servomotor subtrai o erro para forçar o retorno à linha.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="text-zinc-400">Fator de Amortecimento (kD):</span>
                <span className="text-cyan-400 font-bold">{dampingFactor}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={dampingFactor}
                onChange={(e) => setDampingFactor(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-zinc-800"
              />
              <p className="text-[10px] text-zinc-500">
                Evita oscilações descontroladas ou histerese destrutiva no atuador.
              </p>
            </div>

            <div className="pt-2 border-t border-[#22c55e]/20 text-[11px] text-[#86efac]">
              <strong>Diagnóstico Cibernético:</strong> O sistema mantém a ilusão de propósito exclusivamente
              porque monitora seu próprio erro passado e o subtrai continuamente.
            </div>
          </div>
        </div>
      </section>

      {/* Cibernética de 2ª Ordem */}
      <section className="border border-[#22c55e]/20 bg-[#050905] p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-lg font-bold text-white">
            A Transição para a Cibernética de Segunda Ordem (Anos 1970)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300">
          A primeira cibernética concebeu o cientista como um observador descolado. Nos anos 70, Von Foerster,
          Maturana e Varela denunciaram que o observador é parte inseparável do loop que observa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {SECOND_ORDER_FOUNDATIONS.map((f, i) => (
            <div key={i} className="p-4 rounded border border-cyan-500/20 bg-cyan-950/10 space-y-2">
              <span className="text-[10px] text-cyan-400 font-mono block uppercase">
                {f.author}
              </span>
              <h4 className="font-bold text-white text-xs">{f.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.concept}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
