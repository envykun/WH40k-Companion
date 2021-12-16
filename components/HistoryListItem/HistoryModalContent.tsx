import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  DataTable,
  Headline,
  IconButton,
  Paragraph,
  Surface,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import Colors from "../../constants/Colors";
import { Images } from "../../constants/Images";
import { createHistoryJSON, GameHistory, setHistory } from "../../hooks/useFileSystem";
import ImagePickerPaper from "../ImagePicker/ImagePickerPaper";

interface Props {
  history: GameHistory | null;
  isTeamTwo?: boolean;
  navigation: any;
  isEndScreen?: boolean;
  closeModal?: any;
}

const StatsPaper = ({ history, isTeamTwo, navigation }: Props) => {
  return (
    <Surface style={styles.surface}>
      <View style={{ paddingLeft: 16 }}>
        <Headline style={{ color: "#6e6e6e", alignSelf: "center" }}>Statistic {isTeamTwo ? "Team 2" : "Team 1"}</Headline>
        {!isTeamTwo ? (
          <View>
            <Title>
              Team: {history?.playerOneName}
              {history?.playerOneNameTwo && ` & ${history.playerOneNameTwo}`}
            </Title>
            <Title>
              Codex: {history?.teamOneCodex}
              {history?.teamOneCodexTwo && ` | ${history.teamOneCodexTwo}`}
            </Title>
          </View>
        ) : (
          <View>
            <Title>
              Team: {history?.playerTwoName}
              {history?.playerTwoNameTwo && ` & ${history.playerTwoNameTwo}`}
            </Title>
            <Title>
              Codex: {history?.teamTwoCodex}
              {history?.teamTwoCodexTwo && ` | ${history.teamTwoCodexTwo}`}
            </Title>
          </View>
        )}
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 3 }}>Objectives</DataTable.Title>
          <DataTable.Title numeric>BR 1</DataTable.Title>
          <DataTable.Title numeric>BR 2</DataTable.Title>
          <DataTable.Title numeric>BR 3</DataTable.Title>
          <DataTable.Title numeric>BR 4</DataTable.Title>
          <DataTable.Title numeric>BR 5</DataTable.Title>
          <DataTable.Title numeric>Total</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={{ flex: 3 }}>Primary</DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOnePrimary.roundPoints.one : history?.teamTwoPrimary.roundPoints.one}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOnePrimary.roundPoints.two : history?.teamTwoPrimary.roundPoints.two}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOnePrimary.roundPoints.three : history?.teamTwoPrimary.roundPoints.three}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOnePrimary.roundPoints.four : history?.teamTwoPrimary.roundPoints.four}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOnePrimary.roundPoints.five : history?.teamTwoPrimary.roundPoints.five}
          </DataTable.Cell>
          <DataTable.Cell numeric>{!isTeamTwo ? history?.teamOnePrimary.totalPoints : history?.teamTwoPrimary.totalPoints}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 3 }}>
            <View style={{ flex: 1 }}>
              <Caption>Secondary 1</Caption>
              <Text numberOfLines={1}>
                {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.title : history?.teamTwoSecondary.secondaryOne.title}
              </Text>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.roundPoints.one : history?.teamTwoSecondary.secondaryOne.roundPoints.one}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.roundPoints.two : history?.teamTwoSecondary.secondaryOne.roundPoints.two}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryOne.roundPoints.three
              : history?.teamTwoSecondary.secondaryOne.roundPoints.three}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.roundPoints.four : history?.teamTwoSecondary.secondaryOne.roundPoints.four}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.roundPoints.five : history?.teamTwoSecondary.secondaryOne.roundPoints.five}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryOne.totalPoints : history?.teamTwoSecondary.secondaryOne.totalPoints}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={{ flex: 3 }}>
            <View style={{ flex: 1 }}>
              <Caption>Secondary 2</Caption>
              <Text numberOfLines={1}>
                {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.title : history?.teamTwoSecondary.secondaryTwo.title}
              </Text>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.roundPoints.one : history?.teamTwoSecondary.secondaryTwo.roundPoints.one}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.roundPoints.two : history?.teamTwoSecondary.secondaryTwo.roundPoints.two}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryTwo.roundPoints.three
              : history?.teamTwoSecondary.secondaryTwo.roundPoints.three}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.roundPoints.four : history?.teamTwoSecondary.secondaryTwo.roundPoints.four}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.roundPoints.five : history?.teamTwoSecondary.secondaryTwo.roundPoints.five}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryTwo.totalPoints : history?.teamTwoSecondary.secondaryTwo.totalPoints}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={{ flex: 3 }}>
            <View style={{ flex: 1 }}>
              <Caption>Secondary 3</Caption>
              <Text numberOfLines={1}>
                {!isTeamTwo ? history?.teamOneSecondary.secondaryThree.title : history?.teamTwoSecondary.secondaryThree.title}
              </Text>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryThree.roundPoints.one
              : history?.teamTwoSecondary.secondaryThree.roundPoints.one}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryThree.roundPoints.two
              : history?.teamTwoSecondary.secondaryThree.roundPoints.two}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryThree.roundPoints.three
              : history?.teamTwoSecondary.secondaryThree.roundPoints.three}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryThree.roundPoints.four
              : history?.teamTwoSecondary.secondaryThree.roundPoints.four}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo
              ? history?.teamOneSecondary.secondaryThree.roundPoints.five
              : history?.teamTwoSecondary.secondaryThree.roundPoints.five}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {!isTeamTwo ? history?.teamOneSecondary.secondaryThree.totalPoints : history?.teamTwoSecondary.secondaryThree.totalPoints}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Surface>
  );
};

