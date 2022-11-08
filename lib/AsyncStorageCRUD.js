import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        // console.log("SUCCESSFUL");
    } catch (e) {
        Alert.alert('ERROR', 'An error occured while creating new item');
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        //console.log(value)
    
        if (value !== null) {
            const val = JSON.parse(value);
            //setStorage(val);
            return val;
        } else {
            return [];
        }

    }	catch (e) {
            Alert.alert('ERROR', 'An error occured while retrieving items');
    }
}

export const del = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        Alert.alert('ERROR', 'An error occured while deleting items')
    }
}