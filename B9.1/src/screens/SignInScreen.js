import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, SafeAreaView,
  KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAppContext } from '../context/AppContext';

const ORANGE  = '#FFA500';
const RED_G   = '#DB4437';
const BLUE_FB = '#1877F2';

export default function SignInScreen() {
  const { signIn } = useAppContext();
  const [email, setEmail]       = useState('Admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading]   = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Đăng nhập thất bại', result.message);
    }
    // Nếu thành công, AppNavigator tự chuyển sang Main
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Title */}
          <Text style={styles.title}>Sign In</Text>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Admin@gmail.com"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.signInBtnText}>Sign In</Text>
            }
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.orText}>Or login with</Text>

          {/* Google */}
          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: RED_G }]}
            onPress={() => Alert.alert('Google', 'Chức năng chưa triển khai')}
            activeOpacity={0.85}
          >
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: BLUE_FB }]}
            onPress={() => Alert.alert('Facebook', 'Chức năng chưa triển khai')}
            activeOpacity={0.85}
          >
            <Text style={styles.socialIcon}>f</Text>
            <Text style={styles.socialBtnText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 14,
  },
  signInBtn: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 6,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 16,
  },
  socialBtn: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 10,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  socialBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});