import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { Provider, TextInput } from "react-native-paper";
import color from "../components/colors.js";
import AlertBox from "../components/AlertBox.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

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
      })
      .catch((error) => {
        console.log(error);
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
      <View>
        <Button
          title="Update Profile"
          onPress={() => {
            setshowUpdate(!showUpdate);
          }}
        />
    
        <View
          className={`flex ${showUpdate ? "hidden" : ""} flex-col w-full py-10`}
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
            className="flex flex-col w-full p-1"
            style={{ backgroundColor: color.primary, paddingHorizontal: 100 }}
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

const styles = StyleSheet.create({});
