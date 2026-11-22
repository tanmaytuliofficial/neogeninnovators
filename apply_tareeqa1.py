import json
import re

# Data for 4 squads
squads_data = {
    "firmware": {
        "title": "SQUAD 01 // FIRMWARE, RTOS & LOW-LEVEL SYSTEMS",
        "desc": "Led by Tanmay Tuli. Architects multi-threaded embedded firmware for ESP32 & STM32, bare-metal bootloaders, and low-latency interrupt handling.",
        "members": [
            {
                "num": "001",
                "name": "TANMAY TULI",
                "role": "TEAM LEAD",
                "sub": "Lead Firmware Architect",
                "banner": "bg-blue-600",
                "avatar": "team-tanmay.jpg",
                "skills": ["Web Dev", "Python", "FreeRTOS", "ESP32-S3"],
                "link": "https://github.com/tanmaytuliofficial"
            },
            {
                "num": "002",
                "name": "VANSH BINDAL",
                "role": "CO-LEAD",
                "sub": "Full Stack & DevOps",
                "banner": "bg-[#f95738]",
                "avatar": "team-vansh.jpg",
                "skills": ["Full Stack Dev", "DevOps & Docker", "Automation", "Server Hosting"],
                "link": "https://github.com"
            },
            {
                "num": "003",
                "name": "ANSH JAIN",
                "role": "MEMBER",
                "sub": "Embedded IoT & Web",
                "banner": "bg-zinc-900",
                "avatar": "team-ansh.jpg",
                "skills": ["C++", "Python", "Exploring IoT", "Web Development"],
                "link": "https://github.com"
            },
            {
                "num": "004",
                "name": "NEERAV MADAAN",
                "role": "MEMBER",
                "sub": "Hardware Systems",
                "banner": "bg-blue-600",
                "avatar": "team-neerav.jpg",
                "skills": ["Embedded C", "KiCad PCB", "ARM Cortex", "Bootloaders"],
                "link": "https://github.com"
            }
        ]
    },
    "robotics": {
        "title": "SQUAD 02 // AUTONOMOUS ROBOTICS & DRONES",
        "desc": "Led by Priya Patel. Specializes in kinematic motor control, LiDAR sensor fusion, PX4 autopilots, and ROS2 navigation stacks.",
        "members": [
            {
                "num": "005",
                "name": "PRIYA PATEL",
                "role": "ROBOTICS LEAD",
                "sub": "Autonomous Robotics Lead",
                "banner": "bg-emerald-600",
                "initials": "PP",
                "color": "from-emerald-600 to-teal-800",
                "skills": ["ROS 2", "LiDAR Fusion", "STM32 Motor PID", "Kinematics"],
                "link": "https://github.com"
            },
            {
                "num": "006",
                "name": "ARJUN DESHMUKH",
                "role": "CO-LEAD",
                "sub": "Robotics Actuation & FOC",
                "banner": "bg-[#f95738]",
                "initials": "AD",
                "color": "from-orange-600 to-red-800",
                "skills": ["Inverse Kinematics", "BLDC FOC Control", "CAN Bus", "Rotary Encoders"],
                "link": "https://github.com"
            },
            {
                "num": "007",
                "name": "KABIR CHAWLA",
                "role": "MEMBER",
                "sub": "Edge Computer Vision",
                "banner": "bg-zinc-900",
                "initials": "KC",
                "color": "from-zinc-700 to-zinc-950",
                "skills": ["Computer Vision", "YOLOv8 INT8", "Stereo Depth", "OpenCV"],
                "link": "https://github.com"
            },
            {
                "num": "008",
                "name": "HARSH VARDHAN",
                "role": "MEMBER",
                "sub": "Inertial Navigation & RTK",
                "banner": "bg-blue-600",
                "initials": "HV",
                "color": "from-teal-600 to-emerald-900",
                "skills": ["Differential GPS", "RTK Positioning", "Inertial IMU", "Kalman Filter"],
                "link": "https://github.com"
            }
        ]
    },
    "silicon": {
        "title": "SQUAD 03 // SILICON TAPEOUTS & HIGH-SPEED PCB",
        "desc": "Led by Rohan Sen. Designs 4-layer impedance-matched PCBs, high-speed differential signal pairs, and RISC-V open ASIC flows.",
        "members": [
            {
                "num": "009",
                "name": "ROHAN SEN",
                "role": "HARDWARE LEAD",
                "sub": "High-Speed PCB Engineer",
                "banner": "bg-emerald-600",
                "initials": "RS",
                "color": "from-teal-600 to-cyan-800",
                "skills": ["KiCad 8", "4-Layer PCB", "SMD Soldering", "Signal Integrity"],
                "link": "https://github.com"
            },
            {
                "num": "010",
                "name": "GAURAV MITTAL",
                "role": "CO-LEAD",
                "sub": "PCB Tooling & Panelization",
                "banner": "bg-[#f95738]",
                "initials": "GM",
                "color": "from-orange-600 to-amber-900",
                "skills": ["KiCad Scripting", "Auto-Router Rules", "Panelization", "BOM Tooling"],
                "link": "https://github.com"
            },
            {
                "num": "011",
                "name": "SIDDHARTH ROY",
                "role": "SILICON ARCHITECT",
                "sub": "RISC-V & ASIC Design",
                "banner": "bg-indigo-600",
                "initials": "SR",
                "color": "from-indigo-600 to-blue-900",
                "skills": ["RISC-V", "Verilog HDL", "FPGA Synthesis", "OpenLane ASIC"],
                "link": "https://github.com"
            },
            {
                "num": "012",
                "name": "SNEHA REDDY",
                "role": "MEMBER",
                "sub": "ASIC & Silicon Layout",
                "banner": "bg-blue-600",
                "initials": "SR",
                "color": "from-indigo-600 to-violet-900",
                "skills": ["SkyWater 130nm", "OpenLane GDSII", "Magic VLSI", "Analog Layout"],
                "link": "https://github.com"
            }
        ]
    },
    "rf_ai": {
        "title": "SQUAD 04 // RF TELEMETRY, SUB-GHZ & EDGE AI",
        "desc": "Led by Vikram Nair. Long-range Sub-GHz telemetry nodes, custom packet framing protocols, and INT8 quantized TinyML vision.",
        "members": [
            {
                "num": "013",
                "name": "VIKRAM NAIR",
                "role": "RF LEAD",
                "sub": "Sub-GHz & RF Systems",
                "banner": "bg-blue-600",
                "initials": "VN",
                "color": "from-zinc-700 to-zinc-900",
                "skills": ["LoRaWAN", "SX1262 RF", "Sub-GHz", "Telemetry"],
                "link": "https://github.com"
            },
            {
                "num": "014",
                "name": "AARAV SHARMA",
                "role": "CO-LEAD",
                "sub": "Hardware Hackathons",
                "banner": "bg-[#f95738]",
                "initials": "AS",
                "color": "from-amber-600 to-orange-800",
                "skills": ["Maker Sprints", "Rapid Breadboard", "Hackathons", "Firmware"],
                "link": "https://github.com"
            },
            {
                "num": "015",
                "name": "ANANYA VERMA",
                "role": "EDGE AI LEAD",
                "sub": "TinyML & Edge AI",
                "banner": "bg-indigo-600",
                "initials": "AV",
                "color": "from-blue-600 to-indigo-800",
                "skills": ["TinyML", "TFLite Micro", "CMSIS-NN", "Edge AI"],
                "link": "https://github.com"
            },
            {
                "num": "016",
                "name": "KAVYA NAIR",
                "role": "MEMBER",
                "sub": "RF Frontends & Antennas",
                "banner": "bg-zinc-900",
                "initials": "KN",
                "color": "from-violet-600 to-purple-800",
                "skills": ["Differential Routing", "RF Frontends", "Altium Designer", "Antennas"],
                "link": "https://github.com"
            }
        ]
    }
}

