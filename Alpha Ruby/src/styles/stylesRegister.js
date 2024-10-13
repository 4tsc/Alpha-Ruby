import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1F28', // Fondo plano oscuro
  },
  title: {
    fontSize: 32, // Tamaño de fuente ajustado para uniformidad
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#FFFFFF', // Texto blanco
  },
  input: {
    height: 50,
    backgroundColor: '#2C2D37', // Fondo gris oscuro para los inputs
    borderWidth: 1,
    borderColor: '#D3C298', // Borde dorado suave
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#D3C298', // Fondo dorado suave para los botones
    paddingVertical: 15,
    width: '100%', // Botones ocupan todo el ancho
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15, // Espacio entre botones
  },
  buttonText: {
    color: '#1E1F28', // Texto oscuro para contraste
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#D3C298', // Mismo fondo dorado suave para consistencia
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#1E1F28', // Mismo texto oscuro para consistencia
    fontSize: 18, // Tamaño de fuente uniforme
    fontWeight: 'bold',
  },
});

export const placeholderColor = '#D3C298'; // Placeholder dorado suave acorde a los tonos
