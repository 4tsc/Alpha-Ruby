import { StyleSheet } from 'react-native';

const stylesAddDeckModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalView: {
    width: '90%',
    backgroundColor: '#2C2D37', // Fondo oscuro
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#3C3F4A', // Fondo gris para el input
    color: '#FFFFFF', // Texto blanco
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#44475a', // Fondo gris oscuro
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    color: '#FFFFFF', // Texto blanco
    width: '100%',
    backgroundColor: '#44475a', // Fondo interno del Picker
  },
  addButton: {
    width: '100%',
    backgroundColor: '#D3C298', // Fondo dorado para el botón
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#1E1F28', // Texto oscuro
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#666666', // Fondo gris para el botón de cancelar
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#44475a',
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  listModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  listModalView: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: '#2C2D37',
    padding: 10,
    borderRadius: 10,
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  listItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default stylesAddDeckModal;
