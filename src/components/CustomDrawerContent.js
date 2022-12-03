import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Button,
  View,
} from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import auth from "../../firebase.js";
const CustomDrawerContent = ({ navigation }, props) => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
    navigation.navigate("Login");
    });
  };
  return (
    <DrawerContentScrollView {...props} style={styles.CustomDrawerContent}>
      <View className=" justify-center items-center p-3">
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.Image}
        />
        <Text className="p-3">Welcome to the app!</Text>
      </View>

      <TouchableOpacity
        className="flex flex-col p-3 justify-center w-strerch"
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex flex-col p-3 justify-center w-strerch"
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text>Fitness Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex flex-col p-3 justify-center w-strerch bottom-0"
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex flex-col p-3 justify-center w-strerch bottom-0"
        onPress={handleSignOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  CustomDrawerContent: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  Image: {
    width: 100,
    height: 100,
  },
});
