import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

// Helper function to format date and time to AM/PM format
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function reformatDateWithDay(dateString) {
  // Create a Date object in local time from the input string
  const [year, month, day] = dateString.split("/");
  const date = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

  // Get day of the week and format month/day
  const options = { weekday: "long" }; // e.g., "Monday"
  const dayOfWeek = date.toLocaleDateString("en-US", options);
  const formattedDate = `${month}/${day}`;

  // Combine day of the week with formatted date
  return `${dayOfWeek} ${formattedDate}`;
}

export default function Entry({ entry }) {
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
        <Pressable style={styles.editButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
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
});
