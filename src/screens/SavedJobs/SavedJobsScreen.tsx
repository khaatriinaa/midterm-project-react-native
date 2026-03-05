import React, { useContext } from "react";
import { View, FlatList, Text, Pressable, SafeAreaView, Alert, Image } from "react-native";
import { JobsContext } from "../../context/JobsContext";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./SavedJobsStyles";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs, removeJob, isApplied } = useContext(JobsContext);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  const handleRemove = (id: string, title: string) => {
    Alert.alert(
      "Remove Job",
      `Are you sure you want to remove "${title}" from your saved jobs?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeJob(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.headerBg }]}>
      <View style={[styles.header, { backgroundColor: t.headerBg }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Saved Jobs 🔖</Text>
            <Text style={styles.headerSubtitle}>{savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: t.background }]}>
        {savedJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔖</Text>
            <Text style={[styles.emptyTitle, { color: t.title }]}>No saved jobs yet</Text>
            <Text style={[styles.emptySubtitle, { color: t.muted }]}>Jobs you save will appear here so you can apply when ready.</Text>
            <Pressable
              style={[styles.emptyBtn, { backgroundColor: t.applyBtn }]}
              onPress={() => navigation.navigate("JobFinder")}
            >
              <Text style={styles.emptyBtnText}>Browse Jobs</Text>
            </Pressable>
          </View>
        )}
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>

              {/* Company logo + title row */}
              <View style={styles.cardHeader}>
                {item.companyLogo ? (
                  <Image
                    source={{ uri: item.companyLogo }}
                    style={[styles.companyLogo, { backgroundColor: t.logoBg, borderColor: t.logoBorder }]}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={[styles.companyLogoFallback, { backgroundColor: t.fallbackLogoBg, borderColor: t.fallbackLogoBorder }]}>
                    <Text style={[styles.companyLogoFallbackText, { color: t.fallbackLogoText }]}>
                      {item.companyName?.[0] ?? "?"}
                    </Text>
                  </View>
                )}
                <View style={styles.cardHeaderText}>
                  <Text style={[styles.title, { color: t.title }]}>{item.title}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={[styles.companyName, { color: t.subtitle }]}>{item.companyName}</Text>
                    {isApplied(item.id) && (
                      <View style={{ backgroundColor: "#16A34A", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
                        <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>✓ Applied</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, { backgroundColor: isApplied(item.id) ? "#16A34A" : t.applyBtn }]}
                  onPress={() => navigation.navigate("ApplicationForm", { job: item, fromSaved: true })}
                  disabled={isApplied(item.id)}
                >
                  <Text style={styles.buttonText}>{isApplied(item.id) ? "Applied" : "Apply"}</Text>
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