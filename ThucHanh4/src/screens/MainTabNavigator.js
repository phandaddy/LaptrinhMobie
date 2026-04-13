import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

// Import màn hình HomeScreen bạn vừa làm
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';

const Tab = createBottomTabNavigator();

// Tạo một component rỗng để làm màn hình tạm cho các tab chưa code tới
const DummyScreen = () => <View style={{ flex: 1, backgroundColor: '#FFF' }} />;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ẩn header mặc định của Tab Navigator
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#53B175', // Màu xanh lá khi đang chọn tab
        tabBarInactiveTintColor: '#181725', // Màu đen khi không chọn
        
        // 🔥 CẤU HÌNH UI CHO THANH TAB LƠ LỬNG VÀ BO GÓC
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 30, // Bo góc tròn
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          
          // Hiệu ứng đổ bóng (Shadow)
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 5, // Dành cho Android
          borderTopWidth: 0, // Xóa viền mờ phía trên của tab mặc định
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        
        // 🔥 CẤU HÌNH ICON CHO TỪNG TAB DỰA TRÊN TÊN ROUTE
        tabBarIcon: ({ focused, color, size }) => {
          size = 24; 
          
          if (route.name === 'Shop') {
            return <Entypo name="shop" size={size} color={color} />;
          } else if (route.name === 'Explore') {
            return <Ionicons name="search-outline" size={size} color={color} />;
          } else if (route.name === 'Cart') {
            return <Ionicons name="cart-outline" size={size} color={color} />;
          } else if (route.name === 'Favourite') {
            return <MaterialIcons name="favorite-border" size={size} color={color} />;
          } else if (route.name === 'Account') {
            return <Feather name="user" size={size} color={color} />;
          }
        },
      })}
    >
      {/* Khai báo các Tab và Component tương ứng */}
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Cart" component={DummyScreen} />
      <Tab.Screen name="Favourite" component={DummyScreen} />
      <Tab.Screen name="Account" component={DummyScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;