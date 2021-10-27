import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, Surface } from "react-native-paper";

interface Props {
  initialValue: number;
}

const CPCounter = ({ initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);
  return (
    <Surface style={styles.container}>
      <View>
        <IconButton
          icon={() => <Ionicons name="ios-remove-circle-outline" size={32} color="black" />}
          size={24}
          onPress={() => setValue((value) => value - 1)}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cpText}>{value} CP</Text>
      </View>
      <View>
        <IconButton
          icon={() => <Ionicons name="ios-add-circle-outline" size={32} color="black" />}
          size={24}
          onPress={() => setValue((value) => value + 1)}
        />
      </View>
    </Surface>
  );
};

export default CPCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#C4C4C4",
    elevation: 3,
  },
  cpText: {
    fontSize: 36,
  },
  textContainer: {
    justifyContent: "center",
  },
});
