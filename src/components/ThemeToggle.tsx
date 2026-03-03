import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <Pressable onPress={toggleTheme} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Text style={{ color: "#ffffff", fontSize: 14 }}></Text>
      <View
        style={{
          width: 46,
          height: 26,
          borderRadius: 13,
          backgroundColor: isDark ? "#60A5FA" : "rgba(255,255,255,0.35)",
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.5)",
          justifyContent: "center",
          paddingHorizontal: 3,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#ffffff",
            alignSelf: isDark ? "flex-end" : "flex-start",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </View>
    </Pressable>
  );
}