import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  toggleButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 8,
  },
});