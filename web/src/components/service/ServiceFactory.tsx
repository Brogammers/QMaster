import React from 'react';
import { ServiceTemplate } from '@/types/business';
import CounterService from './CounterService';
import TableService from './TableService';
import AppointmentService from './AppointmentService';
import { Button } from 'antd';

interface ServiceFactoryProps {
  service: ServiceTemplate;
  onServiceUpdate: (updates: Partial<ServiceTemplate>) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

export default function ServiceFactory({ service, onServiceUpdate, onRemove, canRemove = true }: ServiceFactoryProps) {
  const handleCountChange = (count: number) => {
    onServiceUpdate({ defaultCount: count });
  };

  const handleDurationChange = (duration: number) => {
    onServiceUpdate({
      properties: {
        ...service.properties,
        duration,
      },
    });
  };

  const ServiceComponent = () => {
    switch (service.type) {
      case 'COUNTER':
        return <CounterService service={service} onCountChange={handleCountChange} />;
      case 'TABLE':
        return <TableService service={service} onCountChange={handleCountChange} />;
      case 'APPOINTMENT':
      case 'BOOKING':
        return <AppointmentService service={service} onDurationChange={handleDurationChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-6">
      <div className="flex-1">
        <ServiceComponent />
      </div>
      {canRemove && onRemove && (
        <Button
          onClick={onRemove}
          className="!bg-rose-500/90 !text-white hover:!bg-rose-600 border-0 rounded-xl h-11 mt-8"
          icon={<span className="text-lg">×</span>}
        >
          Remove
        </Button>
      )}
    </div>
  );
} 