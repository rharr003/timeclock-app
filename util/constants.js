import { Platform } from "react-native";

export const locationOptions = [
  "Great Bridge",
  "Greenbrier",
  "Mt. Trashmore",
  "Princess Anne",
].map((val) => ({
  label: val,
  color: Platform.OS === "ios" ? "#000000" : "#000000",
  value: val,
}));

export const groupsObject = {
  Novice: false,
  "Dev. Silver": false,
  "Dev. Gold": false,
  "AG Bronze": false,
  "AG Silver": false,
  "AG Gold": false,
  "Senior Bronze": false,
  "Senior Silver": false,
  "Senior Gold": false,
  "Pre-Nat": false,
  National: false,
  Multiple: false,
};

export const pickerStyle = {
  modalViewBottom: {
    backgroundColor: "#bdbdbd",
  },
  modalViewMiddle: {
    borderTopWidth: 0,
    backgroundColor: "#bdbdbd",
  },
  done: {
    color: "black",
  },
  chevron: {
    display: "none",
  },
};
