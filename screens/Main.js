import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';

const DetailScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>
                DetailScreen
            </Text>
            <Button 
                title='GO TO DETAILS'
                onPress={()=>navigation.navigate('Home')}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();

const Main = () => {
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
            <Stack.Screen name='details' component={DetailScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Main;