import re
import json

# Define the 36 members data
members_line1 = [
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
    },
    {
        "num": "005",
        "name": "PRIYA PATEL",
        "role": "HARDWARE LEAD",
        "sub": "Autonomous Robotics",
        "banner": "bg-emerald-600",
        "initials": "PP",
        "color": "from-emerald-600 to-teal-800",
        "skills": ["ROS 2", "LiDAR Fusion", "STM32 Motor PID", "Kinematics"],
        "link": "https://github.com"
    },
    {
        "num": "006",
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
        "num": "007",
        "name": "ANANYA VERMA",
        "role": "MEMBER",
        "sub": "TinyML & Edge AI",
        "banner": "bg-blue-600",
        "initials": "AV",
        "color": "from-blue-600 to-indigo-800",
        "skills": ["TinyML", "TFLite Micro", "CMSIS-NN", "Edge AI"],
        "link": "https://github.com"
    },
    {
        "num": "008",
        "name": "VIKRAM NAIR",
        "role": "MEMBER",
        "sub": "Sub-GHz & RF Systems",
        "banner": "bg-zinc-900",
        "initials": "VN",
        "color": "from-zinc-700 to-zinc-900",
        "skills": ["LoRaWAN", "SX1262 RF", "Sub-GHz", "Telemetry"],
        "link": "https://github.com"
    },
    {
        "num": "009",
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
        "num": "010",
        "name": "KAVYA NAIR",
        "role": "MEMBER",
        "sub": "RF Frontends & Antennas",
        "banner": "bg-blue-600",
        "initials": "KN",
        "color": "from-violet-600 to-purple-800",
        "skills": ["Differential Routing", "RF Frontends", "Altium Designer", "Antennas"],
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
        "name": "DEVANSH SINGHANIA",
        "role": "MEMBER",
        "sub": "Bus Analysis & Debug",
        "banner": "bg-zinc-900",
        "initials": "DS",
        "color": "from-slate-700 to-zinc-900",
        "skills": ["High-Speed Bus", "I2C/SPI Analysis", "Logic Sniffers", "JTAG"],
        "link": "https://github.com"
    }
]

