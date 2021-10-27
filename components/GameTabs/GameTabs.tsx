import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { PrimaryPoints, SecondaryPointsProps } from "../../screens/GameScreen";
import TabContainerPaper from "../TabContainerPaper/TabContainerPaper";

interface Props {
  primaryCount: PrimaryPoints;
  primaryTitle: string;
  primaryDescription: string;
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

const GameTabs = ({ primaryCount, primaryTitle, primaryDescription, edition, secondary, getSecondaryPoints, handleNextTurn }: Props) => {
  const [currentTab, setCurrentTab] = useState("0");

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

  const [secondaryCompletePointsTeamOne, setSecondaryCompletePointsTeamOne] = useState(0);
  const [secondaryCompletePointsTeamTwo, setSecondaryCompletePointsTeamTwo] = useState(0);

  const [battleRoundOneSecondaryPoints, setBattleRoundOneSecondaryPoints] = useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundTwoSecondaryPoints, setBattleRoundTwoSecondaryPoints] = useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundThreeSecondaryPoints, setBattleRoundThreeSecondaryPoints] = useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundFourSecondaryPoints, setBattleRoundFourSecondaryPoints] = useState<SecondaryPoints>(emptySecPoints);
  const [battleRoundFiveSecondaryPoints, setBattleRoundFiveSecondaryPoints] = useState<SecondaryPoints>(emptySecPoints);

  useEffect(() => {
    console.log("One", battleRoundOneSecondaryPoints);
  }, [battleRoundOneSecondaryPoints]);

  useEffect(() => {
    console.log("Two", battleRoundTwoSecondaryPoints);
  }, [battleRoundTwoSecondaryPoints]);

  useEffect(() => {
    console.log("Three", battleRoundThreeSecondaryPoints);
  }, [battleRoundThreeSecondaryPoints]);

  useEffect(() => {
    console.log("Four", battleRoundFourSecondaryPoints);
  }, [battleRoundFourSecondaryPoints]);

  useEffect(() => {
    console.log("Five", battleRoundFiveSecondaryPoints);
  }, [battleRoundOneSecondaryPoints]);

  const renderTabView = () => {
    switch (currentTab) {
      case "0":
        return (
          <TabContainerPaper
            key={"0"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
          />
        );
      case "1":
        return (
          <TabContainerPaper
            key={"1"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
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
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            hasInput
          />
        );
      case "3":
        return (
          <TabContainerPaper
            key={"3"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            hasInput
          />
        );
      case "4":
        return (
          <TabContainerPaper
            key={"4"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            hasInput
          />
        );
      case "5":
        return (
          <TabContainerPaper
            key={"5"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
            hasInput
          />
        );
      default:
        return (
          <TabContainerPaper
            key={"0"}
            primaryCount={primaryCount}
            primaryTitle={primaryTitle}
            primaryDescription={primaryDescription}
            edition={edition}
            secondary={secondary}
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
