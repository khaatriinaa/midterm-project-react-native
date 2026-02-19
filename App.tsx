import 'react-native-get-random-values'; // ✅ Required for UUID

import React from "react";
import { StatusBar } from "react-native";

import { JobsProvider } from "./src/context/JobsContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <JobsProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </JobsProvider>
    </ThemeProvider>
  );
}
