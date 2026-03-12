import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AppContext } from '../App'; 

const AccountScreen = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Mảng màu xanh phía trên */}
      <View style={styles.blueHeader} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>Phan Nguyen</Text>
        <Text style={styles.role}>Noob!</Text>
        <Text style={styles.desc}>
          I'm chicken!!!!!!!
        </Text>

        {/* Nút đăng xuất sẽ gọi hàm setIsLoggedIn(false) [cite: 109] */}
        <TouchableOpacity 
          style={styles.signOutBtn} 
          onPress={() => setIsLoggedIn(false)}
        >
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  blueHeader: { height: 200, backgroundColor: '#00BFFF', width: '100%' },
  infoContainer: { flex: 1, alignItems: 'center', padding: 30, marginTop: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  role: { fontSize: 16, color: '#00BFFF', marginBottom: 20, fontWeight: '500' },
  desc: { textAlign: 'center', color: '#777', fontSize: 14, lineHeight: 22, marginBottom: 40 },
  signOutBtn: { backgroundColor: '#FFA500', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5 },
  signOutBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AccountScreen;