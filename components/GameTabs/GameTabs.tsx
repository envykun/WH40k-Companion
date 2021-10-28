import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Points, SecondaryPointsProps } from "../../screens/GameScreen";
import TabContainerPaper from "../TabContainerPaper/TabContainerPaper";

interface Props {
  primaryCount: Points;
  primaryTitle: string;
  primaryDescription: string;
  getPrimaryPoints: any;
  edition: string;
  secondary: SecondaryPointsProps | undefined;
  getSecondaryPoints?: any;
  handleNextTurn: any;
}

interface Secondaries {
  s1: string;
  s2: string;
  s3: string;
}

export interface SecondaryPoints {
  teamOne: Secondaries;
  teamTwo: Secondaries;
}

const GameTabs = ({
  primaryCount,
  primaryTitle,
  primaryDescription,
  getPrimaryPoints,
  edition,
  secondary,
  getSecondaryPoints,
  handleNextTurn,
}: Props) => {
  const [currentTab, setCurrentTab] = useState("0");

  const emptyPrimPoints: Points = { teamOne: 0, teamTwo: 0 };
  const emptySecPoints: SecondaryPoints = {
    teamOne: {
      s1: "",
      s2: "",
      s3: "",
    },
    teamTwo: {
      s1: "",
      s2: "",
      s3: "",
    },
  };

  const [primaryCompletePoints, setPrimaryCompletePoints] =
    useState<Points>(emptyPrimPoints);

  const [battleRoundOnePrimaryPoints, setBattleRoundOnePrimaryPoints] =
    useState<Points>(emptyPrimPoints);
  const [battleRoundTwoPrimaryPoints, setBattleRoundTwoPrimaryPoints] =
    useState<Points>(emptyPrimPoints);
  const [battleRoundThreePrimaryPoints, setBattleRoundThreePrimaryPoints] =
    useState<Points>(emptyPrimPoints);
  const [battleRoundFourPrimaryPoints, setBattleRoundFourPrimaryPoints] =
    useState<Points>(emptyPrimPoints);
  const [battleRoundFivePrimaryPoints, setBattleRoundFivePrimaryPoints] =
    useState<Points>(emptyPrimPoints);

  const [secondaryCompletePoints, setSecondaryCompletePoints] =
    useState<SecondaryPoints>(emptySecPoints);

  const [battleRoundOneSecondaryPoints, setBattleRoundOneSecondaryPoints] =
    useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundTwoSecondaryPoints, setBattleRoundTwoSecondaryPoints] =
    useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundThreeSecondaryPoints, setBattleRoundThreeSecondaryPoints] =
    useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundFourSecondaryPoints, setBattleRoundFourSecondaryPoints] =
    useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundFiveSecondaryPoints, setBattleRoundFiveSecondaryPoints] =
    useState<SecondaryPoints>(emptySecPoints);

  useEffect(() => {
    console.log("PRIMARY CHANGED", battleRoundOnePrimaryPoints);
    calculatePrimaryPoints();
  }, [
    battleRoundOnePrimaryPoints,
    battleRoundTwoPrimaryPoints,
    battleRoundThreePrimaryPoints,
    battleRoundFourPrimaryPoints,
    battleRoundFivePrimaryPoints,
  ]);

  useEffect(() => {
    calculateSecondaryPoints();
  }, [
    battleRoundOneSecondaryPoints,
    battleRoundTwoSecondaryPoints,
    battleRoundThreeSecondaryPoints,
    battleRoundFourSecondaryPoints,
    battleRoundFiveSecondaryPoints,
  ]);

  function calculatePrimaryPoints() {
    let teamOneC = 0;
    let teamTwoC = 0;

    const allBattleRounds = [
      battleRoundOnePrimaryPoints,
      battleRoundTwoPrimaryPoints,
      battleRoundThreePrimaryPoints,
      battleRoundFourPrimaryPoints,
      battleRoundFivePrimaryPoints,
    ];

    allBattleRounds.map((br) => {
      teamOneC += br.teamOne;
      teamTwoC += br.teamTwo;
    });

    setPrimaryCompletePoints({ teamOne: teamOneC, teamTwo: teamTwoC });
    getPrimaryPoints({ teamOne: teamOneC, teamTwo: teamTwoC });
  }

  function calculateSecondaryPoints() {
    let teamOneSec1 = 0;
    let teamOneSec2 = 0;
    let teamOneSec3 = 0;
    let teamTwoSec1 = 0;
    let teamTwoSec2 = 0;
    let teamTwoSec3 = 0;
    const allBattleRounds = [
      battleRoundOneSecondaryPoints,
      battleRoundTwoSecondaryPoints,
      battleRoundThreeSecondaryPoints,
      battleRoundFourSecondaryPoints,
      battleRoundFiveSecondaryPoints,
    ];
    allBattleRounds.map((br) => {
      br.teamOne.s1 !== "" && (teamOneSec1 += parseInt(br.teamOne.s1));
      br.teamOne.s2 !== "" && (teamOneSec2 += parseInt(br.teamOne.s2));
      br.teamOne.s3 !== "" && (teamOneSec3 += parseInt(br.teamOne.s3));

      br.teamTwo.s1 !== "" && (teamTwoSec1 += parseInt(br.teamTwo.s1));
      br.teamTwo.s2 !== "" && (teamTwoSec2 += parseInt(br.teamTwo.s2));
      br.teamTwo.s3 !== "" && (teamTwoSec3 += parseInt(br.teamTwo.s3));
    });
    setSecondaryCompletePoints({
      teamOne: {
        s1: teamOneSec1.toString(),
        s2: teamOneSec2.toString(),
        s3: teamOneSec3.toString(),
      },
      teamTwo: {
        s1: teamTwoSec1.toString(),
        s2: teamTwoSec2.toString(),
        s3: teamTwoSec3.toString(),
      },
    });
    getSecondaryPoints({
      teamOne: teamOneSec1 + teamOneSec2 + teamOneSec3,
      teamTwo: teamTwoSec1 + teamTwoSec2 + teamTwoSec3,
    });
  }

  const renderTabView = () => {
    switch (currentTab) {
      case "0":
        return (
          <TabContainerPaper
            key={"0"}
            primaryCount={primaryCompletePoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            secondaryPoints={secondaryCompletePoints}
          />
        );
      case "1":
        return (
          <TabContainerPaper
            key={"1"}
            primaryCount={battleRoundOnePrimaryPoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            getPrimaryCount={setBattleRoundOnePrimaryPoints}
            edition={edition}
            secondary={secondary}
            hasInput
            secondaryPoints={battleRoundOneSecondaryPoints}
            getSecondaryPoints={setBattleRoundOneSecondaryPoints}
          />
        );
      case "2":
        return (
          <TabContainerPaper
            key={"2"}
            primaryCount={battleRoundTwoPrimaryPoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            getPrimaryCount={setBattleRoundTwoPrimaryPoints}
            edition={edition}
            secondary={secondary}
            hasInput
            secondaryPoints={battleRoundTwoSecondaryPoints}
            getSecondaryPoints={setBattleRoundTwoSecondaryPoints}
          />
        );
      case "3":
        return (
          <TabContainerPaper
            key={"3"}
            primaryCount={battleRoundThreePrimaryPoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            getPrimaryCount={setBattleRoundThreePrimaryPoints}
            edition={edition}
            secondary={secondary}
            hasInput
            secondaryPoints={battleRoundThreeSecondaryPoints}
            getSecondaryPoints={setBattleRoundThreeSecondaryPoints}
          />
        );
      case "4":
        return (
          <TabContainerPaper
            key={"4"}
            primaryCount={battleRoundFourPrimaryPoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            getPrimaryCount={setBattleRoundFourPrimaryPoints}
            edition={edition}
            secondary={secondary}
            hasInput
            secondaryPoints={battleRoundFourSecondaryPoints}
            getSecondaryPoints={setBattleRoundFourSecondaryPoints}
          />
        );
      case "5":
        return (
          <TabContainerPaper
            key={"5"}
            primaryCount={battleRoundFivePrimaryPoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            getPrimaryCount={setBattleRoundFivePrimaryPoints}
            edition={edition}
            secondary={secondary}
            hasInput
            secondaryPoints={battleRoundFiveSecondaryPoints}
            getSecondaryPoints={setBattleRoundFiveSecondaryPoints}
          />
        );
      default:
        return (
          <TabContainerPaper
            key={"0"}
            primaryCount={primaryCompletePoints}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            secondaryPoints={secondaryCompletePoints}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabButtons}>
        <Button
          mode="text"
          onPress={() => setCurrentTab("0")}
          color={currentTab === "0" ? "#C7B300" : "white"}
          style={currentTab === "0" && styles.active}
        >
          Overview
        </Button>
        <Button
          mode="text"
          onPress={() => setCurrentTab("1")}
          color={currentTab === "1" ? "#C7B300" : "white"}
          style={currentTab === "1" && styles.active}
        >
          BR 1
        </Button>
        <Button
          mode="text"
          onPress={() => setCurrentTab("2")}
          color={currentTab === "2" ? "#C7B300" : "white"}
          style={currentTab === "2" && styles.active}
        >
          BR 2
        </Button>
        <Button
          mode="text"
          onPress={() => setCurrentTab("3")}
          color={currentTab === "3" ? "#C7B300" : "white"}
          style={currentTab === "3" && styles.active}
        >
          Br 3
        </Button>
        <Button
          mode="text"
          onPress={() => setCurrentTab("4")}
          color={currentTab === "4" ? "#C7B300" : "white"}
          style={currentTab === "4" && styles.active}
        >
          BR 4
        </Button>
        <Button
          mode="text"
          onPress={() => setCurrentTab("5")}
          color={currentTab === "5" ? "#C7B300" : "white"}
          style={currentTab === "5" && styles.active}
        >
          BR 5
        </Button>
      </View>
      <View style={styles.tabViewContainer}>{renderTabView()}</View>
    </View>
  );
};

export default GameTabs;

const styles = StyleSheet.create({
  tabButtons: {
    flexDirection: "row",
    overflow: "scroll",
  },
  active: {
    borderBottomWidth: 1,
    borderBottomColor: "#C7B300",
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  tabViewContainer: {
    marginTop: 10,
    flex: 1,
  },
});
