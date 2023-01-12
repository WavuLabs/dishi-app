import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

export default function MapOnly() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.maps}
      />
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  maps: {
    width: width,
    height: height,
  },
});
