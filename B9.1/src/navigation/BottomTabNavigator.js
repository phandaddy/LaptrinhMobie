import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import ExplorerScreen from '../screens/ExplorerScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const ORANGE = '#FFA500';
const GRAY   = '#9E9E9E';

// Icon dùng text vì không cần cài thêm lib icon
const CompassIcon = ({ color }) => (
  <Text style={{ fontSize: 24, color }}>🧭</Text>
);
const PersonIcon = ({ color, active }) => (
  <View style={{
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: active ? ORANGE : 'transparent',
    justifyContent: 'center', alignItems: 'center',
  }}>
    <Text style={{ fontSize: active ? 18 : 22, color: active ? '#fff' : color }}>
      {active ? '👤' : '👤'}
    </Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          borderTopColor: '#E0E0E0',
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginBottom: 6 },
      }}
    >
      <Tab.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{
          title: 'Explorer',
          headerTitle: 'Explorer',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          tabBarIcon: ({ color }) => <CompassIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={({ route }) => ({
          title: 'Account',
          headerTitle: 'Account',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          tabBarIcon: ({ color, focused }) => (
            <PersonIcon color={color} active={focused} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;