import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2C2C2C', // Fondo gris oscuro moderno
  },
  title: {
    fontSize: 28, // Título más grande para mayor impacto
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E5E5E5', // Texto en gris claro para un contraste suave
  },
  input: {
    height: 50, // Más altura para mejorar la accesibilidad táctil
    backgroundColor: '#3D3D3D', // Fondo gris más oscuro para el campo de entrada
    borderWidth: 1,
    borderColor: '#666666', // Borde gris claro para mejor visibilidad
    marginBottom: 20,
    paddingHorizontal: 15, // Espaciado ajustado
    borderRadius: 10, // Esquinas más redondeadas
    color: '#FFF', // Texto blanco
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F77F00', // Naranja vibrante para los botones
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12, // Botones con esquinas más redondeadas
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000', // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Ajuste para la sombra
    elevation: 3, // Sombra para Android
  },
  buttonText: {
    color: '#FFFFFF', // Texto en blanco para los botones
    fontSize: 18, // Tamaño de fuente más grande para mayor legibilidad
    fontWeight: 'bold',
  },
});
export const placeholderColor = '#999999'; // Placeholder en gris claro
