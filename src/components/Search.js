import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Button as ButtonNative,
} from "react-native";
import * as React from "react";
import {
  Provider,
  Button,
  Paragraph,
  Dialog,
  Portal,
  BottomNavigation,
} from "react-native-paper";
import SearchResults from "../components/SearchResults";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import call from "react-native-phone-call";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import color from "./colors";

const Search = ({ navigation }) => {
  const [budget, setBudget] = React.useState(3000);
  const [search, setSearch] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const add = require("../../assets/adds.jpg");
  const adds2 = require("../../assets/adds2.jpg");

  const handleSearchReults = (item) => {
    showDialog();
  };

  const handleClipBoard = async () => {
    await Clipboard.setStringAsync("0715280146");
    setCopied(true);
  };

  const triggerCall = () => {
    const args = {
      number: "0715280146",
      prompt: true,
    };
    call(args).catch(
      Alert.alert(
        "Call Failed",
        "Call Failed \n Copy number to clipboard (click on the clipboard icon)"
      )
    );
  };

  const renderItem = (item) => {
    return (
      <>
        <SearchResults
          imagesrc={adds2}
          handleSearchReults={() => handleSearchReults(item)}
        />
      </>
    );
  };

  const handleSearch = () => {
    Alert.alert("Search Results", "Coming Soon");
  };

  return (
    <>
      <Provider>
        <View style={styles.parentContainer}>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Restaurant Name</Dialog.Title>
              <Dialog.Content>
                <View className="flex flex-row justify-between ">
                  <Paragraph>Restaurant Contact : 0715280146</Paragraph>

                  <TouchableOpacity
                    className="flex flex-col justify-center items-center"
                    onPress={handleClipBoard}
                  >
                    <MaterialCommunityIcons
                      name="clipboard-check-multiple-outline"
                      size={24}
                      color="black"
                    />
                    {copied && <Text>Copied</Text>}
                  </TouchableOpacity>
                </View>
                <ButtonNative title="Make Phone Call" onPress={triggerCall} />
                <ButtonNative
                  title="Visit Restaurant"
                  className="m-2"
                  style={{ backgroundColor: color.primary, margin: 10 }}
                  onPress={() => {
                    Alert.alert("Visit Restaurant", "Coming Soon");
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  style={{ backgroundColor: color.primary }}
                  onPress={() => {
                    Alert.alert("Visit Restaurant", "Coming Soon");
                  }}
                >
                  Go
                </Button>

                <Button onPress={hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <View style={{}}>
            {/* WELCOME TEXT */}
            <LinearGradient
              colors={[color.primary, color.third, "transparent"]}
              style={styles.background}
              start={{ x: -0.1, y: 0 }}
              end={{ x: 1.5, y: 0.7 }}
            >
              <View>
                <Text className={`text-lg text-center`} style={{}}>
                  Welcome to Dishi!!
                </Text>
                <Text className={`text-lg text-center`}>
                  Get anymeal with any budget
                </Text>
              </View>
            </LinearGradient>

            {/* SEARCH BOX */}

            <View style={styles.searchingContainer}>
              <TextInput
                className="px-5"
                placeholder="Search Food"
                value={search}
                style={[styles.textInput]}
                onChangeText={(text) => setSearch(text)}
              ></TextInput>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <Text style={{ color: color.third, paddingTop: 2 }}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mx-2" style={styles.budgetSlider}>
              <Text
                style={[styles.budgetText, { color: color.primary }]}
                className="p-1"
              >
                Sort by Price
              </Text>
              <Slider
                value={budget}
                onValueChange={(value) => setBudget(value)}
                minimumValue={0}
                maximumValue={3000}
                step={50}
                minimumTrackTintColor={color.secondary}
                maximumTrackTintColor={color.disabled}
                thumbTintColor={color.primary}
              />
              <Text className="m-2">Maximum Price: {budget}</Text>
            </View>
          </View>

          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={({ item }) => renderItem(item)}
            ListHeaderComponent={
              <FlatList
                data={[1, 2]}
                renderItem={({ item }) => (
                  <>
                    <Image
                      source={add}
                      style={{ width: 200, height: "100%" }}
                    />
                    <Image
                      source={adds2}
                      style={{ width: 200, height: "100%" }}
                    />
                  </>
                )}
                horizontal={true}
                style={{ width: "100%", height: 150 }}
              />
            }
          />
        </View>
      </Provider>
      {/* <MyTabs /> */}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: color.third,
    color: color.primary,
  },
  searchingContainer: {
    height: 40,
    flexDirection: "row",
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
  addsContainer: {},
});
