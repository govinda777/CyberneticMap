import React from 'react';
import { BookOpen, CheckCircle2, GitBranch, Terminal, ArrowUpRight, Cpu } from 'lucide-react';

export const RfcView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in font-mono text-xs">
      {/* Banner */}
      <section className="border border-[#22c55e]/30 bg-[#050805] p-6 md:p-8 rounded-lg relative overflow-hidden box-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#22c55e]/15 border border-[#22c55e]/30 text-xs text-[#86efac]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ESPECIFICAÇÃO DE PROJETO // RFC-001</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              RFC-001: Arquitetura Conceitual, Cibernética & Deploy no GitHub Pages
            </h1>
            <p className="text-zinc-400 text-xs">
              Status: <span className="text-[#22c55e] font-bold">IMPLEMENTADA & EM PRODUÇÃO</span> // Versão v1.0.0
            </p>
          </div>

          <a
            href="https://github.com/govinda777/CyberneticMap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#22c55e] text-black font-bold text-xs hover:bg-[#86efac] transition-all flex items-center gap-2"
          >
            <GitBranch className="w-4 h-4" />
            <span>Repositório GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Grid de Resumo da RFC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-zinc-800 bg-black/60 p-4 rounded-lg space-y-2">
          <div className="text-[#86efac] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            MARCO 1: VISÃO CONCEITUAL
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Mapeamento minucioso das Conferências Macy, dos 4 pilares clássicos de Wiener/Ashby/Shannon,
            da 2ª Ordem (Von Foerster/Maturana) e da guerrilha do Cut-Up de Burroughs.
          </p>
        </div>

        <div className="border border-zinc-800 bg-black/60 p-4 rounded-lg space-y-2">
          <div className="text-[#86efac] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            MARCO 2: BANCADA DE EXPERIMENTOS
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Página dedicada com experimentos interativos agrupados por núcleos de ideias: 
            "A linguagem é um viruz", Servomecanismos de Wiener, Homeostato e Ponto Cego.
          </p>
        </div>

        <div className="border border-zinc-800 bg-black/60 p-4 rounded-lg space-y-2">
          <div className="text-[#86efac] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
            MARCO 3: GITHUB PAGES CI/CD
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Harness com Vite 5 + React 18 + Tailwind CSS. Workflow em `.github/workflows/deploy.yml` 
            com build automático da pasta `dist/` com base path portátil.
          </p>
        </div>
      </div>

      {/* Arquitetura da Pipeline GitHub Actions */}
      <section className="border border-zinc-800 bg-black p-6 rounded-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#22c55e]" />
          ESTEIRA DE DEPLOY (.github/workflows/deploy.yml)
        </h3>
        <p className="text-zinc-400 text-[11px]">
          Ao realizar push para a branch `main`, a esteira do GitHub Actions executa:
        </p>
        <pre className="p-4 bg-zinc-950 rounded border border-zinc-900 text-[#86efac] overflow-x-auto text-[11px] leading-relaxed">
{`name: Deploy CyberneticMap to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: 'true'
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v5`}
        </pre>
      </section>

      {/* Referências Bibliográficas */}
      <section className="border border-zinc-800 bg-[#060806] p-6 rounded-lg space-y-3">
        <h3 className="text-sm font-bold text-white">REFERÊNCIAS BIBLIOGRÁFICAS FUNDAMENTAIS</h3>
        <ul className="list-disc list-inside text-zinc-400 space-y-1.5 text-[11px]">
          <li><strong>Norbert Wiener</strong> (1948). <em>Cybernetics: Or Control and Communication in the Animal and the Machine</em>. MIT Press.</li>
          <li><strong>Claude E. Shannon & Warren Weaver</strong> (1949). <em>The Mathematical Theory of Communication</em>. University of Illinois Press.</li>
          <li><strong>W. Ross Ashby</strong> (1952). <em>Design for a Brain: The Origin of Adaptive Behaviour</em>. Chapman & Hall.</li>
          <li><strong>William S. Burroughs</strong> (1961). <em>The Soft Machine</em>. Olympia Press.</li>
          <li><strong>William S. Burroughs</strong> (1970). <em>The Electronic Revolution</em>. Blackmoor Head Press.</li>
          <li><strong>Brion Gysin & William S. Burroughs</strong> (1978). <em>The Third Mind</em>. Viking Press.</li>
          <li><strong>Heinz von Foerster</strong> (1974). <em>Cybernetics of Cybernetics</em>. Biological Computer Laboratory.</li>
          <li><strong>Humberto Maturana & Francisco Varela</strong> (1980). <em>Autopoiesis and Cognition: The Realization of the Living</em>. D. Reidel.</li>
        </ul>
      </section>
    </div>
  );
};
