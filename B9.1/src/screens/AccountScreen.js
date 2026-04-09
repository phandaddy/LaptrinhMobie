import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';

const ORANGE = '#FFA500';
const CYAN   = '#00BFFF';

export default function AccountScreen() {
  const { user, signOut } = useAppContext();

  const handleSignOut = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: signOut },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Banner xanh phía trên */}
      <View style={styles.banner} />

      {/* Avatar nằm giữa banner và content */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
      </View>

      {/* Thông tin user */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{user?.name ?? 'Administrator'}</Text>
        <Text style={styles.userRole}>{user?.role ?? 'Mobile developer'}</Text>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.85}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F0F0' },
  banner: {
    height: 260,
    backgroundColor: CYAN,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -50,       // Kéo avatar chồng lên banner
    marginBottom: 16,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarEmoji: { fontSize: 52 },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  userRole: {
    fontSize: 16,
    color: CYAN,
    marginBottom: 32,
  },
  signOutBtn: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    elevation: 3,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});