import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PromoCardSvg from "@/assets/images/promo-card.svg";
import i18n from "@/i18n";

interface PromoCardProps {
  width?: number | DimensionValue;
  onPress?: () => void;
}

export default function PromoCard({ width, onPress }: PromoCardProps) {
  const containerStyle = [styles.container, width !== undefined && { width }];

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#005f92", "#0077B6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>iQueue</Text>
            <Text style={styles.subtitle}>{i18n.t("bookYourSpot")}</Text>
          </View>
          <View style={styles.imageContainer}>
            <PromoCardSvg height={80} width={120} style={styles.image} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  imageContainer: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
