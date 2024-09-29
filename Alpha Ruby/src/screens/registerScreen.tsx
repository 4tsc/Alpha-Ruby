import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesRegister'; // Importa los estilos

export default function RegisterScreen({ navigation }) {  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    Alert.alert('Registro completado', `Bienvenido, ${username}`);
  };

  const handleGoToLogin = () => {
    navigation.replace('Login');  
  };

  return (
    <ImageBackground
      source={require('../images/back.jpg')}  // Asegúrate de que esta ruta sea correcta
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

          <TouchableOpacity style={styles.signUpButton} onPress={handleGoToLogin}>
            <Text style={styles.signUpButtonText}>Volver al Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
