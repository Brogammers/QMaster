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
    // Here you would send the feedback data to your backend
    console.log({
      overallRating,
      speedRating,
      accuracyRating,
      feedback,
    });

    // Reset form
    setOverallRating(0);
    setSpeedRating(0);
    setAccuracyRating(0);
    setFeedback("");

    // Close modal
    closeModal();
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
                {/* Overall Rating */}
                <View style={styles.ratingSection}>
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

                {/* Speed Rating */}
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

                {/* Accuracy Rating */}
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
                    Did you wait the estimated time?
                  </Text>
                  {renderStars(accuracyRating, setAccuracyRating)}
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
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  categorySubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
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
});

export default FeedbackModal;
