# 🦥 SlothOps — Slow and Steady Open-Source AI Studio

> **Built for Hacktoberfest 2026: Week 3 DEV Challenge ("Slow and Steady")**  
> *In celebration of International Sloth Day: Build something with open-weight models or open-source AI that rewards pure laziness.*

---

## 📖 Overview

Traditional hackathons reward frantic 48-hour caffeine-fueled coding marathons. But **Week 3 of Hacktoberfest 2026** posed a much wiser prompt:

> *"Tomorrow, October 20, is International Sloth Day, and we think sloths have it figured out. They move at their own pace, conserve their energy, and even help moderate our website. This week, we want you to channel your inner sloth and build something that does the work so you don't have to."*

**SlothOps** is a local-first, open-source productivity suite that systematically eradicates the tedious micro-tasks developers and remote workers dread. It runs locally on your machine, keeps your personal conversations and files private, and costs $0.00 to operate.

---

## ⚡ The 4 Pillars of Productive Laziness

### 1. 🦥 Morning Chat Sloth (Group Chat & Slack Summarizer)
- **The Dread:** Waking up to 70+ unread messages across WhatsApp, Discord, or Slack and scrolling for 20 minutes before coffee just to see if someone asked you a question.
- **The Solution:** Paste or load raw chat transcripts.
- **The Output:**
  - A clean **2-line morning verdict**.
  - A dedicated checklist of **Action Items Assigned to You** (or clearance that you have zero obligations and can go back to sleep).
  - **1-Click Canned Replies** (*"Sounds great! 👍"*, *"Venmo sent!"*) copied straight to your clipboard.

### 2. 🍳 Fridge Stare Eliminator (Pantry-to-Meal & Grocery Gap)
- **The Dread:** Standing in front of the open refrigerator for 5 minutes with cold air blowing on you, wondering what on earth to cook without generating a mountain of dishes.
- **The Solution:** Select or type whatever ingredients you have left in your crisper drawer and pantry.
- **The Output:**
  - A delicious **1-pan, under-3-step meal** (e.g. *Crispy Cheddar Pan Melt with Soy Butter*).
  - Explicit dish count (*"1 skillet, 1 fork"*).
  - Auto-compiled missing grocery checklist with copy-to-clipboard formatting.

### 3. 🗂️ Desktop & Inbox Clutter Tidier
- **The Dread:** A `Downloads/` and `Desktop/` folder holding 400 messy files named `Screenshot 2026-10-22 at 2.14.33 AM.png`, `final_pitch_v2_edit(1).pdf`, and old `.pkg` installers.
- **The Solution:** Open-weight semantic classifier sorts chaotic files into clean standard buckets (`01_Financial_Receipts/`, `02_Design_Assets/`).
- **The Output:**
  - Normalizes filenames to clean ISO dates (`YYYY-MM-DD_Category_Name.ext`).
  - Isolates and quarantines obsolete installer artifacts.
  - Generates a **1-click executable Bash/PowerShell script** to clean up everything in 0.04 seconds.

### 4. 🌙 Offline Sloth Snooze Companion (Soundscapes & Sleep Stories)
- **The Dread:** Lying awake with screen fatigue, blue light exposure, and racing thoughts after hours of debugging.
- **The Solution:** Real-time generative Web Audio soundscapes synthesized directly in your browser:
  - **Gentle Canopy Rain:** Pink noise with leafy lowpass filtering.
  - **Forest Canopy Breeze:** Brownian noise modulated by a 0.12Hz slow gust LFO.
  - **4Hz Theta Sleep Frequency:** 136.1Hz Om carrier + 4Hz binaural restorative pulse.
  - **Sleep Timer:** Auto-fading master gain (5m, 15m, 30m, 45m).
  - **Interactive 4-4-7 Breathing Pacer** & slow-paced bedtime tales.
  - **100% Offline:** 0 bytes of external audio samples downloaded.

---

## 🔓 Why Open Innovation Matters for What We Built

The Hacktoberfest challenge specifically asks:
> *"Tell us why open innovation matters for what you built. Does it run on a laptop with no internet? Keep someone's data off a server they don't control? Let you fine-tune, swap models, or change how your agent behaves? Cost nothing to run? Tell us where your open-based approach worked better than a closed one."*

1. **Intimate Chat & Receipt Privacy:** Nobody wants to paste their family WhatsApp arguments or bank receipts into a proprietary corporate cloud endpoint where telemetry is harvested or retained for training. Because SlothOps is designed around open weights running locally via Ollama or WebGPU, **zero bytes leave the user's laptop**.
2. **The Zero-Dollar Laziness Guarantee:** Commercial AI charges per token or requires $20/month subscriptions. When the model is open-weight and local, summarizing 10 group chats a day costs **$0.00 forever**.
3. **True Airplane / Cabin Mode:** Built-in Web Audio synthesis and local weight execution mean the soundscape companion and recipe generator continue working in a remote cabin retreat without an internet signal.
4. **Model Autonomy:** Users can swap between Google Gemma 2B (for ultralight laptops), Gemma 9B (for deeper reasoning), or Prior Labs TabPFN for tabular prediction.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm or bun

### 1. Clone the repository
```bash
git clone https://github.com/your-username/slothops.git
cd slothops
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration (Optional)
SlothOps is designed to run **100% offline and locally out of the box** with zero required API keys.

If you wish to enable the optional server-side Google GenAI bridge:
```bash
cp .env.example .env
```
Open `.env` and set:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```
*(Note: `.env` is ignored by `.gitignore` to ensure your keys are never pushed to GitHub).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

---

## 🛡️ Security & Privacy Guarantee

- **Zero Secrets Committed:** No hardcoded API keys, tokens, or credentials exist in this repository.
- **Client/Local Execution:** Chat transcripts, pantry contents, and filenames are processed locally or against your own configured endpoints.
- **Safe Environment Setup:** All sensitive `.env*` files are strictly excluded via `.gitignore`.

---

## 🏆 Hacktoberfest 2026 Partner Categories

SlothOps is formatted for:
- **Best Use of Gemma (Google Open-Weight):** Using Gemma 2 for local, low-latency chat distillation and semantic categorization.
- **Best Use of Render:** Open-agent frontend and backend harness hosting.
- **Best Use of TabPFN (Prior Labs):** Tabular feature extraction for file hoarding patterns and energy conservation metrics.

Includes a **1-Click DEV Submission Generator** in the app to export your write-up with the required `#devchallenge` and `#hf26challenge` tags.

---

## 📄 License

Apache-2.0. Built with care for Hacktoberfest 2026.
