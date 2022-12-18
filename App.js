import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import color from "./src/components/colors";
import { StatusBar } from "expo-status-bar";

import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Map from "./src/screens/Map";
import Profile from "./src/screens/Profile";
import FitnessTracker from "./src/screens/FitnessTracker";
import ClipboardTutorial from "./src/components/ClipboardTutorial";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const UserContext = React.createContext();

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
      <Drawer.Screen name="ClipboardTutorial" component={ClipboardTutorial} />
    </Drawer.Navigator>
  );
};
const StackContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: color.primary,
          },
          headerTitleStyle: {
            color: color.third,
          },
        }} 
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="Drawer"
          component={DrawerContainer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <>
      <StackContainer />
      <StatusBar style="light" hidden={false} />
    </>
  );
}

export default App;
