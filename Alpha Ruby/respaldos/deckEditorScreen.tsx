import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos
import { useUser } from './UserContext';

interface Deck {
  id: number;
  name: string;
  cards?: { id: number; name: string }[];
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

  const saveDeckChanges = () => {
    if (deckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }
    console.log('Guardando cambios del mazo:', { id: deck.id, name: deckName, cards });
    navigation.goBack();
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  // Eliminado el modal de agregar carta, ahora se redirige a la pantalla de búsqueda
  const addCard = () => {
    // Redirigir a la pantalla de búsqueda
    navigation.navigate('Buscar', { deckId: deck.id });
  };

  const removeCard = (cardId: number) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Editar Mazo</Text>
      
      {/* Contenedor del nombre del mazo */}
      <View style={styles.nameContainer}>
        {isEditingName ? (
          <TextInput
            style={styles.input}
            placeholder="Nombre del mazo"
            value={deckName}
            onChangeText={setDeckName}
            onBlur={toggleEditName}
            placeholderTextColor={placeholderColor}
          />
        ) : (
          <>
            <Text style={styles.deckName}>{deckName}</Text>
            <TouchableOpacity onPress={toggleEditName}>
              <Icon name="pencil" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.cardsHeader}>
          <Text style={styles.sectionTitle}>Cartas del Mazo</Text>
          {/* El botón "+" ahora redirige a la pantalla de búsqueda */}
          <TouchableOpacity onPress={addCard} style={styles.addCardButton}>
            <Icon name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <Text style={styles.cardText}>{card.name}</Text>
            <TouchableOpacity onPress={() => removeCard(card.id)} style={styles.deleteButton}>
              <Icon name="times" size={20} color="#D94A26" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Botón de guardar cambios */}
      <TouchableOpacity onPress={saveDeckChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,  // Ya tienes un padding general de 20
    backgroundColor: '#1E1F28',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
    textAlign: 'center',
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
  cardItem: {
    backgroundColor: '#2C2D37', // Fondo gris oscuro
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
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
});

const placeholderColor = '#A09C99'; // Placeholder gris claro

export default DeckEditorScreen;
