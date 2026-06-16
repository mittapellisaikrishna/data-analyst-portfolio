import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ShieldAlert, Sparkles } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'headline';
}

export const TerminalUI: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SAI KRISHNA MITTAPELLI - COGNITIVE DATA SHELL v2.05", type: 'headline' },
    { text: "Type 'help' to identify available analytical directives.", type: 'output' },
    { text: "", type: 'output' }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { text: `visitor@saikrishna-portfolio:~$ ${cmd}`, type: 'input' }
    ];

    if (trimmed === '') {
      setHistory(prev => [...prev, ...newLines]);
      return;
    }

    switch (trimmed) {
      case 'help':
        newLines.push(
          { text: "SYSTEM ACCESS CODES:", type: 'success' },
          { text: "  about     - Reveal biography and academic specialization details.", type: 'output' },
          { text: "  skills    - Command terminal to print technical stack indices.", type: 'output' },
          { text: "  resume    - Obtain premium PDF recruiter-brief download links.", type: 'output' },
          { text: "  linkedin  - Open direct hyperlink to Sai Krishna's LinkedIn workspace.", type: 'output' },
          { text: "  github    - Synchronize connection to personal software repository.", type: 'output' },
          { text: "  contact   - Retrieve secure communication ports (SMTP and TCP).", type: 'output' },
          { text: "  clear     - Wipes command line buffer caches.", type: 'output' }
        );
        break;

      case 'about':
        newLines.push(
          { text: "BIOGRAPHICAL LEDGER:", type: 'success' },
          { text: "  Candidate Name : Sai Krishna Mittapelli", type: 'output' },
          { text: "  Acquisition     : B.Tech ECE, SR University (2022–2026)", type: 'output' },
          { text: "  Specialization  : Data Analytics, ETL Construction, Executive Reporting", type: 'output' },
          { text: "  Objective       : Transform multi-structured web metrics into real business outcomes.", type: 'output' }
        );
        break;

      case 'skills':
        newLines.push(
          { text: "COGNITIVE STACK PROFICIENCIES [ASCII COMPILATION %]:", type: 'success' },
          { text: "  Python   [███████████████████░] 95%", type: 'output' },
          { text: "  SQL      [██████████████████░░] 92%", type: 'output' },
          { text: "  Power BI [██████████████████░░] 90%", type: 'output' },
          { text: "  Excel    [████████████████░░░░] 88%", type: 'output' },
          { text: "  Pandas   [███████████████████░] 94%", type: 'output' },
          { text: "  Scrape   [███████████████████░] 96%", type: 'output' }
        );
        break;

      case 'resume':
        newLines.push(
          { text: "SECURING LEDGER DOWNLOAD PROTOCOL...", type: 'success' },
          { text: "  -> Redirecting payload request to cloud storage...", type: 'output' },
          { text: "  [CLICK LINK] Download Resume: saikrishna_mittapelli_resume.pdf", type: 'success' },
          { text: "  URL: https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing", type: 'output' }
        );
        // Custom window event dispatch fallback
        try {
          window.open('https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing', '_blank');
        } catch(e){}
        break;

      case 'linkedin':
        newLines.push(
          { text: "ESTABLISHING EXTERNAL handshake WITH LINKEDIN SERVERS...", type: 'success' },
          { text: "  [CLICK LINK] Connect on LinkedIn", type: 'success' },
          { text: "  URL: https://www.linkedin.com/in/saikrishna-mittapelli/", type: 'output' }
        );
        try {
          window.open('https://www.linkedin.com/in/saikrishna-mittapelli/', '_blank');
        } catch(e){}
        break;

      case 'github':
        newLines.push(
          { text: "INJECTING GITHUB INTERFACE FOR ANALYST REPOSITORIES...", type: 'success' },
          { text: "  [CLICK LINK] Inspect Codebases on GitHub", type: 'success' },
          { text: "  URL: https://github.com/mittapellisaikrishna", type: 'output' }
        );
        try {
          window.open('https://github.com/mittapellisaikrishna', '_blank');
        } catch(e){}
        break;

      case 'contact':
        newLines.push(
          { text: "smtp ROUTING DETAILS LOADED:", type: 'success' },
          { text: "  Primary Node  : saikrishna.mittapelli123@gmail.com", type: 'success' },
          { text: "  Phone Terminal: +91 81251 55568 [India Core]", type: 'output' },
          { text: "  Status        : Ready to accept technical interview sessions.", type: 'output' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      default:
        newLines.push(
          { text: `bash: directive not registered: '${cmd}'`, type: 'error' },
          { text: "Command structure invalid. Input 'help' to retrieve operational codes.", type: 'output' }
        );
    }

    setHistory(prev => [...prev, ...newLines]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  const fillCommand = (cmd: string) => {
    setInputValue(cmd);
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={focusInput}
      className="p-5 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] font-mono text-xs text-slate-300 relative overflow-hidden flex flex-col h-[400px] cursor-text shadow-2xl shadow-black/80"
    >
      {/* Visual Terminal Glassmorphic Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 select-none">
        <div className="flex items-center gap-2">
          {/* Terminal Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full inline-block"></span>
            <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full inline-block"></span>
            <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full inline-block"></span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold ml-2 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            visitor@saikrishna: (~/terminal_prompt)
          </span>
        </div>

        {/* System Ledger Status */}
        <div className="flex items-center gap-2 text-[9px] text-blue-400 select-none">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
          <span>SECURE SHELL</span>
        </div>
      </div>

      {/* Terminal History Log */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-900">
        {history.map((line, idx) => (
          <div 
            key={idx}
            className={`leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
              line.type === 'input' ? 'text-slate-200 font-bold' : 
              line.type === 'error' ? 'text-red-400 font-medium' :
              line.type === 'success' ? 'text-blue-400' :
              line.type === 'headline' ? 'text-amber-500 font-bold' : 'text-slate-400'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef}></div>
      </div>

      {/* Quick Access Directive Badges */}
      <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap items-center gap-1.5">
        <span className="text-[9px] text-slate-500 mr-1.5 select-none font-bold uppercase">Click Directive:</span>
        {['help', 'about', 'skills', 'resume', 'contact'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fillCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800/80 text-[10px] text-blue-400 hover:text-white hover:border-blue-500 hover:bg-slate-900 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Prompt Input Core Line */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-blue-400 font-bold flex-shrink-0">
          visitor@saikrishna-portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-slate-200 text-xs font-mono p-0 focus:ring-0"
          placeholder="input directive code..."
          maxLength={50}
        />
        <button
          onClick={() => handleCommand(inputValue)}
          className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 transition cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
