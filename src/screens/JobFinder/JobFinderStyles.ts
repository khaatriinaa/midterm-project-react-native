import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  savedJobButton: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  savedJobButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});