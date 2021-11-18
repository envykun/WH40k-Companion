import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, Dialog, Headline, Paragraph, Surface, Title } from "react-native-paper";
import HistoryListItem from "../components/HistoryListItem/HistoryListItem";
import Colors from "../constants/Colors";
import { clearHistory, createHistoryJSON, setHistory, getHistory, GameHistory } from "../hooks/useFileSystem";
import { Entypo } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const { isLoading, data, error, loadHistory } = getHistory();
  const [showAlert, setShowAlert] = useState(false);

  const fakeData = {
    teamOneCodex: "Adeptus Custodes",
    teamTwoCodex: "Adeptus Mechanicus",
    teamOnePoints: 65,
    teamTwoPoints: 69,
    date: new Date(),
  };
  console.log(isLoading);
  // console.log(data);

  const handleClearHistory = () => {
    clearHistory();
    setShowAlert(false);
    loadHistory();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 42, fontFamily: "roboto-regular", color: Colors.dark.yellow }}>Warhammer 40k Companion</Text>
      </View>
      <View style={styles.bodyContent}>
        <Title style={{ padding: 8, color: "#fff" }}>Game History</Title>
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : error ? (
          <Text>{error.message}</Text>
        ) : data ? (
          <Surface style={styles.surface}>
            <ScrollView contentContainerStyle={{ padding: 8 }} style={{}}>
              {data
                .map((history: GameHistory, index: number) => (
                  <HistoryListItem
                    key={index}
                    battleSize={history.battleSize}
                    teamOneCodex={history.teamOneCodex}
                    teamOnePoints={history.teamOnePoints}
                    teamTwoCodex={history.teamTwoCodex}
                    teamTwoPoints={history.teamTwoPoints}
                    date={history.date}
                    history={history}
                  />
                ))
                .reverse()}
            </ScrollView>
          </Surface>
        ) : (
          <Surface style={styles.surface}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
              <Text style={{ paddingLeft: 8, color: "#fff" }}>There is no history</Text>
              <Entypo name="emoji-sad" size={18} color="#fff" style={{ paddingLeft: 8 }} />
            </View>
          </Surface>
        )}
      </View>
      <Dialog visible={showAlert} onDismiss={() => setShowAlert(false)}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleClearHistory}>Done</Button>
        </Dialog.Actions>
      </Dialog>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <Button mode="text" color="#C7B300" onPress={() => setShowAlert(true)}>
            Clear History
          </Button>
        </View>
        <View style={{ flex: 1 }}>
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
    backgroundColor: "#101010",
    marginTop: 26,
  },
  title: {
    padding: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    padding: 20,
    flexDirection: "row",
    width: 650,
  },
  bodyContent: { flex: 1, width: "100%", maxWidth: 650 },
  surface: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    padding: 12,
    elevation: 2,
  },
});
