import React, { useEffect, useState } from 'react';
import { Terminal, Activity, ShieldAlert, Cpu, Sparkles, BookOpen, Layers } from 'lucide-react';
import { TabId } from '../../types';

interface HeaderTerminalProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  glitchActive: boolean;
  onTriggerGlitch: () => void;
  systemMode: 'wiener' | 'burroughs';
}

export const HeaderTerminal: React.FC<HeaderTerminalProps> = ({
  activeTab,
  onTabChange,
  glitchActive,
  onTriggerGlitch,
  systemMode
}) => {
  const [clock, setClock] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  const isBurroughs = systemMode === 'burroughs';

  return (
    <header className={`border-b transition-colors duration-300 ${
      isBurroughs 
        ? 'border-red-600/40 bg-[#090202]/90' 
        : 'border-[#22c55e]/30 bg-[#030703]/90'
    } backdrop-blur-md sticky top-0 z-50`}>
      {/* Barra de Status e Telemetria */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-3 border-b border-[#22c55e]/10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold tracking-wider">
            <Terminal className={`w-4 h-4 ${isBurroughs ? 'text-red-500 animate-pulse' : 'text-[#22c55e]'}`} />
            <span className={isBurroughs ? 'text-red-400' : 'text-[#22c55e]'}>CYBERNETIC_MAP</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#86efac]">
              v1.0.0-PROD
            </span>
          </span>
          <span className="hidden sm:inline text-zinc-500">//</span>
          <span className="hidden sm:inline text-[11px] text-zinc-400">
            ARQUITETURA DE CONTROLE & GUERRILHA SEMIÓTICA
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>NÚCLEO:</span>
            <span className="text-[#86efac] font-mono">FEEDBACK_LOOP_ACTIVE</span>
          </span>

          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span className="font-mono text-[#86efac]">{clock || '12:00:00.00'}</span>
          </span>

          <button
            onClick={onTriggerGlitch}
            title="Injetar ruído estocástico na interface"
            className="px-2 py-0.5 text-[10px] uppercase border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#86efac] hover:bg-[#22c55e]/20 hover:border-[#22c55e] transition-all"
          >
            INJETAR RUÍDO
          </button>
        </div>
      </div>

      {/* Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          <button
            onClick={() => onTabChange('cybernetics')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cybernetics'
                ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20'
                : 'text-zinc-400 hover:text-[#22c55e] hover:bg-[#22c55e]/10'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            01. Cibernética & Pilares
          </button>

          <button
            onClick={() => onTabChange('burroughs')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'burroughs'
                ? 'bg-red-500 text-black shadow-lg shadow-red-500/20'
                : 'text-zinc-400 hover:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            02. Inversão Burroughs
          </button>

          {/* ABA DESTACADA: EXPERIMENTOS CIBERNÉTICOS */}
          <button
            onClick={() => onTabChange('experiments')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-2 border ${
              activeTab === 'experiments'
                ? 'bg-[#06b6d4] text-black border-[#06b6d4] shadow-lg shadow-[#06b6d4]/20'
                : 'border-[#06b6d4]/40 bg-[#06b6d4]/10 text-[#67e8f9] hover:bg-[#06b6d4]/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>03. Experimentos Cibernéticos</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-cyan-200 border border-cyan-400/40 uppercase">
              Laboratório
            </span>
          </button>

          <button
            onClick={() => onTabChange('beliefs')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'beliefs'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            04. Crenças & Dogmas
          </button>

          <button
            onClick={() => onTabChange('rfc')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rfc'
                ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20'
                : 'text-zinc-400 hover:text-[#22c55e] hover:bg-[#22c55e]/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            05. RFC & Arquitetura
          </button>
        </nav>
      </div>

      {glitchActive && (
        <div className="h-0.5 bg-gradient-to-r from-red-500 via-[#22c55e] to-cyan-400 animate-pulse" />
      )}
    </header>
  );
};
