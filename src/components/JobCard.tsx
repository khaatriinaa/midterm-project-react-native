import React, { useContext, useMemo } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { Job } from "../types/JobTypes";
import { JobsContext } from "../context/JobsContext";
import { ThemeContext } from "../context/ThemeContext";
import styles, { lightTheme, darkTheme } from "../styles/globalStyles";

interface Props {
  job: Job;
  onApply: () => void;
  onPress: () => void;
}

export default function JobCard({ job, onApply, onPress }: Props) {
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

  const tags = useMemo(() => {
    const result: string[] = [];
    if (job.jobType) result.push(job.jobType);
    if (job.workModel) result.push(job.workModel);
    if (job.seniorityLevel) result.push(job.seniorityLevel);
    if (job.tags && job.tags.length > 0) result.push(...job.tags.slice(0, 3));
    return result;
  }, [job]);

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>

        {/* Company logo + title */}
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

        {/* Salary + Location */}
        <View style={styles.salaryLocationRow}>
          <Text style={[styles.salaryText, { color: t.salary }]}>{salaryText}</Text>
          <Text style={[styles.locationText, { color: t.muted }]}>{locationText}</Text>
        </View>

        {/* Tags row */}
        {tags.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsScrollView}
            contentContainerStyle={styles.tagsContainer}
          >
            {tags.map((tag, i) => (
              <View key={i} style={[styles.tag, { backgroundColor: t.tagBg, borderColor: t.tagBorder }]}>
                <Text style={[styles.tagText, { color: t.tagText }]}>{tag}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Buttons */}
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
    </Pressable>
  );
}