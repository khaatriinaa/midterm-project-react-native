import React from "react";
import { View, TextInput } from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View>
      <TextInput
        placeholder="Search by Job Title..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
