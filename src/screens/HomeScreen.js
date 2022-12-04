import {
  StyleSheet,
  ScrollView,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import SearchResults from "../components/SearchResults";
import { Slider } from "@miblanchard/react-native-slider";
import auth from "../../firebase.js";

const HomeScreen = ({ route, navigation }) => {
  const [budget, setBudget] = React.useState(0);
  const handleSearchReults = () => {
    navigation.navigate("Map");
  };
  const handleSearch = () => {};
  const imagesrc = require("./icon.png");

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <View>
        <Text>Email: {auth.currentUser?.email}</Text>
        <Text>Welcome Back</Text>
      </View>

      <View style={styles.budgetSlider}>
        <Text style={styles.budgetText}>Sort by budget</Text>
        <Slider
          value={budget}
          onValueChange={(value) => setBudget(value)}
          minimumValue={0}
          maximumValue={3000}
          step={50}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#FFFFFF"
        ></Slider>
        <Text>Value: {budget}</Text>
      </View>

      <View style={styles.searchingContainer}>
        <TextInput
          placeholder="Search Food"
          style={[styles.textInput]}
        ></TextInput>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: "white", paddingTop: 2 }}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.searchResultsContainer}>
        <View style={styles.addsContainer}>
          <Image source={imagesrc} style={{ width: "50%", height: "100%" }} />
          <Image source={imagesrc} style={{ width: "50%", height: "100%" }} />
        </View>

        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
        <SearchResults
          imagesrc={imagesrc}
          handleSearchReults={handleSearchReults}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchingContainer: {
    height: 40,
    flexDirection: "row",
    marginVertical: 20,
  },
  budgetSlider: {},
  textInput: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: "grey",
    paddingLeft: 10,
  },
  searchButton: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "green",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  budgetText: {
    fontSize: 20,
    fontWeight: "bold",
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
    flex: 1,
    // flexWrap: "wrap",
    flexWrap: "nowrap",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 20,
  },
});
