import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 0,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 6,
    fontSize: 15,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
