import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./ApplicationFormStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApplicationFormProps } from "../../navigation/Props";

const schema = Yup.object({
  name: Yup.string()
    .min(3, "Min 3 characters")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  contact: Yup.string()
    .matches(/^[0-9]{11}$/, "11 digits required")
    .required("Required"),
  reason: Yup.string()
    .min(10, "Min 10 characters")
    .required("Required"),
});

export default function ApplicationFormScreen({ navigation, route }: ApplicationFormProps) {
  const fromSaved = route.params?.fromSaved;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{ name: "", email: "", contact: "", reason: "" }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            Alert.alert("Application Sent", "We will contact you", [
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
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <TextInput
                placeholder="Email"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Contact"
                style={styles.input}
                keyboardType="numeric"
                value={values.contact}
                onChangeText={handleChange("contact")}
              />
              {touched.contact && errors.contact && (
                <Text style={styles.error}>{errors.contact}</Text>
              )}

              <TextInput
                placeholder="Why should we hire you?"
                style={[styles.input, { height: 100 }]}
                multiline
                value={values.reason}
                onChangeText={handleChange("reason")}
              />
              {touched.reason && errors.reason && (
                <Text style={styles.error}>{errors.reason}</Text>
              )}

              <Pressable style={styles.submit} onPress={() => handleSubmit()}>
                <Text style={styles.btnText}>Submit</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
