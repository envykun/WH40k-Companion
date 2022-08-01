import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";
import { SecondaryPointsProps } from "../../screens/GameScreen";
import Secondary from "./Secondary";
import missionData from "../../data/missions.json";
import { SecondaryData } from "../../screens/ConfigScreen";
import { useGetMissions } from "../../hooks/useGetData";
import { Editions } from "../../types";

interface Props {
  secondary: SecondaryPointsProps | undefined;
  hasInput?: boolean;
  getValueOne: any;
  getValueTwo: any;
  getValueThree: any;
  getValueFour: any;
  getValueFive: any;
  getValueSix: any;
  valueOne: string;
  valueTwo: string;
  valueThree: string;
  valueFour: string;
  valueFive: string;
  valueSix: string;
  edition: Editions;
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
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
  valueFive,
  valueSix,
  edition,
}: Props) => {
  const { data, isLoading } = useGetMissions(edition);
  const secondaryObjectives: Array<SecondaryData> = !isLoading && data && data.secondaries;

  return (
    <Surface style={styles.surface}>
      {isLoading || data === null ? (
        <ActivityIndicator animating />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Secondaries</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.teamOne}>
              <Secondary
                title={secondary?.teamOne[0].name}
                count={valueOne}
                hasInput={hasInput}
                getValue={getValueOne}
                secondaries={secondaryObjectives}
                edition={edition}
              />
              <Secondary
                title={secondary?.teamOne[1].name}
                count={valueTwo}
                hasInput={hasInput}
                getValue={getValueTwo}
                secondaries={secondaryObjectives}
                edition={edition}
              />
              <Secondary
                title={secondary?.teamOne[2].name}
                count={valueThree}
                hasInput={hasInput}
                getValue={getValueThree}
                secondaries={secondaryObjectives}
                edition={edition}
              />
            </View>
            <View style={styles.teamTwo}>
              <Secondary
                title={secondary?.teamTwo[0].name}
                count={valueFour}
                hasInput={hasInput}
                getValue={getValueFour}
                secondaries={secondaryObjectives}
                edition={edition}
              />
              <Secondary
                title={secondary?.teamTwo[1].name}
                edition={edition}
                count={valueFive}
                hasInput={hasInput}
                getValue={getValueFive}
                secondaries={secondaryObjectives}
              />
              <Secondary
                title={secondary?.teamTwo[2].name}
                count={valueSix}
                hasInput={hasInput}
                getValue={getValueSix}
                secondaries={secondaryObjectives}
                edition={edition}
              />
            </View>
          </View>
        </>
      )}
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
    flexWrap: "wrap",
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
