import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Genre = (props) => {

  const _playList = useNavigation();
  
  return(
    
    <TouchableOpacity 
        onPress={()=>{_playList.navigate('PlayList', {props: props.title})}}
    >
        <LinearGradient 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors= {props.col}
            style={[styles.container, styles.shadow]}
        >
            <Text style={{color: "#fff", fontSize: 22,fontWeight: "bold", textAlign: "center"}}>
                {props.title}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
    
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 130,
        width: Dimensions.get("screen").width * 0.475,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5
    },
});

export default Genre;