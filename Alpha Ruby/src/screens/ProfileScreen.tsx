import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from './UserContext';
import { styles } from '../styles/stylesProfileScreen';

export default function ProfileScreen({ navigation }) {
  const { userId, setUserId } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://186.64.122.218:3000/usuario`, {
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
      const response = await fetch('http://186.64.122.218:3000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUserId(null); // Limpiar el userId en el contexto
        navigation.navigate('LoginScreen'); // Navegar a la pantalla de login
      } else {
        const errorText = await response.text();
        console.log('Error cerrando sesión:', errorText);
        Alert.alert('Error', 'Error cerrando sesión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.log('Error en la solicitud de logout:', error);
      Alert.alert('Error', 'Error en la solicitud de logout. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{userData.nombre || 'Cargando...'}</Text>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{userData.correo || 'Cargando...'}</Text>
      </View>
      <View style={styles.logoutButtonContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}