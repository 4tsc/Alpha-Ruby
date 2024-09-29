import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Deck {
  id: number;
  name: string;
  cards?: { id: number; name: string }[];
}

const DeckManagementScreen: React.FC = () => {
  const navigation = useNavigation();

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
              placeholderTextColor="#CCCCCC"
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
    backgroundColor: '#3D3D3D', // Fondo gris oscuro
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
    marginTop: 40,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
  },
  deckItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 12, // Bordes redondeados
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
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#2C2C2C', // Fondo gris oscuro para el input
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#F77F00', // Naranja vibrante para el botón
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#666666', // Gris oscuro para el botón de cancelar
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
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
    backgroundColor: '#3D3D3D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#F77F00', // Naranja vibrante para el FAB
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra para el botón flotante
  },
});

export default DeckManagementScreen;