members_line2 = [
    {
        "num": "013",
        "name": "MEERA IYER",
        "role": "TEAM LEAD",
        "sub": "Autonomous Drones",
        "banner": "bg-blue-600",
        "initials": "MI",
        "color": "from-sky-600 to-blue-800",
        "skills": ["PX4 Autopilot", "MAVLink", "Telemetry Mesh", "ROS2"],
        "link": "https://github.com"
    },
    {
        "num": "014",
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
        "num": "015",
        "name": "POOJA HEGDE",
        "role": "HARDWARE LEAD",
        "sub": "BMS & Power Systems",
        "banner": "bg-emerald-600",
        "initials": "PH",
        "color": "from-emerald-600 to-green-900",
        "skills": ["Battery BMS", "Power Distribution", "LiFePO4", "Thermal Flow"],
        "link": "https://github.com"
    },
    {
        "num": "016",
        "name": "ARJUN DESHMUKH",
        "role": "CO-LEAD",
        "sub": "Robotics Actuation",
        "banner": "bg-[#f95738]",
        "initials": "AD",
        "color": "from-orange-600 to-red-800",
        "skills": ["Inverse Kinematics", "BLDC FOC Control", "CAN Bus", "Rotary Encoders"],
        "link": "https://github.com"
    },
    {
        "num": "017",
        "name": "RITIKA BOSE",
        "role": "MEMBER",
        "sub": "BLE & Wearables",
        "banner": "bg-blue-600",
        "initials": "RB",
        "color": "from-pink-600 to-rose-900",
        "skills": ["ESP-NOW Mesh", "Wearable Haptics", "Nordic nRF52", "BLE 5.3"],
        "link": "https://github.com"
    },
    {
        "num": "018",
        "name": "YASHVARDHAN RAO",
        "role": "SILICON ARCHITECT",
        "sub": "Custom CPU Cores",
        "banner": "bg-indigo-600",
        "initials": "YR",
        "color": "from-violet-700 to-indigo-950",
        "skills": ["Chisel HDL", "RV32IM Core", "Memory Controller", "Simulation"],
        "link": "https://github.com"
    },
    {
        "num": "019",
        "name": "NIKHIL GUPTA",
        "role": "MEMBER",
        "sub": "Rapid Prototyping",
        "banner": "bg-zinc-900",
        "initials": "NG",
        "color": "from-stone-700 to-zinc-900",
        "skills": ["CNC Machining", "Rapid Prototyping", "SLA 3D Printing", "CAD Enclosures"],
        "link": "https://github.com"
    },
    {
        "num": "020",
        "name": "SHREYA BANSAL",
        "role": "MEMBER",
        "sub": "Industrial IoT & RS-485",
        "banner": "bg-blue-600",
        "initials": "SB",
        "color": "from-cyan-600 to-blue-900",
        "skills": ["Modbus RTU", "RS-485 Nodes", "Isolated Gate Drivers", "Sensors"],
        "link": "https://github.com"
    },
    {
        "num": "021",
        "name": "HARSH VARDHAN",
        "role": "HARDWARE LEAD",
        "sub": "Inertial Navigation & RTK",
        "banner": "bg-emerald-600",
        "initials": "HV",
        "color": "from-teal-600 to-emerald-900",
        "skills": ["Differential GPS", "RTK Positioning", "Inertial IMU", "Kalman Filter"],
        "link": "https://github.com"
    },
    {
        "num": "022",
        "name": "ISHAAN MALHOTRA",
        "role": "CO-LEAD",
        "sub": "Hardware Bench Labs",
        "banner": "bg-[#f95738]",
        "initials": "IM",
        "color": "from-amber-600 to-yellow-800",
        "skills": ["Hackathon Sprints", "Hardware Bench", "Soldering Labs", "Mentorship"],
        "link": "https://github.com"
    },
    {
        "num": "023",
        "name": "DIYA KULKARNI",
        "role": "MEMBER",
        "sub": "Edge Audio & DSP",
        "banner": "bg-blue-600",
        "initials": "DK",
        "color": "from-fuchsia-600 to-purple-900",
        "skills": ["Digital Signal Proc", "FFT Audio", "I2S Mics", "Edge Voice ML"],
        "link": "https://github.com"
    },
    {
        "num": "024",
        "name": "PRANAV JOSHI",
        "role": "MEMBER",
        "sub": "Subsea & Water Hardware",
        "banner": "bg-zinc-900",
        "initials": "PJ",
        "color": "from-blue-800 to-slate-950",
        "skills": ["Subsea Robotics", "Waterproof Thrusters", "Pressure Sensors", "Depth Hold"],
        "link": "https://github.com"
    }
]

