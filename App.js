import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import color from "./src/components/colors";
import { StatusBar } from "expo-status-bar";
import auth from "./firebase.js";

import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Map from "./src/screens/Map";
import Profile from "./src/screens/Profile";
import FitnessTracker from "./src/screens/FitnessTracker";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
let FirstPage;

export const UserContext = React.createContext();

const StackContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={FirstPage}
        screenOptions={{
          headerStyle: {
            backgroundColor: color.primary,
          },
          headerTitleStyle: {
            color: color.third,
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          // backgroundColor: "#75420e",
          backgroundColor: color.primary,
        },
        headerTitleStyle: {
          color: color.third,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Dishi" }}
      />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="FitnessTracker" component={FitnessTracker} />
    </Drawer.Navigator>
  );
};
function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const ifLoggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user is logged in");
        FirstPage = "Drawer";
        setIsLoaded(true);
      } else {
        console.log("user is not logged in");
        FirstPage = "Login";
        setIsLoaded(true);
      }
    });
    return ifLoggedIn;
  }, []);
  
  return ( 
    <>
      {isLoaded && <StackContainer />}
      <StatusBar style="dark" hidden={false} />
    </>
  );
}

export default App;
