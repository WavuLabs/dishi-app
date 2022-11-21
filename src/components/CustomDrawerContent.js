import { TouchableOpacity , } from "react-native-gesture-handler";
import { StyleSheet, Text, Button, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomDrawerContent = ({ navigation }, props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.CustomDrawerContent}>
      <Text>Hello</Text>
      <Button
        title="Go somewhere"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      <View class="bg-slate-600" style={styles.View}></View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  CustomDrawerContent: {
    flex: 1,
    position: "relative",
    borderWidth: 1,
    // borderColor: "red",
  },
  DrawerItem: {
    backgroundColor: "red",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 100,
  },
  View: {
    position: "relative",
    left: 0,
    right: 0,
    // backgroundColor: "red",
  },
});
