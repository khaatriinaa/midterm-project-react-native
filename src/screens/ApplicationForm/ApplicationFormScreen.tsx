import React, { useContext, useRef } from "react";
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
  const scrollRef = useRef<ScrollView>(null);

  const scrollToField = (y: number) => {
    scrollRef.current?.scrollTo({ y: y - 20, animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.flex, { backgroundColor: t.background }]}
    >
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
        {({ handleChange, handleSubmit, setFieldTouched, setFieldError, validateField, values, errors, touched }) => (
          <ScrollView
            ref={scrollRef}
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, { backgroundColor: t.background }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                {/* Header */}
                <View style={[styles.heroHeader, { backgroundColor: t.headerBg }]}>
                  <View style={styles.heroBubble1} />
                  <View style={styles.heroBubble2} />
                  <View style={styles.heroTopRow}>
                    <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                      <Text style={styles.backBtnText}>{"←"}</Text>
                    </Pressable>
                    <Text style={styles.heroTitle}>Apply Now</Text>
                    <ThemeToggle />
                  </View>
                  <View style={styles.heroDivider} />
                  <View style={styles.heroTextBlock}>
                    <Text style={styles.heroSubtitle} numberOfLines={2}>{job?.title ?? "Job Application"}</Text>
                    <Text style={styles.heroCompany}>{job?.companyName ?? ""}</Text>
                  </View>
                </View>

                {/* Form card */}
                <View style={[styles.formCard, { backgroundColor: t.card }]}>

                  <View style={styles.fieldGroup}>
                    <Text style={[styles.fieldLabel, { color: t.muted }]}>FULL NAME</Text>
                    <TextInput
                      placeholder="e.g. Juan dela Cruz"
                      placeholderTextColor={t.inputPlaceholder}
                      onFocus={() => { setFieldTouched("name", false); setFieldError("name", undefined); }}
                      onChangeText={handleChange("name")}
                      onBlur={() => { setFieldTouched("name", true); validateField("name"); }}
                      value={values.name}
                      returnKeyType="next"
                      style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.name && errors.name ? "#EF4444" : t.cardBorder }]}
                    />
                    {touched.name && errors.name && <Text style={styles.errorText}>⚠ {errors.name}</Text>}
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={[styles.fieldLabel, { color: t.muted }]}>EMAIL ADDRESS</Text>
                    <TextInput
                      placeholder="e.g. juan@email.com"
                      placeholderTextColor={t.inputPlaceholder}
                      onFocus={() => { setFieldTouched("email", false); setFieldError("email", undefined); }}
                      onChangeText={handleChange("email")}
                      onBlur={() => { setFieldTouched("email", true); validateField("email"); }}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.email && errors.email ? "#EF4444" : t.cardBorder }]}
                    />
                    {touched.email && errors.email && <Text style={styles.errorText}>⚠ {errors.email}</Text>}
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={[styles.fieldLabel, { color: t.muted }]}>CONTACT NUMBER</Text>
                    <TextInput
                      placeholder="e.g. 09123456789"
                      placeholderTextColor={t.inputPlaceholder}
                      onFocus={() => { setFieldTouched("contact", false); setFieldError("contact", undefined); }}
                      onChangeText={handleChange("contact")}
                      onBlur={() => { setFieldTouched("contact", true); validateField("contact"); }}
                      value={values.contact}
                      keyboardType="numeric"
                      maxLength={11}
                      returnKeyType="next"
                      style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: touched.contact && errors.contact ? "#EF4444" : t.cardBorder }]}
                    />
                    {touched.contact && errors.contact && <Text style={styles.errorText}>⚠ {errors.contact}</Text>}
                  </View>

                  <View
                    style={styles.fieldGroup}
                    onLayout={(e) => {
                      const y = e.nativeEvent.layout.y;
                      // Store y offset for reason field
                      (scrollRef as any)._reasonY = y + 300;
                    }}
                  >
                    <Text style={[styles.fieldLabel, { color: t.muted }]}>WHY SHOULD WE HIRE YOU?</Text>
                    <TextInput
                      placeholder="Tell us what makes you the best fit..."
                      placeholderTextColor={t.inputPlaceholder}
                      onFocus={() => {
                        setFieldTouched("reason", false);
                        setFieldError("reason", undefined);
                        // Scroll down so the textarea is visible above keyboard
                        setTimeout(() => {
                          scrollRef.current?.scrollToEnd({ animated: true });
                        }, 150);
                      }}
                      onChangeText={handleChange("reason")}
                      onBlur={() => { setFieldTouched("reason", true); validateField("reason"); }}
                      value={values.reason}
                      multiline
                      textAlignVertical="top"
                      blurOnSubmit
                      style={[styles.input, styles.textArea, { backgroundColor: t.input, color: t.inputText, borderColor: touched.reason && errors.reason ? "#EF4444" : t.cardBorder }]}
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

                <View style={{ height: 60 }} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}