import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import GroupSelectorModal from "./GroupSelectorModal";
import {
  pickerStyle,
  locationOptions,
  groupsObject,
} from "../../util/constants";

export default function LocationGroupPicker({ handleChange }) {
  const [location, setLocation] = useState("");
  const [groups, setGroups] = useState(groupsObject);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location && Object.values(groups).some((val) => val === true)) {
      const description = `${location}: ${Object.keys(groups)
        .filter((group) => groups[group] === true)
        .join(", ")}`;
      handleChange(description);
    } else {
      handleChange("");
    }
  }, [location, groups]);
  function handleChangeLocation(newLocation) {
    setLocation(newLocation === "null" ? "" : newLocation);
  }

  function handleChangeGroups(value) {
    setGroups((groups) => ({
      ...groups,
      [value]: !groups[value],
    }));
  }
  function handleGroupButtonPress() {
    setShowModal(true);
  }

  function handleHideModal() {
    setShowModal(false);
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleChangeLocation}
        items={locationOptions}
        style={pickerStyle}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            {location ? location : "Select location"}
          </Text>
        </View>
      </RNPickerSelect>
      <Pressable
        onPress={handleGroupButtonPress}
        style={[styles.fakeContainer, styles.buttonStyle]}
      >
        <Text style={styles.buttonTextStyle}>
          {Object.values(groups).some((val) => val === true)
            ? Object.keys(groups)
                .filter((group) => groups[group] === true)
                .join(", ")
            : "Select groups"}
        </Text>
      </Pressable>
      <GroupSelectorModal
        handleClose={handleHideModal}
        visible={showModal}
        groups={groups}
        handleSelect={handleChangeGroups}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginBottom: 25,
  },
  fakeContainer: {
    marginTop: 25,
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
