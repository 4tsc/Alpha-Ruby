import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido!</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Últimas cartas buscadas</Text>
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Text style={styles.cardText}>Card 1</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Card 2</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>Card 3</Text>
            </View>
          </View>
        </View>
        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Noticias</Text>
          <View style={styles.newsContainer}>
            <View style={styles.newsItem}>
              <Text style={styles.newsText}>News 1</Text>
            </View>
            <View style={styles.newsItem}>
              <Text style={styles.newsText}>News 2</Text>
            </View>
            <View style={styles.newsItem}>
              <Text style={styles.newsText}>News 3</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c4543', // Gris para el fondo general
  },
  header: {
    backgroundColor: '#cf4b24', // Naranja para el encabezado
    paddingVertical: 10,
    height: 120, // Ajusta la altura del encabezado aquí
    justifyContent: 'flex-end', // Alinea el texto cerca del borde inferior
    alignItems: 'flex-start', // Alinea horizontalmente el texto a la izquierda
    paddingHorizontal: 20, // Añade espacio a los lados
  },
  headerText: {
    color: '#fff', // Texto blanco para contraste
    fontSize: 48, // Tamaño del texto aumentado
    fontWeight: 'bold', // Negrita para destacar el texto
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cardsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff', // Texto blanco para contraste
    fontSize: 24, // Tamaño del texto del título
    fontWeight: 'bold',
    marginBottom: 10, // Espacio debajo del título
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2827', // Gris para las cartas (igual que el fondo de la barra de navegación inferior)
    marginHorizontal: 5,
    padding: 20, // Ajustado para mayor espacio
    height: 150, // Altura fija para las cartas, ajusta según necesites
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff', // Texto blanco para contraste
    textAlign: 'center',
  },
  newsSection: {
    marginTop: 20,
  },
  newsContainer: {
    marginTop: 10,
  },
  newsItem: {
    backgroundColor: '#2a2827', // Gris para las noticias (igual que el fondo de la barra de navegación inferior)
    marginBottom: 10,
    padding: 10,
    borderRadius: 8, // Puedes mantener o ajustar este valor según prefieras
  },
  newsText: {
    color: '#fff', // Texto blanco para contraste
    textAlign: 'center',
  },
});

