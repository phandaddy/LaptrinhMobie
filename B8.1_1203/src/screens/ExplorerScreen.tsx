import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

const ExplorerScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explorer</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>📍</Text>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search for meals or area" 
            placeholderTextColor="#999"
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Top Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <TouchableOpacity>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
        >
          {/* Pizza */}
          <View style={styles.categoryItem}>
            <Image source={require('../../assets/pizza.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Pizza</Text>
          </View>
          {/* Burgers */}
          <View style={styles.categoryItem}>
            <Image source={require('../../assets/burger.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Burgers</Text>
          </View>
          {/* Phở (Thay cho Steak trong hình mẫu) */}
          <View style={styles.categoryItem}>
            <Image source={require('../../assets/pho.jpg')} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Phở</Text>
          </View>
        </ScrollView>

        {/* Popular Items */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularContainer}>
          {/* Item 1 */}
          <View style={styles.popularCard}>
            <Image source={require('../../assets/pizza.jpg')} style={styles.popularImage} />
            <View style={styles.popularInfo}>
              <Text style={styles.popularTitle}>Food 1</Text>
              <Text style={styles.popularSub}>By Viet Nam</Text>
              <Text style={styles.popularPrice}>1$</Text>
            </View>
          </View>
          
          {/* Item 2 */}
          <View style={styles.popularCard}>
            <Image source={require('../../assets/pho.jpg')} style={styles.popularImage} />
            <View style={styles.popularInfo}>
              <Text style={styles.popularTitle}>Food 2</Text>
              <Text style={styles.popularSub}>By Viet Nam</Text>
              <Text style={styles.popularPrice}>3$</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  searchIcon: {
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  filterText: {
    color: '#FFA500', 
    fontWeight: '600',
  },
  viewAllText: {
    color: '#FFA500',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  popularCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  popularImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  popularInfo: {
    justifyContent: 'center',
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  popularSub: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  popularPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ExplorerScreen;