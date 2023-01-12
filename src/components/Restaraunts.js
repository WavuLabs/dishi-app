import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
} from "react-native";

import color from "./colors";
import React from "react";

export default function Restaraunts({
  handlePress,
  imagesrc,
  RestarauntName,
  RestarauntDescription,
  RestarauntContacts,
  RestarauntRatings,
  StarRatingProp,
}) {
  return (
    <TouchableOpacity
      style={styles.hotelDetailsContainer}
      onPress={handlePress}
    >
      <View style={styles.restaurantImage}>
        <Image
          source={imagesrc}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      <View style={styles.Details}>
        <Text style={styles.title}>{RestarauntName}</Text>
        <Text>{RestarauntDescription}</Text>
        <Text>Tel No : {RestarauntContacts}</Text>
        <Text>{StarRatingProp}</Text>
      </View>
    </TouchableOpacity>
  );
}

const flexIndex = 0.65;
const styles = StyleSheet.create({
  hotelDetailsContainer: {
    // flexDirection: "row",
    // borderWidth: 0.4,
    // borderColor: color.primary,
    height: "100%",
    width: Dimensions.get("window").width * 0.8,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: color.secondary,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    overflow: "hidden",
  },
  restaurantImage: {
    flex: flexIndex,
    borderColor: color.primary,
    padding: 10,
  },
  title: {
    color: color.secondary,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  Details: {
    flex: 1 - flexIndex,
    width: "100%",
    margin: 10,
    justifyContent: "space-evenly",
  },
});
