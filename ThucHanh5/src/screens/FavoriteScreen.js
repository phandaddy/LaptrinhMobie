import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { favoriteItems } from '../data/favoriteData';

const FavoriteScreen = () => {
  const renderFavItem = ({ item }) => (
    <TouchableOpacity style={styles.favItem} activeOpacity={0.7}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Ionicons name="chevron-forward" size={24} color="#181725" style={styles.chevron} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorurite</Text>
      </View>

      <FlatList 
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={renderFavItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addAllButton} activeOpacity={0.8}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  favItem: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  itemImage: { width: 55, height: 55, marginRight: 20 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  itemUnit: { fontSize: 14, color: '#7C7C7C' },
  rightContent: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginRight: 10 },
  chevron: { opacity: 0.5 },
  separator: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  buttonContainer: { position: 'absolute', bottom: 100, left: 20, right: 20 },
  addAllButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  addAllText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default FavoriteScreen;