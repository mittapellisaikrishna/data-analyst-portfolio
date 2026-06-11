import React, { useState } from 'react';
import { Database, Chrome, ArrowRight, Table, Settings, PieChart, ShieldAlert } from 'lucide-react';

interface PipelineNode {
  id: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  status: 'active' | 'idle' | 'warning';
}

export const ProjectArchitecture: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('scraper');

  const nodes: PipelineNode[] = [
    {
      id: 'source',
      title: 'ESPN Cricinfo',
      type: 'DATA SOURCE',
      icon: <Chrome className="w-5 h-5 text-red-400" />,
      shortDesc: 'Match scorecards, live blogs, player profiles, and rosters.',
      fullDesc: 'Scattered sport listings consisting of unformatted HTML tables, nested sub-grids, and live tournament auction summary dashboards across 74 distinct matches.',
      highlights: [
        '70+ ESPN Cricinfo scorecard trees mapped',
        'Complex historical player tables',
        'Dynamic updates during IPL auctions'
      ],
      status: 'active'
    },
    {
      id: 'scraper',
      title: 'Web Scraper',
      type: 'PYTHON HARVESTER',
      icon: <Settings className="w-5 h-5 text-amber-400 animate-spin-slow" />,
      shortDesc: 'Automated BeautifulSoup retrieval with request throttling.',
      fullDesc: 'Custom multi-threaded scraping architecture written in Python capable of handling network drops with smart user-agent rotation and throttling delays.',
      highlights: [
        'Browser-like header fallbacks',
        'Request throttling (2-second sleep to respect hosts)',
        'Comprehensive error-logging subsystem',
        'Automated progress checkpoint tracking'
      ],
      status: 'active'
    },
    {
      id: 'storage',
      title: 'Raw Data Storage',
      type: 'STAGING PORTAL',
      icon: <Database className="w-5 h-5 text-sky-400" />,
      shortDesc: 'Highly structured JSON & unformatted CSV repositories.',
      fullDesc: 'Unprocessed text files capturing match details, wicket lists, overs bowls, extra calculations and auction rates directly saved for historical audits.',
      highlights: [
        'Local file-system backup dumps',
        'Structured transactional match IDs',
        'Raw logs tracking response packet sizes'
      ],
      status: 'active'
    },
    {
      id: 'cleaner',
      title: 'Cleaning Engine',
      type: 'PANDAS PIPELINE',
      icon: <ShieldAlert className="w-5 h-5 text-violet-400" />,
      shortDesc: 'Type coercions, overs normalization, and error audits.',
      fullDesc: 'Wrangling scripts leveraging powerful Pandas vectorization to parse raw player strings, handle null attributes, and audit statistical data anomalies.',
      highlights: [
        'Custom overs normalization (e.g., converting 19.3 overs into numerical fractions)',
        'Data type coercion and automated date formatting',
        'Cleaning audit report generation and validation checks',
        'String sanitization on international spelling discrepancies'
      ],
      status: 'active'
    },
    {
      id: 'dataset',
      title: 'Analytics Dataset',
      type: 'RELATIONAL MATRIX',
      icon: <Table className="w-5 h-5 text-blue-400" />,
      shortDesc: 'Star schema structure containing facts and dimension tables.',
      fullDesc: 'A highly structured relational schema organizing matches, players, bowling counts and auction finances to support lightning fast analysis aggregates.',
      highlights: [
        'Relational star-schema design',
        'Optimized batting, bowling and pricing dimension indices',
        'Aggregated KPIs on batsman strikes and bowling economy'
      ],
      status: 'active'
    },
    {
      id: 'dashboard',
      title: 'Power BI Dashboard',
      type: 'BUSINESS INTELLIGENCE',
      icon: <PieChart className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Interactive executive reporting portals and DAX matrices.',
      fullDesc: 'Polished client-facing charts revealing team performance, player efficiency brackets, MVP rankings, and budget distributions for auction stakeholders.',
      highlights: [
        'Interactive dynamic filter controls',
        'Advanced DAX formulation on team-level margins',
        'Sleek executive UX visual configuration overrides'
      ],
      status: 'active'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-400 tracking-wider">PIPELINE ARCHITECTURE MAP</span>
          <h4 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">
            Interactive IPL 2025 ETL Flow
          </h4>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-sans">
          Click any pipeline node below to explore details of the custom Python scraper, automated data modeling, and business analytics stages.
        </p>
      </div>

      {/* SVG Connected Flow Chart Map */}
      <div className="relative p-6 rounded-3xl bg-slate-950/50 border border-[rgba(59,130,246,0.15)] overflow-x-auto select-none min-w-[700px] md:min-w-0">
        
        {/* SVG Dynamic Particles Connector */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Grid Line Paths for glowing arrows */}
            {/* Path from Node 1 -> Node 2 -> Node 3 */}
            <path d="M 120 45 L 210 45" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M 330 45 L 420 45" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            
            {/* Vertical downwards flow from raw to cleaner */}
            <path d="M 480 75 Q 480 135 375 135 L 140 135 Q 80 135 80 195" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            
            {/* Horizontal flow line on the lower tier */}
            <path d="M 140 225 L 210 225" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M 330 225 L 420 225" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
 
            {/* Glowing flowing dust particle animation simulations */}
            <circle r="3" fill="#3b82f6" className="animate-pulse">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 120 45 L 210 45" />
            </circle>
            <circle r="3" fill="#f59e0b" className="animate-pulse">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 330 45 L 420 45" />
            </circle>
            <circle r="2.5" fill="#3b82f6" className="animate-pulse">
              <animateMotion dur="7s" repeatCount="indefinite" path="M 480 75 Q 480 135 375 135 L 140 135 Q 80 135 80 195" />
            </circle>
            <circle r="3" fill="#f59e0b" className="animate-pulse">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M 140 225 L 210 225" />
            </circle>
            <circle r="3" fill="#3b82f6" className="animate-pulse">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 330 225 L 420 225" />
            </circle>
          </svg>
        </div>

        {/* 2-Row Architecture Grid of Node Cards */}
        <div className="grid grid-rows-2 gap-y-12 gap-x-4 relative">
          
          {/* Row 1: Collection & Staging */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {nodes.slice(0, 3).map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 relative z-10 flex flex-col justify-between h-28 cursor-pointer group ${
                  activeNodeId === node.id
                    ? 'bg-slate-900 border border-blue-500/30 shadow-lg shadow-blue-950/20'
                    : 'bg-slate-950/80 border border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${activeNodeId === node.id ? 'bg-blue-950/40' : 'bg-slate-900'}`}>
                    {node.icon}
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-500 px-1.5 py-0.5 rounded bg-slate-900">
                    {node.type}
                  </span>
                </div>
                
                <div>
                  <h5 className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {node.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 line-clamp-1 font-light mt-1">
                    {node.shortDesc}
                  </p>
                </div>
 
                {/* Animated light point for selection indicator */}
                {activeNodeId === node.id && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping filter blur-[1px]"></span>
                )}
              </button>
            ))}
          </div>

          {/* Row 2: Cleaning & Visualization */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-0">
            {nodes.slice(3, 6).map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 relative z-10 flex flex-col justify-between h-28 cursor-pointer group ${
                  activeNodeId === node.id
                    ? 'bg-slate-900 border border-blue-500/30 shadow-lg shadow-blue-950/20'
                    : 'bg-slate-950/80 border border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${activeNodeId === node.id ? 'bg-blue-950/40' : 'bg-slate-900'}`}>
                    {node.icon}
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-500 px-1.5 py-0.5 rounded bg-slate-900">
                    {node.type}
                  </span>
                </div>
                
                <div>
                  <h5 className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {node.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 line-clamp-1 font-light mt-1">
                    {node.shortDesc}
                  </p>
                </div>
 
                {/* Animated light point for selection indicator */}
                {activeNodeId === node.id && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping filter blur-[1px]"></span>
                )}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Selected Node Details Side-Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950/80 border border-[rgba(59,130,246,0.15)] relative overflow-hidden">
        
        {/* Details Title Header */}
        <div className="md:col-span-5 border-r border-slate-800/80 pr-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono text-blue-400 bg-blue-950/20 border border-blue-900/30">
              STAGE DETAILS
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              ACTIVE NODE
            </span>
          </div>

          <h5 className="text-lg font-bold text-slate-100">
            {nodes.find(n => n.id === activeNodeId)?.title}
          </h5>

          <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
            {nodes.find(n => n.id === activeNodeId)?.fullDesc}
          </p>
        </div>

        {/* Technical Highlights list */}
        <div className="md:col-span-7 space-y-4 md:pl-4">
          <span className="text-[10px] font-mono text-blue-400 block tracking-wider uppercase">
            TECHNICAL FLOW IMPLEMENTATIONS & SAFEGUARDS:
          </span>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nodes.find(n => n.id === activeNodeId)?.highlights.map((highlight, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2.5 text-xs text-slate-300 font-light"
              >
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0 animate-pulse"></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
