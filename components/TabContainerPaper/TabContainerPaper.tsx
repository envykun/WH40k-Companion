import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Mission } from "../../screens/ConfigScreen";
import { Points, SecondaryPointsProps } from "../../screens/GameScreen";
import { Editions } from "../../types";
import { SecondaryPoints } from "../GameTabs/GameTabs";
import PrimaryPaper from "../PrimaryPaper/PrimaryPaper";
import SecondaryGamePaper from "../SecondaryGamePaper/SecondaryGamePaper";

interface Props {
  primaryCount: Points;
  primaryTitle: string;
  primaryDescription: string;
  getPrimaryCount?: any;
  edition: Editions;
  battleSize: string;
  secondary: SecondaryPointsProps | undefined;
  getSecondaryPoints?: any;
  secondaryPoints: SecondaryPoints;
  hasInput?: boolean;
  mission: Mission;
}

const TabContainerPaper = ({
  primaryCount,
  primaryTitle,
  primaryDescription,
  getPrimaryCount,
  edition,
  battleSize,
  secondary,
  hasInput,
  getSecondaryPoints,
  secondaryPoints,
  mission,
}: Props) => {
  const [valueOne, setValueOne] = useState(secondaryPoints.teamOne.s1);
  const [valueTwo, setValueTwo] = useState(secondaryPoints.teamOne.s2);
  const [valueThree, setValueThree] = useState(secondaryPoints.teamOne.s3);
  const [valueFour, setValueFour] = useState(secondaryPoints.teamTwo.s1);
  const [valueFive, setValueFive] = useState(secondaryPoints.teamTwo.s2);
  const [valueSix, setValueSix] = useState(secondaryPoints.teamTwo.s3);

  useEffect(() => {
    const points: SecondaryPoints = {
      teamOne: { s1: valueOne, s2: valueTwo, s3: valueThree },
      teamTwo: { s1: valueFour, s2: valueFive, s3: valueSix },
    };
    hasInput && getSecondaryPoints(points);
  }, [valueOne, valueTwo, valueThree, valueFour, valueFive, valueSix]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.primary}>
        <PrimaryPaper
          primaryCount={primaryCount}
          primaryTitle={primaryTitle}
          primaryDescription={primaryDescription}
          edition={edition}
          battleSize={battleSize}
          hasInput={hasInput}
          getPrimaryCount={getPrimaryCount}
          mission={mission}
        />
      </View>
      <View style={styles.secondary}>
        <SecondaryGamePaper
          secondary={secondary}
          hasInput={hasInput}
          getValueOne={setValueOne}
          getValueTwo={setValueTwo}
          getValueThree={setValueThree}
          getValueFour={setValueFour}
          getValueFive={setValueFive}
          getValueSix={setValueSix}
          valueOne={valueOne}
          valueTwo={valueTwo}
          valueThree={valueThree}
          valueFour={valueFour}
          valueFive={valueFive}
          valueSix={valueSix}
          edition={edition}
        />
      </View>
    </View>
  );
};

export default TabContainerPaper;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  primary: {},
  secondary: {
    flex: 1,
    marginTop: 16,
  },
});
