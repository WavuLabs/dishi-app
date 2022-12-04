import { StyleSheet,Button, Text, View } from "react-native";
import React from "react";
// import { auth } from "../../firebase.js";
import { getAuth ,updateProfile } from "firebase/auth";

export default function Profile() {
  const handleUpdateProfile = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: "https://picsum.photos/200",
    })
      .then(() => {
          console.log("Profile updated!");
          console.log(auth.currentUser?.photoURL);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({});
