import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// --- DỮ LIỆU MẪU
const exclusiveOffers = [
  { id: '1', name: 'Organic Bananas', unit: '7pcs, Priceg', price: '$4.99', image: require('../../assets/images/Banana.png') },
  { id: '2', name: 'Red Apple', unit: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/Apple.png') },
];

const bestSelling = [
  { id: '3', name: 'Bell Pepper Red', unit: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/BellPepper.png') },
  { id: '4', name: 'Ginger', unit: '250gm, Priceg', price: '$4.99', image: require('../../assets/images/Ginger.png') },
];

const groceryCategories = [
  { id: '1', name: 'Pulses', color: '#F8A44C', bg: '#FEE8E0', image: require('../../assets/images/Pulses.png') },
  { id: '2', name: 'Rice', color: '#53B175', bg: '#E5F6EE', image:  require('../../assets/images/Rice.png')},
];

const groceryProducts = [
  { id: '5', name: 'Beef Bone', unit: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/BeefBone.png') },
  { id: '6', name: 'Broiler Chicken', unit: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/BroilerChicken.png') },
];

// 🔥 BƯỚC 1: Truyền prop navigation vào HomeScreen
const HomeScreen = ({ navigation }) => {

  // --- COMPONENT: Tiêu đề từng mục ---
  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  // --- COMPONENT: Thẻ Sản phẩm ---
  const ProductCard = ({ item }) => (
    // 🔥 BƯỚC 2: Đổi View thành TouchableOpacity và thêm sự kiện onPress
    <TouchableOpacity 
      style={styles.productCard} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { product: item })} 
    >
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

  // --- COMPONENT: Thẻ Danh mục ---
  const CategoryCard = ({ item }) => (
    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.bg }]} activeOpacity={0.8}>
      <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.content}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Image 
              source={require('../../assets/images/Logo.png')}
              style={styles.logo} 
              resizeMode="contain"
            />
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-pin" size={24} color="#4C4F4D" />
              <Text style={styles.locationText}>Dhaka, Banassre</Text>
            </View>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Search Store" placeholderTextColor="#7C7C7C" />
          </View>

          {/* BANNER */}
          <View style={styles.bannerContainer}>
            <Image 
              source={require('../../assets/images/banner.png')} 
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>

          {/* CÁC DANH SÁCH SẢN PHẨM */}
          <SectionHeader title="Exclusive Offer" />
          <FlatList 
            data={exclusiveOffers} horizontal showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id} renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={styles.productList}
          />

          <SectionHeader title="Best Selling" />
          <FlatList 
            data={bestSelling} horizontal showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id} renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={styles.productList}
          />

          <SectionHeader title="Groceries" />
          <FlatList 
            data={groceryCategories} horizontal showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id} renderItem={({ item }) => <CategoryCard item={item} />}
            contentContainerStyle={styles.categoryList}
          />
          <FlatList 
            data={groceryProducts} horizontal showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id} renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={[styles.productList, { marginTop: 15 }]}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { paddingTop: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 35, height: 35, marginBottom: 8 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 18, color: '#4C4F4D', fontWeight: '600', marginLeft: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, marginHorizontal: 25, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  bannerContainer: { marginHorizontal: 25, marginBottom: 30, borderRadius: 15, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 115, borderRadius: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  seeAllText: { fontSize: 16, color: '#53B175', fontWeight: '600' },
  productList: { paddingLeft: 25, paddingRight: 10 },
  productCard: { width: 170, height: 240, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginRight: 15, backgroundColor: '#FFF' },
  productImage: { width: '100%', height: 80, marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productUnit: { fontSize: 14, color: '#7C7C7C', marginBottom: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { width: 45, height: 45, backgroundColor: '#53B175', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  categoryList: { paddingLeft: 25, paddingRight: 10 },
  categoryCard: { flexDirection: 'row', alignItems: 'center', width: 250, height: 100, borderRadius: 18, paddingHorizontal: 20, marginRight: 15 },
  categoryImage: { width: 70, height: 70, marginRight: 15 },
  categoryName: { fontSize: 20, fontWeight: 'bold', color: '#3E423F' }
});

export default HomeScreen;