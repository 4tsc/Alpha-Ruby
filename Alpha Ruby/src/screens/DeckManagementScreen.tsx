
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';

import { useUser } from './UserContext';

interface Deck {
  id: number;
  name: string;
}

const DeckManagementScreen: React.FC = () => {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto

  const [decks, setDecks] = useState<Deck[]>([
    { id: 1, name: 'Mazo 1' },
    { id: 2, name: 'Mazo 2' },
  ]);
  const [newDeckName, setNewDeckName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Función para agregar un nuevo mazo
  const addDeck = () => {
    if (newDeckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }
    const newDeck = {
      id: decks.length + 1,
      name: newDeckName,
    };
    setDecks([...decks, newDeck]);
    setNewDeckName('');
    setModalVisible(false); // Cerrar el modal después de agregar
  };

  // Función para eliminar un mazo
  const removeDeck = (id: number) => {
    setDecks(decks.filter(deck => deck.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gestión de Mazos</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.deckItem}>
            <Text style={styles.deckText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeDeck(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      {/* Modal para agregar un nuevo mazo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
        <Text style={styles.fabText}>+</Text>
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
    marginTop: 40, // Ajustar este valor para mover el título hacia abajo
  },
  listContainer: {
    width: '100%',
    alignItems: 'center', // Centrar la lista
  },
  deckItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2C', // Fondo gris oscuro para cada mazo
    padding: 15,
    marginVertical: 10,
    width: '90%', // Hacer los elementos más largos
    borderRadius: 10,
    elevation: 3, // Sombra para que se vea más vistoso
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
  deleteButtonText: {
    fontSize: 18,
    color: '#D94A26', // Color naranja para la "X"
  },
  input: {
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#2C2C2C', // Fondo gris oscuro para input
    color: '#FFFFFF', // Texto blanco
  },
  addButton: {
    backgroundColor: '#D94A26', // Naranja para el botón
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
    backgroundColor: '#666666', // Gris para el botón de cancelar
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
    backgroundColor: '#D94A26', // Naranja para el FAB
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export const placeholderColor = '#CCCCCC'; // Color del placeholder

export default DeckManagementScreen;
