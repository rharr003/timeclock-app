import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { init, wipe } from "./db";
import TimeClock from "./components/TimeClock/TimeClock";
import History from "./components/History";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      await init();
      // await wipe();
      setLoading(false);
    }
    load();
  });
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="timeclock"
          component={TimeClock}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" color={color} size={size} />
            ),
            title: "Time Clock",
          }}
        />
        <Tab.Screen
          name="history"
          component={History}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" color={color} size={size} />
            ),
            title: "History",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
