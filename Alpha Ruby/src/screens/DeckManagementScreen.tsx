import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ImageBackground } from 'react-native';
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
        console.log('datos: ', data);
    
        if (response.ok) {
          // Asegúrate de utilizar `idbarajas` como ID real
          const formattedDecks: Deck[] = data.map((item: { idbarajas: number, nombre: string }) => ({
            id: item.idbarajas,  // Usamos el ID real de la baraja
            name: item.nombre,    // Nombre de la baraja
            cards: [],            // Inicializamos el array de cartas vacío
          }));
    
          setDecks(formattedDecks);
          console.log('Barajas formateadas:', formattedDecks);  // Para depuración
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
            nombre: newDeckName,           // El nuevo nombre del mazo
            formato: selectedFormat,       // Formato seleccionado del Picker
            descripcion: '-',              // Pasando '-' como descripción
            idusuario: userId,             // ID del usuario que está creando el mazo
          }),
        });
    
        const data = await response.json();
        console.log('Respuesta:', data);
    
        if (response.ok) {
          const newDeck = {
            id: data.baraja.id,
            name: data.baraja.name,
            cards: [],
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
              onPress={() =>
                navigation.navigate("DeckEditor", { deck: { id: item.id, name: item.name } })
              }
              onLongPress={() => {
                setSelectedDeck(item); // Establece el ítem seleccionado
                setIsModalVisible2(true); // Abre el modal
              }}
            >
              <ImageBackground
                source={{ uri: 'https://example.com/image.jpg' }} // URL o require() para la imagen
                style={styles.deckItemBackground}
                imageStyle={styles.deckImage} // Imagen redondeada con borde visible
              >
                <Text style={styles.deckItemTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeDeck(item.name)} style={styles.deleteButton}>
                  <Icon name="times" size={20} color="#D94A26" />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          )}
          numColumns={2} // Aquí especificamos 2 columnas
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
                    removeDeck(selectedDeck?.id);
                  }}
                >
                  <Text style={styles.modalOptionText2}>Eliminar Mazo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption2}
                  onPress={() => {
                    setIsModalVisible2(false);
                    Alert.alert('Opción personalizada', 'Acción futura aquí.');
                  }}
                >
                  <Text style={styles.modalOptionText2}>Otra opción</Text>
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
    
        {/* Botón flotante para agregar un mazo */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.fab}>
          <Icon name="plus" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
    
  };

  const styles = StyleSheet.create({
    modalContainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
    },
    modalView2: {
      width: '80%',
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle2: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalOption2: {
      padding: 15,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#D94A26',
      borderRadius: 5,
    },
    modalOptionText2: {
      textAlign: 'center',
      color: '#D94A26',
      fontWeight: '600',
    },
      // Contenedor principal del mazo (mantiene las dimensiones y el borde)
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
    flex: 1,
    justifyContent: 'flex-start', // Coloca el texto en la parte superior
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 12,
  },
  // Estilo de la imagen (mantiene bordes redondeados y borde visible)
  deckImage: {
    borderRadius: 12, // Bordes redondeados para la imagen
  },
  // Estilo del texto del título del mazo
  deckItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco para contraste
    marginBottom: 8,
    textShadowColor: '#000', // Añade un ligero sombreado al texto
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
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
      marginBottom: 40,
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
    },
    input: {
      height: 50,
      backgroundColor: '#2C2D37', // Fondo gris oscuro para los inputs
      borderWidth: 1,
      borderColor: '#D3C298', // Borde dorado suave
      marginBottom: 20,
      paddingHorizontal: 20,
      borderRadius: 25,
      color: '#FFFFFF', // Texto blanco
      fontSize: 16,
      width: '100%',
    },
    addButton: {
      backgroundColor: '#D3C298', // Fondo dorado suave para el botón
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },
    addButtonText: {
      color: '#1E1F28', // Texto oscuro para contraste
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#666666', // Gris oscuro para el botón de cancelar
      paddingVertical: 15,
      borderRadius: 25,
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
      backgroundColor: '#D3C298', // Naranja suave para el FAB
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra para el botón flotante
    },
  });
  
export const placeholderColor = '#D3C298'; // Placeholder dorado suave
export default DeckManagementScreen;
