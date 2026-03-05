import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },

  hero: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { fontSize: 22, color: "#fff", fontWeight: "300" },
  heroCompany: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  heroLogo: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  heroLogoFallback: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  heroLogoFallbackText: { fontSize: 24, fontWeight: "800", color: "#fff" },
  heroTitleBlock: { flex: 1 },
  heroJobTitle: { fontSize: 19, fontWeight: "800", color: "#ffffff", flexWrap: "wrap" },
  heroCompanyName: { fontSize: 13, color: "rgba(255,255,255,0.80)", marginTop: 3 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  metaPillText: { fontSize: 12, fontWeight: "600", color: "rgba(255,255,255,0.95)" },

  // content sheet
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -14,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 4,
  },
  sectionText: { fontSize: 14, lineHeight: 24 },
  divider: { height: 1, marginVertical: 16 },

  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  infoCell: {
    flex: 1,
    minWidth: "45%",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  infoCellLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  infoCellValue: { fontSize: 14, fontWeight: "700" },

  tagsScrollView: { marginBottom: 2 },
  tagsContainer: { flexDirection: "row", gap: 8, paddingRight: 4 },
  tag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: "600" },

  descriptionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginTop: 4,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  benefitDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 8,
  },
  benefitText: { fontSize: 14, lineHeight: 22, flex: 1 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  bottomBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});