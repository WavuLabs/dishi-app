import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <Text>Food Name</Text>
        <Text>Food Description</Text>
        <Text>Food Price</Text>
        <Text>Food Rating</Text>
        <Text>Food Rating</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  hotelDetailsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 100,
  },
  hotelImage: {
    flex: 0.4,
    borderWidth: 1,
    padding: 10,
    // borderColor: "red",
  },
  restaurantsDetails: {
    flex: 0.6,
    borderWidth: 1,
    // borderColor: "red",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 5,
  },
});
