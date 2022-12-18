import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

const AlertBox = ({
  AlertTitle,
  ParagraphText,
  AlertDialogContent,
  AlertDialogAction,
}) => {
  const [visible, setVisible] = React.useState(true);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{AlertTitle}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{ParagraphText}</Paragraph>
            {AlertDialogContent}
          </Dialog.Content>
          <Dialog.Actions>
            {AlertDialogAction}
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AlertBox;
