import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Biohazard, 
  Scissors, 
  Flame, 
  FileText, 
  Radio, 
  Sparkles, 
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { BURROUGHS_CONCEPTS } from '../../data/burroughsData';
import { BurroughsConcept } from '../../types';

interface BurroughsViewProps {
  onNavigateToExperiments: (groupId?: string) => void;
  systemMode: 'wiener' | 'burroughs';
  onToggleSystemMode: () => void;
}

export const BurroughsView: React.FC<BurroughsViewProps> = ({
  onNavigateToExperiments,
  systemMode,
  onToggleSystemMode
}) => {
  const [selectedConcept, setSelectedConcept] = useState<BurroughsConcept>(BURROUGHS_CONCEPTS[0]);

  const isBurroughs = systemMode === 'burroughs';

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Banner de Comutação de Paradigma */}
      <section className={`p-6 md:p-8 rounded-lg border transition-all duration-300 relative overflow-hidden ${
        isBurroughs
          ? 'border-red-600/60 bg-[#120404] shadow-xl shadow-red-950/40'
          : 'border-[#22c55e]/40 bg-[#060c06]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                isBurroughs 
                  ? 'border-red-500 bg-red-950/60 text-red-300' 
                  : 'border-[#22c55e]/30 bg-[#22c55e]/10 text-[#86efac]'
              }`}>
                GUERRILHA SEMIÓTICA // BEAT HOTEL PARIS (1959)
              </span>
              <span className="text-xs text-zinc-500">//</span>
              <span className="text-xs text-zinc-400">BRION GYSIN & WILLIAM S. BURROUGHS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              A Inversão Viral: <span className={isBurroughs ? 'text-red-500 text-glow-red' : 'text-[#22c55e]'}>
                A Palavra como Vírus de Controle
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Enquanto Norbert Wiener e a cibernética militar conceberam o ruído como o inimigo supremo 
              a ser aniquilado pelo feedback negativo, <strong>William S. Burroughs</strong> percebeu o reverso 
              aterrador: a própria linguagem linear é um organismo parasita que escraviza o sistema nervoso. 
              Para quebrar o monopólio do Controle, a única saída é introduzir deliberadamente o caos 
              e a fragmentação por meio da <strong>Tesoura Cut-Up</strong>.
            </p>
          </div>

          {/* Comutador de Paradigma */}
          <div className="bg-black/80 p-4 rounded-lg border border-zinc-800 space-y-3 w-full sm:w-auto">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Comutador Ontológico:
            </div>
            <button
              onClick={onToggleSystemMode}
              className={`w-full px-4 py-2 text-xs font-bold uppercase rounded border transition-all flex items-center justify-center gap-2 ${
                isBurroughs
                  ? 'bg-red-600 text-black border-red-500 shadow-lg shadow-red-600/30'
                  : 'bg-[#22c55e] text-black border-[#22c55e] shadow-lg shadow-[#22c55e]/30'
              }`}
            >
              {isBurroughs ? (
                <>
                  <Biohazard className="w-4 h-4" />
                  <span>PARADIGMA BURROUGHS (INFECÇÃO)</span>
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4" />
                  <span>PARADIGMA WIENER (ORDEM PURA)</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-zinc-500 text-center">
              Alterne para transformar a paleta e os filtros conceituais da estação.
            </p>
          </div>
        </div>
      </section>

      {/* Conceitos Fundamentais de Burroughs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#22c55e]/20 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              OS ARSENAL SEMIÓTICO DA DESPROGRAMAÇÃO
            </h2>
            <p className="text-xs text-zinc-400">
              Conceitos seminais formulados em The Soft Machine, Naked Lunch, Nova Express e The Electronic Revolution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BURROUGHS_CONCEPTS.map((concept) => {
            const isSelected = selectedConcept.id === concept.id;
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className={`p-4 text-left rounded-lg border transition-all ${
                  isSelected
                    ? 'border-red-500 bg-red-950/30 shadow-md shadow-red-950/20'
                    : 'border-zinc-800 bg-[#060806] hover:border-red-500/50 hover:bg-red-950/10'
                }`}
              >
                <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">
                  {concept.tag}
                </span>
                <h3 className="font-bold text-sm text-white mb-2">{concept.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-black border border-red-500/30 text-red-300 font-mono block w-fit">
                  {concept.mechanism}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detalhamento do Conceito Selecionado */}
        <div className="border border-red-500/30 bg-[#0a0505] p-6 rounded-lg space-y-6">
          <div className="border-b border-red-500/20 pb-4">
            <span className="text-[11px] text-red-400 font-mono tracking-widest block uppercase">
              {selectedConcept.source}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{selectedConcept.title}</h3>
            
            <blockquote className="mt-3 p-3 rounded bg-black/60 border-l-2 border-red-500 text-xs sm:text-sm text-red-200 italic font-mono">
              {selectedConcept.quote}
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-red-400 tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Diagnóstico Parasitológico:
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                {selectedConcept.body}
              </p>
            </div>

            <div className="space-y-3 bg-red-950/20 p-4 rounded border border-red-500/20">
              <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Scissors className="w-4 h-4" />
                Conexão Cibernética & Ponto de Ruptura:
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                {selectedConcept.cyberConnection}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigateToExperiments('language-virus')}
              className="px-4 py-2 rounded bg-red-600 text-black font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Scissors className="w-4 h-4" />
              <span>Experimentar Tesoura Cut-Up no Laboratório</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Tabela Comparativa Wiener vs Burroughs */}
      <section className="border border-zinc-800 bg-[#060806] p-6 rounded-lg space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          O DILEMA EPISTEMOLÓGICO: WIENER vs. BURROUGHS
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-zinc-800">
            <thead className="bg-black/90 text-zinc-400 border-b border-zinc-800 font-mono">
              <tr>
                <th className="p-3 border-r border-zinc-800">Dimensão</th>
                <th className="p-3 border-r border-zinc-800 text-[#86efac]">Cibernética Clássica (Wiener / Shannon)</th>
                <th className="p-3 text-red-400">Guerrilha Semiótica (Burroughs / Gysin)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300 font-mono">
              <tr>
                <td className="p-3 font-bold text-white border-r border-zinc-800">Linguagem</td>
                <td className="p-3 border-r border-zinc-800">Canal de telecomando asséptico para transmissão de ordens sem ambiguidade.</td>
                <td className="p-3 text-red-200">Um organismo biológico parasita alienígena que aprisiona a mente em subvocalização.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white border-r border-zinc-800">Ruído / Acaso</td>
                <td className="p-3 border-r border-zinc-800">Ameaça entrópica destrutiva a ser eliminada por códigos corretores.</td>
                <td className="p-3 text-red-200">O único disjuntor libertador capaz de cortar as fitas mestras do controle social.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white border-r border-zinc-800">O Ser Humano</td>
                <td className="p-3 border-r border-zinc-800">Autômato processador de informações regido por equações de erro.</td>
                <td className="p-3 text-red-200">A "Máquina Macia" colonizada pelo vício celular (Junk) e condicionamentos midiáticos.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white border-r border-zinc-800">Objetivo Máximo</td>
                <td className="p-3 border-r border-zinc-800">Homeostase: estabilidade, previsibilidade e perpetuação da ordem.</td>
                <td className="p-3 text-red-200">Mutação: assaltar o Estúdio da Realidade e vazar o futuro estocasticamente.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
