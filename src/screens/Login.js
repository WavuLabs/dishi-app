import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Text,
  View,
  Button,
} from "react-native";
import React from "react";
import auth from "../../firebase.js";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  getAuth,
  signInWithRedirect,
} from "firebase/auth";
import {
  Drawer,
  Provider as PaperProvider,
  TextInput,
} from "react-native-paper";

import color from "../components/colors.js";
import { Icon } from "react-native-elements";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("walterayiego@gmail.com");
  const [password, setPassword] = React.useState("walt1234");
  const [secure, setSecure] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("Drawer");
        } else {
          // ...
        }
      });
    });
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Drawer");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert("Login Failed", "Invalid email or password", [
          {
            text: "Reset Password",
            onPress: () => handleResetPassword(),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset",
          "Password reset email sent to \n" + email
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <View className="flex flex-col w-full p-1 ">
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={(text) => setEmail(text)}
            outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
            right={<TextInput.Icon icon="email" />}
          />
        </View>
        <View className="flex flex-col w-full p-1">
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
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttons, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text className="text-center" style={""}>
            LogIn
          </Text>
        </TouchableOpacity>
 
        <TouchableOpacity
          className="flex flex-col justify-center"
          style={{ height: 40, width: "60%" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-center">
            Dont have an account?
            <Text className="text-center text-base text-[#ffaa00]">
              {" "}
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
  border: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "yellow",
  },
});
