import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// Expo có sẵn bộ icon này
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

// Data giả lập cho Danh mục
const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano'];

// Data giả lập cho Cà phê
const coffees = [
  {
    id: '1',
    name: 'Caffe Mocha',
    type: 'Deep Foam',
    price: '4.53',
    rating: '4.8',
    image: require('../../assets/images/coffee1.jpg'),
  },
  {
    id: '2',
    name: 'Flat White',
    type: 'Espresso',
    price: '3.53',
    rating: '4.8',
    image: require('../../assets/images/coffee2.jpg'),
  },
  {
    id: '3',
    name: 'Cappuccino',
    type: 'Milk',
    price: '4.00',
    rating: '4.9',
    image: require('../../assets/images/coffee3.jpg'),
  },
  {
    id: '4',
    name: 'Americano',
    type: 'Black',
    price: '2.50',
    rating: '4.5',
    image: require('../../assets/images/coffee4.jpg'),
  },
];

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All Coffee');

  // Component render từng thẻ cà phê
  const renderCoffeeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.coffeeCard} 
      onPress={() => navigation.navigate('CoffeeDetail')}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image } style={styles.coffeeImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#D4AF37" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeeType}>{item.type}</Text>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>$ {item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* === PHẦN NỀN TỐI (HEADER) === */}
        <View style={styles.headerBackground}>
          {/* Vị trí */}
          <View style={styles.locationSection}>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationSelector}>
              <Text style={styles.locationValue}>Bilzen, Tanjungbalai</Text>
              <Ionicons name="chevron-down" size={16} color="#FFF" />
            </View>
          </View>

          {/* Thanh tìm kiếm */}
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#A9A9A9" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search coffee"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* === PHẦN NỘI DUNG (Sáng) === */}
        <View style={styles.mainContent}>
          
          {/* Banner Promo - Đẩy lên trên một chút để đè lên nền tối giống design */}
          <View style={styles.promoBanner}>
            <Image 
              source={require('../../assets/images/template.jpg') }
              style={styles.promoImage} 
            />
            <View style={styles.promoTextContainer}>
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>Promo</Text>
              </View>
              <Text style={styles.promoTitle}>Buy one get{'\n'}one FREE</Text>
            </View>
          </View>

          {/* Danh mục (Categories) */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryScroll}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {categories.map((cat, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.categoryBadge, activeCategory === cat && styles.activeCategoryBadge]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Lưới sản phẩm */}
          <View style={styles.gridContainer}>
            <FlatList
              data={coffees}
              renderItem={renderCoffeeItem}
              keyExtractor={item => item.id}
              numColumns={2} // Chia 2 cột
              scrollEnabled={false} // Tắt cuộn của FlatList vì đã có ScrollView bọc ngoài
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          </View>
        </View>
      </ScrollView>

      {/* === THANH ĐIỀU HƯỚNG DƯỚI CÙNG (Bottom Nav giả lập) === */}
      {/* Lưu ý: Thực tế khi dùng react-navigation, phần này sẽ cấu hình trong Tab Navigator chứ không code cứng ở màn hình */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#C67C4E" />
        <Ionicons name="heart-outline" size={24} color="#A9A9A9" />
        <Ionicons name="bag-handle-outline" size={24} color="#A9A9A9" />
        <Ionicons name="notifications-outline" size={24} color="#A9A9A9" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerBackground: {
    backgroundColor: '#1E1E1E', // Màu đen xám của design
    paddingTop: 60, // Né tai thỏ/status bar
    paddingHorizontal: 20,
    paddingBottom: 70, // Để chừa khoảng trống cho banner đè lên
  },
  locationSection: {
    marginBottom: 20,
  },
  locationLabel: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313131',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#C67C4E',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
  },
  promoBanner: {
    marginHorizontal: 20,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: -50, // Kéo ngược lên để đè lên phần nền đen
  },
  promoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promoTextContainer: {
    padding: 15,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', // Lớp phủ mờ xíu cho dễ đọc chữ
  },
  promoBadge: {
    backgroundColor: '#ED5151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  promoBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 35,
    // Viền đen mỏng cho chữ (hack text shadow)
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  categoryScroll: {
    marginTop: 20,
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  activeCategoryBadge: {
    backgroundColor: '#C67C4E',
  },
  categoryText: {
    color: '#2F2D2C',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Chừa chỗ cho thanh Bottom Nav
  },
  coffeeCard: {
    width: (width - 60) / 2, // Tính toán chiều rộng: Tổng màn hình - padding 2 bên (40) - khoảng cách giữa 2 thẻ (20)
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    // Đổ bóng (Shadow)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  coffeeImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2D2C',
  },
  coffeeType: {
    fontSize: 12,
    color: '#9B9B9B',
    marginTop: 2,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2D2C',
  },
  addButton: {
    backgroundColor: '#C67C4E',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Cho iPhone tai thỏ
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // Đổ bóng cho Bottom Nav
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  }
});