import React, { useContext } from "react";
import { Pressable, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../styles/globalStyles";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <Pressable style={styles.toggleButton} onPress={toggleTheme}>
      <Text style={styles.buttonText}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </Text>
    </Pressable>
  );
}