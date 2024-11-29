import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around', // Para que los botones se distribuyan de manera uniforme
      marginBottom: 10, // Un pequeño margen inferior para separación
    },
    clearButton: {
      paddingHorizontal: 10, // Espaciado horizontal para el ícono
      justifyContent: 'center', // Centrar verticalmente el ícono
      alignItems: 'center', // Centrar horizontalmente el ícono
    },
    selectedButton: {
      backgroundColor: '#ccc', // Cambia esto al color que prefieras
      opacity: 0.7, // Opción para añadir un poco de opacidad
    },
    resultsContainer: {
      padding: 16,
      marginTop: 20
    },
    cardsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',               // Permitir que las cartas se envuelvan en múltiples filas
      justifyContent: 'space-between' // Espacio entre las cartas
    },
    cardContainer: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 16,
      width: '47%',                   // Ocupa el 47% del ancho para hacer dos columnas
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardImage: {
      width: '100%',                  // La imagen ocupará todo el ancho del contenedor
      height: 220,                    // Aumentar la altura para evitar que se recorten
      marginBottom: 8,                // Espacio entre la imagen y el nombre
      resizeMode: 'contain',          // Ajustar la imagen sin recortarla
    },
    cardName: {
      fontSize: 14,                  // Reducir el tamaño de la fuente para el nombre
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',           // Centrar el nombre debajo de la imagen
      marginBottom: 4,
    },
    cardStats: {
      fontSize: 12,                  // Reducir el tamaño de las estadísticas
      color: '#888',
      textAlign: 'center',           // Centrar las estadísticas
    },
    noResultsText: {
      fontSize: 16,
      color: '#ff4444',
      textAlign: 'center',
      marginTop: 20,
    },
    sectionContainerImg: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#333333', // Gris oscuro
    },
    imageContainer: {
      flexDirection: 'row',
    },
    image: {
      width: 45, 
      height: 45,
      marginRight: 10, 
    },
    container: {
      flex: 1,
      backgroundColor: '#1E1F28', // Fondo oscuro unificado
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#333333', 
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
      paddingLeft: 10,
      backgroundColor: '#333333', // Gris oscuro
      color: '#FFFFFF', // Texto blanco
      borderRadius: 5,
    },
    inputButton: {
      backgroundColor: '#D3C298', // Dorado suave para botón
      padding: 10,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    sideButton: {
      backgroundColor: '#D3C298',  // Dorado suave para botón
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 4,
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sideButtonText: {
      color: '#1E1F28',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      color: '#FFFFFF',
    },
    modalButton: {
      backgroundColor: '#D3C298',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    modalButtonText: {
      color: '#1E1F28',
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      justifyContent: 'center',
    },
    smallSymbolButton: {
      backgroundColor: '#4A4A4A',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      width: 60,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    symbolText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    smallSymbolButton2: {
      backgroundColor: '#D3C298',  // Dorado suave para botón
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      width: 60,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    symbolText2: {
      color: '#1E1F28',
      fontSize: 18,
    },
    textInput: {
      backgroundColor: '#333333',
      color: '#FFFFFF',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      height: 35,
      fontSize: 18,
      width: screenWidth, 
    },
    textInput2: {
      backgroundColor: '#333333',
      color: '#FFFFFF',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      height: 35,
      fontSize: 18,
      width: screenWidth / 2, 
    },
    orangeSection: {
      flex: 0.22,
      backgroundColor: '#1E1F28', // Fondo oscuro en vez de naranja
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333333', 
      borderRadius: 5,
      padding: 10,
    },
    optionButton: {
      padding: 15,
      backgroundColor: '#D3C298',  // Dorado suave
      borderRadius: 5,
    },
    optionText: {
      fontSize: 16,
      color: '#1E1F28',
    },
    searchIcon: {
      marginRight: 10,
      color: '#FFFFFF',
    },
    searchBar: {
      flex: 1,
      height: 40,
      color: '#FFFFFF',
    },
    graySection: {
      flex: 1,
      backgroundColor: '#1E1F28', 
      padding: 20,
    },
    filtersContainer: {
      marginTop: 20,
    },
    filtersText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#D3C298',
    },
    sectionContainer: {
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
      backgroundColor: '#333333',
      borderRadius: 10,
      width: '80%',
      maxHeight: 300,
      padding: 20,
      overflow: 'hidden',
    },
    sectionText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#FFFFFF',
    },
    sectionParagraph: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      backgroundColor: '#D3C298',  // Dorado suave para botones
      padding: 10,
      borderRadius: 5,
      margin: 5,
    },
    buttonText: {
      color: '#1E1F28',
    },
    toggleButton: {
      backgroundColor: '#9e6b4e',
      alignSelf: 'center',
    },
    smallTextInput: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 10,
      backgroundColor: '#D3C298', // Naranja suave
      color: '#000000',
    },
    dropdownButton: {
      backgroundColor: '#D3C298',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      width: 150,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      position: 'relative',
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    dropdownText: {
      color: '#1E1F28',
      fontSize: 14,
    },
    resultsText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    resultsDetail: {
      fontSize: 16,
      color: '#FFFFFF',
    },
  });

export default styles;