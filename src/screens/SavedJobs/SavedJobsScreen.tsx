import React, { useContext } from "react";
import { View, FlatList, Text, Pressable, SafeAreaView, Alert } from "react-native";
import { JobsContext } from "../../context/JobsContext";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./SavedJobsStyles";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs, removeJob } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  const handleRemove = (id: string, title: string) => {
    Alert.alert(
      "Remove Job",
      `Are you sure you want to remove "${title}" from your saved jobs?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeJob(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.headerBg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: t.headerBg }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Saved Jobs 🔖</Text>
            <Text style={styles.headerSubtitle}>{savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      {/* Content */}
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
                  onPress={() => handleRemove(item.id, item.title)}
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