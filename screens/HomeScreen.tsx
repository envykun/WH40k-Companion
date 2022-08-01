import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, Dialog, Headline, Paragraph, Surface, Title } from "react-native-paper";
import HistoryListItem from "../components/HistoryListItem/HistoryListItem";
import Colors from "../constants/Colors";
import { clearHistory, createHistoryJSON, setHistory, getHistory, GameHistory } from "../hooks/useFileSystem";
import { Entypo } from "@expo/vector-icons";
import fontSize from "../constants/Text";

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const { isLoading, data, error, loadHistory } = getHistory();
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setInitialLoading(false);
    }
  }, [isLoading]);

  const handleClearHistory = () => {
    clearHistory();
    setShowClearHistoryDialog(false);
    loadHistory();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={{ borderRadius: 100 }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 100, margin: -12 }}
            resizeMode="stretch"
            source={require("../assets/images/adaptive-icon.png")}
          />
        </View>
        <Text
          style={[
            fontSize.large,
            {
              fontFamily: "roboto-regular",
              color: Colors.dark.yellow,
              textAlignVertical: "center",
            },
          ]}
        >
          WH40k Companion
        </Text>
      </View>
      <View style={styles.bodyContent}>
        {initialLoading ? (
          <ActivityIndicator animating={true} />
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          <Surface style={styles.surface}>
            <Title style={{ paddingBottom: 16, color: "#fff" }}>Game History</Title>
            <FlatList
              data={data}
              keyExtractor={(history, index) => "key" + index}
              onRefresh={() => loadHistory()}
              refreshing={isLoading}
              ListEmptyComponent={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ paddingLeft: 8, color: "#fff" }}>There is no history.</Text>
                  <Entypo name="emoji-sad" size={18} color="#fff" style={{ paddingLeft: 8 }} />
                </View>
              }
              renderItem={({ item }) => (
                <HistoryListItem
                  battleSize={item.battleSize}
                  teamOneCodex={item.teamOneCodex}
                  teamOneCodexTwo={item.teamOneCodexTwo}
                  teamOnePoints={item.teamOnePoints}
                  teamTwoCodex={item.teamTwoCodex}
                  teamTwoCodexTwo={item.teamTwoCodexTwo}
                  teamTwoPoints={item.teamTwoPoints}
                  date={item.date}
                  history={item}
                />
              )}
            />
          </Surface>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, maxWidth: 180 }}>
          <Button mode="text" color="#C7B300" onPress={() => setShowClearHistoryDialog(true)}>
            Clear History
          </Button>
        </View>
        <View style={{ flex: 1, maxWidth: 180 }}>
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
      <Dialog
        visible={showClearHistoryDialog}
        onDismiss={() => setShowClearHistoryDialog(false)}
        style={{ minWidth: 350, alignSelf: "center", backgroundColor: "white" }}
      >
        <Dialog.Title>Warning!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This will delete all history files. They cannot be restored.</Paragraph>
          <Paragraph>Are you sure?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowClearHistoryDialog(false)}>Cancel</Button>
          <Button mode="contained" onPress={handleClearHistory}>
            Yes, I'm sure
          </Button>
        </Dialog.Actions>
      </Dialog>
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
  },
  title: {
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  bodyContent: { flex: 1, width: "100%", paddingHorizontal: 12 },
  surface: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    padding: 12,
    elevation: 2,
  },
});
