import React from 'react';
import { Layers, ShieldAlert, Cpu, Sparkles, BookOpen, AlertOctagon, ArrowRight } from 'lucide-react';
import { CYBERNETIC_BELIEFS } from '../../data/beliefsData';

interface BeliefsViewProps {
  onNavigateToExperiments: (groupId?: string) => void;
}

export const BeliefsView: React.FC<BeliefsViewProps> = ({ onNavigateToExperiments }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner de Abertura */}
      <section className="border border-amber-500/30 bg-[#0c0903] p-6 md:p-8 rounded-lg relative overflow-hidden box-glow">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>ARQUEOLOGIA DA RAZÃO CIBERNÉTICA // ONTOLOGIA & DOGMAS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            As Crenças Ocultas da Cibernética: <span className="text-amber-400">A Religião dos Sistemas</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            A Cibernética não foi apenas um conjunto de fórmulas para engenheiros de radar. Ela se consolidou 
            como uma <strong>cosmologia metafísica</strong> e ideológica que redefiniu o ser humano, a sociedade 
            e o cosmos. Abaixo, desconstruímos os 5 dogmas fundamentais formulados nas Conferências Macy 
            e suas contraposições críticas.
          </p>
        </div>
      </section>

      {/* Lista Estruturada de Crenças */}
      <div className="space-y-6">
        {CYBERNETIC_BELIEFS.map((belief, idx) => (
          <div 
            key={belief.id} 
            className="border border-zinc-800 bg-[#060806] p-6 rounded-lg space-y-5 hover:border-amber-500/40 transition-all font-mono"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/30">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {belief.dogma}
                </h3>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">
                {belief.historicalOrigin}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Ortodoxia Cibernética */}
              <div className="p-4 rounded bg-black/60 border border-[#22c55e]/20 space-y-2">
                <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-wider block">
                  A Ortodoxia Cibernética (Wiener / Shannon / Von Neumann):
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {belief.wienerOrthodoxy}
                </p>
                <div className="text-[11px] text-[#86efac]/80 pt-1 border-t border-zinc-900">
                  <strong>Implicação:</strong> {belief.philosophicalImplication}
                </div>
              </div>

              {/* O Contraponto Burroughsiano */}
              <div className="p-4 rounded bg-red-950/20 border border-red-500/20 space-y-2">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                  O Contraponto de William S. Burroughs & Teoria Crítica:
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {belief.burroughsCounterpoint}
                </p>
                <div className="text-[11px] text-red-300/80 pt-1 border-t border-zinc-900">
                  <strong>Manifestação Atual:</strong> {belief.modernManifestation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chamada para o Laboratório */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-red-950/30 via-black to-zinc-950 border border-red-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            DESEJA TESTAR ESTAS CRENÇAS NA PRÁTICA?
          </h4>
          <p className="text-xs text-zinc-400">
            Acesse os experimentos de fatiamento Cut-Up da ideia "A Linguagem é um Vírus" para ver como a desordem entrópica liberta a mente.
          </p>
        </div>

        <button
          onClick={() => onNavigateToExperiments('language-virus')}
          className="px-4 py-2 rounded bg-red-600 text-black font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
        >
          <span>Ir para Experimentos de Linguagem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
