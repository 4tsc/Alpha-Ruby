import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { useUser } from './UserContext';

interface Deck {
  id: number;
  name: string;
}

interface DeckEditorScreenProps {
  route: {
    params?: {
      deck?: Deck;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const DeckEditorScreen: React.FC<DeckEditorScreenProps> = ({ route, navigation }) => {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto

  const deck = route.params?.deck || { id: 0, name: 'Nuevo Mazo' }; // Valor por defecto si no hay parámetros
  const [deckName, setDeckName] = useState(deck.name);

  // FUTURE IMPLEMENTATION:
  // Fetch deck details from the database based on the deck ID
  useEffect(() => {
    if (deck.id !== 0) {
      // const fetchDeckDetails = async () => {
      //   try {
      //     const response = await fetch(`https://your-api.com/decks/${deck.id}`);
      //     const data = await response.json();
      //     setDeckName(data.name);
      //   } catch (error) {
      //     console.error('Error fetching deck details:', error);
      //   }
      // };
      // fetchDeckDetails();
    }
  }, [deck.id]);

  // Función para guardar los cambios del mazo
  const saveDeck = () => {
    if (deckName.trim() === '') {
      Alert.alert('Error', 'El nombre del mazo no puede estar vacío.');
      return;
    }

    // Aquí se realizaría la llamada al servidor para actualizar el mazo en la base de datos
    // Por ejemplo:
    // fetch('https://tu-servidor.com/api/decks/' + deck.id, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name: deckName }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Manejar la respuesta del servidor
    //   Alert.alert('Éxito', 'El mazo ha sido actualizado.');
    //   navigation.goBack();
    // })
    // .catch(error => {
    //   // Manejar errores
    //   Alert.alert('Error', 'Hubo un problema al actualizar el mazo.');
    // });

    Alert.alert('Éxito', 'El mazo ha sido actualizado.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Mazo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del mazo"
        value={deckName}
        onChangeText={setDeckName}
      />
      <Button title="Guardar Cambios" onPress={saveDeck} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
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
  cancelButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'red',
  },
});

export default DeckEditorScreen;