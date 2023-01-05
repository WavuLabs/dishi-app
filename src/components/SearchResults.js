import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import color from "./colors";

const SearchResults = ({ imagesrc, handleSearchReults }) => {
  const handlePress = () => {};
  return (
    <TouchableOpacity
      style={styles.hotelDetailsContainer}
      onPress={handleSearchReults}
    >
      <View style={styles.hotelImage}>
        <Image source={imagesrc} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={styles.restaurantsDetails}>
        <Text>Restaurant</Text>
        <Text>Restaurant Rating</Text>
        <Text>Food Name</Text>
        <Text>Food Description</Text>
        <Text>Food Price</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  hotelDetailsContainer: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: color.primary,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 130,
    borderRadius: 5,
  },
  hotelImage: {
    flex: 0.4,
    borderRightWidth: 0.2,
    borderColor: color.primary,
    padding: 10,
  },
  restaurantsDetails: {
    flex: 0.6,
    width: "100%",
    marginLeft: 15,
    paddingTop: 5,
    justifyContent: "space-evenly",
  },
});
