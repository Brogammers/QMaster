import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  I18nManager,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import RecentItemsSearch from "@/components/RecentItemsSearch";
import PopularQueues from "@/components/PopularQueues";
import SearchFilter from "@/components/SearchFilter";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search() {
  const page = 1;
  const perPage = 8;
  const router = useRouter();

  const [input, setInput] = useState("");
  const { isDarkMode } = useTheme();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem("recentSearches");
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        } else {
          // Default example searches if none exist
          setRecentSearches([
            "elena cakes",
            "sale sucre",
            "deserts",
            "exception",
            "sal sucre",
          ]);
        }
      } catch (error) {
        console.error("Failed to load recent searches", error);
      }
    };

    loadRecentSearches();
  }, []);

  const categories = [
    { id: 1, name: "Coffee", icon: "coffee" },
    { id: 2, name: "Desserts", icon: "birthday-cake" },
    { id: 3, name: "Bakery", icon: "bread-slice" },
    { id: 4, name: "Koshaay", icon: "utensils" },
    { id: 5, name: "Sandwiches", icon: "hamburger" },
  ];

  const brands = [
    { id: 1, name: "Talabat Mart", logo: "shopping-cart", minutes: "25 mins" },
    { id: 2, name: "Carrefour", logo: "shopping-basket", minutes: "37 mins" },
    { id: 3, name: "Metro", logo: "store", minutes: "22 mins" },
    { id: 4, name: "Spinneys", logo: "shopping-bag", minutes: "26 mins" },
  ];

  const vendors = [
    {
      id: 1,
      name: "Feng Cha",
      logo: "store-alt",
      rating: "4.0",
      reviews: "(100+)",
      minutes: "18 mins",
      price: "EGP 14.99",
    },
    {
      id: 2,
      name: "Mazika Food",
      logo: "utensils",
      rating: "3.5",
      reviews: "(80)",
      minutes: "28 mins",
      price: "EGP 18.99",
    },
    {
      id: 3,
      name: "Mr.Octopus",
      logo: "fish",
      rating: "4.3",
      reviews: "(200+)",
      minutes: "29 mins",
      price: "EGP 0.00",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const categoryIcons: Record<string, string> = {
    Coffee: "coffee",
    Desserts: "birthday-cake",
    Bakery: "bread-slice",
    Koshaay: "utensils",
    Sandwiches: "hamburger",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Add gradient background */}
      <LinearGradient
        colors={["rgba(29, 205, 254, 0.1)", "rgba(255, 255, 255, 0)"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Header with search bar */}
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <FontAwesome name="search" size={18} color="#777" />
          <TextInput
            placeholder="Search food, groceries and more"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.searchInput}
            autoFocus={true}
            placeholderTextColor="#777"
          />
        </View>
      </View>

      {input.length === 0 ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabActiveText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Groceries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Health & beauty</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* What are you craving today? */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>What are you craving today?</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryImageContainer}>
                    <FontAwesome5
                      name={categoryIcons[category.name] || "question"}
                      size={24}
                      color="#1DCDFE"
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recent searches */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recent searches</Text>

            <View style={styles.recentSearchesContainer}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity key={index} style={styles.recentSearchItem}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#777"
                    style={styles.timeIcon}
                  />
                  <Text style={styles.recentSearchText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Big brands near you */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Big brands near you</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.brandsContainer}
            >
              {brands.map((brand) => (
                <TouchableOpacity key={brand.id} style={styles.brandItem}>
                  <View
                    style={[
                      styles.brandLogoContainer,
                      {
                        backgroundColor: [
                          "#e86a33",
                          "#0a1b4d",
                          "#0a4d8c",
                          "#308c5d",
                        ][brand.id - 1],
                      },
                    ]}
                  >
                    <FontAwesome5 name={brand.logo} size={24} color="white" />
                  </View>
                  <Text style={styles.brandTime}>{brand.minutes}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured vendors */}
          <View style={[styles.sectionContainer, styles.lastSection]}>
            <Text style={styles.sectionTitle}>Featured vendors</Text>

            <View style={styles.vendorsContainer}>
              {vendors.map((vendor) => (
                <TouchableOpacity key={vendor.id} style={styles.vendorItem}>
                  <View style={styles.vendorLogoContainer}>
                    <FontAwesome5
                      name={vendor.logo}
                      size={24}
                      color="#1DCDFE"
                    />
                  </View>
                  <View style={styles.vendorDetails}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>
                        ★ {vendor.rating} {vendor.reviews}
                      </Text>
                    </View>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <View style={styles.deliveryInfoContainer}>
                      <Ionicons name="time-outline" size={16} color="#777" />
                      <Text style={styles.deliveryTimeText}>
                        {vendor.minutes}
                      </Text>
                      <Text style={styles.deliveryPriceText}>
                        • {vendor.price}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <SearchFilter
          page={page}
          perPage={perPage}
          input={input}
          isDarkMode={isDarkMode}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  tabActive: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#1DCDFE",
  },
  tabText: {
    color: "#777",
    fontWeight: "500",
  },
  tabActiveText: {
    color: "#1DCDFE",
    fontWeight: "500",
  },
  sectionContainer: {
    backgroundColor: "white",
    marginTop: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    width: 70,
  },
  categoryImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  recentSearchesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  timeIcon: {
    marginRight: 6,
  },
  recentSearchText: {
    color: "#333",
    fontSize: 14,
  },
  brandsContainer: {
    paddingRight: 16,
  },
  brandItem: {
    alignItems: "center",
    marginRight: 16,
    width: 70,
  },
  brandLogoContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  brandTime: {
    fontSize: 12,
    color: "#777",
  },
  lastSection: {
    marginBottom: 20,
  },
  vendorsContainer: {
    gap: 16,
  },
  vendorItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  vendorLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  vendorDetails: {
    flex: 1,
    justifyContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#ffb100",
  },
  vendorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  deliveryInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryTimeText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#777",
  },
  deliveryPriceText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#777",
  },
});
