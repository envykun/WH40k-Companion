import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryPoints, SecondaryPointsProps } from "../../screens/GameScreen";
import { SecondaryPoints } from "../GameTabs/GameTabs";
import PrimaryPaper from "../PrimaryPaper/PrimaryPaper";
import SecondaryGamePaper from "../SecondaryGamePaper/SecondaryGamePaper";

interface Props {
  primaryCount: PrimaryPoints;
  primaryTitle: string;
  primaryDescription: string;
  edition: string;
  secondary: SecondaryPointsProps | undefined;
  getSecondaryPoints?: any;
  secondaryPoints?: SecondaryPoints | undefined;
  hasInput?: boolean;
}

const TabContainerPaper = ({ primaryCount, primaryTitle, primaryDescription, edition, secondary, hasInput }: Props) => {
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");
  const [valueFour, setValueFour] = useState("");
  const [valueFive, setValueFive] = useState("");
  const [valueSix, setValueSix] = useState("");

  console.log("Value One", valueOne);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.primary}>
        <PrimaryPaper primaryCount={primaryCount} primaryTitle={primaryTitle} primaryDescription={primaryDescription} edition={edition} />
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
  primary: {
    flex: 2,
  },
  secondary: {
    flex: 3,
    marginTop: 16,
  },
});
