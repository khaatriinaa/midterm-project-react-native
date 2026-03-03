import React, { useContext } from "react";
import { View, FlatList, Text, Pressable } from "react-native";

import { JobsContext } from "../../context/JobsContext";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./SavedJobsStyles";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs, removeJob } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {savedJobs.length === 0 && (
        <Text style={styles.emptyText}>No saved jobs yet.</Text>
      )}

      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.companyName}>{item.companyName}</Text>

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate("ApplicationForm", {
                    job: item,
                    fromSaved: true,
                  })
                }
              >
                <Text style={styles.buttonText}>Apply</Text>
              </Pressable>

              <Pressable
                style={[styles.button, { backgroundColor: "#EF4444" }]}
                onPress={() => removeJob(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
