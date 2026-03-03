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
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
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
            Alert.alert(
              "Application Submitted",
              "Your application has been sent.",
              [
                {
                  text: "Okay",
                  onPress: () => {
                    resetForm();
                    if (fromSaved) {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Main" }],
                      });
                    } else {
                      navigation.goBack();
                    }
                  },
                },
              ]
            );
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
                onChangeText={handleChange("name")}
                value={values.name}
                style={styles.input}
              />
              {touched.name && <Text>{errors.name}</Text>}

              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                style={styles.input}
              />
              {touched.email && <Text>{errors.email}</Text>}

              <TextInput
                placeholder="Contact Number"
                onChangeText={handleChange("contact")}
                value={values.contact}
                style={styles.input}
                keyboardType="numeric"
              />
              {touched.contact && <Text>{errors.contact}</Text>}

              <TextInput
                placeholder="Why should we hire you?"
                onChangeText={handleChange("reason")}
                value={values.reason}
                style={styles.input}
                multiline
              />
              {touched.reason && <Text>{errors.reason}</Text>}

              <Pressable style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}