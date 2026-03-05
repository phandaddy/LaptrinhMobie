import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Khởi tạo Stack Navigator
const Stack = createNativeStackNavigator();

// --- 1. MÀN HÌNH ĐĂNG NHẬP ---
function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(''); 

  const handleTextChange = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6 && cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    setPhoneNumber(formatted);

    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      setError('Số điện thoại phải bắt đầu bằng số 0');
    } else {
      setError('');
    }
  };

  const handleLogin = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length !== 10 || !cleaned.startsWith('0')) {
      Alert.alert('Thông báo', 'Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else {
      setError('');
      // Điều hướng sang màn hình Home và truyền dữ liệu (số điện thoại) sang
      navigation.navigate('Home', { phone: phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={handleTextChange} 
          maxLength={13} 
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, styles.buttonActive]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, styles.buttonTextActive]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- 2. MÀN HÌNH HOME ---
function HomeScreen({ route, navigation }) {
  // Nhận dữ liệu số điện thoại từ màn hình Login truyền sang
  const { phone } = route.params;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeContent}>
        <Text style={styles.homeTitle}>Chào mừng bạn! 🎉</Text>
        <Text style={styles.homeDesc}>Bạn đã đăng nhập thành công với số điện thoại:</Text>
        <Text style={styles.highlightPhone}>{phone}</Text>

        {/* Nút Quay lại / Đăng xuất */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} // Trở về màn hình trước đó
        >
          <Text style={styles.backButtonText}>Quay lại trang Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- 3. APP COMPONENT (Cấu hình Router) ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tắt header mặc định của React Navigation cho màn hình Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- 4. STYLES ---
const styles = StyleSheet.create({
  // Styles chung & Login
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
    lineHeight: 18,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#fff',
  },

  // Styles Home
  homeContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  homeDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  highlightPhone: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});