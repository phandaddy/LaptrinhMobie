import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Bấm vào đây"
        onPress={() => Alert.alert('Hello World!')}
      />
    </View>
  );
}