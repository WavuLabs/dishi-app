import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import color from "../components/colors";
import Home from "../components/Home";
import Search from "../components/Search";

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  

  
  const [routes] = React.useState([
    {
      key: "HomePage",
      title: "Restaurants",
      focusedIcon: "home",
      unfocusedIcon: "home-edit",
    },
    {
      key: "Search",
      title: "Search",
      focusedIcon: "card-search",
      unfocusedIcon: "magnify",
    },
  ]);


  const renderScene = BottomNavigation.SceneMap({
    HomePage: Home,
    Search: Search,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: color.third, height: 70 }}
    />
  );
};

export default HomeScreen;
