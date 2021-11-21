import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Caption, IconButton, Surface } from "react-native-paper";

interface Props {
  initialValue: number;
  title?: string;
  small?: boolean;
  addOne?: boolean;
}

const CPCounter = ({ initialValue, title, small, addOne }: Props) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    addOne && setValue((value) => value + 1);
  }, [addOne]);

  return (
    <View style={{ alignItems: "center" }}>
      {small ? (
        <>
          <Surface style={styles.containerSmall}>
            <Caption
              numberOfLines={1}
              style={{
                fontSize: 8,
                margin: 0,
                padding: 0,
                lineHeight: 10,
                paddingLeft: 2,
                marginBottom: -4,
              }}
            >
              {title}
            </Caption>
            <View style={{ flexDirection: "row" }}>
              <View>
                <IconButton
                  icon={() => <Ionicons name="ios-remove-circle-outline" size={22} color="black" />}
                  size={15.8}
                  onPress={() => setValue((value) => value - 1)}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cpTextSmall}>{value} CP</Text>
              </View>
              <View>
                <IconButton
                  icon={() => <Ionicons name="ios-add-circle-outline" size={22} color="black" />}
                  size={15.8}
                  onPress={() => setValue((value) => value + 1)}
                />
              </View>
            </View>
          </Surface>
        </>
      ) : (
        <Surface style={styles.container}>
          <View>
            <IconButton
              icon={() => <Ionicons name="ios-remove-circle-outline" size={32} color="black" />}
              size={24}
              onPress={() => setValue((value) => value - 1)}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cpText}>{value} CP</Text>
          </View>
          <View>
            <IconButton
              icon={() => <Ionicons name="ios-add-circle-outline" size={32} color="black" />}
              size={24}
              onPress={() => setValue((value) => value + 1)}
            />
          </View>
        </Surface>
      )}
    </View>
  );
};

export default CPCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#C4C4C4",
    elevation: 3,
  },
  containerSmall: {
    borderRadius: 5,
    backgroundColor: "#C4C4C4",
    elevation: 3,
    maxWidth: 130,
    alignItems: "center",
    margin: 2,
  },
  cpText: {
    fontSize: 36,
  },
  cpTextSmall: {
    fontSize: 18,
  },
  textContainer: {
    justifyContent: "center",
  },
});
