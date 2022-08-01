import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image } from "react-native";
import { Surface } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Mission } from "../../screens/ConfigScreen";
import Layout from "../../constants/Layout";

interface Props {
  mission: Mission;
  image?: any;
  isMarked?: boolean;
  onPress: any;
}

const MissionPaper = ({ mission, image, isMarked, onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Surface style={isMarked ? styles.surfaceMarked : styles.surface}>
        {isMarked && <Feather name="check-circle" size={24} style={styles.icon} />}
        <Text style={styles.title}>{mission.title}</Text>
        <View style={styles.missionSubBlock}>
          <Text style={styles.subTitle}>Mission Briefing</Text>
          <Text style={styles.description}>{mission.briefing}</Text>
        </View>
        {"rules" in mission && (
          <View style={styles.missionSubBlock}>
            <Text style={styles.subTitle}>Mission Rules</Text>
            <Text style={styles.description}>{mission.rules}</Text>
          </View>
        )}
        <View style={styles.missionSubBlock}>
          <Text style={styles.subTitle}>Primary Objective</Text>
          <Text style={styles.description}>{mission.primary.precomment}</Text>
          <Text style={styles.combined}>
            <Text style={styles.keyword}>{mission.primary.keyword} </Text>
            <Text style={styles.description}>{mission.primary.description}</Text>
          </Text>
          {mission &&
            mission.primary.objectivelist.map((objective, index) => {
              return (
                <View key={index} style={{ flexDirection: "row", paddingLeft: 12, marginVertical: 2 }}>
                  <Text style={styles.description}>{"\u2022"}</Text>
                  <Text style={[{ flex: 1, paddingLeft: 5 }, styles.description]}>{objective}</Text>
                </View>
              );
            })}
          <Text style={styles.description}>{mission.primary.postcomment}</Text>
        </View>
        <View style={styles.missionSubBlock}>
          <Text style={styles.subTitle}>Secondary Objective</Text>
          <Text style={styles.description}>{mission.secondary.precomment}</Text>
          <Text style={styles.combined}>
            <Text style={styles.keyword}>{mission.secondary.keyword} </Text>
            <Text style={styles.description}>{mission.secondary.description}</Text>
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="contain" source={image} />
        </View>
      </Surface>
    </TouchableHighlight>
  );
};

export default MissionPaper;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 8,
    position: "relative",
  },
  surfaceMarked: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 8,
    position: "relative",
    borderWidth: 1,
    borderColor: "#C7B300",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "roboto-regular",
  },
  subTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "roboto-regular",
    marginBottom: 2,
  },
  missionSubBlock: {
    marginBottom: 8,
  },
  description: {
    color: "#C4C4C4",
    fontFamily: "roboto-light-italic",
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
    color: "#C7B300",
  },
  keyword: {
    color: "#C4C4C4",
    fontFamily: "roboto-medium-italic",
    marginTop: 4,
  },
  combined: {
    marginTop: 8,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    maxHeight: Layout.window.width,
  },
  image: {
    width: "100%",
  },
});
