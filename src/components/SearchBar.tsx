import React, { useContext } from "react";
import { View, TextInput } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import styles, { lightTheme, darkTheme } from "../styles/globalStyles";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <View style={{ marginTop: -20, marginBottom: 16, zIndex: 10 }}>
      <TextInput
        placeholder="Search job, company..."
        placeholderTextColor={t.inputPlaceholder}
        value={value}
        onChangeText={onChange}
        style={[styles.searchInput, { backgroundColor: t.input, color: t.inputText }]}
      />
    </View>
  );
}