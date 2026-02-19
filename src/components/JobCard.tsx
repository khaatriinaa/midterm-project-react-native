import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Job } from "../types/JobTypes";
import { JobsContext } from "../context/JobsContext";
import { ThemeContext } from "../context/ThemeContext";

interface Props {
  job: Job;
  onApply: () => void;
}

export default function JobCard({ job, onApply }: Props) {
  const { saveJob, savedJobs } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);

  const isSaved = savedJobs.some(j => j.id === job.id);

  return (
    <View style={[styles.card, isDark && styles.dark]}>
      <Text style={[styles.title, isDark && styles.darkText]}>
        {job.title}
      </Text>

      <Text style={[styles.company, isDark && styles.darkText]}>
        {job.company}
      </Text>

      <View style={styles.row}>
        <Text style={[styles.salary, isDark && styles.darkText]}>
          {job.salary}
        </Text>
        <Text style={[styles.location, isDark && styles.darkText]}>
          {job.location}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <Pressable
          style={[styles.saveBtn, isSaved && styles.saved]}
          onPress={() => saveJob(job)}
        >
          <Text style={styles.btnText}>
            {isSaved ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Pressable style={styles.applyBtn} onPress={onApply}>
          <Text style={styles.btnText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
  },
  dark: { backgroundColor: "#1e1e1e" },
  title: { fontSize: 16, fontWeight: "bold" },
  company: { fontSize: 14, color: "#666", marginVertical: 4 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  salary: { fontWeight: "bold", color: "#1976D2" },
  location: { color: "#888" },
  btnRow: { flexDirection: "row", marginTop: 12 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#424242",
    padding: 10,
    borderRadius: 10,
    marginRight: 6,
  },
  saved: { backgroundColor: "#757575" },
  applyBtn: {
    flex: 1,
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  darkText: { color: "#fff" },
});
