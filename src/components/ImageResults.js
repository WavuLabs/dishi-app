import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageResults = (imagesrc) => {
  return (
      <TouchableOpacity styles={styles.TouchableOpacity}>
      </TouchableOpacity>
  );
};

export default ImageResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  TouchableOpacity: {
    flex: 0.9,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    width: 100,
    height: 100,
  },
});
