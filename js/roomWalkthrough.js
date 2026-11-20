/**
 * Neo Gen Innovators - Authentic Techkriti-Style 3D Room Walkthrough
 * 100% visible, warm wooden architecture, synchronous high-res canvas painting,
 * glowing laser corner frames, and smooth scroll camera navigation.
 */

export class TechkritiRoom {
  constructor(options = {}) {
    this.canvas = document.getElementById(options.canvasId || 'webgl-canvas');
    this.totalStations = 5;
    this.wallMeshes = [];

    // Camera Waypoints along the 3D Wooden Corridor
    this.waypoints = [
      // Station 0: Entrance Foyer & Hero Wall
      {
        camPos: new THREE.Vector3(0, 1.8, 8),
        lookAt: new THREE.Vector3(0, 2.0, -3),
        stationIndex: 0,
        name: '00. SYSTEM INIT'
      },
      // Station 1: Chapter 01 - The Silicon Genesis (Mounted on Left Wall)
      {
        camPos: new THREE.Vector3(2.2, 1.8, -26),
        lookAt: new THREE.Vector3(-6.8, 2.1, -28),
        stationIndex: 1,
        name: '01. SILICON GENESIS'
      },
      // Station 2: Chapter 02 - Hardware Testbench (Mounted on Right Wall)
      {
        camPos: new THREE.Vector3(-2.2, 1.8, -52),
        lookAt: new THREE.Vector3(6.8, 2.1, -54),
        stationIndex: 2,
        name: '02. HARDWARE TESTBENCH'
      },
      // Station 3: Chapter 03 - The Collective (Mounted on Left Wall)
      {
        camPos: new THREE.Vector3(2.2, 1.8, -78),
        lookAt: new THREE.Vector3(-6.8, 2.1, -80),
        stationIndex: 3,
        name: '03. THE COLLECTIVE'
      },
      // Station 4: Chapter 04 - Hackathon War Room (Grand End Terminal Wall)
      {
        camPos: new THREE.Vector3(0, 1.9, -100),
        lookAt: new THREE.Vector3(0, 2.2, -114),
        stationIndex: 4,
        name: '04. WAR ROOM'
      }
    ];

    this.currentCamPos = new THREE.Vector3().copy(this.waypoints[0].camPos);
    this.currentLookAt = new THREE.Vector3().copy(this.waypoints[0].lookAt);
    this.targetCamPos = new THREE.Vector3().copy(this.waypoints[0].camPos);
    this.targetLookAt = new THREE.Vector3().copy(this.waypoints[0].lookAt);

    this.initScene();
    this.buildRoomArchitecture();
    this.buildExhibitWalls();
    this.setupScrollListener();
    this.animate();
  }

  initScene() {
    // 1. Scene with warm ambient fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a120c); // Warm amber-dark background (not pitch black!)
    this.scene.fog = new THREE.Fog(0x1a120c, 30, 130);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      56,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Bright Warm Gallery Lighting
    const ambientLight = new THREE.AmbientLight(0xffecd6, 1.8);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    sunLight.position.set(8, 16, 12);
    this.scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    backLight.position.set(-8, 10, -50);
    this.scene.add(backLight);

    // Spotlights for each station
    this.createSpotLight(0, 5, 2, 0, 2, -3, 0xf59e0b);
    this.createSpotLight(0, 5, -22, -6.8, 2, -28, 0xfbbf24);
    this.createSpotLight(0, 5, -48, 6.8, 2, -54, 0x38bdf8);
    this.createSpotLight(0, 5, -74, -6.8, 2, -80, 0xf59e0b);
    this.createSpotLight(0, 5, -96, 0, 2, -114, 0x38bdf8);
  }

  createSpotLight(px, py, pz, tx, ty, tz, color) {
    const spot = new THREE.SpotLight(color, 3.5, 30, Math.PI / 3, 0.4);
    spot.position.set(px, py, pz);
    spot.target.position.set(tx, ty, tz);
    this.scene.add(spot);
    this.scene.add(spot.target);
  }

