import AsyncStorage from "@react-native-async-storage/async-storage";

export async function startSession(type, description, timestamp) {
  actions = [];
  actions.push(AsyncStorage.setItem("type", type));
  actions.push(AsyncStorage.setItem("description", description));
  actions.push(AsyncStorage.setItem("timeIn", timestamp));
  await Promise.all(actions);
}

export async function endSession() {
  actions = [];
  actions.push(AsyncStorage.removeItem("type"));
  actions.push(AsyncStorage.removeItem("description"));
  actions.push(AsyncStorage.removeItem("timeIn"));
  await Promise.all(actions);
}

export async function checkSession() {
  try {
    const [type, description, timeIn] = await Promise.all([
      AsyncStorage.getItem("type"),
      AsyncStorage.getItem("description"),
      AsyncStorage.getItem("timeIn"),
    ]);

    const isActive = type !== null && description !== null && timeIn !== null;

    return {
      type: type || "", // If null, return an empty string
      description: description || "", // If null, return an empty string
      timeIn: timeIn || "", // If null, return an empty string
      active: isActive,
    };
  } catch (error) {
    console.error("Error checking session:", error);
    // In case of an error, return default inactive session object
    return {
      type: "",
      description: "",
      timeIn: "",
      active: false,
    };
  }
}
