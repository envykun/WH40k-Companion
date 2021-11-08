import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface Props {
  visible: boolean;
  hideModal: any;
  children: ReactElement;
}

const CustomModal = ({ visible, hideModal, children }: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  },
});
