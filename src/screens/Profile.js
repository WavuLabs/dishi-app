import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import {
  getAuth,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Menu, Divider, Provider } from "react-native-paper";

export default function Profile() {
  const [visible, setVisible] = React.useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleUpdateProfile = () => {
    updateProfile(user, {
      displayName: "Jane Q. User",
      photoURL: "https://picsum.photos/200",
    })
      .then(() => {
        console.log("Profile updated!");
        console.log(user?.photoURL);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  const getVerificationEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        console.log("Verification email sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdatePassword = () => {
    updatePassword(user, "newPassword")
      .then(() => {
        console.log("Password updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        console.log("Password reset email sent!", user?.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Provider>
      <View>
        <Text>Profile</Text>
        <Button title="Update Profile" onPress={handleUpdateProfile} />
        <Button
          title=" Get Verification Email"
          onPress={getVerificationEmail}
        />
        <Button title="Update Password" onPress={handleUpdatePassword} />
        <Button title="Reset Password" onPress={handleResetPassword} />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button title="Show menu" onPress={openMenu} />}
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({});
