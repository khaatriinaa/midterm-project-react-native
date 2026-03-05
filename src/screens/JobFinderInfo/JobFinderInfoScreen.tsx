import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView, Pressable, Image, SafeAreaView, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { ThemeContext } from "../../context/ThemeContext";
import { JobsContext } from "../../context/JobsContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./JobFinderInfoStyles";

export default function JobFinderInfoScreen({ route, navigation }: any) {
  const { job } = route.params;
  const { isDark } = useContext(ThemeContext);
  const { saveJob, isSaved, isApplied } = useContext(JobsContext);
  const t = isDark ? darkTheme : lightTheme;
  const saved = isSaved(job.id);
  const applied = isApplied(job.id);
  const { width: contentWidth } = useWindowDimensions();

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

      {/* ── Hero Header ── */}
      <View style={[styles.hero, { backgroundColor: t.headerBg }]}>

        {/* Decorative background bubbles */}
        <View style={styles.heroBubble1} />
        <View style={styles.heroBubble2} />
        <View style={styles.heroBubble3} />

        {/* Back + Toggle row */}
        <View style={styles.heroTopRow}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>{"←"}</Text>
          </Pressable>
          <ThemeToggle />
        </View>

        {/* Centered logo */}
        <View style={styles.heroLogoWrap}>
          {job.companyLogo ? (
            <Image source={{ uri: job.companyLogo }} style={styles.heroLogo} resizeMode="contain" />
          ) : (
            <View style={styles.heroLogoFallback}>
              <Text style={styles.heroLogoFallbackText}>{job.companyName?.[0] ?? "?"}</Text>
            </View>
          )}
        </View>

        {/* Centered title block */}
        <Text style={styles.heroJobTitle}>{job.title}</Text>
        <Text style={styles.heroCompanyName}>{job.companyName}</Text>
        {applied && (
          <View style={styles.appliedBadge}>
            <Text style={styles.appliedBadgeText}>✓ Applied</Text>
          </View>
        )}

        {/* Meta pills */}
        <View style={styles.metaRow}>
          {job.locations && job.locations.length > 0 && (
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{"📍 "}{job.locations[0]}</Text>
            </View>
          )}
          {job.minSalary && job.maxSalary && (
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{"💰 "}{salaryText}</Text>
            </View>
          )}
          {job.jobType && (
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{"🕐 "}{job.jobType}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={[styles.content, { backgroundColor: t.background }]}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 20, paddingTop: 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Info grid */}
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

        {/* Tags */}
        {tags.length > 0 && (
          <>
            <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />
            <Text style={[styles.sectionTitle, { color: t.title }]}>Skills and Tags</Text>
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
          </>
        )}

        {/* About the Role */}
        {job.description ? (
          <>
            <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />
            <Text style={[styles.sectionTitle, { color: t.title }]}>About the Role</Text>
            <View style={[styles.descriptionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <RenderHtml
              contentWidth={contentWidth - 40}
              source={{ html: job.description }}
              baseStyle={{
                color: t.subtitle,
                fontSize: 14,
                lineHeight: 22,
                fontFamily: undefined,
              }}
              tagsStyles={{
                body: {
                  margin: 0,
                  padding: 0,
                },
                p: {
                  marginTop: 0,
                  marginBottom: 12,
                  color: t.subtitle,
                  fontSize: 14,
                  lineHeight: 22,
                },
                ul: {
                  marginTop: 0,
                  marginBottom: 12,
                  paddingLeft: 8,
                },
                ol: {
                  marginTop: 0,
                  marginBottom: 12,
                  paddingLeft: 8,
                },
                li: {
                  color: t.subtitle,
                  fontSize: 14,
                  lineHeight: 22,
                  marginBottom: 16,
                },
                strong: {
                  color: t.title,
                  fontWeight: "700",
                },
                b: {
                  color: t.title,
                  fontWeight: "700",
                },
                em: {
                  color: t.subtitle,
                  fontStyle: "italic",
                },
                a: {
                  color: t.salary,
                  textDecorationLine: "underline",
                },
                h1: {
                  color: t.title,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 16,
                  marginBottom: 8,
                },
                h2: {
                  color: t.title,
                  fontSize: 16,
                  fontWeight: "700",
                  marginTop: 14,
                  marginBottom: 6,
                },
                h3: {
                  color: t.title,
                  fontSize: 15,
                  fontWeight: "700",
                  marginTop: 12,
                  marginBottom: 6,
                },
                h4: {
                  color: t.title,
                  fontSize: 14,
                  fontWeight: "700",
                  marginTop: 10,
                  marginBottom: 4,
                },
                br: {
                  lineHeight: 8,
                },
              }}
              classesStyles={{}}
              enableExperimentalMarginCollapsing
            />
            </View>
          </>
        ) : null}

        {/* Benefits */}
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

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { backgroundColor: t.card, borderTopColor: t.cardBorder }]}>
        <Pressable
          style={[styles.bottomBtn, { backgroundColor: saved ? t.muted : t.saveBtn }]}
          onPress={() => saveJob(job)}
          disabled={saved}
        >
          <Text style={styles.bottomBtnText}>{saved ? "Saved" : "Save Job"}</Text>
        </Pressable>
        <Pressable
          style={[styles.bottomBtn, { backgroundColor: applied ? "#16A34A" : t.applyBtn }]}
          onPress={() => navigation.navigate("ApplicationForm", { job, fromSaved: false })}
          disabled={applied}
        >
          <Text style={styles.bottomBtnText}>{applied ? "✓ Applied" : "Apply Now"}</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}