const HistoryModalContent = ({ history, navigation, isEndScreen, closeModal }: Props) => {
  const [images, setImages] = useState<Array<string>>(history?.attachment || []);
  const [comment, setComment] = useState<string>(history?.notes || "");
  const [showImageMax, setShowImageMax] = useState<{ show: boolean; source: string }>({ show: false, source: "" });

  const handleSave = () => {
    if (!history) return;
    history.notes = comment;
    history.attachment = images;
    const historyString = createHistoryJSON(history);
    // MOVE IMAGES
    setHistory(historyString);
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      {history ? (
        showImageMax.show ? (
          <View>
            <Image source={{ uri: showImageMax.source }} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
          </View>
        ) : (
          <ScrollView>
            <KeyboardAvoidingView behavior="position" enabled>
              <View style={styles.headerContainer}>
                <View style={{ width: 140, paddingLeft: 16 }}>
                  <Headline style={{ color: "#fff" }}>{history.date}</Headline>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Headline style={{ color: "#fff" }}>{history.battleSize}</Headline>
                </View>
                <View style={{ width: 140, alignItems: "flex-end", paddingRight: 16 }}>
                  <Headline style={{ color: "#fff" }}>{new Date(history.timePlayed * 1000).toISOString().substr(11, 8)}h</Headline>
                </View>
              </View>
              <View style={styles.resultContainer}>
                <View style={styles.resultContainerInner}>
                  <View style={{ alignItems: "flex-end", flexDirection: "row-reverse" }}>
                    <Surface style={styles.icon}>
                      <View style={styles.iconContainer}>
                        <Image resizeMode="contain" style={{ width: "90%", height: "90%" }} source={Images.icons[history.teamOneCodex]} />
                      </View>
                    </Surface>
                    {history.teamOneCodexTwo && (
                      <Surface style={[styles.icon, { marginRight: 8 }]}>
                        <View style={styles.iconContainer}>
                          <Image
                            resizeMode="contain"
                            style={{ width: "90%", height: "90%" }}
                            source={Images.icons[history.teamOneCodexTwo]}
                          />
                        </View>
                      </Surface>
                    )}
                  </View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Headline style={{ fontSize: 56, lineHeight: 64 }}>{history.teamOnePoints}</Headline>
                    <Headline style={{ fontSize: 56, lineHeight: 56 }}>:</Headline>
                    <Headline style={{ fontSize: 56, lineHeight: 64 }}>{history.teamTwoPoints}</Headline>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Surface style={styles.icon}>
                      <View style={styles.iconContainer}>
                        <Image resizeMode="contain" style={{ width: "90%", height: "90%" }} source={Images.icons[history.teamTwoCodex]} />
                      </View>
                    </Surface>
                    {history.teamTwoCodexTwo && (
                      <Surface style={[styles.icon, { marginLeft: 8 }]}>
                        <View style={styles.iconContainer}>
                          <Image
                            resizeMode="contain"
                            style={{ width: "90%", height: "90%" }}
                            source={Images.icons[history.teamTwoCodexTwo]}
                          />
                        </View>
                      </Surface>
                    )}
                  </View>
                </View>
                <Headline style={{ color: "#fff" }}>Mission: {history.mission}</Headline>
              </View>
              <View style={styles.subContainer}>
                <View style={styles.paperContainer}>
                  <StatsPaper history={history} navigation={navigation} />
                </View>
                <View style={styles.paperContainer}>
                  <StatsPaper history={history} isTeamTwo navigation={navigation} />
                </View>
              </View>
              <View style={styles.subContainer}>
                <View style={styles.paperContainer}>
                  <Surface style={styles.surface}>
                    <View>{isEndScreen ? <Caption>Add some pictures.</Caption> : <Caption>Memories:</Caption>}</View>
                    <ImagePickerPaper getImages={setImages} historyImages={images} isEndScreen={isEndScreen} setShowMax={setShowImageMax} />
                  </Surface>
                </View>
                <View style={styles.paperContainer}>
                  {isEndScreen ? (
                    <Surface style={styles.surface}>
                      <View>
                        <Caption>Add a comment about the game.</Caption>
                      </View>
                      <TextInput mode="outlined" multiline label="Comment" value={comment} onChangeText={setComment} />
                    </Surface>
                  ) : (
                    <Surface style={styles.surface}>
                      <View>
                        <Caption>Comments:</Caption>
                        <Paragraph>{comment ? comment : "There is no comment."}</Paragraph>
                      </View>
                    </Surface>
                  )}
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        )
      ) : (
        <ActivityIndicator animating={true} />
      )}
      {isEndScreen ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Button mode="contained" onPress={() => handleSave()}>
            Save and Return
          </Button>
        </View>
      ) : (
        <View style={{ position: "absolute", top: 10, right: -10 }}>
          <IconButton
            icon={() => <MaterialCommunityIcons name="window-close" size={24} color="white" />}
            onPress={() => {
              showImageMax.show ? setShowImageMax({ show: false, source: "" }) : closeModal();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default HistoryModalContent;

const styles = StyleSheet.create({
  container: {
    height: "95%",
    margin: 0,
    backgroundColor: "#101010",
    padding: 12,
  },
  headerContainer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  resultContainerInner: {
    flexDirection: "row",
    backgroundColor: "#C7B300",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  paperContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  surface: {
    width: "100%",
    backgroundColor: Colors.dark.grey,
    padding: 12,
  },
  icon: {
    borderRadius: 50000,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    backgroundColor: "#E5E5E5",
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 50000,
  },
});
