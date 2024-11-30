import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useUser } from '../screens/UserContext';

const CustomHeader = () => {
  const { userId } = useUser();
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      console.log(`Fetching user data for userId: ${userId}`);
      const response = await fetch(`https://magicarduct.online:3000/obtener-usuario?userId=${userId}`);
      const data = await response.json();
      console.log('User data fetched:', data);

      if (response.ok) {
        // console.log(`Fetching avatar data for image: ${data.image}`);
        const avatarResponse = await fetch(`https://api.scryfall.com/cards/${data.image}`);
        const avatarData = await avatarResponse.json();
        // console.log('Avatar data fetched:', avatarData);
        
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
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserData();
      }
    }, [userId])
  );

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Magic card UCT</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Configuración')}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1E1F28',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
});

export default CustomHeader;