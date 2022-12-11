import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Button,
  Provider,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";

export default function FitnessTracker({ navigation }) {
  const [visible, setVisible] = React.useState(true);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  React.useEffect(() => {
    showDialog();
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      hideDialog();
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Fitness Tracker</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Coming Soon</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigation.goBack()}>Coming Soon</Button>
              <Button
                onPress={() => {
                  navigation.goBack();
                  hideDialog();
                  showDialog()
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({});
