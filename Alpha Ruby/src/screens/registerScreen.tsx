import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesRegister'; // Importa los estilos

export default function RegisterScreen({ navigation }) {  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aquí colocas la lógica para enviar los datos al servidor
    if (!username || !email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Construimos el objeto con los datos del usuario
    const userData = {
      nombre: username,  // nombre en lugar de username para coincidir con el backend
      correo: email,
      clave: password  // clave en lugar de password
    };

    // Hacemos la solicitud POST al servidor
    fetch('http://186.64.122.218:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        Alert.alert('Error en el registro', data.error);
      } else {
        Alert.alert('Registro exitoso', '¡Bienvenido a la plataforma!');
        navigation.replace('Login');  // Redirige al login después del registro exitoso
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema con el registro. Inténtalo de nuevo.');
    });
  };

  const handleGoToLogin = () => {
    navigation.replace('Login');  
  };

  return (
    <ImageBackground
      
      style={{ flex: 1, width: '100%', height: '100%' }}  // Ocupa todo el tamaño de la pantalla
      resizeMode="cover"  // Ajusta la imagen a la pantalla
    >
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

          <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
            <Text style={styles.signUpButtonText}>Volver al Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
