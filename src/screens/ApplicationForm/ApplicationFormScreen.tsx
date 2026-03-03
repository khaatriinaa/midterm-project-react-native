import React, { useContext } from "react";
import {
  View, Text, TextInput, Pressable, Alert,
  KeyboardAvoidingView, TouchableWithoutFeedback,
  Keyboard, Platform, ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";
import styles from "./ApplicationFormStyles";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  contact: Yup.string()
    .matches(/^[0-9]+$/, "Numbers only")
    .min(10)
    .required("Contact required"),
  reason: Yup.string().min(10).required("Required"),
});

export default function ApplicationFormScreen({ route, navigation }: any) {
  const { fromSaved } = route.params;
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{ name: "", email: "", contact: "", reason: "" }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
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
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <ScrollView
              style={[styles.container, { backgroundColor: t.background }]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={handleChange("name")}
                value={values.name}
                style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: t.cardBorder }]}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextInput
                placeholder="Email"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={handleChange("email")}
                value={values.email}
                style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: t.cardBorder }]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Contact Number"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={handleChange("contact")}
                value={values.contact}
                style={[styles.input, { backgroundColor: t.input, color: t.inputText, borderColor: t.cardBorder }]}
                keyboardType="numeric"
              />
              {touched.contact && errors.contact && (
                <Text style={styles.errorText}>{errors.contact}</Text>
              )}

              <TextInput
                placeholder="Why should we hire you?"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={handleChange("reason")}
                value={values.reason}
                style={[
                  styles.input,
                  { backgroundColor: t.input, color: t.inputText, borderColor: t.cardBorder, minHeight: 100, textAlignVertical: "top" },
                ]}
                multiline
              />
              {touched.reason && errors.reason && (
                <Text style={styles.errorText}>{errors.reason}</Text>
              )}

              <Pressable style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Submit Application</Text>
              </Pressable>

              <View style={{ height: 40 }} />
            </ScrollView>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}