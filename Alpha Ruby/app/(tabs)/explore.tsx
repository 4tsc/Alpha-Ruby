import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

const calculateFontSize = (baseSize: number) => {
  const scaleFactor = screenWidth / 375;
  return baseSize * scaleFactor;
};

// Definir tipos para las props del componente LegalidadesSection
interface LegalidadesSectionProps {
  showMore: boolean;
  setShowMore: (show: boolean) => void;
}

// Componentes para cada sección de filtro
const LegalidadesSection: React.FC<LegalidadesSectionProps> = ({ showMore, setShowMore }) => (  <View style={styles.sectionContainer}>
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
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Línea de tipo, mamahuevo.</Text>
  </View>
);

const EstadisticasSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Estadisticas</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Estadísticas.</Text>
  </View>
);

const TextoSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Texto</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Texto.</Text>
  </View>
);

const CosteDeManaSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Coste de mana</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Coste de mana.</Text>
  </View>
);

const ColoresSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Colores</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Colores.</Text>
  </View>
);

const EdicionesSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Ediciones</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Ediciones.</Text>
  </View>
);

const RarezaSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Rareza</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Rareza.</Text>
  </View>
);

const PrecioSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Precio</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Precio.</Text>
  </View>
);

const DisposicionSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Disposicion</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Disposición.</Text>
  </View>
);

const MiscelaneosSection = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionText}>Miscelaneos</Text>
    <Text style={styles.sectionParagraph}>Aquí va el contenido específico para Misceláneos.</Text>
  </View>
);

  // Datos de filtros
  const filters = [
    { id: '1', title: 'Legalidades' },
    { id: '2', title: 'Linea de tipo' },
    { id: '3', title: 'Estadisticas' },
    { id: '4', title: 'Texto' },
    { id: '5', title: 'Coste de mana' },
    { id: '6', title: 'Colores' },
    { id: '7', title: 'Ediciones' },
    { id: '8', title: 'Rareza' },
    { id: '9', title: 'Precio' },
    { id: '10', title: 'Disposicion' },
    { id: '11', title: 'Miscelaneos' },
  ];

// Lista de legalidades
const legalidadesList = [
  'Standard', 'Pioneer', 'Modern', 'Legacy', 'Vintage',
  'Commander', 'Oathbreaker', 'Brawl', 'Explorer', 'Timeless',
  'Historic', 'Pauper', 'Old School', 'Canadian High.', 'Premodern',
  'Conquest', 'Tiny Leaders', 'Standard Brawl', 'Gladiator', 'Pauper Cmdr.',
  'Penny', 'Duel Cmdr.', 'PreDH'
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
          case 'Rareza':
            return <RarezaSection key={filter.id} />;
          case 'Precio':
            return <PrecioSection key={filter.id} />;
          case 'Disposicion':
            return <DisposicionSection key={filter.id} />;
          case 'Miscelaneos':
            return <MiscelaneosSection key={filter.id} />;
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
  container: {
    flex: 1,
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
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: '#fff',
  },
  filtersContainer: {
    marginTop: 15,
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filtersText: {
    color: '#cf4b24',
    fontSize: 18,
    marginBottom: 10,
  },
  sectionContainer: {
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionParagraph: {
    color: '#d1d1d1',
    fontSize: 14,
    marginTop: 5,
  },
  graySection: {
    flex: 2.6,
    backgroundColor: '#4c4543',
    padding: 20,
  },
  resultsContainer: {
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resultsText: {
    color: '#cf4b24',
    fontSize: 18,
    marginBottom: 10,
  },
  resultsDetail: {
    color: '#d1d1d1',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2a2827',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    flexBasis: (screenWidth / 4) - 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: calculateFontSize(7.4),
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 10,
    backgroundColor: '#cf4b24',
  },
});
