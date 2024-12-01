import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, TouchableOpacity, SafeAreaView, Modal, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/stylesDeckManagements';

import { useUser } from './UserContext';

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
  
    try {
      console.log('Iniciando la solicitud para obtener las cartas del mazo:', deckId);
  
      const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deckId}`);
      const data = await response.json();
      console.log('Cartas recibidas desde la API:', data);
  
      const scryfallRequests = data.map(async (card) => {
        const scryfallResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
        return scryfallResponse.ok ? scryfallResponse.json() : null;
      });
  
      const cardsData = await Promise.all(scryfallRequests);
      const validCards = cardsData.filter((card) => card !== null); // Ignorar cartas inválidas sin error explícito
  
      const formattedCards = validCards.map((card) => ({
        id: card.id,
        name: card.name,
        fullImage: card.image_uris.normal,
        artCrop: card.image_uris.art_crop,
      }));
  
      setCards(formattedCards);
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
              <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedFormat}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedFormat(itemValue)}
              >
                {options.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
              </View>
    
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


  
export const placeholderColor = '#D3C298'; // Placeholder dorado suave
export default DeckManagementScreen;
