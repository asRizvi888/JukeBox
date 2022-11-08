import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CurrentIndexContext } from '../lib/ContextJB';

const WIDTH = Dimensions.get('screen').width;

const ListItem = ({title, chanelTitle, imageUri, duration, props}) => {

    const {setCurrentIndex} = React.useContext(CurrentIndexContext);

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={{padding: 5}}
            onPress={()=>{
                navigation.navigate("AudioPlayer", {props});
                setCurrentIndex(props.index);
            }}    
        >
            <View style={[styles.container, styles.shadow]}>
                <Image source={{uri:imageUri}} style={styles.image} resizeMode="cover"/>
                <View>
                    <View style={{width: WIDTH * 0.65}}>
                        <Text style={{
                            fontSize: 22, fontWeight: "600", marginBottom: 10, color: 'grey'
                        }} numberOfLines={1} ellipsizeMode="tail">
                            {title}
                        </Text>
                    </View>
                    <View style={{height: 20, width: WIDTH * 1.2, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{width: '48%'}}>
                            <Text style={{
                                flex:1, color: 'darkgrey', 
                                fontSize: 16, fontWeight: '600',
                            }} numberOfLines={1} ellipsizeMode="tail">
                                {chanelTitle}
                            </Text>
                        </View>
                        <Text style={{flex:1, color: "#FF0027", fontSize: 16, fontWeight: '600'}}>{duration}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 85,
        width: WIDTH * 0.95,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2
    },
    image: {
        height: 70,
        width: 70,
        marginLeft: 5,
        marginRight: 10,
        borderRadius: 10
    }
})

export default ListItem;