import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export type IconButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
} & TouchableOpacityProps;

const IconButton: React.FC<IconButtonProps> = ({ style, iconName, size = 24, color = 'black', onPress, onPressIn, onPressOut }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
});

export default IconButton;