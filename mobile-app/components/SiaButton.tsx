import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/ctx/ThemeContext';
import { useSia } from '@/ctx/SiaContext';

interface SiaButtonProps {
  showText?: boolean;
  style?: any;
}

export const SiaButton: React.FC<SiaButtonProps> = ({ showText = true, style }) => {
  const { isDarkMode } = useTheme();
  const { showSia } = useSia();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? '#0C1824' : '#D9D9D9' },
        style
      ]}
      onPress={showSia}
      activeOpacity={0.8}
    >
      <FontAwesome5 
        name="robot" 
        size={20} 
        color={isDarkMode ? '#D9D9D9' : '#0C1824'} 
      />
      {showText && (
        <Text style={[
          styles.text,
          { color: isDarkMode ? '#D9D9D9' : '#0C1824' }
        ]}>
          Ask Sia
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 