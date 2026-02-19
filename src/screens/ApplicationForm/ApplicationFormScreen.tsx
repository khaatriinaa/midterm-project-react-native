import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./ApplicationFormStyles";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  contact: Yup.string()
    .matches(/^[0-9]{11}$/, "Must be 11 digits")
    .required("Contact required"),
  reason: Yup.string().min(10).required("Required"),
});

export default function ApplicationFormScreen({ navigation, route }: any) {
  const fromSaved = route.params?.fromSaved;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{ name: "", email: "", contact: "", reason: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            Alert.alert("Application Submitted", "We will contact you.", [
              {
                text: "Okay",
                onPress: () => {
                  resetForm();
                  if (fromSaved) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "JobFinder" }],
                    });
                  } else {
                    navigation.goBack();
                  }
                },
              },
            ]);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                onChangeText={handleChange("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Contact Number"
                style={styles.input}
                onChangeText={handleChange("contact")}
                value={values.contact}
                keyboardType="numeric"
              />
              {touched.contact && errors.contact && (
                <Text style={styles.error}>{errors.contact}</Text>
              )}

              <TextInput
                placeholder="Why should we hire you?"
                style={[styles.input, { height: 100 }]}
                multiline
                onChangeText={handleChange("reason")}
                value={values.reason}
              />
              {touched.reason && errors.reason && (
                <Text style={styles.error}>{errors.reason}</Text>
              )}

              <Pressable style={styles.submitBtn} onPress={() => handleSubmit()}>
                <Text style={styles.btnText}>Submit Application</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
