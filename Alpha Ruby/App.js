import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Linking from 'expo-linking';

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
import profileScreen from './src/screens/profileScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import CustomHeader from './src/extras/CustomHeader';

import { UserProvider } from './src/screens/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración de deep linking
const linking = {
  prefixes: ['magicarduct://'], // Esquema de la app
  config: {
    screens: {
      ResetPassword: 'reset-password', // Ruta para capturar ?token=XYZ
    },
  },
};

const MainTabNavigator = () => {
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

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D3C298',
        tabBarInactiveTintColor: '#E0DCC3',
        tabBarStyle: {
          backgroundColor: '#0A0B1E',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => <CustomHeader /> }} />
      <Tab.Screen name="Buscar" component={SearchCard} options={{ header: () => <CustomHeader /> }} />
      <Tab.Screen name="Mazos" component={DeckManagementScreen} options={{ header: () => <CustomHeader /> }} />
      <Tab.Screen name="Configuración" component={ConfigurationScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="DeckEditor" component={DeckEditorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ImageViewScreen" component={ImageViewScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={profileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
