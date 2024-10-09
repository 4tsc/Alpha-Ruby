import { StyleSheet, View, Text, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

  // No se toca el useEffect como pediste
  useEffect(() => {
    console.log('ID de usuario recibido desde el contexto:', userId);

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://186.64.122.218:3000/obtener-usuario?userId=${userId}`, {
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

    if (userId) {
      fetchUserData(); // Solo hacemos la solicitud si el userId está disponible
    }
  }, [userId]);

  return (
    <ImageBackground 
      source={require('../images/back.jpg')} // Aquí iría tu imagen de fondo
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>¡Bienvenido, {userName}!</Text>
        </View>
        <View style={styles.content}>
          {/* Sección de cartas */}
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

          {/* Sección de noticias */}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: 'rgba(15, 15, 35, 0.9)', // Azul oscuro casi negro
    paddingVertical: 10,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#8A7F5A', // Dorado más suave para bordes, menos brillante
    borderWidth: 2,
  },
  headerText: {
    color: '#D3C298', // Dorado suave para el texto
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textShadowColor: '#000', // Sombra más sutil para profundidad
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  cardsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#D3C298', // Dorado suave para los títulos de las secciones
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 30, 0.9)', // Azul oscuro casi negro para las cartas
    marginHorizontal: 5,
    padding: 20,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#8A7F5A', // Borde dorado suave
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  cardText: {
    color: '#E0DCC3', // Texto dorado claro suave
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newsSection: {
    marginTop: 20,
  },
  newsContainer: {
    marginTop: 10,
  },
  newsItem: {
    backgroundColor: 'rgba(10, 10, 30, 0.9)', // Fondo azul oscuro casi negro para las noticias
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderColor: '#8A7F5A',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  newsText: {
    color: '#E0DCC3', // Texto dorado claro suave para las noticias
    textAlign: 'center',
    fontWeight: 'bold',
  },
});



