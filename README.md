# CyberneticMap // O Circuito de Controle & A Guerrilha Semiótica

> **Uma exploração interativa dos fundamentos da Cibernética clássica (Wiener, Ashby, Shannon), da 2ª Ordem (Von Foerster, Maturana) e do contra-ataque semiótico do Vírus da Linguagem e Cut-Up (William S. Burroughs & Brion Gysin).**

[![Deploy to GitHub Pages](https://github.com/govinda777/CyberneticMap/actions/workflows/deploy.yml/badge.svg)](https://github.com/govinda777/CyberneticMap/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live_Site-GitHub_Pages-22c55e?style=flat&logo=github)](https://govinda777.github.io/CyberneticMap/)
[![RFC-001](https://img.shields.io/badge/RFC-001_Aprovada-blue?style=flat)](./RFC-001-CYBERNETIC-MAP.md)

---

## 🛰️ Visão do Projeto

O **CyberneticMap** mapeia a fusão histórica entre biologia, computação e engenharia militar que deu origem à Cibernética nas Conferências Macy (1946–1953), articulando seus quatro pilares fundamentais e confrontando-os com a vanguarda crítica de William S. Burroughs:

1. **01. Cibernética & Pilares Fundamentais:**
   - **Feedback (Retroalimentação):** O loop teleológico de anulação do erro ($\text{Erro} = \text{Alvo} - \text{Saída}$).
   - **Homeostase & Ultrastabilidade:** O Homeostato de Ross Ashby e a manutenção forçada de variáveis críticas vitais.
   - **Entropia vs. Negentropia:** Claude Shannon e Norbert Wiener definindo a informação como baluarte de ordem contra a morte térmica.
   - **Controle & Telecomunicação:** A erradicação de qualquer ruído semântico no canal de comando.
   - **Cibernética de 2ª Ordem:** Heinz von Foerster, Humberto Maturana e Francisco Varela demonstrando a inclusão reflexiva do observador no sistema (*"Não vemos que não vemos"*).

2. **02. A Inversão Viral de William S. Burroughs:**
   - **A Palavra como Vírus Biológico (*Word Virus*):** A linguagem não como invenção humana neutra, mas como parasita exógeno que colonizou o sistema nervoso central.
   - **The Soft Machine & A Equação do Junk:** O ser humano como máquina biológica programável e a dependência química/midiática como modelo cibernético supremo do monopólio.
   - **O Estúdio da Realidade & As Fitas Mestras:** A ilusão técnica do tempo presente pré-gravado.
   - **A Tesoura Cut-Up como Disjuntor:** A introdução deliberada do ruído entrópico para romper a sintaxe de controle e vazar o futuro.

3. **03. Experimentos Cibernéticos (Bancada por Ideias):**
   - 🦠 **Ideia 1: `A Linguagem é um Vírus`**
     - Inoculação da sintaxe de controle e medição de carga viral / rigidez.
     - Tesoura Cut-Up em 4 quadrantes clássicos ($Q_4 // Q_1 // Q_3 // Q_2$).
     - Dobradura temporal *Fold-In* com fragmentos alucinatórios.
     - Scrambler de palavras de comando e simulador de fita cassete analógica com Web Audio.
     - Canvas 2D de sinapses neurais infectadas vs. libertadas pelo corte.
   - 🎯 **Ideia 2: `Feedback & Servomecanismos`**
     - Simulador do Preditor Antiaéreo de Wiener (1942).
     - Comparação em tempo real de Feedback Negativo (amortecimento) vs. Positivo (avalanche explosiva).
   - ⚡ **Ideia 3: `O Homeostato de Ashby`**
     - Simulação das 4 unidades magnéticas acopladas buscando equilíbrio cego perante choques elétricos.
   - 📡 **Ideia 4: `Entropia vs. Negentropia`**
     - Canal com ruído estocástico de Shannon e compensação matemática por redundância de bits.
   - 👁️ **Ideia 5: `Cibernética de 2ª Ordem`**
     - Demonstração empírica do ponto cego retiniano e do fechamento operacional da percepção.

4. **04. Crenças & Dogmas Ocultos:**
   - O Isomorfismo Animal-Máquina, a Desmaterialização em Informação Pura, e a gênese da Sociedade de Controle (Deleuze).

5. **05. RFC & Documentação Técnica:**
   - Especificação do RFC-001 integrada diretamente na interface.

---

## 🛠️ Stack Tecnológica

- **Frontend:** React 18, TypeScript, Vite 5
- **Estilização & Efeitos:** Tailwind CSS, PostCSS, Scanlines CRT & Glitch shader CSS
- **Interatividade & Canvas:** Canvas 2D Nativo a 60 FPS, Web Audio API analógica
- **Ícones:** Lucide React
- **CI/CD & Hosting:** GitHub Actions & GitHub Pages

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/govinda777/CyberneticMap.git
cd CyberneticMap

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

---

## 📦 Compilação e Deploy no GitHub Pages

O projeto conta com automação contínua via **GitHub Actions** em `.github/workflows/deploy.yml`.

Para compilar manualmente os artefatos de produção:

```bash
# Compilação padrão (caminho relativo)
npm run build

# Compilação para o GitHub Pages (com base path /CyberneticMap/)
GITHUB_PAGES=true npm run build
```

Os arquivos estáticos finais serão gerados na pasta `dist/`.

Ao realizar `git push origin main`, o workflow compilará e publicará automaticamente em:
**https://govinda777.github.io/CyberneticMap/**

---

## 📜 Licença

Distribuído sob a licença Apache 2.0. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
