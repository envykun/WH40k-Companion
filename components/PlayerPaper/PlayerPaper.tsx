import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import Dropdown from "../Dropdown/Dropdown";
import PlayerPaperItem, { Player, TeamProps } from "./PlayerPaperItem";
import codicesData from "../../data/codices.json";

interface Props {
  playerCount: number;
  getTeamOneData?: any;
  getTeamTwoData?: any;
}

const PlayerPaper = ({ playerCount, getTeamOneData, getTeamTwoData }: Props) => {
  const codices = codicesData.codex.sort((a: any, b: any) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

  const [playerOneTeamOne, setPlayerOneTeamOne] = useState<Player>();
  const [playerTwoTeamOne, setPlayerTwoTeamOne] = useState<Player>();

  const [playerOneTeamTwo, setPlayerOneTeamTwo] = useState<Player>();
  const [playerTwoTeamTwo, setPlayerTwoTeamTwo] = useState<Player>();

  useEffect(() => {
    const teamOne: TeamProps = { playerOne: playerOneTeamOne, playerTwo: playerTwoTeamOne };
    const teamTwo: TeamProps = { playerOne: playerOneTeamTwo, playerTwo: playerTwoTeamTwo };
    getTeamOneData(teamOne);
    getTeamTwoData(teamTwo);
  }, [playerOneTeamOne, playerOneTeamTwo, playerTwoTeamOne, playerTwoTeamTwo]);

  const renderPlayerInputs = (count: string): ReactElement => {
    switch (count) {
      case "1":
        return (
          <>
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerOneTeamOne} />
            <PlayerPaperItem team="Team 2" list={codices} getPlayerData={setPlayerOneTeamTwo} />
          </>
        );
      case "2":
        return (
          <>
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerOneTeamOne} />
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerTwoTeamOne} />
            <PlayerPaperItem team="Team 2" list={codices} getPlayerData={setPlayerOneTeamTwo} />
          </>
        );
      case "3":
        return (
          <>
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerOneTeamOne} />
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerTwoTeamOne} />
            <PlayerPaperItem team="Team 2" list={codices} getPlayerData={setPlayerOneTeamTwo} />
            <PlayerPaperItem team="Team 2" list={codices} getPlayerData={setPlayerTwoTeamTwo} />
          </>
        );
      default:
        return (
          <>
            <PlayerPaperItem team="Team 1" list={codices} getPlayerData={setPlayerOneTeamOne} />
            <PlayerPaperItem team="Team 2" list={codices} getPlayerData={setPlayerOneTeamTwo} />
          </>
        );
    }
  };

  return (
    <Surface style={styles.surface}>
      <Text style={styles.title}>Players</Text>
      {playerCount && renderPlayerInputs(playerCount.toString())}
    </Surface>
  );
};

export default PlayerPaper;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#1E1E1E",
    padding: 8,
    marginBottom: 12,
    maxWidth: 600,
    width: "100%",
  },
  title: {
    fontFamily: "roboto-regular",
    fontSize: 20,
    color: "#fff",
  },
});
