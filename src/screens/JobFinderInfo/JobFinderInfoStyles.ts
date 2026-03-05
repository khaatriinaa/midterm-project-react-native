import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },

  hero: {
    paddingTop: 6,
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: "hidden",
  },

  // Decorative bubbles
  heroBubble1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: -60,
    right: -40,
  },
  heroBubble2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 30,
    right: 60,
  },
  heroBubble3: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: 20,
    left: -20,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { fontSize: 20, color: "#fff", fontWeight: "400" },

  // Centered logo ring
  heroLogoWrap: {
    alignSelf: "center",
    marginBottom: 14,
    padding: 4,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  heroLogo: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },
  heroLogoFallback: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  heroLogoFallbackText: { fontSize: 28, fontWeight: "800", color: "#fff" },

  // Centered text
  heroJobTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  heroCompanyName: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    marginBottom: 0,
  },

  // Pills row centered
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
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
  appliedBadge: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#16A34A",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  appliedBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});