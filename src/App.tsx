import React, { useState } from 'react';
import { HeaderTerminal } from './components/common/HeaderTerminal';
import { CyberneticsView } from './components/cybernetics/CyberneticsView';
import { LinguisticsDiagramsView } from './components/linguistics/LinguisticsDiagramsView';
import { BurroughsView } from './components/burroughs/BurroughsView';
import { ExperimentsView } from './components/experiments/ExperimentsView';
import { BeliefsView } from './components/beliefs/BeliefsView';
import { RfcView } from './components/rfc/RfcView';
import { TabId, ExperimentGroupId } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('cybernetics');
  const [systemMode, setSystemMode] = useState<'wiener' | 'burroughs'>('wiener');
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [selectedExperimentGroup, setSelectedExperimentGroup] = useState<ExperimentGroupId>('language-virus');

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 400);
  };

  const handleTabChange = (tab: TabId) => {
    triggerGlitch();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExperiments = (groupId?: string) => {
    if (groupId) {
      setSelectedExperimentGroup(groupId as ExperimentGroupId);
    }
    handleTabChange('experiments');
  };

  const handleToggleSystemMode = () => {
    triggerGlitch();
    setSystemMode(prev => (prev === 'wiener' ? 'burroughs' : 'wiener'));
  };

  const isBurroughs = systemMode === 'burroughs';

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 ${
      isBurroughs ? 'bg-[#080202] text-red-400' : 'bg-[#030603] text-[#22c55e]'
    }`}>
      {/* CRT Scanline Overlay Estilizado */}
      <div className="fixed inset-0 crt-overlay z-40 pointer-events-none" />

      {/* Header Fixo com Navegação */}
      <HeaderTerminal
        activeTab={activeTab}
        onTabChange={handleTabChange}
        glitchActive={glitchActive}
        onTriggerGlitch={triggerGlitch}
        systemMode={systemMode}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 z-10">
        {activeTab === 'cybernetics' && (
          <CyberneticsView onNavigateToExperiments={handleNavigateToExperiments} />
        )}

        {activeTab === 'linguistics' && (
          <LinguisticsDiagramsView
            onNavigateToExperiments={handleNavigateToExperiments}
            onTriggerGlitch={triggerGlitch}
          />
        )}

        {activeTab === 'burroughs' && (
          <BurroughsView
            onNavigateToExperiments={handleNavigateToExperiments}
            systemMode={systemMode}
            onToggleSystemMode={handleToggleSystemMode}
          />
        )}

        {activeTab === 'experiments' && (
          <ExperimentsView
            initialGroupId={selectedExperimentGroup}
            onTriggerGlitch={triggerGlitch}
          />
        )}

        {activeTab === 'beliefs' && (
          <BeliefsView onNavigateToExperiments={handleNavigateToExperiments} />
        )}

        {activeTab === 'rfc' && (
          <RfcView />
        )}
      </main>

      {/* Rodapé Militar / Terminal */}
      <footer className={`border-t py-6 px-4 text-xs font-mono transition-colors duration-300 z-10 ${
        isBurroughs 
          ? 'border-red-950/60 bg-[#060101] text-red-500/60' 
          : 'border-[#22c55e]/20 bg-[#020502] text-[#86efac]/60'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-bold text-white tracking-wider">
              CYBERNETIC_MAP // SISTEMA DE CONTROLE & GUERRILHA SEMIÓTICA
            </div>
            <div className="text-[11px]">
              "CORTEM AS LINHAS DE PALAVRAS E VEJAM COMO ELAS CAEM." — WILLIAM S. BURROUGHS
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>NORBERT WIENER (1948)</span>
            <span>//</span>
            <span>CLAUDE SHANNON (1948)</span>
            <span>//</span>
            <span>BRION GYSIN & BURROUGHS (1959)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
