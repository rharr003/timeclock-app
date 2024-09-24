import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import Entry from "./Entry";
import { calculateTotalHours } from "../util/helpers";
import { globalStyles } from "../util/globalStyles";
import { generatePDF } from "../util/pdf";

export default function EntryGroup({ group, handleDelete, handleEdit }) {
  const [collapsed, setCollapsed] = useState(true);
  const total = calculateTotalHours(group.entries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.dateRange}>{group.dateRange}</Text>
          <Text style={[styles.dateRange, styles.hours]}>
            Total hours: {total}
          </Text>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.pdfButton,
              pressed && globalStyles.pressed,
            ]}
            onPress={() => generatePDF(group, total)}
          >
            <Text style={styles.pdfButtonText}>Generate PDF</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.toggleButton,
              pressed && globalStyles.pressed,
            ]}
            onPress={() => setCollapsed((prevState) => !prevState)}
          >
            <Text style={styles.toggleButtonText}>
              {collapsed ? "Show Entries" : "Hide Entries"}
            </Text>
          </Pressable>
        </View>
      </View>
      {!collapsed && (
        <FlatList
          data={group.entries}
          renderItem={({ item }) => (
            <Entry
              entry={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Unique key for each entry
          contentContainerStyle={styles.entryList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateRange: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  hours: {
    fontSize: 16,
    fontWeight: "normal",
  },
  pdfButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pdfButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  entryList: {
    paddingVertical: 5,
  },
  toggleButton: {
    backgroundColor: "#ff6347",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
