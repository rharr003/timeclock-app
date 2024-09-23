import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomCheckbox from "./CheckBox";

export default function GroupSelectorModal({
  handleClose,
  visible,
  style,
  groups,
  handleSelect,
}) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <Pressable style={styles.flex1} onPress={handleClose}>
        <View style={styles.centeredView}>
          <Pressable style={styles.container}>
            {Object.keys(groups).map((group) => {
              return (
                <View style={styles.checkboxGroup} key={group}>
                  <Text style={styles.text}>{group}</Text>
                  <CustomCheckbox
                    checked={groups[group]}
                    toggleCheckbox={() => {
                      handleSelect(group);
                    }}
                  />
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleClose}
            >
              <Text style={styles.confirmButtonText}>Done</Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: Math.min(width, 350),
    height: Math.min(height, 375),
    backgroundColor: "#e0e0e0",
    position: "absolute",
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  flex1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.6)",
  },
  checkboxGroup: {
    flexDirection: "row",
    flexBasis: "40%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    marginVertical: 10,
  },

  text: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
