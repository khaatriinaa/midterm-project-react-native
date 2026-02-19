import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f8",
  },
  dark: {
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  saveBtn: {
    backgroundColor: "#1976D2",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  applyBtn: {
    backgroundColor: "#2E7D32",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  savedNav: {
    backgroundColor: "#424242",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  themeBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});
