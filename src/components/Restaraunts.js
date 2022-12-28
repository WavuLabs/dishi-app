import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import color from "./colors";

export default function Restaraunts({
  handlePress,
  imagesrc,
  RestarauntName,
  RestarauntDescription,
  RestarauntContacts,
  RestarauntRatings,
}) {
  return (
    <TouchableOpacity
      style={styles.hotelDetailsContainer}
      onPress={handlePress}
    >
      <View style={styles.restaurantImage}>
        <Image source={imagesrc} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={styles.Details}>
        <Text style={{color: color.secondary, textAlign: "center"}}>{RestarauntName}</Text>
        <Text>{RestarauntDescription}</Text>
        <Text>Tel No : {RestarauntContacts}</Text>
        <Text>Ratings : {RestarauntRatings}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hotelDetailsContainer: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: color.primary,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 160,
    borderRadius: 5,
  },
  restaurantImage: {
    flex: 0.4,
    borderRightWidth: 0.2,
    borderColor: color.primary,
    padding: 10,
  },
  Details: {
    flex: 0.6,
    width: "100%",
    marginLeft: 15,
    paddingTop: 5,
    justifyContent: "space-evenly",
  },
});
