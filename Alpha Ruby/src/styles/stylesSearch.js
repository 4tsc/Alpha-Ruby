import { StyleSheet, Dimensions } from "react-native";

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  sectionContainerImg: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 45, // Ajusta el tamaño de las imágenes según sea necesario
    height: 45,
    marginRight: 10, // Espacio entre imágenes
  },
  container: {
    flex: 1,
    backgroundColor: '#3b3535', // Cambia a gris más oscuro
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
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  inputButton: {
    backgroundColor: '#4c4543', // Puedes cambiar este color
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  sideButton: {
    backgroundColor: '#cf4b24', // Puedes cambiar este color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#cf4b24', // Puedes cambiar este color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',  // Asegura que los elementos estén en fila
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  smallSymbolButton: {
    backgroundColor: '#3b3535',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 60,
    height: 35,  // Asegura que tenga la misma altura que el campo de texto
    alignItems: 'center',
    justifyContent: 'center',  // Centra el texto dentro del botón
    marginRight: 10,  // Espacio entre el botón y el campo de texto
  },
  symbolText: {
    color: '#fff',
    fontSize: 18,  // Reducido el tamaño del texto
  },
  smallSymbolButton2: {
    backgroundColor: '#cf4b24',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 60,
    height: 35,  // Asegura que tenga la misma altura que el campo de texto
    alignItems: 'center',
    justifyContent: 'center',  // Centra el texto dentro del botón
    marginRight: 10,  // Espacio entre el botón y el campo de texto
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  symbolText2: {
    color: '#fff',
    fontSize: 18,  // Reducido el tamaño del texto
  },
  textInput: {
    backgroundColor: 'black',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 5, // Ajustado para que coincida con el botón
    paddingHorizontal: 10,
    height: 35, // Altura para coincidir con el botón
    fontSize: 18,
    width: screenWidth, // Ancho del campo de texto
  },
  textInput2: {
    backgroundColor: 'black',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 5, // Ajustado para que coincida con el botón
    paddingHorizontal: 10,
    height: 35, // Altura para coincidir con el botón
    fontSize: 18,
    width: screenWidth / 2, // Ancho del campo de texto
  },
  orangeSection: {
    flex: 0.22,
    backgroundColor: '#cf4b24',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a94f42',
    borderRadius: 5,
    padding: 10,
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#cf4b24',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  graySection: {
    flex: 1,
    backgroundColor: '#4c4543',
    padding: 20,
  },
  filtersContainer: {
    marginTop: 20,
  },
  filtersText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparente para el fondo
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    maxHeight: 300,
    overflow: 'hidden',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  sectionParagraph: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContent: {
    flexDirection: 'row',  // Alinea el texto y el icono en fila
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,  // Añade un margen para separar el icono del texto
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#cf4b24',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
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
    backgroundColor: '#a03718',
    color: '#000',
  },
  dropdownButton: {
    backgroundColor: '#cf4b24',
    paddingVertical: 5,  // Ajusta el espacio vertical
    paddingHorizontal: 10, // Ajusta el espacio horizontal
    borderRadius: 5,
    width: 150, // Reduce el ancho
    height: 35,  // Reduce la altura
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    marginTop: 10,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',  // Fija la posición del ícono
    right: 10,             // Mantén el ícono fijo a la derecha del botón
    top: '50%',            // Centra el ícono verticalmente
    transform: [{ translateY: -10 }],  // Ajusta el ícono para que esté correctamente alineado verticalmente
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14, // Reduce el tamaño de la fuente
  },
  picker: {
    backgroundColor: '#bc350d',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultsDetail: {
    fontSize: 16,
    color: '#fff',
  },
 });

 export default styles;