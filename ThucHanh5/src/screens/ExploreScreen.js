import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DỮ LIỆU CÁC DANH MỤC ---
const exploreCategories = [
  { 
    id: '1', 
    name: 'Frash Fruits\n& Vegetable', 
    image: require('../../assets/images/FrashFruitsVegatable.png'), 
    backgroundColor: '#EEF8F2', 
    borderColor: '#53B175'      
  },
  { 
    id: '2', 
    name: 'Cooking Oil\n& Ghee', 
    image: require('../../assets/images/CookingOilGhee.png'), 
    backgroundColor: '#FFF6EE', 
    borderColor: '#F8A44C'      
  },
  { 
    id: '3', 
    name: 'Meat & Fish', 
    image: require('../../assets/images/MeatFish.png'),
    backgroundColor: '#FDEAEB', 
    borderColor: '#F7A593'      
  },
  { 
    id: '4', 
    name: 'Bakery & Snacks', 
    image: require('../../assets/images/BakerySnack.png'), 
    backgroundColor: '#F4EBF7', 
    borderColor: '#D3B0E0'      
  },
  { 
    id: '5', 
    name: 'Dairy & Eggs', 
    image: require('../../assets/images/DairyEgg.png'), 
    backgroundColor: '#FFFCEB', 
    borderColor: '#FDE598'      
  },
  { 
    id: '6', 
    name: 'Beverages', 
    image: require('../../assets/images/Beverages.png'), 
    backgroundColor: '#EDF7FC', 
    borderColor: '#B7DFF5'      
  },
];

const ExploreScreen = ({ navigation }) => {

  // Component render từng thẻ danh mục
  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.cardContainer, 
        { 
          backgroundColor: item.backgroundColor, 
          borderColor: item.borderColor 
        }
      ]}
      activeOpacity={0.7}
      // 🔥 GẮN LINK 1: Bấm vào thẻ để sang CategoryDetail, truyền kèm tên danh mục
      onPress={() => navigation.navigate('Category', { categoryName: item.name })}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: Tiêu đề */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Find Products</Text>
      </View>

      {/* 🔥 GẮN LINK 2: SEARCH BAR CHUYỂN THÀNH NÚT BẤM SANG MÀN SEARCH */}
      <TouchableOpacity 
        style={styles.searchContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search')}
      >
        <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
        <Text style={[styles.searchInput, { color: '#7C7C7C' }]}>Search Store</Text>
      </TouchableOpacity>

      {/* DANH SÁCH DẠNG LƯỚI (GRID) */}
      <FlatList
        data={exploreCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryCard}
        numColumns={2} // Chia làm 2 cột
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.rowWrapper} // Khoảng cách giữa 2 cột
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, 
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 5,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  cardImage: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    lineHeight: 22,
  }
});

export default ExploreScreen;