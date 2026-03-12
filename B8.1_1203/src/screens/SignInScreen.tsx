import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { AppContext } from '../App'; // Import Context từ App.tsx (chỉnh lại đường dẫn nếu cần)

const SignInScreen = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email ID</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email here!" 
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password here!" 
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>For got password?</Text>
        </TouchableOpacity>

        {/* Nút đăng nhập sẽ gọi hàm setIsLoggedIn(true)  */}
        <TouchableOpacity 
          style={styles.signInBtn} 
          onPress={() => setIsLoggedIn(true)}
        >
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign in with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
            <Text style={styles.googleText}>G Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, styles.facebookBtn]}>
            <Text style={styles.facebookText}>f Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.normalText}>Not yet a member? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#000' },
  label: { fontSize: 14, color: '#333', marginBottom: 8, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, marginBottom: 15, fontSize: 14 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: '#FFA500', fontWeight: '500' },
  signInBtn: { backgroundColor: '#FFA500', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 30 },
  signInBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { textAlign: 'center', color: '#000', fontWeight: 'bold', marginBottom: 20 },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  socialBtn: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center', borderWidth: 1 },
  googleBtn: { borderColor: '#ddd', backgroundColor: '#fff', marginRight: 10 },
  facebookBtn: { borderColor: '#3b5998', backgroundColor: '#3b5998', marginLeft: 10 },
  googleText: { color: '#000', fontWeight: 'bold' },
  facebookText: { color: '#fff', fontWeight: 'bold' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center' },
  normalText: { color: '#333' },
  signUpText: { color: '#FFA500', fontWeight: 'bold' }
});

export default SignInScreen;