members_line3 = [
    {
        "num": "025",
        "name": "SNEHA REDDY",
        "role": "TEAM LEAD",
        "sub": "ASIC & Silicon Layout",
        "banner": "bg-blue-600",
        "initials": "SR",
        "color": "from-indigo-600 to-violet-900",
        "skills": ["SkyWater 130nm", "OpenLane GDSII", "Magic VLSI", "Analog Layout"],
        "link": "https://github.com"
    },
    {
        "num": "026",
        "name": "MANAS TIWARI",
        "role": "MEMBER",
        "sub": "SMD Assembly & Reflow",
        "banner": "bg-zinc-900",
        "initials": "MT",
        "color": "from-zinc-700 to-neutral-900",
        "skills": ["Pick & Place SMD", "Stencils & Reflow", "AOI Inspection", "Assembly"],
        "link": "https://github.com"
    },
    {
        "num": "027",
        "name": "ADITI SAXENA",
        "role": "HARDWARE LEAD",
        "sub": "Satellite Ground Station",
        "banner": "bg-emerald-600",
        "initials": "AS",
        "color": "from-teal-600 to-emerald-950",
        "skills": ["Satellite Telemetry", "CubeSat Bus", "UHF/VHF Link", "AX.25 Packet"],
        "link": "https://github.com"
    },
    {
        "num": "028",
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
        "num": "029",
        "name": "RIYA SEN",
        "role": "MEMBER",
        "sub": "Automotive CAN FD",
        "banner": "bg-blue-600",
        "initials": "RS",
        "color": "from-sky-600 to-cyan-900",
        "skills": ["CAN FD Protocol", "LIN Bus Nodes", "High-Side Switches", "ECU Tuning"],
        "link": "https://github.com"
    },
    {
        "num": "030",
        "name": "KUNAL MEHTA",
        "role": "SILICON ARCHITECT",
        "sub": "FPGA SoC Architect",
        "banner": "bg-indigo-600",
        "initials": "KM",
        "color": "from-purple-700 to-indigo-950",
        "skills": ["VHDL-2008", "Zynq FPGA SoC", "AXI Interconnect", "DMA Drivers"],
        "link": "https://github.com"
    },
    {
        "num": "031",
        "name": "TARUN CHOUDHARY",
        "role": "MEMBER",
        "sub": "Bio-Sensors & Analog FE",
        "banner": "bg-zinc-900",
        "initials": "TC",
        "color": "from-slate-700 to-zinc-900",
        "skills": ["Bio-Sensors", "ECG Analog FE", "Electrode Filtering", "Low Noise"],
        "link": "https://github.com"
    },
    {
        "num": "032",
        "name": "ANUSHKA MISHRA",
        "role": "MEMBER",
        "sub": "Power Electronics & Solar",
        "banner": "bg-blue-600",
        "initials": "AM",
        "color": "from-amber-600 to-orange-900",
        "skills": ["Solar MPPT", "Buck-Boost Efficiency", "GaN FETs", "Energy Harvest"],
        "link": "https://github.com"
    },
    {
        "num": "033",
        "name": "VEDANT GOKHALE",
        "role": "HARDWARE LEAD",
        "sub": "EMI Compliance & RF Rigs",
        "banner": "bg-emerald-600",
        "initials": "VG",
        "color": "from-emerald-700 to-teal-950",
        "skills": ["Precision Metrology", "Oscilloscope Rigs", "EMI Sniffing", "Compliance"],
        "link": "https://github.com"
    },
    {
        "num": "034",
        "name": "SAMRIDDHI PAUL",
        "role": "CO-LEAD",
        "sub": "National University Chapters",
        "banner": "bg-[#f95738]",
        "initials": "SP",
        "color": "from-rose-600 to-red-900",
        "skills": ["Hackathon Ops", "University Chapters", "Hardware Grants", "Community"],
        "link": "https://github.com"
    },
    {
        "num": "035",
        "name": "CHETAN RAJPUT",
        "role": "MEMBER",
        "sub": "Rugged Field Deployments",
        "banner": "bg-zinc-900",
        "initials": "CR",
        "color": "from-stone-700 to-neutral-900",
        "skills": ["LoRa Mesh Relays", "Solar Field Nodes", "Custom Antennas", "IP67 Seals"],
        "link": "https://github.com"
    },
    {
        "num": "036",
        "name": "TRISHA SHAH",
        "role": "TEAM LEAD",
        "sub": "Physical Computing",
        "banner": "bg-blue-600",
        "initials": "TS",
        "color": "from-blue-600 to-indigo-900",
        "skills": ["Physical Computing", "Interactive Silicon", "Haptic Rigs", "Sensors"],
        "link": "https://github.com"
    }
]

