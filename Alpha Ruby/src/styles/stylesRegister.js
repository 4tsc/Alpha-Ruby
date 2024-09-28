import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2C2C2C', // Fondo gris oscuro moderno
  },
  title: {
    fontSize: 32, // Tamaño de fuente grande para destacar
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto en blanco para mayor contraste
  },
  input: {
    height: 50, // Aumentar altura para mejorar accesibilidad
    width: '80%',
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 20, // Más espacio entre los inputs
    paddingLeft: 15, // Espaciado para comodidad
    backgroundColor: '#3D3D3D', // Fondo gris oscuro para los inputs
    color: '#FFFFFF', // Texto blanco
    borderRadius: 10, // Esquinas más redondeadas para un look moderno
  },
  buttonContainer: {
    flexDirection: 'row', // Los botones alineados en fila
    justifyContent: 'space-between', 
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#F77F00', // Naranja vibrante para los botones
    paddingVertical: 12, // Más padding para mejorar la sensación táctil
    paddingHorizontal: 40, // Botones más amplios
    borderRadius: 12, // Esquinas redondeadas
    alignItems: 'center',
    shadowColor: '#000', // Sombras suaves
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, 
    elevation: 3, // Sombra para Android
  },
  buttonText: {
    color: '#FFFFFF', // Texto en blanco
    fontSize: 18, // Fuente más grande para mejor legibilidad
    fontWeight: 'bold',
  },
});

export const placeholderColor = '#999999'; // Placeholder en gris claro
