import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";

const CustomCheckbox = ({ checked, toggleCheckbox }) => {
  return (
    <Pressable
      style={[
        styles.checkboxContainer,
        checked ? styles.checked : styles.unchecked,
      ]}
      onPress={toggleCheckbox}
    >
      {checked && <View style={styles.checkmark} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#007bff",
  },
  unchecked: {
    backgroundColor: "#ffffff",
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "#ffffff",
  },
});

export default CustomCheckbox;
