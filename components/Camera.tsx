import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CameraButton from "./CameraButton";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return null;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ratio="1:1"
          mode="video"
          mute={true}
        ></CameraView>
      </View>
      <View style={styles.lowerHalfContainer}>
        <View style={styles.cameraButtonsContainer}>
          <CameraButton onPress={() => {}} />
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
    paddingLeft: 3,
    paddingRight: 3,
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
});
