import React from 'react';
import { CloudSun, DollarSign, CheckSquare, ShieldCheck, Printer, Sparkles, Map } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Day-by-Day AI Generation',
      description: 'Generates structured morning, afternoon, and evening schedules with realistic pacing, location coordinates, and admission tips.',
      badge: 'Powered by Gemini'
    },
    {
      icon: DollarSign,
      title: 'Smart Budget Estimator',
      description: 'Automatically calculates expected expenses across lodging, dining, transit, activities, and miscellaneous allocations.',
      badge: 'Real-time Math'
    },
    {
      icon: CloudSun,
      title: 'Destination Weather Insights',
      description: 'Integrated temperature, cloud cover, and humidity forecasts tailored to your selected travel destinations.',
      badge: 'Live Radar Ready'
    },
    {
      icon: CheckSquare,
      title: 'Interactive Packing Checklist',
      description: 'Categorized essentials, documents, electronics, and attire with checked status saved directly in your browser.',
      badge: 'Offline Cached'
    },
    {
      icon: Printer,
      title: 'Printable Travel Brochure & PDF',
      description: 'Export clean, professional multi-page itineraries formatted specifically for printing or saving to your phone.',
      badge: 'One-click Export'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Serverless Architecture',
      description: 'All third-party credentials and AI endpoints run isolated in serverless functions, ensuring zero API key leakage in client code.',
      badge: 'Vercel Ready'
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/60 mb-3">
            <Map className="w-3.5 h-3.5" />
            <span>Built for Modern Adventurers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need for an unforgettable voyage
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Eliminate endless browser tabs, messy spreadsheets, and travel anxiety. WanderPlan AI handles logistics so you can focus on the experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
