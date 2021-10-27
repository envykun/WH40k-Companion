import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import CPCounter from "../components/CPCounter/CPCounter";
import GameTabs from "../components/GameTabs/GameTabs";
import PlayerTag from "../components/PlayerTag/PlayerTag";
import { Mission } from "./ConfigScreen";

interface Props {
  edition: string;
  route: any;
}

export interface SecondaryPointsProps {
  teamOne: Array<{ name: string; count: number }>;
  teamTwo: Array<{ name: string; count: number }>;
}

export interface PrimaryPoints {
  teamOne: number;
  teamTwo: number;
}

const GameScreen = ({ route }: Props) => {
  const primary = route.params.primary;
  const secondary: SecondaryPointsProps = route.params.secondary;
  const playerOneName = route.params.teamOne ? route.params.teamOne.playerOne.name : "";
  const playerOneCodex = route.params.teamOne ? route.params.teamOne.playerOne.codex : "";
  const playerOneCP = route.params.teamOne ? route.params.teamOne.playerOne.cp : 0;
  const playerTwoName = route.params.teamTwo ? route.params.teamTwo.playerOne.name : "";
  const playerTwoCodex = route.params.teamTwo ? route.params.teamTwo.playerOne.codex : "";
  const playerTwoCP = route.params.teamTwo ? route.params.teamTwo.playerOne.cp : 0;

  const [battleRound, setBattleRound] = useState(0);
  const [primaryPoints, setPrimaryPoints] = useState({ teamOne: 0, teamTwo: 0 });
  const [secondaryPoints, setSecondaryPoints] = useState(secondary);
  const [teamOneVP, setTeamOneVP] = useState(0);
  const [teamTwoVP, setTeamTwoVP] = useState(0);

  const [timer, setTimer] = useState(0);

  const edition = "9th: Eternal War - Combat Patrol";

  useEffect(() => {
    let timer = setInterval(() => setTimer((oldTime) => oldTime + 1), 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("Secondary", secondaryPoints);
  }, [secondaryPoints]);

  function handleNextTurn() {}

  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <View style={styles.overviewInner}>
          <View style={styles.playerTag}>
            <PlayerTag playerName={playerOneName} codex={playerOneCodex} vp={teamOneVP} active={true} />
          </View>
          <View style={styles.battleRoundContainer}>
            <View style={styles.timer}>
              <Text style={{ fontSize: 24, color: "#fff" }}>{new Date(timer * 1000).toISOString().substr(11, 8)}</Text>
            </View>
            <Surface style={styles.battleRound}>
              <Text style={{ fontSize: 72, lineHeight: 74, textAlign: "center", marginBottom: -10 }}>{battleRound}</Text>
              <Text style={{}}>Battle</Text>
              <Text>Round</Text>
            </Surface>
          </View>
          <View style={styles.playerTag}>
            <PlayerTag playerName={playerTwoName} codex={playerTwoCodex} vp={teamTwoVP} reverse active={false} />
          </View>
        </View>
        <View style={styles.overviewInner}>
          <View style={styles.cp}>
            <CPCounter initialValue={playerOneCP} />
          </View>
          <View style={styles.currentCodex}>
            <Surface style={{ backgroundColor: "#C4C4C4", paddingVertical: 4, paddingHorizontal: 16, borderRadius: 4 }}>
              <Text>Current Turn Codex</Text>
            </Surface>
          </View>
          <View style={styles.cp}>
            <CPCounter initialValue={playerTwoCP} />
          </View>
        </View>
      </View>
      <View style={styles.tabs}>
        <GameTabs
          primaryCount={primaryPoints}
          primaryTitle={primary.title}
          primaryDescription={primary.briefing}
          edition={edition}
          secondary={secondaryPoints}
          getSecondaryPoints={setSecondaryPoints}
          handleNextTurn
        />
      </View>
      <View style={styles.button}>
        <Button mode="contained" color="#C7B300" onPress={() => handleNextTurn()}>
          Next Turn
        </Button>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingTop: 5,
    backgroundColor: "#101010",
  },
  overview: { flex: 1 },
  overviewInner: {
    flex: 1,
    flexDirection: "row",
  },
  playerTag: {
    flex: 1,
  },
  cp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: { flex: 2 },
  button: { justifyContent: "center", alignItems: "center", padding: 20 },
  battleRoundContainer: {
    position: "relative",
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  battleRound: {
    position: "absolute",
    top: 40,
    height: 110,
    width: 80,
    backgroundColor: "#C7B300",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    position: "absolute",
    top: 6,
  },
  currentCodex: {
    justifyContent: "center",
  },
});
