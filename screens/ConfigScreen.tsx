import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button } from "react-native-paper";
import ConfigPaper, { DataListItem } from "../components/ConfigPaper/ConfigPaper";
import MissionPaper from "../components/MissionPaper/MissionPaper";
import { Images } from "../constants/Images";
import PlayerPaper from "../components/PlayerPaper/PlayerPaper";
import SecondaryPaper from "../components/SecondaryPaper/SecondaryPaper";
import { useGetBattlesize, useGetMissions, useGetPlayerModes } from "../hooks/useGetData";
import { Editions } from "../types";

interface Props {
  navigation: any;
}

export interface Mission {
  title: string;
  briefing: string;
  rules: string;
  primary: {
    precomment: string;
    keyword: string;
    description: string;
    objectivelist: Array<string>;
    postcomment: string;
  };
  secondary: { precomment: string; keyword: string; description: string };
  image: any;
}

export interface SecondaryData {
  title: string;
  type: string;
  description: string;
  category: string;
}

const ConfigScreen = ({ navigation }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

  const editionList = [
    { label: "9th: Eternal War", value: "9th: Eternal War" },
    { label: "Grand Tournament 2021", value: "Grand Tournament 2021" },
  ];
  const [configMode, setConfigMode] = useState("basic");

  const [edition, setEdition] = useState<Editions>("9th: Eternal War");

  const { data: missionData, isLoading: missionLoading } = useGetMissions(edition);
  const { data: battleSizeData, isLoading: battleSizeLoading } = useGetBattlesize(edition);
  const { data: playerModes, isLoading: playModesLoading } = useGetPlayerModes();

  const [battleSize, setBattleSize] = useState<string>("combat");
  const [mode, setMode] = useState<number>(1);

  const battleSizeList = battleSizeData && getBattleSizeData(battleSizeData);
  const modeList = playerModes && getBattleSizeData(playerModes);

  const [editionError, setEditionError] = useState(false);
  const [battleSizeError, setbattleSizeError] = useState(false);
  const [modeError, setModeError] = useState(false);

  const [selectedMission, setSelectedMission] = useState<Mission>();
  const [secondaries, setSecondaries] = useState();
  const [allSecondariesFilled, setAllSecondariesFilled] = useState();

  const [teamOneData, setTeamOneData] = useState();
  const [teamTwoData, setTeamTwoData] = useState();

  const [buttonLoading, setButtonLoading] = useState(false);

  const missionList = missionData && battleSize && getMissionData(missionData, battleSize);
  const secondaryObjectives: Array<SecondaryData> = missionData && missionData.secondaries;
  const secondaryObjectivesArray = missionData && createSecondaryObjectiveArray(secondaryObjectives);

  function getBattleSizeData(data: [key: string]): Array<DataListItem> {
    const dataArray: Array<DataListItem> = Object.entries(data).map((entry) => {
      const [key, value] = entry;
      return { label: value, value: key };
    });
    return dataArray;
  }

  function getMissionData(data: any, battleSize: string): Array<Mission> {
    return data.missions[battleSize];
  }

  function findInBattleSizeList(list: Array<DataListItem>, battleSize: string): string | undefined {
    const battleSizeObj = list.find((bs) => bs.value === battleSize);
    return battleSizeObj?.label;
  }

  function createSecondaryObjectiveArray(data: any): Array<DataListItem> {
    const dataArray: Array<DataListItem> = data.map((entry: any) => {
      const label = entry.title;
      const value = entry.title;
      return {
        label: label,
        value: value,
        custom: (
          <View
            style={{
              position: "relative",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              flex: 1,
              paddingTop: 15,
            }}
          >
            <View style={{ position: "absolute", top: 8, left: 0 }}>
              <Text style={{ fontSize: 8 }}>{entry.category}</Text>
            </View>
            <View style={{ width: 400, paddingLeft: 10 }}>
              <Text style={{ fontSize: 18 }}>{label}</Text>
            </View>
          </View>
        ),
      };
    });
    return dataArray;
  }

  // function checkPlayerAndSecondaryConfig() {
  //   if()
  // }

  useEffect(() => {
    battleSizeData !== null && !battleSizeLoading && setBattleSize(Object.keys(battleSizeData)[0]);
  }, [edition, battleSizeData]);

  useEffect(() => {
    if (edition) {
      setEditionError(false);
    }
    if (battleSize) {
      setbattleSizeError(false);
    }
    if (mode) {
      setModeError(false);
    }
  }, [edition, battleSize, mode]);

  // useEffect(() => {
  //   if (configMode === "players") {
  //     checkPlayerAndSecondaryConfig();
  //   }
  // });

  const handleNavigation = () => {
    setButtonLoading(true);
    if (!edition || !battleSize || !mode) {
      if (!edition) {
        setEditionError(true);
      }
      if (!battleSize) {
        setbattleSizeError(true);
      }
      if (!mode) {
        setModeError(true);
      }
      setButtonLoading(false);
    } else {
      if (configMode === "mission") {
        setConfigMode("players");
        setButtonLoading(false);
      } else if (configMode === "players") {
        setButtonLoading(false);
        navigation.navigate("Game", {
          edition: edition,
          battleSize: findInBattleSizeList(battleSizeList, battleSize),
          primary: selectedMission,
          secondary: secondaries,
          teamOne: teamOneData,
          teamTwo: teamTwoData,
        });
      } else {
        setConfigMode("mission");
        setButtonLoading(false);
      }
    }
  };

  const getImage = (mission: Mission, type: any): any => {
    return Images.missions[type][mission.title];
  };

  const renderMissionList = (list: Array<Mission> | undefined): any => {
    return list?.map((mission: Mission, index: number) => {
      const missionImage: any = getImage(mission, edition);
      return (
        <MissionPaper
          key={index}
          mission={mission}
          isMarked={selectedMission?.title === mission.title}
          onPress={() => setSelectedMission(mission)}
          image={missionImage}
        />
      );
    });
  };

  const renderButton = () => {
    if (configMode === "mission") {
      if (!selectedMission) {
        return (
          <Button mode="contained" color="#9b9b9b" loading={buttonLoading}>
            Set Players
          </Button>
        );
      } else {
        return (
          <Button mode="contained" color="#C7B300" onPress={() => handleNavigation()} loading={buttonLoading}>
            Set Players
          </Button>
        );
      }
    } else if (configMode === "players") {
      if (!allSecondariesFilled) {
        return (
          <Button mode="contained" color="#9b9b9b" loading={buttonLoading}>
            Start Game
          </Button>
        );
      } else {
        return (
          <Button mode="contained" color={"#C7B300"} onPress={() => handleNavigation()} loading={buttonLoading}>
            Start Game
          </Button>
        );
      }
    } else {
      return (
        <Button mode="contained" color={"#C7B300"} onPress={() => handleNavigation()} loading={buttonLoading}>
          Select Mission
        </Button>
      );
    }
  };

  const viewPort =
    configMode === "basic" ? (
      <View style={styles.configs}>
        <ConfigPaper title="Edition" data={editionList} getValue={setEdition} hasError={editionError} initialValue={edition} />
        <ConfigPaper
          title="Battle Size"
          data={battleSizeList}
          getValue={setBattleSize}
          hasError={battleSizeError}
          initialValue={battleSize}
        />
        <ConfigPaper title="VS Mode" data={modeList} getValue={setMode} hasError={modeError} initialValue={mode.toString()} />
      </View>
    ) : configMode === "mission" ? (
      <View style={{ flex: 1, alignItems: "center" }}>{renderMissionList(missionList)}</View>
    ) : (
      <View style={{ flex: 1, alignItems: "center" }}>
        <PlayerPaper playerCount={mode} getTeamOneData={setTeamOneData} getTeamTwoData={setTeamTwoData} />
        <SecondaryPaper
          list={secondaryObjectivesArray}
          getSecondaries={setSecondaries}
          allSecondariesFilled={setAllSecondariesFilled}
          validationData={secondaryObjectives}
          edition={edition}
        />
      </View>
    );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {missionLoading || battleSizeLoading || playModesLoading || buttonLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode="contain" source={require("../assets/images/wh-brand.png")} />
          </View>
          {viewPort}
        </ScrollView>
      )}
      <View style={styles.footerButton}>{renderButton()}</View>
    </KeyboardAvoidingView>
  );
};

export default ConfigScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 8,
    paddingTop: 30,
    backgroundColor: "#101010",
  },
  configs: {
    flex: 1,
    alignItems: "center",
  },
  footerButton: {
    justifyContent: "flex-end",
    maxWidth: 300,
    alignSelf: "center",
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    maxWidth: 600,
    alignSelf: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});