  buildRoomArchitecture() {
    // ================= 1. WARM GOLDEN OAK PARQUET FLOOR =================
    const floorTexture = this.generateWoodFloorTexture();
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(6, 40);

    const floorGeo = new THREE.PlaneGeometry(18, 150, 16, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.35,
      metalness: 0.15,
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -55);
    this.scene.add(floor);

    // ================= 2. WOODEN CEILING & CROSS BEAMS =================
    const ceilingGeo = new THREE.PlaneGeometry(18, 150);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x241810,
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 5.2, -55);
    this.scene.add(ceiling);

    // Overhead wooden cross beams with embedded light strips
    for (let z = 12; z >= -125; z -= 11) {
      const beamGeo = new THREE.BoxGeometry(18, 0.35, 0.5);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x3d2719, roughness: 0.6 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 5.0, z);
      this.scene.add(beam);

      // Warm LED line
      const ledGeo = new THREE.BoxGeometry(13, 0.05, 0.08);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, 4.8, z);
      this.scene.add(led);
    }

    // ================= 3. WARM MAHOGANY WOODEN SLAT WALLS =================
    const wallTex = this.generateWoodWallTexture();
    wallTex.wrapS = THREE.RepeatWrapping;
    wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(20, 2);

    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.5,
      metalness: 0.15,
      side: THREE.DoubleSide
    });

    // Left Corridor Wall
    const leftWallGeo = new THREE.PlaneGeometry(150, 5.2);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-8.0, 2.6, -55);
    this.scene.add(leftWall);

    // Right Corridor Wall
    const rightWall = new THREE.Mesh(leftWallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(8.0, 2.6, -55);
    this.scene.add(rightWall);

    // End Grand Terminal Wall (At Z = -120)
    const backWallGeo = new THREE.PlaneGeometry(18, 5.2);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 2.6, -120);
    this.scene.add(backWall);

    // Brass Handrails running along both sides with brackets
    this.createBrassRail(-7.8, -55, 150);
    this.createBrassRail(7.8, -55, 150);

    // Floating Golden Cyber-Embers in the room air
    this.createFloatingEmbers();
  }

  createBrassRail(x, centerZ, length) {
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25
    });
    const railGeo = new THREE.CylinderGeometry(0.045, 0.045, length, 12);
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(x, 1.05, centerZ);
    this.scene.add(rail);
  }

  createFloatingEmbers() {
    const count = 350;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 4.6 + 0.3;
      positions[i * 3 + 2] = Math.random() * -125 + 10;

      // Golden amber particles
      colors[i * 3] = 0.98;
      colors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.12;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(245,158,11,0.9)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const mat = new THREE.PointsMaterial({
      size: 0.25,
      map: new THREE.CanvasTexture(pCanvas),
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.embers = new THREE.Points(geo, mat);
    this.scene.add(this.embers);
  }

  buildExhibitWalls() {
    const wallConfigs = [
      // Wall 0: Entrance (Center facing camera)
      {
        pos: new THREE.Vector3(0, 2.3, -3),
        rotY: 0,
        width: 9.8,
        height: 5.4,
        stationIdx: 0,
        theme: 'amber'
      },
      // Wall 1: Chapter 01 - The Silicon Genesis (Mounted flush on Left Wall)
      {
        pos: new THREE.Vector3(-7.88, 2.35, -28),
        rotY: Math.PI / 2,
        width: 9.6,
        height: 5.1,
        stationIdx: 1,
        theme: 'amber'
      },
      // Wall 2: Chapter 02 - Hardware Testbench (Mounted flush on Right Wall)
      {
        pos: new THREE.Vector3(7.88, 2.35, -54),
        rotY: -Math.PI / 2,
        width: 9.6,
        height: 5.1,
        stationIdx: 2,
        theme: 'cyan'
      },
      // Wall 3: Chapter 03 - The Collective (Mounted flush on Left Wall)
      {
        pos: new THREE.Vector3(-7.88, 2.35, -80),
        rotY: Math.PI / 2,
        width: 9.6,
        height: 5.1,
        stationIdx: 3,
        theme: 'amber'
      },
      // Wall 4: Chapter 04 - Hackathon War Room (Grand End Terminal Wall)
      {
        pos: new THREE.Vector3(0, 2.45, -119.5),
        rotY: 0,
        width: 11.8,
        height: 5.2,
        stationIdx: 4,
        theme: 'cyan'
      }
    ];

    this.wallMeshes = [];

    wallConfigs.forEach((cfg, idx) => {
      const group = new THREE.Group();
      group.position.copy(cfg.pos);
      group.rotation.y = cfg.rotY;

      // Wooden Frame Box Backing
      const backGeo = new THREE.BoxGeometry(cfg.width + 0.35, cfg.height + 0.35, 0.1);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x20140e,
        roughness: 0.6,
        metalness: 0.2,
        side: THREE.DoubleSide
      });
      const backMesh = new THREE.Mesh(backGeo, backMat);
      group.add(backMesh);

      // Gold / Cyan Laser Trim
      const trimColor = cfg.theme === 'amber' ? 0xd97706 : 0x0284c7;
      const trimMat = new THREE.MeshStandardMaterial({
        color: trimColor,
        metalness: 0.9,
        roughness: 0.2
      });
      const trimGeo = new THREE.BoxGeometry(cfg.width + 0.42, cfg.height + 0.42, 0.03);
      const trimMesh = new THREE.Mesh(trimGeo, trimMat);
      trimMesh.position.z = -0.04;
      group.add(trimMesh);

      // Canvas Screen Mesh
      const screenGeo = new THREE.PlaneGeometry(cfg.width, cfg.height);
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 2048;
      screenCanvas.height = 1152;
      const screenTex = new THREE.CanvasTexture(screenCanvas);

      const screenMat = new THREE.MeshBasicMaterial({
        map: screenTex,
        side: THREE.DoubleSide
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.06;
      group.add(screenMesh);

      // Laser corner brackets (Techkriti signature)
      this.addLaserCorners(group, cfg.width, cfg.height, cfg.theme);

      this.scene.add(group);

      this.wallMeshes.push({
        group,
        canvas: screenCanvas,
        ctx: screenCanvas.getContext('2d'),
        texture: screenTex,
        cfg
      });
    });
  }

  addLaserCorners(parent, w, h, theme) {
    const color = theme === 'amber' ? 0xf59e0b : 0x38bdf8;
    const mat = new THREE.LineBasicMaterial({
      color,
      linewidth: 3
    });

    const hw = w / 2;
    const hh = h / 2;
    const arm = 0.65;
    const z = 0.09;

    const cornerPts = [
      // TL
      [new THREE.Vector3(-hw + arm, hh, z), new THREE.Vector3(-hw, hh, z), new THREE.Vector3(-hw, hh - arm, z)],
      // TR
      [new THREE.Vector3(hw - arm, hh, z), new THREE.Vector3(hw, hh, z), new THREE.Vector3(hw, hh - arm, z)],
      // BL
      [new THREE.Vector3(-hw + arm, -hh, z), new THREE.Vector3(-hw, -hh, z), new THREE.Vector3(-hw, -hh + arm, z)],
      // BR
      [new THREE.Vector3(hw - arm, -hh, z), new THREE.Vector3(hw, -hh, z), new THREE.Vector3(hw, -hh + arm, z)]
    ];

    cornerPts.forEach(pts => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, mat);
      parent.add(line);
    });
  }

  // ================= TEXTURE GENERATORS (Rich Warm Golden Wood) =================
  generateWoodFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Warm golden oak base
    ctx.fillStyle = '#a87438';
    ctx.fillRect(0, 0, 1024, 1024);

    const plankH = 128;
    for (let y = 0; y < 1024; y += plankH) {
      const offset = (y / plankH) % 2 === 0 ? 0 : 256;
      for (let x = -offset; x < 1024; x += 512) {
        const tone = Math.floor(Math.random() * 24 - 12);
        ctx.fillStyle = `rgb(${168 + tone}, ${116 + tone}, ${56 + tone})`;
        ctx.fillRect(x + 2, y + 2, 508, plankH - 4);

        // Wood grain
        ctx.strokeStyle = 'rgba(95, 55, 20, 0.28)';
        ctx.lineWidth = 1;
        for (let g = 0; g < 5; g++) {
          const gy = y + Math.random() * plankH;
          ctx.beginPath();
          ctx.moveTo(x, gy);
          ctx.bezierCurveTo(x + 150, gy + Math.random() * 8 - 4, x + 350, gy + Math.random() * 8 - 4, x + 512, gy);
          ctx.stroke();
        }
      }
      // Plank seam
      ctx.fillStyle = '#3a200e';
      ctx.fillRect(0, y + plankH - 3, 1024, 4);
    }
    return new THREE.CanvasTexture(canvas);
  }

  generateWoodWallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Warm cedar/walnut wood base
    ctx.fillStyle = '#4a2e1b';
    ctx.fillRect(0, 0, 512, 512);

    const slatW = 32;
    for (let x = 0; x < 512; x += slatW) {
      const tone = Math.floor(Math.random() * 16 - 8);
      ctx.fillStyle = `rgb(${74 + tone}, ${46 + tone}, ${27 + tone})`;
      ctx.fillRect(x + 1, 0, slatW - 2, 512);

      // Slat shadow groove
      ctx.fillStyle = '#211208';
      ctx.fillRect(x + slatW - 2, 0, 2, 512);
    }
    return new THREE.CanvasTexture(canvas);
  }

  // ================= DYNAMIC WALL CONTENT RENDERING (SYNCHRONOUS & RELIABLE) =================
  updateWallExhibits(content, teamMembers = []) {
    if (!this.wallMeshes || !this.wallMeshes.length) return;

    // WALL 0: SYSTEM INIT & HERO
    this.renderWallCanvas(0, {
      chapter: content.wall1_badge || 'CHAPTER 00 • SYSTEM INIT',
      title: content.wall1_title || 'NEO GEN INNOVATORS',
      subtitle: content.wall1_subtitle || 'Next-Gen IoT Hackathon Collective founded by Raushan Kumar.',
      extra: 'Bare-Metal RTOS • LoRaWAN Mesh • Edge AI Silicon',
      bgImgUrl: content.wall1_img,
      theme: 'amber'
    });

    // WALL 1: CHAPTER 01 - SILICON GENESIS
    this.renderWallCanvas(1, {
      chapter: content.wall2_chapter || 'CHAPTER 01',
      title: content.wall2_title || 'THE SILICON GENESIS',
      quote: content.wall2_quote || '"True innovation begins when sensors, microcontrollers, and neural networks collaborate in the physical world."',
      subtitle: content.wall2_body1 || 'Founded by Raushan Kumar to bridge software algorithms with physical silicon.',
      founder: content.wall2_founder || 'Raushan Kumar (Founder & Lead Architect)',
      bgImgUrl: content.wall2_img,
      theme: 'amber'
    });

    // WALL 2: CHAPTER 02 - HARDWARE TESTBENCH
    this.renderWallCanvas(2, {
      chapter: content.wall3_chapter || 'CHAPTER 02',
      title: content.wall3_title || 'HARDWARE TESTBENCH',
      subtitle: content.wall3_subtitle || 'Four core engineering vectors powering high-speed IoT hackathon cohorts.',
      pillars: [
        { title: content.wall3_p1_title || 'Embedded Edge AI', desc: content.wall3_p1_desc || 'Quantized TinyML on ARM Cortex-M silicon.' },
        { title: content.wall3_p2_title || 'Sub-GHz Mesh', desc: content.wall3_p2_desc || 'LoRaWAN, BLE Mesh & ESP-NOW peer networks.' },
        { title: content.wall3_p3_title || 'Autonomous Robotics', desc: content.wall3_p3_desc || 'ROS 2 micro-architectures with LiDAR SLAM.' },
        { title: content.wall3_p4_title || 'Zero-Trust Silicon', desc: content.wall3_p4_desc || 'Secure bootloaders & hardware crypto-elements.' }
      ],
      bgImgUrl: content.wall3_img,
      theme: 'cyan'
    });

    // WALL 3: CHAPTER 03 - THE COLLECTIVE
    this.renderWallCanvas(3, {
      chapter: content.wall4_chapter || 'CHAPTER 03',
      title: content.wall4_title || 'THE VERIFIED COLLECTIVE',
      subtitle: content.wall4_subtitle || 'Approved hardware engineers, firmware researchers & creators.',
      members: (teamMembers && teamMembers.length ? teamMembers : [
        { full_name: 'Raushan Kumar', title: 'Founder & Lead Architect', bio: 'IoT edge architecture, RTOS firmware and cyber-physical systems.' },
        { full_name: 'Aarav Sharma', title: 'Embedded Firmware Lead', bio: 'Low-power ESP32/STM32 engineer. Architect of mesh telemetry nodes.' },
        { full_name: 'Ananya Deshmukh', title: 'TinyML Specialist', bio: 'Deploying quantized neural networks on bare-metal silicon.' },
        { full_name: 'Vikramaditya Roy', title: 'Autonomous Robotics', bio: 'ROS 2 rovers with multi-spectral LiDAR integration and SLAM.' }
      ]).slice(0, 4),
      bgImgUrl: content.wall4_img,
      theme: 'amber'
    });

    // WALL 4: CHAPTER 04 - WAR ROOM & STATS
    this.renderWallCanvas(4, {
      chapter: content.wall5_chapter || 'CHAPTER 04',
      title: content.wall5_title || 'HACKATHON WAR ROOM',
      subtitle: content.wall5_subtitle || 'Numbers forged through intense hackathon sprints and physical hardware.',
      stats: [
        { label: 'Active Builders', val: content.stat_members || '500+' },
        { label: 'Hackathons Won', val: content.stat_hackathons || '18' },
        { label: 'IoT Prototypes', val: content.stat_prototypes || '120+' },
        { label: 'Hardware Grants', val: content.stat_grants || '$85K+' }
      ],
      bgImgUrl: content.wall5_img,
      theme: 'cyan'
    });
  }

  renderWallCanvas(index, data) {
    const wall = this.wallMeshes[index];
    if (!wall) return;
    const { canvas, ctx, texture } = wall;
    const w = canvas.width;
    const h = canvas.height;

    // STEP 1: IMMEDIATELY PAINT SYNCHRONOUSLY (No blank wait!)
    this.paintWallContent(ctx, w, h, data, null);
    texture.needsUpdate = true;

    // STEP 2: Optional background image enhancement
    if (data.bgImgUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.paintWallContent(ctx, w, h, data, img);
        texture.needsUpdate = true;
      };
      img.src = data.bgImgUrl;
    }
  }

  paintWallContent(ctx, w, h, data, bgImg) {
    const isAmber = data.theme === 'amber';
    const accentColor = isAmber ? '#f59e0b' : '#38bdf8';
    const glowColor = isAmber ? 'rgba(245, 158, 11, 0.45)' : 'rgba(56, 189, 248, 0.45)';

    // 1. Rich dark mahogany / obsidian exhibit canvas background
    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0, w, h);
      ctx.fillStyle = 'rgba(18, 12, 10, 0.82)';
      ctx.fillRect(0, 0, w, h);
    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#241610');
      bgGrad.addColorStop(0.5, '#150d09');
      bgGrad.addColorStop(1, '#0e0805');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle cyber grid lines on the wall
      ctx.strokeStyle = isAmber ? 'rgba(245, 158, 11, 0.06)' : 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // Outer laser frame border on canvas
    ctx.strokeStyle = isAmber ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Glowing corner brackets on canvas
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 8;
    const bArm = 70;
    // TL
    ctx.beginPath(); ctx.moveTo(30 + bArm, 30); ctx.lineTo(30, 30); ctx.lineTo(30, 30 + bArm); ctx.stroke();
    // TR
    ctx.beginPath(); ctx.moveTo(w - 30 - bArm, 30); ctx.lineTo(w - 30, 30); ctx.lineTo(w - 30, 30 + bArm); ctx.stroke();
    // BL
    ctx.beginPath(); ctx.moveTo(30 + bArm, h - 30); ctx.lineTo(30, h - 30); ctx.lineTo(30, h - 30 - bArm); ctx.stroke();
    // BR
    ctx.beginPath(); ctx.moveTo(w - 30 - bArm, h - 30); ctx.lineTo(w - 30, h - 30); ctx.lineTo(w - 30, h - 30 - bArm); ctx.stroke();

    // 2. High-Tech Chapter Tag (e.g. CHAPTER 01)
    ctx.textAlign = 'left';
    ctx.fillStyle = accentColor;
    ctx.font = '700 36px "JetBrains Mono", monospace';
    ctx.fillText(data.chapter.toUpperCase(), 110, 150);

    // 3. Main Title (Syncopate / Orbitron aesthetic)
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 76px "Syncopate", "Orbitron", sans-serif';
    ctx.fillText(data.title.toUpperCase(), 110, 255);

    // Horizontal Accent Line
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(110, 290);
    ctx.lineTo(520, 290);
    ctx.stroke();

    // 4. Wall-Specific Layouts
    if (data.quote) {
      // Wall 1: Quote & Vision
      ctx.font = 'italic 600 38px "Cinzel", serif';
      ctx.fillStyle = '#fef3c7';
      this.wrapText(ctx, data.quote, 110, 390, w - 240, 56);

      ctx.font = '700 32px "JetBrains Mono", monospace';
      ctx.fillStyle = accentColor;
      ctx.fillText(`— ${data.founder}`, 110, 580);

      ctx.font = '400 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      this.wrapText(ctx, data.subtitle, 110, 660, w - 240, 48);

      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.font = '600 26px "JetBrains Mono", monospace';
      ctx.fillText('⚡ BARE-METAL RTOS • HARDWARE PROTOTYPING • EDGE SILICON', 110, 840);
    } else if (data.pillars) {
      // Wall 2: 4 Pillars
      let px = 110;
      let py = 370;
      data.pillars.forEach((p, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const curX = px + col * 920;
        const curY = py + row * 260;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(curX, curY, 860, 220);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(curX, curY, 860, 220);

        ctx.fillStyle = accentColor;
        ctx.font = '700 36px "JetBrains Mono", monospace';
        ctx.fillText(`[0${idx + 1}] ${p.title}`, curX + 35, curY + 65);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '400 28px "Plus Jakarta Sans", sans-serif';
        this.wrapText(ctx, p.desc, curX + 35, curY + 125, 790, 40);
      });
    } else if (data.stats) {
      // Wall 4: Big Stats
      let sx = 110;
      data.stats.forEach((s, idx) => {
        const curX = sx + idx * 455;
        const curY = 410;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(curX, curY, 415, 300);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(curX, curY, 415, 300);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 84px "Syncopate", "Orbitron", sans-serif';
        ctx.fillText(s.val, curX + 35, curY + 120);

        ctx.fillStyle = accentColor;
        ctx.font = '700 28px "JetBrains Mono", monospace';
        this.wrapText(ctx, s.label.toUpperCase(), curX + 35, curY + 185, 340, 36);
      });

      // Bottom Banner
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('⚡ UPCOMING SPRINT: NATIONAL HARDWARE HACKATHON 2026', 110, 860);
    } else if (data.members) {
      // Wall 3: Collective Member Cards
      let mx = 110;
      data.members.slice(0, 4).forEach((m, idx) => {
        const curX = mx + idx * 455;
        const curY = 400;

        ctx.fillStyle = 'rgba(28, 18, 12, 0.85)';
        ctx.fillRect(curX, curY, 415, 430);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(curX, curY, 415, 430);

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(m.full_name, curX + 30, curY + 70);

        ctx.fillStyle = accentColor;
        ctx.font = '600 24px "JetBrains Mono", monospace';
        ctx.fillText(m.title || 'IoT Innovator', curX + 30, curY + 120);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
        this.wrapText(ctx, m.bio || 'Hardware hacker', curX + 30, curY + 180, 355, 34);

        ctx.fillStyle = '#10b981';
        ctx.font = '600 22px "JetBrains Mono", monospace';
        ctx.fillText('● VERIFIED COLLECTIVE', curX + 30, curY + 380);
      });
    } else {
      // Wall 0: Subtitle & Mission
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '400 34px "Plus Jakarta Sans", sans-serif';
      this.wrapText(ctx, data.subtitle, 110, 390, w - 240, 54);

      if (data.extra) {
        ctx.fillStyle = accentColor;
        ctx.font = '700 36px "JetBrains Mono", monospace';
        ctx.fillText(data.extra, 110, 560);
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Scroll mouse wheel or use arrow keys to walk forward through the corridor →', 110, 720);
    }
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return;
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  // ================= SCROLL NAVIGATION ENGINE =================
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.onScroll();
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = (window.scrollY / maxScroll) * (this.totalStations - 1); // 0.0 to 4.0
    this.updateCameraToProgress(progress);
  }

  updateCameraToProgress(progress) {
    const p = Math.max(0, Math.min(this.totalStations - 1, progress));
    const curIdx = Math.floor(p);
    const nextIdx = Math.min(this.totalStations - 1, curIdx + 1);
    const alpha = p - curIdx;

    const easeAlpha = alpha * alpha * (3 - 2 * alpha);

    const wp1 = this.waypoints[curIdx];
    const wp2 = this.waypoints[nextIdx];

    this.targetCamPos.lerpVectors(wp1.camPos, wp2.camPos, easeAlpha);
    this.targetLookAt.lerpVectors(wp1.lookAt, wp2.lookAt, easeAlpha);

    this.updateHUD(p, Math.round(p));
  }

  goToStation(index) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / (this.totalStations - 1)) * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  updateHUD(progress, currentNearest) {
    const fillEl = document.getElementById('hud-progress-fill');
    if (fillEl) {
      fillEl.style.width = `${(progress / (this.totalStations - 1)) * 100}%`;
    }

    const dots = document.querySelectorAll('.hud-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentNearest) dot.classList.add('active');
      else dot.classList.remove('active');
    });

    const chips = document.querySelectorAll('.nav-chip');
    chips.forEach((chip, idx) => {
      if (idx === currentNearest) chip.classList.add('active');
      else chip.classList.remove('active');
    });

    const labelEl = document.getElementById('hud-station-label');
    if (labelEl && this.waypoints[currentNearest]) {
      labelEl.innerText = this.waypoints[currentNearest].name;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.currentCamPos.lerp(this.targetCamPos, 0.08);
    this.currentLookAt.lerp(this.targetLookAt, 0.08);

    this.camera.position.copy(this.currentCamPos);
    this.camera.lookAt(this.currentLookAt);

    if (this.embers) {
      const pos = this.embers.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;
      }
      this.embers.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
