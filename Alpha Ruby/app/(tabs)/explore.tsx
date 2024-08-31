import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
  const [searchText, setSearchText] = useState('');
  const [showMore, setShowMore] = useState(false);

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

  const legalidadesList = [
    'Standard', 'Pioneer', 'Modern', 'Legacy', 'Vintage',
    'Commander', 'Oathbreaker', 'Brawl', 'Explorer', 'Timeless',
    'Historic', 'Pauper', 'Old School', 'Canadian High.', 'Premodern',
    'Conquest', 'Tiny Leaders', 'Standard Brawl', 'Gladiator', 'Pauper Cmdr.',
    'Penny', 'Duel Cmdr.', 'PreDH'
  ];

  // Lógica para mostrar contenido basado en el texto de búsqueda
  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersText}>Filtros</Text>
      {filters.map((filter) => (
        <View key={filter.id} style={styles.sectionContainer}>
          <Text style={styles.sectionText}>{filter.title}</Text>
          {filter.title === 'Legalidades' && (
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
          )}
          {filter.title !== 'Legalidades' && (
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsText}>Resultados de búsqueda:</Text>
      {/* Aquí puedes agregar el contenido dinámico basado en la búsqueda */}
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
            placeholderTextColor="#d1d1d1" // Cambiar color del texto placeholder
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
    flex: 0.22, // Reducido el tamaño de la sección naranja
    backgroundColor: '#cf4b24',
    justifyContent: 'center', // Centra verticalmente la barra de búsqueda
    paddingHorizontal: 20, // Espaciado horizontal
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
    marginRight: 10, // Espacio entre el icono y el campo de texto
  },
  searchBar: {
    flex: 1,
    color: '#fff',
  },
  filtersContainer: {
    marginTop: 15, // Espacio entre la barra de búsqueda y el contenedor de Filtros
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filtersText: {
    color: '#cf4b24', // Cambia el color del texto de "Filtros" a naranja
    fontSize: 18, // Tamaño de fuente para "Filtros"
    marginBottom: 10, // Espacio entre el título y las secciones
  },
  sectionContainer: {
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10, // Espacio entre secciones
  },
  sectionText: {
    color: '#fff', // Color del texto de las secciones
    fontSize: 16, // Tamaño de fuente para las secciones
  },
  sectionParagraph: {
    color: '#d1d1d1', // Color del texto de los párrafos
    fontSize: 14, // Tamaño de fuente para los párrafos
    marginTop: 5, // Espacio entre el título y el párrafo
  },
  graySection: {
    flex: 2.6, // Ajusta el tamaño de la sección gris para el contenido desplazable
    backgroundColor: '#4c4543',
    padding: 20, // Espaciado interior en la sección gris
  },
  resultsContainer: {
    backgroundColor: '#4c4543',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resultsText: {
    color: '#cf4b24', // Cambia el color del texto de los resultados a naranja
    fontSize: 18, // Tamaño de fuente para "Resultados de búsqueda"
    marginBottom: 10, // Espacio entre el título y el contenido
  },
  resultsDetail: {
    color: '#d1d1d1', // Color del texto de los resultados
    fontSize: 14, // Tamaño de fuente para el detalle de los resultados
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los botones se envuelvan si no hay suficiente espacio
    justifyContent: 'center', // Centra los botones en la pantalla
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2a2827', // Gris oscuro para los botones
    borderRadius: 8,
    paddingVertical: 10, // Ajuste del padding vertical para los botones
    paddingHorizontal: 15, // Ajuste del padding horizontal para los botones
    margin: 5, // Espacio uniforme entre los botones
    flexBasis: (screenWidth / 4) - 20, // Ancho de los botones para 4 columnas
  },
  buttonText: {
    color: '#fff',
    fontSize: 8.4, // Tamaño de fuente más pequeño para los botones
    textAlign: 'center', // Centra el texto dentro del botón
  },
  toggleButton: {
    marginTop: 10, // Espacio adicional arriba del botón "Más/Menos"
    backgroundColor: '#cf4b24', // Color diferente para el botón de mostrar más/menos
  },
});
