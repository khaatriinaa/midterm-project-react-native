import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f8",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  subText: {
    fontSize: 14,
    color: "#555",
  },

  primaryButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    borderRadius: 8,
  },

  successButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 8,
  },

  dangerButton: {
    backgroundColor: "#C62828",
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});