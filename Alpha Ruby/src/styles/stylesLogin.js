import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#87CEEB',
    fontFamily: 'serif',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#87CEEB',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'serif',
    width: '100%',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',  // Asegura que los botones estén en una fila
    justifyContent: 'space-between',  // Espacio entre los botones
    alignItems: 'center',  // Asegura la alineación vertical
    width: '80%',
  },
  button: {
    backgroundColor: 'transparent',  // Fondo transparente
    paddingVertical: 0,  // Aumentamos la altura del padding para más espacio
    paddingHorizontal: 20,  // Reducimos el padding horizontal para dar más espacio al texto
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '58%',  // Aumentamos el ancho del botón para evitar que el texto se corte
    height: 60,  // Aumentamos la altura del botón
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,  // Mismo tamaño de letra
    fontWeight: 'bold',
    fontFamily: 'serif',  // Fuente serif
    textShadowColor: '#000',  // Sombra para mejorar la legibilidad
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,  // Mismo tamaño de letra
    fontWeight: 'bold',
    fontFamily: 'serif',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
  },
});

export const placeholderColor = '#87CEEB'; // Placeholder azul suave acorde a los tonos del fondo
