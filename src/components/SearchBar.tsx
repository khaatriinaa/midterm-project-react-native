import React from "react";
import { View, TextInput } from "react-native";
import styles from "../styles/globalStyles";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View>
      <TextInput
        placeholder="Search by Job Title"
        value={value}
        onChangeText={onChange}
        style={styles.searchInput}
      />
    </View>
  );
}
