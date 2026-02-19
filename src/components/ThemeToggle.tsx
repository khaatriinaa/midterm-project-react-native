import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.toggleButton,
          isDark ? styles.dark : styles.light,
        ]}
        onPress={toggleTheme}
      >
        <Text style={styles.text}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginBottom: 10,
  },

  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  light: {
    backgroundColor: "#424242",
  },

  dark: {
    backgroundColor: "#FFD54F",
  },

  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
