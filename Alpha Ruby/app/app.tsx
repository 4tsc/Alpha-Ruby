import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/RegisterForm'; // Importa tu pantalla principal
import RegisterScreen from './(tabs)/register'; // Importa tu pantalla de registro

// Crea una instancia de la pila de navegación
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        {/* Define la pantalla de registro */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registro' }}
        />
        {/* Define la pantalla principal */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


