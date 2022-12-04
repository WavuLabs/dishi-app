import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Map from "./src/screens/Map";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const UserContext = React.createContext();

const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="HomeScreen"
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
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
}

export default App;
