import React, { useEffect, useRef } from 'react';

/**
 * AsciiCosmosCanvas — Motor Gráfico 2D "Antigravity x Interactive ASCII Cosmos"
 * Combina a fluidez espacial do antigravity.google com iluminação 3D real em rampa ASCII:
 * 1. Planeta 3D com iluminação direcional dinâmica (segue o mouse) e rampa de luminância ASCII
 * 2. Anéis orbitais duplos com ondas harmônicas + Halo Antigravity ao redor da tipografia
 * 3. Malha de constelações que se conectam geometricamente entre si e ao cursor do mouse
 * 4. Física de vórtice/gravidade zero com velocidade de arrasto e shockwave ASCII no clique
 */
const ASCII_RAMP = ['·', '.', ':', '~', '=', '+', '*', 'x', '#', '%', '@'];
const MORPH_CHARS = ['0', '1', '/', '<', '>', '[', ']', '*', '+', '#', '@', '✦'];

export default function AsciiCosmosCanvas({ active = true, onShockwave }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };

    const shockwaves = [];
    let particles = [];
    let stars = [];

    const initScene = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isMobile = width < 768;
      ctx.font = `500 ${isMobile ? 10 : 12}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      particles = [];

      // 1. Esfera Planetária 3D com Normais para Iluminação Real (N · L)
      const latCount = isMobile ? 13 : 18;
      const lonCount = isMobile ? 26 : 38;
      for (let lat = 1; lat < latCount; lat++) {
        const theta = (lat * Math.PI) / latCount;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        for (let lon = 0; lon < lonCount; lon++) {
          const phi = (lon * 2 * Math.PI) / lonCount;
          particles.push({
            type: 'sphere',
            sx: sinT * Math.cos(phi),
            sy: cosT,
            sz: sinT * Math.sin(phi),
            colorType: (lat + lon) % 3 === 0 ? 'cyan' : lat % 2 === 0 ? 'blue' : 'lavender',
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          });
        }
      }

      // 2. Anel Orbital Interno + Externo (Antigravity Halo)
      const ringCount = isMobile ? 280 : 540;
      for (let i = 0; i < ringCount; i++) {
        const angle = (i / ringCount) * Math.PI * 2;
        const isOuterHalo = i % 3 === 0;
        const radiusSpread = isOuterHalo
          ? 1.18 + Math.random() * 0.42
          : 0.78 + Math.random() * 0.34;
        const band = i % 4;
        particles.push({
          type: 'ring',
          isOuterHalo,
          angle,
          radiusFactor: radiusSpread,
          yOffset: (Math.random() - 0.5) * (isOuterHalo ? 0.24 : 0.09),
          speed: (isOuterHalo ? 0.09 : 0.17) + Math.random() * 0.08,
          rampIndex: Math.floor(Math.random() * 7) + 2,
          colorType:
            band === 0
              ? 'cyan'
              : band === 1
              ? 'blue'
              : band === 2
              ? 'lavender'
              : 'white',
          alpha: isOuterHalo ? 0.35 + Math.random() * 0.45 : 0.45 + Math.random() * 0.5,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
        });
      }

      // 3. Nós de Constelação Interativos no Espaço
      const starCount = isMobile ? 34 : 68;
      stars = Array.from({ length: starCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        phase: Math.random() * Math.PI * 2,
        char: i % 5 === 0 ? '✦' : i % 3 === 0 ? '+' : '·',
      }));
    };

    initScene();

    const handleResize = () => initScene();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      if (!mouse.active) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.7,
        speed: 13,
        strength: 1.0,
      });
      if (onShockwave) onShockwave({ x: clickX, y: clickY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const getColor = (colorType, alpha, boost = 0) => {
      const a = Math.min(1, alpha + boost * 0.55);
      if (boost > 0.45) return `rgba(248, 249, 252, ${a})`;
      if (colorType === 'cyan') return `rgba(92, 225, 230, ${a})`;
      if (colorType === 'blue') return `rgba(116, 155, 255, ${a})`;
      if (colorType === 'lavender') return `rgba(199, 125, 255, ${a})`;
      return `rgba(240, 244, 255, ${a})`;
    };

    const startTime = performance.now();

    const render = (now) => {
      animationFrameId = requestAnimationFrame(render);
      if (!activeRef.current) return;

      const time = (now - startTime) * 0.001;

      // Suavização Lerp com captura de velocidade do mouse
      if (mouse.active) {
        const prevX = mouse.x;
        const prevY = mouse.y;
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
        mouse.vx = mouse.x - prevX;
        mouse.vy = mouse.y - prevY;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);
      } else {
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
        mouse.speed *= 0.9;
      }

      // Atualiza ondas de choque
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.strength = Math.max(0, 1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius) shockwaves.splice(i, 1);
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const baseScale = Math.min(width, height) * (width < 768 ? 0.36 : 0.4);

      // 1. Nebulosa Atmosférica Reativa ao Mouse
      const glowX = centerX + (mouse.active ? (mouse.x - centerX) * 0.12 : 0);
      const glowY = centerY + (mouse.active ? (mouse.y - centerY) * 0.12 : 0);
      const glow = ctx.createRadialGradient(
        glowX,
        glowY,
        baseScale * 0.05,
        centerX,
        centerY,
        baseScale * 1.9
      );
      glow.addColorStop(0, 'rgba(50, 121, 249, 0.11)');
      glow.addColorStop(0.45, 'rgba(199, 125, 255, 0.05)');
      glow.addColorStop(1, 'rgba(10, 11, 15, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Halo luminoso sutil que acompanha diretamente o cursor
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          4,
          mouse.x,
          mouse.y,
          200
        );
        cursorGlow.addColorStop(0, 'rgba(92, 225, 230, 0.12)');
        cursorGlow.addColorStop(0.5, 'rgba(116, 155, 255, 0.05)');
        cursorGlow.addColorStop(1, 'rgba(10, 11, 15, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Malha de Constelações Interativas (linhas entre estrelas próximas e o cursor)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        st.x += st.vx;
        st.y += st.vy;
        if (st.x < 0) st.x = width;
        if (st.x > width) st.x = 0;
        if (st.y < 0) st.y = height;
        if (st.y > height) st.y = 0;

        const twinkle = 0.22 + 0.3 * Math.sin(time * 1.4 + st.phase);
        ctx.fillStyle = `rgba(183, 191, 217, ${twinkle})`;
        ctx.fillText(st.char, st.x, st.y);

        // Conexões sutis entre estrelas próximas
        for (let j = i + 1; j < stars.length; j++) {
          const st2 = stars[j];
          const dx = st.x - st2.x;
          const dy = st.y - st2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 115 * 115) {
            const lineAlpha = (1 - Math.sqrt(distSq) / 115) * 0.11;
            ctx.strokeStyle = `rgba(116, 155, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(st.x, st.y);
            ctx.lineTo(st2.x, st2.y);
            ctx.stroke();
          }
        }

        // Conexão magnética com o cursor do mouse
        if (mouse.active) {
          const mdx = st.x - mouse.x;
          const mdy = st.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < 175 * 175) {
            const mAlpha = (1 - Math.sqrt(mDistSq) / 175) * 0.28;
            ctx.strokeStyle = `rgba(92, 225, 230, ${mAlpha})`;
            ctx.beginPath();
            ctx.moveTo(st.x, st.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Vetor de Luz Direcional 3D (segue o cursor ou orbita suavemente)
      let lx = mouse.active ? (mouse.x - centerX) / (width * 0.5) : Math.cos(time * 0.5);
      let ly = mouse.active ? (mouse.y - centerY) / (height * 0.5) : Math.sin(time * 0.35) * 0.6;
      let lz = 0.85;
      const lLen = Math.hypot(lx, ly, lz) || 1;
      lx /= lLen;
      ly /= lLen;
      lz /= lLen;

      // Rotações 3D com paralaxe responsiva ao mouse
      const mouseTiltX = mouse.active ? ((mouse.y - centerY) / height) * 0.32 : 0;
      const mouseTiltY = mouse.active ? ((mouse.x - centerX) / width) * 0.32 : 0;

      const rotY = time * 0.22 + mouseTiltY;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const tiltX = 0.46 + mouseTiltX;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      const tiltZ = -0.21;
      const cosZ = Math.cos(tiltZ);
      const sinZ = Math.sin(tiltZ);

      // 3. Renderiza Planeta ASCII Iluminado + Anéis Orbitais
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let nx = 0;
        let ny = 0;
        let nz = 0;
        let baseChar = '·';
        let baseAlpha = 0.5;

        if (p.type === 'sphere') {
          const r = 0.64;
          const x1 = p.sx * cosY + p.sz * sinY;
          const y1 = p.sy;
          const z1 = -p.sx * sinY + p.sz * cosY;

          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;

          const rx = x1 * cosZ - y2 * sinZ;
          const ry = x1 * sinZ + y2 * cosZ;
          const rz = z2;

          nx = rx * r;
          ny = ry * r;
          nz = rz * r;

          // Iluminação Lambertiana 3D (N · L) para escolher o caractere na rampa ASCII
          const dotLight = Math.max(0, rx * lx + ry * ly + rz * lz);
          const rampIdx = Math.min(
            ASCII_RAMP.length - 1,
            Math.floor(dotLight * (ASCII_RAMP.length - 1))
          );
          baseChar = ASCII_RAMP[rampIdx];

          // Mantém o centro mais translúcido para não brigar com o título GABRIEL LOPES
          const centerMask = Math.min(1, Math.hypot(nx, ny) * 1.45);
          baseAlpha = (0.14 + dotLight * 0.58) * (0.45 + 0.55 * centerMask);
        } else {
          // Anéis Orbitais com ondas senoidais 3D
          const dir = p.isOuterHalo ? -1 : 1;
          const a = p.angle + dir * time * p.speed;
          const wave = Math.sin(a * 4 + time * 1.2) * 0.045;
          const lxRing = Math.cos(a) * p.radiusFactor;
          const lyRing = p.yOffset + wave;
          const lzRing = Math.sin(a) * p.radiusFactor;

          const y1 = lyRing * cosX - lzRing * sinX;
          const z1 = lyRing * sinX + lzRing * cosX;

          nx = lxRing * cosZ - y1 * sinZ;
          ny = lxRing * sinZ + y1 * cosZ;
          nz = z1;

          const shimmer = Math.floor((Math.sin(a * 3 + time * 2) + 1) * 2.5);
          const idx = Math.min(ASCII_RAMP.length - 1, Math.max(0, p.rampIndex + shimmer - 2));
          baseChar = ASCII_RAMP[idx];
          baseAlpha = p.alpha;
        }

        // Projeção com perspectiva 3D
        const perspective = 1 / (1 - nz * 0.26);
        let sx = centerX + nx * baseScale * perspective;
        let sy = centerY + ny * baseScale * perspective;

        // Física de Campo Vetorial / Vórtice Antigravity no Mouse
        let energy = 0;
        const dx = sx - mouse.x;
        const dy = sy - mouse.y;
        const distSq = dx * dx + dy * dy;
        const influenceRadius = 210;

        if (mouse.active && distSq < influenceRadius * influenceRadius) {
          const dist = Math.sqrt(distSq) || 1;
          const factor = Math.pow(1 - dist / influenceRadius, 2);
          const push = 34 * factor;
          const swirl = 18 * factor;

          const targetOx =
            (dx / dist) * push - (dy / dist) * swirl + mouse.vx * factor * 1.4;
          const targetOy =
            (dy / dist) * push + (dx / dist) * swirl + mouse.vy * factor * 1.4;

          p.vx += (targetOx - p.ox) * 0.16;
          p.vy += (targetOy - p.oy) * 0.16;
          energy = factor;
        } else {
          p.vx += -p.ox * 0.08;
          p.vy += -p.oy * 0.08;
        }

        // Amortecimento elástico (mola suave)
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.ox += p.vx;
        p.oy += p.vy;

        // Impacto das Shockwaves ao clicar
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = sx - sw.x;
          const sdy = sy - sw.y;
          const sDist = Math.hypot(sdx, sdy) || 1;
          const diff = Math.abs(sDist - sw.radius);
          if (diff < 55) {
            const wFactor = (1 - diff / 55) * sw.strength;
            p.ox += (sdx / sDist) * wFactor * 11;
            p.oy += (sdy / sDist) * wFactor * 11;
            energy = Math.max(energy, wFactor);
          }
        }

        sx += p.ox;
        sy += p.oy;

        const depthFactor = Math.max(0.18, Math.min(1, (nz + 1.15) * 0.52));
        const finalAlpha = depthFactor * baseAlpha;

        ctx.fillStyle = getColor(p.colorType, finalAlpha, energy);

        const displayChar =
          energy > 0.28
            ? MORPH_CHARS[(i + Math.floor(time * 20)) % MORPH_CHARS.length]
            : baseChar;

        ctx.fillText(displayChar, sx, sy);
      }

      // 4. Anel de Shockwave ASCII Radial ao Clicar
      for (let i = 0; i < shockwaves.length; i++) {
        const sw = shockwaves[i];
        const ringGlyphs = 36;
        ctx.fillStyle = `rgba(92, 225, 230, ${sw.strength * 0.65})`;
        for (let g = 0; g < ringGlyphs; g++) {
          const a = (g / ringGlyphs) * Math.PI * 2 + time * 0.8;
          const gx = sw.x + Math.cos(a) * sw.radius;
          const gy = sw.y + Math.sin(a) * sw.radius;
          ctx.fillText(g % 2 === 0 ? '+' : '·', gx, gy);
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [onShockwave]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full select-none pointer-events-none"
      aria-label="Antigravity Interactive ASCII Cosmos"
    />
  );
}
