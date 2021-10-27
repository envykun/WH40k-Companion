import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import { DataListItem } from "../ConfigPaper/ConfigPaper";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  list: Array<DataListItem>;
  getSecondaries: any;
  allSecondariesFilled: any;
}

const SecondaryPaper = ({ list, getSecondaries, allSecondariesFilled }: Props) => {
  const [oneValueOne, setOneValueOne] = useState();
  const [oneValueTwo, setOneValueTwo] = useState();
  const [oneValueThree, setOneValueThree] = useState();

  const [twoValueOne, setTwoValueOne] = useState();
  const [twoValueTwo, setTwoValueTwo] = useState();
  const [twoValueThree, setTwoValueThree] = useState();

  const secondaryList = list.concat([{ label: "Custom", value: "Custom" }]);

  useEffect(() => {
    console.log("ONE", oneValueOne);
    if (oneValueOne && oneValueTwo && oneValueThree && twoValueOne && twoValueTwo && twoValueThree) {
      allSecondariesFilled(true);
      const secondaries = {
        teamOne: [
          { name: oneValueOne, count: 0 },
          { name: oneValueTwo, count: 0 },
          { name: oneValueThree, count: 0 },
        ],
        teamTwo: [
          { name: twoValueOne, count: 0 },
          { name: twoValueTwo, count: 0 },
          { name: twoValueThree, count: 0 },
        ],
      };
      getSecondaries(secondaries);
    }
  }, [oneValueOne, oneValueTwo, oneValueThree, twoValueOne, twoValueTwo, twoValueThree]);

  return (
    <Surface style={styles.surface}>
      <Text style={styles.title}>Secondaries</Text>
      <View style={styles.container}>
        <Text style={styles.team}>Team 1</Text>
        <Dropdown label="Secondary 1" list={secondaryList} getValue={setOneValueOne} />
        {oneValueOne === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
        <Dropdown label="Secondary 2" list={secondaryList} getValue={setOneValueTwo} />
        {oneValueTwo === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
        <Dropdown label="Secondary 3" list={secondaryList} getValue={setOneValueThree} />
        {oneValueThree === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
      </View>
      <View style={styles.container}>
        <Text style={styles.team}>Team 2</Text>
        <Dropdown label="Secondary 1" list={secondaryList} getValue={setTwoValueOne} />
        {twoValueOne === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
        <Dropdown label="Secondary 2" list={secondaryList} getValue={setTwoValueTwo} />
        {twoValueTwo === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
        <Dropdown label="Secondary 3" list={secondaryList} getValue={setTwoValueThree} />
        {twoValueThree === "Custom" && <TextInput mode="outlined" label="Custom Objective" />}
      </View>
    </Surface>
  );
};

export default SecondaryPaper;

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
  container: {
    marginTop: 8,
  },
  lowerInput: {
    flexDirection: "column",
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
