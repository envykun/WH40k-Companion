import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import Colors from "../../constants/Colors";

interface Props {
  label: string;
  list: any;
  getValue: any;
  multiSelect?: boolean;
  initialValue?: string;
}

const Dropdown = ({ label, list, getValue, multiSelect, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [multiple, setMultiple] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    multiSelect ? getValue(multiple) : getValue(value);
  }, [value, multiple]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return multiSelect ? (
    <DropDown
      label={label}
      mode={"outlined"}
      visible={visible}
      showDropDown={() => setVisible(true)}
      onDismiss={() => setVisible(false)}
      value={multiple}
      setValue={setMultiple}
      list={list}
      dropDownItemTextStyle={{ width: "200%" }}
      dropDownItemSelectedTextStyle={{ width: "200%" }}
      multiSelect
    />
  ) : (
    <DropDown
      label={label}
      mode={"outlined"}
      visible={visible}
      showDropDown={() => setVisible(true)}
      onDismiss={() => setVisible(false)}
      value={value}
      setValue={setValue}
      list={list}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
