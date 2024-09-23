import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function DescriptionInput({ value, onChangeText, placeholder }) {
  return (
    <View style={[styles.fakeContainer, styles.inputStyle]}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fakeContainer: {
    marginTop: 25,
    width: "85%",
  },
  inputStyle: {
    backgroundColor: "#bdbdbd",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    height: 50,
  },
  textInput: {
    fontSize: 20,
    color: "black",
    textAlign: "center", // Center the text inside the input
    height: "100%",
    width: "100%",
  },
});
