import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../styles/stylesDeckEditorScreen';

interface Deck {
  id: number;
  name: string;
  cards?: { id: number; name: string }[];
}

interface DeckEditorScreenProps {
  route: {
    params?: {
      deck?: Deck;
      decks?: Deck[]; // Recibir los mazos aquí
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const DeckEditorScreen: React.FC<DeckEditorScreenProps> = ({ route, navigation }) => {
  const decks = route.params?.decks || [];
  const initialDeck = route.params?.deck || decks[0] || { id: 0, name: '', cards: [] };

  console.log('Received deck:', route.params?.deck);
  console.log('Received decks:', route.params?.decks);

  const [deck, setDeck] = useState(initialDeck);
  const [deckName, setDeckName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards || []);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

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

  const selectDeck = (selectedDeck: Deck) => {
    setDeck(selectedDeck);
    setDeckName(selectedDeck.name);
    setCards(selectedDeck.cards || []);
    setIsPickerVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { padding: wp('10%') }]}>
      <Text style={[styles.title, { fontSize: wp('8%'), marginBottom: hp('2%') }]}>Editar Mazo</Text>
      
      <TouchableOpacity onPress={() => setIsPickerVisible(true)} style={[styles.pickerButton, { padding: wp('3%') }]}>
        <Text style={[styles.pickerButtonText, { fontSize: wp('4%') }]}>Seleccionar Mazo</Text>
      </TouchableOpacity>

      {isPickerVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPickerVisible}
          onRequestClose={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { padding: wp('5%'), width: wp('80%') }]}>
              <Text style={[styles.modalTitle, { fontSize: wp('6%') }]}>Seleccionar Mazo</Text>
              <Picker
                selectedValue={deck.id}
                onValueChange={(itemValue) => {
                  const selectedDeck = decks.find(d => d.id === itemValue);
                  if (selectedDeck) {
                    selectDeck(selectedDeck);
                  }
                }}
                style={styles.picker}
              >
                {decks.map((d) => (
                  <Picker.Item key={d.id} label={d.name} value={d.id} />
                ))}
              </Picker>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)} style={[styles.cancelButton, { padding: wp('3%') }]}>
                <Text style={[styles.cancelButtonText, { fontSize: wp('4%') }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={[styles.nameContainer, { padding: wp('3%'), marginBottom: hp('2%') }]}>
        {isEditingName ? (
          <TextInput
            style={[styles.input, { height: hp('5%'), paddingHorizontal: wp('3%') }]}
            placeholder="Nombre del mazo"
            value={deckName}
            onChangeText={setDeckName}
            onBlur={toggleEditName}
          />
        ) : (
          <>
            <Text style={[styles.deckName, { fontSize: wp('4.5%') }]}>{deckName}</Text>
            <TouchableOpacity onPress={toggleEditName}>
              <Icon name="pencil" size={wp('5%')} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={[styles.cardsContainer, { marginBottom: hp('2%') }]}>
        <View style={[styles.cardsHeader, { marginBottom: hp('1%') }]}>
          <Text style={[styles.sectionTitle, { fontSize: wp('6%') }]}>Cartas del Mazo</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.addCardButton, { padding: wp('2%') }]}>
            <Icon name="plus" size={wp('5%')} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {cards.map((card) => (
          <View key={card.id} style={[styles.cardItem, { padding: wp('4%'), marginBottom: hp('1%') }]}>
            <Text style={[styles.cardText, { fontSize: wp('4.5%') }]}>{card.name}</Text>
            <TouchableOpacity onPress={() => removeCard(card.id)} style={styles.deleteButton}>
              <Icon name="times" size={wp('5%')} color="#D94A26" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { padding: wp('5%'), width: wp('80%') }]}>
            <Text style={[styles.modalTitle, { fontSize: wp('6%'), marginBottom: hp('2%') }]}>Buscar Carta</Text>
            <TextInput
              style={[styles.modalInput, { height: hp('5%'), paddingHorizontal: wp('3%'), marginBottom: hp('2%') }]}
              placeholder="Nombre de la carta"
              placeholderTextColor="#CCCCCC"
              value={newCardName}
              onChangeText={setNewCardName}
            />
            <TouchableOpacity onPress={addCard} style={[styles.addButton, { padding: wp('3%'), marginBottom: hp('1%') }]}>
              <Text style={[styles.addButtonText, { fontSize: wp('4.5%') }]}>Agregar Carta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.cancelButton, { padding: wp('3%') }]}>
              <Text style={[styles.cancelButtonText, { fontSize: wp('4.5%') }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={saveDeckChanges} style={[styles.saveButton, { padding: wp('3%') }]}>
        <Text style={[styles.saveButtonText, { fontSize: wp('4.5%') }]}>Guardar Cambios</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeckEditorScreen;