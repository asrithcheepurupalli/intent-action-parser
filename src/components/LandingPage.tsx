import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, MessageSquare, BarChart3, Terminal } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-white/10 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-lg uppercase tracking-[0.2em]">Parser</span>
          </div>
          <button 
            onClick={onGetStarted}
            className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors hover:scale-105 active:scale-95"
          >
            Access Tool
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors cursor-default group"
              >
                <Zap className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" />
                Intent Analysis Engine
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase overflow-hidden">
                <motion.span 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  Messy Talk.
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-white/20 block"
                >
                  Clear Action.
                </motion.span>
              </h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-white/40 leading-relaxed max-w-md font-medium"
                >
                  Extract intent, priority, and next steps from unstructured messages in seconds. Built for speed and precision.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="pt-4"
                >
                  <button 
                    onClick={onGetStarted}
                    className="group px-10 py-5 bg-white text-black rounded font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02] text-sm hover:bg-white/90"
                  >
                    Launch Parser
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-[#111] border border-white/10 rounded-lg shadow-2xl p-8">
                <div className="flex items-center gap-2 mb-10 opacity-20">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white/5 rounded p-5 border border-white/5"
                  >
                    <p className="text-xs text-white/40 italic leading-relaxed">"hey i think i got charged twice?? also changed my address yesterday but order still showing old one idk what's happening"</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="flex justify-center opacity-20"
                  >
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="bg-white rounded p-6 text-black space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Output</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">High Priority</span>
                    </div>
                    <p className="font-black text-xl uppercase tracking-tight leading-none">Payment + Address Conflict</p>
                    <div className="h-px bg-black/10" />
                    <p className="text-xs font-bold leading-relaxed opacity-70">Verify transactions and confirm correct delivery address before dispatch.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Extraction",
                desc: "Categorize messages into actionable business intents."
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Priority",
                desc: "Identify high-impact issues before they escalate."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Action",
                desc: "Get specific next steps for your team to follow."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="space-y-6 group cursor-default hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 border border-white/10 rounded flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 transition-all group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-sm uppercase tracking-[0.2em]">Parser</span>
          </div>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">© 2026 Systems</p>
        </div>
      </motion.footer>
    </div>
  );
}
