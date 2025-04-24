import Camera from "@/components/Camera";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";

export default function Index() {
  const { width } = useSafeAreaFrame();
  return (
    <SafeAreaView style={styles.background}>
      <View style={[styles.container, { width: width }]}>
        <Camera />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
