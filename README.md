# NeoGen Innovators

> **A Hardware Builder Network Across India**  
> Built by innovators, designed to ship physical silicon.

NeoGen Innovators is an independent, student-led physical computing and hardware engineering community uniting passionate builders across India to design custom microcontrollers, write bare-metal RTOS firmware, and deploy quantized neural models directly onto edge silicon.

---

## ⚡ Tech Stack & Architecture

- **Frontend Core**: Vanilla HTML5, Tailwind CSS, Lucide Icons, Modern Typography (`Plus Jakarta Sans`, `JetBrains Mono`, `Anton`).
- **Dynamic Physics & Motion**:
  - Hanging Sagging String Polaroid Line Gallery with physics-based cloth & peg simulation.
  - Sticky line-by-line scroll-reveal animations.
  - Interactive 3D perspective cube and particle meshes.
- **Backend & Persistence**:
  - Node.js lightweight runtime server (`server.js`).
  - Real-time client state sync (`cms-client.js`).
  - Permanent file-backed CMS (`site_content.json`).
  - Supabase integration ready (`schema.sql`, `js/supabaseClient.js`).
- **Admin System**:
  - Master Admin Console at `/admin` (`admin.html`) with universal content editing, live multi-tab sync, and visual polaroid gallery manager.
  - Dedicated Team Dashboard at `/teamlogin` (`dashboard.html`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Run Locally
```bash
# Clone the repository
git clone https://github.com/tanmaytuliofficial/neogeninnovators.git
cd neogeninnovators

# Start the local server
node server.js
```

The application will be live at:
- **Main Website**: [http://localhost:3000](http://localhost:3000)
- **Team Page**: [http://localhost:3000/team](http://localhost:3000/team)
- **Admin Console**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Team Login**: [http://localhost:3000/teamlogin](http://localhost:3000/teamlogin)

---

## 📁 Repository Structure

```
neogeninnovators/
├── index.html           # Main Landing Page & Interactive Experiences
├── team.html            # Dedicated Team & Minds Page
├── admin.html           # Master Admin Console (Obsidian Dark SaaS)
├── dashboard.html       # Team Member Portal
├── cms-client.js        # Universal Real-Time CMS Client Sync
├── site_content.json    # Universal Content Storage
├── server.js            # Node Server & API Handlers
├── schema.sql           # Database Schema for Supabase
├── js/                  # Animations, Particles, and Client Scripts
├── components/          # Reusable UI Blocks
└── lib/                 # Core utilities
```

---

## 🛡️ License
© 2026 Neo Gen Innovators. All rights reserved.
