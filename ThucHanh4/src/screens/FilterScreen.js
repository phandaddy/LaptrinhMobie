import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Danh sách dữ liệu bộ lọc mẫu
const FILTER_CATEGORIES = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
const FILTER_BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

const FilterScreen = ({ navigation, route }) => {
  // Lấy các filter đã chọn từ trước (nếu có) do màn Search truyền sang
  const existingFilters = route.params?.currentFilters || { categories: [], brands: [] };

  const [selectedCategories, setSelectedCategories] = useState(existingFilters.categories);
  const [selectedBrands, setSelectedBrands] = useState(existingFilters.brands);

  // Hàm toggle (bật/tắt) chọn Category
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Hàm toggle (bật/tắt) chọn Brand
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Hàm gửi kết quả lọc về lại màn hình Search
  const applyFilters = () => {
    navigation.navigate({
      name: 'Search',
      params: { 
        appliedFilters: { 
          categories: selectedCategories, 
          brands: selectedBrands 
        } 
      },
      merge: true, // Gộp params mới vào màn hình Search đang mở
    });
  };

  // Component Checkbox tùy chỉnh
  const CustomCheckbox = ({ label, isChecked, onPress }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, isChecked && styles.checkboxSelected]}>
        {isChecked && <Ionicons name="checkmark" size={18} color="#FFF" />}
      </View>
      <Text style={[styles.checkboxLabel, isChecked && styles.checkboxLabelSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="close" size={30} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 30 }} /> {/* Spacer để cân bằng Header */}
      </View>

      {/* BACKGROUND BO GÓC TRẮNG BÊN DƯỚI */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Mục CATEGORIES */}
          <Text style={styles.sectionTitle}>Categories</Text>
          {FILTER_CATEGORIES.map((cat, index) => (
            <CustomCheckbox 
              key={index} 
              label={cat} 
              isChecked={selectedCategories.includes(cat)} 
              onPress={() => toggleCategory(cat)} 
            />
          ))}

          {/* Mục BRAND */}
          <Text style={styles.sectionTitle}>Brand</Text>
          {FILTER_BRANDS.map((brand, index) => (
            <CustomCheckbox 
              key={index} 
              label={brand} 
              isChecked={selectedBrands.includes(brand)} 
              onPress={() => toggleBrand(brand)} 
            />
          ))}
        </ScrollView>

        {/* NÚT APPLY FILTER */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters} activeOpacity={0.8}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F2' }, // Nền xám nhạt ở trên
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, height: 60 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  contentContainer: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 25, 
    paddingTop: 30 
  },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725', marginBottom: 20, marginTop: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { 
    width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  checkboxSelected: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  checkboxLabelSelected: { color: '#53B175' },
  bottomButtonContainer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#FFF', paddingHorizontal: 25, paddingVertical: 20, 
    borderTopLeftRadius: 30, borderTopRightRadius: 30 
  },
  applyButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});

export default FilterScreen;