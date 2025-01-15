import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Pressable, Platform, Dimensions, I18nManager } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneInput from 'react-native-phone-input';
import { countries } from '@/constants';
import TextButton from '@/shared/components/TextButton';
import i18n from '@/i18n';
import { isValidPhoneNumber } from 'libphonenumber-js';

const window = Dimensions.get('window');

const GoogleUserDetailsSchema = Yup.object().shape({
  dateOfBirth: Yup.date()
    .nullable()
    .required('Date of birth is required'),
  phoneNumber: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', (value) => {
      return isValidPhoneNumber(value || '');
    })
    .required('Phone number required'),
  countryOfOrigin: Yup.string().required('Country of origin required'),
});

interface GoogleUserDetailsProps {
  onSubmit: (values: any) => void;
  initialEmail: string;
  initialFirstName: string;
  initialLastName: string;
}

export default function GoogleUserDetails({ onSubmit, initialEmail, initialFirstName, initialLastName }: GoogleUserDetailsProps) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const windowWidth = window.width * 0.7;

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const confirmDateIOS = (setFieldValue: any) => () => {
    const formattedDate = formatDate(date);
    setDisplayDate(formattedDate);
    setFieldValue('dateOfBirth', date);
    toggleDatePicker();
  };

  const formatDate = (rawDate: Date) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const onDateChange = (setFieldValue: any) => ({ type }: any, dateOfBirth: Date | undefined) => {
    if (type === 'set' && dateOfBirth) {
      const currentDate = dateOfBirth;
      setDate(currentDate);
      const formattedDate = formatDate(currentDate);
      setDisplayDate(formattedDate);
      setFieldValue('dateOfBirth', currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      scrollEnabled={isScrollEnabled}
      nestedScrollEnabled={true}
    >
      <Formik
        initialValues={{
          email: initialEmail,
          firstName: initialFirstName,
          lastName: initialLastName,
          dateOfBirth: '',
          countryOfOrigin: '',
          phoneNumber: '',
        }}
        validationSchema={GoogleUserDetailsSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, touched, errors, isValid }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { backgroundColor: '#EFEFEF' }]}
              value={values.email}
              editable={false}
            />
            <TextInput
              style={[styles.input, { backgroundColor: '#EFEFEF' }]}
              value={values.firstName}
              editable={false}
            />
            <TextInput
              style={[styles.input, { backgroundColor: '#EFEFEF' }]}
              value={values.lastName}
              editable={false}
            />

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onDateChange(setFieldValue)}
                style={styles.datePicker}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 1, 1)}
              />
            )}

            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('signupPage.dateOfBirth')}
                  placeholderTextColor={'#515151'}
                  value={displayDate}
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
            )}

            <View style={{ zIndex: 1000 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={countries}
                setOpen={(isOpen) => {
                  setOpen(isOpen);
                  setIsScrollEnabled(!isOpen);
                }}
                setValue={setValue}
                onChangeValue={(value) => {
                  handleChange('countryOfOrigin')(value || '');
                  setFieldValue('countryOfOrigin', value || '');
                }}
                style={styles.dropDownPicker}
                dropDownDirection="TOP"
                placeholder={i18n.t('signupPage.country')}
                textStyle={{
                  color: '#515151',
                  fontSize: 16,
                  fontFamily: 'JostBold',
                }}
              />
            </View>

            <PhoneInput
              style={styles.input}
              onChangePhoneNumber={(value) => {
                handleChange('phoneNumber')(value || '');
                setFieldValue('phoneNumber', value || '');
              }}
              initialValue={values.phoneNumber}
            />

            <View style={{ marginTop: 20 }}>
              <TextButton
                text={i18n.t('continue')}
                buttonColor={!isValid ? '#C5C5C5' : '#1DCDFE'}
                textColor={'white'}
                onPress={handleSubmit}
                disabled={!isValid}
                width={windowWidth}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  input: {
    backgroundColor: '#DFDFDF',
    color: '#515151',
    fontSize: 16,
    fontFamily: 'JostBold',
    borderRadius: 42,
    height: 56,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: window.width * 0.75,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  dropDownPicker: {
    backgroundColor: '#DFDFDF',
    borderRadius: 42,
    height: 56,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: window.width * 0.75,
  },
}); 