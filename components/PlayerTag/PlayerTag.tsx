import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { Surface } from "react-native-paper";
import { Images } from "../../constants/Images";

interface Props {
  reverse?: boolean;
  playerName: string;
  playerNameTwo?: string;
  vp: number;
  codex: string;
  codexTwo?: string;
  active: boolean;
}

const PlayerTag = ({ reverse, playerName, playerNameTwo, vp, codex, codexTwo, active }: Props) => {
  return (
    <View
      style={
        reverse
          ? active
            ? [styles.containerReverse, styles.active]
            : styles.containerReverse
          : active
          ? [styles.container, styles.active]
          : styles.container
      }
    >
      <View style={styles.naming}>
        <Surface style={reverse ? styles.nameReverse : styles.name}>
          <Text style={{ fontSize: 26, color: "#fff" }}>{playerName}</Text>
          {playerNameTwo && <Text style={{ fontSize: 26, color: "#fff" }}>{playerNameTwo}</Text>}
        </Surface>
        <Surface style={styles.codex}>
          {codexTwo ? (
            <Text style={{ fontSize: 20 }}>
              {codex} | {codexTwo}
            </Text>
          ) : (
            <Text style={{ fontSize: 20 }}>{codex}</Text>
          )}
        </Surface>
      </View>
      <Surface style={reverse ? styles.vpReverse : styles.vp}>
        <Text style={{ fontSize: 64 }}>{vp}</Text>
      </Surface>
      <Surface style={styles.icon}>
        <View
          style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: 50000 }}
        >
          <Image resizeMode="contain" style={{ width: "90%", height: "90%" }} source={Images.icons[codex]} />
        </View>
      </Surface>
    </View>
  );
};

export default PlayerTag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 10,
    paddingRight: 6,
    paddingLeft: 32,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: "relative",
  },
  active: {
    backgroundColor: "rgba(199, 179, 0, 0.75)",
  },
  containerReverse: {
    flexDirection: "row-reverse",
    flex: 1,
    paddingVertical: 10,
    paddingRight: 6,
    paddingLeft: 32,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  vp: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderRadius: 5,
  },
  vpReverse: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    borderRadius: 5,
  },
  naming: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  nameReverse: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    paddingRight: 55,
    backgroundColor: "#1E1E1E",
  },
  name: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    paddingLeft: 55,
    backgroundColor: "#1E1E1E",
  },
  codex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#808080",
  },
  icon: {
    borderRadius: 50000,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    top: 5,
    left: 15,
    backgroundColor: "#E5E5E5",
  },
});
