import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  listContent: { padding: 16, paddingTop: 12 },
  card: {
    padding: 18,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { fontWeight: "700", fontSize: 17, marginBottom: 4 },
  companyName: { fontSize: 14, marginBottom: 14 },
  buttonRow: { flexDirection: "row", gap: 10 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 15 },
  emptyText: { textAlign: "center", marginTop: 80, fontSize: 16 },
});