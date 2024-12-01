import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, TouchableOpacity, View, Text, Image, StyleSheet, Button } from 'react-native';
import { useUser } from './UserContext';

export default function ImageViewScreen({ route }) {
  const { userId } = useUser();
  const { imageUrl, cardId, cardUri } = route.params; // Recibe la URL de la imagen desde los parámetros de la navegación
  const [decks, setDecks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0); // Índice para alternar entre caras

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
        const formattedDecks = data.map((item) => ({
          id: item.idbarajas,
          name: item.nombre,
          cards: [],
        }));

        setDecks(formattedDecks);
        console.log('Barajas formateadas:', formattedDecks);
      } else {
        console.error('Error:', data.error || 'No se encontraron barajas');
      }
    } catch (error) {
      console.error('Error al obtener las barajas:', error);
    }
  };

  const fetchCardDetails = async () => {
    try {
      const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Detalles de la carta:', data);
        setCardDetails(data);
      } else {
        console.error('Error al obtener los detalles de la carta:', data);
      }
    } catch (error) {
      console.error('Error al obtener los detalles de la carta:', error);
    }
  };

  const handleDeckSelection = async (deckId) => {
    const idcarta = cardId;
    const cantidad = 1;

    try {
      const response = await fetch('https://magicarduct.online:3000/api/mazocartas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idmazo: deckId,
          idcarta: idcarta,
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
      setModalVisible(false);
    }
  };

  const handleAddToDeck = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleCardFace = () => {
    if (cardDetails?.card_faces) {
      setCurrentFaceIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }
  };

  useEffect(() => {
    fetchDecks();
    fetchCardDetails();
  }, []);

  const renderCardDetails = () => {
    if (!cardDetails) return null;

    if (cardDetails.card_faces) {
      const currentFace = cardDetails.card_faces[currentFaceIndex];
      return (
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardTitle}>{currentFace.name}</Text>
          <Text style={styles.cardType}>{currentFace.type_line}</Text>
          <Text style={styles.cardText}>{currentFace.oracle_text}</Text>
        </View>
      );
    }

    return (
      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardTitle}>{cardDetails.name}</Text>
        <Text style={styles.cardType}>{cardDetails.type_line}</Text>
        <Text style={styles.cardSet}>{`Set: ${cardDetails.set_name}`}</Text>
        <Text style={styles.cardText}>{cardDetails.oracle_text}</Text>
        {cardDetails.power && cardDetails.toughness && (
          <Text style={styles.cardStats}>
            Fuerza: {cardDetails.power} / Resistencia: {cardDetails.toughness}
          </Text>
        )}
        {cardDetails.prices && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Precio:</Text>
            {cardDetails.prices.usd && (
              <Text style={styles.priceText}>USD: ${cardDetails.prices.usd}</Text>
            )}
            {cardDetails.prices.usd_foil && (
              <Text style={styles.priceText}>USD (Foil): ${cardDetails.prices.usd_foil}</Text>
            )}
            {cardDetails.prices.eur && (
              <Text style={styles.priceText}>EUR: €{cardDetails.prices.eur}</Text>
            )}
            {cardDetails.prices.tix && (
              <Text style={styles.priceText}>TIX: {cardDetails.prices.tix}</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: cardDetails?.card_faces
            ? cardDetails.card_faces[currentFaceIndex]?.image_uris?.large
            : imageUrl,
        }}
        style={styles.fullImage}
        resizeMode="contain"
      />

      {renderCardDetails()}

      {cardDetails?.card_faces && (
        <Button title="Alternar cara" onPress={toggleCardFace} />
      )}

      <Button title="Agregar a mazo" onPress={handleAddToDeck} />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una baraja</Text>
            <FlatList
              data={decks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.deckItem}
                  onPress={() => handleDeckSelection(item.id)}
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
  cardStats: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  priceContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semi-transparente
    borderRadius: 8,
    flexDirection: 'row',  // Alineación horizontal
    flexWrap: 'wrap',      // Asegura que se ajusten
    marginBottom: 10,
    justifyContent: 'center',  // Centra los precios
  },
  priceText: {
    fontSize: 16,
    marginHorizontal: 10,  // Espaciado horizontal entre precios
    marginVertical: 5,
  },
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
  cardDetailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semi-transparente
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Añade margen inferior
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardType: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  cardSet: {
    fontSize: 14,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
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
    borderBottomColor: '#ddd',
  },
  deckItemText: {
    fontSize: 16,
  },
});
