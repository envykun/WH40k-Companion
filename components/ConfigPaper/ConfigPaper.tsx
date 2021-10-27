import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Divider, HelperText, Menu, Provider, Surface } from "react-native-paper";
import Dropdown from "../Dropdown/Dropdown";

interface ConfigPaperProps {
  title: string;
  data: Array<DataListItem>;
  getValue: any;
  hasError: boolean;
}

export interface DataListItem {
  label: string;
  value: string;
}

const ConfigPaper = ({ title, data, getValue, hasError }: ConfigPaperProps) => {
  return (
    <Surface style={styles.surface}>
      <Text style={styles.text}>{title}</Text>
      <Dropdown list={data} label={title} getValue={getValue} />
      {hasError && (
        <HelperText type="error" visible={hasError}>
          * This field is required
        </HelperText>
      )}
    </Surface>
  );
};

export default ConfigPaper;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#1E1E1E",
    padding: 8,
    marginBottom: 12,
    maxWidth: 600,
    width: "100%",
  },
  text: {
    color: "#fff",
  },
});
