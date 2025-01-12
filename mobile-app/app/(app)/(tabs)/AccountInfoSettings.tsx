import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/ctx/ThemeContext';
import { useAuth } from '@/ctx/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

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
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
        <View className="flex-row items-center">
          <Return href="/Settings" size={30} color={isDarkMode ? "#fff" : "#000"} />
          <Text className={`text-2xl font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {i18n.t('account_info')}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => setIsEditing(!isEditing)}
          className={`px-3 py-1 rounded-lg ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
        >
          <Text className="text-white font-medium">
            {isEditing ? i18n.t('cancel') : i18n.t('edit')}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5">
        <View className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}>
          <View className="space-y-4">
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('email')}</Text>
              <TextInput 
                value={typeof session === 'string' ? session : ''}
                editable={false}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>

            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('first_name')}</Text>
              <TextInput 
                value={accountInfo.firstName}
                onChangeText={text => setAccountInfo({...accountInfo, firstName: text})}
                editable={isEditing}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'
                } ${!isEditing && 'opacity-50'}`}
              />
            </View>

            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('last_name')}</Text>
              <TextInput 
                value={accountInfo.lastName}
                onChangeText={text => setAccountInfo({...accountInfo, lastName: text})}
                editable={isEditing}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'
                } ${!isEditing && 'opacity-50'}`}
              />
            </View>

            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('date_of_birth')}</Text>
              <TouchableOpacity 
                onPress={() => isEditing && setShowDatePicker(true)}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                } ${!isEditing && 'opacity-50'}`}
              >
                <Text className={isDarkMode ? 'text-white' : 'text-coal-black'}>
                  {accountInfo.dateOfBirth.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('gender')}</Text>
              <View className={`rounded-lg ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              } ${!isEditing && 'opacity-50'}`}>
                <Picker
                  enabled={isEditing}
                  selectedValue={accountInfo.gender}
                  onValueChange={value => setAccountInfo({...accountInfo, gender: value})}
                  style={{ color: isDarkMode ? '#fff' : '#000' }}
                >
                  <Picker.Item label={i18n.t('prefer_not_to_say')} value="prefer_not_to_say" />
                  <Picker.Item label={i18n.t('male')} value="male" />
                  <Picker.Item label={i18n.t('female')} value="female" />
                  <Picker.Item label={i18n.t('other')} value="other" />
                </Picker>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className={isDarkMode ? 'text-white' : 'text-coal-black'}>{i18n.t('receive_offers')}</Text>
              <Switch
                value={accountInfo.receiveOffers}
                onValueChange={(value) => {
                  if (isEditing) {
                    setAccountInfo({...accountInfo, receiveOffers: value});
                  }
                }}
                disabled={!isEditing}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className={isDarkMode ? 'text-white' : 'text-coal-black'}>{i18n.t('newsletter')}</Text>
              <Switch
                value={accountInfo.newsletter}
                onValueChange={(value) => {
                  if (isEditing) {
                    setAccountInfo({...accountInfo, newsletter: value});
                  }
                }}
                disabled={!isEditing}
              />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              disabled={!isEditing}
              className={`py-3 rounded-lg ${
                isEditing 
                  ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                  : 'bg-gray-400'
              }`}
            >
              <Text className="text-white text-center font-semibold">
                {i18n.t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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