import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from './UserContext';
import { useFocusEffect } from '@react-navigation/native';

export default function ConfigurationScreen({ navigation }) {
  const { userId, setUserId } = useUser();
  const [userData, setUserData] = useState({ userName: '', email: '', image: '' });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      console.log(`Fetching user data for userId: ${userId}`);
      const response = await fetch(`https://magicarduct.online:3000/obtener-usuario?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      // console.log('User data fetched:', data);

      if (response.ok) {
        setUserData(data);
        // console.log(`Fetching avatar data for image: ${data.image}`);
        const avatarResponse = await fetch(`https://api.scryfall.com/cards/${data.image}`);
        const avatarData = await avatarResponse.json();
        
        if (avatarData.image_uris && avatarData.image_uris.art_crop) {
          setAvatarUrl(avatarData.image_uris.art_crop);
        } else {
          console.log('No se encontró la imagen del avatar');
        }
      } else {
        console.log('Error obteniendo los datos del usuario:', data.message);
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        setLoading(true);
        fetchUserData();
      }
    }, [userId])
  );

  const handleLogout = async () => {
    try {
      const response = await fetch('https://magicarduct.online:3000/logout', {
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

  const handleViewProfile = () => {
    navigation.navigate('Profile', { userData });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <Text style={styles.noAvatarText}>No se encontró el avatar</Text>
          )}
          <Text style={styles.username}>{userData.userName}</Text>
          <TouchableOpacity style={styles.optionButton} onPress={handleViewProfile}>
            <Text style={styles.optionText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Text style={styles.optionText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1F28',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  noAvatarText: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2C2D37',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});