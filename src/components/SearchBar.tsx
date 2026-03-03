import React from "react";
import { View, TextInput } from "react-native";
import styles from "../styles/globalStyles";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={{ marginTop: -20, marginBottom: 16, zIndex: 10 }}>
      <TextInput
        placeholder="Search job, company..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
        style={styles.searchInput}
      />
    </View>
  );
}