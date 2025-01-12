import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Category from '@/shared/components/CategoryPop';
import { AllCategories as CategoryList } from '@/constants';
import { useLinkTo } from '@react-navigation/native';

interface CategoryProps {
  title: string;
  image: any;
}

export default function AllCategories() {
  const linkTo = useLinkTo();

  const handleCategoryPress = (category: CategoryProps) => {
    linkTo(`/Category/${encodeURIComponent(category.title)}`);
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