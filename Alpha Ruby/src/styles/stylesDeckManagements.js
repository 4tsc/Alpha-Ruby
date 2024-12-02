import { StyleSheet, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
const itemSize = width * 0.3;  // 25% del ancho de la pantalla

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20, // Añadir padding para asegurar que el contenido no toque los bordes
    },
    modalView: {
      width: '100%', // Usar el 100% del ancho disponible
      maxWidth: 400, // Ancho máximo para pantallas grandes
      backgroundColor: '#1E1F28',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
      //picker de ediciones
      picker: {
        width: '100%',
        height: 'auto',
        color: '#FFFFFF', // Color del texto dentro del picker
        backgroundColor: '#2C2D37', // Fondo gris oscuro para el picker
      },
      pickerContainer: {
        width: '100%',
        borderRadius: 14,
        borderColor: '#D3C298', // Color del borde
        borderWidth: 1,
        overflow: 'hidden', // Recorta los bordes para que sean redondeados
        backgroundColor: '#1E1F28',
        marginBottom: 15,
      },
    deckItemContent: {
      position: 'relative', // Necesario para colocar el texto encima de la imagen
      width: '100%',
      height: '100%', // Se asegura de usar el 100% del contenedor
      justifyContent: 'flex-start', // Ajustamos para que el texto esté arriba
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    textOverlay: {
      position: 'absolute', // Hace que el texto esté encima de la imagen
      top: 10, // Le da un margen desde el borde superior
      left: 10, // Agrega un pequeño margen a la izquierda
      right: 10, // Agrega un margen a la derecha
      zIndex: 1,  // Asegura que el texto esté por encima de la imagen
      paddingHorizontal: 5, // Asegura que el texto no toque los bordes
    },
    imageUnavailableText: {
      color: 'gray',
      fontSize: 14,
      textAlign: 'center',
    },
    noCardsText: {
      fontSize: 16,
      color: '#444',
      textAlign: 'center',
      marginVertical: 20,
    },
    cardItem: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2C2D37',
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
    },
    cardsList: {
      alignItems: 'center',
      padding: 10,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#D3C298',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#2C2D37',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    modalContainer3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#2C2D37',
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    titleContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '15%', // Ocupa el 15% de la altura del contenedor
      backgroundColor: '#000000', // Fondo negro sólido
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView2: {
      width: '80%',
      padding: 20,
      backgroundColor: '#2C2D37', // Cambia el color de fondo del modal
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle2: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    modalOption2: {
      width: '100%',
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#383A48', // Fondo de cada opción
      borderRadius: 5,
      alignItems: 'center',
    },
    modalOptionText2: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '600',
    },
    deckItem: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2C2D37',
      margin: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D3C298',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
      height: itemSize, // Tamaño dinámico
      width: itemSize,  // Tamaño dinámico
    },
  // Estilo para `ImageBackground` del mazo
  deckItemBackground: {
    width: '100%',
    height: '100%', // La imagen ocupa todo el contenedor
    borderRadius: 10,
  },
  // Estilo de la imagen (mantiene bordes redondeados y borde visible)
  deckImage: {
    borderRadius: 12, // Bordes redondeados para la imagen
  },
  // Estilo del texto del título del mazo
  deckItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco para el texto
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginTop: 5,  // Añade espacio en la parte superior del texto si es necesario
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1E1F28', // Fondo plano oscuro
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
      color: '#FFFFFF', // Texto blanco
    },
    listContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
    deckText: {
      fontSize: 18,
      flex: 1,
      color: '#FFFFFF',
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
    addButton: {
      backgroundColor: '#D3C298', // Fondo dorado suave para el botón
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
    },
    addButtonText: {
      color: '#1E1F28', // Texto oscuro para contraste
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#666666', // Gris oscuro para el botón de cancelar
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      width: '100%',
    },
    cancelButtonText: {
      color: '#FFFFFF', // Texto blanco
      fontSize: 18,
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#444444', // Gris neutro para el FAB
      width: 60,
      height: 60,
      borderRadius: 15, // Bordes rectos
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra ligera para Android

    },
  });

  export default styles;