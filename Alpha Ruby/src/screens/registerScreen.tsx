import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesRegister'; // Importa los estilos

export default function RegisterScreen({ navigation }) {  // Recibe navigation como prop
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Lógica de registro (puedes reemplazarla con una llamada a la API o algo similar)
    Alert.alert('Registro completado', `Bienvenido, ${username}`);
  };

  const handleGoToLogin = () => {
    navigation.replace('Login');  // Redirige a la pantalla de login
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor={placeholderColor} 
        value={username}
        onChangeText={setUsername}
      />

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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Botón para regresar al login */}
        <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
          <Text style={styles.buttonText}>Volver al Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
