import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useTheme } from "@/ctx/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedFlare = ({ isDarkMode, initialPosition }: { isDarkMode: boolean; initialPosition?: { x: number; y: number } }) => {
  const translateY = useRef(new Animated.Value(initialPosition?.y || 0)).current;
  const translateX = useRef(new Animated.Value(initialPosition?.x || 0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const createAnimation = () => {
      return Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -150,
            duration: 25000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 150,
            duration: 25000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 150,
            duration: 30000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -150,
            duration: 30000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.8,
            duration: 27000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 27000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 15000,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    const animation = Animated.loop(createAnimation());
    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.flare,
        {
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
          opacity,
          backgroundColor: isDarkMode 
            ? Math.random() > 0.5 ? '#00FFFF10' : '#87CEEB10'
            : Math.random() > 0.5 ? '#0077B610' : '#4682B410',
        },
      ]}
    />
  );
};

interface SiaResponse {
  message: string;
  suggestions: string[];
}

interface SiaAssistantProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SiaAssistant: React.FC<SiaAssistantProps> = ({ isVisible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<SiaResponse | null>(null);
  const [inputText, setInputText] = useState('');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { isDarkMode } = useTheme();

  // Pulse animation effect
  useEffect(() => {
    const pulseSequence = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseSequence).start();
  }, []);

  const processCommand = async (command: string) => {
    setResponse({
      message: `You said: ${command}`,
      suggestions: ["What's the wait time?", "How busy is it?", "When should I arrive?"],
    });
    setInputText('');
  };

  return (
    <>
      {/* Floating Sia Button */}
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: 'transparent' }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Animated.View 
          style={[
            styles.pulseContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Image 
            source={require('../assets/images/Sia AI.png')}
            style={styles.siaIcon}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Sia Assistant Modal */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[
          styles.modalContainer,
          { 
            backgroundColor: isDarkMode 
              ? 'rgba(12, 24, 36, 0.95)' 
              : 'rgba(245, 245, 245, 0.95)' 
          }
        ]}>
          <StatusBar translucent barStyle={isDarkMode ? "light-content" : "dark-content"} />
          
          {/* Animated Flares */}
          <View style={StyleSheet.absoluteFill}>
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: -100, y: -100 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 100, y: 100 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 0, y: 0 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: -50, y: 50 }} />
          </View>

          {/* Background Gradient */}
          {!isDarkMode && (
            <LinearGradient
              colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
              style={[StyleSheet.absoluteFill, { height: 250 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}

          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <FontAwesome5 
              name="times" 
              size={20} 
              color={isDarkMode ? '#FFF' : '#0C1824'} 
            />
          </TouchableOpacity>
          
          <View style={styles.contentContainer}>
            {/* Response Area */}
            <ScrollView style={styles.responseArea}>
              {response && (
                <View style={styles.responseContainer}>
                  <Text style={[styles.responseText, { 
                    color: isDarkMode ? '#D9D9D9' : '#0C1824',
                    textShadowColor: 'rgba(0, 255, 255, 0.3)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }]}>
                    {response.message}
                  </Text>
                  
                  {/* Suggestions */}
                  <View style={styles.suggestionsContainer}>
                    {response.suggestions.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.suggestionButton, 
                          { 
                            backgroundColor: isDarkMode 
                              ? 'rgba(0, 255, 255, 0.15)' 
                              : 'rgba(12, 24, 36, 0.1)',
                          }
                        ]}
                        onPress={() => processCommand(suggestion)}
                      >
                        <Text style={[styles.suggestionText, { color: isDarkMode ? '#00FFFF' : '#0C1824' }]}>
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Bottom Input Section */}
            <View style={[styles.bottomSection, { marginBottom: Platform.OS === 'ios' ? 60 : 40 }]}>
              <Animated.View 
                style={[
                  styles.pulseContainer,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Image 
                  source={require('../assets/images/Sia AI.png')}
                  style={styles.bottomSiaIcon}
                />
              </Animated.View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: isDarkMode ? '#00FFFF' : '#0C1824',
                      backgroundColor: isDarkMode 
                        ? 'rgba(0, 255, 255, 0.08)' 
                        : 'rgba(12, 24, 36, 0.08)',
                      borderColor: isDarkMode ? '#00FFFF33' : '#0C182433',
                      borderWidth: 1,
                    }
                  ]}
                  placeholder="Ask Sia anything..."
                  placeholderTextColor={isDarkMode ? '#00FFFF77' : '#0C182477'}
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={() => processCommand(inputText)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 90 : 70,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  siaIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  responseArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  responseContainer: {
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  suggestionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 'auto',
  },
  bottomSiaIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 500,
    marginHorizontal: 'auto',
    paddingTop: 15,
  },
  input: {
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  flare: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
    opacity: 0.3,
    left: -SCREEN_WIDTH / 2,
    top: -SCREEN_WIDTH / 2,
  },
}); 