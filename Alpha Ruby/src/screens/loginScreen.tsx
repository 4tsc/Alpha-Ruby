import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles, placeholderColor } from '../styles/stylesLogin'; // Importa los estilos
import * as AuthSession from 'expo-auth-session'; // Importa AuthSession
import Constants from 'expo-constants'; // Importa Constants para obtener valores de app.json
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const auth0ClientId = Constants.manifest?.extra?.auth0ClientId || '8UrfFln0Sozm9MicW1Q3Cm21vEZCzpcp';
const auth0Domain = Constants.manifest?.extra?.auth0Domain || 'dev-vbupvvhf.us.auth0.com';

const discovery = {
  authorizationEndpoint: `https://${auth0Domain}/authorize`,
  tokenEndpoint: `https://${auth0Domain}/oauth/token`,
  revocationEndpoint: `https://${auth0Domain}/v2/logout`,
};

export default function Login({ navigation }) {  // Recibe navigation como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'alpharuby',
      }),
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        audience: `https://${auth0Domain}/userinfo`,
      },
      usePKCE: true, // Habilitar PKCE
    },
    discovery
  );

  const [registerRequest, registerResponse, registerPromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'alpharuby',
      }),
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        audience: `https://${auth0Domain}/userinfo`,
        screen_hint: 'signup', // Indica a Auth0 que se trata de un registro
      },
      usePKCE: true, // Habilitar PKCE
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      // Intercambiar el código por un token
      const getToken = async () => {
        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: auth0ClientId,
            code,
            redirect_uri: AuthSession.makeRedirectUri({
              scheme: 'alpharuby',
            }),
            code_verifier: request?.codeVerifier, // Incluir el code_verifier
          }),
        });

        const tokenData = await tokenResponse.json();
        console.log('Token Data:', tokenData);

        if (tokenResponse.ok) {
          // Guardar el token en AsyncStorage
          await AsyncStorage.setItem('authToken', tokenData.access_token);
          navigation.replace('Main');  // Redirige a la pantalla 'Main'
        } else {
          Alert.alert('Error de login', tokenData.error_description || 'Error al iniciar sesión con Auth0');
        }
      };

      getToken();
    }
  }, [response]);

  useEffect(() => {
    if (registerResponse?.type === 'success') {
      const { code } = registerResponse.params;

      // Intercambiar el código por un token
      const getToken = async () => {
        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: auth0ClientId,
            code,
            redirect_uri: AuthSession.makeRedirectUri({
              scheme: 'alpharuby',
            }),
            code_verifier: registerRequest?.codeVerifier, // Incluir el code_verifier
          }),
        });

        const tokenData = await tokenResponse.json();
        console.log('Token Data:', tokenData);

        if (tokenResponse.ok) {
          // Guardar el token en AsyncStorage
          await AsyncStorage.setItem('authToken', tokenData.access_token);
          navigation.replace('Main');  // Redirige a la pantalla 'Main'
        } else {
          Alert.alert('Error de registro', tokenData.error_description || 'Error al registrarse con Auth0');
        }
      };

      getToken();
    }
  }, [registerResponse]);

  const handleAuth0Login = () => {
    promptAsync();
  };

  const handleRegister = () => {
    registerPromptAsync();
  }

  return (
    <View style={styles.container}>
      {/* 
        <Text style={styles.title}>Inicie sesión con Auth0</Text>
      */}
      {/* 
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
      */}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAuth0Login}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}