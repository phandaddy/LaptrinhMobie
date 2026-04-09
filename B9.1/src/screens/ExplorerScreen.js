import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Image,
  SafeAreaView, FlatList,
} from 'react-native';

const ORANGE = '#FFA500';

// Dữ liệu mẫu
const CATEGORIES = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200',
  },
  {
    id: '2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
  },
  {
    id: '3',
    name: 'Steak',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200',
  },
];

const POPULAR = [
  {
    id: '1',
    name: 'Food 1',
    origin: 'By Viet Nam',
    price: '1$',
    image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?w=400',
  },
  {
    id: '2',
    name: 'Food 2',
    origin: 'By Korea',
    price: '3$',
    image: 'https://images.unsplash.com/photo-1583224994049-80b48fe17d2e?w=400',
  },
  {
    id: '3',
    name: 'Food 3',
    origin: 'By Japan',
    price: '5$',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400',
  },
  {
    id: '4',
    name: 'Food 4',
    origin: 'By Italy',
    price: '4$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
  },
];

export default function ExplorerScreen() {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tiêu đề lớn */}
        <Text style={styles.mainTitle}>Explorer</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>📍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for meals or area"
            placeholderTextColor="#AAAAAA"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity>
            <Text style={styles.searchBtn}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Top Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Filter</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={CATEGORIES}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Popular Items */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularGrid}>
          {POPULAR.map((item) => (
            <TouchableOpacity key={item.id} style={styles.popularCard} activeOpacity={0.85}>
              <Image source={{ uri: item.image }} style={styles.popularImage} />
              <View style={styles.popularInfo}>
                <Text style={styles.popularName}>{item.name}</Text>
                <Text style={styles.popularOrigin}>{item.origin}</Text>
                <Text style={styles.popularPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 24,
    gap: 8,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A1A' },
  searchBtn: { fontSize: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  sectionAction: { fontSize: 14, color: ORANGE, fontWeight: '600' },
  categoryList: { paddingHorizontal: 20, gap: 14, marginBottom: 28 },
  categoryItem: { alignItems: 'center', width: 100 },
  categoryImage: {
    width: 100,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#EEE',
    marginBottom: 8,
  },
  categoryName: { fontSize: 13, fontWeight: '500', color: '#1A1A1A' },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  popularCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  popularImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#EEE',
  },
  popularInfo: { padding: 10 },
  popularName: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A' },
  popularOrigin: { fontSize: 12, color: '#888', marginVertical: 3 },
  popularPrice: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
});