import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView, Pressable, Image, SafeAreaView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { JobsContext } from "../../context/JobsContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./JobFinderInfoStyles";

export default function JobFinderInfoScreen({ route, navigation }: any) {
  const { job } = route.params;
  const { isDark } = useContext(ThemeContext);
  const { saveJob, isSaved } = useContext(JobsContext);
  const t = isDark ? darkTheme : lightTheme;
  const saved = isSaved(job.id);

  const salaryText = useMemo(() => {
    if (job.minSalary && job.maxSalary) {
      return job.minSalary + " - " + job.maxSalary + " " + (job.currency ?? "");
    }
    return "Not specified";
  }, [job]);

  const tags = useMemo(() => {
    const result: string[] = [];
    if (job.jobType) result.push(job.jobType);
    if (job.workModel) result.push(job.workModel);
    if (job.seniorityLevel) result.push(job.seniorityLevel);
    if (job.tags && job.tags.length > 0) result.push(...job.tags);
    return result;
  }, [job]);

  const benefits: string[] = useMemo(() => {
    if (!job.benefits) return [];
    if (Array.isArray(job.benefits)) return job.benefits;
    if (typeof job.benefits === "string") return [job.benefits];
    return [];
  }, [job]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.headerBg }]}>
      <View style={[styles.hero, { backgroundColor: t.headerBg }]}>
        <View style={styles.heroTopRow}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>{"←"}</Text>
          </Pressable>
          <ThemeToggle />
        </View>
        <View style={styles.heroCompany}>
          {job.companyLogo ? (
            <Image source={{ uri: job.companyLogo }} style={styles.heroLogo} resizeMode="contain" />
          ) : (
            <View style={styles.heroLogoFallback}>
              <Text style={styles.heroLogoFallbackText}>{job.companyName?.[0] ?? "?"}</Text>
            </View>
          )}
          <View style={styles.heroTitleBlock}>
            <Text style={styles.heroJobTitle}>{job.title}</Text>
            <Text style={styles.heroCompanyName}>{job.companyName}</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          {job.locations && job.locations.length > 0 && (
            <View style={styles.metaPill}><Text style={styles.metaPillText}>{"📍 "}{job.locations[0]}</Text></View>
          )}
          {job.minSalary && job.maxSalary && (
            <View style={styles.metaPill}><Text style={styles.metaPillText}>{"💰 "}{salaryText}</Text></View>
          )}
          {job.jobType && (
            <View style={styles.metaPill}><Text style={styles.metaPillText}>{"🕐 "}{job.jobType}</Text></View>
          )}
        </View>
      </View>
      <ScrollView
        style={[styles.content, { backgroundColor: t.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoGrid}>
          <View style={[styles.infoCell, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <Text style={[styles.infoCellLabel, { color: t.muted }]}>Salary</Text>
            <Text style={[styles.infoCellValue, { color: t.salary }]}>{salaryText}</Text>
          </View>
          {job.workModel ? (
            <View style={[styles.infoCell, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <Text style={[styles.infoCellLabel, { color: t.muted }]}>Work Model</Text>
              <Text style={[styles.infoCellValue, { color: t.title }]}>{job.workModel}</Text>
            </View>
          ) : null}
          {job.seniorityLevel ? (
            <View style={[styles.infoCell, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <Text style={[styles.infoCellLabel, { color: t.muted }]}>Seniority</Text>
              <Text style={[styles.infoCellValue, { color: t.title }]}>{job.seniorityLevel}</Text>
            </View>
          ) : null}
          {job.mainCategory ? (
            <View style={[styles.infoCell, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <Text style={[styles.infoCellLabel, { color: t.muted }]}>Category</Text>
              <Text style={[styles.infoCellValue, { color: t.title }]}>{job.mainCategory}</Text>
            </View>
          ) : null}
        </View>
        {tags.length > 0 && (
          <>
            <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />
            <Text style={[styles.sectionTitle, { color: t.title }]}>Skills and Tags</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScrollView} contentContainerStyle={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <View key={i} style={[styles.tag, { backgroundColor: t.tagBg, borderColor: t.tagBorder }]}>
                  <Text style={[styles.tagText, { color: t.tagText }]}>{tag}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
        {job.description ? (
          <>
            <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />
            <Text style={[styles.sectionTitle, { color: t.title }]}>About the Role</Text>
            <Text style={[styles.sectionText, { color: t.subtitle }]}>{job.description}</Text>
          </>
        ) : null}
        {benefits.length > 0 && (
          <>
            <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />
            <Text style={[styles.sectionTitle, { color: t.title }]}>Benefits</Text>
            {benefits.map((b, i) => (
              <View key={i} style={styles.benefitItem}>
                <View style={[styles.benefitDot, { backgroundColor: t.salary }]} />
                <Text style={[styles.benefitText, { color: t.subtitle }]}>{b}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      <View style={[styles.bottomBar, { backgroundColor: t.card, borderTopColor: t.cardBorder }]}>
        <Pressable
          style={[styles.bottomBtn, { backgroundColor: saved ? t.muted : t.saveBtn }]}
          onPress={() => saveJob(job)}
          disabled={saved}
        >
          <Text style={styles.bottomBtnText}>{saved ? "Saved" : "Save Job"}</Text>
        </Pressable>
        <Pressable
          style={[styles.bottomBtn, { backgroundColor: t.applyBtn }]}
          onPress={() => navigation.navigate("ApplicationForm", { job, fromSaved: false })}
        >
          <Text style={styles.bottomBtnText}>Apply Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}