import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from '../styles/stylesAddDeckModal';

const AddDeckModal = ({
  visible,
  onClose,
  onAdd,
  newDeckName,
  setNewDeckName,
  selectedFormat,
  setSelectedFormat,
  options,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
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

          {/* Botón para abrir la lista personalizada */}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setPickerVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedFormat
                ? options.find((option) => option.value === selectedFormat)?.label
                : 'Seleccionar formato'}
            </Text>
          </TouchableOpacity>

          {/* Modal para lista personalizada */}
          {isPickerVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isPickerVisible}
              onRequestClose={() => setPickerVisible(false)}
            >
              <View style={styles.listModalContainer}>
                <View style={styles.listModalView}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => {
                          setSelectedFormat(item.value);
                          setPickerVisible(false);
                        }}
                      >
                        <Text style={styles.listItemText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          )}

          <TouchableOpacity onPress={onAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar Mazo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddDeckModal;