def render_badge(m):
    # Render avatar: photo or stylish monogram
    if "avatar" in m:
        avatar_html = f'<img src="{m["avatar"]}" alt="{m["name"]}" class="w-full h-full object-cover">'
    else:
        init = m.get("initials", m["name"][:2])
        color = m.get("color", "from-zinc-800 to-zinc-950")
        avatar_html = f'<div class="w-full h-full bg-gradient-to-br {color} flex items-center justify-center font-mono font-black text-white text-xl tracking-wider select-none">{init}</div>'

    # Skills tags
    skill_spans = "".join([f'<span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100 border border-zinc-200/90 text-zinc-700">{s}</span>' for s in m["skills"]])

    return f"""
        <!-- Hanging ID Badge Card #{m["num"]} -->
        <div class="relative group/card flex-shrink-0 flex flex-col items-center select-none" style="width: 285px;">
          
          <!-- Overhead Strap & Metallic Clasp -->
          <div class="flex flex-col items-center">
            <!-- Striped Lanyard Strap -->
            <div class="w-4 h-11 bg-zinc-950 border-x border-zinc-700/60 shadow-inner"
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
          <div class="relative w-full h-[430px] -mt-1 rounded-3xl bg-white text-zinc-900 border border-zinc-200 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover/card:-translate-y-1.5 group-hover/card:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            
            <!-- Top punch hole -->
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
              <p class="font-mono text-xs text-zinc-500 mt-1 font-semibold">{m.get("sub", "Hardware Engineer")}</p>
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

def render_marquee_line(line_num, line_label, members, direction):
    # Duplicate items for infinite seamless scroll
    cards_html = "".join([render_badge(m) for m in members * 2])
    anim_class = "animate-scroll-left" if direction == "left" else "animate-scroll-right"
    track_id = f"line-{line_num}-lanyard-track"
    
    return f"""
    <!-- {line_label} -->
    <div class="space-y-3">
      <div class="px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between">
        <span class="font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
          {line_label}
        </span>
        <span class="font-mono text-[11px] text-zinc-500">
          HOVER TO PAUSE &amp; INSPECT BADGE
        </span>
      </div>

      <!-- Overhead Steel Rail Running Horizontally -->
      <div class="relative w-full h-2.5 bg-zinc-900 border-t border-b border-zinc-700/80 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        <div class="absolute inset-x-0 top-0.5 h-[1px] bg-white/20"></div>
      </div>

      <!-- Moving Marquee Track -->
      <div class="relative w-full overflow-hidden py-2 select-none">
        <!-- Edge gradient masks for cinema feel -->
        <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

        <div id="{track_id}" class="{anim_class} flex gap-8 items-start px-4">
          {cards_html}
        </div>
      </div>
    </div>
    """

# Build complete section
section_html = f"""
  <!-- ================= 3 REVOLVING LINES OF HANGING LANYARD ID BADGES (36+ BUILDERS) ================= -->
  <section class="py-16 space-y-14 overflow-hidden">
    
    <!-- Section Title & Counter -->
    <div class="px-6 sm:px-12 max-w-7xl mx-auto space-y-4">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div class="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-400 tracking-widest uppercase mb-2">
            <span>[ HARDWARE SQUAD &amp; COLLECTIVE ]</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            36+ REVOLVING HARDWARE BADGES
          </h2>
        </div>
        <p class="text-zinc-400 text-sm max-w-md font-mono">
          Suspended lanyard credentials of student hardware hackers, silicon tapeout builders, robotics leads, and embedded engineers across India.
        </p>
      </div>
    </div>

    <!-- 3 Revolving Lines -->
    <div class="space-y-12">
      {render_marquee_line(1, "LINE 01 // FIRMWARE, ARCHITECTURE &amp; SYSTEMS LEADERSHIP", members_line1, "left")}
      {render_marquee_line(2, "LINE 02 // ROBOTICS, AUTONOMOUS SYSTEMS &amp; RF TELEMETRY", members_line2, "right")}
      {render_marquee_line(3, "LINE 03 // SILICON TAPEOUTS, HIGH-SPEED PCB &amp; FABRICATION", members_line3, "left")}
    </div>

  </section>
