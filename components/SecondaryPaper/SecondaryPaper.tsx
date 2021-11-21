import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, IconButton, Surface, TextInput } from "react-native-paper";
import { SecondaryData } from "../../screens/ConfigScreen";
import { Editions } from "../../types";
import { DataListItem } from "../ConfigPaper/ConfigPaper";
import CustomModal from "../CustomModal/CustomModal";
import Dropdown from "../Dropdown/Dropdown";
import InfoModal from "../InfoModal/InfoModal";

interface Props {
  list: Array<DataListItem>;
  getSecondaries: any;
  allSecondariesFilled: any;
  validationData: Array<SecondaryData>;
  edition: Editions;
}

const SecondaryPaper = ({ list, getSecondaries, allSecondariesFilled, validationData, edition }: Props) => {
  const [teamOneSecondaries, setTeamOneSecondaries] = useState<string>("");
  const [teamOneObjOne, setTeamOneObjOne] = useState<string>("");
  const [teamOneObjTwo, setTeamOneObjTwo] = useState<string>("");
  const [teamOneObjThree, setTeamOneObjThree] = useState<string>("");
  const [teamOneCatOne, setTeamOneCatOne] = useState<string | undefined>();
  const [teamOneCatTwo, setTeamOneCatTwo] = useState<string | undefined>();
  const [teamOneCatThree, setTeamOneCatThree] = useState<string | undefined>();

  const [teamTwoSecondaries, setTeamTwoSecondaries] = useState<string>("");
  const [teamTwoObjOne, setTeamTwoObjOne] = useState<string>("");
  const [teamTwoObjTwo, setTeamTwoObjTwo] = useState<string>("");
  const [teamTwoObjThree, setTeamTwoObjThree] = useState<string>("");
  const [teamTwoCatOne, setTeamTwoCatOne] = useState<string | undefined>();
  const [teamTwoCatTwo, setTeamTwoCatTwo] = useState<string | undefined>();
  const [teamTwoCatThree, setTeamTwoCatThree] = useState<string | undefined>();

  const [showErrorTeamOne, setShowErrorTeamOne] = useState(false);
  const [errorTeamOne, setErrorTeamOne] = useState<Array<string | undefined>>([]);

  const [showErrorTeamTwo, setShowErrorTeamTwo] = useState(false);
  const [errorTeamTwo, setErrorTeamTwo] = useState<Array<string | undefined>>([]);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const secondaryList = list
    .sort((a, b) => a.label.localeCompare(b.label))
    .concat([
      { label: "Custom Objective 1", value: "Custom1" },
      { label: "Custom Objective 2", value: "Custom2" },
      { label: "Custom Objective 3", value: "Custom3" },
    ]);

  // Validation Team 1 secondaries
  useEffect(() => {
    validateCategory(
      teamOneSecondaries,
      validationData,
      [teamOneCatOne, teamOneCatTwo, teamOneCatThree],
      setShowErrorTeamOne,
      setErrorTeamOne
    );
  }, [teamOneSecondaries, teamOneCatOne, teamOneCatTwo, teamOneCatThree]);

  // Validation Team 2 secondaries
  useEffect(() => {
    validateCategory(
      teamTwoSecondaries,
      validationData,
      [teamTwoCatOne, teamTwoCatTwo, teamTwoCatThree],
      setShowErrorTeamTwo,
      setErrorTeamTwo
    );
  }, [teamTwoSecondaries, teamTwoCatOne, teamTwoCatTwo, teamTwoCatThree]);

  // Update Secondaries and pass to parent
  useEffect(() => {
    if (teamOneSecondaries.split(/,(?!\s)/).length <= 3 || teamTwoSecondaries.split(/,(?!\s)/).length <= 3) return;
    const secondaries = {
      teamOne: [
        { name: getSecondaryFromString(teamOneSecondaries, 1, 1), count: 0 },
        { name: getSecondaryFromString(teamOneSecondaries, 2, 1), count: 0 },
        { name: getSecondaryFromString(teamOneSecondaries, 3, 1), count: 0 },
      ],
      teamTwo: [
        { name: getSecondaryFromString(teamTwoSecondaries, 1), count: 0 },
        { name: getSecondaryFromString(teamTwoSecondaries, 2), count: 0 },
        { name: getSecondaryFromString(teamTwoSecondaries, 3), count: 0 },
      ],
    };
    allSecondariesFilled(true);
    getSecondaries(secondaries);
  }, [
    teamOneSecondaries,
    teamTwoSecondaries,
    teamOneCatOne,
    teamOneCatTwo,
    teamOneCatThree,
    teamOneObjOne,
    teamOneObjTwo,
    teamOneObjThree,
    teamTwoObjOne,
    teamTwoObjTwo,
    teamTwoObjThree,
  ]);

  function getSecondaryFromString(secondaries: string, index: number, team?: number): string {
    const secondaryArray = secondaries.split(/,(?!\s)/);
    if (secondaryArray[index] === "Custom1") return team === 1 ? teamOneObjOne.toUpperCase() : teamTwoObjOne.toUpperCase();
    if (secondaryArray[index] === "Custom2") return team === 1 ? teamOneObjTwo.toUpperCase() : teamTwoObjTwo.toUpperCase();
    if (secondaryArray[index] === "Custom3") return team === 1 ? teamOneObjThree.toUpperCase() : teamTwoObjThree.toUpperCase();
    return secondaryArray[index];
  }

  function getAllCategories(data: Array<SecondaryData>): Array<DataListItem> {
    const dataArray = data.map((obj: SecondaryData) => {
      return { label: obj.category, value: obj.category };
    });
    return dataArray.filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);
  }

  function validateCategory(
    secondaries: string,
    validation: Array<SecondaryData>,
    customArray: Array<string | undefined>,
    showError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<(string | undefined)[]>>
  ) {
    let first: SecondaryData | undefined, second: SecondaryData | undefined, third: SecondaryData | undefined;
    first = validation.find((sec: any) => sec.title === getSecondaryFromString(secondaries, 1));
    second = validation.find((sec: any) => sec.title === getSecondaryFromString(secondaries, 2));
    third = validation.find((sec: any) => sec.title === getSecondaryFromString(secondaries, 3));

    const secondariesStringArray: Array<string | undefined> = [first?.category, second?.category, third?.category].concat(customArray);

    const findDublicates = secondariesStringArray.filter(
      (item, index) => item !== undefined && secondariesStringArray.indexOf(item) != index
    );

    if (findDublicates.length > 0) {
      showError(true);
      setErrorMessage(findDublicates);
    } else {
      showError(false);
      setErrorMessage([]);
    }
  }

  return (
    <Surface style={styles.surface}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Secondaries</Text>
        <IconButton
          icon={() => <Ionicons name="ios-information-circle" size={32} color="white" />}
          onPress={() => setShowInfoModal(true)}
          style={{ margin: 0, marginTop: -5 }}
        />
      </View>
      <CustomModal
        visible={showInfoModal}
        hideModal={() => setShowInfoModal(false)}
        children={<InfoModal secondaries={validationData} closeInfo={() => setShowInfoModal(false)} edition={edition} />}
      />
      <View style={styles.container}>
        <Text style={styles.team}>Team 1</Text>
        <Dropdown label="Secondaries" list={secondaryList} getValue={setTeamOneSecondaries} multiSelect />
        {showErrorTeamOne && (
          <HelperText type="error" visible={showErrorTeamOne}>
            * To many selections of {errorTeamOne.join(", ")}.
          </HelperText>
        )}
        {teamOneSecondaries.includes("Custom1") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamOneCatOne} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 1" value={teamOneObjOne} onChangeText={setTeamOneObjOne} />
            </View>
          </View>
        )}
        {teamOneSecondaries.includes("Custom2") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamOneCatTwo} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 2" value={teamOneObjTwo} onChangeText={setTeamOneObjTwo} />
            </View>
          </View>
        )}
        {teamOneSecondaries.includes("Custom3") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamOneCatThree} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 3" value={teamOneObjThree} onChangeText={setTeamOneObjThree} />
            </View>
          </View>
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.team}>Team 2</Text>
        <Dropdown label="Secondaries" list={secondaryList} getValue={setTeamTwoSecondaries} multiSelect />
        {showErrorTeamTwo && (
          <HelperText type="error" visible={showErrorTeamTwo}>
            * To many selections of {errorTeamTwo.join(", ")}.
          </HelperText>
        )}
        {teamTwoSecondaries.includes("Custom1") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamTwoCatOne} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 1" value={teamTwoObjOne} onChangeText={setTeamTwoObjOne} />
            </View>
          </View>
        )}
        {teamTwoSecondaries.includes("Custom2") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamTwoCatTwo} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 2" value={teamTwoObjTwo} onChangeText={setTeamTwoObjTwo} />
            </View>
          </View>
        )}
        {teamTwoSecondaries.includes("Custom3") && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <Dropdown label="Category" list={getAllCategories(validationData)} getValue={setTeamTwoCatThree} />
            </View>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput mode="outlined" label="Name of objective 3" value={teamTwoObjThree} onChangeText={setTeamTwoObjThree} />
            </View>
          </View>
        )}
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
