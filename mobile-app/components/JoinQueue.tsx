import React, { useState, useContext, useEffect, createContext } from "react";
import {
  View,
  ScrollView,
  Platform,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import DropDownPicker from "react-native-dropdown-picker";
import QueueDetails from "./QueueDetails";
import ServiceTypeGrid from "./ServiceTypeGrid";
import { LocationContext } from "@/app/(app)/(tabs)/Partner";
import i18n from "@/i18n";
import { ServiceProps } from "@/types";
import { useLocalSearchParams } from "expo-router";
import OpeningHours from "./OpeningHours";
import axios, { AxiosError } from "axios";
import configConverter from "@/api/configConverter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export interface Queue {
  id: number;
  name: string;
  averageServiceTime: number;
  currentQueueSize: number;
}

export const QueuesContext = createContext<{
  queues: Queue[];
  selectedQueue: Queue | null;
  setQueues: React.Dispatch<React.SetStateAction<Queue[]>>;
  setSelectedQueue: React.Dispatch<React.SetStateAction<Queue | null>>;
}>({
  queues: [],
  selectedQueue: null,
  setQueues: () => {},
  setSelectedQueue: () => {},
});

const companySocialMediaLinks = [
  {
    icon: faFacebook,
    handle: "h4temsoliman",
    url: "https://facebook.com/h4temsoliman",
  },
  {
    icon: faInstagram,
    handle: "hatemyasser03",
    url: "https://instagram.com/hatemyasser03",
  },
  {
    icon: faXTwitter,
    handle: "h4temsoliman",
    url: "https://x.com/h4temsoliman",
  },
  {
    icon: faLinkedin,
    handle: "qmasterapp",
    url: "https://linkedin.com/company/qmasterapp",
  },
];

export default function JoinQueue() {
  const { isDarkMode } = useTheme();
  const { brandName } = useLocalSearchParams<{ brandName: string }>();
  const width = Dimensions.get("window").width * 0.85;
  const [open, setOpen] = useState(false);
  const { locationData, currentLocation, setCurrentLocation } =
    useContext(LocationContext);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);
  const [hours, setHours] = useState<{
    [key: string]: {
      open: string;
      close: string;
      isClosed?: boolean;
    };
  }>({
    Monday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Tuesday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Wednesday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Thursday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Friday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Saturday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
    Sunday: {
      open: "08:00",
      close: "17:00",
      isClosed: false,
    },
  });

  const handleSelectService = (service: ServiceProps | null) => {
    if (!service) {
      setSelectedQueue(null);
      return;
    }
    setSelectedQueue(
      queues.find((queue) => queue.name === service.name) || null
    );
  };

  useEffect(() => {
    if (!currentLocation) return;

    const url = configConverter(
      "EXPO_PUBLIC_API_BASE_URL_GET_OPENING_HOURS_BY_BUSINESS"
    );

    axios
      .get(`${url}?businessName=${brandName}&locationId=${currentLocation}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.hours;
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        const hoursData = data.map((hour: any) => ({
          [hour.day]: {
            open: hour.open,
            close: hour.close,
            isClosed: !hour.isOpen,
          },
        }));
        setHours(Object.assign({}, ...hoursData));
      })
      .catch((error) => {
        console.log("Error: ", (error as AxiosError).response?.data);
      });
  }, [brandName, currentLocation]);

  return (
    <QueuesContext.Provider
      value={{ queues, selectedQueue, setQueues, setSelectedQueue }}
    >
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
              <View className="flex-row justify-center gap-3 my-1">
                {companySocialMediaLinks.map((social, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Linking.openURL(social.url)}
                    className={`p-2.5 rounded-full border-1`}
                    style={[
                      isDarkMode ? styles.darkContainer : styles.lightContainer,
                    ]}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      size={20}
                      color={isDarkMode ? "#1DCDFE" : "#0077B6"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <DropDownPicker
                open={open}
                value={currentLocation}
                items={locationData}
                setOpen={setOpen}
                setValue={(value) => {
                  setCurrentLocation(value);
                  handleSelectService(null);
                }}
                style={{
                  width: width,
                  alignSelf: "center",
                  borderRadius: 12,
                  marginTop: 20,
                  borderWidth: 1.5,
                  backgroundColor: isDarkMode
                    ? "rgba(29, 205, 254, 0.1)"
                    : "white",
                  borderColor: isDarkMode
                    ? "rgba(29, 205, 254, 0.2)"
                    : "#E5E7EB",
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
                  borderColor: isDarkMode
                    ? "rgba(29, 205, 254, 0.2)"
                    : "#E5E7EB",
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
                  borderColor: isDarkMode
                    ? "rgba(29, 205, 254, 0.2)"
                    : "#E5E7EB",
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
          </View>
          <View className="items-center w-full">
            {currentLocation && (
              <View
                style={{
                  zIndex: Platform.OS === "ios" ? 999 : undefined,
                  elevation: Platform.OS === "android" ? 999 : undefined,
                  width: "100%",
                  alignItems: "center",
                  marginBottom: open ? 150 : 0,
                }}
              >
                <OpeningHours hours={hours} />
                {!selectedQueue && (
                  <ServiceTypeGrid
                    businessName={brandName}
                    locationId={currentLocation}
                    onSelectService={handleSelectService}
                  />
                )}
              </View>
            )}
            <View
              style={{
                zIndex: Platform.OS === "ios" ? 999 : undefined,
                elevation: Platform.OS === "android" ? 999 : undefined,
                width: "100%",
                alignItems: "center",
                marginBottom: open ? 150 : 0,
              }}
            >
              {selectedQueue && (
                <QueueDetails
                  branch={currentLocation ?? -1}
                  serviceType={selectedQueue.name}
                  brandName={brandName}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </QueuesContext.Provider>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: "rgba(23, 34, 45, 0.7)",
    borderColor: "rgba(29, 205, 254, 0.25)",
  },
  lightContainer: {
    backgroundColor: "#FFF",
    borderColor: "#1DCDFE",
    color: "#1DCDFE",
  },
});
