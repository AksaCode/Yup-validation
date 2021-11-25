import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

const addingProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, ({ min }) => `Title must be at least ${min} characters`)
    .required("Title should be added"),
  imageUrl: yup
    .string()
    .min(5, ({ min }) => `Image url must be at least ${min} characters`)
    .required("Image url is needed for showing the product picture"),
  price: yup
    .number()
    .min(1, ({ min }) => `Price must be at least ${min} characters`)
    .required("Give us the price of your product"),
  description: yup
    .string()
    .min(10, ({ min }) => `Description must be at least ${min} characters`)
    .required("Tell us about your product"),
});

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text>Add new product</Text>
          <Formik
            validationSchema={addingProductSchema}
            initialValues={{
              title: "",
              imageUrl: "",
              price: 0,
              description: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <TextInput
                  name="title"
                  placeholder="Input title"
                  style={styles.textInput}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  keyboardType="default"
                />
                {errors.title && touched.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
                <TextInput
                  name="imageUrl"
                  placeholder="Input imageUrl"
                  style={styles.textInput}
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                  value={values.imageUrl}
                  keyboardType="default"
                />
                {errors.imageUrl && touched.imageUrl && (
                  <Text style={styles.errorText}>{errors.imageUrl}</Text>
                )}
                <TextInput
                  name="price"
                  placeholder="Input price"
                  style={styles.textInput}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  keyboardType="number-pad"
                />
                {errors.price && touched.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
                <TextInput
                  name="description"
                  placeholder="Input description"
                  style={styles.textInput}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  keyboardType="default"
                />
                {errors.description && touched.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
                <Button
                  onPress={handleSubmit}
                  title="ADD PRODUCT"
                  disabled={!isValid}
                  color="#229fb0"
                />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});

export default App;
