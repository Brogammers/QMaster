import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import { MotiView } from 'moti';

export interface ServiceType {
  id: number;
  name: string;
  icon?: string; // We can add icons later if needed
  estimatedWaitTime?: number;
}

interface ServiceTypeGridProps {
  services: ServiceType[];
  onSelect: (service: ServiceType) => void;
  selectedService: ServiceType | null;
}

export default function ServiceTypeGrid({ services, onSelect, selectedService }: ServiceTypeGridProps) {
  const { isDarkMode } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      className="w-full mt-4"
    >
      <Text
        className="text-lg mb-3"
        style={{ color: isDarkMode ? '#1DCDFE' : '#17222D' }}
      >
        {i18n.t('common.queue.chooseService')}
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => onSelect(service)}
            className="w-[48%] mb-3"
          >
            <View
              className="p-4 rounded-xl"
              style={{
                backgroundColor: selectedService?.id === service.id
                  ? (isDarkMode ? 'rgba(29, 205, 254, 0.2)' : 'rgba(29, 205, 254, 0.1)')
                  : (isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'white'),
                borderWidth: 1.5,
                borderColor: selectedService?.id === service.id
                  ? '#1DCDFE'
                  : (isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB'),
              }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: isDarkMode ? '#1DCDFE' : '#17222D' }}
              >
                {service.name}
              </Text>
              {service.estimatedWaitTime !== undefined && (
                <Text
                  className="text-sm mt-1"
                  style={{ color: isDarkMode ? 'rgba(29, 205, 254, 0.7)' : '#64748B' }}
                >
                  ~{service.estimatedWaitTime} {i18n.t('common.queue.minutes')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </MotiView>
  );
} 