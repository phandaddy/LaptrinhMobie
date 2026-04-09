import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppContext } from '../context/AppContext';
import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, loading } = useAppContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Đã đăng nhập → vào Main (Bottom Tab)
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      ) : (
        // Chưa đăng nhập → vào Sign In
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;