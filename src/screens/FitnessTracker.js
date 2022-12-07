import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AlertBox from "../components/AlertBox";
import { Button, Provider } from "react-native-paper";

export default function FitnessTracker() {
  return (
    <View style={{ flex: 1 }}>
      <Provider>
        <AlertBox
          AlertTitle="Fitness Tracker"
          ParagraphText="Coming Soon"
          AlertDialogAction={
            <Button onPress={() => navigation.goBack()}>Coming Soon</Button>
          }
        />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({});
