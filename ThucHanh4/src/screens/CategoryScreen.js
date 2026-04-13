import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu mẫu (giả lập cho danh mục Beverages)
const categoryProducts = [
  { id: '1', name: 'Diet Coke', unit: '355ml, Price', price: '$1.99', image: require('../../assets/images/DietCoke.png') },
  { id: '2', name: 'Sprite Can', unit: '325ml, Price', price: '$1.50', image: require('../../assets/images/Apple.png') }, // Thay bằng ảnh Sprite nếu có
  { id: '3', name: 'Apple & Grape Juice', unit: '2L, Price', price: '$15.99', image: require('../../assets/images/Apple&GrapeJuice.png') },
  { id: '4', name: 'Orenge Juice', unit: '2L, Price', price: '$15.99', image: require('../../assets/images/Apple.png') },
  { id: '5', name: 'Coca Cola Can', unit: '325ml, Price', price: '$4.99', image: require('../../assets/images/Cocca.png') },
  { id: '6', name: 'Pepsi Can', unit: '330ml, Price', price: '$4.99', image: require('../../assets/images/Apple.png') },
];

const CategoryDetailScreen = ({ route, navigation }) => {
  // Nhận tên danh mục từ ExploreScreen truyền sang (mặc định là Beverages nếu không có)
  const categoryName = route.params?.categoryName || 'Beverages';

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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName.replace('\n', ' ')}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="options-outline" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* GRID SẢN PHẨM */}
      <FlatList 
        data={categoryProducts}
        keyExtractor={item => item.id}
        renderItem={renderProductCard}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.rowWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginTop: 10, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  gridContent: { paddingHorizontal: 20, paddingBottom: 30 },
  rowWrapper: { justifyContent: 'space-between', marginBottom: 15 },
  productCard: { flex: 1, marginHorizontal: 5, height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, backgroundColor: '#FFF' },
  productImage: { width: '100%', height: 80, marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productUnit: { fontSize: 14, color: '#7C7C7C', marginBottom: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { width: 45, height: 45, backgroundColor: '#53B175', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
});

export default CategoryDetailScreen;