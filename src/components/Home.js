import {
  StyleSheet,
  Text,
  View,
  Image,
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
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import call from "react-native-phone-call";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import color from "./colors";
import Restaraunts from "./Restaraunts";
import data from "./data";

export default function Home() {
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
    call({
      number: "9093900003",
      prompt: false,
      skipCanOpen: false,
    }).catch(console.error);
  };

  const renderItem = (item) => {
    return (
      <>
        <Restaraunts
          imagesrc={adds2}
          handlePress={() => handleSearchReults(item)}
          RestarauntName={item.name}
          RestarauntDescription={item.description}
          RestarauntContacts={item.contacts}
          RestarauntRatings={item.ratings}
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
                <View className="flex flex-col mt-3 justify-center items-center">
                  <TouchableOpacity
                    style={styles.AlertButton}
                    onPress={triggerCall}
                  >
                    <Text className="text-center" style={""}>
                      Make Phone Call
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.AlertButton}
                    onPress={() => {
                      Alert.alert("Visit Restaurant", "Coming Soon");
                    }}
                  >
                    <Text className="text-center" style={""}>
                      Visit Restaurant
                    </Text>
                  </TouchableOpacity>
                </View>
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
                  Restaraunts near you
                </Text>
              </View>
            </LinearGradient>
          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </Provider>
    </>
  );
}

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
  AlertButton: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
    color: "white",
    padding: 10,
    margin: 5,
    width: "60%",
    borderRadius: 5,
  },
});
