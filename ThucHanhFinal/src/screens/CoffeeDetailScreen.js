import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const TAG_ICONS = ['👥', '🌿', '🎁'];
const SIZES = ['S', 'M', 'L'];

const CoffeeDetailScreen = ({ navigation, route }) => {
  // Dữ liệu mẫu — thay bằng route.params?.coffee nếu truyền từ màn hình khác
  const coffee = route?.params?.coffee ?? {
    name: 'Caffe Mocha',
    type: 'Ice/Hot',
    rating: 4.8,
    reviewCount: 230,
    price: 4.53,
    description:
      'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk. The foam on top is made by steaming and frothing fresh milk. It is one of the most popular coffee drinks in the world.',
    /*
      =====================================================
      TODO: Thay đường dẫn ảnh sản phẩm tại đây
      Ví dụ: image: require('../assets/images/caffe_mocha.jpg')
      =====================================================
    */
    image: require('../../assets/images/coffee1.jpg'),
  };

  const [selectedSize, setSelectedSize] = useState('M');
  const [isFavorite, setIsFavorite] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const priceBySize = {
    S: (coffee.price - 0.5).toFixed(2),
    M: coffee.price.toFixed(2),
    L: (coffee.price + 0.7).toFixed(2),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F2EC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail</Text>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => setIsFavorite(v => !v)}
          activeOpacity={0.7}
        >
          <Text style={[styles.heartIcon, isFavorite && styles.heartIconActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Coffee Image
          =====================================================
          TODO: Thay ảnh tại đây
          source={require('../assets/images/caffe_mocha.jpg')}
          hoặc source={{ uri: coffee.image }}
          =====================================================
        */}
        <Image
          source={require('../../assets/images/coffee1.jpg')}
          style={styles.coffeeImage}
          resizeMode="cover"
        />

        <Animated.View
          style={[
            styles.infoContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideUp }] },
          ]}
        >
          {/* Name + Tags */}
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <Text style={styles.coffeeType}>{coffee.type}</Text>
            </View>
            <View style={styles.tagRow}>
              {TAG_ICONS.map((icon, i) => (
                <View key={i} style={styles.tagIcon}>
                  <Text style={styles.tagIconText}>{icon}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{coffee.rating}</Text>
            <Text style={styles.reviewCount}>({coffee.reviewCount})</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description} numberOfLines={readMore ? undefined : 3}>
            {coffee.description}
          </Text>
          <TouchableOpacity onPress={() => setReadMore(v => !v)}>
            <Text style={styles.readMore}>{readMore ? 'Show Less' : 'Read More'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {SIZES.map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBtn, selectedSize === size && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.8}
              >
                <Text style={[styles.sizeBtnText, selectedSize === size && styles.sizeBtnTextActive]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Buy Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {priceBySize[selectedSize]}</Text>
        </View>
        <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2EC',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: '#F9F2EC',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2F2D2C',
  },
  backIcon: {
    fontSize: 24,
    color: '#2F2D2C',
    lineHeight: 26,
  },
  heartIcon: {
    fontSize: 20,
    color: '#aaa',
  },
  heartIconActive: {
    color: '#C67C4E',
  },

  // Image
  coffeeImage: {
    width: width,
    height: width * 0.68,
    backgroundColor: '#e0d0c0',
  },

  // Info
  infoContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 110,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  coffeeName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2F2D2C',
  },
  coffeeType: {
    fontSize: 13,
    color: '#9B9B9B',
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  tagIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF5EE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0E0D0',
  },
  tagIconText: {
    fontSize: 16,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starIcon: {
    fontSize: 16,
    color: '#FBBE21',
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2F2D2C',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 13,
    color: '#9B9B9B',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDE0D4',
    marginVertical: 16,
  },

  // Description
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F2D2C',
    marginBottom: 8,
  },
  description: {
    fontSize: 13.5,
    color: '#6B6B6B',
    lineHeight: 22,
  },
  readMore: {
    color: '#C67C4E',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 4,
  },

  // Size
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  sizeBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0D0C0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sizeBtnActive: {
    borderColor: '#C67C4E',
    backgroundColor: '#FFF5EE',
  },
  sizeBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9B9B9B',
  },
  sizeBtnTextActive: {
    color: '#C67C4E',
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#C67C4E',
  },
  buyBtn: {
    backgroundColor: '#C67C4E',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 52,
    shadowColor: '#C67C4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CoffeeDetailScreen;
