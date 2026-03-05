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
  email: Yup.string().email("Invalid email address").required("Email is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Numbers only")
    .length(11, "Must be exactly 11 digits")
    .matches(/^09/, "Must start with 09"),
  reason: Yup.string().min(10, "Must be at least 10 characters").required("This field is required"),
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
          validateOnChange={true}
          validateOnBlur={true}
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
          {({ handleChange, handleBlur, handleSubmit, setFieldTouched, values, errors, touched }) => (
            <ScrollView
              style={[styles.container, { backgroundColor: t.background }]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name */}
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={(val) => { handleChange("name")(val); setFieldTouched("name", true, false); }}
                onBlur={handleBlur("name")}
                value={values.name}
                style={[
                  styles.input,
                  { backgroundColor: t.input, color: t.inputText, borderColor: touched.name && errors.name ? "#EF4444" : t.cardBorder },
                ]}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              {/* Email */}
              <TextInput
                placeholder="Email"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={(val) => { handleChange("email")(val); setFieldTouched("email", true, false); }}
                onBlur={handleBlur("email")}
                value={values.email}
                style={[
                  styles.input,
                  { backgroundColor: t.input, color: t.inputText, borderColor: touched.email && errors.email ? "#EF4444" : t.cardBorder },
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Contact */}
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={(val) => { handleChange("contact")(val); setFieldTouched("contact", true, false); }}
                onBlur={handleBlur("contact")}
                value={values.contact}
                style={[
                  styles.input,
                  { backgroundColor: t.input, color: t.inputText, borderColor: touched.contact && errors.contact ? "#EF4444" : t.cardBorder },
                ]}
                keyboardType="numeric"
              />
              {touched.contact && errors.contact && (
                <Text style={styles.errorText}>{errors.contact}</Text>
              )}

              {/* Why hire you */}
              <TextInput
                placeholder="Why should we hire you?"
                placeholderTextColor={t.inputPlaceholder}
                onChangeText={(val) => { handleChange("reason")(val); setFieldTouched("reason", true, false); }}
                onBlur={handleBlur("reason")}
                value={values.reason}
                style={[
                  styles.input,
                  {
                    backgroundColor: t.input,
                    color: t.inputText,
                    borderColor: touched.reason && errors.reason ? "#EF4444" : t.cardBorder,
                    minHeight: 100,
                    textAlignVertical: "top",
                  },
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