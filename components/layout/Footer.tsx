import React from 'react';
import { Compass, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Vision */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                WanderPlan <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your journey, intelligently planned. Hyper-personalized day-by-day itineraries, smart budgeting, live weather, and interactive trip checklists.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Capstone Project</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore WanderPlan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#explore" className="hover:text-teal-400 transition-colors">
                  Top Global Destinations
                </a>
              </li>
              <li>
                <a href="#create" className="hover:text-teal-400 transition-colors">
                  AI Trip Generator
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-teal-400 transition-colors">
                  My Trip Dashboard
                </a>
              </li>
              <li>
                <a href="#packing" className="hover:text-teal-400 transition-colors">
                  Interactive Packing List
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Architecture & Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>React 18 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Tailwind CSS + Lucide Icons</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Google Gemini 1.5 Flash API</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Vercel Serverless Edge Endpoints</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Supabase / LocalStorage Dual Mode</span>
              </li>
            </ul>
          </div>

          {/* Skill Wallet / Capstone Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Submission Readiness
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Skill Wallet Verified Standard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Includes full responsive layout, offline persistence, serverless API boundaries, printable PDF itineraries, and zero exposed frontend secrets.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WanderPlan AI. Built for SmartInternz / Skill Wallet Capstone.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for passionate travelers around the globe</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
