import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useUser } from './UserContext';

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

  const addDeck = () => {
    if (newDeckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }
    const newDeck = {
      id: decks.length + 1,
      name: newDeckName,
      cards: [],
    };
    setDecks([...decks, newDeck]);
    setNewDeckName('');
    setModalVisible(false);
  };

  const removeDeck = (id: number) => {
    setDecks(decks.filter(deck => deck.id !== id));
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
            onPress={() => navigation.navigate('DeckEditor', { deck: item })}
          >
            <Text style={styles.deckText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeDeck(item.id)} style={styles.deleteButton}>
              <Icon name="times" size={20} color="#D94A26" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
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
              placeholderTextColor={placeholderColor}
              value={newDeckName}
              onChangeText={setNewDeckName}
            />
            <TouchableOpacity onPress={addDeck} style={styles.addButton}>
              <Text style={styles.addButtonText}>Agregar Mazo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
    alignItems: 'center',
  },
  deckItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2D37', // Fondo gris oscuro
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 12, // Bordes redondeados
    borderWidth: 1,
    borderColor: '#D3C298', // Borde dorado suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  deckText: {
    fontSize: 18,
    flex: 1,
    color: '#FFFFFF', // Texto blanco
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
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
