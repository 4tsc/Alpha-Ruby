import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos

import { useUser } from './UserContext';

interface Deck {
  id: number;
  name: string;
  cards?: {
    IDcarta: number;
    name: string;
    image_uris: {
      small: string; // URL de la imagen en tamaño pequeño
    };
    type_line: string; // Tipo de la carta
  }[];
}

interface DeckEditorScreenProps {
  route: {
    params?: {
      deck?: Deck;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const DeckEditorScreen: React.FC<DeckEditorScreenProps> = ({ route, navigation }) => {
  const { userId } = useUser();
  
  const deck = route.params?.deck || { id: 0, name: 'Nuevo Mazo', cards: [] };

  const [deckName, setDeckName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards || []);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición
  const [newDeckName, setNewDeckName] = useState(deck.name);

  useEffect(() => {
    const fetchDeckCards = async () => {
      try {
        console.log('Iniciando la solicitud para obtener las cartas del mazo:', deck); // Log para verificar el ID del mazo
        const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deck.id}`);
      
        if (!response.ok) {
          throw new Error('No se pudieron obtener las cartas del mazo');
        }
      
        const data = await response.json();
        console.log('Cartas recibidas desde la API:', data); // Log para mostrar las cartas recibidas
      
        // Solicitar la información de cada carta en Scryfall
        const scryfallRequests = data.map(async (card) => {
          const scryfallResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
          
          if (!scryfallResponse.ok) {
            throw new Error(`No se pudo obtener la información de la carta con ID ${card.IDcarta}`);
          }
          
          return scryfallResponse.json();
        });
        
        // Esperar a que todas las solicitudes a Scryfall terminen
        const cardsData = await Promise.all(scryfallRequests);
        console.log('Información detallada de las cartas desde Scryfall:', cardsData);
        
        // Almacenar los detalles completos de las cartas en el estado
        setCards(cardsData);
      } catch (error) {
        console.error('Error al obtener las cartas del mazo:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchDeckCards();
  }, [deck.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const saveDeckChanges = () => {
    if (deckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }
    console.log('Guardando cambios del mazo:', { id: deck.id, name: deckName, cards });
    navigation.goBack();
  };

  const toggleEditName = async () => {
    if (isEditing) {
      // Si está editando, guarda el nuevo nombre
      deck.name = newDeckName; // Actualiza el nombre en el objeto deck
      console.log('enviando: ', newDeckName);
      // Llama a la función para actualizar el nombre del mazo en la API
      await updateDeckName();
    }
    setIsEditing(!isEditing); // Alterna el modo de edición
  };

  // Función para actualizar el nombre del mazo
const updateDeckName = async () => {
  try {
    console.log('Iniciando la solicitud para actualizar el nombre del mazo:', deck.id); // Log para verificar el ID del mazo
    console.log('empleando nombre:', deck.name);
    const response = await fetch(`https://magicarduct.online:3000/api/deldeck/${deck.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckId: deck.id, nombre: newDeckName }), // Aquí envías el nuevo nombre del mazo
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar el nombre del mazo');
    }

    const data = await response.json();
    console.log('Respuesta de la API al actualizar el nombre del mazo:', data); // Log para mostrar la respuesta

    // Aquí puedes manejar el éxito, como mostrar un mensaje al usuario
  } catch (error) {
    console.error('Error al actualizar el nombre del mazo:', error.message);
    // Manejo de errores, como mostrar un mensaje de error al usuario
  }
};

  const addCard = () => {
    // Redirigir a la pantalla de búsqueda
    navigation.navigate('Buscar', { deckId: deck.id });
  };

  const removeCard = (cardId: number) => {
    setCards(cards.filter(card => card.IDcarta !== cardId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la pantalla con el nombre del mazo y el ícono de lápiz al lado */}
      <View style={styles.titleContainer}>
        {isEditing ? (
          <TextInput
            style={styles.titleInput} // Asegúrate de definir estilos para el TextInput
            value={newDeckName}
            onChangeText={setNewDeckName}
            onSubmitEditing={toggleEditName} // Cambia al modo no editado al enviar
            autoFocus // Enfoca el TextInput al activar el modo de edición
          />
        ) : (
          <Text style={styles.title}>{deck.name}</Text>
        )}
        <TouchableOpacity onPress={toggleEditName} style={styles.editIconContainer}>
          <Icon name="pencil" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.cardsHeader}>
          <Text style={styles.sectionTitle}>Cartas del Mazo</Text>
          <TouchableOpacity onPress={addCard} style={styles.addCardButton}>
            <Icon name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {cards.map((card, index) => {
          return (
            <View key={card.IDcarta || index} style={styles.cardItem}>
              <Image source={{ uri: card.image_uris.small }} style={styles.cardImage} />
              <Text style={styles.cardName}>{card.name}</Text>
              <Text style={styles.cardType}>{card.type_line}</Text>
              <TouchableOpacity onPress={() => removeCard(card.IDcarta)} style={styles.deleteButton}>
                <Icon name="times" size={20} color="#D94A26" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Buscar Carta</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre de la carta"
              placeholderTextColor="#CCCCCC"
              value={newCardName}
              onChangeText={setNewCardName}
            />
            <TouchableOpacity onPress={addCard} style={styles.addButton}>
              <Text style={styles.addButtonText}>Agregar Carta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={saveDeckChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleInput: {
    fontSize: 24, // Ajusta según lo necesario
    color: '#FFFFFF', // Color del texto
    borderBottomWidth: 1, // Agrega un borde inferior para indicar que es un campo editable
    borderBottomColor: '#FFFFFF', // Color del borde
    marginRight: 5, // Margen a la derecha para separarlo del ícono
    width: '70%', // Ajusta el ancho como sea necesario
  },
  titleContainer: {
    flexDirection: 'row', // Coloca el texto y el ícono en fila
    alignItems: 'center', // Alinea verticalmente el ícono y el texto
    justifyContent: 'center', // Centra el contenido dentro del contenedor
    marginVertical: 20, // Espaciado vertical opcional
  },
  editIconContainer: {
    marginLeft: 5, // Espaciado a la izquierda del ícono, ajústalo según sea necesario
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  cardImage: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  cardName: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  cardType: {
    fontSize: 14,
    color: '#888888',
    marginLeft: 'auto',
    marginRight: 10,
  },
  deleteButton: {
    paddingHorizontal: 5,
  },
  deckNameContainer: {
    flexDirection: 'row', // Para alinear los elementos en fila
    alignItems: 'center', // Centra verticalmente los elementos
    justifyContent: 'space-between', // Espacia el texto y el icono
    width: '100%', // Ocupa todo el ancho disponible
    padding: 10, // Espaciado alrededor
    backgroundColor: '#333', // Fondo oscuro, cambia según tu tema
    borderRadius: 5, // Bordes redondeados
    marginBottom: 15, // Espaciado inferior para separar de otros elementos
  },
  container: {
    flex: 1,
    padding: 20,  // Ya tienes un padding general de 20
    backgroundColor: '#1E1F28',
  },
  title: {
    fontSize: 24, // Ajusta el tamaño de fuente según lo necesario
    color: '#FFFFFF', // Color del texto
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3D3D3D',
    padding: 15, // Ajusta el padding si es necesario para que haya más espacio en los bordes
    borderRadius: 12, 
    marginBottom: 20,
    marginHorizontal: 20,  // Añadimos un margen lateral para separar del borde
  },
  deckName: {
    fontSize: 18,
    color: '#FFFFFF',
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#D3C298', // Borde dorado suave
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#2C2D37',
    color: '#FFFFFF', // Texto blanco
    marginHorizontal: 10,  // Añadimos un margen horizontal en el input
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10, // Agregar padding para evitar que se pegue a los bordes laterales
    paddingVertical: 20,   // Agregar un margen vertical entre secciones
  },
  cardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addCardButton: {
    backgroundColor: '#D3C298', // Botón dorado
    padding: 8,
    borderRadius: 8,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#D3C298', // Botón dorado suave
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1E1F28', // Texto oscuro
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#3D3D3D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    marginBottom: 20,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#F77F00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#666666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
const placeholderColor = '#A09C99'; // Placeholder gris claro
export default DeckEditorScreen;
