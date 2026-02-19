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
    <View style={[styles.card, isDark && styles.darkCard]}>
      <Text style={[styles.title, isDark && styles.darkText]}>
        {job.title}
      </Text>

      <Text style={[styles.company, isDark && styles.darkText]}>
        {job.company}
      </Text>

      <Text style={[styles.details, isDark && styles.darkText]}>
        {job.salary}
      </Text>

      <Text style={[styles.details, isDark && styles.darkText]}>
        {job.location}
      </Text>

      <Pressable
        style={[
          styles.saveBtn,
          isSaved && styles.savedBtn
        ]}
        onPress={() => saveJob(job)}
      >
        <Text style={styles.btnText}>
          {isSaved ? "Saved" : "Save Job"}
        </Text>
      </Pressable>

      <Pressable style={styles.applyBtn} onPress={onApply}>
        <Text style={styles.btnText}>Apply</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
  },

  darkCard: {
    backgroundColor: "#1e1e1e",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1a1a1a",
  },

  company: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },

  details: {
    fontSize: 13,
    marginBottom: 4,
    color: "#666",
  },

  darkText: {
    color: "#ffffff",
  },

  saveBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  savedBtn: {
    backgroundColor: "#757575",
  },

  applyBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
