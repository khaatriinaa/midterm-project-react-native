import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f8",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1a1a1a",
  },

  company: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },

  applyBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  removeBtn: {
    backgroundColor: "#C62828",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
});
