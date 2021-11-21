import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Surface, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../CustomModal/CustomModal";
import InfoModal from "../InfoModal/InfoModal";
import { SecondaryData } from "../../screens/ConfigScreen";
import { Editions } from "../../types";

interface Props {
  title: string | undefined;
  count: string | undefined;
  hasInput?: boolean;
  getValue: any;
  secondaries: Array<SecondaryData>;
  edition: Editions;
}

const Secondary = ({ title, count, hasInput, getValue, secondaries, edition }: Props) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <View style={styles.secondary}>
      <Surface style={styles.surface}>
        <CustomModal
          visible={showInfoModal}
          hideModal={() => setShowInfoModal(false)}
          children={<InfoModal secondaries={secondaries} closeInfo={() => setShowInfoModal(false)} scrollTo={title} edition={edition} />}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <IconButton
            icon={() => <Ionicons name="ios-information-circle" size={32} color="black" />}
            onPress={() => setShowInfoModal(true)}
          />
        </View>
      </Surface>
      <View style={styles.countWrapper}>
        {hasInput ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              mode="outlined"
              value={count}
              keyboardType="number-pad"
              onChangeText={(text) => getValue(text)}
              style={{
                width: 50,
                height: 40,
                paddingTop: 0,
                paddingBottom: 6,
                backgroundColor: "#C4C4C4",
              }}
            />
            <Text style={styles.count}> / 15</Text>
          </View>
        ) : (
          <Text style={styles.count}>{count} / 15</Text>
        )}
      </View>
    </View>
  );
};

export default Secondary;

const styles = StyleSheet.create({
  secondary: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    marginVertical: 8,
  },
  surface: {
    flex: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    backgroundColor: "#C4C4C4",
  },
  countWrapper: {
    justifyContent: "center",
    paddingLeft: 20,
  },
  count: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontFamily: "roboto-regular",
    fontSize: 20,
  },
});
