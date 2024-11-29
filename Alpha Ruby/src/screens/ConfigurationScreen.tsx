import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useUser } from './UserContext';

export default function ConfigurationScreen({ navigation }) {
  const { userId, setUserId } = useUser();
  const [userData, setUserData] = useState({ nombre: '', correo: '', imageNumber: 1 });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://magicarduct.online:3000/usuario`, {
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

  const handleUpdate = async (field) => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Obtener la imagen actual del usuario
      const responseGet = await fetch(`https://magicarduct.online:3000/obtener-usuario?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await responseGet.json();

      if (!responseGet.ok) {
        console.log('Error obteniendo los datos del usuario:', data.message);
        return;
      }

      const imageNumber = data.image;

      // Datos a enviar al servidor
      const updateData = {
        nombre: field === 'nombre' ? newName : userData.nombre,
        correo: field === 'correo' ? newEmail : userData.correo,
        password: password,
        imageNumber: imageNumber
      };

      console.log('Datos enviados al servidor:', updateData); // Agregar console.log para depuración

      // Enviar los datos actualizados al servidor
      const responseUpdate = await fetch(`https://magicarduct.online:3000/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await responseUpdate.json();

      if (responseUpdate.ok) {
        Alert.alert('Actualización exitosa', 'Tus datos han sido actualizados.');
        setUserData({ 
          ...userData, 
          nombre: field === 'nombre' ? newName : userData.nombre,
          correo: field === 'correo' ? newEmail : userData.correo
        });
        setIsEditingName(false);
        setIsEditingEmail(false);
        setPassword(''); // Vaciar el campo de contraseña
        setConfirmPassword(''); // Vaciar el campo de confirmación de contraseña
        setNewName(''); // Vaciar el campo de nuevo nombre
        setNewEmail(''); // Vaciar el campo de nuevo correo
      } else {
        Alert.alert('Error de actualización', result.message || 'No se pudo actualizar los datos.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
      console.error('Error en el fetch:', error);
    }
  };

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

  const handleEditName = () => {
    console.log('User ID:', userId);
    console.log('Credenciales:', { userId, newName, password, confirmPassword });
    setIsEditingName(true);
  };

  const handleEditEmail = () => {
    console.log('User ID:', userId);
    console.log('Credenciales:', { userId, newEmail, password, confirmPassword });
    setIsEditingEmail(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Configuración</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre: {userData.nombre}</Text>
        <TouchableOpacity onPress={handleEditName}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
      </View>
      {isEditingName && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nuevo Nombre"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button title="Actualizar Nombre" onPress={() => handleUpdate('nombre')} />
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>Correo: {userData.correo}</Text>
        <TouchableOpacity onPress={handleEditEmail}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
      </View>
      {isEditingEmail && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nuevo Correo"
            value={newEmail}
            onChangeText={setNewEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button title="Actualizar Correo" onPress={() => handleUpdate('correo')} />
        </View>
      )}

      <Button title="Cerrar Sesión" onPress={handleLogout} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  editButton: {
    color: '#007BFF',
    marginLeft: 10,
  },
  editContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#2C2D37',
    borderWidth: 1,
    borderColor: '#D3C298',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: '#FFFFFF',
    fontSize: 16,
    width: '100%',
  },
});