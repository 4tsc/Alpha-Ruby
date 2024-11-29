import { ActivityIndicator, Image, StyleSheet, View, TextInput, Text, ScrollView, Modal, FlatList, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation  } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono de FontAwesome
import styles from '../styles/stylesBuscar';

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

interface TextoSectionProps {
  inputValue: string; // Valor actual del input
  setInputValue: (value: string) => void; // Función para actualizar el valor del input
}

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

const filters = [
  { id: '1', title: 'Legalidades' },
  { id: '2', title: 'Linea de tipo' },
  { id: '3', title: 'Texto' },
  { id: '4', title: 'Coste de mana' },
  { id: '5', title: 'Colores' },
];

export default function TabTwoScreen() {
  const [searchText, setSearchText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [cardResults, setCardResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLegality, setSelectedLegality] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState({
    colors: [],
    cmc: '',
    power: '',
    toughness: '',
    loyalty: '',
    defense: '',
    legality: '',
    type: '',
    order: 'name',
    dir: 'auto',
  });

  const TextoSection: React.FC<TextoSectionProps> = ({ inputValue, setInputValue }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempInputValue, setTempInputValue] = useState(inputValue); // Estado temporal para el input
  
    // Función para manejar el presionar el botón "Añadir"
    const handleAddClick = () => {
      // Solo actualiza el estado externo de inputValue cuando se presiona el botón
      setInputValue(tempInputValue); // Actualiza el inputValue real
      fetchCards(tempInputValue); // Llama a fetchCards con el valor temporal del input
    };
  
    // Función que simula la búsqueda de cartas (fetchCards)
    const fetchCards = (searchText: string) => {
      if (searchText.trim() === '') return;
      // Lógica de fetchCards aquí (ya proporcionada en el código original)
      console.log('Buscando cartas con:', searchText);
    };
  
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Texto de la carta</Text>
  
        <View style={styles.inputWrapper}>
          {/* Contenedor de Input y Botón dentro del mismo */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={tempInputValue} // Usamos el estado temporal
              onChangeText={setTempInputValue} // Actualiza el estado temporal
              placeholder="Roba una carta, vuela"
            />
          </View>
  
          {/* Botón al lado derecho */}
          <TouchableOpacity
            style={styles.sideButton}
            onPress={handleAddClick} // Al presionar, ejecutamos la búsqueda y actualizamos el input real
          >
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

  const navigation = useNavigation();

  const fetchCards = async () => {
    if (searchText.trim() === '') return;
  
    setLoading(true);
  
    // Filtros de color
    const colorsQuery = filter.colors.length ? `+color:${filter.colors.join(',')}` : '';
  
    // Filtros de estadísticas
    const cmcQuery = filter.cmc ? `+cmc${filter.cmc}` : ''; // Valor de mana
    const powerQuery = filter.power ? `+pow${filter.power}` : ''; // Fuerza
    const toughnessQuery = filter.toughness ? `+tou${filter.toughness}` : ''; // Resistencia
    const loyaltyQuery = filter.loyalty ? `+loy${filter.loyalty}` : ''; // Lealtad
    const defenseQuery = filter.defense ? `+def${filter.defense}` : ''; // Defensa (solo si aplica)
  
    // Otros filtros
    const legalityQuery = filter.legality ? `+legal:${filter.legality}` : ''; // Legalidad
    const typeQuery = selectedType ? `+type:${selectedType}` : ''; // Tipo de carta
  
    // Filtro por texto de la descripción (oracle_text)
    const oracleTextQuery = inputValue.trim() ? `+oracle_text:${encodeURIComponent(inputValue.trim())}` : ''; // El valor del campo de texto
    
    // Construir la URL de búsqueda con los filtros
    const fetchUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(searchText)}${colorsQuery}${cmcQuery}${powerQuery}${toughnessQuery}${loyaltyQuery}${defenseQuery}${legalityQuery}${typeQuery}${oracleTextQuery}&order=${filter.order}&dir=${filter.dir}`;
    
    console.log('URL de búsqueda:', fetchUrl);
  
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
  
      if (data && data.data) {
        // Filtrar cartas válidas y establecer los resultados
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
    const handler = setTimeout(() => {
      fetchCards();
    }, 1000); // 1 segundo
  
    // Limpia el timeout si el usuario sigue escribiendo
    return () => clearTimeout(handler);
  }, [searchText, filter]);

  const handleCardPress = (imageUrl: string, cardId: string, cardUri: string) => {
    navigation.navigate('ImageViewScreen', { imageUrl, cardId, cardUri }); // Pasar URL, ID y URI
  };

  // Renderizado de los resultados de búsqueda
  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsText}>Resultados de búsqueda para "{searchText}":</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : cardResults.length > 0 ? (
        <ScrollView>
          <View style={styles.cardsGrid}>
            {cardResults.map((card) => {
              // Verifica si es una carta de doble cara según el atributo layout
              const isDoubleFaced = ['transform', 'modal_dfc', 'double_faced_token'].includes(card.layout);
              const imageUri = isDoubleFaced
                ? card.card_faces?.[0]?.image_uris?.small || '../images/G.svg' // Imagen de la primera cara
                : card.image_uris?.small;
  
              return (
                <View key={card.id} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleCardPress(
                        imageUri,
                        card.id,
                        card.uri
                      )
                    }
                  >
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.cardImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardName}>{card.name}</Text>
                  {card.power && <Text style={styles.cardStats}>Power: {card.power}</Text>}
                  {card.toughness && <Text style={styles.cardStats}>Toughness: {card.toughness}</Text>}
                </View>
              );
            })}
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
          case 'Texto':
            return <TextoSection key={filter.id} inputValue={inputValue} setInputValue={setInputValue}/>;
          case 'Coste de mana':
            return <CosteDeManaSection key={filter.id} />;
          case 'Colores':
            return <ColoresSection key={filter.id} />;
          default:
            return null;
        }
      })}
    </View>
  );
  const [searchInitiated, setSearchInitiated] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.orangeSection}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={() => setSearchInitiated((prevState) => !prevState)}>
            <Ionicons
              name={searchInitiated ? "arrow-back" : "search"} // Cambia entre "arrow-back" y "search"
              size={20}
              color="#fff"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            placeholderTextColor="#d1d1d1"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <Icon name="times" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.graySection}>
      {searchInitiated ? renderSearchResults() : renderFilters()}
      </ScrollView>
    </View>
  );
}



