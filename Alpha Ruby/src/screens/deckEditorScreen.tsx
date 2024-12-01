import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StatusBar, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos
import styles from '../styles/stylesDeckEditor';

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
    card_faces?: CardFace[];
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
  const [isEditing, setIsEditing] = useState(false);
  const [newDeckName, setNewDeckName] = useState(deck.name);
  const [activeTab, setActiveTab] = useState('cards');

  useEffect(() => {
    const fetchDeckCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://magicarduct.online:3000/api/mazocartas/${deck.id}`);
        const data = await response.json();

        const scryfallRequests = data.map(async (card) => {
          const scryfallResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
          return scryfallResponse.ok ? scryfallResponse.json() : null;
        });

        const cardsData = await Promise.all(scryfallRequests);
        const validCards = cardsData.filter((card) => card !== null);

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
    navigation.goBack();
  };

  const toggleEditName = async () => {
    if (isEditing) {
      deck.name = newDeckName;
      await updateDeckName();
    }
    setIsEditing(!isEditing);
  };

  const updateDeckName = async () => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/deldeck/${deck.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deckId: deck.id, nombre: newDeckName }),
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el nombre del mazo');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error al actualizar el nombre del mazo:', error.message);
    }
  };

  const addCard = () => {
    navigation.navigate('Buscar', { deckId: deck.id });
  };

  const removeCard = async (deckId, cardId) => {
    try {
      const response = await fetch(`https://magicarduct.online:3000/api/eliminarmazocarta/${deckId}/${cardId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar la carta del mazo');
      }

      const data = await response.json();
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error al eliminar la carta:', error.message);
      alert('Error al eliminar la carta');
    }
  };

  const handleCardPress = (cardId, imageUrl) => {
    navigation.navigate('ImageViewScreen', {
      cardId,
      imageUrl,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="light-content" backgroundColor="#1E1F28" />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => setActiveTab('cards')}>
          <Text style={activeTab === 'cards' ? styles.activeTab : styles.tab}>Cartas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('stats')}>
          <Text style={activeTab === 'stats' ? styles.activeTab : styles.tab}>Estadísticas</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'cards' ? (
        <>
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
                    ? item.card_faces?.[0]?.image_uris?.small || item.image_uris?.small
                    : item.image_uris?.small;

                  const cardName = isDoubleFaced ? item.card_faces?.[0]?.name || item.name : item.name;

                  return (
                    <View style={styles.cardItem}>
                      <TouchableOpacity onPress={() => handleCardPress(item.id, imageUri)} style={styles.cardItem}>
                        <Image source={{ uri: imageUri }} style={styles.cardImage} />
                        <Text style={styles.cardName}>{cardName}</Text>
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
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estadísticas del Mazo</Text>
          <Text style={styles.statsText}>Total de Cartas: {cards.length}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DeckEditorScreen;