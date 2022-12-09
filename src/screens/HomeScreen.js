import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import {} from "react-native-paper";
import SearchResults from "../components/SearchResults";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import color from "../components/colors";

const HomeScreen = ({ navigation }) => {
  const [budget, setBudget] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const handleSearchReults = () => {
    navigation.navigate("Map");
  };

  const handleSearch = () => {};
  const add = require("../../assets/adds.jpg");
  const adds2 = require("../../assets/adds2.jpg");
  const imagesrc = require("../../assets/icon.png");

  return (
    <View style={styles.parentContainer}>
      <View
        className={``}
        // style={{  backgroundColor: color.secondary }} bg-[${color.primary}]
      >
        <LinearGradient
          colors={[color.primary, "transparent", "transparent"]}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className={`text-lg`} style={{}}>
            {" "}
            Welcome to Dishi!!
          </Text>
          <Text className={`text-lg`}>Get anymeal with any budget</Text>
        </LinearGradient>
      </View>

      <View className="px-3" style={styles.searchingContainer}>
        <TextInput
          placeholder="Search Food"
          style={[styles.textInput]}
          onChangeText={(text) => setSearch(text)}
        ></TextInput>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: "white", paddingTop: 2 }}>Search</Text>
        </TouchableOpacity>
      </View>

      <View className="px-3" style={styles.budgetSlider}>
        <Text style={styles.budgetText} className="p-1">
          Sort by Price
        </Text>
        <Slider
          value={budget}
          onValueChange={(value) => setBudget(value)}
          minimumValue={0}
          maximumValue={3000}
          step={50}
          minimumTrackTintColor={color.error}
          maximumTrackTintColor={color.disabled}
        />
        <Text>Price: {budget}</Text>
      </View>
      <ScrollView style={styles.searchResultsContainer}>
        <View style={styles.addsContainer}>
          <Image source={add} style={{ width: "50%", height: "100%" }} />
          <Image source={adds2} style={{ width: "50%", height: "100%" }} />
        </View>

        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={handleSearchReults}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    // marginHorizontal: 10,
    // paddingTop: 10,
    backgroundColor: color.third,
  },
  searchingContainer: {
    height: 40,
    flexDirection: "row",
    marginVertical: 10,
    // color: "green",
    //
  },
  budgetSlider: {
    // padding: 10,
  },
  textInput: {
    backgroundColor: "white",
    flex: 0.8,
    borderWidth: 1,
    borderColor: color.primary,
    paddingLeft: 10,
  },
  searchButton: {
    flex: 0.2,
    backgroundColor: color.secondary,
    color: color.primary,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  budgetText: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  addsContainer: {
    justifyContent: "space-between",
    columnGap: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: 150,
    marginVertical: 10,
  },
  searchResultsContainer: {
    flexWrap: "nowrap",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
