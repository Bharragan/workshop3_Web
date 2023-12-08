import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RepositoriesScreen from './screens/RepositoriesScreen';
import RepositoryDetailScreen from './screens/RepositoryDetailScreen';
import HomeScreen from './screens/HomeScreen'; 
import EditProfileScreen from './screens/EditProfileScreen'; 
import RegisterScreen from './screens/RegisterScreen';

import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, // Oculta la barra de navegación en todas las pantallas
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Repositories" component={RepositoriesScreen} />
        <Stack.Screen name="RepositoryDetail" component={RepositoryDetailScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="EditProfile" component={EditProfileScreen} /> 
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

