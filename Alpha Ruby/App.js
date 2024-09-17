import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Importa tus pantallas
import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';
import RegisterScreen from './src/screens/registerScreen';
import DeckManagementScreen from './src/screens/DeckManagementScreen';
import DeckEditorScreen from './src/screens/deckEditorScreen'; // Importar DeckEditorScreen

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
          } else if (route.name === 'Mazos') {
            iconName = 'list';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D94A26',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#3D3D3D',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Mazos" component={DeckManagementScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        
        <Stack.Screen name="DeckEditor" component={DeckEditorScreen} options={{ title: 'Mazos' }} />
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
