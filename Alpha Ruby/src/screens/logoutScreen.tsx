import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const auth0ClientId = Constants.manifest?.extra?.auth0ClientId || '8UrfFln0Sozm9MicW1Q3Cm21vEZCzpcp';
const auth0Domain = Constants.manifest?.extra?.auth0Domain || 'dev-vbupvvhf.us.auth0.com';

const discovery = {
  authorizationEndpoint: `https://${auth0Domain}/authorize`,
  tokenEndpoint: `https://${auth0Domain}/oauth/token`,
  revocationEndpoint: `https://${auth0Domain}/v2/logout`,
};

export default function LogoutScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        // Obtener el token de AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          throw new Error('No se encontró el token de autenticación');
        }

        console.log('Token encontrado:', token);

        // Revocar el token de autenticación
        const revokeResponse = await AuthSession.revokeAsync(
          {
            token,
            clientId: auth0ClientId,
          },
          discovery
        );

        console.log('Respuesta de revocación:', revokeResponse);

        // Eliminar el token de AsyncStorage
        await AsyncStorage.removeItem('authToken');

        // Verificar si el token se eliminó
        const tokenAfterRemoval = await AsyncStorage.getItem('authToken');
        if (tokenAfterRemoval) {
          console.log('El token no se eliminó correctamente:', tokenAfterRemoval);
        } else {
          console.log('El token se eliminó correctamente');
        }

        // Redirigir al usuario a la URL de cierre de sesión de Auth0
        const logoutUrl = `https://${auth0Domain}/v2/logout?client_id=${auth0ClientId}&returnTo=${AuthSession.makeRedirectUri({
          scheme: 'alpharuby',
        })}`;
        await WebBrowser.openBrowserAsync(logoutUrl);
        navigation.replace('Login'); // Redirige a la pantalla de login
      } catch (error) {
        Alert.alert('Error de Logout', error.message || 'Error al cerrar sesión');
        console.error('Error durante el logout:', error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#D94A26" />
      <Text style={{ marginTop: 10 }}>Cerrando sesión...</Text>
    </View>
  );
}