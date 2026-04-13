import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

const ProductDetailScreen = ({ navigation }) => {
  // State quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);
  // State quản lý mở rộng/thu gọn mục Product Detail
  const [isDetailExpanded, setIsDetailExpanded] = useState(true);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* PHẦN ĐẦU TRANG: Nền xám nhạt bo góc chứa ảnh */}
        <View style={styles.imageBackgroundContainer}>
          {/* Header Actions (Back & Share) */}
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={28} color="#181725" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="share" size={24} color="#181725" />
            </TouchableOpacity>
          </View>

          {/* Ảnh sản phẩm (Dùng ảnh Apple local của bạn) */}
          <Image 
            source={require('../../assets/images/Apple.png')} 
            style={styles.productImage} 
            resizeMode="contain" 
          />

          {/* Dấu chấm chuyển ảnh (Pagination dots) */}
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* PHẦN NỘI DUNG CHÍNH */}
        <View style={styles.contentContainer}>
          
          {/* Tên SP & Nút Yêu thích */}
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>Naturel Red Apple</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <MaterialIcons name="favorite-border" size={28} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
          <Text style={styles.unitText}>1kg, Price</Text>

          {/* Cụm Số lượng & Giá */}
          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} activeOpacity={0.7}>
                <AntDesign name="minus" size={24} color={quantity > 1 ? "#B3B3B3" : "#E2E2E2"} />
              </TouchableOpacity>
              
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              
              <TouchableOpacity onPress={increaseQuantity} activeOpacity={0.7}>
                <AntDesign name="plus" size={24} color="#53B175" />
              </TouchableOpacity>
            </View>

            <Text style={styles.priceText}>$4.99</Text>
          </View>

          {/* Đường kẻ ngang */}
          <View style={styles.divider} />

          {/* MỤC 1: Product Detail (Gập/Mở được) */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            activeOpacity={0.7}
            onPress={() => setIsDetailExpanded(!isDetailExpanded)}
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <MaterialIcons 
              name={isDetailExpanded ? "keyboard-arrow-down" : "keyboard-arrow-right"} 
              size={24} 
              color="#181725" 
            />
          </TouchableOpacity>
          
          {isDetailExpanded && (
            <Text style={styles.detailDescription}>
              Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
            </Text>
          )}

          {/* Đường kẻ ngang */}
          <View style={styles.divider} />

          {/* MỤC 2: Nutritions */}
          <TouchableOpacity style={styles.accordionHeader} activeOpacity={0.7}>
            <Text style={styles.accordionTitle}>Nutritions</Text>
            <View style={styles.accordionRightContent}>
              <View style={styles.nutritionBadge}>
                <Text style={styles.nutritionBadgeText}>100gr</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

          {/* Đường kẻ ngang */}
          <View style={styles.divider} />

          {/* MỤC 3: Review */}
          <TouchableOpacity style={styles.accordionHeader} activeOpacity={0.7}>
            <Text style={styles.accordionTitle}>Review</Text>
            <View style={styles.accordionRightContent}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <AntDesign key={star} name="star" size={16} color="#F3603F" style={{ marginLeft: 2 }} />
                ))}
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* NÚT ADD TO BASKET (Gắn cố định phía dưới) */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.addToBasketButton} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  imageBackgroundContainer: {
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 350, // Chiều cao cố định cho vùng nền chứa ảnh
    alignItems: 'center',
    paddingTop: 10,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 10,
    zIndex: 10,
  },
  productImage: {
    width: 250,
    height: 200,
    marginTop: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    marginTop: 'auto', // Đẩy cụm dots xuống dưới cùng
    marginBottom: 25,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 15, // Nới rộng dot đang active
    backgroundColor: '#53B175',
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    flex: 1,
    marginRight: 10,
  },
  unitText: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginBottom: 18,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },
  detailDescription: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 21,
    marginBottom: 18, // Thêm margin để cách xa đường gạch ngang ở dưới
  },
  accordionRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionBadge: {
    backgroundColor: '#EBEBEB',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 15,
  },
  nutritionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7C7C7C',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  bottomButtonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingTop: 10,
    backgroundColor: '#FFF',
  },
  addToBasketButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default ProductDetailScreen;