import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/ctx/ThemeContext";

interface OpeningHoursProps {
  hours: {
    [key: string]: {
      open: string;
      close: string;
      isClosed?: boolean;
    };
  };
}

export default function OpeningHours({ hours }: OpeningHoursProps) {
  const [expanded, setExpanded] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const { isDarkMode } = useTheme();

  const formatTime = (time: string) => {
    return time;
  };

  const getTodayStatus = () => {
    const todayHours = hours[days[today]] || {
      open: "00:00",
      close: "00:00",
      isClosed: true,
    };
    if (todayHours.isClosed) return "Closed today";
    return `Open today: ${formatTime(todayHours.open)}-${formatTime(
      todayHours.close
    )}`;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mainContainer,
          isDarkMode ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <Text
          style={[
            styles.todayText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {getTodayStatus()}
        </Text>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text
            style={[
              styles.expandButtonText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            {expanded ? "Hide opening hours" : "Show opening hours"}
          </Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={isDarkMode ? "#fff" : "#666"}
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.weekContainer}>
            {days.map((day, index) => {
              const dayHours = hours[day] || {
                open: "00:00",
                close: "00:00",
                isClosed: true,
              };
              return (
                <View key={day} style={styles.dayRow}>
                  <Text
                    style={[
                      styles.dayText,
                      isDarkMode ? styles.darkText : styles.lightText,
                      index === today && styles.currentDay,
                    ]}
                  >
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.hoursText,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {dayHours.isClosed
                      ? "Closed"
                      : `${formatTime(dayHours.open)}-${formatTime(
                          dayHours.close
                        )}`}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    width: "100%",
    marginVertical: 16,
  },
  mainContainer: {
    padding: 15,
    borderRadius: 12,
    width: "100%",
  },
  darkContainer: {
    backgroundColor: "rgba(23, 34, 45, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(29, 205, 254, 0.25)",
  },
  lightContainer: {
    backgroundColor: "#1B2B41",
  },
  todayText: {
    fontSize: 16,
    fontWeight: "500",
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#fff",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  expandButtonText: {
    marginRight: 4,
  },
  weekContainer: {
    marginTop: 12,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  dayText: {
    flex: 1,
  },
  currentDay: {
    fontWeight: "600",
  },
  hoursText: {
    textAlign: "right",
  },
});
