import React from 'react';
import { Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RegisterForm from '../RegisterForm';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontSize: width * 0.08 }]}>Formulario de Registro</Text>
      <RegisterForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3D3D3D',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default RegisterScreen;