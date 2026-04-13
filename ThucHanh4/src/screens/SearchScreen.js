import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DATA TỔNG ĐÃ NÂNG CẤP ---
// Thêm itemCategory và brand để test chức năng lọc
const allProducts = [
  { id: '1', name: 'Egg Chicken Red', unit: '4pcs, Price', price: '$1.99', itemCategory: 'Eggs', brand: 'Individual Collection', image: require('../../assets/images/EggChickenRed.png') },
  { id: '2', name: 'Egg Chicken White', unit: '180g, Price', price: '$1.50', itemCategory: 'Eggs', brand: 'Kazi Farmas', image: require('../../assets/images/EggChickenWhite.png') },
  { id: '3', name: 'Egg Pasta', unit: '30gm, Price', price: '$15.99', itemCategory: 'Noodles & Pasta', brand: 'Cocola', image: require('../../assets/images/Apple.png') }, 
  { id: '4', name: 'Egg Noodles', unit: '2L, Price', price: '$15.99', itemCategory: 'Noodles & Pasta', brand: 'Cocola', image: require('../../assets/images/EggNoodles.png') },
  { id: '5', name: 'Mayonnais Eggless', unit: '325ml, Price', price: '$4.99', itemCategory: 'Fast Food', brand: 'Ifad', image: require('../../assets/images/Apple.png') },
];

const SearchScreen = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  // State lưu bộ lọc hiện tại
  const [activeFilters, setActiveFilters] = useState({ categories: [], brands: [] });

  // Nhận dữ liệu bộ lọc từ FilterScreen truyền về
  useEffect(() => {
    if (route.params?.appliedFilters) {
      setActiveFilters(route.params.appliedFilters);
    }
  }, [route.params?.appliedFilters]);

  useEffect(() => {
    let result = allProducts;

    // 1. Lọc theo chữ (Search text)
    if (searchText) {
      result = result.filter(item => item.name.toUpperCase().includes(searchText.toUpperCase()));
    }

    // 2. Lọc theo Danh mục (Categories)
    if (activeFilters.categories.length > 0) {
      result = result.filter(item => activeFilters.categories.includes(item.itemCategory));
    }

    // 3. Lọc theo Thương hiệu (Brand)
    if (activeFilters.brands.length > 0) {
      result = result.filter(item => activeFilters.brands.includes(item.brand));
    }

    // Nếu không gõ gì và không có filter nào thì hiện trống (hoặc bạn có thể cho hiện tất cả tùy ý)
    if (!searchText && activeFilters.categories.length === 0 && activeFilters.brands.length === 0) {
      setFilteredResults([]);
    } else {
      setFilteredResults(result);
    }
  }, [searchText, activeFilters]);

  const clearSearch = () => {
    setSearchText('');
    Keyboard.dismiss();
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.8} onPress={() => navigation.navigate('ProductDetail')}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productUnit}>{item.unit}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Đếm số lượng filter đang áp dụng để hiển thị chấm xanh (nếu muốn)
  const isFilterActive = activeFilters.categories.length > 0 || activeFilters.brands.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Store" 
            placeholderTextColor="#7C7C7C" 
            autoFocus={true} 
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>

        {/* NÚT BẤM SANG MÀN HÌNH FILTER */}
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter', { currentFilters: activeFilters })}
        >
          <Ionicons name="options-outline" size={28} color={isFilterActive ? "#53B175" : "#181725"} />
          {isFilterActive && <View style={styles.activeDot} />}
        </TouchableOpacity>
      </View>

      {/* GRID KẾT QUẢ TÌM KIẾM */}
      {filteredResults.length > 0 ? (
        <FlatList 
          data={filteredResults}
          keyExtractor={item => item.id}
          renderItem={renderProductCard}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.rowWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50, marginRight: 15 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  filterButton: { padding: 5, position: 'relative' },
  activeDot: { position: 'absolute', top: 5, right: 3, width: 8, height: 8, borderRadius: 4, backgroundColor: '#53B175' }, // Chấm xanh báo có filter
  gridContent: { paddingHorizontal: 20, paddingBottom: 110 }, 
  rowWrapper: { justifyContent: 'space-between', marginBottom: 15 },
  productCard: { flex: 1, marginHorizontal: 5, height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, backgroundColor: '#FFF' },
  productImage: { width: '100%', height: 80, marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productUnit: { fontSize: 14, color: '#7C7C7C', marginBottom: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { width: 45, height: 45, backgroundColor: '#53B175', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7C7C7C', fontWeight: '600' }
});

export default SearchScreen;