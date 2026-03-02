import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  // 1. Thêm 1 state error để kiểm tra số điện thoại [cite: 56, 57]
  const [error, setError] = useState(''); 

  // 2. Hàm xử lý format và validate trực tiếp khi gõ [cite: 54, 85]
  const handleTextChange = (text) => {
    // Loại bỏ tất cả các ký tự không phải là số
    const cleaned = text.replace(/\D/g, '');

    // Format lại số điện thoại (Ví dụ: 093 454 43 44) 
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6 && cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    // Update ngược lại vào TextInput [cite: 90]
    setPhoneNumber(formatted);

    // Validate nhẹ khi đang nhập (Bắt buộc bắt đầu bằng số 0)
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      setError('Số điện thoại phải bắt đầu bằng số 0');
    } else {
      setError('');
    }
  };

  // 3. Tạo hàm validation text khi click button [cite: 26, 29, 30]
  const handlePress = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Kiểm tra đúng 10 số và bắt đầu bằng số 0 
    if (cleaned.length !== 10 || !cleaned.startsWith('0')) {
      // Hiển thị thông báo Alert 
      Alert.alert('Thông báo', 'Số điện thoại không đúng định dạng. Vui lòng nhập lại');
      // Đổi state error để hiển thị text đỏ dưới input [cite: 66, 68]
      setError('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else {
      setError('');
      Alert.alert('Thành công', 'Số điện thoại hợp lệ: ' + cleaned);
    }
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.divider} />

      {/* Label */}
      <Text style={styles.label}>Nhập số điện thoại</Text>
      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      {/* Input */}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]} // Đổi viền đỏ nếu có lỗi
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="number-pad"
        value={phoneNumber} // Sử dụng prop value [cite: 86]
        onChangeText={handleTextChange} 
        maxLength={13} // 10 số + 3 khoảng trắng
      />

      {/* Hiển thị thông báo cảnh báo màu đỏ phía dưới TextInput nếu giá trị có lỗi [cite: 66, 68, 72, 76] */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Button */}
      <TouchableOpacity 
        style={[styles.button, styles.buttonActive]} // Bỏ disabled để luôn bấm được và validate
        onPress={handlePress}
      >
        <Text style={[styles.buttonText, styles.buttonTextActive]}>
          Tiếp tục
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 10, // Giảm margin để nhường chỗ cho text báo lỗi
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20, // Bù lại margin của input
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
  }
});