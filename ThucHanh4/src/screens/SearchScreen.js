import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  TextInput,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DATA TỔNG (Kho hàng giả lập của bạn) ---
// Mình thêm vài sản phẩm không phải "Egg" để bạn test tính năng lọc cho rõ nhé
const allProducts = [
  { id: '1', name: 'Egg Chicken Red', unit: '4pcs, Price', price: '$1.99', image: require('../../assets/images/EggChickenRed.png') },
  { id: '2', name: 'Egg Chicken White', unit: '180g, Price', price: '$1.50', image: require('../../assets/images/EggChickenWhite.png') },
  { id: '3', name: 'Egg Pasta', unit: '30gm, Price', price: '$15.99', image: require('../../assets/images/Apple.png') }, 
  { id: '4', name: 'Egg Noodles', unit: '2L, Price', price: '$15.99', image: require('../../assets/images/EggNoodles.png') },
  { id: '5', name: 'Mayonnais Eggless', unit: '325ml, Price', price: '$4.99', image: require('../../assets/images/Apple.png') },
  { id: '6', name: 'Diet Coke', unit: '355ml, Price', price: '$1.99', image: require('../../assets/images/DietCoke.png') },
  { id: '7', name: 'Red Apple', unit: '1kg, Price', price: '$4.99', image: require('../../assets/images/Apple.png') },
];

const SearchScreen = ({ navigation }) => {
  // State lưu từ khóa tìm kiếm
  const [searchText, setSearchText] = useState('');
  
  // State lưu danh sách sản phẩm hiển thị trên màn hình (Ban đầu rỗng hoặc hiển thị tất cả)
  // Trong UI mẫu, khi vào đã gõ sẵn chữ "Egg", mình sẽ khởi tạo mặc định là rỗng
  const [filteredResults, setFilteredResults] = useState([]); 

  // 🔥 HÀM XỬ LÝ TÌM KIẾM
  const handleSearch = (text) => {
    setSearchText(text); // Cập nhật chữ trong ô input
    
    if (text) {
      // Nếu có nhập chữ, tiến hành lọc data
      const newData = allProducts.filter((item) => {
        // Chuyển cả tên sản phẩm và từ khóa về chữ in hoa để so sánh không phân biệt hoa/thường
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        
        // Nếu tên sản phẩm chứa từ khóa thì trả về true (giữ lại)
        return itemData.indexOf(textData) > -1;
      });
      setFilteredResults(newData); // Cập nhật lại list hiển thị
    } else {
      // Nếu xóa hết chữ, hiển thị mảng rỗng (hoặc bạn có thể setFilteredResults(allProducts) để hiện tất cả)
      setFilteredResults([]); 
    }
  };

  // 🔥 HÀM XÓA TRẮNG Ô TÌM KIẾM
  const clearSearch = () => {
    setSearchText('');
    setFilteredResults([]);
    Keyboard.dismiss(); // Ẩn bàn phím
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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: THANH TÌM KIẾM CÓ NÚT XÓA VÀ NÚT FILTER */}
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181725" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            value={searchText}
            // Gọi hàm handleSearch mỗi khi người dùng gõ phím
            onChangeText={(text) => handleSearch(text)}
            placeholder="Search Store" 
            placeholderTextColor="#7C7C7C" 
            autoFocus={true} // Tự động bật bàn phím
          />
          {/* Chỉ hiện nút X khi có chữ trong ô tìm kiếm */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.filterButton}>
          <Ionicons name="options-outline" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* HIỂN THỊ KẾT QUẢ HOẶC THÔNG BÁO TRỐNG */}
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
          {searchText.length > 0 ? (
             <Text style={styles.emptyText}>No products found for "{searchText}"</Text>
          ) : (
             <Text style={styles.emptyText}>Type something to search!</Text>
          )}
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
  filterButton: { padding: 5 },
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