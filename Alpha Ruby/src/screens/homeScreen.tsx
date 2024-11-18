import { StyleSheet, View, Text, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity, Linking, StatusBar } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useUser } from './UserContext';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario
  const [lastSearchedCards, setLastSearchedCards] = useState([]); // Estado para almacenar las últimas cartas buscadas
  const [news, setNews] = useState([]); // Estado para almacenar las noticias

  useFocusEffect(
    useCallback(() => {
      console.log('ID de usuario recibido desde el contexto:', userId);

      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://magicarduct.online:3000/obtener-usuario?userId=${userId}`, {
            method: 'GET',
            credentials: 'include',
          });

          const data = await response.json();

          if (response.ok) {
            setUserName(data.userName); // Almacena el nombre del usuario en el estado
            console.log('Nombre de usuario:', data.userName);
          } else {
            console.log('Error obteniendo los datos del usuario:', data.message);
          }
        } catch (error) {
          console.log('Error en la solicitud:', error);
        }
      };

      const fetchLastSearchedCards = async () => {
        try {
          const response = await fetch(`https://magicarduct.online:3000/api/ultimascartasvistas/${userId}`, {
            method: 'GET',
            credentials: 'include',
          });

          const data = await response.json();

          if (response.ok) {
            // Ordenar las cartas por ID en orden ascendente
            const sortedData = data.sort((a, b) => a.IDnumero - b.IDnumero);

            const cardDetailsPromises = sortedData.slice(0, 5).map(async (card) => {
              const cardResponse = await fetch(`https://api.scryfall.com/cards/${card.IDcarta}`);
              return cardResponse.json();
            });

            const cardDetails = await Promise.all(cardDetailsPromises);
            setLastSearchedCards(cardDetails); // Almacena los detalles de las cartas en el estado
            // console.log('Últimas cartas buscadas:', cardDetails);
          } else {
            console.log('Error obteniendo las últimas cartas buscadas:', data.message);
          }
        } catch (error) {
          console.log('Error en la solicitud:', error);
        }
      };

      const fetchNews = async () => {
        try {
          const response = await fetch('https://magicarduct.online:3001/api/noticias2', {
            method: 'GET',
            credentials: 'include',
          });

          const articles = await response.json();
          console.log('Respuesta del servidor de noticias:', articles); // Log para verificar la respuesta

          if (response.ok) {
            setNews(articles.slice(0, 10)); // Limitar las noticias a las primeras 10
            console.log('Noticias obtenidas:', articles);
          } else {
            console.log('Error obteniendo las noticias:', articles.message);
          }
        } catch (error) {
          console.log('Error en la solicitud:', error);
        }
      };

      if (userId) {
        fetchUserData(); // Solo hacemos la solicitud si el userId está disponible
        fetchLastSearchedCards(); // Solo hacemos la solicitud si el userId está disponible
        fetchNews(); // Obtener noticias
      }
    }, [userId])
  );

  const handlePress = (url) => {
    if (url) {
      Linking.openURL(url);
    } else {
      console.log('URL no definida');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1F28" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>¡Bienvenido, {userName}!</Text>
        </View>
        <View style={styles.content}>
          {/* Sección de cartas */}
          <View style={styles.cardsSection}>
            <Text style={styles.sectionTitle}>Últimas cartas buscadas</Text>
            <ScrollView horizontal>
              <View style={styles.cardsContainer}>
                {lastSearchedCards.map((card, index) => (
                  <View key={index} style={styles.card}>
                    {card.image_uris && card.image_uris.small ? (
                      <Image source={{ uri: card.image_uris.small }} style={styles.cardImage} />
                    ) : (
                      <Text style={styles.cardText}>Imagen no disponible</Text>
                    )}
                    <Text style={styles.cardText}>{card.name}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Sección de noticias */}
          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Noticias</Text>
            <View style={styles.newsContainer}>
              {news.length > 0 ? (
                news.map((article, index) => (
                  <View key={index} style={styles.newsItem}>
                    <TouchableOpacity onPress={() => handlePress(article.link)}>
                      <Text style={styles.newsText}>{article.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.newsText}>{article.source}</Text>
                    <TouchableOpacity onPress={() => handlePress(article.link)}>
                      <Image source={{ uri: article.imgUrl }} style={styles.newsImage} />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.newsText}>No hay noticias disponibles</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28', // Fondo plano oscuro
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    backgroundColor: '#2C2D37', // Color gris oscuro para el encabezado
    padding: 10,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D3C298', // Dorado suave para los bordes
    borderWidth: 2,
    borderRadius: 20,
  },
  headerText: {
    color: '#F1E6C8', // Dorado suave para el texto del encabezado
    fontSize: width * 0.09, // Ajusta el tamaño del texto de manera responsiva
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  cardsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#F1E6C8', // Texto dorado suave para los títulos de las secciones
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#2C2D37', // Fondo gris oscuro para las cartas
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#D3C298', // Borde dorado suave para las cartas
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: 100,
    height: 140,
    marginBottom: 10,
  },
  cardText: {
    color: '#FFFFFF', // Texto blanco para contraste
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  newsSection: {
    marginTop: 20,
  },
  newsContainer: {
    marginTop: 10,
    marginHorizontal: 20, // Añadimos margen horizontal para evitar que las news estén pegadas a los bordes
  },
  newsItem: {
    backgroundColor: '#2C2D37', // Fondo gris oscuro para las noticias
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderColor: '#D3C298', // Borde dorado suave para las noticias
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  newsText: {
    color: '#FFFFFF', // Texto blanco para las noticias
    textAlign: 'center',
    fontWeight: 'bold',
  },
  newsImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});