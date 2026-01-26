import React, { useState } from 'react'; // 1. Import useState
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  // 2. Logic kiểm tra:
  // - phoneNumber.length === 10: Phải đủ 10 ký tự
  // - /^\d+$/.test(phoneNumber): Chỉ chứa các ký tự số (0-9)
  const isValid = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);

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
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="number-pad" // Đổi sang number-pad để hạn chế ký tự lạ ngay từ bàn phím
        value={phoneNumber}
        onChangeText={setPhoneNumber} // Cập nhật state khi nhập
        maxLength={10} // (Tuỳ chọn) Giới hạn người dùng chỉ nhập tối đa 10 số
      />

      {/* Button */}
      {/* 3. Thêm disabled và style động */}
      <TouchableOpacity 
        style={[styles.button, isValid ? styles.buttonActive : styles.buttonDisabled]}
        disabled={!isValid} // Vô hiệu hóa nút nếu không hợp lệ
        onPress={() => alert('Số điện thoại hợp lệ: ' + phoneNumber)}
      >
        <Text style={[styles.buttonText, isValid ? styles.buttonTextActive : styles.buttonTextDisabled]}>
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
    marginBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  
  // Style cơ bản của button
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  // Style khi KHÔNG thoả mãn
  buttonDisabled: {
    backgroundColor: '#eee',
  },
  // Style khi THOẢ mãn (Đổi màu nền thành Xanh)
  buttonActive: {
    backgroundColor: '#007AFF', // Màu xanh dương chuẩn iOS/OneHousing
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // Màu chữ khi KHÔNG thoả mãn
  buttonTextDisabled: {
    color: '#aaa',
  },
  // Màu chữ khi THOẢ mãn (Đổi sang màu Trắng)
  buttonTextActive: {
    color: '#fff',
  }
});