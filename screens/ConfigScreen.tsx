import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import ConfigPaper, { DataListItem } from "../components/ConfigPaper/ConfigPaper";
import MissionPaper from "../components/MissionPaper/MissionPaper";
import configData from "../data/configs.json";
import missionData from "../data/missions.json";
import { Images } from "../constants/Images";
import PlayerPaper from "../components/PlayerPaper/PlayerPaper";
import SecondaryPaper from "../components/SecondaryPaper/SecondaryPaper";

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

  const editionList = [{ label: "9th: Eternal War", value: "9th: Eternal War" }];
  const battleSizeList = getBattleSizeData(configData, "battleSize");
  const modeList = getBattleSizeData(configData, "modes");

  const [configMode, setConfigMode] = useState("basic");

  const [edition, setEdition] = useState();
  const [battleSize, setBattleSize] = useState();
  const [mode, setMode] = useState(0);

  const [editionError, setEditionError] = useState(false);
  const [battleSizeError, setbattleSizeError] = useState(false);
  const [modeError, setModeError] = useState(false);

  const [selectedMission, setSelectedMission] = useState<Mission>();
  const [secondaries, setSecondaries] = useState();
  const [allSecondariesFilled, setAllSecondariesFilled] = useState();

  const [teamOneData, setTeamOneData] = useState();
  const [teamTwoData, setTeamTwoData] = useState();

  const missionList = battleSize && getMissionData(missionData, battleSize);
  const secondaryObjectives: Array<SecondaryData> = missionData.secondaries;
  const secondaryObjectivesArray = createSecondaryObjectiveArray(secondaryObjectives);

  function getBattleSizeData(data: any, type: string): Array<DataListItem> {
    const dataObject: DataListItem = data[type];
    const dataArray: Array<DataListItem> = Object.entries(dataObject).map((entry) => {
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
    } else {
      if (configMode === "mission") {
        setConfigMode("players");
      } else if (configMode === "players") {
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
      }
    }
  };

  const getImage = (mission: Mission): any => {
    switch (mission.title) {
      case "Incisive Strike":
        return Images.combat.incisive;
      case "Outriders":
        return Images.combat.outriders;
      case "Encircle":
        return Images.combat.encircle;
      default:
        return Images.combat.incisive;
    }
  };

  const renderMissionList = (list: Array<Mission> | undefined): any => {
    return list?.map((mission: Mission, index: number) => {
      const missionImage: any = getImage(mission);
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
          <Button mode="contained" color="#9b9b9b">
            Set Players
          </Button>
        );
      } else {
        return (
          <Button mode="contained" color="#C7B300" onPress={() => handleNavigation()}>
            Set Players
          </Button>
        );
      }
    } else if (configMode === "players") {
      if (!allSecondariesFilled) {
        return (
          <Button mode="contained" color="#9b9b9b">
            Start Game
          </Button>
        );
      } else {
        return (
          <Button mode="contained" color={"#C7B300"} onPress={() => handleNavigation()}>
            Start Game
          </Button>
        );
      }
    } else {
      return (
        <Button mode="contained" color={"#C7B300"} onPress={() => handleNavigation()}>
          Select Mission
        </Button>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} resizeMode="contain" source={require("../assets/images/wh-brand.png")} />
      </View>
      {configMode === "basic" && (
        <View style={styles.configs}>
          <ConfigPaper
            title="Edition"
            data={editionList}
            getValue={setEdition}
            hasError={editionError}
            zIndex={3000}
            zIndexReverse={1000}
          />
          <ConfigPaper
            title="Battle Size"
            data={battleSizeList}
            getValue={setBattleSize}
            hasError={battleSizeError}
            zIndex={2000}
            zIndexReverse={2000}
          />
          <ConfigPaper title="VS Mode" data={modeList} getValue={setMode} hasError={modeError} zIndex={1000} zIndexReverse={3000} />
        </View>
      )}
      {configMode === "mission" && (
        <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{ flex: 1 }}>
          {renderMissionList(missionList)}
        </ScrollView>
      )}
      {configMode === "players" && (
        <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{ flex: 1 }}>
          <PlayerPaper playerCount={mode} getTeamOneData={setTeamOneData} getTeamTwoData={setTeamTwoData} />
          <SecondaryPaper
            list={secondaryObjectivesArray}
            getSecondaries={setSecondaries}
            allSecondariesFilled={setAllSecondariesFilled}
            validationData={secondaryObjectives}
          />
        </ScrollView>
      )}
      <View style={styles.footerButton}>{renderButton()}</View>
    </View>
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
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
    marginTop: 16,
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
