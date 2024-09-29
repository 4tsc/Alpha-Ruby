import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos

export default function Login({ navigation }) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'a' && password === 'a') {
      navigation.replace('Main');  
    } else {
      Alert.alert('Error de login', 'Correo o contraseña incorrectos');
    }
  };

  const handleRegister = () => {
    navigation.replace('Register');  
  };

  return (
    // Aquí usamos ImageBackground para la imagen de fondo
    <ImageBackground
      source={require('../images/back.jpg')}  // Asegúrate de que la ruta sea correcta
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

          <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
            <Text style={styles.signUpButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
