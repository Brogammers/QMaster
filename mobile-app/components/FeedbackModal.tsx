import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  businessName: string;
  serviceName: string;
}

const { width, height } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.85;

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  businessName,
  serviceName,
}) => {
  const { isDarkMode } = useTheme();
  const [overallRating, setOverallRating] = useState(0);
  const [speedRating, setSpeedRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showError, setShowError] = useState({
    accuracy: false,
    service: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Animation values
  const slideAnim = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Pan responder for drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // User dragged down enough to dismiss
          closeModal();
        } else {
          // Reset position
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Open animation
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropOpacity]);

  const closeModal = () => {
    // Reset all form state
    setAccuracyRating(0);
    setSpeedRating(0);
    setFeedback("");
    setShowError({ accuracy: false, service: false });
    setShowSuccess(false);

    // Animate closing
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: MODAL_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleSubmit = () => {
    // Validate required ratings
    const newErrorState = {
      accuracy: accuracyRating === 0,
      service: speedRating === 0,
    };

    setShowError(newErrorState);

    if (newErrorState.accuracy || newErrorState.service) {
      return;
    }

    // Clear errors and proceed with submission
    setShowError({ accuracy: false, service: false });
    setShowSuccess(true);

    // Send feedback data
    console.log({
      accuracyRating,
      speedRating,
      feedback,
    });

    // Wait for success message to show before closing
    setTimeout(() => {
      // Reset form
      setAccuracyRating(0);
      setSpeedRating(0);
      setFeedback("");
      setShowSuccess(false);

      // Close modal
      closeModal();
    }, 1500);
  };

  const renderStars = (rating: number, setRating: (rating: number) => void) => {
    return (
      <View className="flex-row justify-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            className="p-2"
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={36}
              color={
                star <= rating ? "#1DCDFE" : isDarkMode ? "#4A5568" : "#CBD5E0"
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <Animated.View
          className="flex-1 bg-black/50 justify-end items-center"
          style={{ opacity: backdropOpacity }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              className={`w-full rounded-t-3xl p-6 pt-4 border border-b-0 ${
                isDarkMode
                  ? "bg-[#0B1218] border-[#1DCDFE]/20"
                  : "bg-white border-gray-200"
              }`}
              style={[
                {
                  height: MODAL_HEIGHT,
                  transform: [{ translateY: slideAnim }],
                  ...Platform.select({
                    ios: {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: -2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 10,
                    },
                    android: {
                      elevation: 5,
                    },
                  }),
                },
              ]}
            >
              {/* Drag indicator */}
              <View className="w-full items-center py-2">
                <View
                  className={`w-10 h-1.5 rounded-full ${
                    isDarkMode ? "bg-white/30" : "bg-black/20"
                  }`}
                />
              </View>

              <Text
                className={`text-2xl font-bold text-center mb-5 ${
                  isDarkMode ? "text-[#1DCDFE]" : "text-[#17222D]"
                }`}
              >
                How was your experience?
              </Text>

              <ScrollView
                className="pb-10"
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                scrollEventThrottle={16}
              >
                {/* Success Message */}
                {showSuccess && (
                  <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-[40%] left-0 right-0 items-center justify-center p-5 bg-[#0B1218]/95 z-50 rounded-2xl"
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={40}
                      color="#4CAF50"
                    />
                    <Text
                      className={`text-lg font-semibold mt-2 ${
                        isDarkMode ? "text-[#4CAF50]" : "text-[#2E7D32]"
                      }`}
                    >
                      Thank you for your feedback!
                    </Text>
                  </MotiView>
                )}

                {/* Wait Time Accuracy Rating */}
                <View className="my-1">
                  <Text
                    className={`text-xl font-semibold text-center mb-2 ${
                      isDarkMode ? "text-[#1DCDFE]" : "text-[#17222D]"
                    }`}
                  >
                    Wait Time Accuracy
                  </Text>
                  <Text
                    className={`text-base text-center leading-[22px] ${
                      isDarkMode ? "text-[#A0AEC0]" : "text-[#718096]"
                    }`}
                  >
                    How accurate was your estimated wait time?
                  </Text>
                  <View className="flex-row justify-center mt-2">
                    {renderStars(accuracyRating, setAccuracyRating)}
                  </View>
                  {showError.accuracy && (
                    <Text className="text-[#EF4444] text-sm text-center mt-2 font-medium">
                      Please rate the wait time accuracy
                    </Text>
                  )}
                  <View className="mt-1 items-center">
                    <Text
                      className={`text-sm text-center ${
                        isDarkMode ? "text-[#A0AEC0]" : "text-[#718096]"
                      }`}
                    >
                      {accuracyRating === 5
                        ? "Perfect! Waited exactly as estimated"
                        : accuracyRating === 4
                        ? "Very close (within 5 minutes)"
                        : accuracyRating === 3
                        ? "Somewhat close (within 10 minutes)"
                        : accuracyRating === 2
                        ? "Not very close (within 15 minutes)"
                        : accuracyRating === 1
                        ? "Not accurate at all (over 15 minutes off)"
                        : "Select a rating"}
                    </Text>
                  </View>
                </View>

                <View
                  className={`h-px w-full my-4 ${
                    isDarkMode ? "bg-[#1DCDFE]/10" : "bg-gray-200"
                  }`}
                />

                {/* Service Quality Rating */}
                <View className="my-1">
                  <Text
                    className={`text-xl font-semibold text-center mb-2 ${
                      isDarkMode ? "text-[#1DCDFE]" : "text-[#17222D]"
                    }`}
                  >
                    Service Quality
                  </Text>
                  <Text
                    className={`text-base text-center leading-[22px] ${
                      isDarkMode ? "text-[#A0AEC0]" : "text-[#718096]"
                    }`}
                  >
                    How well did {businessName} serve you?
                  </Text>
                  <View className="flex-row justify-center mt-2">
                    {renderStars(speedRating, setSpeedRating)}
                  </View>
                  {showError.service && (
                    <Text className="text-[#EF4444] text-sm text-center mt-2 font-medium">
                      Please rate the service quality
                    </Text>
                  )}
                  <View className="mt-1 items-center">
                    <Text
                      className={`text-sm text-center ${
                        isDarkMode ? "text-[#A0AEC0]" : "text-[#718096]"
                      }`}
                    >
                      {speedRating === 5
                        ? "Excellent service"
                        : speedRating === 4
                        ? "Very good service"
                        : speedRating === 3
                        ? "Satisfactory service"
                        : speedRating === 2
                        ? "Poor service"
                        : speedRating === 1
                        ? "Very poor service"
                        : "Select a rating"}
                    </Text>
                  </View>
                </View>

                <View
                  className={`h-px w-full my-4 ${
                    isDarkMode ? "bg-[#1DCDFE]/10" : "bg-gray-200"
                  }`}
                />

                {/* Review Text */}
                <View className="my-1">
                  <Text
                    className={`text-xl font-semibold text-center mb-2 ${
                      isDarkMode ? "text-[#1DCDFE]" : "text-[#17222D]"
                    }`}
                  >
                    Review
                  </Text>
                  <TextInput
                    className={`border rounded-xl p-3 h-[100px] mt-2.5 ${
                      isDarkMode
                        ? "bg-[#1DCDFE]/5 text-[#1DCDFE] border-[#1DCDFE]/10"
                        : "bg-[#F7FAFC] text-[#17222D] border-gray-200"
                    }`}
                    placeholder="Tell us about your experience"
                    placeholderTextColor={isDarkMode ? "#4A5568" : "#A0AEC0"}
                    multiline
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  className="mt-5 rounded-full overflow-hidden"
                  onPress={handleSubmit}
                >
                  <LinearGradient
                    colors={["#1DCDFE", "#0077B6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-4 items-center justify-center"
                  >
                    <Text className="text-white text-lg font-semibold">
                      Submit Feedback
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeedbackModal;
