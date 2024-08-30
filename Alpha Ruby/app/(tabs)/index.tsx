import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Aquí puedes colocar cualquier contenido que desees en el encabezado */}
      </View>
      <View style={styles.content}>
        {/* Aquí puedes colocar el contenido principal que desees */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c4543', // Gris para el fondo general
  },
  header: {
    backgroundColor: '#cf4b24', // Naranja para el encabezado
    padding: 10,
    height: 100, // Ajusta la altura del encabezado aquí
  },
  content: {
    flex: 1,
    backgroundColor: '#4c4543', // Gris para el contenido principal
    padding: 20,
  },
});
