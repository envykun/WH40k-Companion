import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { Images } from "../../constants/Images";
import { Mission, SecondaryData } from "../../screens/ConfigScreen";
import { Editions } from "../../types";
import MissionPaper from "../MissionPaper/MissionPaper";
import SecondaryInfoPaper from "../SecondaryInfoPaper/SecondaryInfoPaper";

interface Props {
  mission?: Mission;
  secondaries?: Array<SecondaryData>;
  scrollTo?: string;
  closeInfo: any;
  edition: Editions;
}

const InfoModal = ({ mission, secondaries, closeInfo, scrollTo, edition }: Props) => {
  const getImage = (mission: Mission, type: any): any => {
    return Images.missions[type][mission.title];
  };

  return (
    <View style={styles.container}>
      {mission && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <MissionPaper mission={mission} onPress={undefined} image={getImage(mission, edition)} />
        </ScrollView>
      )}
      {secondaries && (
        <View style={styles.scroll}>
          <SecondaryInfoPaper secondaries={secondaries} scrollTo={scrollTo} />
        </View>
      )}
    </View>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: { flex: 1 },
});
