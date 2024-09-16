import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3D3D3D', // Fondo gris oscuro originalmente, ajustado a #504c56 si es necesario
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#666666',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#2C2C2C', // Fondo gris oscuro para input
    color: '#FFFFFF', // Texto blanco
  },
  buttonContainer: {
    flexDirection: 'row', // Hace que los botones se alineen en una fila
    justifyContent: 'space-between', // Agrega espacio entre los botones
    marginTop: 20,
    width: '80%', // Ajusta el ancho del contenedor de los botones
  },
  button: {
    backgroundColor: '#D94A26', // Naranja para el botón
    padding: 10,
    borderRadius: 5,
    width: '48%', // Ajusta el ancho del botón para que ambos quepan en una fila
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const placeholderColor = '#CCCCCC'; // Color del placeholder
