import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native';
import { useUser } from './UserContext';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const { userId, setUserId } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(` https://magicarduct.online:3000/usuario`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.log('Error obteniendo los datos del usuario:', data.message);
        }
      } catch (error) {
        console.log('Error en la solicitud:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch(' https://magicarduct.online:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUserId(null);
        navigation.replace('Login');
      } else {
        Alert.alert('Error de logout', 'No se pudo cerrar la sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
      console.error('Error en el fetch:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/back.jpg')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Nombre: {userData.nombre}</Text>
        <Text style={styles.text}>Correo: {userData.correo}</Text>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  text: {
    color: '#fff',
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
  },
});