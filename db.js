import * as SQLite from "expo-sqlite";
import { getDateRangeLabel } from "./util/helpers";

const db = SQLite.openDatabaseSync("tide.db");

export const init = async () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS time_entries (
            id INTEGER PRIMARY KEY NOT NULL,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT NOT NULL
            )`
  );
};

export const wipe = async () => {
  db.execAsync(`DROP TABLE IF EXISTS time_entries`);
  console.log("db wiped");
};

export const updateTimeEntry = async (id, start, end, date, description) => {
  const query = `UPDATE time_entries SET start=?, end=?, date=?, description = ? WHERE id = ?`;
  await db.runAsync(query, start, end, date, description, id);
};

export const deleteTimeEntry = async (id) => {
  const query = `DELETE FROM time_entries WHERE id = ?`;
  await db.runAsync(query, id);
};

export const createTimeEntry = async (start, end, date, type, description) => {
  const query = `INSERT INTO time_entries (start, end, date, type, description) VALUES (?, ?, ?, ?, ?)`;
  await db.runAsync(query, start, end, date, type, description);
};

export const fetchTimeEntries = async (startDate) => {
  // Construct the query to fetch entries from the given start date up to now
  const query = `SELECT * FROM time_entries WHERE date >= ? ORDER BY date ASC`;
  const entries = await db.getAllAsync(query, startDate);

  // Object to hold grouped entries
  const groupedEntries = {};

  // Iterate over entries and group them by date range
  for (let entry of entries) {
    const rangeLabel = getDateRangeLabel(entry.start);

    if (!groupedEntries[rangeLabel]) {
      groupedEntries[rangeLabel] = [];
    }

    groupedEntries[rangeLabel].push(entry);
  }

  // Convert the groupedEntries object into an array of objects with dateRange and entries
  const result = Object.keys(groupedEntries).map((rangeLabel) => ({
    dateRange: rangeLabel,
    entries: groupedEntries[rangeLabel],
  }));

  return result;
};
