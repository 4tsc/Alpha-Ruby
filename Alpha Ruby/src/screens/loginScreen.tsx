import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos

export default function Login({ navigation }) {  // Recibe navigation como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://186.64.122.218:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Si el login es exitoso, redirigir a la pantalla principal y guardar el idusuario
        Alert.alert('Login exitoso', 'Sesión iniciada correctamente');
        navigation.replace('Main');  // Redirige a la pantalla principal
      } else {
        Alert.alert('Error de login', result.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
    }
  };
  

  const handleRegister = () => {
    navigation.replace('Register');  // Redirige a la pantalla 'Register' para registrar un nuevo usuario
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicie sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={placeholderColor} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={placeholderColor} 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