def render_badge(m):
    if "avatar" in m:
        avatar_html = f'<img src="{m["avatar"]}" alt="{m["name"]}" class="w-full h-full object-cover">'
    else:
        init = m.get("initials", m["name"][:2])
        color = m.get("color", "from-zinc-800 to-zinc-950")
        avatar_html = f'<div class="w-full h-full bg-gradient-to-br {color} flex items-center justify-center font-mono font-black text-white text-xl tracking-wider select-none">{init}</div>'

    skill_spans = "".join([f'<span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100 border border-zinc-200/90 text-zinc-700">{s}</span>' for s in m["skills"]])

    return f"""
        <!-- Hanging ID Badge Card #{m["num"]} -->
        <div class="relative group/card w-full max-w-[285px] flex flex-col items-center select-none">
          
          <!-- Overhead Strap & Metallic Clasp -->
          <div class="flex flex-col items-center">
            <!-- Striped Lanyard Strap -->
            <div class="w-4 h-12 bg-zinc-950 border-x border-zinc-700/60 shadow-inner"
                 style="background: repeating-linear-gradient(90deg, #18181b 0px, #18181b 3px, #f97316 3px, #f97316 6px, #18181b 6px, #18181b 10px, #f97316 10px, #f97316 13px, #18181b 13px, #18181b 16px);">
            </div>
            <!-- Metallic Buckle & Swivel Snap Hook -->
            <div class="relative flex flex-col items-center -mt-0.5 z-20">
              <div class="w-5 h-2.5 rounded-[2px] bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 border border-zinc-600 shadow flex items-center justify-center">
                <div class="w-2.5 h-1 bg-zinc-950 rounded-[1px]"></div>
              </div>
              <div class="w-1.5 h-2 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 border-x border-zinc-600"></div>
              <div class="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 bg-transparent -mt-0.5"></div>
            </div>
          </div>

          <!-- White Hanging Credential Badge Card -->
          <div class="relative w-full h-[435px] -mt-1 rounded-3xl bg-white text-zinc-900 border border-zinc-200 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_25px_50px_rgba(0,0,0,0.6)]">
            
            <!-- Top punch hole slot -->
            <div class="pt-2.5 px-6 flex justify-center">
              <div class="w-12 h-2.5 rounded-full bg-zinc-950 border border-zinc-300/80 shadow-inner"></div>
            </div>

            <!-- Header: NEOGEN & Serial Number -->
            <div class="px-6 pt-1 flex items-center justify-between">
              <span class="font-black text-[11px] tracking-[0.22em] text-zinc-800 uppercase">NEOGEN</span>
              <span class="font-mono text-xs font-bold text-zinc-400">#{m["num"]}</span>
            </div>

            <!-- Avatar -->
            <div class="px-6 pt-2.5">
              <div class="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm flex items-center justify-center">
                {avatar_html}
              </div>
            </div>

            <!-- Name & Title -->
            <div class="px-6 pt-2">
              <h3 class="font-black text-2xl tracking-tight text-zinc-950 uppercase leading-none truncate">{m["name"]}</h3>
              <p class="font-mono text-xs text-zinc-500 mt-1 font-semibold truncate">{m.get("sub", "Hardware Engineer")}</p>
            </div>

            <!-- Tech Stack / Skill Pills -->
            <div class="px-6 pb-3 flex flex-wrap gap-1.5 min-h-[68px] content-start">
              {skill_spans}
            </div>

            <!-- Bottom Role Banner -->
            <div class="w-full px-6 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-white {m["banner"]}">
              <span>{m["role"]}</span>
              <a href="{m.get("link", "#")}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 hover:underline text-white/95">
                Profile →
              </a>
            </div>

          </div>
        </div>
    """

