import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Caption, FAB, IconButton, Menu, Surface } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ImageTile from "./ImageTile";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

interface Props {
  getImages: Dispatch<SetStateAction<string[]>>;
  historyImages: Array<string>;
  isEndScreen?: boolean;
  setShowMax: Dispatch<SetStateAction<{ show: boolean; source: string }>>;
}

const ImagePickerPaper = ({ getImages, historyImages, isEndScreen, setShowMax }: Props) => {
  const [images, setImages] = useState<Array<string>>(historyImages || []);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

  useEffect(() => {
    getImages(images);
  }, [images]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result as ImageInfo;
      setImages((oldArray) => [...oldArray, uri]);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result as ImageInfo;
      setImages((oldArray) => [...oldArray, uri]);
    }
  };

  const deleteImage = (source: string): void => {
    setImages(images.filter((image) => image !== source));
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <ImageTile
        key={index}
        source={image}
        isDeleteMode={isEndScreen ? isDeleteMode : false}
        setDeleteMode={setIsDeleteMode}
        deleteImage={deleteImage}
        setShowMax={setShowMax}
      />
    ));
  };

  return (
    <View>
      <View style={{ alignItems: "center", paddingTop: 8 }}>
        {images.length > 0 ? renderImages() : <Text style={{ alignSelf: "flex-start" }}>No pictures added.</Text>}
      </View>
      {isEndScreen && (
        <View style={styles.iconContainer}>
          <View>
            <Menu
              style={styles.menu}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <Surface style={styles.surface}>
                  <IconButton
                    icon={() => <MaterialCommunityIcons name="plus" size={38} color="black" />}
                    size={26}
                    onPress={() => setShowMenu(true)}
                    style={{ backgroundColor: Colors.dark.yellow, elevation: 5 }}
                  />
                </Surface>
              }
            >
              <Menu.Item
                icon={() => <FontAwesome name="camera" size={24} color="black" />}
                onPress={() => {
                  setShowMenu(false);
                  takeImage();
                }}
                title="Camera"
              />
              <Menu.Item
                icon={() => <FontAwesome name="picture-o" size={24} color="black" />}
                onPress={() => {
                  setShowMenu(false);
                  pickImage();
                }}
                title="Galery"
              />
            </Menu>
          </View>
          <Caption>Add Image</Caption>
        </View>
      )}
    </View>
  );
};

export default ImagePickerPaper;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  surface: {
    borderRadius: 100,
    paddingVertical: 0,
    backgroundColor: Colors.dark.yellow,
  },
  menu: {
    marginTop: 26,
    marginLeft: 26,
  },
});
