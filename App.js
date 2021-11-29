import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

const addingProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, ({ min }) => `Title must be at least ${min} characters`)
    .required('Title should be added'),
  imageUrl: yup
    .string()
    .min(10, ({ min }) => `Image url must be at least ${min} characters`)
    .required('Image url is needed for showing the product picture'),
  price: yup
    .number()
    .min(1, ({ min }) => `Price must be at least ${min} characters`)
    .required('Give us the price of your product'),
  description: yup
    .string()
    .min(10, ({ min }) => `Description must be at least ${min} characters`)
    .required('Tell us about your product'),
});
const editProductSchema = yup.object().shape({
  id: yup
    .string()
    .min(19, ({ min }) => `id must be at least ${min} characters`)
    .required('Id must be added'),
  title: yup
    .string()
    .min(3, ({ min }) => `Title must be at least ${min} characters`)
    .required('Title should be added'),
  imageUrl: yup
    .string()
    .min(10, ({ min }) => `Image url must be at least ${min} characters`)
    .required('Image url is needed for showing the product picture'),
  price: yup
    .number()
    .min(1, ({ min }) => `Price must be at least ${min} characters`)
    .required('Give us the price of your product'),
  description: yup
    .string()
    .min(10, ({ min }) => `Description must be at least ${min} characters`)
    .required('Tell us about your product'),
});

const App = () => {
  var [products, setProducts] = useState([]);
  var [deleteId, setDeleteId] = useState('');

  const deleteProduct = async (id) => {
    const response = await fetch(
      `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          body: null,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const getProducts = async () => {
    try {
      const response = await fetch(
        'https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json'
      );
      const json = await response.json();
      var propertyValues = Object.keys(json).map((key) => key);
      setProducts(() => setProducts([...propertyValues]));
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const postProduct = async (values) => {
    fetch(
      'https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: values.description,
          imageUrl: values.imageUrl,
          price: values.price,
          title: values.title,
        }),
      }
    );
  };
  const patchProduct = async (values) => {
    fetch(
      `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${values.id}.json`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: values.description,
          imageUrl: values.imageUrl,
          price: values.price,
          title: values.title,
        }),
      }
    );
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text>Add new product</Text>
          <Formik
            validationSchema={addingProductSchema}
            initialValues={{
              title: '',
              imageUrl: '',
              price: 0,
              description: '',
            }}
            onSubmit={(values) => {
              postProduct(values);
            }}
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
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
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
                  onChangeText={handleChange('imageUrl')}
                  onBlur={handleBlur('imageUrl')}
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
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  keyboardType="number-pad"
                />
                {errors.price && touched.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
                <TextInput
                  name="description"
                  placeholder="Input description"
                  style={styles.textInput}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
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
          <Text>Edit product</Text>
          <Formik
            validationSchema={editProductSchema}
            initialValues={{
              id: '',
              title: '',
              imageUrl: '',
              price: 0,
              description: '',
            }}
            onSubmit={(values) => {
              patchProduct(values);
            }}
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
                  name="id"
                  placeholder="Input id"
                  style={styles.textInput}
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  value={values.id}
                  keyboardType="default"
                />
                {errors.id && touched.id && (
                  <Text style={styles.errorText}>{errors.id}</Text>
                )}
                <TextInput
                  name="title"
                  placeholder="Input title"
                  style={styles.textInput}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
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
                  onChangeText={handleChange('imageUrl')}
                  onBlur={handleBlur('imageUrl')}
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
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  keyboardType="number-pad"
                />
                {errors.price && touched.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
                <TextInput
                  name="description"
                  placeholder="Input description"
                  style={styles.textInput}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  keyboardType="default"
                />
                {errors.description && touched.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
                <Button
                  onPress={handleSubmit}
                  title="EDIT PRODUCT"
                  disabled={!isValid}
                  color="#229fb0"
                />
              </>
            )}
          </Formik>

          <TextInput
            style={{ height: 40 }}
            placeholder="Enter id for delete action"
            onChangeText={(delId) => setDeleteId(delId)}
            defaultValue={deleteId}
            style={styles.textInput}
          />

          <Button
            onPress={() => deleteProduct(deleteId)}
            title="DELETE PRODUCT"
            color="#229fb0"
          />
        </View>
      </SafeAreaView>
      <Button
        onPress={() => {
          getProducts();
        }}
        title="GET PRODUCTS"
        color="#229fb0"
      />
      <FlatList
        data={products}
        keyExtractor={({ id }, index) => index}
        renderItem={({ item }) => (
          <View style={styles.listParam}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  listParam: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
