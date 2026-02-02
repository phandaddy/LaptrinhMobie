import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function App() {
  const [bgColor, setBgColor] = useState('green');

  const handleChangeColor = (color) => {
    setBgColor(color);
    Alert.alert("Bạn đã chọn màu", color.toUpperCase());
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>

      <ColorButton title="GREEN" color="green" onPress={handleChangeColor} />
      <ColorButton title="BLUE" color="blue" onPress={handleChangeColor} />
      <ColorButton title="BROWN" color="brown" onPress={handleChangeColor} />
      <ColorButton title="YELLOW" color="yellow" onPress={handleChangeColor} />
      <ColorButton title="RED" color="red" onPress={handleChangeColor} />
      <ColorButton title="BLACK" color="black" onPress={handleChangeColor} />

    </View>
  );
}

function ColorButton({ title, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => onPress(color)}
    >
      <Text style={[
        styles.text,
        { color: color === 'yellow' ? '#000' : '#fff' }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  button: {
    height: 50,
    borderRadius: 6,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});