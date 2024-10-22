import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

// Sample data for recently viewed cards (replace with actual data)
const recentlyViewedCards = [
  { id: '1', imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=675460&type=card' },
  { id: '2', imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=532531&type=card' },
  { id: '3', imageUrl: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435413&type=card' },
];

// Sample news data (replace with actual data)
const newsData = [
  {
    id: '1',
    title: 'Phantom Golden Pack Sealed - Midweek Magic Event Guide',
    author: 'j2sjosh',
    time: 'Hace 5 horas',
    imageUrl: 'https://link-to-news-image-1',
  },
  {
    id: '2',
    title: 'Introducing the Commander Format Panel',
    author: 'Gavin Verhey',
    time: 'Hace 5 horas',
    imageUrl: 'https://link-to-news-image-2',
  },
  {
    id: '3',
    title: 'MTG Arena Banned and Restricted Announcement - October 22, 2024',
    author: 'Wizards of the Coast',
    time: 'Hace 6 horas',
    imageUrl: 'https://link-to-news-image-3',
  },
];

const HomeScreen = () => {
  const renderCardItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
      <View style={styles.newsTextContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsAuthor}>{item.author} - {item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Inicio</Text>

      {/* Recently Viewed Cards */}
      <Text style={styles.sectionTitle}>Vistas recientemente</Text>
      <FlatList
        data={recentlyViewedCards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Intercambio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reglamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Carta aleatoria</Text>
        </TouchableOpacity>
      </View>

      {/* News Section */}
      <Text style={styles.sectionTitle}>Noticias</Text>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  cardContainer: {
    marginRight: 10, // Espacio entre cartas
  },
  cardImage: {
    width: width * 0.35, // Tamaño más pequeño de las cartas
    height: width * 0.5,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#5C4033',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  newsAuthor: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 5,
  },
});

export default HomeScreen;
