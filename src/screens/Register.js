import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import color from "../components/colors.js";
import React from "react";
import AlertBox from "../components/AlertBox.js";

import auth from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Provider, TextInput } from "react-native-paper";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [SecondName, setSecondName] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");
  const [showAlertBox, setShowAlertBox] = React.useState(false);

  const handleRegister = async () => {
    if (password !== ConfirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: FirstName + " " + SecondName,
        })
          .then(() => {
            console.log("Profile updated!", auth.currentUser.displayName);
            setShowAlertBox(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert("Error", errorMessage);
      }
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {showAlertBox && (
          <AlertBox
            AlertTitle="Succefully "
            ParagraphText={
              "User " + auth.currentUser.displayName + " succesfully created"
            }
            AlertDialogAction={
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="text-center"> Go to Login</Text>
              </TouchableOpacity>
            }
          />
        )}
        <KeyboardAvoidingView
          className="flex flex-col justify-center items-center w-full mx-3 "
          behavior="padding"
        >
          <TextInput
            label="First Name"
            mode="outlined"
            onChangeText={(text) => setFirstName(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            onChangeText={(text) => setSecondName(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            style={styles.input}
          />

          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonRegister}
            className="flex flex-col w-1/2 justify-center items-center m-4 "
            onPress={handleRegister}
          >
            <Text className="text-center  m-2 ">Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "white",
    padding: 10,
  },

  input: {
    // height: 30,
    // marginVertical: 10,
    // padding: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  buttonRegister: {
    backgroundColor: "#ffaa00",
    borderRadius: 5,
  },
});