def render_squad_panel(squad_key, squad_info, is_active=False):
    display_class = "block" if is_active else "hidden"
    cards_html = "".join([render_badge(m) for m in squad_info["members"]])

    return f"""
    <!-- Squad Panel: {squad_key} -->
    <div id="squad-panel-{squad_key}" class="squad-panel {display_class} space-y-6 transition-all duration-300">
      
      <!-- Squad Subheading & Description -->
      <div class="text-center max-w-3xl mx-auto space-y-2 px-4">
        <div class="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-400 tracking-widest uppercase">
          <span>{squad_info["title"]}</span>
        </div>
        <p class="text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed">
          {squad_info["desc"]}
        </p>
      </div>

      <!-- Overhead Steel Rail Spanning Full Width of the 4 Badges -->
      <div class="relative w-full max-w-6xl mx-auto">
        <div class="relative w-full h-2.5 bg-zinc-900 border-t border-b border-zinc-700/80 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          <div class="absolute inset-x-0 top-0.5 h-[1px] bg-white/20"></div>
        </div>

        <!-- 4 Hanging Badges on the Rail (Lead + Teammates) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-0 justify-items-center">
          {cards_html}
        </div>
      </div>

    </div>
    """

# Build entire section
squad_panels_html = "\n".join([
    render_squad_panel("firmware", squads_data["firmware"], is_active=True),
    render_squad_panel("robotics", squads_data["robotics"], is_active=False),
    render_squad_panel("silicon", squads_data["silicon"], is_active=False),
    render_squad_panel("rf_ai", squads_data["rf_ai"], is_active=False)
])

