import { Pressable, Text, StyleSheet } from "react-native";

export default function ManualEntryButton({ disabled, handlePress }) {
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles.clockIn,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.buttonText}>Enter Manually</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  clockIn: {
    backgroundColor: "#2dce89",
  },
  clockOut: {
    backgroundColor: "#e63946",
  },
  button: {
    height: 75,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  disabled: {
    opacity: 0.25,
    backgroundColor: "#646464",
  },
});
