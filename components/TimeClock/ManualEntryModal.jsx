import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ManualEntryModal({
  visible,
  handleClose,
  handleManualEntrySubmit,
}) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const handleConfirm = () => {
    handleManualEntrySubmit(
      date.toISOString().split("T")[0] +
        "T" +
        startTime.toTimeString().split(" ")[0],
      date.toISOString().split("T")[0] +
        "T" +
        endTime.toTimeString().split(" ")[0],
      date.toISOString().split("T")[0].replace(/-/g, "/")
    );
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <Pressable style={styles.flex1}>
        <View style={styles.centeredView}>
          <Pressable style={styles.container}>
            <Text style={styles.header}>Manual Time Entry</Text>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Submit</Text>
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
    height: Math.min(height, 375),
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: 200,
    color: "blue",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
