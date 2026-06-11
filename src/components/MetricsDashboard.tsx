import React, { useState } from 'react';
import { Award, ShoppingBag, Target, Trophy, Users, CheckCircle } from 'lucide-react';

interface MetricItem {
  label: string;
  value: string;
  description: string;
  trend: string;
  icon: React.ReactNode;
}

export const MetricsDashboard: React.FC = () => {
  const [activeTeamId, setActiveTeamId] = useState<string>('csk');

  const metricCards: MetricItem[] = [
    {
      label: "TOTAL MATCHES SCRAPED",
      value: "74 / 74",
      description: "100% database match reporting completed under Python BSE extraction",
      trend: "+12% vs prior IPL season",
      icon: <CheckCircle className="w-5 h-5 text-blue-500" />
    },
    {
      label: "PLAYERS ANALYZED",
      value: "246 Active",
      description: "Complete batting and bowling profiles matched with Cricinfo scorecards",
      trend: "Including 80+ overseas players",
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    {
      label: "AUCTION CAPITAL OUTLAY",
      value: "₹641.5 Cr",
      description: "Total combined spending tracked and normalized against auction drafts",
      trend: "Fully validated ledger balance",
      icon: <ShoppingBag className="w-5 h-5 text-amber-500" />
    }
  ];

  const highlights = [
    {
      title: "ORANGE CAP (RUN LEADER)",
      player: "Jos Buttler (RR)",
      stat: "732 Runs",
      meta: "Strike Rate: 147.2 | 4 Hundreds",
      icon: <Trophy className="w-5 h-5 text-amber-500" />
    },
    {
      title: "PURPLE CAP (WICKETS LEADER)",
      player: "Yuzvendra Chahal (RR)",
      stat: "27 Wickets",
      meta: "Econ Rank: 7.25 | Best: 5/40",
      icon: <Award className="w-5 h-5 text-indigo-400" />
    },
    {
      title: "MVP VALUE EFFICIENCY",
      player: "Rinku Singh (KKR)",
      stat: "94.2 Performance Ratio",
      meta: "Calculated via custom run-differential DAX queries",
      icon: <Target className="w-5 h-5 text-emerald-400" />
    }
  ];

  // Team spending data for interactive SVG chart
  const teamSpending = [
    { id: 'mi', name: 'MI', value: 92.5, color: '#004BA0', desc: 'Mumbai Indians: Heavily prioritized fast bowling & pace power.' },
    { id: 'csk', name: 'CSK', value: 89.8, color: '#FCD303', desc: 'Chennai Super Kings: High spend on spin utilities and key anchor bats.' },
    { id: 'rcb', name: 'RCB', value: 88.2, color: '#D11D25', desc: 'Royal Challengers Bengaluru: Strong focus on top-order overseas runs.' },
    { id: 'kkr', name: 'KKR', value: 91.0, color: '#3A225D', desc: 'Kolkata Knight Riders: Highest spend on dynamic finishing all-rounders.' },
    { id: 'rr', name: 'RR', value: 82.5, color: '#EA1A85', desc: 'Rajasthan Royals: Extremely balanced core, optimized visual spending.' },
    { id: 'srh', name: 'SRH', value: 95.0, color: '#FF822E', desc: 'Sunrisers Hyderabad: Record bid for captaincy leaders & explosive openers.' },
  ];

  const selectedTeamDetails = teamSpending.find(t => t.id === activeTeamId) || teamSpending[1];

  return (
    <div className="space-y-6">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCards.map((card, i) => (
          <div 
            key={i}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-black/40"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-slate-800/40 to-transparent pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400">
                {card.label}
              </span>
              <div className="p-2 rounded-lg bg-slate-800/45 border border-slate-700/30">
                {card.icon}
              </div>
            </div>

            <div className="mb-1">
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {card.value}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 font-sans leading-relaxed mb-1 font-light">
              {card.description}
            </p>

            <span className="text-[9px] font-mono text-blue-400 block font-medium">
              {card.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Two Columns: Stats and Interactive Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* MVP & Caps Standouts Details (5 cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-[rgba(59,130,246,0.15)] space-y-4 flex-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-wider block">
              TOURNAMENT HARVEST STANDOUTS
            </span>

            <div className="space-y-4">
              {highlights.map((hlt, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/40 relative group hover:border-slate-700/60 transition-all"
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0">
                    {hlt.icon}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">
                      {hlt.title}
                    </span>
                    <h5 className="text-xs font-bold text-slate-100 truncate mt-0.5">
                      {hlt.player}
                    </h5>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-semibold font-mono text-blue-400">
                        {hlt.stat}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate">
                        {hlt.meta}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Custom SVG Auction Spend Chart (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950/90 border border-[rgba(59,130,246,0.15)] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-blue-400 tracking-wider">
                INTERACTIVE DATA GRAPH
              </span>
              <h5 className="text-sm font-bold text-slate-100">
                Team Capital Allocated (₹ Cr) — Star Player Budgets
              </h5>
            </div>
            
            <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              HOVER BARS TO AUDIT DETAILED STATS
            </span>
          </div>

          {/* SVG Custom Render */}
          <div className="relative h-44 flex items-end justify-between px-2 pt-4 border-b border-slate-800/80">
            {teamSpending.map((team) => {
              const heightPct = team.value; // Max ~95
              const isHovered = activeTeamId === team.id;

              return (
                <div 
                  key={team.id}
                  onMouseEnter={() => setActiveTeamId(team.id)}
                  className="flex flex-col items-center flex-1 cursor-pointer group px-1"
                >
                  {/* Floating value bubble on top of bar */}
                  <span 
                    className={`text-[9px] font-mono font-semibold transition-all duration-300 pb-1.5 ${
                      isHovered ? 'text-blue-400 scale-110' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    ₹{team.value}Cr
                  </span>

                  {/* Colored bar columns */}
                  <div className="w-full relative rounded-t-lg overflow-hidden transition-all duration-300" style={{ height: `${heightPct * 0.9}px` }}>
                    {/* Glowing background gradient reflecting specific team color */}
                    <div 
                      className={`w-full h-full rounded-t-md transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-65 group-hover:opacity-85'
                      }`}
                      style={{ 
                        background: `linear-gradient(to top, rgba(15, 23, 42, 0) 10%, ${team.color} 100%)`,
                        boxShadow: isHovered ? `0 0 15px ${team.color}40` : 'none'
                      }}
                    ></div>

                    {/* Laser top indicator */}
                    {isHovered && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white animate-pulse"></div>
                    )}
                  </div>

                  {/* Team Abbreviation label */}
                  <span 
                    className={`text-xs font-mono font-bold mt-2 pt-0.5 px-1.5 pb-0.5 rounded transition-all ${
                      isHovered ? 'bg-[#0f172a] text-amber-400 border border-amber-500/25' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {team.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Team Description box */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-900 flex items-center justify-between gap-4 transition-all animate-fadeIn">
            <div>
              <span className="text-[8px] font-mono text-slate-500 block">SELECTED TEAM BUDGET ANALYSIS</span>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2 mt-0.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedTeamDetails.color }}></span>
                {selectedTeamDetails.name} — Outlay Rate: ₹{selectedTeamDetails.value} Cr
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-light mt-1">
                {selectedTeamDetails.desc}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <span className="text-[8px] font-mono text-slate-500 block">CAP UTILIZATION</span>
              <span className="text-sm font-mono font-bold text-amber-500 block mt-0.5">CSV AUDITED</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
