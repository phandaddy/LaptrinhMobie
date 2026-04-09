import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // null = chưa đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const USER_KEY = '@user_data';

  // Khi app khởi động, kiểm tra AsyncStorage xem đã login chưa
  useEffect(() => {
    const loadUser = async () => {
      try {
        const saved = await AsyncStorage.getItem(USER_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Đăng nhập: lưu user vào AsyncStorage
  const signIn = async (email, password) => {
    // Giả lập tài khoản cứng (thay bằng API thật nếu cần)
    if (email === 'Admin@gmail.com' && password === '12345678') {
      const userData = {
        name: 'Administrator',
        role: 'Mobile developer',
        email,
        avatar: null,
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Email hoặc mật khẩu không đúng!' };
  };

  // Đăng xuất: xóa AsyncStorage
  const signOut = async () => {
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ user, isLoggedIn, loading, signIn, signOut }}>
      {children}
    </AppContext.Provider>
  );
};