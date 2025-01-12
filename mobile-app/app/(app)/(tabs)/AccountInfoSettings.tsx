import { RootState } from '@/app/redux/store';
import { useAuth } from '@/ctx/AuthContext';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Platform, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

interface AccountInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  receiveOffers: boolean;
  newsletter: boolean;
}

export default function AccountInfoSettings() {
  const { isDarkMode } = useTheme();
  const { session } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

   const firstName = useSelector(
       (state: RootState) => state.firstName.firstName
   )?.split(" ")[0];
   const lastName = useSelector(
       (state: RootState) => state.lastName.lastName
   )?.split(" ")[0];


  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    dateOfBirth: new Date(),
    gender: 'prefer_not_to_say',
    receiveOffers: false,
    newsletter: false,
  });

    
  const handleSave = async () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <LinearGradient
        colors={['#17222D', '#13404D']}
        className="pt-14 pb-4 px-5"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Return href="/Settings" size={30} color="#fff" />
            <Text className="text-2xl font-bold ml-4 text-white">
              {i18n.t('account_info')}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)}
            className="px-3 py-1 rounded-lg bg-baby-blue"
          >
            <Text className="text-white font-medium">
              {isEditing ? i18n.t('cancel') : i18n.t('edit')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <MotiView 
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className={`rounded-xl p-4 mt-4 mb-6 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}
        >
          <View className="space-y-4">
            <View>
              <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{i18n.t('email')}</Text>
              <TextInput 
                value={typeof session === 'string' ? session : ''}
                editable={false}
                className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{i18n.t('first_name')}</Text>
              <TextInput 
                value={accountInfo.firstName}
                onChangeText={text => setAccountInfo({...accountInfo, firstName: text})}
                editable={isEditing}
                className={`py-3.5 px-4 rounded-xl ${
                  isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'
                } ${!isEditing && 'opacity-50'}`}
              />
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{i18n.t('last_name')}</Text>
              <TextInput 
                value={accountInfo.lastName}
                onChangeText={text => setAccountInfo({...accountInfo, lastName: text})}
                editable={isEditing}
                className={`py-3.5 px-4 rounded-xl ${
                  isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'
                } ${!isEditing && 'opacity-50'}`}
              />
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{i18n.t('date_of_birth')}</Text>
              <TouchableOpacity 
                onPress={() => isEditing && setShowDatePicker(true)}
                className={`py-3.5 px-4 rounded-xl ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                } ${!isEditing && 'opacity-50'}`}
              >
                <Text className={isDarkMode ? 'text-white' : 'text-coal-black'}>
                  {accountInfo.dateOfBirth.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{i18n.t('gender')}</Text>
              <View className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} ${!isEditing && 'opacity-50'}`}>
                <Picker
                  enabled={isEditing}
                  selectedValue={accountInfo.gender}
                  onValueChange={(value) => setAccountInfo({...accountInfo, gender: value})}
                  style={{ color: isDarkMode ? '#fff' : '#000', height: 50 }}
                >
                  <Picker.Item label={i18n.t('prefer_not_to_say')} value="prefer_not_to_say" />
                  <Picker.Item label={i18n.t('male')} value="male" />
                  <Picker.Item label={i18n.t('female')} value="female" />
                </Picker>
              </View>
            </View>

            <View className="flex-row items-center justify-between py-2">
              <Text className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t('receive_offers')}
              </Text>
              <Switch
                value={accountInfo.receiveOffers}
                onValueChange={(value) => isEditing && setAccountInfo({...accountInfo, receiveOffers: value})}
                disabled={!isEditing}
              />
            </View>

            <View className="flex-row items-center justify-between py-2">
              <Text className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t('newsletter')}
              </Text>
              <Switch
                value={accountInfo.newsletter}
                onValueChange={(value) => isEditing && setAccountInfo({...accountInfo, newsletter: value})}
                disabled={!isEditing}
              />
            </View>

            {isEditing && (
              <TouchableOpacity
                onPress={handleSave}
                className={`py-3.5 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
              >
                <Text className="text-white text-center font-semibold">
                  {i18n.t('save')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </MotiView>
      </ScrollView>

      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={accountInfo.dateOfBirth}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setAccountInfo({...accountInfo, dateOfBirth: selectedDate});
            }
          }}
        />
      )}
    </View>
  );
} 