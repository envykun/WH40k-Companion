import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Image, View, TouchableHighlight } from "react-native";
import { FAB, Surface } from "react-native-paper";

interface Props {
  source: string;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
  isDeleteMode: boolean;
  deleteImage: (source: string) => void;
  setShowMax: Dispatch<SetStateAction<{ show: boolean; source: string }>>;
}

const ImageTile = ({ source, isDeleteMode, setDeleteMode, deleteImage, setShowMax }: Props) => {
  return (
    <View style={styles.imageContainer}>
      <TouchableHighlight
        onLongPress={() => setDeleteMode(true)}
        onPress={() => {
          isDeleteMode ? setDeleteMode(false) : setShowMax({ show: true, source: source });
        }}
      >
        <Surface style={styles.surface}>
          <Image source={{ uri: source }} style={{ width: "100%", height: 260 }} />
        </Surface>
      </TouchableHighlight>
      {isDeleteMode && <FAB animated icon="close" small style={styles.fab} color="white" onPress={() => deleteImage(source)} />}
    </View>
  );
};

export default ImageTile;

const styles = StyleSheet.create({
  surface: {
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  imageContainer: {
    width: "100%",
    marginBottom: 8,
    position: "relative",
  },
  fab: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "red",
  },
});
