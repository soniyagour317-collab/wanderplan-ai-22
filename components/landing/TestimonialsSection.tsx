import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Solo Backpacker',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      comment: 'WanderPlan AI planned my 5-day solo trip to Kyoto perfectly! The morning and evening timings helped me avoid tourist crowds, and the budgeting tool was spot-on.',
      trip: 'Kyoto, Japan • 5 Days'
    },
    {
      name: 'Marcus & Chloe Vance',
      role: 'Couples Travel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'The Amalfi Coast itinerary had incredible cliffside restaurant recommendations we would have never found on our own. Printing the PDF itinerary was super convenient on the flight.',
      trip: 'Amalfi Coast, Italy • 4 Days'
    },
    {
      name: 'Aarav Patel',
      role: 'Adventure Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      comment: 'Being able to customize and reorder activities right in the browser while seeing live budget adjustments makes this the cleanest travel tool I have tested.',
      trip: 'Banff National Park • 6 Days'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by travelers across the globe
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Real feedback from globetrotters using WanderPlan AI to organize seamless adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {item.trip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
