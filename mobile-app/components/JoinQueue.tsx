import React, { useState, useContext } from "react";
import { View, ScrollView, Platform, Dimensions, Text } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import DropDownPicker from "react-native-dropdown-picker";
import QueueDetails from "./QueueDetails";
import ServiceTypeGrid from "./ServiceTypeGrid";
import { LocationContext } from "@/app/(app)/(tabs)/Partner";
import i18n from "@/i18n";
import { ServiceProps } from "@/types";

export default function JoinQueue() {
  const { isDarkMode } = useTheme();
  const width = Dimensions.get("window").width * 0.85;
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
  const { locationData, currentLocation, setCurrentLocation } =
    useContext(LocationContext);

  const handleSelectService = (service: ServiceProps) => {
    setSelectedService(service);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center w-full px-6">
          <View
            style={{
              zIndex: Platform.OS === "ios" ? 999 : undefined,
              elevation: Platform.OS === "android" ? 999 : undefined,
              width: "100%",
              alignItems: "center",
              marginBottom: open ? 150 : 0,
            }}
          >
            <DropDownPicker
              open={open}
              value={currentLocation}
              items={locationData}
              setOpen={setOpen}
              setValue={setCurrentLocation}
              style={{
                width: width,
                alignSelf: "center",
                borderRadius: 12,
                marginTop: 20,
                borderWidth: 1.5,
                backgroundColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.1)"
                  : "white",
                borderColor: isDarkMode ? "rgba(29, 205, 254, 0.2)" : "#E5E7EB",
                minHeight: 50,
              }}
              containerStyle={{
                position: "relative",
                width: width,
              }}
              labelStyle={{
                fontSize: 16,
                color: isDarkMode ? "#1DCDFE" : "#17222D",
              }}
              textStyle={{
                fontSize: 16,
                color: isDarkMode ? "#1DCDFE" : "#17222D",
              }}
              dropDownContainerStyle={{
                width: width,
                position: "absolute",
                top: 72,
                borderRadius: 12,
                borderWidth: 1.5,
                backgroundColor: isDarkMode ? "#0B1218" : "white",
                borderColor: isDarkMode ? "rgba(29, 205, 254, 0.2)" : "#E5E7EB",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: Platform.OS === "android" ? 5 : undefined,
                overflow: "visible",
              }}
              listItemContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.1)"
                  : "#F1F5F9",
                padding: 12,
              }}
              listItemLabelStyle={{
                color: isDarkMode ? "#1DCDFE" : "#17222D",
              }}
              searchContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.2)"
                  : "#E5E7EB",
                padding: 12,
                marginBottom: 4,
              }}
              searchTextInputStyle={{
                color: isDarkMode ? "#1DCDFE" : "#17222D",
                backgroundColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.05)"
                  : "#F8FAFC",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isDarkMode ? "rgba(29, 205, 254, 0.2)" : "#E5E7EB",
                height: 40,
                paddingHorizontal: 12,
              }}
              placeholder={i18n.t("common.queue.chooseBranch")}
              searchable
              searchPlaceholder={i18n.t("common.queue.searchBranches")}
              ArrowUpIconComponent={() => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isDarkMode ? "#1DCDFE" : "#17222D",
                      fontSize: 18,
                    }}
                  >
                    ▲
                  </Text>
                </View>
              )}
              ArrowDownIconComponent={() => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isDarkMode ? "#1DCDFE" : "#17222D",
                      fontSize: 18,
                    }}
                  >
                    ▼
                  </Text>
                </View>
              )}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
                showsVerticalScrollIndicator: false,
              }}
              maxHeight={250}
              itemSeparator={true}
              theme={isDarkMode ? "DARK" : "LIGHT"}
            />
          </View>

          {currentLocation && !selectedService && (
            <ServiceTypeGrid onSelectService={handleSelectService} />
          )}

          {selectedService && (
            <QueueDetails
              branch={currentLocation ?? -1}
              serviceType={selectedService.id}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}