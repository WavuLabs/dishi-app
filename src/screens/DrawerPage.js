import React from "react";
import { StyleSheet, Text, View } from "react-native";


const RandomPage = ({ navigation }) => {
  return (
    <View>
      <Text>Random Page</Text>
      <Button
        title="Go to RandomPage"
        onPress={() => navigation.navigate("RandomPage2")}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default RandomPage;
