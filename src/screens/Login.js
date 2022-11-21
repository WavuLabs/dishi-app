import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  TextInput,
  Text,
  View,
  Button,
} from "react-native";
import React from "react";
import auth from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert("Error", errorMessage);
      })
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChange={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttons, styles.loginButton]}
          onPress={handleLogin}
          // onPress={() => navigation.navigate("HomePage")}
        >
          <Text className="text-center" style={""}>
            LogIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-col justify-center bg-yellow-500 w-strerch"
          style={{ height: 40, width: "60%" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-center" style={""}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        title="SKIP TO HOMESCREEN"
        onPress={() => navigation.navigate("Drawer")}
        style={{ paddingTop: 10, backgroundColor: "red" }}
      />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  buttons: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
    color: "white",
    padding: 10,
    margin: 5,
    width: "60%",
    borderRadius: 5,
  },
  buttonRegister: {
    backgroundColor: "white",
    color: "#ffaa00",
    borderColor: "#ffaa00",
    borderWidth: 2,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "100%",
  },
});