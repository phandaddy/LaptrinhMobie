import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Cập nhật lại đường dẫn import nếu bạn để file ở chỗ khác nhé
import SignInScreen from './screens/SignInScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import AccountScreen from './screens/AccountScreen';

// 1. Khởi tạo Context với Type
type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 2. Auth Stack 
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

// 3. Main Bottom Tab [cite: 106, 107]
const MainTab = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#FFA500' }}>
    <Tab.Screen name="Explorer" component={ExplorerScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

// 4. Root Navigator xử lý logic chuyển đổi
const RootNavigator = () => {
  const { isLoggedIn } = React.useContext(AppContext);

  return (
    <NavigationContainer>
      {/* Nếu chưa đăng nhập -> AuthStack (Mặc định). Đã đăng nhập -> MainTab  */}
      {isLoggedIn ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

// 5. App Component bọc AppProvider [cite: 98]
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mặc định là false

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RootNavigator />
    </AppContext.Provider>
  );
}