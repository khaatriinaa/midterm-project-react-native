import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    padding: 18,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Logo + title/company row
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  companyLogoFallback: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  companyLogoFallbackText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },
  cardHeaderText: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    color: "#6B7280",
  },

  salaryLocationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  locationText: {
    fontSize: 13,
    color: "#9CA3AF",
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
  saveButton: {
    backgroundColor: "#374151",
  },
  applyButton: {
    backgroundColor: "#2563EB",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },

  searchInput: {
    borderWidth: 0,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  toggleButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
  },
});
