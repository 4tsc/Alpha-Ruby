import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Importar useNavigation
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import your screens
import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';
import RegisterScreen from './src/screens/registerScreen';
import DeckManagementScreen from './src/screens/DeckManagementScreen';
import DeckEditorScreen from './src/screens/deckEditorScreen';
import SearchCard from './src/screens/Buscar';
import ImageViewScreen from './src/screens/ImageViewScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import ConfigurationScreen from './src/screens/ConfigurationScreen';

import { UserProvider, useUser } from './src/screens/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoutButton = () => {
  const { setUserId } = useUser();
  const navigation = useNavigation(); // Definir useNavigation

  const handleLogout = async () => {
    try {
      const response = await fetch('https://magicarduct.online:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUserId(null);
        navigation.replace('Login');
      } else {
        Alert.alert('Error de logout', 'No se pudo cerrar la sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el servidor.');
      console.error('Error en el fetch:', error);
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

// Tab Navigator with improved visual elements
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Mazos') {
            iconName = 'list';
          } else if (route.name === 'Configuración') {
            iconName = 'cog';
          } else if (route.name === 'Buscar') {
            iconName = 'search';
          }
          else if (route.name === 'Cerrar Sesión') {
            iconName = 'sign-out';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D3C298', // Bright orange for active tab
        tabBarInactiveTintColor: '#E0DCC3', // White for inactive tabs
        tabBarStyle: {
          backgroundColor: '#0A0B1E', // Dark background for the tab bar
          borderTopWidth: 0, // Remove top border for a sleek look
          height: 60, // Increase height for better spacing
          paddingBottom: 10, // Add padding for better touch interaction
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size for clarity
          paddingBottom: 5, // Add padding to the text
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Buscar" component={SearchCard} options={{ headerShown: false }} />
      <Tab.Screen name="Mazos" component={DeckManagementScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Configuración" component={ConfigurationScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="DeckEditor" component={DeckEditorScreen} options={{ title: 'Mazos', headerStyle: { backgroundColor: '#3D3D3D' }, headerTintColor: '#fff' , headerShown: false}} />
          <Stack.Screen name="ImageViewScreen" component={ImageViewScreen} options={{ title: 'Ver Imagen', headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;