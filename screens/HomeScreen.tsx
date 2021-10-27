import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("Config", { primary: { primaryTitle: "Incisive Strike", primaryDescription: "Something" } })}
      >
        Next
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
