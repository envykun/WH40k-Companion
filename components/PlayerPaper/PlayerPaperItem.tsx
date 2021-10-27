import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { DataListItem } from "../ConfigPaper/ConfigPaper";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  team: string;
  list: Array<DataListItem>;
  getPlayerData?: any;
}

export interface Player {
  name: string;
  codex: string;
  cp: number;
}

export interface TeamProps {
  playerOne?: Player;
  playerTwo?: Player;
}

const PlayerPaperItem = ({ team, list, getPlayerData }: Props) => {
  const [name, setName] = useState("");
  const [codex, setCodex] = useState("");
  const [cp, setCp] = useState("0");

  useEffect(() => {
    const data: Player = { name: name, codex: codex, cp: parseInt(cp) };
    getPlayerData(data);
  }, [name, codex, cp]);

  return (
    <View style={styles.container}>
      <Text style={styles.team}>{team}</Text>
      <TextInput mode="outlined" label="Name" value={name} onChangeText={setName} />
      <View style={styles.lowerInput}>
        <View style={styles.dropdown}>
          <Dropdown label="Codex" list={list} getValue={setCodex} />
        </View>
        <View style={styles.cpInput}>
          <TextInput
            mode="outlined"
            placeholder="CP"
            value={cp}
            onChangeText={setCp}
            right={<TextInput.Affix textStyle={{ fontSize: 20 }} text="CP" />}
          />
        </View>
      </View>
    </View>
  );
};

export default PlayerPaperItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  lowerInput: {
    flexDirection: "row",
    flex: 1,
  },
  dropdown: {
    flex: 1,
    paddingRight: 8,
  },
  cpInput: {
    width: "15%",
    minWidth: 80,
  },
  team: {
    fontFamily: "roboto-regular",
    color: "#fff",
  },
});
