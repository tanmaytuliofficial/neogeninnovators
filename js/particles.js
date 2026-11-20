/**
 * Neo Gen Innovators - Three.js IoT Mesh Particle System
 * Lightweight, interactive background representing interconnected IoT sensor nodes & edge telemetry.
 */

export function initParticleSystem(containerId = 'bg-canvas') {
  const canvas = document.getElementById(containerId);
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;

  // Renderer with high performance settings
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Particle Node Configuration
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 65 : 130;
  const maxDistance = isMobile ? 75 : 95;
  const areaSize = 650;

  // Positions & Velocities
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * areaSize;
    positions[i * 3 + 1] = (Math.random() - 0.5) * areaSize * 0.7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * (areaSize * 0.5);

    velocities.push({
      x: (Math.random() - 0.5) * 0.35,
      y: (Math.random() - 0.5) * 0.35,
      z: (Math.random() - 0.5) * 0.25
    });
  }

  // Node Points Geometry
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Circular glow texture for particles
  const createCircleTexture = () => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.7)'); // Cyan accent
    grad.addColorStop(0.8, 'rgba(99, 102, 241, 0.2)'); // Violet glow
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  };

  const pointMaterial = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 4.5,
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(pointCloud);

  // Mesh Lines Geometry (Connecting nearby IoT nodes)
  const linePositions = new Float32Array(particleCount * particleCount * 6);
  const lineColors = new Float32Array(particleCount * particleCount * 6);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // Interactive Mouse Coordinates with dampening
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX - windowHalfX) * 0.12;
    mouse.targetY = (e.clientY - windowHalfY) * 0.12;
  });

  // Touch support for mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX - windowHalfX) * 0.1;
      mouse.targetY = (e.touches[0].clientY - windowHalfY) * 0.1;
    }
  }, { passive: true });

  // Handle Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onWindowResize);

  // Animation Loop
  let animationFrameId;
  const posAttr = pointGeometry.attributes.position;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Smooth mouse lerping
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Subtle camera tilt following mouse
    camera.position.x = mouse.x * 0.6;
    camera.position.y = -mouse.y * 0.6;
    camera.lookAt(scene.position);

    let lineIndex = 0;
    let colorIndex = 0;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      positions[idx] += velocities[i].x;
      positions[idx + 1] += velocities[i].y;
      positions[idx + 2] += velocities[i].z;

      // Bounce off boundaries
      const boundX = areaSize * 0.55;
      const boundY = areaSize * 0.38;
      const boundZ = areaSize * 0.28;

      if (positions[idx] < -boundX || positions[idx] > boundX) velocities[i].x *= -1;
      if (positions[idx + 1] < -boundY || positions[idx + 1] > boundY) velocities[i].y *= -1;
      if (positions[idx + 2] < -boundZ || positions[idx + 2] > boundZ) velocities[i].z *= -1;

      // Connect with neighboring nodes within maxDistance
      for (let j = i + 1; j < particleCount; j++) {
        const jdx = j * 3;
        const dx = positions[idx] - positions[jdx];
        const dy = positions[idx + 1] - positions[jdx + 1];
        const dz = positions[idx + 2] - positions[jdx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const alpha = 1.0 - (dist / maxDistance);

          // Add point A
          linePositions[lineIndex++] = positions[idx];
          linePositions[lineIndex++] = positions[idx + 1];
          linePositions[lineIndex++] = positions[idx + 2];

          // Add point B
          linePositions[lineIndex++] = positions[jdx];
          linePositions[lineIndex++] = positions[jdx + 1];
          linePositions[lineIndex++] = positions[jdx + 2];

          // Line vertex color (ambient cyan to deep indigo glow)
          lineColors[colorIndex++] = 0.2 * alpha; // R
          lineColors[colorIndex++] = 0.65 * alpha; // G (cyan)
          lineColors[colorIndex++] = 1.0 * alpha; // B (blue)

          lineColors[colorIndex++] = 0.4 * alpha;
          lineColors[colorIndex++] = 0.3 * alpha;
          lineColors[colorIndex++] = 0.9 * alpha;
        }
      }
    }

    posAttr.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Slow ambient rotation of the entire node cloud
    pointCloud.rotation.y += 0.0006;
    linesMesh.rotation.y += 0.0006;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
  };
}
