'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    
    setLoading(true);
    setPitch('');
    
    try {
      // In production, we will set NEXT_PUBLIC_BACKEND_URL to the Render URL
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      
      const res = await fetch(`${backendUrl}/api/pitch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
      
      const data = await res.json();
      setPitch(data.pitch);
    } catch (error) {
      setPitch("Error connecting to the backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]">
      
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full flex flex-col items-center text-center space-y-8 z-10"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white/80">AI Visionary Engine 2.0</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Generate your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            billion-dollar idea.
          </span>
        </h1>

        <p className="text-lg text-white/50 max-w-lg mt-4">
          Enter a single keyword and our advanced AI will hallucinate a highly-investable Silicon Valley startup pitch.
        </p>

        <form onSubmit={generatePitch} className="w-full max-w-md relative mt-8 group">
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Coffee, Dogs, Blockchain..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
          />
          <button 
            type="submit" 
            disabled={loading || !keyword}
            className="absolute right-2 top-2 bottom-2 bg-white text-black px-4 rounded-xl font-medium flex items-center space-x-2 hover:bg-white/90 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {pitch && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full mt-12 p-[1px] rounded-3xl bg-gradient-to-b from-white/20 to-white/0"
          >
            <div className="bg-[#0A0A0A] p-8 rounded-3xl text-left border border-white/5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-4">The Pitch</h3>
              <p className="text-xl leading-relaxed text-white/90 font-light">
                {pitch}
              </p>
            </div>
          </motion.div>
        )}

      </motion.div>
    </main>
  );
}
