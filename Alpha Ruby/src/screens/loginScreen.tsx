import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos

export default function Login({ navigation }) {  // Recibe navigation como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'a' && password === 'a') {
      navigation.replace('Main');  // Redirige a la pantalla 'Main' que contiene las tabs, incluyendo HomeScreen
    } else {
      Alert.alert('Error de login', 'Correo o contraseña incorrectos');
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
