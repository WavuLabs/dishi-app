import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React from "react";
import auth from "../../firebase.js";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

import color from "../components/colors.js";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("walterayiego@gmail.com");
  const [password, setPassword] = React.useState("walt1234");
  const [secure, setSecure] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [forgotPasswordText, setforgotPasswordText] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    detectAuthChange();
  }, []);

  const detectAuthChange = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Drawer");
      }
    });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Drawer");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Login Failed", "Wrong Password or invalid email");
        console.log(errorCode, errorMessage);
        // setVisible(true);
        setforgotPasswordText(true);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!", email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Image
          source={require("../../assets/dishiLogo.png")}
          className="mt-10 w-full h-1/3"
        />
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
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setSecure(!secure)}
                  />
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
          {forgotPasswordText && (
            <TouchableOpacity
              className="flex flex-col justify-center"
              style={{ height: 40, width: "60%" }}
              onPress={() => showDialog()}
            >
              <Text className="text-center">
                Forgot Password?
                <Text
                  className={`text-center text-base text-[${color.primary}]`}
                  style={{ color: color.primary }}
                >
                  Reset
                </Text>
              </Text>
            </TouchableOpacity>
          )}
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
              <Text
                className={`text-center text-base text-[${color.primary}] `}
                style={{ color: color.primary }}
              >
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Reset Password</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Enter your email to reset your password</Paragraph>
            {
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(text) => setEmail(text)}
                outlineStyle={{ borderColor: color.primary, borderWidth: 1 }}
                right={<TextInput.Icon icon="email" />}
              />
            }
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleResetPassword}>Reset Password</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: color.third,
    // justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
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
