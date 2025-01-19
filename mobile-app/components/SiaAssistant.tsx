import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { getGreeting } from '@/utils';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedFlareProps {
  isDarkMode: boolean;
  initialPosition?: {
    x: number;
    y: number;
  };
}

interface SiaAssistantProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const suggestionPrompts = [
  "How can QMaster help me save time?",
  "What features does QMaster offer?",
  "How do I find the best queue for me?",
];

const AnimatedFlare: React.FC<AnimatedFlareProps> = ({ isDarkMode, initialPosition }) => {
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

export const SiaAssistant: React.FC<SiaAssistantProps> = ({ isVisible, onClose, isDarkMode }) => {
  const firstName = useSelector((state: RootState) => state.firstName?.firstName || undefined);
  const [showModal, setShowModal] = useState(isVisible);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [displayedResponse, setDisplayedResponse] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const typingOpacity = useRef(new Animated.Value(0)).current;
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  useEffect(() => {
    setShowModal(isVisible);
  }, [isVisible]);

  const resetChat = () => {
    setResponse(null);
    setDisplayedResponse('');
    setInputText('');
    setIsTyping(false);
    setLastPrompt(null);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    onClose();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
    resetChat();
  };

  const animateTypingDots = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(typingOpacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const typeResponse = (fullResponse: string) => {
    setIsTyping(true);
    animateTypingDots();
    
    let currentIndex = 0;
    const typingSpeed = 15; // Reduced from 30 to 15 milliseconds per character
    
    const typeChar = () => {
      if (currentIndex < fullResponse.length) {
        setDisplayedResponse(fullResponse.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeChar();
  };

  const getHardcodedResponse = (prompt: string): string => {
    // Check for thank you variations
    const thankYouPatterns = [
      'thank', 'thanks', 'thx', 'tysm', 'thank u', 'thankyou',
      'appreciate', 'grateful', 'gracias', 'merci'
    ];

    const isThankYou = thankYouPatterns.some(pattern => 
      prompt.toLowerCase().includes(pattern.toLowerCase())
    );

    if (isThankYou) {
      const responses = [
        "You're very welcome! Always here to help you skip the Q! 😊",
        "My pleasure! That's what I'm here Q-for! 🌟",
        "Anytime! Let's keep your time in the Q to a minimum! ⏱️",
        "Happy to help! Q-counting on you to come back if you need more assistance! 🎯",
        "No problem at all! Q-nsider me your personal queue companion! 🤝",
        "Glad I could help! Q-ep calm and queue on! ✨"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    switch (prompt) {
      case "How can QMaster help me save time?":
        return "QMaster helps you save time in several ways:\n\n" +
               "• Real-time queue predictions to avoid long waits\n" +
               "• Smart recommendations for the best time to visit\n" +
               "• Virtual queuing so you can do other things while waiting\n" +
               "• Instant notifications when it's your turn";
      
      case "What features does QMaster offer?":
        return "QMaster offers several powerful features:\n\n" +
               "• AI-powered wait time predictions\n" +
               "• Virtual queue management\n" +
               "• Smart notifications system\n" +
               "• Location-based queue recommendations\n" +
               "• Real-time updates and status tracking";
      
      case "How do I find the best queue for me?":
        return "Finding the best queue is easy with QMaster:\n\n" +
               "• Share your location or select an area\n" +
               "• View real-time wait times for nearby queues\n" +
               "• Check crowd levels and peak times\n" +
               "• Get personalized recommendations based on your preferences\n" +
               "• Compare different locations and their current status";
      
      default:
        return "I'm here to help you with any questions about QMaster's features, queue management, and how to make the most of your time. Feel free to ask anything!";
    }
  };

  const handleSend = () => {
    if (inputText.trim() && !isTyping) {
      const responseText = getHardcodedResponse(inputText);
      setResponse(responseText);
      setDisplayedResponse('');
      typeResponse(responseText);
      setInputText('');
      setLastPrompt(inputText);
    }
  };

  const handleSuggestionTap = (suggestion: string) => {
    const responseText = getHardcodedResponse(suggestion);
    setResponse(responseText);
    setDisplayedResponse('');
    typeResponse(responseText);
    setInputText(suggestion);
    setLastPrompt(suggestion);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleOpenModal}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.pulseContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image 
            source={require('../assets/images/Sia AI.png')}
            style={styles.siaIcon}
          />
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        onRequestClose={handleCloseModal}
      >
        <BlurView
          intensity={20}
          tint={isDarkMode ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[
          styles.modalContainer,
          { 
            backgroundColor: isDarkMode 
              ? 'rgba(11, 18, 25, 0.85)' 
              : 'rgba(245, 245, 245, 0.85)',
          }
        ]}>
          {!isDarkMode && (
            <LinearGradient
              colors={[
                'rgba(0, 119, 182, 0.1)',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0)'
              ]}
              style={styles.lightModeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}
          {isDarkMode && (
            <LinearGradient
              colors={[
                'rgba(29, 205, 254, 0.1)',
                'rgba(29, 205, 254, 0.05)',
                'rgba(11, 18, 25, 0)'
              ]}
              style={styles.darkModeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}
          <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 0, y: 0 }} />
          <AnimatedFlare isDarkMode={isDarkMode} initialPosition={{ x: 100, y: 100 }} />

          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <FontAwesome5 
              name="times" 
              size={20} 
              color={isDarkMode ? '#1DCDFE' : '#17222D'} 
            />
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <View style={styles.headerSection}>
              <Text style={[styles.greeting, { color: isDarkMode ? '#FFFFFF' : '#17222D' }]}>
                {getGreeting(firstName)}
              </Text>
            </View>

            {(response || isTyping) && (
              <View style={[
                styles.responseContainer,
                { 
                  backgroundColor: isDarkMode 
                    ? 'rgba(23, 34, 45, 0.75)'  // Dark mode: semi-transparent dark blue
                    : 'rgba(255, 255, 255, 0.75)', // Light mode: semi-transparent white
                  borderColor: isDarkMode ? '#1DCDFE' : '#E5E7EB',
                }
              ]}>
                <Text style={[
                  styles.promptText,
                  { color: isDarkMode ? '#1DCDFE' : '#0C1824' }
                ]}>
                  {inputText || lastPrompt}
                </Text>
                <View style={[
                  styles.promptDivider,
                  { backgroundColor: isDarkMode ? 'rgba(229, 231, 235, 0.2)' : 'rgba(12, 24, 36, 0.2)' }
                ]} />
                <Text style={[
                  styles.responseText,
                  { color: isDarkMode ? '#FFFFFF' : '#17222D' }
                ]}>
                  {displayedResponse}
                </Text>
                {isTyping && (
                  <Animated.View style={{ opacity: typingOpacity }}>
                    <Text style={[
                      styles.typingIndicator,
                      { color: isDarkMode ? '#1DCDFE' : '#17222D' }
                    ]}>
                      •••
                    </Text>
                  </Animated.View>
                )}
              </View>
            )}

            {!response && !isTyping && (
              <View style={styles.suggestionsSection}>
                {suggestionPrompts.map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.suggestionChip,
                      { 
                        backgroundColor: isDarkMode ? '#17222D' : 'rgba(12, 24, 36, 0.1)',
                        borderColor: isDarkMode ? '#1DCDFE' : '#17222D',
                      }
                    ]}
                    onPress={() => handleSuggestionTap(prompt)}
                  >
                    <Text style={[
                      styles.suggestionText,
                      { color: isDarkMode ? '#1DCDFE' : '#17222D' }
                    ]}>
                      {prompt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputArea}>
            <View style={[
              styles.inputContainer,
              {
                backgroundColor: isDarkMode ? '#17222D' : '#FFFFFF',
                borderColor: isDarkMode ? '#1DCDFE' : '#E5E7EB',
                opacity: isTyping ? 0.7 : 1,
              }
            ]}>
              <View style={styles.inputSiaIcon}>
                <Image 
                  source={require('../assets/images/Sia AI.png')}
                  style={styles.siaInputIcon}
                />
              </View>

              <TextInput
                style={[
                  styles.input,
                  { color: isDarkMode ? '#FFFFFF' : '#17222D' }
                ]}
                placeholder="Ask Sia anything..."
                placeholderTextColor={isDarkMode ? '#1DCDFE80' : '#17222D80'}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                editable={!isTyping}
              />

              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: isDarkMode ? '#17222D' : '#FFFFFF',
                    borderColor: isDarkMode ? '#1DCDFE' : '#17222D',
                    opacity: (!inputText.trim() || isTyping) ? 0.5 : 1,
                  }
                ]}
                onPress={handleSend}
                disabled={!inputText.trim() || isTyping}
              >
                <FontAwesome5 
                  name="paper-plane" 
                  size={16} 
                  color={isDarkMode ? '#1DCDFE' : '#17222D'} 
                />
              </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  suggestionsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  inputArea: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16,
  },
  inputSiaIcon: {
    position: 'absolute',
    left: 8,
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
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flare: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
    opacity: 0.25,
    left: -SCREEN_WIDTH / 2,
    top: -SCREEN_WIDTH / 2,
  },
  responseContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 20,
  },
  promptText: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  promptDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
    opacity: 0.5,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
  },
  typingIndicator: {
    fontSize: 24,
    marginTop: 8,
    letterSpacing: 2,
  },
  lightModeGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: SCREEN_HEIGHT,
    opacity: 0.7,
  },
  darkModeGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: SCREEN_HEIGHT,
    opacity: 0.3,
  },
});