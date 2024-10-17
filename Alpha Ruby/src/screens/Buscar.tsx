import { ActivityIndicator, Image, StyleSheet, View, TextInput, Text, ScrollView, Modal, FlatList, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
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

const typesList = [
  'Artifact',
  'Creature',
  'Enchantment',
  'Instant',
  'Land',
  'Planeswalker',
  'Sorcery',
  'Tribal',
];

// Definir tipos para las props del componente LegalidadesSection
interface LegalidadesSectionProps {
  showMore: boolean;
  setShowMore: (show: boolean) => void;
  setFilter: (filter: any) => void; // O el tipo correcto que estés usando
  selectedLegality: string | null; // Añadir legalidad seleccionada
  setSelectedLegality: (legality: string | null) => void; // Añadir función para establecer la legalidad seleccionada
}

const LegalidadesSection: React.FC<LegalidadesSectionProps> = ({ showMore, setShowMore, selectedLegality, setSelectedLegality }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Legalidades</Text>
    <View style={styles.buttonContainer}>
      {legalidadesList.slice(0, showMore ? legalidadesList.length : 10).map((title, index) => {
        const isSelected = selectedLegality === title; // Verifica si el botón está seleccionado
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, isSelected && styles.selectedButton]} // Aplica estilo de selección
            onPress={() => setSelectedLegality(isSelected ? null : title)} // Desmarcar si ya está seleccionado
          >
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={() => setShowMore(!showMore)} style={[styles.button, styles.toggleButton]}>
        <Text style={styles.buttonText}>{showMore ? 'less' : 'more'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

interface TypesSectionProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

const LineaDeTipoSection: React.FC<TypesSectionProps> = ({ selectedType, setSelectedType }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Tipos de Carta</Text>
    <View style={styles.buttonContainer}>
      {typesList.map((title, index) => {
        const isSelected = selectedType === title;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, isSelected && styles.selectedButton]}
            onPress={() => setSelectedType(isSelected ? null : title)}
          >
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
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
  { id: '7', title: 'Precio' },
];

export default function TabTwoScreen() {
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [cardResults, setCardResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLegality, setSelectedLegality] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    order: 'name',
    dir: 'auto',
    colors: [],
    cmc: '',
    power: '',
    toughness: '',
    legality: '',
  });

  const fetchCards = async () => {
    if (searchText.trim() === '') return;

    setLoading(true);
    
    const colorsQuery = filter.colors.length ? `+color:${filter.colors.join(',')}` : '';
    const cmcQuery = filter.cmc ? `+cmc=${filter.cmc}` : '';
    const powerQuery = filter.power ? `+pow=${filter.power}` : '';
    const toughnessQuery = filter.toughness ? `+tou=${filter.toughness}` : '';
    const legalityQuery = filter.legality ? `+legal:${filter.legality}` : ''; // Agregar legalidad a la consulta
    const typeQuery = selectedType ? `+type:${selectedType}` : '';

    const fetchUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchText)}${colorsQuery}${cmcQuery}${powerQuery}${toughnessQuery}${legalityQuery}${typeQuery}&order=${filter.order}&dir=${filter.dir}`;
    
    console.log('URL de búsqueda:', fetchUrl);

    try {
        const response = await fetch(fetchUrl);
        const data = await response.json();

        if (data && data.data) {
            setCardResults(data.data);
        } else {
            setCardResults([]);
        }
    } catch (error) {
        console.error('Error al buscar cartas:', error);
        setCardResults([]);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchCards(); // Cada vez que se cambie el texto de búsqueda o los filtros, busca cartas
  }, [searchText, filter]);

  // Renderizado de los resultados de búsqueda
  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsText}>Resultados de búsqueda para "{searchText}":</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : cardResults.length > 0 ? (
        <ScrollView>
          <View style={styles.cardsGrid}>  {/* Grid de cartas */}
            {cardResults.map((card) => (
              <View key={card.id} style={styles.cardContainer}>
                {/* Mostrar la imagen de la carta */}
                {card.image_uris && (
                  <Image
                    source={{ uri: card.image_uris.small }} // Tamaño pequeño de la imagen
                    style={styles.cardImage}
                  />
                )}
                {/* Mostrar el nombre de la carta */}
                <Text style={styles.cardName}>{card.name}</Text>
  
                {/* Mostrar las estadísticas de Power y Toughness si existen */}
                {card.power && <Text style={styles.cardStats}>Power: {card.power}</Text>}
                {card.toughness && <Text style={styles.cardStats}>Toughness: {card.toughness}</Text>}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noResultsText}>No se encontraron cartas.</Text>
      )}
    </View>
  );
  

  // Lógica para mostrar contenido basado en el texto de búsqueda
  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersText}>Filtros</Text>
      {filters.map((filter) => {
        switch (filter.title) {
          case 'Legalidades':
            return <LegalidadesSection key={filter.id} showMore={showMore} setShowMore={setShowMore} setFilter={setFilter} selectedLegality={selectedLegality} setSelectedLegality={setSelectedLegality}/>;
          case 'Linea de tipo':
            return <LineaDeTipoSection key={filter.id} selectedType={selectedType} setSelectedType={setSelectedType}/>;
          case 'Estadisticas':
            return <EstadisticasSection key={filter.id} />;
          case 'Texto':
            return <TextoSection key={filter.id} />;
          case 'Coste de mana':
            return <CosteDeManaSection key={filter.id} />;
          case 'Colores':
            return <ColoresSection key={filter.id} />;
          case 'Precio':
            return <PrecioSection key={filter.id} />;
          default:
            return null;
        }
      })}
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
          {/* Icono de limpiar búsqueda */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <Icon name="times" size={20} color="#fff" />
            </TouchableOpacity>
          )}
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
    backgroundColor: '#4A4A4A', // Fondo gris oscuro
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
    backgroundColor: '#FF7F00', // Naranja brillante
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  sideButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  modalButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
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
    backgroundColor: '#FF7F00',
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
    color: '#FFFFFF',
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
    backgroundColor: '#FF7F00', // Naranja brillante
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
    backgroundColor: '#FF7F00',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
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
    backgroundColor: '#4A4A4A', 
    padding: 20,
  },
  filtersContainer: {
    marginTop: 20,
  },
  filtersText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
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
    backgroundColor: '#FF7F00',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#FFFFFF',
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
    backgroundColor: '#FF7F00', // Naranja suave
    color: '#000000',
  },
  dropdownButton: {
    backgroundColor: '#FF7F00',
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
    color: '#FFFFFF',
    fontSize: 14,
  },
  resultsContainer: {
    marginTop: 20,
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