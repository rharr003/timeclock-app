import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateTimeEntry } from "../db";

export default function EditEntryModal({
  visible,
  handleClose,
  entry,
  handleEdit,
}) {
  // Convert ISO strings to Date objects for local time editing
  const [date, setDate] = useState(new Date(entry.start));
  const [startTime, setStartTime] = useState(new Date(entry.start));
  const [endTime, setEndTime] = useState(new Date(entry.end));
  const [description, setDescription] = useState(entry.description);
  async function handleSave() {
    const datePrefix = date.toISOString().split("T")[0] + "T";
    //update date prefix for start and end as they wont be correct if the user changed the date since they always intialize to the current date
    const start = datePrefix + startTime.toTimeString().split(" ")[0];
    const end = datePrefix + endTime.toTimeString().split(" ")[0];
    const localDate = date.toLocaleDateString("en-CA").replace(/-/g, "/");
    await handleEdit(entry.id, start, end, localDate, description);
    handleClose();
  }
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <Pressable style={styles.flex1} onPress={() => {}}>
        <View style={styles.centeredView}>
          <Pressable style={styles.container}>
            <Text style={styles.header}>Edit Time Clock Entry</Text>

            {/* Date Picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Select Date</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                }}
                style={styles.picker}
              />
            </View>

            {/* Start Time Picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Start Time</Text>
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) setStartTime(selectedTime);
                }}
                style={styles.picker}
              />
            </View>

            {/* End Time Picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>End Time</Text>
              <DateTimePicker
                value={endTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) setEndTime(selectedTime);
                }}
                style={styles.picker}
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                multiline
              />
            </View>

            {/* Confirm and Cancel Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleSave}
              >
                <Text style={styles.confirmButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: Math.min(width, 350),
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flex1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.6)",
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
  },
  picker: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
