import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import auth from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [SecondName, setSecondName] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = async () => {
    const CreateUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(CreateUser.user);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container2} behavior="padding">
        <Text>Register Screen</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => setSecondName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
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
  container2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    width: 300,
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  buttonRegister: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
    color: "white",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});
