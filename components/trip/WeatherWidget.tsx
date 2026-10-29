import React, { useState, useEffect } from 'react';
import { WeatherInfo } from '../../types';
import { fetchDestinationWeather } from '../../services/weatherService';
import { CloudSun, Wind, Droplets, Info } from 'lucide-react';

interface WeatherWidgetProps {
  destination: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ destination }) => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchDestinationWeather(destination)
      .then(data => {
        if (isMounted) {
          setWeather(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [destination]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-center min-h-[140px]">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span>Fetching weather forecast for {destination}...</span>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-teal-900 to-navy-900 rounded-2xl text-white p-5 shadow-lg shadow-teal-950/20 relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Destination & Condition Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <CloudSun className="w-4 h-4" />
              <span>Forecast • {weather.city}</span>
            </div>
            <h4 className="text-xl font-bold mt-1 tracking-tight">{weather.condition}</h4>
            <p className="text-xs text-slate-300 mt-0.5">{weather.description}</p>
          </div>

          <div className="text-right">
            <span className="text-4xl font-extrabold tracking-tighter text-white">
              {weather.temp}°C
            </span>
            <p className="text-[11px] text-teal-200">
              {Math.round((weather.temp * 9) / 5 + 32)}°F
            </p>
          </div>
        </div>

        {/* Telemetry Pills (Humidity & Wind) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Humidity</span>
              <span className="font-semibold text-white">{weather.humidity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Wind</span>
              <span className="font-semibold text-white">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* Source Note Label */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
          <Info className="w-3 h-3 text-teal-400 shrink-0" />
          <span>
            {weather.source === 'openweather-live'
              ? 'Live satellite telemetry verified by OpenWeatherMap API.'
              : 'Sample weather telemetry. (Add OPENWEATHER_API_KEY in .env for live conditions).'}
          </span>
        </div>
      </div>
    </div>
  );
};
