import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import { useUser } from './UserContext';

const { width } = Dimensions.get('window');
const itemSize = width * 0.3;  // 25% del ancho de la pantalla

interface Deck {
  id: number;
  name: string;
  image: string; // UUID de la imagen asociado a la baraja
  cards?: { id: number; name: string }[];
}

const DeckManagementScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const { userId } = useUser();

  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // Estado para el Picker
  const [selectedFormat, setSelectedFormat] = useState('standard'); // Inicializa con un valor por defecto
  const [isModalVisible2, setIsModalVisible2] = useState(false); // Controla la visibilidad del modal
  const [selectedDeck, setSelectedDeck] = useState(null); // Guarda el ítem seleccionado
  const [isModalVisible3, setIsModalVisible3] = useState(false); // Modal de opciones
  const [isChangeImageModalVisible, setIsChangeImageModalVisible] = useState(false); // Modal para cambiar imagen
  const [cards, setCards] = useState([]); // Cartas del mazo seleccionado
  const [isLoading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores


  const options = [
    { label: 'Standard', value: 'standard' },
    { label: 'Modern', value: 'modern' },
    { label: 'Legacy', value: 'legacy' },
    { label: 'Vintage', value: 'vintage' },
    { label: 'Pioneer', value: 'pioneer' },
    { label: 'Commander', value: 'commander' },
    { label: 'Brawl', value: 'brawl' },
    { label: 'Historic', value: 'historic' },
    { label: 'Pauper', value: 'pauper' },
    { label: 'Penny Dreadful', value: 'penny_dreadful' },
    { label: 'Canadian Highlander', value: 'canadian_highlander' },
    { label: 'Old School', value: 'old_school' },
    { label: 'Oathbreaker', value: 'oathbreaker' },
    { label: 'Duel Commander', value: 'duel_commander' },
    { label: 'Tiny Leaders', value: 'tiny_leaders' },
    { label: 'Historic Brawl', value: 'historic_brawl' },
    { label: 'Alchemy', value: 'alchemy' },
    { label: 'Explorer', value: 'explorer' },
    { label: 'Premodern', value: 'premodern' },
    { label: 'Frontier', value: 'frontier' },
    { label: 'Pauper EDH', value: 'pauper_edh' }
  ];

  const fetchDeckCards = async (deckId) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log('Iniciando la solicitud para obtener las cartas del mazo:', deckId);
  
      const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deckId}`);
      if (!response.ok) {
        throw new Error('No se pudieron obtener las cartas del mazo');
      }
  
      const data = await response.json();
      console.log('Cartas recibidas desde la API:', data);
  
      const scryfallRequests = data.map(async (card) => {
        const scryfallResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
        if (!scryfallResponse.ok) {
          throw new Error(`No se pudo obtener la información de la carta con ID ${card.IDcarta}`);
        }
        return scryfallResponse.json();
      });
  
      const cardsData = await Promise.all(scryfallRequests);
      console.log('Información detallada de las cartas desde Scryfall:', cardsData);
  
      // Mapeamos para dos usos diferentes
      const formattedCards = cardsData.map((card) => ({
        id: card.id,
        name: card.name,
        fullImage: card.image_uris.normal, // Imagen completa para visualizar
        artCrop: card.image_uris.art_crop, // Imagen representativa para mazo
      }));
  
      setCards(formattedCards);
    } catch (error) {
      console.error('Error al obtener las cartas del mazo:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

    // Función para obtener los mazos del usuario
    const fetchDecks = async () => {
      try {
        console.log(`Solicitud enviada a: https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`);
        
        const response = await fetch(`https://magicarduct.online:3000/api/barajasdeusuaio2/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log('Estado de la respuesta:', response.status); // Código de estado de la respuesta
    
        const data = await response.json();
        console.log('Datos recibidos del servidor:', data);
    
        if (response.ok) {
          // Asegúrate de utilizar `idbarajas` como ID real
          const formattedDecks: Deck[] = data.map((item: { idbarajas: number, nombre: string, imagen: string }) => ({
            id: item.idbarajas,  // Usamos el ID real de la baraja
            name: item.nombre,   // Nombre de la baraja
            image: item.imagen,  // URL de la imagen de la baraja
            cards: [],           // Inicializamos el array de cartas vacío
          }));
    
          setDecks(formattedDecks);
          console.log('Barajas formateadas:', formattedDecks);  // Para depuración
        } else {
          console.error('Error en la respuesta:', data.error || 'No se encontraron barajas');
        }
      } catch (error) {
        console.error('Error al obtener las barajas:', error);
      }
    };
    
    
  
    // useEffect para cargar los mazos al montar el componente
    useEffect(() => {
      fetchDecks();
      const unsubscribe = navigation.addListener('focus', () => {
        fetchDecks();
      });

      return unsubscribe;
    }, [navigation]);

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
            nombre: newDeckName,       // El nuevo nombre del mazo
            formato: selectedFormat,   // Formato seleccionado del Picker
            descripcion: '-',          // Pasando '-' como descripción
            idusuario: userId,         // ID del usuario que está creando el mazo
          }),
        });
    
        const data = await response.json();
        console.log('Respuesta:', data);
    
        if (response.ok) {
          const newDeck = {
            id: data.baraja.id,        // ID de la baraja recién creada
            name: data.baraja.name,    // Nombre de la baraja recién creada
            image: null,               // Imagen por defecto es null
            cards: [],                 // Inicializamos el array de cartas vacío
          };
    
          setDecks([...decks, newDeck]); // Agregar la nueva baraja a la lista
          setNewDeckName('');           // Limpiar el nombre del nuevo mazo
          setModalVisible(false);       // Cerrar el modal
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
    
    const handleCardSelection = async (deckId, imageUuid) => {
      try {
        console.log('Intentando actualizar la imagen del mazo...');
        console.log('Datos enviados:', { deckId, imageUuid });
    
        const response = await fetch('https://magicarduct.online:3000/update-deck-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deckId, // ID del mazo
            imageUuid, // UUID de la imagen
          }),
        });
    
        console.log('Respuesta del servidor recibida:', response);
    
        const data = await response.json();
    
        console.log('Datos recibidos (parsed JSON):', data);
    
        if (response.ok) {
          Alert.alert('Éxito', 'La imagen del mazo fue actualizada correctamente.');
          console.log('Actualización exitosa:', data);
        } else {
          Alert.alert('Error', data.error || 'No se pudo actualizar la imagen del mazo.');
          console.error('Error devuelto por el servidor:', data.error);
        }
      } catch (error) {
        console.error('Error al intentar actualizar la imagen del mazo:', error);
        Alert.alert('Error', 'No se pudo completar la solicitud.');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mis Mazos</Text>
        <FlatList
  data={decks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    console.log('ID del mazo:', item.id, 'Imagen del mazo:', item.image);

    const imageUrl = item.image
      ? `https://api.scryfall.com/cards/${item.image}?format=image&face=front&version=art_crop`
      : null;

    return (
      <TouchableOpacity
        style={styles.deckItem}
        onPress={() =>
          navigation.navigate("DeckEditor", { deck: { id: item.id, name: item.name } })
        }
        onLongPress={() => {
          setSelectedDeck(item);
          setIsModalVisible2(true);
        }}
      >
        <View style={styles.deckItemContent}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.deckItemBackground}
            />
          ) : (
            <View style={[styles.deckItemBackground, { backgroundColor: '#ccc' }]}>
              {/* Contenedor para el texto */}
            </View>
          )}

          {/* Aquí aseguramos que el texto esté visible encima de la imagen */}
          <View style={styles.textOverlay}>
            <Text style={styles.deckItemTitle}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }}
  numColumns={2} // Número de columnas
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
    
              {/* Picker para opciones adicionales */}
              <Picker
                selectedValue={selectedFormat}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedFormat(itemValue)}
              >
                {options.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
    
              <TouchableOpacity onPress={addDeck} style={styles.addButton}>
                <Text style={styles.addButtonText}>Agregar Mazo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    
        {/* Nuevo Modal para opciones del ítem seleccionado */}
        {isModalVisible2 && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible2}
            onRequestClose={() => setIsModalVisible2(false)}
          >
            <View style={styles.modalContainer2}>
              <View style={styles.modalView2}>
                <Text style={styles.modalTitle2}>Opciones para {selectedDeck?.name}</Text>
                <TouchableOpacity
                  style={styles.modalOption2}
                  onPress={() => {
                    setIsModalVisible2(false);
                    removeDeck(selectedDeck?.name);
                  }}
                >
                  <Text style={styles.modalOptionText2}>Eliminar Mazo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption2}
                  onPress={() => {
                    setIsModalVisible2(false); // Cierra el modal actual
                    fetchDeckCards(selectedDeck.id); // Carga las cartas del mazo seleccionado
                    setIsChangeImageModalVisible(true); // Abre el modal de cambio de imagen
                  }}
                >
                  <Text style={styles.modalOptionText2}>Cambiar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption2}
                  onPress={() => setIsModalVisible2(false)}
                >
                  <Text style={styles.modalOptionText2}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
        )}

