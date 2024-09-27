import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos

import { useUser } from './UserContext';

export default function Login({ navigation }) {  // Recibe navigation como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserId } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://186.64.122.218:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      console.log('Respuesta del servidor:', result);
      console.log('Código de respuesta:', response.status);
  
      if (response.ok) {
        Alert.alert('Login exitoso', 'Sesión iniciada correctamente');
        console.log('ID de usuario:', result.userId);
        const Id = result.userId;
        console.log("almacenando en contexto... ", Id);
        setUserId(Id);
        // Redirige a la pantalla principal
        navigation.replace('Main');
      } else {
        Alert.alert('Error de login', result.message || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
      console.error('Error en el fetch:', error);
    }
  };

  const handleRegister = () => {
    navigation.replace('Register');  // Redirige a la pantalla 'Register' para registrar un nuevo usuario
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}
