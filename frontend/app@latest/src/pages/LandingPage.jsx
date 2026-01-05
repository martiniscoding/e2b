import React from 'react';
import { Terminal, Shield, Zap, Code2, ChevronRight, Github, Command, Lock, Cpu } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050000] text-slate-300 selection:bg-red-500/30 font-sans antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050000]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-900 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <Command size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-white uppercase italic">Kernel</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-wide uppercase text-slate-400">
            <a href="#features" className="hover:text-red-500 transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-red-500 transition-colors">SDKs</a>
            <a href="#" className="hover:text-red-500 transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">Docs</button>
            <button className="bg-white text-black px-5 py-2 rounded-md text-[13px] font-bold hover:bg-red-600 hover:text-white transition-all duration-300">
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        {/* Professional Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        {/* Dark Red Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 blur-[150px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-950/20 text-red-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-10 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Compute Engine v4.0 Active
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            ISOLATED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900">RUNTIME.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The infrastructure layer for AI Agents. Secure, stateful sandboxes 
            that spin up in <span className="text-red-500 font-mono">150ms</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
            <button className="group relative px-8 py-4 bg-red-600 text-white rounded-lg font-bold overflow-hidden transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Start Prototyping <ChevronRight size={18} />
              </span>
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/10 text-white rounded-lg font-bold hover:bg-white/5 transition-all">
              Read the Spec
            </button>
          </div>

          {/* Premium Code Interface */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/50 to-transparent rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-3xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-900/40" />
                  <div className="w-3 h-3 rounded-full bg-red-900/40" />
                  <div className="w-3 h-3 rounded-full bg-red-900/40" />
                </div>
                <div className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Kernel Shell — Node20</div>
                <div className="w-12" />
              </div>
              <div className="p-8 text-left font-mono text-sm leading-8 text-slate-400">
                <p><span className="text-red-500">const</span> <span className="text-white">sandbox</span> = <span className="text-red-500">await</span> <span className="text-white">Kernel.create</span>({`{`}</p>
                <p className="pl-6 text-slate-500 italic">// Environment boots in 150ms</p>
                <p className="pl-6"><span className="text-white">template:</span> <span className="text-emerald-500">'python-data-sci'</span>,</p>
                <p className="pl-6"><span className="text-white">timeout:</span> <span className="text-orange-400">3600</span></p>
                <p>{`}`});</p>
                <p className="mt-4"><span className="text-red-500">await</span> <span className="text-white">sandbox.run</span>(<span className="text-emerald-500">'pip install pandas'</span>);</p>
                <p className="text-white mt-2 animate-pulse underline decoration-red-500 underline-offset-4 cursor-default">_</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-6 bg-[#030000]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Command size={24} className="text-red-600" />
              <span className="text-xl font-black text-white italic tracking-tighter uppercase">Kernel</span>
            </div>
            <p className="text-slate-600 text-sm max-w-xs">
              The standard for secure code execution. Trusted by world-class AI labs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <FooterColumn title="Product" links={['Engine', 'Pricing', 'Documentation']} />
            <FooterColumn title="Company" links={['About', 'Security', 'Contact']} />
            <FooterColumn title="Social" links={['Twitter', 'GitHub', 'Discord']} />
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="bg-[#050000] p-10 hover:bg-red-950/10 transition-colors group">
    <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-red-500/10 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-3 tracking-tight uppercase">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{title}</h4>
    {links.map(link => (
      <a key={link} href="#" className="text-sm text-slate-500 hover:text-red-500 transition-colors">{link}</a>
    ))}
  </div>
);

export default LandingPage;