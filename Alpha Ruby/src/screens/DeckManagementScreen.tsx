import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../styles/stylesDeckManagementScreen';

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
    console.log('Deck added:', newDeck);
    console.log('Updated decks:', [...decks, newDeck]);
  };

  const removeDeck = (id: number) => {
    setDecks(decks.filter(deck => deck.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { padding: wp('5%') }]}>
      <Text style={[styles.title, { fontSize: wp('8%'), marginTop: hp('5%') }]}>Mis Mazos</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.deckItem, { padding: wp('4%'), marginVertical: hp('1%'), width: wp('90%') }]}
            onPress={() => {
              console.log('Navigating to DeckEditor with deck:', item);
              console.log('All decks:', decks);
              navigation.navigate('DeckEditor', { deck: item, decks }); // Pasar los mazos aquí
            }}
          >
            <Text style={[styles.deckText, { fontSize: wp('4.5%') }]}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeDeck(item.id)} style={styles.deleteButton}>
              <Text style={[styles.deleteButtonText, { fontSize: wp('4.5%') }]}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { padding: wp('5%'), width: wp('80%') }]}>
            <TextInput
              style={[styles.input, { height: hp('5%'), marginBottom: hp('2%'), width: wp('90%') }]}
              placeholder="Nombre del nuevo mazo"
              placeholderTextColor="#CCCCCC"
              value={newDeckName}
              onChangeText={setNewDeckName}
            />
            <TouchableOpacity onPress={addDeck} style={[styles.addButton, { padding: wp('4%'), width: wp('90%') }]}>
              <Text style={[styles.addButtonText, { fontSize: wp('4.5%') }]}>Agregar Mazo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[styles.cancelButton, { padding: wp('4%'), width: wp('90%') }]}>
              <Text style={[styles.cancelButtonText, { fontSize: wp('4.5%') }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.fab, { width: wp('15%'), height: wp('15%'), bottom: hp('5%'), right: wp('5%') }]}>
        <Text style={[styles.fabText, { fontSize: wp('7.5%') }]}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeckManagementScreen;