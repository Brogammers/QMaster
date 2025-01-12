import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '@/shared/components/Category';
import { AllCategories as CategoryList } from '@/constants';
import { useRouter } from 'expo-router';

interface CategoryProps {
  title: string;
  image: any;
}

export default function AllCategories() {
  const router = useRouter();

  const handleCategoryPress = (category: CategoryProps) => {
    router.push(`/(app)/(tabs)/screens/category/${encodeURIComponent(category.title)}`);
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