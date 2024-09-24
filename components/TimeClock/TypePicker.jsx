import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet, Platform } from "react-native";

const pickerStyle = {
  modalViewBottom: {
    backgroundColor: "#bdbdbd",
  },
  modalViewMiddle: {
    borderTopWidth: 0,
    backgroundColor: "#bdbdbd",
  },
  done: {
    color: "black",
  },
  chevron: {
    display: "none",
  },
};

export const options = ["Practice", "Competition", "Meeting", "Admin"].map(
  (val) => ({
    label: val,
    color: Platform.OS === "ios" ? "#000000" : "#000000",
    value: val,
  })
);

export default function TypePicker({ handleChange, type }) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChange}
        items={options}
        style={pickerStyle}
        value={type}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            {type ? type : "Select type"}
          </Text>
        </View>
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginBottom: 25,
  },
  buttonStyle: {
    backgroundColor: "#bdbdbd",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },

  buttonTextStyle: {
    fontSize: 20,
    color: "black",
  },
});
