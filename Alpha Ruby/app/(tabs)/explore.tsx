import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
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
          />
        </View>
      </View>

      {/* Área inferior con fondo gris claro */}
      <ScrollView style={styles.graySection}>
        {/* Contenedor de Filtros */}
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersText}>Filtros</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Legalidades</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Linea de tipo</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Estadisticas</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Texto</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Coste de mana</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Colores</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Ediciones</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Rareza</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Precio</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Disposicion</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Miscelaneos</Text>
            <Text style={styles.sectionParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae ipsum ac lorem vestibulum aliquet.
            </Text>
          </View>
        </View>
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
});
