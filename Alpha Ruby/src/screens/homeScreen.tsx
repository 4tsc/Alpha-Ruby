import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from './UserContext';
import { styles } from '../styles/StylesHomeScreen';

export default function HomeScreen({ navigation }) {
  const { userId } = useUser();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://186.64.122.218:3000/obtener-usuario?userId=${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setUserName(data.userName);
        } else {
          console.log('Error obteniendo los datos del usuario:', data.message);
        }
      } catch (error) {
        console.log('Error en la solicitud:', error);
      }
    };

    if (userId) {
      fetchUserData();
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