
          <View style={{}}>
          {/* WELCOME TEXT */}
          <LinearGradient
            colors={[color.primary, color.third, "transparent"]}
            style={styles.background}
            start={{ x: -0.1, y: 0 }}
            end={{ x: 1.5, y: 0.7 }}
          >
            <View>
              <Text className={`text-lg text-center`} style={{}}>
                Welcome to Dishi!!
              </Text>
              <Text className={`text-lg text-center`}>
                Restaraunts near you
              </Text>
            </View>
          </LinearGradient>
        </View>


onUserLocationChange={(location) => {
    mapViewRef.current.animateCamera(
      {
        center: {
          latitude: location.nativeEvent.coordinate.latitude,
          longitude: location.nativeEvent.coordinate.longitude,
        },
      },
      1000
    );
  }}


  import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import color from "../components/colors.js";

export default function LottiePreloader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      {/* <Lottie
        style={[styles.Lottie]}
        source={require("../../assets/loadingFood.json")}
        autoPlay
        loop
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
    // width: "100%",
  },
  Lottie: {

    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 1,
  },
});
