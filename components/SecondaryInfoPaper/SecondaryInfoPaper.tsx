import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import { SecondaryData } from "../../screens/ConfigScreen";
import SecondaryInfoPaperItem from "./SecondaryInfoPaperItem";

interface Props {
  secondaries: Array<SecondaryData>;
  scrollTo?: string;
}

const SecondaryInfoPaper = ({ secondaries, scrollTo }: Props) => {
  const flatListRef = useRef<FlatList<SecondaryData> | null>(null);
  const index = secondaries.findIndex((item) => item.title === scrollTo);
  const OFFSET = index === 0 ? 0 : index === secondaries.length - 1 ? index : index - 2;

  const scrollToItem = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ animated: true, index: OFFSET });
    }, 1000);
  };

  useEffect(() => {
    if (scrollTo) {
      scrollToItem();
    }
  }, [scrollTo]);

  return (
    <Surface style={styles.surface}>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        onScrollToIndexFailed={() => console.log("Can't find scroll item")}
        keyExtractor={(item, index) => "key" + index}
        data={secondaries.sort((a, b) => a.title.localeCompare(b.title))}
        renderItem={({ item }) => <SecondaryInfoPaperItem secondary={item} highlight={scrollTo} />}
      />
    </Surface>
  );
};

export default SecondaryInfoPaper;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 8,
    position: "relative",
    maxWidth: 600,
  },
});