new_team_section = f"""
  <!-- ================= SQUAD-BASED HANGING LANYARD SYSTEM (TAREEQA 1) ================= -->
  <section class="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 overflow-hidden">
    
    <!-- Section Title & Context -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-400 tracking-widest uppercase">
        <span>[ HARDWARE SQUADS &amp; ENGINEERING PODS ]</span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
        CORE ENGINEERING SQUADS
      </h2>
      <p class="text-zinc-400 text-sm font-mono leading-relaxed">
        Organized by domain specialization. Each squad features its Lead Architect suspended alongside core teammates and fabrication partners.
      </p>

      <!-- Squad Switcher Tabs (Halcyon / Linear Style) -->
      <div class="flex flex-wrap items-center justify-center gap-2.5 pt-4">
        <button onclick="switchSquad('firmware')" id="tab-firmware" class="squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-white text-black shadow-lg shadow-white/10">
          ⚡ Firmware &amp; Systems
        </button>
        <button onclick="switchSquad('robotics')" id="tab-robotics" class="squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800">
          🤖 Robotics &amp; Autonomy
        </button>
        <button onclick="switchSquad('silicon')" id="tab-silicon" class="squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800">
          🖲️ Silicon &amp; High-Speed PCB
        </button>
        <button onclick="switchSquad('rf_ai')" id="tab-rf_ai" class="squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800">
          📡 RF Telemetry &amp; Edge AI
        </button>
      </div>
    </div>

    <!-- Squad Panels Container -->
    <div id="squad-panels-wrapper" class="relative min-h-[560px]">
      {squad_panels_html}
    </div>

  </section>
"""

# Tab switching JavaScript
squad_script = """
    // Squad Switcher Function (Tareeqa 1)
    function switchSquad(squadKey) {
      // Update Tab Button styles
      const tabs = document.querySelectorAll('.squad-tab-btn');
      tabs.forEach(tab => {
        tab.className = 'squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800';
      });

      const activeTab = document.getElementById('tab-' + squadKey);
      if (activeTab) {
        activeTab.className = 'squad-tab-btn px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-white text-black shadow-lg shadow-white/10';
      }

      // Hide all panels, reveal selected
      const panels = document.querySelectorAll('.squad-panel');
      panels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('block');
      });

      const activePanel = document.getElementById('squad-panel-' + squadKey);
      if (activePanel) {
        activePanel.classList.remove('hidden');
        activePanel.classList.add('block');
      }
    }
"""

with open('team.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace previous revolving section
old_section_start = html.find('<!-- ================= 3 REVOLVING LINES')
if old_section_start != -1:
    old_section_end = html.find('<!-- ================= JOIN THE FELLOWSHIP BANNER')
    if old_section_end != -1:
        html = html[:old_section_start] + new_team_section + '\n\n  ' + html[old_section_end:]
        print('Replaced revolving section with Squad-Based Tareeqa 1!')
    else:
        print('Could not find JOIN THE FELLOWSHIP BANNER')
else:
    print('Could not find 3 REVOLVING LINES')

# Add switchSquad script
if 'function switchSquad' not in html:
    html = html.replace('function renderDynamicTeam', squad_script + '\n    function renderDynamicTeam')

with open('team.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('team/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated team.html and team/index.html successfully!')
