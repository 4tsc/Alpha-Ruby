import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

  useEffect(() => {
    console.log('ID de usuario recibido desde el contexto:', userId);

    const fetchUserData = async () => {
      try {
        const response = await fetch(` https://magicarduct.online:3000/obtener-usuario?userId=${userId}`, {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1F28', // Fondo plano oscuro
  },
  header: {
    backgroundColor: '#2C2D37', // Color gris oscuro para el encabezado
    paddingVertical: 10,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#D3C298', // Dorado suave para los bordes
    borderWidth: 2,
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
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2C2D37', // Fondo gris oscuro para las cartas
    marginHorizontal: 5,
    padding: 20,
    height: height * 0.2,
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
  cardText: {
    color: '#FFFFFF', // Texto blanco para contraste
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
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
});
