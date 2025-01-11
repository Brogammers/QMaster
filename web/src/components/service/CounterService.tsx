import React from 'react';
import { ServiceTemplate } from '@/types/business';

interface CounterServiceProps {
  service: ServiceTemplate;
  onCountChange: (count: number) => void;
}

export default function CounterService({ service, onCountChange }: CounterServiceProps) {
  return (
    <div className="flex items-start gap-6 p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg">
      <div className="flex-1 flex gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-coal-black mb-2">Counter Name</label>
          <input
            type="text"
            value={service.name}
            disabled
            className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black"
          />
        </div>
        <div className="w-56">
          <label className="block text-sm font-medium text-coal-black mb-2">Number of Counters</label>
          <input
            type="number"
            defaultValue={service.defaultCount}
            onChange={(e) => onCountChange(parseInt(e.target.value))}
            min={1}
            className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black"
          />
        </div>
      </div>
    </div>
  );
} 