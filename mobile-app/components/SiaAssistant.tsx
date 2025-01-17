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
  Easing,
} from 'react-native';
import { useTheme } from "@/ctx/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DeerMan from '@/shared/components/DeerMan';
import i18n from '@/i18n';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedFlare = ({ isDarkMode, initialPosition }: { isDarkMode: boolean; initialPosition?: { x: number; y: number } }) => {
  const translateY = useRef(new Animated.Value(initialPosition?.y || 0)).current;
  const translateX = useRef(new Animated.Value(initialPosition?.x || 0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const createAnimation = () => {
      return Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -150,
            duration: 20000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 150,
            duration: 20000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 150,
            duration: 25000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -150,
            duration: 25000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.8,
            duration: 22000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 22000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 12000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 12000,
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
            ? Math.random() > 0.45 ? '#00FFFF15' : '#87CEEB15'
            : Math.random() > 0.45 ? '#0077B615' : '#4682B415',
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
  const [response, setResponse] = useState<SiaResponse | null>({
    message: getTimeBasedGreeting(),
    suggestions: [
      i18n.t('suggestions.waitTime'),
      i18n.t('suggestions.busyness'),
      i18n.t('suggestions.arrival')
    ]
  });
  const [inputText, setInputText] = useState('');
  const [showDeer, setShowDeer] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { isDarkMode } = useTheme();
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const messageAnimation = useRef(new Animated.Value(0)).current;

  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return i18n.t('greetings.morning');
    if (hour >= 12 && hour < 17) return i18n.t('greetings.afternoon');
    if (hour >= 17 && hour < 22) return i18n.t('greetings.evening');
    return i18n.t('greetings.night');
  }

  // Pulse animation effect
  useEffect(() => {
    const pulseSequence = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(
      Animated.sequence([
        pulseSequence,
        Animated.delay(1000), // Add a pause between pulses
      ])
    ).start();
  }, []);

  // Input field animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(inputAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(inputAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const processCommand = async (command: string) => {
    setShowDeer(false);
    
    // Reset and start message animation
    messageAnimation.setValue(0);
    Animated.spring(messageAnimation, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Mock responses based on different prompts
    const mockResponses: { [key: string]: SiaResponse } = {
      [i18n.t('suggestions.waitTime')]: {
        message: "Currently, the estimated wait time is about 25 minutes. This is based on real-time data from the venue. Would you like me to notify you when the wait time drops below 15 minutes?",
        suggestions: ["Yes, notify me", "Show me peak hours", "Is this normal?"]
      },
      [i18n.t('suggestions.busyness')]: {
        message: "The venue is moderately busy right now, operating at about 75% capacity. Based on historical data, it should start getting less crowded in about an hour. The bar area is less crowded than the main dining space.",
        suggestions: ["Show me a graph", "Best time to come?", "Reserve a spot"]
      },
      [i18n.t('suggestions.arrival')]: {
        message: "Based on current trends, I recommend arriving around 8:30 PM. The crowd typically thins out by then, and you'll have a shorter wait time. Would you like me to check table availability for that time?",
        suggestions: ["Check availability", "Show me other times", "Set a reminder"]
      },
      "default": {
        message: `I understand you're asking about "${command}". I'm here to help with wait times, venue capacity, and scheduling. What specific information would you like to know?`,
        suggestions: [
          i18n.t('suggestions.waitTime'),
          i18n.t('suggestions.busyness'),
          i18n.t('suggestions.arrival')
        ]
      }
    };

    // Get the appropriate response or use default
    const response = mockResponses[command] || mockResponses.default;
    setResponse(response);
    setInputText('');
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!showModal) {
      setResponse({
        message: getTimeBasedGreeting(),
        suggestions: [
          i18n.t('suggestions.waitTime'),
          i18n.t('suggestions.busyness'),
          i18n.t('suggestions.arrival')
        ]
      });
      setInputText('');
      setShowDeer(true);
    }
  }, [showModal]);

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
          <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: -100, y: -100 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 100, y: 100 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 0, y: 0 }} />
            <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: -50, y: 50 }} />
          </View>

          {/* Initial Greeting and Suggestions */}
          {!response?.message.includes('"') && (
            <View style={[StyleSheet.absoluteFill, { zIndex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }]}>
              <Text style={{
                color: isDarkMode ? '#FFFFFF' : '#000000',
                fontSize: 32,
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 40,
              }}>
                {getTimeBasedGreeting()}
              </Text>
              
              <View style={{ alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
                {[
                  i18n.t('suggestions.waitTime'),
                  i18n.t('suggestions.busyness'),
                  i18n.t('suggestions.arrival')
                ].map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.suggestionButton,
                      {
                        backgroundColor: 'rgba(142, 142, 147, 0.2)',
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        width: index === 2 ? '80%' : index === 1 ? '90%' : '100%',
                        marginBottom: -8,
                        alignSelf: index === 2 ? 'center' : index === 1 ? 'flex-end' : 'flex-start',
                        zIndex: 3 - index,
                      }
                    ]}
                    onPress={() => processCommand(suggestion)}
                  >
                    <Text style={[
                      styles.suggestionText,
                      {
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                        fontSize: 16,
                        textAlign: 'center',
                      }
                    ]}>
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Background Gradient */}
          {!isDarkMode && (
            <LinearGradient
              colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
              style={[StyleSheet.absoluteFill, { height: 250, zIndex: 1 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}

          {/* Close Button */}
          <TouchableOpacity 
            style={[styles.closeButton, { zIndex: 3 }]}
            onPress={() => setShowModal(false)}
          >
            <FontAwesome5 
              name="times" 
              size={20} 
              color={isDarkMode ? '#FFF' : '#0C1824'} 
            />
          </TouchableOpacity>
          
          <View style={[styles.contentContainer, { zIndex: 2 }]}>
            {/* Response Area */}
            <ScrollView 
              style={[
                styles.responseArea,
                { 
                  marginTop: Platform.OS === 'ios' ? 100 : 80,
                }
              ]}
            >
              {response && (
                <Animated.View 
                  style={[
                    styles.responseContainer,
                    {
                      transform: [
                        {
                          translateY: messageAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                      opacity: messageAnimation,
                    },
                  ]}
                >
                  <Text style={[styles.responseText, { 
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                    marginBottom: 20,
                  }]}>
                    {response.message}
                  </Text>
                  
                  <View style={styles.suggestionsContainer}>
                    {response.suggestions.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.suggestionButton, 
                          { 
                            backgroundColor: isDarkMode 
                              ? 'rgba(255, 255, 255, 0.15)' 
                              : 'rgba(0, 0, 0, 0.1)',
                            marginBottom: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 20,
                          }
                        ]}
                        onPress={() => processCommand(suggestion)}
                      >
                        <Text style={[styles.suggestionText, { 
                          color: isDarkMode ? '#FFFFFF' : '#000000',
                          fontSize: 14,
                        }]}>
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Animated.View>
              )}
            </ScrollView>

            {/* Bottom Input Section */}
            <View style={[styles.bottomSection, { marginBottom: Platform.OS === 'ios' ? 60 : 40 }]}>
              <Animated.View 
                style={[
                  styles.inputContainer,
                  {
                    transform: [
                      {
                        translateY: inputAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -3],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={[styles.inputWrapper, { zIndex: 10 }]}>
                  <Animated.View 
                    style={[
                      styles.inputSiaIcon,
                      { transform: [{ scale: pulseAnim }], zIndex: 13 }
                    ]}
                  >
                    <Image 
                      source={require('../assets/images/Sia AI.png')}
                      style={styles.siaInputIcon}
                    />
                  </Animated.View>
                  
                  <TextInput
                    style={[
                      styles.input,
                      {
                        position: 'absolute',
                        width: '100%',
                        color: 'transparent',
                        backgroundColor: isDarkMode 
                          ? 'rgba(0, 0, 0, 0.8)' 
                          : '#FFFFFF',
                        borderColor: isDarkMode ? '#1DCDFE' : '#E5E7EB',
                        borderWidth: isDarkMode ? 1.5 : 1,
                        paddingLeft: 45,
                        paddingRight: 45,
                        paddingVertical: 24,
                        fontSize: 16,
                        bottom: -2,
                        height: 24,
                        lineHeight: 38,
                        textAlignVertical: 'center',
                        includeFontPadding: false,
                        zIndex: 10,
                      }
                    ]}
                    // placeholder="Ask Sia anything..."
                    placeholderTextColor={isDarkMode ? '#1DCDFE' : '#00000080'}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={() => processCommand(inputText)}
                    autoCorrect={false}
                    selectionColor="#1DCDFE"
                  />
                  {/* Visible Text Overlay */}
                  <Text
                    style={[
                      styles.input,
                      {
                        color: inputText 
                          ? (isDarkMode ? '#1DCDFE' : '#000000')
                          : (isDarkMode ? '#1DCDFE80' : '#00000050'),
                        backgroundColor: 'transparent',
                        paddingLeft: 45,
                        paddingRight: 48,
                        fontSize: 16,
                        height: 10,
                        lineHeight: 10,
                        textAlignVertical: 'center',
                        zIndex: 11,
                        pointerEvents: 'none',
                      }
                    ]}
                  >
                    {inputText || 'Ask Sia anything...'}
                  </Text>
                  <TouchableOpacity 
                    style={[
                      styles.sendButton,
                      {
                        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(12, 24, 36, 0.1)',
                        borderWidth: isDarkMode ? 1.5 : 0,
                        borderColor: '#1DCDFE',
                        zIndex: 12,
                        opacity: inputText.trim() ? 1 : 0.5,
                      }
                    ]}
                    onPress={() => inputText.trim() && processCommand(inputText)}
                    disabled={!inputText.trim()}
                  >
                    <FontAwesome5 
                      name="paper-plane" 
                      size={16} 
                      color={isDarkMode ? '#1DCDFE' : '#0C1824'} 
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
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
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  responseArea: {
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  responseContainer: {
    marginBottom: 20,
    zIndex: 2,
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
    zIndex: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 9999,
    padding: 24,
    paddingRight: 64,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  sendButton: {
    position: 'absolute',
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
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
    opacity: 0.25,
    left: -SCREEN_WIDTH / 2,
    top: -SCREEN_WIDTH / 2,
    zIndex: 1,
  },
  inputSiaIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  siaInputIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
}); 