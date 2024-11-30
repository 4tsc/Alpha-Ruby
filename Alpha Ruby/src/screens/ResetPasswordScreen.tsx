import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen({ route, navigation }) {
  const { token } = route.params; // Recibe el token desde los parámetros de la navegación
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Alternar visibilidad de contraseña

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('https://magicarduct.online:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>

      {/* Campo de nueva contraseña */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#666"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#666"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Campo de confirmación de contraseña */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar nueva contraseña"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#666"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Botón para restablecer contraseña */}
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      {/* Botón para cancelar */}
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    width: width * 0.85,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.85,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
});