"""

# Now let's inject this into team.html
with open('team.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add keyframes to <style>
keyframes_css = """
    /* Revolving Lanyard Infinite Scroll Marquees */
    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    .animate-scroll-left {
      display: flex;
      width: max-content;
      animation: scrollLeft 55s linear infinite;
      will-change: transform;
    }

    .animate-scroll-right {
      display: flex;
      width: max-content;
      animation: scrollRight 55s linear infinite;
      will-change: transform;
    }

    .animate-scroll-left:hover,
    .animate-scroll-right:hover {
      animation-play-state: paused;
    }
"""

if 'scrollLeft' not in html:
    html = html.replace('</style>', keyframes_css + '\n  </style>')

# Remove founder section completely (from <!-- ================= FOUNDER SPOTLIGHT ================= --> to <!-- ================= CORE LEADERSHIP)
# And replace the CORE LEADERSHIP section with our new section_html
founder_start = html.find('<!-- ================= FOUNDER SPOTLIGHT ================= -->')
if founder_start != -1:
    # Find start of JOIN THE FELLOWSHIP BANNER
    next_banner = html.find('<!-- ================= JOIN THE FELLOWSHIP BANNER ================= -->')
    if next_banner != -1:
        html = html[:founder_start] + section_html + '\n\n  ' + html[next_banner:]
        print('Successfully replaced Founder Spotlight and Team section!')
    else:
        print('Could not find JOIN THE FELLOWSHIP BANNER')
else:
    print('Founder spotlight marker not found!')

# Write updated team.html
# Update the script at the bottom to render dynamic team into line-1-lanyard-track
old_script = """    function renderDynamicTeam(members) {
      const container = document.getElementById('team-grid-container');
      if (!container || !members || !members.length) return;
      container.innerHTML = members.map(m => `
        <div class="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-white/30 hover:bg-zinc-900/60 transition-all duration-300 group flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 group-hover:border-white/40 flex items-center justify-center font-mono font-bold text-white text-base">
                ${m.initials || (m.name ? m.name.substring(0, 2).toUpperCase() : 'NG')}
              </div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-zinc-200 border border-white/15">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                ${m.domain || 'BUILDER'}
              </span>
            </div>

            <div>
              <h3 class="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">${m.name}</h3>
              <p class="font-mono text-xs text-zinc-400">${m.role}</p>
            </div>

            <p class="text-xs text-zinc-400 leading-relaxed">
              ${m.bio}
            </p>

            <div class="space-y-1.5 pt-2">
              <div class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ACTIVE SHIPMENT</div>
              <div class="text-xs font-mono text-white bg-zinc-900/80 px-2.5 py-1.5 rounded border border-zinc-800 truncate">
                ${m.shipment || 'Hardware Prototype'}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-zinc-800/60 font-mono text-xs">
            <span class="text-zinc-500">${m.stack || 'Hardware • Embedded'}</span>
            <a href="${m.link || '#'}" target="_blank" rel="noopener noreferrer" class="text-zinc-300 hover:text-white hover:underline font-bold">Profile →</a>
          </div>
        </div>
      `).join('');
    }"""

new_script = """    function renderDynamicTeam(members) {
      const container = document.getElementById('line-1-lanyard-track');
      if (!container || !members || !members.length) return;
      const cardsHtml = members.map((m, idx) => {
        const num = String(idx + 1).padStart(3, '0');
        const roleBanner = m.domain === 'FIRMWARE' ? 'bg-blue-600' :
                           m.domain === 'ROBOTICS' ? 'bg-emerald-600' :
                           m.domain === 'HARDWARE' ? 'bg-emerald-600' :
                           m.domain === 'EDGE AI' ? 'bg-indigo-600' :
                           m.domain === 'COMMUNITY' ? 'bg-[#f95738]' : 'bg-blue-600';
        const skills = (m.stack || 'Embedded • C++ • Hardware').split(/[•,]/).map(s => s.trim()).filter(Boolean);
        const skillPills = skills.map(s => `<span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100 border border-zinc-200/90 text-zinc-700">${s}</span>`).join('');
        
        let avatarInner = '';
        if (m.name && m.name.toLowerCase().includes('tanmay')) {
          avatarInner = `<img src="team-tanmay.jpg" alt="${m.name}" class="w-full h-full object-cover">`;
        } else if (m.name && m.name.toLowerCase().includes('vansh')) {
          avatarInner = `<img src="team-vansh.jpg" alt="${m.name}" class="w-full h-full object-cover">`;
        } else if (m.name && m.name.toLowerCase().includes('ansh')) {
          avatarInner = `<img src="team-ansh.jpg" alt="${m.name}" class="w-full h-full object-cover">`;
        } else if (m.name && m.name.toLowerCase().includes('neerav')) {
          avatarInner = `<img src="team-neerav.jpg" alt="${m.name}" class="w-full h-full object-cover">`;
        } else {
          const init = m.initials || (m.name ? m.name.substring(0, 2).toUpperCase() : 'NG');
          avatarInner = `<div class="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center font-mono font-black text-white text-xl tracking-wider select-none">${init}</div>`;
        }

        return `
          <div class="relative group/card flex-shrink-0 flex flex-col items-center select-none" style="width: 285px;">
            <div class="flex flex-col items-center">
              <div class="w-4 h-11 bg-zinc-950 border-x border-zinc-700/60 shadow-inner"
                   style="background: repeating-linear-gradient(90deg, #18181b 0px, #18181b 3px, #f97316 3px, #f97316 6px, #18181b 6px, #18181b 10px, #f97316 10px, #f97316 13px, #18181b 13px, #18181b 16px);">
              </div>
              <div class="relative flex flex-col items-center -mt-0.5 z-20">
                <div class="w-5 h-2.5 rounded-[2px] bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 border border-zinc-600 shadow flex items-center justify-center">
                  <div class="w-2.5 h-1 bg-zinc-950 rounded-[1px]"></div>
                </div>
                <div class="w-1.5 h-2 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 border-x border-zinc-600"></div>
                <div class="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 bg-transparent -mt-0.5"></div>
              </div>
            </div>
            <div class="relative w-full h-[430px] -mt-1 rounded-3xl bg-white text-zinc-900 border border-zinc-200 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover/card:-translate-y-1.5 group-hover/card:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div class="pt-2.5 px-6 flex justify-center">
                <div class="w-12 h-2.5 rounded-full bg-zinc-950 border border-zinc-300/80 shadow-inner"></div>
              </div>
              <div class="px-6 pt-1 flex items-center justify-between">
                <span class="font-black text-[11px] tracking-[0.22em] text-zinc-800 uppercase">NEOGEN</span>
                <span class="font-mono text-xs font-bold text-zinc-400">#${num}</span>
              </div>
              <div class="px-6 pt-2.5">
                <div class="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm flex items-center justify-center">
                  ${avatarInner}
                </div>
              </div>
              <div class="px-6 pt-2">
                <h3 class="font-black text-2xl tracking-tight text-zinc-950 uppercase leading-none truncate">${m.name}</h3>
                <p class="font-mono text-xs text-zinc-500 mt-1 font-semibold truncate">${m.role || 'Hardware Engineer'}</p>
              </div>
              <div class="px-6 pb-3 flex flex-wrap gap-1.5 min-h-[68px] content-start">
                ${skillPills}
              </div>
              <div class="w-full px-6 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-white ${roleBanner}">
                <span>${m.domain || 'MEMBER'}</span>
                <a href="${m.link || '#'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 hover:underline text-white/95">Profile →</a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (cardsHtml) {
        container.innerHTML = cardsHtml + cardsHtml;
      }
    }"""

if old_script in html:
    html = html.replace(old_script, new_script)

with open('team.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Also update team/index.html
with open('team/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated both team.html and team/index.html successfully!')
