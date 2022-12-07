import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import {
  getAuth,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Menu, Divider, Provider, TextInput } from "react-native-paper";
import color from "../components/colors.js";
import AlertBox from "../components/AlertBox.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile() {
  const [visible, setVisible] = React.useState(false);
  const [password, setPassword] = React.useState(null);
  const [ConfirmPassword, setConfirmPassword] = React.useState(null);
  const [secure, setSecure] = React.useState(true);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
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

  const handleUpdatePassword = () => {
    if (password === ConfirmPassword) {
      updatePassword(user, password)
        .then(() => {
          console.log("Password updated!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Passwords do not match");
      setIncorrectPassword(true);
    }
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

        <TouchableOpacity
          onPress={() => {
            setHidden(!hidden);
          }}
          className="flex flex-col w-full p-3 my-2"
          style={{ backgroundColor: color.secondary, paddingHorizontal: 100 }}
        >
          <Text>Reset Password</Text>
        </TouchableOpacity>

        <View className={`flex ${hidden ? "hidden" : ""} flex-col w-full p-1`}>
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            right={
              secure ? (
                <TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />
              ) : (
                <TextInput.Icon
                  icon="eye-off"
                  onPress={() => setSecure(!secure)}
                />
              )
            }
            secureTextEntry={secure}
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            onChangeText={(text) => setConfirmPassword(text)}
            right={
              secure ? (
                <TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />
              ) : (
                <TextInput.Icon
                  icon="eye-off"
                  onPress={() => setSecure(!secure)}
                />
              )
            }
            secureTextEntry={secure}
          />

          <TouchableOpacity
            onPress={handleUpdatePassword}
            className="flex flex-col w-full p-3 my-2"
            style={{ backgroundColor: color.primary, paddingHorizontal: 100 }}
          >
            <Text>Confirm Password Update</Text>
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
        {incorrectPassword ? (
          <AlertBox
            AlertTitle="Success"
            ParagraphText=" Password updated successfully"
          />
        ) : (
          <></>
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({});
