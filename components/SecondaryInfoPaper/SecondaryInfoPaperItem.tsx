import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Caption, Surface, Title } from "react-native-paper";
import Colors from "../../constants/Colors";
import { SecondaryData } from "../../screens/ConfigScreen";

interface Props {
  secondary: SecondaryData;
  highlight?: string;
}

const SecondaryInfoPaperItem = ({ secondary, highlight }: Props) => {
  return (
    <Surface style={highlight === secondary.title ? styles.surfaceHighlight : styles.surface}>
      <View style={styles.header}>
        <Title>{secondary.title}</Title>
        <Text>{secondary.category}</Text>
      </View>
      <Caption style={{ marginTop: -10 }}>({secondary.type})</Caption>
      <Text style={{ color: "#202020", fontFamily: "roboto-light-italic" }}>{secondary.description}</Text>
    </Surface>
  );
};

export default SecondaryInfoPaperItem;

const styles = StyleSheet.create({
  surface: {
    minHeight: 64,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: Colors.dark.grey,
  },
  surfaceHighlight: {
    minHeight: 64,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: Colors.dark.grey,
    borderColor: Colors.dark.yellow,
    borderWidth: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
