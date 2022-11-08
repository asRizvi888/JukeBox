import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { CurrentIndexContext } from '../lib/ContextJB';

const IMAGE = 'https://i.ytimg.com/vi/LGCvRk7judU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAG4-O-kVuAkM3MhYFHhDJnI6kaCg';

const MiniCard = ({ title, imageURI, duration, props}) => {
    const navigation = useNavigation();
    const {setCurrentIndex} = React.useContext(CurrentIndexContext);
    
    return (
        <TouchableOpacity 
            onPress={()=>{
                navigation.navigate("AudioPlayer", {props});
            
                setCurrentIndex(props.index);
            }}
        >
            <ImageBackground 
                source={{uri: imageURI}} 
                resizeMode='cover' 
                style={[styles.item,{ marginVertical: 8, marginHorizontal: 5}]} 
                imageStyle={{borderRadius: 20}}
            >
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent','rgba(0,0,0,0.9)']}
                    style={[styles.item,{padding: 15, borderRadius: 25}]}
                >
                    <View style={styles.time}>
                        <Text style={{fontSize: 16, color: 'white',fontWeight: '700'}}>{duration}</Text>
                    </View>
                    <Text 
                        numberOfLines={2} 
                        ellipsizeMode='tail' 
                        style={styles.title}
                    >
                        {title}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        height: 175,
        width: 270,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
        height: 60
    },
    time: {
        backgroundColor: '#FF0027',
        marginBottom: 60,
        height: 25,
        width: 50,
        borderRadius: 10,
        marginLeft: '78%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default MiniCard;