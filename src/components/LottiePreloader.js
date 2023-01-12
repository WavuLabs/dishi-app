import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import color from "../components/colors.js";

export default function LottiePreloader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie
        style={[styles.Lottie]}
        source={require("../../assets/17100-food.json")}
        autoPlay
        loop
      />
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
  },
  Lottie: {
    width: "70%",
    height: "60%",
    position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
});
