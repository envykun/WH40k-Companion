import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, IconButton, Surface } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Images } from "../../constants/Images";
import CustomModal from "../CustomModal/CustomModal";
import HistoryModalContent from "./HistoryModalContent";
import { GameHistory } from "../../hooks/useFileSystem";

interface Props {
  teamOneCodex: string;
  teamOneCodexTwo?: string;
  teamTwoCodex: string;
  teamTwoCodexTwo?: string;
  teamOnePoints: number;
  teamTwoPoints: number;
  date: string;
  battleSize: string;
  history: GameHistory;
}

const HistoryListItem = ({
  teamOneCodex,
  teamOneCodexTwo,
  teamOnePoints,
  teamTwoCodex,
  teamTwoCodexTwo,
  teamTwoPoints,
  date,
  battleSize,
  history,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function getCodexIcon(codex: string) {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 50000,
        }}
      >
        <Image resizeMode="contain" style={{ width: "90%", height: "90%" }} source={Images.icons[codex]} />
      </View>
    );
  }
  return (
    <Surface style={styles.container}>
      <CustomModal
        visible={showModal}
        hideModal={() => setShowModal(false)}
        children={<HistoryModalContent history={history} closeModal={handleCloseModal} />}
      />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text>{date}</Text>
        <Text style={{ marginLeft: 10 }}>{battleSize}</Text>
        <View style={styles.result}>
          {teamOneCodexTwo ? getCodexIcon(teamOneCodexTwo) : <View style={{ width: 30 }}></View>}
          {getCodexIcon(teamOneCodex)}
          <Text style={{ marginLeft: 5 }}>{teamOnePoints}</Text>
          <Text>:</Text>
          <Text style={{ marginRight: 5 }}>{teamTwoPoints}</Text>
          {getCodexIcon(teamTwoCodex)}
          {teamTwoCodexTwo ? getCodexIcon(teamTwoCodexTwo) : <View style={{ width: 30 }}></View>}
        </View>
      </View>
      <IconButton
        icon={() => <Ionicons name="md-list-circle-outline" size={32} color="black" />}
        size={24}
        onPress={() => setShowModal(true)}
      />
    </Surface>
  );
};

export default HistoryListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    paddingLeft: 12,
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
