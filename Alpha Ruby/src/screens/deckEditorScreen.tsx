import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

interface Deck {
  id: number;
  name: string;
  cards?: { id: number; name: string }[]; // Añadir cards para permitir editar
}

interface DeckEditorScreenProps {
  route: {
    params?: {
      deck?: Deck;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void; // Agregar para la navegación
  };
}

const DeckEditorScreen: React.FC<DeckEditorScreenProps> = ({ route, navigation }) => {
  // Obtener el mazo de los parámetros, usar valores predeterminados si no están presentes
  const deck = route.params?.deck || { id: 0, name: 'Nuevo Mazo', cards: [] };

  const [deckName, setDeckName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards || []);

  // Función para guardar los cambios del mazo
  const saveDeckChanges = () => {
    if (deckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }

    // Aquí puedes agregar la lógica para guardar el mazo
    console.log('Guardando cambios del mazo:', { id: deck.id, name: deckName, cards });

    // Volver a DeckManagementScreen
    navigation.goBack(); // O puedes usar navigation.navigate('DeckManagement')
  };

  // Función para agregar una nueva carta al mazo
  const addCard = () => {
    const newCardName = `Carta ${cards.length + 1}`;
    const newCard = { id: cards.length + 1, name: newCardName };
    setCards([...cards, newCard]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Mazo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del mazo"
        value={deckName}
        onChangeText={setDeckName}
      />
      <TouchableOpacity onPress={saveDeckChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>Cartas del Mazo</Text>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <Text style={styles.cardText}>{card.name}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={addCard} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar Carta</Text>
        </TouchableOpacity>
      </View>
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
  },
  input: {
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#D94A26',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  cardItem: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#D94A26',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DeckEditorScreen;
