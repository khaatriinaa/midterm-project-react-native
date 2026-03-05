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
  const { saveJob, isSaved, isApplied } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;
  const saved = isSaved(job.id);
  const applied = isApplied(job.id);

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
    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>

      {/* Tappable top section: logo + title + salary */}
      <Pressable onPress={onPress}>
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={[styles.companyName, { color: t.subtitle }]}>{job.companyName}</Text>
              {applied && (
                <View style={{ backgroundColor: "#16A34A", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
                  <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>✓ Applied</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.salaryLocationRow}>
          <Text style={[styles.salaryText, { color: t.salary }]}>{salaryText}</Text>
          <Text style={[styles.locationText, { color: t.muted }]}>{locationText}</Text>
        </View>
      </Pressable>

      {/* Tags — free from Pressable so scroll works */}
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
        <Pressable
          style={[styles.button, { backgroundColor: applied ? "#16A34A" : t.applyBtn }]}
          onPress={onApply}
          disabled={applied}
        >
          <Text style={styles.buttonText}>{applied ? "Applied" : "Apply"}</Text>
        </Pressable>
      </View>

    </View>
  );
}