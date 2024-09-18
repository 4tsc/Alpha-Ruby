import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontSize: width * 0.08 }]}>Formulario de Registro</Text>
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        placeholder="Nombre de usuario"
        placeholderTextColor="#CCCCCC"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        placeholder="Correo electrónico"
        placeholderTextColor="#CCCCCC"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        placeholder="Contraseña"
        placeholderTextColor="#CCCCCC"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={() => alert('Registro completado')} color="#D94A26" />
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
  input: {
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
  },
});

export default RegisterScreen;