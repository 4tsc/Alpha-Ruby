import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
// Importa tus pantallas
import LoginScreen from './src/screens/loginScreen';  // Importa tu pantalla de login
import HomeScreen from './src/screens/homeScreen';    // Importa tu pantalla de Home
import RegisterScreen from './src/screens/registerScreen';  // Importa tu pantalla de registro
import DeckManagementScreen from './src/screens/DeckManagementScreen';  // Importa tu pantalla de gestión de mazos
import DeckEditorScreen from './src/screens/deckEditorScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'DeckManagement') {
            iconName = 'list';
          } else if (route.name === 'DeckEditorScreen') {
            iconName = 'edit';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D94A26',  // Color del icono activo
        tabBarInactiveTintColor: '#FFFFFF',  // Color del icono inactivo
        tabBarStyle: {
          backgroundColor: '#3D3D3D',  // Color de fondo de la barra de navegación
        },
      })}
    >
      {/* Aqui agregamos las pantallas, antes eso si se deben importar */}
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="DeckManagement" component={DeckManagementScreen} options={{ headerShown: false }}/>
      <Tab.Screen name='DeckEditorScreen' component={DeckEditorScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>
  </View>
);

export default App;