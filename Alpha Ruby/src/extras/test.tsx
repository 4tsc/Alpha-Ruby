import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useUser } from './UserContext';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from '../extras/CustomAlert'; // Importa el componente de alerta personalizado
import CustomPasswordModal from '../extras/CustomPasswordModal'; // Importa el componente de modal personalizado

const ProfileScreen = ({ navigation }) => {
  const { userId } = useUser();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [originalUsername, setOriginalUsername] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProfileSection, setShowProfileSection] = useState(true);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/obtener-usuario?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUsername(data.userName);
        setEmail(data.email);
        setOriginalUsername(data.userName);
        setOriginalEmail(data.email);
        setSelectedAvatar({ id: data.image, imageUrl: `https://api.scryfall.com/cards/${data.image}` });
      } else {
        console.error('Error obteniendo los datos del usuario:', data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('https://api.scryfall.com/cards/search?q=set:neo+rarity:common');
        const data = await response.json();

        const images = data.data
          .filter((card) => card.image_uris && card.image_uris.art_crop)
          .map((card) => ({
            id: card.id,
            imageUrl: card.image_uris.art_crop,
          }));

        setAvatars(images);
      } catch (error) {
        console.error('Error al obtener avatares:', error);
      }
    };
    fetchAvatars();
  }, []);

  const handleSave = async () => {
    if (selectedAvatar && username && email) {
      if (username !== originalUsername || email !== originalEmail) {
        setShowAlert(true);
      } else {
        try {
          console.log('Perfil guardado con los datos:', {
            userId,
            username,
            email,
            imageNumber: selectedAvatar.id,
          });
          const response = await fetch(`https://magicarduct.online:3000/api/usuario/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre: username,
              correo: email,
              imageNumber: selectedAvatar.id,
            }),
          });

          if (response.ok) {
            navigation.goBack();
          } else {
            Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
          }
        } catch (error) {
          console.error('Error al actualizar el perfil:', error);
          Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
        }
      }
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  const handleConfirmSave = async () => {
    setShowAlert(false);
    try {
      console.log('Perfil guardado con los datos:', {
        userId,
        username,
        email,
        imageNumber: selectedAvatar.id,
      });
      const response = await fetch(`https://magicarduct.online:3000/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: username,
          correo: email,
          imageNumber: selectedAvatar.id,
        }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar tu perfil.');
    }
  };

  const handleChangePassword = async (currentPassword) => {
    if (newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Las nuevas contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`https://magicarduct.online:3000/api/cambiar-contrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordSection(false);
        setShowProfileSection(true);
        setShowPasswordModal(false); // Cerrar el modal después de confirmar
      } else {
        Alert.alert('Error', data.message || 'No se pudo cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', 'Hubo un problema al cambiar la contraseña.');
    }
  };

  const avatarsPerPage = 10;
  const rowsPerPage = 4;
  const avatarsPerRow = 3;

  const totalPages = Math.ceil(avatars.length / avatarsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderAvatars = () => {
    const startIndex = currentPage * avatarsPerPage;
    const endIndex = startIndex + avatarsPerPage;
    const currentAvatars = avatars.slice(startIndex, endIndex);

    const rows = [];
    for (let i = 0; i < rowsPerPage; i++) {
      const rowAvatars = currentAvatars.slice(i * avatarsPerRow, (i + 1) * avatarsPerRow);
      rows.push(
        <View key={i} style={styles.avatarRow}>
          {rowAvatars.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              onPress={() => setSelectedAvatar(avatar)}
              style={[
                styles.avatarContainer,
                selectedAvatar?.id === avatar.id && styles.selectedAvatar,
              ]}
            >
              <Image source={{ uri: avatar.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <>
          {showProfileSection && (
            <>
              <Text style={styles.title}>Configuración de Perfil</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.subtitle}>Selecciona tu Avatar</Text>
              <ScrollView contentContainerStyle={styles.avatarList}>
                {renderAvatars()}
              </ScrollView>
              <View style={styles.pagination}>
                <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 0}>
                  <Text style={[styles.paginationText, currentPage === 0 && styles.disabledText]}>Anterior</Text>
                </TouchableOpacity>
                <Text style={styles.paginationText}>{currentPage + 1} / {totalPages}</Text>
                <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages - 1}>
                  <Text style={[styles.paginationText, currentPage === totalPages - 1 && styles.disabledText]}>Siguiente</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.changePasswordButton} onPress={() => { setShowProfileSection(false); setShowPasswordSection(true); }}>
                <Text style={styles.changePasswordButtonText}>Cambiar Contraseña</Text>
              </TouchableOpacity>
            </>
          )}
          {showPasswordSection && (
            <>
              <Text style={styles.title}>Cambiar Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                placeholderTextColor="#aaa"
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  if (text.length < 8) {
                    setPasswordError('La contraseña debe tener al menos 8 caracteres.');
                  } else {
                    setPasswordError('');
                  }
                }}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar nueva contraseña"
                placeholderTextColor="#aaa"
                value={confirmNewPassword}
                onChangeText={(text) => {
                  setConfirmNewPassword(text);
                  if (text !== newPassword) {
                    setPasswordError('Las nuevas contraseñas no coinciden.');
                  } else {
                    setPasswordError('');
                  }
                }}
                secureTextEntry
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              <TouchableOpacity style={styles.saveButton} onPress={() => setShowPasswordModal(true)}>
                <Text style={styles.saveButtonText}>Cambiar Contraseña</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.changePasswordButton} onPress={() => { setShowPasswordSection(false); setShowProfileSection(true); }}>
                <Text style={styles.changePasswordButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
          <CustomAlert
            visible={showAlert}
            title="Confirmación"
            message="Has cambiado tu nombre de usuario y/o correo electrónico. ¿Deseas guardar los cambios?"
            onCancel={() => setShowAlert(false)}
            onConfirm={handleConfirmSave}
          />
          <CustomPasswordModal
            visible={showPasswordModal}
            onCancel={() => setShowPasswordModal(false)}
            onConfirm={handleChangePassword}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  avatarList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    margin: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#007bff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationText: {
    color: 'white',
    fontSize: 16,
  },
  disabledText: {
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changePasswordButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  changePasswordButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;