import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/homeScreen';
import RegisterScreen from '../src/screens/registerScreen';
import DeckManagementScreen from '../src/screens/DeckManagementScreen';
import DeckEditorScreen from '../src/screens/deckEditorScreen'; // Importar DeckEditorScreen
import ImageViewScreen from '../src/screens/ImageViewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registro' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen 
          name="DeckManagement" 
          component={DeckManagementScreen} 
          options={{ title: 'Mazos' }}
        />
        {/* Asegúrate de que el nombre sea "DeckEditor" */}
        <Stack.Screen 
          name="DeckEditor" 
          component={DeckEditorScreen} 
          options={{ title: 'Editar Mazo' }}
        />
        <Stack.Screen 
        name="ImageViewScreen" 
        component={ImageViewScreen} 
        options={{ title: 'Ver Imagen' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
