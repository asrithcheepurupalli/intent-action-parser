import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Clock, ArrowRight, MessageSquare, Terminal, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { parseUserIntent, ParsedIntent } from './services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LandingPage from './components/LandingPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EXAMPLES = [
  "my payment got deducted but order not confirmed what is this",
  "i think I got charged twice?? also I changed my address yesterday but order still showing old one idk what’s happening",
  "hey just checking like when will it come approx?? no rush just wanted to know",
  "the app keeps crashing when I try to upload my profile pic, so annoying!! fix it pls",
];

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ParsedIntent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Intent: ${result.intent}\nPriority: ${result.priority}\nSummary: ${result.summary}\nAction: ${result.suggestedAction}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProcess = async (textToProcess: string = input) => {
    if (!textToProcess.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const parsed = await parseUserIntent(textToProcess);
      setResult(parsed);
    } catch (err) {
      setError('Failed to process message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-white bg-white/10 border-white/20';
      case 'medium': return 'text-white/70 bg-white/5 border-white/10';
      case 'low': return 'text-white/40 bg-white/5 border-white/5';
      default: return 'text-white/40 bg-white/5 border-white/5';
    }
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('app')} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-white/10">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <h1 className="font-bold text-sm uppercase tracking-[0.2em]">Parser</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
              <span>Engine v1.0</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>
            <button 
              onClick={() => setView('landing')}
              className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-widest hover:scale-105 active:scale-95"
            >
              <LogOut className="w-3 h-3" />
              Exit
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Input Section */}
          <section className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tighter uppercase">Input</h2>
              <p className="text-white/40 text-sm font-medium">Paste unstructured text for analysis.</p>
            </div>

            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste message here..."
                className="w-full h-56 p-6 bg-[#111] border border-white/10 rounded-lg shadow-2xl focus:border-white/60 focus:ring-1 focus:ring-white/10 placeholder:text-white/20 focus:placeholder:text-white/40 transition-all resize-none outline-none text-white/80 leading-relaxed font-medium"
              />
              <button
                onClick={() => handleProcess()}
                disabled={loading || !input.trim()}
                className="absolute bottom-6 right-6 bg-white hover:bg-white/90 disabled:bg-white/10 disabled:text-white/20 text-black px-6 py-3 rounded font-black uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95 hover:scale-[1.02] text-xs"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Process</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Examples</h3>
              <div className="flex flex-col gap-2">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(ex);
                      handleProcess(ex);
                    }}
                    className="text-[10px] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 px-4 py-3 rounded text-white/40 transition-all text-left font-bold uppercase tracking-wider truncate hover:scale-[1.01] active:scale-95"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Output Section */}
          <section className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tighter uppercase">Output</h2>
              <p className="text-white/40 text-sm font-medium">Structured data extraction.</p>
            </div>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  className="bg-[#111] border border-white/10 rounded-lg p-10 shadow-2xl space-y-10"
                >
                  {/* Intent & Priority */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Intent</span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{result.intent}</h3>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded text-[10px] font-black border flex items-center gap-1.5 uppercase tracking-widest",
                      getPriorityColor(result.priority)
                    )}>
                      <Clock className="w-3 h-3" />
                      {result.priority}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-[10px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest hover:scale-105 active:scale-95"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                          <span className="text-white">Copied</span>
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3 h-3" />
                          <span>Copy Result</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-3"
                  >
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Summary</span>
                    <div className="bg-white/5 rounded p-5 border border-white/5">
                      <p className="text-white/60 text-sm leading-relaxed italic font-medium">
                        "{result.summary}"
                      </p>
                    </div>
                  </motion.div>

                  {/* Suggested Action */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Action</span>
                    <div className="flex items-start gap-4 p-6 bg-white rounded text-black">
                      <div className="mt-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p className="font-black text-sm uppercase leading-relaxed tracking-tight">
                        {result.suggestedAction}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-10 flex flex-col items-center text-center space-y-4"
                >
                  <AlertCircle className="w-10 h-10 text-white/20" />
                  <p className="text-white/60 font-black uppercase tracking-widest text-xs">{error}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/[0.02] border border-dashed border-white/10 rounded-lg p-20 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center border border-white/5">
                    <MessageSquare className="w-8 h-8 text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">Awaiting Input</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-white/40 transition-colors cursor-default group">
            <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Analysis Verified</span>
          </div>
          <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
            Minimalist Extraction Engine
          </p>
        </div>
      </footer>
    </div>
  );
}
