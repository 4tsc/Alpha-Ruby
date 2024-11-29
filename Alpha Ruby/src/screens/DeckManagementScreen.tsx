import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useUser } from './UserContext';

interface Deck {
  id: number;
  name: string;
  cards?: { id: number; name: string }[];
}

const DeckManagementScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const { userId } = useUser();

  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

    // Función para obtener los mazos del usuario
    const fetchDecks = async () => {
      try {
        const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
        console.log('datos: ', data)

        if (response.ok) {
          // Transformamos los datos recibidos para que se ajusten a la interfaz Deck
          const formattedDecks: Deck[] = data.map((item: { nombre: string }, index: number) => ({
            id: index + 1,  // Asignamos un ID arbitrario o extraído si lo tienes
            name: item.nombre,  // Asignamos el nombre desde la respuesta del endpoint
            cards: [],  // En este punto no hay cartas, por lo que será un array vacío
          }));
    
          // Actualizamos el estado con los mazos formateados
          setDecks(formattedDecks);
          console.log('Barajas formateadas:', formattedDecks);  // Para depurar
        } else {
          console.error('Error:', data.error || 'No se encontraron barajas');
        }
      } catch (error) {
        console.error('Error al obtener las barajas:', error);
      }
    };
    
  
    // useEffect para cargar los mazos al montar el componente
    useEffect(() => {
      fetchDecks();
    }, []);

    const addDeck = async () => {
      if (newDeckName.trim() === '') {
        Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
        return;
      }
  
      try {
        // Realizar la solicitud POST al endpoint para agregar la baraja
        const response = await fetch('https://magicarduct.online:3000/api/createmazo2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: newDeckName,           // El nuevo nombre del mazo
            formato: 'test',               // Pasando 'test' como formato
            descripcion: 'test',           // Pasando 'test' como descripción
            idusuario: userId,             // ID del usuario que está creando el mazo
          }),
        });
  
        const data = await response.json();
        console.log('mecago', data);
  
        if (response.ok) {
          // Agregar el nuevo mazo a la lista de mazos (puedes obtener el id de la baraja del backend)
          const newDeck = {
            id: data.baraja.id,
            name: data.baraja.name,
            cards: [], // En este punto no tienes cartas asignadas al mazo
          };
          setDecks([...decks, newDeck]);
  
          setNewDeckName('');  // Limpiar el nombre del nuevo mazo
          setModalVisible(false);  // Cerrar el modal
        } else {
          Alert.alert('Error', data.error || 'No se pudo crear el mazo');
        }
      } catch (error) {
        console.error('Error al agregar el mazo:', error);
        Alert.alert('Error', 'No se pudo agregar el mazo');
      }
    };
  
    const removeDeck = async (deckName: string) => {
      console.log(`Intentando eliminar el mazo: ${deckName}`); // <-- Log para verificar
      
      try {
        // Realiza la solicitud HTTP DELETE al servidor con el nuevo endpoint
        const response = await fetch(`https://magicarduct.online:3000/api/eliminarmazo2/${deckName}/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
        console.log("Respuesta del servidor:", data); // <-- Log para verificar la respuesta del servidor
    
        if (response.ok) {
          // Antes de actualizar el estado
          console.log("Decks antes de eliminar:", decks);
    
          const updatedDecks = decks.filter((deck) => deck.name !== deckName);
          setDecks(updatedDecks);
    
          // Después de actualizar el estado
          console.log("Decks después de eliminar:", updatedDecks);
          Alert.alert("Mazo eliminado correctamente.");
        } else {
          Alert.alert("Error al eliminar el mazo.");
        }
      } catch (error) {
        console.error("Error al eliminar el mazo:", error);
        Alert.alert("Error de red. No se pudo eliminar el mazo.");
      }
    };
    

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mis Mazos</Text>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.deckItem}
              onPress={() => navigation.navigate("DeckEditor", { deck: item.id })}
            >
              <Text style={styles.deckText}>{item.name}</Text>
              {/* Aquí pasamos el nombre del mazo en lugar del ID */}
              <TouchableOpacity onPress={() => removeDeck(item.name)} style={styles.deleteButton}>
                <Icon name="times" size={20} color="#D94A26" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
    
        {/* Modal para agregar un nuevo mazo */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del nuevo mazo"
                placeholderTextColor="#CCCCCC"
                value={newDeckName}
                onChangeText={setNewDeckName}
              />
              <TouchableOpacity onPress={addDeck} style={styles.addButton}>
                <Text style={styles.addButtonText}>Agregar Mazo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    
        {/* Botón flotante para agregar un mazo */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.fab}>
          <Icon name="plus" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1E1F28', // Fondo oscuro principal
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: 20, // Ajuste superior para evitar que quede muy arriba
      marginBottom: 30,
      textAlign: 'center',
      color: '#FFFFFF', // Texto blanco
    },
    listContainer: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 20, // Espacio de 20px en los laterales
      paddingVertical: 10, // Espaciado adicional en la lista
    },
    deckItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1E1E1E', // Fondo negro para los mazos
      padding: 15,
      marginVertical: 10,
      paddingHorizontal: 50,
      width: '95%', // Ancho casi completo, dejando un pequeño margen lateral
      borderWidth: 1, // Borde sutil para separar los elementos
      borderColor: '#444444', // Borde gris oscuro
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2, // Sombra ligera para dar algo de profundidad
      shadowRadius: 2,
      elevation: 2, // Sombra para Android
      borderRadius: 8,
      alignSelf: 'center',
    },
    deckText: {
      fontSize: 18,
      flex: 1,
      fontWeight: '500', // Negrita ligera para destacar
      color: '#FFFFFF', // Texto blanco
      paddingHorizontal: 5, // Espaciado interno
    },
    deleteButton: {
      marginLeft: 10,
      padding: 8,
      backgroundColor: '#333333', // Fondo gris oscuro para el botón
      borderRadius: 2, // Bordes rectos
    },
    input: {
      height: 50,
      backgroundColor: '#2C2D37', // Fondo gris oscuro para los inputs
      borderWidth: 1,
      borderColor: '#444444', // Borde gris oscuro
      marginBottom: 20,
      paddingHorizontal: 20,
      borderRadius: 8, // Bordes rectos
      color: '#FFFFFF', // Texto blanco
      fontSize: 16,
      width: '100%',
    },
    addButton: {
      backgroundColor: '#444444', // Fondo gris neutro para el botón
      paddingVertical: 15,
      borderRadius: 15, // Bordes rectos
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },
    addButtonText: {
      color: '#FFFFFF', // Texto blanco para el botón
      fontSize: 18,
      fontWeight: 'bold',
      borderRadius: 8
    },
    cancelButton: {
      backgroundColor: '#666666', // Gris oscuro para el botón de cancelar
      paddingVertical: 15,
      borderRadius: 8, // Bordes rectos
      alignItems: 'center',
      width: '100%',
    },
    cancelButtonText: {
      color: '#FFFFFF', // Texto blanco
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: '#1E1F28',
      padding: 20,
      borderRadius: 2, // Bordes rectos
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#444444', // Gris neutro para el FAB
      width: 60,
      height: 60,
      borderRadius: 15, // Bordes rectos
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3, // Sombra ligera para Android
    },
  });
  
  export const placeholderColor = '#666666'; // Placeholder gris oscuro
  export default DeckManagementScreen;
  