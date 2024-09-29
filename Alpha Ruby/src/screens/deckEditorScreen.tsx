import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar iconos

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

  const addCard = () => {
    if (newCardName.trim() === '') {
      Alert.alert('Error', 'El nombre de la carta no puede estar vacío.');
      return;
    }
    const newCard = { id: cards.length + 1, name: newCardName };
    setCards([...cards, newCard]);
    setNewCardName('');
    setIsModalVisible(false);
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
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addCardButton}>
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

      {/* Modal para agregar una nueva carta */}
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
    padding: 20,
    backgroundColor: '#3D3D3D',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 12, // Bordes redondeados
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deckName: {
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 20,
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
    backgroundColor: '#F77F00',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardItem: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
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
  saveButton: {
    backgroundColor: '#F77F00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DeckEditorScreen;
