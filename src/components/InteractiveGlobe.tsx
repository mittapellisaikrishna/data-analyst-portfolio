import React, { useRef, useEffect, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  isSpecial?: boolean;
  label?: string;
}

export const InteractiveGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Rotate angles
  const angleYRef = useRef(0);
  const angleXRef = useRef(0.3); // Slight tilt

  const lastMousePos = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point3D[]>([]);

  // Generate globe points once
  useEffect(() => {
    const points: Point3D[] = [];
    const radius = 120;
    
    // Regular grid points (Globe shell)
    const count = 280;
    for (let i = 0; i < count; i++) {
      // Golden ratio sampling of a sphere
      const theta = Math.acos(1 - (2 * i) / count);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      // Gradient coloration matching our sci-fi design
      const depthRatio = (z + radius) / (2 * radius); // 0 to 1
      const size = Math.random() > 0.85 ? 1.5 : 0.8;
      const color = depthRatio > 0.5 ? '#3b82f6' : '#1d4ed8'; // Geometric Balance blue tones

      points.push({ x, y, z, size, color });
    }

    // Special Data pipeline hub nodes that fly names out
    const specialHubs = [
      { lat: 20, lng: 77, label: "IPL Auction Scraping", color: "#f59e0b" }, // Golden
      { lat: 10, lng: -74, label: "ESPN Cricinfo Source", color: "#ef4444" }, // Red
      { lat: -25, lng: 133, label: "SQL Analytical Core", color: "#3b82f6" }, // Blue
      { lat: 51, lng: 0, label: "Power BI Server", color: "#10b981" }, // Emerald
      { lat: 35, lng: 139, label: "Pandas Cleaning Pipeline", color: "#8b5cf6" } // Purple
    ];

    specialHubs.forEach(hub => {
      const radLat = (hub.lat * Math.PI) / 180;
      const radLng = (hub.lng * Math.PI) / 180;

      const x = radius * Math.cos(radLat) * Math.sin(radLng);
      const y = radius * Math.sin(radLat);
      const z = radius * Math.cos(radLat) * Math.cos(radLng);

      points.push({
        x, y, z,
        size: 3.5,
        color: hub.color,
        isSpecial: true,
        label: hub.label
      });
    });

    pointsRef.current = points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight || 350;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      // Clear with micro-transparency for soft trail/glowing effect
      ctx.clearRect(0, 0, width, height);

      // Draw futuristic grid background (subtle crosshairs and coordinate circles)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw background grid lines
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - 160, centerY);
      ctx.lineTo(centerX + 160, centerY);
      ctx.moveTo(centerX, centerY - 160);
      ctx.lineTo(centerX, centerY + 160);
      ctx.stroke();

      // Subtle dynamic spin when not dragging
      if (!isDragging) {
        angleYRef.current += 0.003;
      }

      const points = pointsRef.current;

      // Compute rotated coordinates and store projection metadata
      interface MergedPoint extends Point3D {
        projX: number;
        projY: number;
        projZ: number; // Rotated Z
        projSize: number;
      }

      const rotatedPoints: MergedPoint[] = points.map(pt => {
        // Rotate around Y-axis (Yaw)
        const cosY = Math.cos(angleYRef.current);
        const sinY = Math.sin(angleYRef.current);
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.x * sinY + pt.z * cosY;

        // Rotate around X-axis (Pitch)
        const cosX = Math.cos(angleXRef.current);
        const sinX = Math.sin(angleXRef.current);
        let y2 = pt.y * cosX - z1 * sinX;
        let z2 = pt.y * sinX + z1 * cosX;

        // Perspective projections
        const cameraDistance = 320;
        const fov = 260;
        const scale = fov / (fov + z2);

        const projX = centerX + x1 * scale;
        const projY = centerY - y2 * scale;
        const projSize = pt.size * scale;

        return {
          ...pt,
          projX,
          projY,
          projZ: z2,
          projSize
        };
      });

      // Sort points by depth (Z-order) so back points are rendered first, front points on top
      rotatedPoints.sort((a, b) => b.projZ - a.projZ);

      // Hover check reset
      let foundMatchingHub: string | null = null;
      const mouseX = lastMousePos.current.x;
      const mouseY = lastMousePos.current.y;

      // Draw orbital connection lines between special nodes that are in the front hemishpere
      ctx.lineWidth = 0.5;
      for (let i = 0; i < rotatedPoints.length; i++) {
        const ptA = rotatedPoints[i];
        if (!ptA.isSpecial || ptA.projZ > 30) continue; // Skip if far in the back

        for (let j = i + 1; j < rotatedPoints.length; j++) {
          const ptB = rotatedPoints[j];
          if (!ptB.isSpecial || ptB.projZ > 30) continue;

          // Connect hubs with elegant arching curves or transparent linear beams
          const distance = Math.hypot(ptA.projX - ptB.projX, ptA.projY - ptB.projY);
          if (distance < 180) {
            const opacity = Math.max(0.02, 0.15 - distance / 1200);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(ptA.projX, ptA.projY);
            ctx.lineTo(ptB.projX, ptB.projY);
            ctx.stroke();
          }
        }
      }

      // Draw actual points
      rotatedPoints.forEach(pt => {
        // Adjust transparency based on depth to create perfect spherical feeling
        // pt.projZ ranges from -radius (front) to +radius (back)
        const maxDepth = 125;
        const alpha = Math.max(0.12, 1 - (pt.projZ + maxDepth) / (2 * maxDepth));

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        if (pt.isSpecial) {
          // Glow effect for interactive core points
          ctx.shadowBlur = 10;
          ctx.shadowColor = pt.color;
          ctx.arc(pt.projX, pt.projY, pt.projSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset

          // Overlay ring
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pt.projX, pt.projY, pt.projSize * 2, 0, Math.PI * 2);
          ctx.stroke();

          // Check hover
          const distToMouse = Math.hypot(pt.projX - mouseX, pt.projY - mouseY);
          if (distToMouse < pt.projSize * 4 && pt.label) {
            foundMatchingHub = pt.label;
          }

          // Force label rendering on front-facing special nodes
          if (pt.projZ < 0 && pt.label) {
            ctx.font = '500 10px JetBrains Mono, monospace';
            ctx.fillStyle = '#e2e8f0';
            ctx.globalAlpha = 0.8;
            ctx.fillText(pt.label, pt.projX + 10, pt.projY + 3);
          }
        } else {
          ctx.arc(pt.projX, pt.projY, pt.projSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0; // Reset canvas transparency for text overlay

      if (foundMatchingHub !== hoveredLabel) {
        setHoveredLabel(foundMatchingHub);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDragging, hoveredLabel]);

  // Touch & Mouse triggers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    lastMousePos.current = { x: currentX, y: currentY };

    if (!isDragging) return;

    const deltaX = currentX - lastMousePos.current.x;
    const deltaY = currentY - lastMousePos.current.y;

    angleYRef.current += deltaX * 0.01;
    angleXRef.current = Math.min(Math.max(angleXRef.current + deltaY * 0.01, -Math.PI / 3), Math.PI / 3);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch Events support
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (rect && touch) {
      lastMousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (rect && touch) {
      const currentX = touch.clientX - rect.left;
      const currentY = touch.clientY - rect.top;
      
      const deltaX = currentX - lastMousePos.current.x;
      const deltaY = currentY - lastMousePos.current.y;

      angleYRef.current += deltaX * 0.01;
      angleXRef.current = Math.min(Math.max(angleXRef.current + deltaY * 0.01, -Math.PI / 3), Math.PI / 3);

      lastMousePos.current = { x: currentX, y: currentY };
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden glassmorphism border border-[rgba(59,130,246,0.15)] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(5, 7, 10, 0) 70%)'
      }}
    >
      <canvas
        id="globe-canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="block"
      />
      
      {/* Visual Overlays */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0d1117]/90 border border-blue-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono text-blue-400">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
        <span>DRAG TO ACCELERATE OR SPIN DATA GLOBE</span>
      </div>

      {hoveredLabel && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#05070a]/95 border border-blue-500/30 px-3.5 py-1.5 rounded-md pointer-events-none text-xs font-mono text-blue-300 shadow-lg shadow-blue-950/20">
          NODE: {hoveredLabel.toUpperCase()}
        </div>
      )}
    </div>
  );
};
