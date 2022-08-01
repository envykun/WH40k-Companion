import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Surface, TextInput } from "react-native-paper";
import { Mission } from "../../screens/ConfigScreen";
import { Points } from "../../screens/GameScreen";
import { Editions } from "../../types";
import CustomModal from "../CustomModal/CustomModal";
import InfoModal from "../InfoModal/InfoModal";

interface Props {
  primaryCount: Points;
  primaryDescription: string;
  primaryTitle: string;
  edition: Editions;
  battleSize: string;
  hasInput?: boolean;
  getPrimaryCount: any;
  mission: Mission;
}

const PrimaryPaper = ({
  primaryCount,
  primaryDescription,
  primaryTitle,
  edition,
  battleSize,
  hasInput,
  getPrimaryCount,
  mission,
}: Props) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  return (
    <Surface style={styles.surface}>
      <CustomModal
        visible={showInfoModal}
        hideModal={() => setShowInfoModal(false)}
        children={<InfoModal mission={mission} edition={edition} closeInfo={() => setShowInfoModal(false)} />}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Primary</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerTextMiddle}>{primaryTitle}</Text>
          <IconButton
            icon={() => <Ionicons name="ios-information-circle" size={32} color="white" />}
            onPress={() => setShowInfoModal(true)}
            style={{ margin: 0 }}
          />
        </View>
        <Text style={styles.headerTextEnd}>
          {edition} - {battleSize}
        </Text>
      </View>
      <View style={styles.body}>
        {/* <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{primaryDescription}</Text>
        </View> */}
        {hasInput ? (
          <View style={styles.points}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                mode="outlined"
                value={primaryCount.teamOne ? primaryCount.teamOne.toString() : ""}
                keyboardType="number-pad"
                onChangeText={(text) =>
                  getPrimaryCount((prev: Points) => ({
                    ...prev,
                    teamOne: parseInt(text),
                  }))
                }
                style={{
                  width: 50,
                  height: 40,
                  paddingTop: 0,
                  paddingBottom: 6,
                  backgroundColor: "#C4C4C4",
                }}
              />
              <Text style={styles.pointText}> / 45</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                mode="outlined"
                value={primaryCount.teamTwo ? primaryCount.teamTwo.toString() : ""}
                keyboardType="number-pad"
                onChangeText={(text) =>
                  getPrimaryCount((prev: Points) => ({
                    ...prev,
                    teamTwo: parseInt(text),
                  }))
                }
                style={{
                  width: 50,
                  height: 40,
                  paddingTop: 0,
                  paddingBottom: 6,
                  backgroundColor: "#C4C4C4",
                }}
              />
              <Text style={styles.pointText}> / 45</Text>
            </View>
          </View>
        ) : (
          <View style={styles.points}>
            <Text style={styles.pointText}>{primaryCount.teamOne} / 45</Text>
            <Text style={styles.pointText}>{primaryCount.teamTwo} / 45</Text>
          </View>
        )}
      </View>
    </Surface>
  );
};

export default PrimaryPaper;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  header: {
    width: "100%",
    flexDirection: "row",
  },
  headerText: {
    color: "#C4C4C4",
    flex: 1,
  },
  headerTextMiddle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 26,
    textAlignVertical: "bottom",
  },
  headerTextEnd: {
    color: "#C4C4C4",
    flex: 1,
    textAlign: "right",
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    color: "#fff",
    fontFamily: "roboto-light-italic",
  },
  body: {
    padding: 8,
  },
  pointText: {
    color: "#fff",
    fontSize: 32,
    alignSelf: "center",
  },
  points: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
