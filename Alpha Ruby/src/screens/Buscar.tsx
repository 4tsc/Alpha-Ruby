import { Image, StyleSheet, View, TextInput, Text, ScrollView, Modal, FlatList, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono de FontAwesome


// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

// Lista de legalidades
const legalidadesList = [
  'Standard', 'Pioneer', 'Modern', 'Legacy', 'Vintage',
  'Commander', 'Oathbreaker', 'Brawl', 'Explorer', 'Timeless',
  'Historic', 'Pauper', 'Old School', 'Canadian High.', 'Premodern',
  'Conquest', 'Tiny Leaders', 'Standard Brawl', 'Gladiator', 'Pauper Cmdr.',
  'Penny', 'Duel Cmdr.', 'PreDH'
];

// Definir tipos para las props del componente LegalidadesSection
interface LegalidadesSectionProps {
  showMore: boolean;
  setShowMore: (show: boolean) => void;
}

const LegalidadesSection: React.FC<LegalidadesSectionProps> = ({ showMore, setShowMore }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Legalidades</Text>
    <View style={styles.buttonContainer}>
      {legalidadesList.slice(0, showMore ? legalidadesList.length : 10).map((title, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setShowMore(!showMore)} style={[styles.button, styles.toggleButton]}>
        <Text style={styles.buttonText}>{showMore ? 'Menos' : 'Más'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LineaDeTipoSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Linea de tipo</Text>
    <TextInput
      style={styles.smallTextInput} // Cambié a un estilo más pequeño
      placeholder="Legendaria, Artefacto, criatura"
      placeholderTextColor="#d1d1d1" // Placeholder gris más claro para mejor contraste
    />
  </View>
);

const EstadisticasSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Valor de mana');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentSymbol, setCurrentSymbol] = useState<string>('>');
  const [inputValue, setInputValue] = useState<string>(''); // Estado para el campo de texto

  const options = [
    'Valor de mana',
    'Fuerza',
    'Resistencia',
    'Lealtad',
    'Defensa',
  ];

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setModalVisible(false);
  };

  // Función para alternar los signos
  const toggleSymbol = () => {
    if (currentSymbol === '>') {
      setCurrentSymbol('<');
    } else if (currentSymbol === '<') {
      setCurrentSymbol('=');
    } else {
      setCurrentSymbol('>');
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>Estadísticas</Text>

      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedOption}</Text>
        <View style={styles.iconContainer}>
          <Icon name="bars" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleOptionSelect(item)}
                  style={styles.optionButton}
                  underlayColor="#ddd"
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableHighlight>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Botón para alternar símbolos y campo de texto */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.smallSymbolButton} onPress={toggleSymbol}>
          <Text style={styles.symbolText}>{currentSymbol}</Text>
        </TouchableOpacity>
        
        {/* Campo de texto */}
        <TextInput
          style={styles.textInput}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="Escribe algo"
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );
};

const TextoSection: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>Texto de la carta</Text>
      
      <View style={styles.inputWrapper}>
        {/* Contenedor de Input y Botón dentro del mismo */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Roba una carta, vuela"
          />
          <TouchableOpacity style={styles.inputButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Botón al lado derecho */}
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Contenido del Modal</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CosteDeManaSection: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  return(
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>Coste de mana</Text>
      
      <View style={styles.inputWrapper}>
        {/* Contenedor de Input y Botón dentro del mismo */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="2{G}{W}"
          />
          <TouchableOpacity style={styles.inputButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Botón al lado derecho */}
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Contenido del Modal</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ColoresSection: React.FC = () => {
  return(
    <View style={styles.sectionContainerImg}>
      <Text style={styles.sectionText}>Colores</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        <Image source={require('../images/G.svg')} style={styles.image} />
        <Image source={require('../images/B.svg')} style={styles.image} />
        <Image source={require('../images/R.svg')} style={styles.image} />
        <Image source={require('../images/U.svg')} style={styles.image} />
        <Image source={require('../images/W.svg')} style={styles.image} />
        <Image source={require('../images/C.svg')} style={styles.image} />
      </ScrollView>
    </View>
  );
};

const EdicionesSection: React.FC = () => {
 const [inputValue, setInputValue] = useState('');
  
 return(
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Ediciones</Text>
    <View style={styles.inputContainer}></View>
      <TextInput
        style={styles.inputContainer}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Edición"
      />
  </View>
 );
};

const PrecioSection: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Estado para el campo de texto
  const [currentSymbol, setCurrentSymbol] = useState<string>('>'); // Estado para el símbolo

  const toggleSymbol = () => {
    if (currentSymbol === '>') {
      setCurrentSymbol('<');
    } else if (currentSymbol === '<') {
      setCurrentSymbol('=');
    } else {
      setCurrentSymbol('>');
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>Precio</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.smallSymbolButton2} onPress={toggleSymbol}>
          <Text style={styles.symbolText2}>{currentSymbol}</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput2}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Precio"
          placeholderTextColor="#ccc"
          keyboardType="numeric" // Opcional: para mostrar el teclado numérico
        />

        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const filters = [
  { id: '1', title: 'Legalidades' },
  { id: '2', title: 'Linea de tipo' },
  { id: '3', title: 'Estadisticas' },
  { id: '4', title: 'Texto' },
  { id: '5', title: 'Coste de mana' },
  { id: '6', title: 'Colores' },
  { id: '7', title: 'Ediciones' },
  { id: '8', title: 'Precio' },
];

export default function TabTwoScreen() {
  const [searchText, setSearchText] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Lógica para mostrar contenido basado en el texto de búsqueda
  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersText}>Filtros</Text>
      {filters.map((filter) => {
        switch (filter.title) {
          case 'Legalidades':
            return <LegalidadesSection key={filter.id} showMore={showMore} setShowMore={setShowMore} />;
          case 'Linea de tipo':
            return <LineaDeTipoSection key={filter.id} />;
          case 'Estadisticas':
            return <EstadisticasSection key={filter.id} />;
          case 'Texto':
            return <TextoSection key={filter.id} />;
          case 'Coste de mana':
            return <CosteDeManaSection key={filter.id} />;
          case 'Colores':
            return <ColoresSection key={filter.id} />;
          case 'Ediciones':
            return <EdicionesSection key={filter.id} />;
          case 'Precio':
            return <PrecioSection key={filter.id} />;
          default:
            return null;
        }
      })}
    </View>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsText}>Resultados de búsqueda:</Text>
      <Text style={styles.resultsDetail}>Aquí van los resultados para "{searchText}"</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Área superior con fondo naranja y barra de búsqueda */}
      <View style={styles.orangeSection}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            placeholderTextColor="#d1d1d1"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Área inferior con fondo gris claro */}
      <ScrollView style={styles.graySection}>
        {searchText.length > 0 ? renderSearchResults() : renderFilters()}
      </ScrollView>
    </View>
  );
}

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
