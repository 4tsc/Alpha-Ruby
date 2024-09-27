import { StyleSheet } from "react-native";

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

export default styles;