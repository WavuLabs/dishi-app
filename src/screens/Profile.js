import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { Provider, TextInput } from "react-native-paper";
import color from "../components/colors.js";
import AlertBox from "../components/AlertBox.js";

export default function Profile() {
  const [showUpdate, setshowUpdate] = React.useState(false);
  const [showResetPassword, setShowResetPassword] = React.useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const [firstName, setFirstName] = React.useState(null);
  const [secondName, setSecondName] = React.useState(null);

  const handleUpdateProfile = () => {
    updateProfile(user, {
      displayName: firstName + " " + secondName,
      photoURL: "https://picsum.photos/200",
    })
      .then(() => {
        console.log("Profile updated!", user.displayName);
        setshowUpdate(false);
      })
      .catch((error) => {
        console.log(error);
        setshowUpdate(false);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, user?.email)
      .then(() => {
        console.log("Password reset email sent!", user?.email);
        setShowResetPassword(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Provider>
      <View style={{ flex: 1,  }}>
        {!showUpdate && (
          <TouchableOpacity
            onPress={() => {
              setshowUpdate(!showUpdate);
            }}
            // className="flex flex-col items-center justify-center p-1"
            style={styles.ButtonUpdate}
          >
            <Text>Update Profile</Text>
          </TouchableOpacity>
        )}

        <View
          className={`flex ${
            showUpdate ? "" : "hidden"
          } flex-col w-full justify-center`}
          style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            mode="outlined"
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            label="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            label="Last Name"
            value={secondName}
            onChangeText={(text) => setSecondName(text)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleUpdateProfile}
            // className="flex flex-col w-full p-1"
            style={styles.Button}
          >
            <Text>Update Details</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Reset Password with Email"
          onPress={handleResetPassword}
        />
        {showResetPassword ? (
          <AlertBox
            AlertTitle="Succefully"
            ParagraphText={"Password reset email sent to " + user?.email}
          />
        ) : (
          <></>
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
    color: "white",
    padding: 10,
    margin: 5,
    width: "60%",
    borderRadius: 5,
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    margin: 5,
    borderRadius: 10,
  },
  ButtonUpdate: {
    backgroundColor: color.secondary,
    color: color.primary,
    padding: 10,
    margin: 5,
    width: "100%",
    borderRadius: 5,
    alignSelf: "center",
  },
});
