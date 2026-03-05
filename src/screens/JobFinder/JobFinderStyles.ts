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
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  savedJobButton: {
    position: "absolute",
    bottom: 108,
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
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  pageBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  pageDots: {
    fontSize: 15,
    paddingHorizontal: 2,
  },
});