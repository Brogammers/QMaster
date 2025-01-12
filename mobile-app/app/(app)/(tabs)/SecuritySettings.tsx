import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useLinkTo } from "@react-navigation/native";
import { Formik } from 'formik';
import * as Yup from 'yup';

const PasswordChangeSchema = Yup.object().shape({
  currentEmail: Yup.string()
    .email(i18n.t('invalid_email'))
    .required(i18n.t('required')),
  currentPassword: Yup.string()
    .required(i18n.t('required')),
  newPassword: Yup.string()
    .min(8, i18n.t('password_min_length'))
    .matches(/[a-z]/, i18n.t('password_lowercase'))
    .matches(/[A-Z]/, i18n.t('password_uppercase'))
    .matches(/[0-9]/, i18n.t('password_number'))
    .matches(/[^a-zA-Z0-9]/, i18n.t('password_special'))
    .required(i18n.t('required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], i18n.t('passwords_must_match'))
    .required(i18n.t('required')),
});

export default function SecuritySettings() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();

  const handleReturn = () => {
    linkTo("/Settings");
  }

  const handlePasswordChange = async (values: any) => {
    // TODO: Implement password change with validated values
    console.log(values);
  };

  return (
    <>
      <View className="absolute top-4 left-4 z-10">
        <TouchableOpacity onPress={() => handleReturn()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
        <LinearGradient
          colors={['#17222D', '#13404D']}
          className="pt-14 pb-4 px-5"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-white">
              {i18n.t('security')}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="space-y-6 mt-4 pb-6"
          >
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}
            >
              <Text className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t('change_password')}
              </Text>
              <Formik
                initialValues={{
                  currentEmail: '',
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={PasswordChangeSchema}
                onSubmit={handlePasswordChange}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View className="space-y-4">
                    <View>
                      <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                        {i18n.t('current_email')}
                      </Text>
                      <TextInput 
                        value={values.currentEmail}
                        onChangeText={handleChange('currentEmail')}
                        onBlur={handleBlur('currentEmail')}
                        keyboardType="email-address"
                        className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                      />
                      {touched.currentEmail && errors.currentEmail && (
                        <Text className="text-red-500 text-sm mt-1">{errors.currentEmail}</Text>
                      )}
                    </View>

                    <View>
                      <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                        {i18n.t('current_password')}
                      </Text>
                      <TextInput 
                        value={values.currentPassword}
                        onChangeText={handleChange('currentPassword')}
                        onBlur={handleBlur('currentPassword')}
                        secureTextEntry
                        className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                      />
                      {touched.currentPassword && errors.currentPassword && (
                        <Text className="text-red-500 text-sm mt-1">{errors.currentPassword}</Text>
                      )}
                    </View>

                    <View>
                      <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                        {i18n.t('new_password')}
                      </Text>
                      <TextInput 
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        secureTextEntry
                        className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                      />
                      {touched.newPassword && errors.newPassword && (
                        <Text className="text-red-500 text-sm mt-1">{errors.newPassword}</Text>
                      )}
                    </View>

                    <View>
                      <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                        {i18n.t('confirm_password')}
                      </Text>
                      <TextInput 
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        secureTextEntry
                        className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className={`py-3.5 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
                    >
                      <Text className="text-white text-center font-semibold">
                        {i18n.t('submit')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </MotiView>
          </MotiView>
        </ScrollView>
      </View>
    </>
  );
} 