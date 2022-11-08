import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.js';
import PlayList from './PlayList.js';
import AudioPlayer from './AudioPlayer.js';
import AutoSuggestion from './AutoSuggestion.js';
import Library from './Library.js';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  
  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
            headerShadowVisible: false,       
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
        }}
    >
      <Stack.Screen 
        name="Home" 
        component = {HomeScreen}
        options={{
            headerTitle: 'J U K E B O X',
            headerTintColor: '#FF0047',
        }}
      />
      <Stack.Screen 
        name="PlayList" 
        component={PlayList}
        options={{
            headerTitle: '',
            headerTintColor: '#FF0047',
        }}
      />
      <Stack.Screen 
        name="AudioPlayer" 
        component = {AudioPlayer}
        options={{
            headerShown: false,
        }}
      />
      <Stack.Screen 
        name='SearchScreen'
        component={AutoSuggestion}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='Library'
        component={Library}
      />
    </Stack.Navigator>
  );
}

export default MyStack;