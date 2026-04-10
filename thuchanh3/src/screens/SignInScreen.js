import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Dùng thư viện icon để tránh lỗi thiếu ảnh

export default function SignInScreen({ navigation }) { // Đổi tên thành SignInScreen và nhận navigation
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 🔥 ẢNH HEADER */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/backgroundLogin.jpg")}
          style={styles.image}
          resizeMode="cover" 
        />
      </View>

      {/* 🔥 NỘI DUNG */}
      <View style={styles.content}>
        {/* TITLE */}
        <Text style={styles.title}>
          Get your groceries{"\n"}with nectar
        </Text>

        {/* 🔥 INPUT PHONE */}
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
            style={styles.flagIcon} 
          />
          <Text style={styles.code}>+880</Text>

          <TextInput
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor="#7C7C7C"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            // Nếu bạn muốn người dùng bấm vào ô nhập mà tự nhảy sang trang Number thì bỏ comment dòng dưới
            // onFocus={() => navigation.navigate('Number')}
          />
        </View>

        {/* 🔥 DIVIDER */}
        <Text style={styles.orText}>
          Or connect with social media
        </Text>

        {/* 🔥 GOOGLE BUTTON */}
        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
          <View style={styles.iconWrapper}>
            <AntDesign name="google" size={24} color="white" />
          </View>
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* 🔥 FACEBOOK BUTTON */}
        <TouchableOpacity style={styles.fbBtn} activeOpacity={0.8}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="facebook-official" size={24} color="white" /> 
          </View>
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  
  imageWrapper: {
    width: "100%",
    height: 350,
  },

  // 🔥 ẢNH FULL MÀN CHUẨN UI
  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#181725",
    lineHeight: 35,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E2E2E2",
    paddingBottom: 10,
    marginBottom: 35,
  },

  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },

  code: {
    fontSize: 18,
    marginRight: 15,
    color: "#181725",
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#181725",
  },

  orText: {
    textAlign: "center",
    color: "#828282",
    marginBottom: 35,
    fontSize: 14,
    fontWeight: '600',
  },

  // 🔥 BUTTON CÓ ICON NẰM LỆCH TRÁI, TEXT Ở GIỮA
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5383EC",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  fbBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A66AC",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  iconWrapper: {
    position: 'absolute',
    left: 30,
  },

  btnText: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});