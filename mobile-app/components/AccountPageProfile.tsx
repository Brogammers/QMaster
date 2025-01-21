import React, { useEffect, useState } from "react";
import { View, Text, Image, I18nManager, Modal, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useLinkTo } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProfileImage } from "@/app/redux/userSlice";
import _ from "lodash";

interface ImagePreviewModalProps {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
}

const ImagePreviewModal = ({ visible, imageUri, onClose }: ImagePreviewModalProps) => {
  if (!imageUri) return null;
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        <TouchableOpacity 
          onPress={onClose}
          className="absolute top-12 right-4 z-10"
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: imageUri }}
            className="w-full h-3/4"
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

interface AccountPageProfileProps {
  isDarkMode: boolean;
}

export default function AccountPageProfile({ isDarkMode }: AccountPageProfileProps) {
  const username = useSelector((state: RootState) => state.username.username);
  const phoneCode = useSelector((state: RootState) => state.phoneCode.phoneCode);
  const phoneNumber = useSelector((state: RootState) => state.phoneNumber.phoneNumber);
  const profileImage = useSelector((state: RootState) => state.profileImage.profileImage);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const colorMode = isDarkMode ? "dark" : "light";
  const linkTo = useLinkTo();
  const dispatch = useDispatch();

  const handleSettingsPress = () => {
    linkTo("/Settings");
  };

  useEffect(() => {
    if (typeof username === "string") {
      setIsLoading(false);
    }
    loadProfileImage();
    requestPermissions();
  }, [username]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to change your profile picture.');
    }
  };

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        dispatch(setProfileImage(savedImage));
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
      Alert.alert('Error', 'Failed to load profile image');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await AsyncStorage.setItem('profileImage', imageUri);
        dispatch(setProfileImage(imageUri));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
    setModalVisible(false);
  };

  const handleImagePress = () => {
    if (profileImage) {
      setModalVisible(true);
    } else {
      pickImage();
    }
  };

  const capitalizeFullName = (name: string) => {
    return name.split(' ').map(word => _.capitalize(word)).join(' ');
  };

  return (
    <View className="w-11/12 my-6 self-center">
      <LinearGradient
        colors={['#17222D', '#13404D']}
        className="rounded-3xl p-5 shadow-lg border border-baby-blue/10"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <MotiView 
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            mass: 0.8,
            damping: 15,
          }}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity 
              onPress={handleImagePress}
              activeOpacity={0.7}
              className="relative"
            >
              <View className="bg-concrete-turqouise/30 p-0.5 rounded-2xl border border-baby-blue/20">
                {isLoading ? (
                  <Skeleton
                    colorMode={colorMode}
                    width={60}
                    height={60}
                    radius={16}
                  />
                ) : (
                  <>
                    {profileImage ? (
                      <Image 
                        source={{ uri: profileImage }}
                        className="w-[60px] h-[60px] rounded-2xl"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-[60px] h-[60px] rounded-2xl bg-concrete-turqouise/20 items-center justify-center">
                        <Ionicons name="person-outline" size={30} color="#1DCDFE" />
                      </View>
                    )}
                  </>
                )}
              </View>
              {!profileImage && !isLoading && (
                <View className="absolute bottom-0 right-0 bg-baby-blue rounded-full p-1 shadow-sm">
                  <Ionicons name="add" size={16} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            
            <View className="flex-col gap-2">
              <Skeleton
                colorMode={colorMode}
                width={150}
                height={24}
                radius={4}
              >
                {isLoading ? null : (
                  <Text className={`text-lg font-bold text-baby-blue ${I18nManager.isRTL ? "text-left" : "text-left"}`}>
                    {username && capitalizeFullName(username)}
                  </Text>
                )}
              </Skeleton>
              
              <Skeleton
                colorMode={colorMode}
                width={100}
                height={16}
                radius={4}
              >
                {isLoading ? null : (
                  <Text className="text-xs text-slight-slate-grey">
                    {phoneCode && phoneNumber && `${phoneCode}${phoneNumber}`}
                  </Text>
                )}
              </Skeleton>
            </View>
          </View>

          <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons name="settings-outline" size={24} color="#1DCDFE" />
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>

      {/* Action Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 justify-end bg-black/50"
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-6">
            <TouchableOpacity 
              className="p-4 border-b border-gray-200"
              onPress={() => {
                setModalVisible(false);
                setPreviewVisible(true);
              }}
            >
              <Text className="text-center text-lg text-gray-800">Preview Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="p-4"
              onPress={pickImage}
            >
              <Text className="text-center text-lg text-baby-blue">Change Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="p-4 mt-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-lg text-red-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Preview Modal */}
      <ImagePreviewModal
        visible={previewVisible}
        imageUri={profileImage}
        onClose={() => setPreviewVisible(false)}
      />
    </View>
  );
}