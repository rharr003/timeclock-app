import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ClockInButton from "./ClockInButton";
import ClockInForm from "./ClockInForm";
import {
  startSession,
  endSession,
  checkSession,
} from "../../util/localStorage";
import ActiveSession from "./ActiveSession";
import ManualEntryButton from "./ManualEntryButton";
import { createTimeEntry } from "../../db";
import ManualEntryModal from "./ManualEntryModal";

export default function TimeClock() {
  const [state, setState] = useState({
    clockedIn: false,
    type: "",
    description: "",
    timeIn: "",
  });
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);

  useEffect(() => {
    async function init() {
      const currSession = await checkSession();
      if (currSession.active) {
        setState({
          clockedIn: true,
          type: currSession.type,
          description: currSession.description,
          timeIn: currSession.timeIn,
        });
      }
    }
    init();
  }, []);

  async function handleClockInPress() {
    if (state.clockedIn) {
      endSession();
      await createTimeEntry(
        state.timeIn,
        new Date().toISOString(),
        new Date().toISOString().split("T")[0].replace(/-/g, "/"),
        state.type,
        state.description
      );
      setState((prevState) => ({
        ...prevState,
        clockedIn: false,
        type: "",
        description: "",
        timeIn: "",
      }));
    } else {
      const timestamp = new Date().toISOString();
      startSession(state.type, state.description, timestamp);
      setState((prevState) => ({
        ...prevState,
        clockedIn: true,
        timeIn: timestamp,
      }));
    }
  }

  function handleChangeType(data) {
    setState((prevState) => ({
      ...prevState,
      type: data === "null" ? "" : data,
    }));
  }

  function handleChangeDescription(data) {
    setState((prevState) => ({
      ...prevState,
      description: data,
    }));
  }

  function triggerManualEntryModal() {
    setShowManualEntryModal((showManualEntryModal) => !showManualEntryModal);
  }

  async function handleManualEntrySubmit(timeIn, timeOut, date) {
    await createTimeEntry(timeIn, timeOut, date, state.type, state.description);
    setState({
      clockedIn: false,
      type: "",
      description: "",
      timeIn: "",
    });
  }

  return (
    <View style={styles.container}>
      {!state.clockedIn && (
        <ClockInForm
          type={state.type}
          handleChangeType={handleChangeType}
          description={state.description}
          handleChangeDescription={handleChangeDescription}
        />
      )}
      {state.clockedIn && (
        <ActiveSession
          type={state.type}
          description={state.description}
          time={state.timeIn}
        />
      )}
      <ClockInButton
        disabled={!state.type || !state.description}
        clockedIn={state.clockedIn}
        handlePress={handleClockInPress}
      />
      {!state.clockedIn && (
        <ManualEntryButton
          disabled={!state.type || !state.description}
          handlePress={triggerManualEntryModal}
        />
      )}
      <ManualEntryModal
        visible={showManualEntryModal}
        handleClose={triggerManualEntryModal}
        handleManualEntrySubmit={handleManualEntrySubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
