import React, { useRef, useEffect, useState } from 'react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';

export const SkillsGalaxy: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Orbit angle multiplier
  const angleOffsetRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

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

    // Initial setup of static orbit properties
    const orbits = SKILLS_DATA.map((skill, index) => {
      // Alternate radius and speed
      const radius = 64 + (index * 16); // Distribute orbits
      const speed = 0.008 - (index * 0.0006); // Outer are slower
      const startAngle = (index * (Math.PI * 2)) / SKILLS_DATA.length;
      return {
        skill,
        radius,
        speed,
        startAngle,
        yScale: 0.35, // Flatten orbit for 3D isometric simulation
        angleOffset: Math.random() * Math.PI
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw faint background grids for cosmic center
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 1;
      for (let r = 50; r <= 200; r += 40) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, r, r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw standard coordinate beams
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.beginPath();
      ctx.moveTo(centerX - 200, centerY);
      ctx.lineTo(centerX + 200, centerY);
      ctx.stroke();

      // Draw Center Core (Data Analytics Core)
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 24);
      coreGradient.addColorStop(0, '#3b82f6'); // Royal blue center
      coreGradient.addColorStop(0.4, '#1d4ed8');
      coreGradient.addColorStop(1, 'rgba(5, 7, 10, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fill();

      // Glowing core text label
      ctx.font = '600 9px JetBrains Mono, monospace';
      ctx.fillStyle = '#3b82f6';
      ctx.textAlign = 'center';
      ctx.fillText("CORE ANALYTICS", centerX, centerY - 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText("ENGINE", centerX, centerY + 8);

      // Micro orbit particle animation tick
      angleOffsetRef.current += 0.008;

      // Project each orbiting node in 3D
      interface ProjectNode {
        skill: Skill;
        projX: number;
        projY: number;
        projZ: number; // Rotated depth for sorting
        radius: number;
        color: string;
      }

      const projectedNodes: ProjectNode[] = orbits.map(orb => {
        // Current orbital angle
        const currentAngle = orb.startAngle + (angleOffsetRef.current * orb.speed * 120);
        
        // Unrotated coords (X on plain, Y dynamic to simulate tilted orbit)
        const rawX = orb.radius * Math.cos(currentAngle);
        const rawY = orb.radius * Math.sin(currentAngle) * orb.yScale;
        const rawZ = orb.radius * Math.sin(currentAngle); // Simulated Depth

        // Project onto Canvas centered coordinator
        const projX = centerX + rawX;
        const projY = centerY + rawY;

        return {
          skill: orb.skill,
          projX,
          projY,
          projZ: rawZ,
          radius: 6, // node circle radius
          color: orb.skill.color
        };
      });

      // Sort by simulated Z depth (back-to-front rendering)
      projectedNodes.sort((a, b) => b.projZ - a.projZ);

      // Interaction hover check
      let activeHoverId: string | null = null;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Render orbiting points and labels
      projectedNodes.forEach(node => {
        // Transparency matches visual depth (0.3 to 1.0)
        const maxDepth = 180;
        const alpha = 0.5 + (node.projZ / maxDepth) * 0.5;

        // Check hover
        const distance = Math.hypot(node.projX - mouseX, node.projY - mouseY);
        const isHovered = distance < 18; // generous hover trigger boundary

        if (isHovered) {
          activeHoverId = node.skill.id;
        }

        // Draw connection string to Core
        ctx.strokeStyle = isHovered || hoveredSkillId === node.skill.id
          ? `rgba(59, 130, 246, 0.5)`
          : `rgba(29, 78, 216, ${alpha * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.projX, node.projY);
        ctx.stroke();

        // Node Glow shadow
        ctx.fillStyle = node.color;
        ctx.globalAlpha = alpha;

        if (isHovered || hoveredSkillId === node.skill.id) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = node.color;
        }

        ctx.beginPath();
        ctx.arc(node.projX, node.projY, isHovered ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Skill Label with custom floating card
        ctx.font = isHovered || hoveredSkillId === node.skill.id 
          ? 'bold 11px Inter, sans-serif' 
          : '500 10px Inter, sans-serif';
        ctx.fillStyle = isHovered || hoveredSkillId === node.skill.id 
          ? '#ffffff' 
          : 'rgba(209, 213, 219, ' + alpha + ')';
        ctx.textAlign = 'left';
        ctx.fillText(node.skill.name, node.projX + 8, node.projY + 3);

        // Optional % tag float
        if (isHovered || hoveredSkillId === node.skill.id) {
          ctx.font = '8px JetBrains Mono, monospace';
          ctx.fillStyle = '#f59e0b';
          ctx.fillText(` [${node.skill.percentage}%]`, node.projX + 8 + ctx.measureText(node.skill.name).width, node.projY + 2);
        }

        ctx.globalAlpha = 1.0;
      });

      if (activeHoverId !== hoveredSkillId) {
        setHoveredSkillId(activeHoverId);
        if (activeHoverId) {
          const match = SKILLS_DATA.find(s => s.id === activeHoverId);
          if (match) setSelectedSkill(match);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [hoveredSkillId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -100, y: -100 };
    setHoveredSkillId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Skill Core Canvas Simulator (7 cols) */}
      <div 
        ref={containerRef} 
        className="lg:col-span-7 relative min-h-[350px] rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] overflow-hidden flex items-center justify-center cursor-crosshair"
      >
        <canvas
          id="skills-canvas"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="block"
        />
        
        {/* Decorative Grid Mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>
      </div>

      {/* Selected Skill Information Board (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] relative overflow-hidden">
        {/* Holographic Glowing grid line */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none"></div>

        <div>
          {/* Header Title with Proficiency Badge */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-mono text-blue-400 tracking-wider">SKILL PROFILE</span>
              <h3 className="text-2xl font-bold text-slate-100 font-sans tracking-tight">{selectedSkill.name}</h3>
            </div>
            
            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-400 block mb-0.5">PROFICIENCY</span>
              <span 
                className="inline-block px-3 py-1 text-xs font-mono font-bold rounded-lg text-slate-950"
                style={{ backgroundColor: selectedSkill.color }}
              >
                {selectedSkill.percentage}%
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-blue-400 block mb-1">TECHNICAL SUMMARY</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {selectedSkill.summary}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-blue-400 block mb-1">PRACTICAL EXPERIENCE</span>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {selectedSkill.experience}
              </p>
            </div>
          </div>
        </div>

        {/* Association Links */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <span className="text-[10px] font-mono text-blue-400 block mb-2">INTEGRATED IN PROJECTS</span>
          <div className="flex flex-wrap gap-2">
            {selectedSkill.relatedProjects.map((proj, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800/80 text-[10px] font-mono text-slate-300 transition-all duration-300 hover:border-amber-500/30 hover:text-amber-300"
              >
                {proj}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
