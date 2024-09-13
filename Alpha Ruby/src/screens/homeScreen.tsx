import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    backgroundColor: '#4c4543',
  },
  header: {
    backgroundColor: '#cf4b24',
    paddingVertical: 10,
    height: height * 0.15, // Ajusta la altura del encabezado de manera responsiva
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: width * 0.1, // Ajusta el tamaño del texto de manera responsiva
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cardsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: width * 0.06, // Ajusta el tamaño del texto de manera responsiva
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2827',
    marginHorizontal: 5,
    padding: 20,
    height: height * 0.2, // Ajusta la altura de las cartas de manera responsiva
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    textAlign: 'center',
  },
  newsSection: {
    marginTop: 20,
  },
  newsContainer: {
    marginTop: 10,
  },
  newsItem: {
    backgroundColor: '#2a2827',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  newsText: {
    color: '#fff',
    textAlign: 'center',
  },
});