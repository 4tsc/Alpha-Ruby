import { Image, View, TextInput, ScrollView, Text, Modal, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono de FontAwesome
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../styles/stylesSearch';

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
    <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Legalidades</Text>
    <View style={styles.buttonContainer}>
      {legalidadesList.slice(0, showMore ? legalidadesList.length : 10).map((title, index) => (
        <TouchableOpacity key={index} style={[styles.button, { padding: wp('2%') }]}>
          <Text style={[styles.buttonText, { fontSize: wp('3.5%') }]}>{title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setShowMore(!showMore)} style={[styles.button, styles.toggleButton, { padding: wp('2%') }]}>
        <Text style={[styles.buttonText, { fontSize: wp('3.5%') }]}>{showMore ? 'Menos' : 'Más'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LineaDeTipoSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Linea de tipo</Text>
    <TextInput
      style={[styles.smallTextInput, { fontSize: wp('3.5%'), height: hp('5%') }]} // Cambié a un estilo más pequeño
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
      <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Estadísticas</Text>

      <TouchableOpacity style={[styles.dropdownButton, { width: wp('80%'), height: hp('5%') }]} onPress={() => setModalVisible(true)}>
        <Text style={[styles.dropdownText, { fontSize: wp('3.5%') }]}>{selectedOption}</Text>
        <View style={styles.iconContainer}>
          <Icon name="bars" size={wp('5%')} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { width: wp('80%'), maxHeight: hp('40%') }]}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => handleOptionSelect(item)}
                  style={[styles.optionButton, { padding: wp('2%') }]}
                  underlayColor="#ddd"
                >
                  <Text style={[styles.optionText, { fontSize: wp('3.5%') }]}>{item}</Text>
                </TouchableHighlight>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Botón para alternar símbolos y campo de texto */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.smallSymbolButton, { width: wp('15%'), height: hp('5%') }]} onPress={toggleSymbol}>
          <Text style={[styles.symbolText, { fontSize: wp('4%') }]}>{currentSymbol}</Text>
        </TouchableOpacity>
        
        {/* Campo de texto */}
        <TextInput
          style={[styles.textInput, { fontSize: wp('3.5%'), height: hp('5%'), width: wp('60%') }]}
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
      <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Texto de la carta</Text>
      
      <View style={styles.inputWrapper}>
        {/* Contenedor de Input y Botón dentro del mismo */}
        <View style={[styles.inputContainer, { height: hp('5%') }]}>
          <TextInput
            style={[styles.input, { fontSize: wp('3.5%'), height: hp('5%') }]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Roba una carta, vuela"
          />
          <TouchableOpacity style={[styles.inputButton, { padding: wp('2%') }]} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={wp('5%')} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Botón al lado derecho */}
        <TouchableOpacity style={[styles.sideButton, { height: hp('5%'), width: wp('20%') }]}>
          <Text style={[styles.sideButtonText, { fontSize: wp('3.5%') }]}>Añadir</Text>
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
          <View style={[styles.modalContent, { width: wp('80%'), maxHeight: hp('40%') }]}>
            <Text style={[styles.modalText, { fontSize: wp('4%') }]}>Contenido del Modal</Text>
            <TouchableOpacity style={[styles.modalButton, { padding: wp('2%') }]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { fontSize: wp('3.5%') }]}>Cerrar</Text>
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
      <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Coste de mana</Text>
      
      <View style={styles.inputWrapper}>
        {/* Contenedor de Input y Botón dentro del mismo */}
        <View style={[styles.inputContainer, { height: hp('5%') }]}>
          <TextInput
            style={[styles.input, { fontSize: wp('3.5%'), height: hp('5%') }]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="2{G}{W}"
          />
          <TouchableOpacity style={[styles.inputButton, { padding: wp('2%') }]} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={wp('5%')} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Botón al lado derecho */}
        <TouchableOpacity style={[styles.sideButton, { height: hp('5%'), width: wp('20%') }]}>
          <Text style={[styles.sideButtonText, { fontSize: wp('3.5%') }]}>Añadir</Text>
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
          <View style={[styles.modalContent, { width: wp('80%'), maxHeight: hp('40%') }]}>
            <Text style={[styles.modalText, { fontSize: wp('4%') }]}>Contenido del Modal</Text>
            <TouchableOpacity style={[styles.modalButton, { padding: wp('2%') }]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { fontSize: wp('3.5%') }]}>Cerrar</Text>
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
      <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Colores</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        <Image source={require('../images/G.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
        <Image source={require('../images/B.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
        <Image source={require('../images/R.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
        <Image source={require('../images/U.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
        <Image source={require('../images/W.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
        <Image source={require('../images/C.png')} style={[styles.image, { width: wp('12%'), height: wp('12%') }]} />
      </ScrollView>
    </View>
  );
};

const EdicionesSection: React.FC = () => {
 const [inputValue, setInputValue] = useState('');
  
 return(
  <View style={styles.sectionContainer}>
    <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Ediciones</Text>
    <View style={[styles.inputContainer, { height: hp('5%') }]}>
      <TextInput
        style={[styles.input, { fontSize: wp('3.5%'), height: hp('5%') }]}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Edición"
      />
    </View>
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
      <Text style={[styles.sectionText, { fontSize: wp('4%') }]}>Precio</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.smallSymbolButton2, { width: wp('15%'), height: hp('5%') }]} onPress={toggleSymbol}>
          <Text style={[styles.symbolText2, { fontSize: wp('4%') }]}>{currentSymbol}</Text>
        </TouchableOpacity>
        
        <TextInput
          style={[styles.textInput2, { fontSize: wp('3.5%'), height: hp('5%'), width: wp('60%') }]}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Precio"
          placeholderTextColor="#ccc"
          keyboardType="numeric" // Opcional: para mostrar el teclado numérico
        />

        <TouchableOpacity style={[styles.sideButton, { height: hp('5%'), width: wp('20%') }]}>
          <Text style={[styles.sideButtonText, { fontSize: wp('3.5%') }]}>Añadir</Text>
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
      <Text style={[styles.filtersText, { fontSize: wp('5%') }]}>Filtros</Text>
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
      <Text style={[styles.resultsText, { fontSize: wp('5%') }]}>Resultados de búsqueda:</Text>
      <Text style={[styles.resultsDetail, { fontSize: wp('4%') }]}>Aquí van los resultados para "{searchText}"</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Área superior con fondo naranja y barra de búsqueda */}
      <View style={[styles.orangeSection, { paddingHorizontal: wp('5%'), paddingVertical: hp('2%') }]}>
        <View style={[styles.searchBarContainer, { padding: wp('2%') }]}>
          <Ionicons name="search" size={wp('5%')} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchBar, { fontSize: wp('4%'), height: hp('5%') }]}
            placeholder="Buscar..."
            placeholderTextColor="#d1d1d1"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Área inferior con fondo gris claro */}
      <ScrollView style={[styles.graySection, { padding: wp('5%') }]}>
        {searchText.length > 0 ? renderSearchResults() : renderFilters()}
      </ScrollView>
    </SafeAreaView>
  );
}