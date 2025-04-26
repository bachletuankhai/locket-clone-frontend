import { TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { Animated } from "react-native";

export default function CameraButton({ onPress }: {
  onPress: () => void;
}) {
  const animatedWidth = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedWidth, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedWidth, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scaleX: animatedWidth }, { scaleY: animatedWidth }],
  };
  return (
    <View style={styles.outerStyle} pointerEvents="box-none">
      <TouchableOpacity
        onPress={onPress}
        style={[styles.innerStyle, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerStyle: {
    height: "100%",
    aspectRatio: 1,
    width: "auto",
    overflow: "hidden",
    borderRadius: '100%',
    padding: 4,
    borderWidth: 4,
    borderColor: "#f5bf49",
  },
  innerStyle: {
    width: "100%",
    aspectRatio: 1,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: '100%',
  },
})
