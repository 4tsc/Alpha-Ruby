import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos

import { useUser } from './UserContext';


export default function Login({ navigation }) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserId } = useUser();
 
  const handleLogin = async () => {
    try {
      const response = await fetch('https://magicarduct.online:3000/login', {
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
    navigation.replace('Register');  
  };

  return (
    // Aquí usamos ImageBackground para la imagen de fondo
    <ImageBackground
        // Asegúrate de que la ruta sea correcta
      style={{ flex: 1, width: '100%', height: '100%' }}  // Ocupa toda la pantalla
      resizeMode="cover"  // Asegura que la imagen cubra toda la pantalla
    >
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
            <Text style={styles.signUpButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
