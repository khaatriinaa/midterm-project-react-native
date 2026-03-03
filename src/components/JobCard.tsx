import React, { useContext, useMemo } from "react";
import { View, Text, Pressable, Image } from "react-native";
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
    return "Not specified";
  }, [job]);

  // ✅ Format locations safely
  const locationText = useMemo(() => {
    if (job.locations && job.locations.length > 0) {
      return job.locations.join(", ");
    }
    return "Not specified";
  }, [job]);

  return (
    <View style={styles.card}>
      {/* Company Header Row */}
      <View style={styles.cardHeader}>
        {job.companyLogo ? (
          <Image
            source={{ uri: job.companyLogo }}
            style={styles.companyLogo}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.companyLogoFallback}>
            <Text style={styles.companyLogoFallbackText}>
              {job.companyName?.[0] ?? "?"}
            </Text>
          </View>
        )}
        <View style={styles.cardHeaderText}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.companyName}>{job.companyName}</Text>
        </View>
      </View>

      <View style={styles.salaryLocationRow}>
        <Text style={styles.salaryText}>{salaryText}</Text>
        <Text style={styles.locationText}>{locationText}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={[
            styles.button,
            styles.saveButton,
            saved && { backgroundColor: "#9CA3AF" },
          ]}
          onPress={() => saveJob(job)}
          disabled={saved}
        >
          <Text style={styles.buttonText}>
            {saved ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Pressable style={[styles.button, styles.applyButton]} onPress={onApply}>
          <Text style={styles.buttonText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}
