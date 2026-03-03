import React, { useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { Job } from "../types/JobTypes";
import { JobsContext } from "../context/JobsContext";
import styles from "../styles/globalStyles";

interface Props {
  job: Job;
  onApply: () => void;
}

export default function JobCard({ job, onApply }: Props) {
  const { saveJob, isSaved } = useContext(JobsContext);

  const saved = isSaved(job.id);

  // ✅ Format salary safely
  const salaryText = useMemo(() => {
    if (job.minSalary && job.maxSalary) {
      return `${job.minSalary} - ${job.maxSalary} ${job.currency ?? ""}`;
    }
    return "Salary not specified";
  }, [job]);

  // ✅ Format locations safely
  const locationText = useMemo(() => {
    if (job.locations && job.locations.length > 0) {
      return job.locations.join(", ");
    }
    return "Location not specified";
  }, [job]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.companyName}</Text>
      <Text>{salaryText}</Text>
      <Text>{locationText}</Text>

      <Pressable
        style={[
          styles.button,
          saved && { backgroundColor: "#777" }, // visually disabled
        ]}
        onPress={() => saveJob(job)}
        disabled={saved}
      >
        <Text style={styles.buttonText}>
          {saved ? "Saved" : "Save Job"}
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={onApply}>
        <Text style={styles.buttonText}>Apply</Text>
      </Pressable>
    </View>
  );
}