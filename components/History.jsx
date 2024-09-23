import { FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchTimeEntries } from "../db";
import { useIsFocused } from "@react-navigation/native";
import EntryGroup from "./EntryGroup";
const getRoundedStartOfMonthSixMonthsAgo = () => {
  const today = new Date();

  // Subtract 6 months from today's date
  today.setMonth(today.getMonth() - 9);

  // Set the day to the first of the month
  today.setDate(1);

  // Reset time to the start of the day (00:00:00)
  today.setHours(0, 0, 0, 0);

  // Format the date to YYYY/MM/DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
export default function History() {
  const [payPeriods, setPayPeriods] = useState([]);
  const focused = useIsFocused();
  useEffect(() => {
    async function init() {
      const fetchedEntries = await fetchTimeEntries(
        getRoundedStartOfMonthSixMonthsAgo()
      );
      setPayPeriods(fetchedEntries);
    }
    if (focused) {
      init();
    }
  }, [focused]);
  return (
    <FlatList
      data={payPeriods}
      renderItem={({ item }) => <EntryGroup group={item} />}
      keyExtractor={(item) => item.dateRange}
    />
  );
}
