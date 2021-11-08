import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Divider, Menu, Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
  label: string;
  list: any;
  getValue: any;
  zIndex: number;
  zIndexReverse: number;
}

const Dropdown = ({ label, list, getValue, zIndex, zIndexReverse }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = useState(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <DropDownPicker
      open={visible}
      value={value}
      setOpen={setVisible}
      setValue={setValue}
      items={list}
      zIndex={zIndex}
      zIndexInverse={zIndexReverse}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  textStyle: {
    overflow: "visible",
    width: "100%",
  },
});
