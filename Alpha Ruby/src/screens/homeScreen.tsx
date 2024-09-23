import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from 'react-native';

import { useUser } from './UserContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { userId } = useUser(); // Usa el userId directamente desde el contexto
  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>¡Bienvenido, {userName || 'Cargando...'}!</Text>
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
    height: height * 0.15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
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
  cardsSection: {
    marginBottom: 20,
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
