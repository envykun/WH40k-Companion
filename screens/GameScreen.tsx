import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Dialog, RadioButton, Subheading, Surface, Title } from "react-native-paper";
import CPCounter from "../components/CPCounter/CPCounter";
import CustomModal from "../components/CustomModal/CustomModal";
import GameTabs from "../components/GameTabs/GameTabs";
import HistoryModalContent from "../components/HistoryListItem/HistoryModalContent";
import PlayerTag from "../components/PlayerTag/PlayerTag";
import Colors from "../constants/Colors";
import { createHistoryJSON, GameHistory } from "../hooks/useFileSystem";
import { Mission } from "./ConfigScreen";

interface Props {
  edition: string;
  route: any;
  navigation: any;
}

export interface SecondaryPointsProps {
  teamOne: Array<{ name: string; count: number }>;
  teamTwo: Array<{ name: string; count: number }>;
}

export interface Points {
  teamOne: number;
  teamTwo: number;
}

export interface PointDetails {
  teamOne: {
    primary: {
      br1: number;
      br2: number;
      br3: number;
      br4: number;
      br5: number;
      total: number;
    };
    secondary: {
      s1: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
      s2: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
      s3: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
    };
  };
  teamTwo: {
    primary: {
      br1: number;
      br2: number;
      br3: number;
      br4: number;
      br5: number;
      total: number;
    };
    secondary: {
      s1: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
      s2: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
      s3: {
        br1: number;
        br2: number;
        br3: number;
        br4: number;
        br5: number;
        total: number;
      };
    };
  };
}

