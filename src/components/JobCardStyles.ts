import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  darkCard: {
    backgroundColor: "#1e1e1e",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1a1a1a",
  },

  company: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },

  details: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },

  darkText: {
    color: "#ffffff",
  },

  saveBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  savedBtn: {
    backgroundColor: "#757575",
  },

  applyBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
