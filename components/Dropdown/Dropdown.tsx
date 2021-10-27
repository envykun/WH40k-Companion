import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Divider, Menu, Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

interface Props {
  label: string;
  list: any;
  getValue: any;
}

const Dropdown = ({ label, list, getValue }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = useState();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <DropDown
      label={label}
      mode="outlined"
      visible={visible}
      showDropDown={() => openMenu()}
      onDismiss={() => closeMenu()}
      value={value}
      setValue={setValue}
      list={list}
      dropDownItemTextStyle={styles.textStyle}
      dropDownItemStyle={{ width: "100%" }}
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
