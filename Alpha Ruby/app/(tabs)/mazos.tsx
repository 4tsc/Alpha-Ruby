// app/(tabs)/mazos.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MazosScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista de Mazos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4543', // Gris claro de fondo
  },
  text: {
    color: '#fff', // Color del texto
    fontSize: 20,
  },
});

export default MazosScreen;
