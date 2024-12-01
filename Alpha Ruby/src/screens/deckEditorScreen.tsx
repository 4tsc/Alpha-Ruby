import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Modal, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos
import { PieChart, BarChart } from 'react-native-chart-kit';
const { width, height } = Dimensions.get('window');

  interface CardFace {
    name: string;
    image_uris: {
      small: string;
      normal: string;
    };
  }

  interface Deck {
    id: number;
    name: string;
    cards?: {
      id: number;
      name: string;
      layout: string;
      card_faces?: CardFace[]; // Aquí agregamos card_faces
      image_uris: {
        small: string;
        normal: string;
      };
      type_line: string;
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
  const [manaCosts, setManaCosts] = useState([]);

  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición
  const [newDeckName, setNewDeckName] = useState(deck.name);

  const [activeTab, setActiveTab] = useState('cards'); // 'cards' o 'stats'

  useEffect(() => {
    const fetchDeckCards = async () => {
      setLoading(true);

      try {
        console.log('Iniciando la solicitud para obtener las cartas del mazo:', deck);

        const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deck.id}`);
        const data = await response.json();
        console.log('Cartas recibidas desde la API:', data);

        // Solicitar la información de cada carta en Scryfall
        const scryfallRequests = data.map(async (card) => {
          const scryfallResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
          return scryfallResponse.ok ? scryfallResponse.json() : null;
        });

        // Esperar a que todas las solicitudes a Scryfall terminen
        const cardsData = await Promise.all(scryfallRequests);
        const validCards = cardsData.filter((card) => card !== null); // Ignorar cartas inválidas

        console.log('Información detallada de las cartas desde Scryfall:', validCards);


        setCards(validCards);
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

  const ManaCostChart = ({ cards }) => {
    const manaCosts = cards.map(card => Math.floor(card.cmc || 0)); // Usar Math.floor para redondear hacia abajo
    
    // Crear un array de frecuencias de cada coste de maná
    const manaCostFrequencies = Array(11).fill(0); // Cambiar a 11 para incluir el 10+
    manaCosts.forEach(cost => {
      const adjustedCost = cost >= 10 ? 10 : cost; // Agrupar 10 y mayores en la última categoría
      manaCostFrequencies[adjustedCost] += 1;
    });
  
    return (
      <BarChart
        data={{
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
          datasets: [
            {
              data: manaCostFrequencies,
            },
          ],
        }}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: '#1E1F28',
          backgroundGradientFrom: '#1E1F28',
          backgroundGradientTo: '#1E1F28',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          decimalPlaces: 0, // No decimales
        }}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
      />
    );
  };
  
  const ManaColorPieChart = ({ cards }) => {
    // Mapear el coste de maná y el color de cada carta
    const colorManaCosts = cards.map(card => ({
      colors: card.colors, // Obtener el array de colores
      cost: Math.floor(card.cmc || 0), // Coste de maná
    }));
  
    // Contar cuántas cartas hay por color y coste
    const colorCounts = {};
    colorManaCosts.forEach(({ colors, cost }) => {
      if (Array.isArray(colors)) {  // Verificar si colors es un array
        colors.forEach(color => {
          if (!colorCounts[color]) colorCounts[color] = Array(11).fill(0);
          const adjustedCost = cost >= 10 ? 10 : cost;
          colorCounts[color][adjustedCost] += 1;
        });
      }
    });
  
    // Crear los datos para el gráfico
    const chartData = Object.keys(colorCounts).map(color => {
      let colorCode;
      let colorName;  // Variable para el nombre completo del color
      switch(color) {
        case 'W': colorCode = '#FFFFFF'; colorName = 'Blanco'; break;
        case 'U': colorCode = '#0000FF'; colorName = 'Azul'; break;
        case 'B': colorCode = '#000000'; colorName = 'Negro'; break;
        case 'R': colorCode = '#FF0000'; colorName = 'Rojo'; break;
        case 'G': colorCode = '#00FF00'; colorName = 'Verde'; break;
        default: colorCode = '#A9A9A9'; colorName = 'Otro'; break; // Gris para colores no reconocidos
      }
  
      return {
        name: colorName,  // Usar el nombre completo aquí
        population: colorCounts[color].reduce((sum, count) => sum + count, 0),
        color: colorCode,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });
  
    return (
      <PieChart
        data={chartData}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: '#1E1F28',
          backgroundGradientFrom: '#1E1F28',
          backgroundGradientTo: '#1E1F28',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    );
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
      {/* Contenedor de pestañas */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => setActiveTab('cards')}>
          <Text style={activeTab === 'cards' ? styles.activeTab : styles.tab}>Cartas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('stats')}>
          <Text style={activeTab === 'stats' ? styles.activeTab : styles.tab}>Estadísticas</Text>
        </TouchableOpacity>
      </View>
  
      {/* Contenido dinámico basado en la pestaña activa */}
      {activeTab === 'cards' ? (
        <>
          {/* Vista de cartas */}
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
  
          <View style={styles.emptyContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Cargando cartas...</Text>
            ) : error ? (
              <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
              <FlatList
                data={cards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const isDoubleFaced = ['transform', 'modal_dfc', 'double_faced_token'].includes(item.layout || '');
                  const imageUri = isDoubleFaced
                    ? item.card_faces?.[0]?.image_uris?.small || item.image_uris?.small // Imagen de la primera cara
                    : item.image_uris?.small;
  
                  const cardName = isDoubleFaced ? item.card_faces?.[0]?.name || item.name : item.name;
  
                  return (
                    <View style={styles.cardItem}>
                      <TouchableOpacity onPress={() => handleCardPress(item.id, imageUri)} style={styles.cardItem}>
                        <Image source={{ uri: imageUri }} style={styles.cardImage} />
                        <Text style={styles.cardName}>{cardName}</Text> {/* Mostrar solo el nombre de la primera cara */}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeCard(deck.id, item.id)} style={styles.removeButton}>
                        <Icon name="times" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                contentContainerStyle={{ height: height * 0.6 }}
              />
            )}
          </View>
  
          <TouchableOpacity onPress={saveDeckChanges} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addCard} style={styles.floatingButton}>
            <Icon name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      >
        <View
          style={{
            width: width * 0.9,
            minHeight: height * 0.4,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Distribución de Costes de Maná</Text>
          <ManaCostChart cards={cards} />
        </View>
    
        <View
          style={{
            width: width * 0.9,
            minHeight: height * 0.4,
            backgroundColor: '#d1e7dd',
            borderRadius: 8,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Distribución de Colores</Text>
          <ManaColorPieChart cards={cards} />
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  ); 
};

  const styles = StyleSheet.create({
  activeTab: {
    color: '#ffffff', // Texto blanco
    backgroundColor: '#007bff', // Fondo azul
    paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
    borderRadius: 8, // Bordes redondeados
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrado del texto
    marginHorizontal: 5, // Margen entre pestañas
  },
  tab: {
    color: '#000000', // Texto negro
    backgroundColor: '#e0e0e0', // Fondo gris claro
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  statsContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2C3E50',
    borderRadius: 10,
  },
  statsTitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: '#555555', // Texto gris medio
    lineHeight: 24, // Espaciado entre líneas
    textAlign: 'center',
  },
  
  floatingButton: {
    position: 'absolute',
    bottom: 785,
    right: 30,
    backgroundColor: '#444444', // Gris neutro
    borderRadius: 15, 
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Agregar sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    //elevation: 5, // Sombra para Android
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
    // backgroundColor: '#2C2C2C',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 20,
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
    width: 30, // Ancho fijo para la "X"
    height: 30, // Altura fija para la "X"
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,  // Espacio para separar la "X" del contenido de la carta
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
    width: '40%',
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
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1E1F28',
    fontSize: 18,
  },
});

export default DeckEditorScreen;