import React from "react";
import { View, StyleSheet, Text } from "react-native";

function formatISOToLocal(isoString) {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Get the components of the date and time
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM and adjust hours for 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert 24-hour format to 12-hour format
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  // Format the components with leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine them into the desired format
  return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

export default function ActiveSession({ type, description, time }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>You are clocked in</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Time in:</Text>
        <Text style={styles.value}>{formatISOToLocal(time)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{type}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    width: 100, // Adjust this width to align the labels
  },
  value: {
    color: "#555",
    flexShrink: 1, // Allows the text to wrap if it's too long
  },
});
