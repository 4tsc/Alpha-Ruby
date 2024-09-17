import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#504c56', // Fondo gris oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF', // Texto en blanco
  },
  input: {
    height: 40,
    backgroundColor: '#d9552b', // Fondo naranja
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#FFF', // Texto en blanco
  },
  buttonContainer: {
    flexDirection: 'column', // Cambiado a columna para apilar los botones verticalmente
    justifyContent: 'center', // Centra los botones verticalmente
    alignItems: 'center', // Centra los botones horizontalmente
    marginTop: 20,
  },
  button: {
    backgroundColor: '#d9552b',
    paddingVertical: 10, // Altura ajustada del botón
    paddingHorizontal: 30, // Anchura ajustada del botón
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 60,// Añadido margen inferior para separar los botones
    marginTop: 60, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export const placeholderColor = '#FFF';