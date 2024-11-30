import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Modal, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos
const { width, height } = Dimensions.get('window');

interface Deck {
  id: number;
  name: string;
  cards?: {
    id: number;
    name: string;
    image_uris: {
      small: string; // URL de la imagen en tamaño pequeño
      normal: string;
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
  
  const deck = route.params?.deck || { id: 0, name: 'Nuevo Mazo', cards: [] };

  const [deckName, setDeckName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards || []);
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

  const removeCard = async (deckId, cardId) => {
    try {
      // Hacer la solicitud DELETE
      const response = await fetch(`https://magicarduct.online:3000/api/eliminarmazocarta/${deckId}/${cardId}`, {
        method: 'DELETE', // Método HTTP DELETE
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar la carta del mazo');
      }
  
      const data = await response.json();
      console.log('Respuesta de la eliminación de carta:', data);
  
      // Aquí actualizamos el estado local eliminando la carta que tiene el id igual al cardId
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      console.log('Carta eliminada del estado:', cardId);
  
    } catch (error) {
      console.error('Error al eliminar la carta:', error.message);
      alert('Error al eliminar la carta');
    }
  };
  const handleCardPress = (cardId, imageUrl) => {
    // Navegar a ImageViewScreen y pasar los parámetros necesarios
    navigation.navigate('ImageViewScreen', {
      cardId,
      imageUrl,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la pantalla con el nombre del mazo y el ícono de lápiz al lado */}
      <View style={styles.titleContainer}>
        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={newDeckName}
            onChangeText={setNewDeckName}
            onSubmitEditing={toggleEditName}
            autoFocus
          />
        ) : (
          <Text style={styles.title}>{deck.name}</Text>
        )}
        <TouchableOpacity onPress={toggleEditName} style={styles.editIconContainer}>
          <Icon name="pencil" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Contenedor vacío entre el nombre del mazo y el botón de guardar */}
      <View style={styles.emptyContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Cargando cartas...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id.toString()}  // Asumiendo que cada carta tiene un ID único
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                {/* Imagen pequeña de la carta */}
                <TouchableOpacity onPress={() => handleCardPress(item.id, item.image_uris?.normal)} style={styles.cardItem}>
                  <Image source={{ uri: item.image_uris?.small }} style={styles.cardImage} />
                  <Text style={styles.cardName}>{item.name}</Text>
                </TouchableOpacity>
                
                {/* "X" para eliminar la carta */}
                <TouchableOpacity onPress={() => removeCard(deck.id, item.id)} style={styles.removeButton}>
                  <Icon name="times" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ height: height * 0.6 }}
          />
        )}
      </View>

      <TouchableOpacity onPress={saveDeckChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={addCard} // Llama a la función addCard cuando se presiona el botón
        style={styles.floatingButton}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff5733', // Color de fondo del botón
    borderRadius: 30, // Hacer el botón redondo
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Agregar sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombra para Android
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cardItem: {
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  cardImage: {
    width: 50,  // Tamaño adecuado para la imagen
    height: 70, // Ajusta según el tamaño de la carta
    borderRadius: 4,  // Bordes redondeados para la imagen
    marginRight: 12,  // Espacio entre la imagen y el nombre de la carta
  },
  removeButton: {
    marginLeft: 10,  // Espacio para separar la "X" del contenido de la carta
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
  },
  titleInput: {
    fontSize: 24,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginRight: 5,
    width: '70%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  editIconContainer: {
    marginLeft: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1F28',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#D3C298',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1E1F28',
    fontSize: 18,
  },
});

export default DeckEditorScreen;