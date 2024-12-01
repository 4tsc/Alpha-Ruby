import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    activeTab: {
      color: '#ffffff', // Texto blanco
      backgroundColor: '#007bff', // Fondo azul
      paddingVertical: 10, // Espaciado vertical
      paddingHorizontal: 20, // Espaciado horizontal
      borderRadius: 8, // Bordes redondeados
      fontWeight: 'bold', // Texto en negrita
      textAlign: 'center', // Centrado del texto
      marginHorizontal: 5, // Margen entre pestañas
    },
    tab: {
      color: '#000000', // Texto negro
      backgroundColor: '#e0e0e0', // Fondo gris claro
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      textAlign: 'center',
      marginHorizontal: 5,
    },
    statsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9', // Fondo gris claro
      borderRadius: 10,
      marginVertical: 10,
      shadowColor: '#000', // Sombra para dar profundidad
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3, // Sombra para Android
    },
    statsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333', // Texto gris oscuro
      marginBottom: 10,
      textAlign: 'center',
    },
    statsText: {
      fontSize: 16,
      color: '#555555', // Texto gris medio
      lineHeight: 24, // Espaciado entre líneas
      textAlign: 'center',
    },
    
    floatingButton: {
      position: 'absolute',
      bottom: 785,
      right: 30,
      backgroundColor: '#444444', // Gris neutro
      borderRadius: 15, 
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000', // Agregar sombra
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 1,
      //elevation: 5, // Sombra para Android
    },
    loadingText: {
      color: '#FFFFFF',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    cardItem: {
      //backgroundColor: '#2C2C2C',
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 20,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      maxWidth: 400, // Define un ancho máximo para el contenedor
    },
    cardName: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left', // Alineación del texto
      maxWidth: 150, // Limita el ancho del contenedor al 70% (ajústalo según sea necesario)
      flexWrap: 'wrap', // Permite que el texto se divida en varias líneas
      
    },
    cardImage: {
      width: 50,  // Tamaño adecuado para la imagen
      height: 70, // Ajusta según el tamaño de la carta
      borderRadius: 4,  // Bordes redondeados para la imagen
      marginRight: 12,  // Espacio entre la imagen y el nombre de la carta
    },
    removeButton: {
      width: 30, // Ancho fijo para la "X"
      height: 30, // Altura fija para la "X"
      justifyContent: 'center',
      alignItems: 'center',
      // marginLeft: 10,  // Espacio para separar la "X" del contenido de la carta
      padding: 5,
    },
    emptyContainer: {
      flex: 1,
    },
    titleInput: {
      fontSize: 24,
      color: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#FFFFFF',
      marginRight: 5,
      width: '40%',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    editIconContainer: {
      marginLeft: 5,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#1E1F28',
    },
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 20,
    //     backgroundColor: '#1E1F28', // Fondo plano oscuro
    //   },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
    },
    saveButton: {
      backgroundColor: '#D3C298',
      padding: 15,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#1E1F28',
      fontSize: 18,
    },
  });

export default styles;