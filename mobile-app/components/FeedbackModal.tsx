import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
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
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
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
        <Animated.View style={[styles.overlay, { opacity: backdropOpacity }]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: isDarkMode ? "#0B1218" : "white",
                  borderColor: isDarkMode
                    ? "rgba(29, 205, 254, 0.2)"
                    : "#E5E7EB",
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Drag indicator */}
              <View
                style={styles.dragIndicatorContainer}
                {...panResponder.panHandlers}
              >
                <View
                  style={[
                    styles.dragIndicator,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.2)",
                    },
                  ]}
                />
              </View>

              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? "#1DCDFE" : "#17222D" },
                ]}
              >
                How was your experience?
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                overScrollMode="never"
                scrollEventThrottle={16}
              >
                {/* Success Message */}
                {showSuccess && (
                  <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.successMessage}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={40}
                      color="#4CAF50"
                    />
                    <Text
                      style={[
                        styles.successText,
                        { color: isDarkMode ? "#4CAF50" : "#2E7D32" },
                      ]}
                    >
                      Thank you for your feedback!
                    </Text>
                  </MotiView>
                )}

                {/* Wait Time Accuracy Rating */}
                <View style={styles.categorySection}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      { color: isDarkMode ? "#1DCDFE" : "#17222D" },
                    ]}
                  >
                    Wait Time Accuracy
                  </Text>
                  <Text
                    style={[
                      styles.categorySubtitle,
                      { color: isDarkMode ? "#A0AEC0" : "#718096" },
                    ]}
                  >
                    How accurate was your estimated wait time?
                  </Text>
                  {renderStars(accuracyRating, setAccuracyRating)}
                  {showError.accuracy && (
                    <Text style={styles.fieldError}>
                      Please rate the wait time accuracy
                    </Text>
                  )}
                  <View style={styles.ratingLegend}>
                    <Text
                      style={[
                        styles.legendText,
                        { color: isDarkMode ? "#A0AEC0" : "#718096" },
                      ]}
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
                  style={[
                    styles.divider,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(29, 205, 254, 0.1)"
                        : "#E5E7EB",
                    },
                  ]}
                />

                {/* Service Quality Rating */}
                <View style={styles.categorySection}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      { color: isDarkMode ? "#1DCDFE" : "#17222D" },
                    ]}
                  >
                    Service Quality
                  </Text>
                  <Text
                    style={[
                      styles.categorySubtitle,
                      { color: isDarkMode ? "#A0AEC0" : "#718096" },
                    ]}
                  >
                    How well did {businessName} serve you?
                  </Text>
                  {renderStars(speedRating, setSpeedRating)}
                  {showError.service && (
                    <Text style={styles.fieldError}>
                      Please rate the service quality
                    </Text>
                  )}
                  <View style={styles.ratingLegend}>
                    <Text
                      style={[
                        styles.legendText,
                        { color: isDarkMode ? "#A0AEC0" : "#718096" },
                      ]}
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
                  style={[
                    styles.divider,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(29, 205, 254, 0.1)"
                        : "#E5E7EB",
                    },
                  ]}
                />

                {/* Overall Experience Rating */}
                {/* <View style={styles.categorySection}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      { color: isDarkMode ? "#1DCDFE" : "#17222D" },
                    ]}
                  >
                    Overall Experience
                  </Text>
                  <Text
                    style={[
                      styles.categorySubtitle,
                      { color: isDarkMode ? "#A0AEC0" : "#718096" },
                    ]}
                  >
                    How was your overall visit?
                  </Text>
                  {renderStars(overallRating, setOverallRating)}

                  <View style={styles.ratingLegend}>
                    <Text
                      style={[
                        styles.legendText,
                        { color: isDarkMode ? "#A0AEC0" : "#718096" },
                      ]}
                    >
                      {overallRating === 5
                        ? "Excellent experience"
                        : overallRating === 4
                        ? "Very good experience"
                        : overallRating === 3
                        ? "Average experience"
                        : overallRating === 2
                        ? "Poor experience"
                        : overallRating === 1
                        ? "Very poor experience"
                        : "Select a rating"}
                    </Text>
                  </View>
                </View> */}

                {/* <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(29, 205, 254, 0.1)"
                        : "#E5E7EB",
                    },
                  ]}
                /> */}

                {/* Review Text */}
                <View style={styles.reviewSection}>
                  <Text
                    style={[
                      styles.categoryTitle,
                      { color: isDarkMode ? "#1DCDFE" : "#17222D" },
                    ]}
                  >
                    Review
                  </Text>
                  <TextInput
                    style={[
                      styles.reviewInput,
                      {
                        backgroundColor: isDarkMode
                          ? "rgba(29, 205, 254, 0.05)"
                          : "#F7FAFC",
                        color: isDarkMode ? "#1DCDFE" : "#17222D",
                        borderColor: isDarkMode
                          ? "rgba(29, 205, 254, 0.1)"
                          : "#E5E7EB",
                      },
                    ]}
                    placeholder="Tell us about your experience"
                    placeholderTextColor={isDarkMode ? "#4A5568" : "#A0AEC0"}
                    multiline
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <LinearGradient
                    colors={["#1DCDFE", "#0077B6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.submitButtonText}>Submit Feedback</Text>
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
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
  dragIndicatorContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  ratingSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  starButton: {
    padding: 5,
  },
  categorySection: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  categorySubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 15,
  },
  reviewSection: {
    marginVertical: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 50,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  ratingLegend: {
    marginTop: 10,
    alignItems: "center",
  },
  legendText: {
    fontSize: 14,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  successMessage: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    backgroundColor: "rgba(11, 18, 24, 0.95)",
    zIndex: 1000,
    borderRadius: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  fieldError: {
    color: "#EF4444",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
});

export default FeedbackModal;