const GameScreen = ({ route, navigation }: Props) => {
  const editionRoute = route.params.edition;
  const battleSize = route.params.battleSize;
  const primary = route.params.primary;
  const secondary: SecondaryPointsProps = route.params.secondary;
  const playerOneName = route.params.teamOne ? route.params.teamOne.playerOne.name : "";
  const playerOneNameTwo = route.params.teamOne.playerTwo && route.params.teamOne.playerTwo.name;
  const playerOneCodex = route.params.teamOne ? route.params.teamOne.playerOne.codex : "";
  const playerOneCodexTwo = route.params.teamOne.playerTwo && route.params.teamOne.playerTwo.codex;
  const playerOneCP = route.params.teamOne ? route.params.teamOne.playerOne.cp : 0;
  const playerTwoName = route.params.teamTwo ? route.params.teamTwo.playerOne.name : "";
  const playerTwoNameTwo = route.params.teamTwo.playerTwo && route.params.teamTwo.playerTwo.name;
  const playerTwoCodex = route.params.teamTwo ? route.params.teamTwo.playerOne.codex : "";
  const playerTwoCodexTwo = route.params.teamTwo.playerTwo && route.params.teamTwo.playerTwo.codex;
  const playerTwoCP = route.params.teamTwo ? route.params.teamTwo.playerOne.cp : 0;

  const [showStartingTeamDialog, setShowStartingTeamDialog] = useState(false);
  const [startingTeam, setStartingTeam] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState(false);

  const [battleRound, setBattleRound] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<string>("Team 1");
  const [primaryPoints, setPrimaryPoints] = useState<Points>({
    teamOne: 0,
    teamTwo: 0,
  });
  const [secondaryPoints, setSecondaryPoints] = useState<Points>({
    teamOne: 0,
    teamTwo: 0,
  });
  const [teamOneVP, setTeamOneVP] = useState(0);
  const [teamTwoVP, setTeamTwoVP] = useState(0);

  const [timer, setTimer] = useState(0);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [buttonText, setButtonText] = useState("Start Game");

  const [gameHistory, setGameHistory] = useState<GameHistory | null>(null);
  const [pointDetails, setPointDetails] = useState<PointDetails | null>(null);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const edition = editionRoute + " - " + battleSize;

  useEffect(() => {
    setShowStartingTeamDialog(true);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    let timer = setInterval(() => setTimer((oldTime) => oldTime + 1), 1000);
    gameEnded && clearInterval(timer);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    setTeamOneVP(primaryPoints.teamOne + secondaryPoints.teamOne);
    setTeamTwoVP(primaryPoints.teamTwo + secondaryPoints.teamTwo);
  }, [primaryPoints, secondaryPoints]);

  useEffect(() => {
    console.log("PointDetails", pointDetails);
    if (!pointDetails) return;
    const historyJSON: GameHistory = {
      battleSize: edition,
      mission: primary.title,
      timePlayed: timer,
      date: new Date().toLocaleDateString(),
      playerOneName: playerOneName,
      playerOneNameTwo: playerOneNameTwo,
      playerTwoName: playerTwoName,
      playerTwoNameTwo: playerTwoNameTwo,
      teamOneCodex: playerOneCodex,
      teamOneCodexTwo: playerOneCodexTwo,
      teamTwoCodex: playerTwoCodex,
      teamTwoCodexTwo: playerTwoCodexTwo,
      teamOnePoints: teamOneVP,
      teamTwoPoints: teamTwoVP,
      teamOnePrimary: {
        totalPoints: primaryPoints.teamOne,
        roundPoints: {
          one: pointDetails?.teamOne.primary.br1 || 0,
          two: pointDetails?.teamOne.primary.br2 || 0,
          three: pointDetails?.teamOne.primary.br3 || 0,
          four: pointDetails?.teamOne.primary.br4 || 0,
          five: pointDetails?.teamOne.primary.br5 || 0,
        },
      },
      teamTwoPrimary: {
        totalPoints: primaryPoints.teamTwo,
        roundPoints: {
          one: pointDetails?.teamTwo.primary.br1 || 0,
          two: pointDetails?.teamTwo.primary.br2 || 0,
          three: pointDetails?.teamTwo.primary.br3 || 0,
          four: pointDetails?.teamTwo.primary.br4 || 0,
          five: pointDetails?.teamTwo.primary.br5 || 0,
        },
      },
      teamOneSecondary: {
        secondaryOne: {
          title: secondary.teamOne[0].name,
          totalPoints: pointDetails?.teamOne.secondary.s1.total || 0,
          roundPoints: {
            one: pointDetails?.teamOne.secondary.s1.br1 || 0,
            two: pointDetails?.teamOne.secondary.s1.br2 || 0,
            three: pointDetails?.teamOne.secondary.s1.br3 || 0,
            four: pointDetails?.teamOne.secondary.s1.br4 || 0,
            five: pointDetails?.teamOne.secondary.s1.br5 || 0,
          },
        },
        secondaryTwo: {
          title: secondary.teamOne[1].name,
          totalPoints: pointDetails?.teamOne.secondary.s2.total || 0,
          roundPoints: {
            one: pointDetails?.teamOne.secondary.s2.br1 || 0,
            two: pointDetails?.teamOne.secondary.s2.br2 || 0,
            three: pointDetails?.teamOne.secondary.s2.br3 || 0,
            four: pointDetails?.teamOne.secondary.s2.br4 || 0,
            five: pointDetails?.teamOne.secondary.s2.br5 || 0,
          },
        },
        secondaryThree: {
          title: secondary.teamOne[2].name,
          totalPoints: pointDetails?.teamOne.secondary.s3.total || 0,
          roundPoints: {
            one: pointDetails?.teamOne.secondary.s3.br1 || 0,
            two: pointDetails?.teamOne.secondary.s3.br2 || 0,
            three: pointDetails?.teamOne.secondary.s3.br3 || 0,
            four: pointDetails?.teamOne.secondary.s3.br4 || 0,
            five: pointDetails?.teamOne.secondary.s3.br5 || 0,
          },
        },
      },
      teamTwoSecondary: {
        secondaryOne: {
          title: secondary.teamTwo[0].name,
          totalPoints: pointDetails?.teamTwo.secondary.s1.total || 0,
          roundPoints: {
            one: pointDetails?.teamTwo.secondary.s1.br1 || 0,
            two: pointDetails?.teamTwo.secondary.s1.br2 || 0,
            three: pointDetails?.teamTwo.secondary.s1.br3 || 0,
            four: pointDetails?.teamTwo.secondary.s1.br4 || 0,
            five: pointDetails?.teamTwo.secondary.s1.br5 || 0,
          },
        },
        secondaryTwo: {
          title: secondary.teamTwo[1].name,
          totalPoints: pointDetails?.teamTwo.secondary.s2.total || 0,
          roundPoints: {
            one: pointDetails?.teamTwo.secondary.s2.br1 || 0,
            two: pointDetails?.teamTwo.secondary.s2.br2 || 0,
            three: pointDetails?.teamTwo.secondary.s2.br3 || 0,
            four: pointDetails?.teamTwo.secondary.s2.br4 || 0,
            five: pointDetails?.teamTwo.secondary.s2.br5 || 0,
          },
        },
        secondaryThree: {
          title: secondary.teamTwo[2].name,
          totalPoints: pointDetails?.teamTwo.secondary.s3.total || 0,
          roundPoints: {
            one: pointDetails?.teamTwo.secondary.s3.br1 || 0,
            two: pointDetails?.teamTwo.secondary.s3.br2 || 0,
            three: pointDetails?.teamTwo.secondary.s3.br3 || 0,
            four: pointDetails?.teamTwo.secondary.s3.br4 || 0,
            five: pointDetails?.teamTwo.secondary.s3.br5 || 0,
          },
        },
      },
    };
    setGameHistory(historyJSON);
    setShowEndGameModal(true);
  }, [pointDetails]);

  function handleNextTurn() {
    if (battleRound === 0) {
      if (showStartingTeamDialog) {
        setCurrentTurn(`Team ${startingTeam}`);
        setShowStartingTeamDialog(false);
        return;
      }
      setButtonText("Next Turn");
      setBattleRound(1);
      setGameStarted(true);
      return;
    }
    if (currentTurn === `Team ${startingTeam}`) {
      startingTeam === 1 ? setCurrentTurn("Team 2") : setCurrentTurn("Team 1");
      if (battleRound === 5) {
        setButtonText("END GAME");
        return;
      }
      setButtonText("Next Battleround");
      return;
    }
    if (battleRound === 5) {
      setGameEnded(true);
      return;
    }
    setCurrentTurn(`Team ${startingTeam}`);
    setBattleRound((prev) => (prev += 1));
    setButtonText("Next Turn");
  }

  function isTurn(team: string): boolean {
    if (team === currentTurn) {
      return true;
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <CustomModal
        visible={showEndGameModal}
        hideModal={setShowEndGameModal}
        children={<HistoryModalContent history={gameHistory} isEndScreen navigation={navigation} />}
      />
      <View style={styles.overview}>
        <View style={styles.overviewInner}>
          <View style={styles.playerTag}>
            <PlayerTag
              playerName={playerOneName}
              playerNameTwo={playerOneNameTwo}
              codex={playerOneCodex}
              codexTwo={playerOneCodexTwo}
              vp={teamOneVP}
              active={isTurn("Team 1")}
            />
          </View>
          <View style={styles.battleRoundContainer}>
            <View style={styles.timer}>
              <Text style={{ fontSize: 24, color: "#fff" }}>{new Date(timer * 1000).toISOString().substr(11, 8)}</Text>
            </View>
            <Surface style={styles.battleRound}>
              <Text
                style={{
                  fontSize: 72,
                  lineHeight: 74,
                  textAlign: "center",
                  marginBottom: -10,
                }}
              >
                {battleRound}
              </Text>
              <Text style={{}}>Battle</Text>
              <Text>Round</Text>
            </Surface>
          </View>
          <View style={styles.playerTag}>
            <PlayerTag
              playerName={playerTwoName}
              playerNameTwo={playerTwoNameTwo}
              codex={playerTwoCodex}
              codexTwo={playerTwoCodexTwo}
              vp={teamTwoVP}
              reverse
              active={isTurn("Team 2")}
            />
          </View>
        </View>
        <View style={styles.overviewInner}>
          <View style={styles.cp}>
            <CPCounter initialValue={playerOneCP} />
          </View>
          <View style={styles.currentCodex}>
            <Surface
              style={{
                backgroundColor: "#C4C4C4",
                paddingVertical: 4,
                paddingHorizontal: 16,
                borderRadius: 4,
              }}
            >
              <Text style={{ alignSelf: "center" }}>{currentTurn === "Team 1" ? playerOneCodex : playerTwoCodex}</Text>
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
          getPrimaryPoints={setPrimaryPoints}
          edition={edition}
          secondary={secondary}
          getSecondaryPoints={setSecondaryPoints}
          handleNextTurn={battleRound}
          getPointDetails={setPointDetails}
          gameEnded={gameEnded}
        />
      </View>
      <View style={styles.button}>
        <Button mode="contained" color="#C7B300" onPress={() => handleNextTurn()}>
          {buttonText}
        </Button>
      </View>
      <Dialog visible={showStartingTeamDialog} dismissable={false} style={{ width: 400, alignSelf: "center" }}>
        <Dialog.Title>Choose the starting team.</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group onValueChange={(newValue) => setStartingTeam(parseInt(newValue))} value={startingTeam.toString()}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Subheading>{playerOneNameTwo ? `${playerOneName} & ${playerOneNameTwo}` : playerOneName}</Subheading>
              <RadioButton.Android value="1" color={Colors.dark.yellow} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Subheading>{playerTwoNameTwo ? `${playerTwoNameTwo} & ${playerTwoName}` : playerTwoName}</Subheading>
              <RadioButton.Android value="2" color={Colors.dark.yellow} />
            </View>
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handleNextTurn()}>confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
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
    minWidth: 175,
    alignContent: "center",
  },
});
