import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  darkContainer: {
    backgroundColor: "#111827",
  },
  listContent: {
    padding: 16,
    paddingTop: 12,
  },
  card: {
    padding: 18,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    color: "#111827",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "#9CA3AF",
  },
});
