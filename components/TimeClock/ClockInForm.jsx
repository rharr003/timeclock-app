import { View, StyleSheet } from "react-native";
import TypePicker from "./TypePicker";
import LocationGroupPicker from "./LocationGroupPicker";
import DescriptionInput from "./DescriptionInput";
export default function ClockInForm({
  handleChangeType,
  type,
  handleChangeDescription,
  description,
}) {
  return (
    <View style={styles.selectGroup}>
      <TypePicker handleChange={handleChangeType} type={type} />
      {type === "Practice" && (
        <LocationGroupPicker handleChange={handleChangeDescription} />
      )}
      {(type === "Competition" || type === "Meeting" || type === "Admin") && (
        <DescriptionInput
          value={description}
          onChangeText={handleChangeDescription}
          placeholder={"Type a description"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectGroup: {
    margin: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
