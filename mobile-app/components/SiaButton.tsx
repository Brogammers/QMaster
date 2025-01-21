import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
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
        { backgroundColor: 'transparent' },
        style
      ]}
      onPress={showSia}
      activeOpacity={0.8}
    >
      <Image 
        source={require('../assets/images/Sia AI.png')}
        style={styles.siaIcon}
      />
      {showText && (
        <Text style={[
          styles.text,
          { color: isDarkMode ? '#00FFFF' : '#0C1824' }
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
    padding: 10,
    borderRadius: 20,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  siaIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
}); 