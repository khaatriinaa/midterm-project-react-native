import React, { useContext } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { JobsContext } from "../../context/JobsContext";
import styles from "./SavedJobsStyles";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs, removeJob } = useContext(JobsContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            <Pressable
              style={styles.applyBtn}
              onPress={() =>
                navigation.navigate("ApplicationForm", { fromSaved: true })
              }
            >
              <Text style={styles.btnText}>Apply</Text>
            </Pressable>

            <Pressable
              style={styles.removeBtn}
              onPress={() => removeJob(item.id)}
            >
              <Text style={styles.btnText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