<Modal
  visible={isChangeImageModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsChangeImageModalVisible(false)}
>
  <View style={styles.modalContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" color="#D3C298" />
    ) : error ? (
      <Text style={styles.errorText}>{error}</Text>
    ) : cards?.length > 0 ? (
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
<TouchableOpacity
  style={styles.cardItem}
  onPress={() => {
    // Obtén el ID del mazo seleccionado (esto depende de cómo estés manejando el mazo actual)
    const selectedDeckId = selectedDeck.id;  // Asegúrate de que 'selectedDeck' contenga el ID del mazo
    const selectedImageUuid = item.id;  // Obtén el UUID de la imagen de la carta seleccionada

    console.log("ID del mazo:", selectedDeckId);  // Verificación del ID del mazo
    console.log("UUID de la imagen:", selectedImageUuid);  // Verificación del UUID de la imagen

    // Llama a handleCardSelection con los valores correctos
    handleCardSelection(selectedDeckId, selectedImageUuid);
  }}
  accessibilityLabel={`Seleccionar carta ${item.name || "desconocida"}`}
  accessible
>
  {item.fullImage ? (
    <Image
      source={{ uri: item.fullImage }}
      style={styles.cardImage}
    />
  ) : (
    <Text style={styles.imageUnavailableText}>Imagen no disponible</Text>
  )}
</TouchableOpacity>
        )}
        contentContainerStyle={styles.cardsList}
        numColumns={3}
      />
    ) : (
      <Text style={styles.noCardsText}>No hay cartas disponibles para mostrar.</Text>
    )}

    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsChangeImageModalVisible(false)}
      accessibilityLabel="Cerrar modal de cambio de imagen"
      accessible
    >
      <Text style={styles.closeButtonText}>Cerrar</Text>
    </TouchableOpacity>
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
    deckItemContent: {
      position: 'relative', // Necesario para colocar el texto encima de la imagen
      width: '100%',
      height: '100%', // Se asegura de usar el 100% del contenedor
      justifyContent: 'flex-start', // Ajustamos para que el texto esté arriba
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    textOverlay: {
      position: 'absolute', // Hace que el texto esté encima de la imagen
      top: 10, // Le da un margen desde el borde superior
      left: 10, // Agrega un pequeño margen a la izquierda
      right: 10, // Agrega un margen a la derecha
      zIndex: 1,  // Asegura que el texto esté por encima de la imagen
      paddingHorizontal: 5, // Asegura que el texto no toque los bordes
    },
    imageUnavailableText: {
      color: 'gray',
      fontSize: 14,
      textAlign: 'center',
    },
    noCardsText: {
      fontSize: 16,
      color: '#444',
      textAlign: 'center',
      marginVertical: 20,
    },
    cardItem: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2C2D37',
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
    },
    cardsList: {
      alignItems: 'center',
      padding: 10,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#D3C298',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#2C2D37',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    modalContainer3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#2C2D37',
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    titleContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '15%', // Ocupa el 15% de la altura del contenedor
      backgroundColor: '#000000', // Fondo negro sólido
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView2: {
      width: '80%',
      padding: 20,
      backgroundColor: '#2C2D37', // Cambia el color de fondo del modal
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle2: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    modalOption2: {
      width: '100%',
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#383A48', // Fondo de cada opción
      borderRadius: 5,
      alignItems: 'center',
    },
    modalOptionText2: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '600',
    },
    deckItem: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2C2D37',
      margin: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D3C298',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
      height: itemSize, // Tamaño dinámico
      width: itemSize,  // Tamaño dinámico
    },
  // Estilo para `ImageBackground` del mazo
  deckItemBackground: {
    width: '100%',
    height: '100%', // La imagen ocupa todo el contenedor
    borderRadius: 10,
  },
  // Estilo de la imagen (mantiene bordes redondeados y borde visible)
  deckImage: {
    borderRadius: 12, // Bordes redondeados para la imagen
  },
  // Estilo del texto del título del mazo
  deckItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco para el texto
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 5,  // Añade espacio en la parte superior del texto si es necesario
  },
    picker: {
      width: '100%',
      height: 40,
      backgroundColor: '#1E1F28', // Fondo oscuro del picker
      borderRadius: 8,
      borderColor: '#D3C298', // Borde oscuro para unificar con el fondo
      borderWidth: 1,
      color: '#FFFFFF', // Color de texto blanco para contraste
      marginBottom: 15,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1E1F28', // Fondo plano oscuro
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
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
    deckText: {
      fontSize: 18,
      flex: 1,
      color: '#FFFFFF',
      fontWeight: '500',
      paddingHorizontal: 5, // Espaciado interno

    },
    input: {
      height: 50,
      backgroundColor: '#2C2D37', // Fondo gris oscuro para los inputs
      borderWidth: 1,
      borderColor: '#444444', // Borde gris oscuro
      marginBottom: 20,
      paddingHorizontal: 20,
      borderRadius: 8,
      color: '#FFFFFF', // Texto blanco
      fontSize: 16,
      width: '100%',
    },
    addButton: {
      backgroundColor: '#444444', // Fondo gris neutro para el botón
      paddingVertical: 15,
      borderRadius: 8, // Bordes rectos
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
      borderRadius: 10,
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
  
export const placeholderColor = '#D3C298'; // Placeholder dorado suave
export default DeckManagementScreen;
