import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  error: { color: "#C62828", marginBottom: 6 },

  submit: {
    backgroundColor: "#1976D2",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
