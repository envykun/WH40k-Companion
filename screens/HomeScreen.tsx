import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import HistoryListItem from "../components/HistoryListItem/HistoryListItem";

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const fakeData = {
    teamOneCodex: "Adeptus Custodes",
    teamTwoCodex: "Adeptus Mechanicus",
    teamOnePoints: 65,
    teamTwoPoints: 69,
    date: new Date(),
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 32, fontFamily: "roboto-regular" }}>
          Warhammer 40k Companion
        </Text>
      </View>
      <View style={styles.bodyContent}>
        <Text style={{ padding: 12 }}>Game History</Text>
        <ScrollView contentContainerStyle={{ padding: 8 }} style={{}}>
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            teamOneCodexTwo={fakeData.teamTwoCodex}
            teamTwoCodexTwo={fakeData.teamOneCodex}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            teamOneCodexTwo={fakeData.teamTwoCodex}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            teamTwoCodexTwo={fakeData.teamOneCodex}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
          <HistoryListItem
            teamOneCodex={fakeData.teamOneCodex}
            teamOnePoints={fakeData.teamOnePoints}
            teamTwoCodex={fakeData.teamTwoCodex}
            teamTwoPoints={fakeData.teamTwoPoints}
            date={fakeData.date}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color="#C7B300"
          onPress={() =>
            navigation.navigate("Config", {
              primary: {
                primaryTitle: "Incisive Strike",
                primaryDescription: "Something",
              },
            })
          }
        >
          New Game
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 40,
    backgroundColor: "red",
  },
  buttonContainer: {
    padding: 20,
  },
  bodyContent: { flex: 1, width: "100%", maxWidth: 450 },
});
