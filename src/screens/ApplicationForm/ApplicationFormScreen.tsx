import React, { useContext } from "react";
import {
  View, Text, TextInput, Pressable, Alert,
  TouchableWithoutFeedback, Keyboard, Platform,
  KeyboardAvoidingView, ScrollView,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import { JobsContext } from "../../context/JobsContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import styles from "./ApplicationFormStyles";
import ThemeToggle from "../../components/ThemeToggle";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Numbers only")
    .length(11, "Must be exactly 11 digits")
    .matches(/^09/, "Must start with 09"),
  reason: Yup.string().min(10, "Must be at least 10 characters").required("This field is required"),
});

export default function ApplicationFormScreen({ route, navigation }: any) {
  const { job, fromSaved } = route.params;
  const { isDark } = useContext(ThemeContext);
  const { applyJob } = useContext(JobsContext);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Formik
        initialValues={{ name: "", email: "", contact: "", reason: "" }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          applyJob(job);
          Alert.alert("Application Submitted", "Your application has been sent.", [
            {
              text: "Okay",
              onPress: () => {
                resetForm();
                if (fromSaved) {
                  navigation.reset({ index: 0, routes: [{ name: "Main" }] });
                } else {
                  navigation.goBack();
                }
              },
            },
          ]);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldError, validateField, values, errors, touched }) => (
          <ScrollView
            style={{ flex: 1, backgroundColor: t.background }}
            contentContainerStyle={[styles.scrollContent, { backgroundColor: t.background }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={[styles.heroHeader, { backgroundColor: t.headerBg }]}>
              {/* Decorative bubbles */}
              <View style={styles.heroBubble1} />
              <View style={styles.heroBubble2} />

              {/* Top row: back + title + toggle */}
              <View style={styles.heroTopRow}>
                <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                  <Text style={styles.backBtnText}>{"←"}</Text>
                </Pressable>
                <Text style={styles.heroTitle}>Apply Now</Text>
                <ThemeToggle />
              </View>

              {/* Divider */}
              <View style={styles.heroDivider} />

              {/* Job info centered */}
              <View style={styles.heroTextBlock}>
                <Text style={styles.heroSubtitle} numberOfLines={2}>{job?.title ?? "Job Application"}</Text>
                <Text style={styles.heroCompany}>{job?.companyName ?? ""}</Text>
              </View>
            </View>

            {/* Form card */}
            <View style={[styles.formCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>

                {/* Full Name */}
                <View style={styles.fieldGroup}>
                  <Text style={[styles.fieldLabel, { color: t.muted }]}>FULL NAME</Text>
                  <TextInput
                    placeholder="e.g. Juan dela Cruz"
                    placeholderTextColor={t.inputPlaceholder}
                    onFocus={() => { setFieldTouched("name", false); setFieldError("name", undefined); }}
                    onChangeText={handleChange("name")}
                    onBlur={() => { setFieldTouched("name", true); validateField("name"); }}
                    value={values.name}
                    style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.name && errors.name ? "#EF4444" : t.cardBorder }]}
                  />
                  {touched.name && errors.name && <Text style={styles.errorText}>⚠ {errors.name}</Text>}
                </View>

                {/* Email */}
                <View style={styles.fieldGroup}>
                  <Text style={[styles.fieldLabel, { color: t.muted }]}>EMAIL ADDRESS</Text>
                  <TextInput
                    placeholder="e.g. juan@email.com"
                    placeholderTextColor={t.inputPlaceholder}
                    onFocus={() => { setFieldTouched("email", false); setFieldError("email", undefined); }}
                    onChangeText={handleChange("email")}
                    onBlur={() => { setFieldTouched("email", true); validateField("email"); }}
                    value={values.email}
                    style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.email && errors.email ? "#EF4444" : t.cardBorder }]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>⚠ {errors.email}</Text>}
                </View>

                {/* Contact */}
                <View style={styles.fieldGroup}>
                  <Text style={[styles.fieldLabel, { color: t.muted }]}>CONTACT NUMBER</Text>
                  <TextInput
                    placeholder="e.g. 09123456789"
                    placeholderTextColor={t.inputPlaceholder}
                    onFocus={() => { setFieldTouched("contact", false); setFieldError("contact", undefined); }}
                    onChangeText={handleChange("contact")}
                    onBlur={() => { setFieldTouched("contact", true); validateField("contact"); }}
                    value={values.contact}
                    style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.contact && errors.contact ? "#EF4444" : t.cardBorder }]}
                    keyboardType="numeric"
                    maxLength={11}
                  />
                  {touched.contact && errors.contact && <Text style={styles.errorText}>⚠ {errors.contact}</Text>}
                </View>

                {/* Reason */}
                <View style={styles.fieldGroup}>
                  <Text style={[styles.fieldLabel, { color: t.muted }]}>WHY SHOULD WE HIRE YOU?</Text>
                  <TextInput
                    placeholder="Tell us what makes you the best fit..."
                    placeholderTextColor={t.inputPlaceholder}
                    onFocus={() => { setFieldTouched("reason", false); setFieldError("reason", undefined); }}
                    onChangeText={handleChange("reason")}
                    onBlur={() => { setFieldTouched("reason", true); validateField("reason"); }}
                    value={values.reason}
                    style={[styles.input, styles.textArea, { backgroundColor: t.input, color: t.inputText, borderColor: touched.reason && errors.reason ? "#EF4444" : t.cardBorder }]}
                    multiline
                    textAlignVertical="top"
                  />
                  {touched.reason && errors.reason && <Text style={styles.errorText}>⚠ {errors.reason}</Text>}
                </View>

                <Pressable
                  style={[styles.submitBtn, { backgroundColor: t.applyBtn }]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitBtnText}>Submit Application</Text>
                </Pressable>

              </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        )}
      </Formik>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}