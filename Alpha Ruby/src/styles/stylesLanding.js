import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D', // Fondo gris oscuro moderno
  },
  header: {
    backgroundColor: '#F77F00', // Naranja vibrante para el encabezado
    paddingVertical: 10,
    height: 120, 
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20, // Bordes redondeados para un diseño más moderno
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 48,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2A2827', // Fondo gris oscuro para las cartas
    marginHorizontal: 5,
    padding: 20,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // Bordes más redondeados para un estilo moderno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevación para Android
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
    backgroundColor: '#2A2827', 
    marginBottom: 10,
    padding: 15, // Más padding para un diseño más limpio
    borderRadius: 12, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  newsText: {
    color: '#fff',
    textAlign: 'center',
  },
});
