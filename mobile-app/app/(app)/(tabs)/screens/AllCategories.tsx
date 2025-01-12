import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Category from '@/shared/components/Category';
import { AllCategories as CategoryList } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CategoryProps {
  title: string;
  image: any;
}

type RootStackParamList = {
  category: { name: string };
};

export default function AllCategories() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCategoryPress = (category: CategoryProps) => {
    navigation.navigate('category', { name: category.title });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="flex flex-row flex-wrap justify-between">
            {CategoryList.map((category: CategoryProps, index: number) => (
              <Category
                key={index}
                title={category.title}
                image={category.image}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
}); 