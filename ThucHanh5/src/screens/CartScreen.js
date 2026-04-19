import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { initialCartData } from '../data/cartData';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartData);

  // Hàm tăng số lượng
  const increaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Hàm giảm số lượng (không cho giảm dưới 1)
  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Hàm xóa sản phẩm
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <View style={styles.nameRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        
        <View style={styles.priceRow}>
          {/* Cụm nút Tăng/Giảm số lượng */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={() => decreaseQty(item.id)}>
              <Ionicons name="remove" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={() => increaseQty(item.id)}>
              <Ionicons name="add" size={20} color="#53B175" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList 
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${totalAmount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  cartItem: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemDetails: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemUnit: { fontSize: 14, color: '#7C7C7C', marginBottom: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { width: 40, height: 40, borderRadius: 15, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 16, fontWeight: '600', marginHorizontal: 15, color: '#181725' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  separator: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  checkoutContainer: { position: 'absolute', bottom: 100, left: 20, right: 20 },
  checkoutButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: '600', flex: 1, textAlign: 'center' },
  totalBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, position: 'absolute', right: 20 },
  totalBadgeText: { color: '#FFF', fontSize: 14, fontWeight: '600' }
});

export default CartScreen;