import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";
import CameraButton from "./CameraButton";
import IconButton from "./IconButton";
import { Image } from "expo-image";

function SendButton({ onPress }: { onPress: () => void }) {
  // Animated value for the button scale
  const animatedScale = useAnimatedValue(0.7);
  useEffect(() => {
    Animated.timing(animatedScale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [animatedScale]);
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: animatedScale,
          }
        ],
        opacity: animatedScale
      }}
    >
      <IconButton
        iconName="paper-plane-outline"
        size={42}
        color="white"
        onPress={onPress}
        style={styles.sendButton}
      />
    </Animated.View>
  );
}

function PicturePreview({
  picture,
  onClose,
}: {
  picture: CameraCapturedPicture;
  onClose: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.camera}>
          <Image
            source={`data:image/jpg;base64,${picture.base64}`}
            style={styles.camera}
            contentFit="cover"
            priority="high"
          />
        </View>
      </View>
      <View style={styles.lowerHalfContainer}>
        <View style={styles.cameraButtonsContainer}>
          <IconButton
            iconName="close"
            size={45}
            color="white"
            onPress={onClose}
          />
          <SendButton onPress={() => console.log("Send picture")} />

          <IconButton
            iconName="archive-outline"
            size={45}
            onPress={() => {}}
            color="white"
          />
        </View>
      </View>
    </View>
  );
}

export default function Camera() {
  // Camera permissions
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Camera facing
  const [facing, setFacing] = useState<CameraType>("front");
  const animatedRotation = useAnimatedValue(0);
  useEffect(() => {
    if (permission && permission.granted) {
      Animated.sequence([
        Animated.delay(250),
        Animated.timing(animatedRotation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animatedRotation, facing]);
  function toggleCameraFacing() {
    animatedRotation.setValue(0);
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Take picture
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
        base64: true,
      });
      if (photo) {
        setPicture(photo);
        // console.log(photo);
      }
    }
  };

  const [enableFlash, setEnableFlash] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return null;
  }

  if (picture) {
    // Show the picture preview if a picture has been taken.
    return (
      <PicturePreview picture={picture} onClose={() => setPicture(null)} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          ratio="1:1"
          mode="video"
          mute={true}
          flash={enableFlash ? "on" : "off"}
          mirror={facing === "front"}
        />
      </View>
      <View style={styles.lowerHalfContainer}>
        <View style={styles.cameraButtonsContainer}>
          <IconButton
            iconName={enableFlash ? "flash" : "flash-outline"}
            size={40}
            color={enableFlash ? "#f5bf49" : "white"}
            onPress={() => setEnableFlash((prev) => !prev)}
          />
          <CameraButton onPress={takePicture} />
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animatedRotation.interpolate({
                    inputRange: [0, 2],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <IconButton
              iconName="sync"
              size={40}
              onPress={toggleCameraFacing}
              color="white"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 3,
    paddingRight: 3,
  },
  lowerHalfContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
  },
  cameraButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    flex: 0.3,
    maxHeight: 100,
    padding: 5,
  },
  cameraContainer: {
    maxWidth: "100%",
    aspectRatio: 1,
    height: "auto",
    overflow: "hidden",
    borderRadius: 50,
  },
  camera: {
    width: "100%",
    aspectRatio: 1,
    height: "auto",
  },
  sendButton: {
    backgroundColor: "#534e4a",
    borderRadius: "100%",
    height: "100%",
    aspectRatio: 1,
    width: "auto",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
