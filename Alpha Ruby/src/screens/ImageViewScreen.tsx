import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, TouchableOpacity, View, Text, Image, StyleSheet, Button } from 'react-native';

import { useUser } from './UserContext';

export default function ImageViewScreen({ route }) {
  const { userId } = useUser();
  const { imageUrl, cardId, cardUri } = route.params; // Recibe la URL de la imagen desde los parámetros de la navegación
  const [decks, setDecks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDecks = async () => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log('datos: ', data);
  
      if (response.ok) {
        // Usa 'idbarajas' en lugar de 'id'
        const formattedDecks = data.map((item) => ({
          id: item.idbarajas, // Ajustamos para que tome el ID correcto
          name: item.nombre, // Asignamos el nombre desde la respuesta del endpoint
          cards: [], // En este punto no hay cartas, por lo que será un array vacío
        }));
  
        // Actualizamos el estado con los mazos formateados
        setDecks(formattedDecks);
        console.log('Barajas formateadas:', formattedDecks); // Para depurar
      } else {
        console.error('Error:', data.error || 'No se encontraron barajas');
      }
    } catch (error) {
      console.error('Error al obtener las barajas:', error);
    }
  };

  const handleDeckSelection = async (deckId) => {
    const idcarta = cardId; // Usa el ID de la carta
    const cantidad = 1; // La cantidad es 1 por defecto

    try {
      const response = await fetch('https://magicarduct.online:3000/api/mazocartas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idmazo: deckId,
          idcarta: idcarta, // Aquí puedes usar el ID de la carta
          cantidad: cantidad,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Carta agregada al mazo exitosamente.');
      } else {
        Alert.alert('Error', data.error || 'No se pudo agregar la carta.');
      }
    } catch (error) {
      console.error('Error al agregar carta al mazo:', error);
      Alert.alert('Error', 'Hubo un problema al agregar la carta al mazo.');
    } finally {
      setModalVisible(false); // Cerrar el modal
    }
  };

  const handleAddToDeck = () => {
    setModalVisible(true); // Mostrar el modal
  };

  const closeModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

  useEffect(() => {
    fetchDecks(); // Llama a la función para obtener las barajas al cargar el componente
  }, []);

  return (
    <View style={styles.container}>
      {/* Mostrar la imagen en pantalla completa */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.fullImage}
        resizeMode="contain"
      />
      <Button title="Agregar a mazo" onPress={handleAddToDeck} />

      {/* Modal para mostrar las barajas */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una baraja</Text>
            <FlatList
              data={decks}
              keyExtractor={(item) => item.id.toString()} // Usa el ID como clave
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.deckItem}
                  onPress={() => handleDeckSelection(item.id)} // Llama a la función con el ID del mazo
                >
                  <Text style={styles.deckItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000', // Fondo negro para destacar la imagen
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullImage: {
      width: '100%',
      height: '40%', // Cambia esto para ocupar el 40% de la pantalla
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo semi-transparente
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    deckItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    deckItemText: {
      fontSize: 16,
    },
  });