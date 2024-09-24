import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { reformatDateWithDay, formatDateTime } from "../util/helpers";
import EditEntryModal from "./EditEntryModal";
import { useState } from "react";
export default function Entry({ entry, handleDelete, handleEdit }) {
  const [showModal, setShowModal] = useState(false);
  function showDeleteInstructions() {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete", [
      { text: "Confirm", onPress: () => handleDelete(entry.id) },
      { text: "Cancel", onPress: () => {} },
    ]),
      { cancelable: true };
  }
  return (
    <View style={styles.entryContainer}>
      {/* Entry Date and Time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{reformatDateWithDay(entry.date)}</Text>
        <Text style={styles.timeText}>
          {formatDateTime(entry.start)} - {formatDateTime(entry.end)}
        </Text>
      </View>

      {/* Entry Type and Description */}
      <View style={styles.detailContainer}>
        <Text style={styles.typeText}>Type: {entry.type}</Text>
        <Text style={styles.descriptionText}>
          Description: {entry.description}
        </Text>
      </View>

      {/* Edit and Delete Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
          ]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.pressed,
          ]}
          onPress={showDeleteInstructions}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
      <EditEntryModal
        visible={showModal}
        entry={entry}
        handleClose={() => setShowModal(false)}
        handleEdit={handleEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  dateTimeContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 14,
    color: "#555",
  },
  detailContainer: {
    marginBottom: 10,
  },
  typeText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#ffc107",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
