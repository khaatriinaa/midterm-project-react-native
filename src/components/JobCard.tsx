import React, { useContext, useMemo } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Job } from "../types/JobTypes";
import { JobsContext } from "../context/JobsContext";
import { ThemeContext } from "../context/ThemeContext";
import styles, { lightTheme, darkTheme } from "../styles/globalStyles";

interface Props {
  job: Job;
  onApply: () => void;
}

export default function JobCard({ job, onApply }: Props) {
  const { saveJob, isSaved } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;
  const saved = isSaved(job.id);

  const salaryText = useMemo(() => {
    if (job.minSalary && job.maxSalary) {
      return job.minSalary + " - " + job.maxSalary + " " + (job.currency ?? "");
    }
    return "Not specified";
  }, [job]);

  const locationText = useMemo(() => {
    if (job.locations && job.locations.length > 0) {
      return job.locations.join(", ");
    }
    return "Not specified";
  }, [job]);

  return (
    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
      <View style={styles.cardHeader}>
        {job.companyLogo ? (
          <Image
            source={{ uri: job.companyLogo }}
            style={[styles.companyLogo, { backgroundColor: t.logoBg, borderColor: t.logoBorder }]}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.companyLogoFallback, { backgroundColor: t.fallbackLogoBg, borderColor: t.fallbackLogoBorder }]}>
            <Text style={[styles.companyLogoFallbackText, { color: t.fallbackLogoText }]}>
              {job.companyName?.[0] ?? "?"}
            </Text>
          </View>
        )}
        <View style={styles.cardHeaderText}>
          <Text style={[styles.title, { color: t.title }]}>{job.title}</Text>
          <Text style={[styles.companyName, { color: t.subtitle }]}>{job.companyName}</Text>
        </View>
      </View>
      <View style={styles.salaryLocationRow}>
        <Text style={[styles.salaryText, { color: t.salary }]}>{salaryText}</Text>
        <Text style={[styles.locationText, { color: t.muted }]}>{locationText}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: saved ? t.muted : t.saveBtn }]}
          onPress={() => saveJob(job)}
          disabled={saved}
        >
          <Text style={styles.buttonText}>{saved ? "Saved" : "Save"}</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: t.applyBtn }]} onPress={onApply}>
          <Text style={styles.buttonText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}