import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';

interface Deck {
  id: number;
  name: string;
}

const DeckManagementScreen: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([
    { id: 1, name: 'Mazo 1' },
    { id: 2, name: 'Mazo 2' },
  ]);
  const [newDeckName, setNewDeckName] = useState('');

  // Función para agregar un nuevo mazo
  const addDeck = () => {
    if (newDeckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }

    const newDeck: Deck = {
      id: decks.length + 1,
      name: newDeckName,
    };

    setDecks([...decks, newDeck]);
    setNewDeckName('');
  };

  // Función para eliminar un mazo
  const deleteDeck = (deckId: number) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar este mazo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => setDecks(decks.filter((deck) => deck.id !== deckId)) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Deck }) => (
    <View style={styles.deckItem}>
      <Text style={styles.deckName}>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteDeck(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gestión de Mazos</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.deckList}
      />

      <TextInput
        style={styles.input}
        placeholder="Nuevo nombre de mazo"
        value={newDeckName}
        onChangeText={setNewDeckName}
      />
      <Button title="Agregar Mazo" onPress={addDeck} />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: width * 0.06, // Ajusta el tamaño del texto de manera responsiva
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  deckList: {
    marginBottom: 20,
  },
  deckItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#444',
  },
  deckName: {
    color: '#fff',
  },
  deleteButton: {
    color: 'red',
  },
});

export default DeckManagementScreen;