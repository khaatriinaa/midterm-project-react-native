import React, { useContext } from "react";
import { View, FlatList, Text, Pressable, SafeAreaView } from "react-native";
import { JobsContext } from "../../context/JobsContext";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import styles from "./SavedJobsStyles";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs, removeJob } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.background }]}>
      <View style={[styles.container, { backgroundColor: t.background }]}>
        {savedJobs.length === 0 && (
          <Text style={[styles.emptyText, { color: t.emptyText }]}>No saved jobs yet.</Text>
        )}
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <Text style={[styles.title, { color: t.title }]}>{item.title}</Text>
              <Text style={[styles.companyName, { color: t.subtitle }]}>{item.companyName}</Text>
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, { backgroundColor: t.applyBtn }]}
                  onPress={() => navigation.navigate("ApplicationForm", { job: item, fromSaved: true })}
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
    </SafeAreaView>
  );
}