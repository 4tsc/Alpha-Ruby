import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const responsiveStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c4543',
  },
  header: {
    backgroundColor: '#cf4b24',
    paddingVertical: 10,
    height: height * 0.15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: width * 0.1,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: width * 0.06,
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
    height: height * 0.2,
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

export default responsiveStyles;