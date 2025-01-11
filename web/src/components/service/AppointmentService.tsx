import React from 'react';
import { ServiceTemplate } from '@/types/business';

interface AppointmentServiceProps {
  service: ServiceTemplate;
  onDurationChange?: (duration: number) => void;
}

export default function AppointmentService({ service, onDurationChange }: AppointmentServiceProps) {
  return (
    <div className="flex items-start gap-6 p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg">
      <div className="flex-1 flex gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-coal-black mb-2">Service Name</label>
          <input
            type="text"
            value={service.name}
            disabled
            className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black"
          />
        </div>
        {service.type === 'BOOKING' && (
          <div className="w-56">
            <label className="block text-sm font-medium text-coal-black mb-2">Duration (hours)</label>
            <input
              type="number"
              defaultValue={service.properties?.duration || 1}
              onChange={(e) => onDurationChange?.(parseInt(e.target.value))}
              min={1}
              className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black"
            />
          </div>
        )}
      </div>
    </div>
  );
} 