import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { PrimaryPoints } from "../../screens/GameScreen";

interface Props {
  primaryCount: PrimaryPoints;
  primaryDescription: string;
  primaryTitle: string;
  edition: string;
}

const PrimaryPaper = ({ primaryCount, primaryDescription, primaryTitle, edition }: Props) => {
  return (
    <Surface style={styles.surface}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Primary</Text>
        <View style={{ flexDirection: "row", flex: 1, position: "relative" }}>
          <Text style={styles.headerTextMiddle}>{primaryTitle}</Text>
          <IconButton
            icon={() => <Ionicons name="ios-information-circle" size={32} color="white" />}
            onPress={() => console.log("Show Info")}
            style={{ position: "absolute", top: -8, right: 40 }}
          />
        </View>
        <Text style={styles.headerTextEnd}>{edition}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{primaryDescription}</Text>
        </View>
        <View style={styles.points}>
          <Text style={styles.pointText}>{primaryCount.teamOne} / 45</Text>
          <Text style={styles.pointText}>{primaryCount.teamTwo} / 45</Text>
        </View>
      </View>
    </Surface>
  );
};

export default PrimaryPaper;

const styles = StyleSheet.create({
  surface: {
    height: "100%",
    backgroundColor: "#1E1E1E",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  header: {
    width: "100%",
    flexDirection: "row",
  },
  headerText: {
    color: "#C4C4C4",
    flex: 1,
  },
  headerTextMiddle: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontSize: 26,
  },
  headerTextEnd: {
    color: "#C4C4C4",
    flex: 1,
    textAlign: "right",
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    color: "#fff",
    fontFamily: "roboto-light-italic",
  },
  body: {
    padding: 8,
    flex: 1,
  },
  pointText: {
    color: "#fff",
    fontSize: 32,
  },
  points: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
