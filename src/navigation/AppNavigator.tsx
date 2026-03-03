import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JobFinderScreen from "../screens/JobFinder/JobFinderScreen";
import SavedJobsScreen from "../screens/SavedJobs/SavedJobsScreen";
import ApplicationFormScreen from "../screens/ApplicationForm/ApplicationFormScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="JobFinder" component={JobFinderScreen} />
      <Tab.Screen name="SavedJobs" component={SavedJobsScreen} />
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