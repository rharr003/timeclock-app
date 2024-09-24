import { FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchTimeEntries } from "../db";
import { useIsFocused } from "@react-navigation/native";
import EntryGroup from "./EntryGroup";
import { deleteTimeEntry, updateTimeEntry } from "../db";
import { getRoundedStartOfMonthSixMonthsAgo } from "../util/helpers";
import { getDateRangeLabel } from "../util/helpers";

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

  async function handleEdit(id, start, end, date, description) {
    await updateTimeEntry(id, start, end, date, description);
    // this is really ineffiecient will update when i have time
    const fetchedEntries = await fetchTimeEntries(
      getRoundedStartOfMonthSixMonthsAgo()
    );
    setPayPeriods(fetchedEntries);
  }

  async function handleDelete(id) {
    await deleteTimeEntry(id);
    // this is really ineffiecient will update when i have time
    const fetchedEntries = await fetchTimeEntries(
      getRoundedStartOfMonthSixMonthsAgo()
    );
    setPayPeriods(fetchedEntries);
  }
  return (
    <FlatList
      data={payPeriods}
      renderItem={({ item }) => (
        <EntryGroup
          group={item}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      keyExtractor={(item) => item.dateRange}
    />
  );
}
