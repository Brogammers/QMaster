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
  Alert,
} from 'react-native';
import { useTheme } from "@/ctx/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';

interface SiaResponse {
  message: string;
  voice_message?: string;
  action?: string;
  data?: any;
  suggestions: string[];
}

interface SiaAssistantProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SiaAssistant: React.FC<SiaAssistantProps> = ({ isVisible, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isHotwordListening, setIsHotwordListening] = useState(true);
  const [response, setResponse] = useState<SiaResponse | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Start listening for hotword when component mounts
    startHotwordDetection();

    return () => {
      // Cleanup
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startHotwordDetection = async () => {
    try {
      await Voice.start('en-US');
      setIsHotwordListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      const transcript = e.value[0].toLowerCase();
      if (transcript.includes('hey sia') || transcript.includes('hey saya')) {
        // Stop hotword detection and start command listening
        Voice.stop();
        setIsHotwordListening(false);
        handlePress();
      } else if (!isHotwordListening) {
        // Process the command
        processCommand(transcript);
        Voice.stop();
        // Restart hotword detection
        setTimeout(() => {
          startHotwordDetection();
        }, 1000);
      }
    }
  };

  const onSpeechError = (e: any) => {
    console.error(e);
    // Restart hotword detection if it fails
    if (isHotwordListening) {
      setTimeout(startHotwordDetection, 1000);
    }
  };

  // Floating button animation
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
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
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handlePress = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
      // Remove the setTimeout and let the voice recognition handle the command
    } catch (error) {
      console.error('Error:', error);
      setIsListening(false);
    }
  };

  const processCommand = async (command: string) => {
    try {
      const response = await fetch('http://localhost:9096/api/v1/mobile/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          user_id: 'user123', // Get from auth
          location: { lat: 30.0444, lng: 31.2357 }, // Get from location service
        }),
      });

      const data: SiaResponse = await response.json();
      setResponse(data);
      setIsListening(false);

    } catch (error) {
      console.error('Error:', error);
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Sia Button */}
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: isDarkMode ? '#0C1824' : '#D9D9D9' }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <FontAwesome5 
            name="robot" 
            size={24} 
            color={isDarkMode ? '#00FFFF' : '#0C1824'} 
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Sia Assistant Modal */}
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#0C1824' : '#D9D9D9' }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: isDarkMode ? '#D9D9D9' : '#0C1824' }]}>Sia</Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
              >
                <FontAwesome5 name="times" size={24} color={isDarkMode ? '#D9D9D9' : '#0C1824'} />
              </TouchableOpacity>
            </View>

            {/* Response Area */}
            <ScrollView style={styles.responseArea}>
              {response && (
                <View style={styles.responseContainer}>
                  <Text style={[styles.responseText, { color: isDarkMode ? '#D9D9D9' : '#0C1824' }]}>
                    {response.message}
                  </Text>
                  
                  {/* Suggestions */}
                  <View style={styles.suggestionsContainer}>
                    {response.suggestions.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.suggestionButton, { backgroundColor: '#00FFFF' }]}
                        onPress={() => processCommand(suggestion)}
                      >
                        <Text style={[styles.suggestionText, { color: '#0C1824' }]}>
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Voice Input Button */}
            <TouchableOpacity
              style={[styles.voiceButton, { backgroundColor: '#00FFFF' }]}
              onPress={handlePress}
            >
              <FontAwesome5 
                name={isListening ? "stop" : "microphone"} 
                size={24} 
                color="#0C1824" 
              />
            </TouchableOpacity>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  responseArea: {
    flex: 1,
  },
  responseContainer: {
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  suggestionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  voiceButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
}); 