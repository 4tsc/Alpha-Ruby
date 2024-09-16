import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/homeScreen'; // Importa tu pantalla principal
import RegisterScreen from '../src/screens/registerScreen'; // Importa tu pantalla de registro
import DeckManagementScreen from '../src/screens/DeckManagementScreen';  // Importar la nueva pantalla
import DeckEditorScreen from '../src/screens/deckEditorScreen'; // Importar DeckEditorScreen

// Crea una instancia de la pila de navegación
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        {/* Define la pantalla de registro */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ 
            title: 'Registro',
          }}
        />
        {/* Define la pantalla principal */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Inicio'
          }}
        />
        {/* Define la pantalla de gestión de mazos */}
        <Stack.Screen 
          name="DeckManagement" 
          component={DeckManagementScreen} 
          options={{ 
            title: 'Mazos'
          }}
        />
        {/* Define la pantalla de edición de mazos */}
        <Stack.Screen 
          name="DeckEditor" 
          component={DeckEditorScreen} 
          options={{ 
            title: 'Editar Mazo'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
