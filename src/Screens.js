import * as React from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen.js';
import PlayList from './PlayList.js';
import AudioPlayer from './AudioPlayer.js';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
            headerShadowVisible: false,       
            headerTitleAlign: 'center',
            headerBackTitleVisible: false
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
            headerTitle: 'NOW PLAYING',
            headerTintColor: '#FF0047',
            headerLeft: () => {
              <Button 
                title='GO BACK'
              />
            }
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;