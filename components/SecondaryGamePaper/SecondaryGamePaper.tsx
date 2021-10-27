import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import { SecondaryPointsProps } from "../../screens/GameScreen";
import { SecondaryPoints } from "../GameTabs/GameTabs";
import Secondary from "./Secondary";

interface Props {
  secondary: SecondaryPointsProps | undefined;
  hasInput?: boolean;
  getValueOne: any;
  getValueTwo: any;
  getValueThree: any;
  getValueFour: any;
  getValueFive: any;
  getValueSix: any;
}

const SecondaryGamePaper = ({
  secondary,
  hasInput,
  getValueOne,
  getValueTwo,
  getValueThree,
  getValueFour,
  getValueFive,
  getValueSix,
}: Props) => {
  return (
    <Surface style={styles.surface}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Secondaries</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.teamOne}>
          <Secondary title={secondary?.teamOne[0].name} count={"0"} hasInput={hasInput} getValue={getValueOne} />
          <Secondary title={secondary?.teamOne[1].name} count={"2"} hasInput={hasInput} getValue={getValueTwo} />
          <Secondary title={secondary?.teamOne[2].name} count={""} hasInput={hasInput} getValue={getValueThree} />
        </View>
        <View style={styles.teamTwo}>
          <Secondary title={secondary?.teamTwo[0].name} count={""} hasInput={hasInput} getValue={getValueFour} />
          <Secondary title={secondary?.teamTwo[1].name} count={""} hasInput={hasInput} getValue={getValueFive} />
          <Secondary title={secondary?.teamTwo[2].name} count={""} hasInput={hasInput} getValue={getValueSix} />
        </View>
      </View>
    </Surface>
  );
};

export default SecondaryGamePaper;

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
  body: {
    padding: 8,
    flex: 1,
    flexDirection: "row",
  },
  teamOne: {
    flex: 1,
    paddingRight: 16,
  },
  teamTwo: {
    flex: 1,
    paddingLeft: 16,
  },
});
