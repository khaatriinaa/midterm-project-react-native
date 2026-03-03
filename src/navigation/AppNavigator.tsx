import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import JobFinderScreen from "../screens/JobFinder/JobFinderScreen";
import SavedJobsScreen from "../screens/SavedJobs/SavedJobsScreen";
import ApplicationFormScreen from "../screens/ApplicationForm/ApplicationFormScreen";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/globalStyles";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Simple SVG-free icons using emoji or unicode symbols
function TabIcon({ focused, icon, label, color }: { focused: boolean; icon: string; label: string; color: string }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: focused ? 22 : 20, marginBottom: 1 }}>{icon}</Text>
    </View>
  );
}

function Tabs() {
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: t.card,
          borderTopColor: t.cardBorder,
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 28,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: t.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{
          tabBarLabel: "Job Finder",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} icon="🔍" label="Job Finder" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          tabBarLabel: "Saved Jobs",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} icon="🔖" label="Saved Jobs" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationFormScreen}
          options={{ title: "Apply for Job" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}