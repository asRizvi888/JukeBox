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

const WIDTH = Dimensions.get('screen').width;
const IMAGE = 'https://i.ytimg.com/vi/LGCvRk7judU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAG4-O-kVuAkM3MhYFHhDJnI6kaCg';

const ListItem = ({title, chanelTitle, imageUri, duration}) => {
    return (
        <TouchableOpacity style={{padding: 5}}>
            <View style={[styles.container, styles.shadow]}>
                <Image source={{uri:imageUri}} style={styles.image} resizeMode="cover"/>
                <View>
                    <View style={{width: WIDTH * 0.65}}>
                        <Text style={{
                            fontSize: 22, fontWeight: "600", marginBottom: 10
                        }} numberOfLines={1} ellipsizeMode="tail">
                            {title}
                        </Text>
                    </View>
                    <View style={{height: 20, width: WIDTH * 1.1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{
                            flex:1, color: 'grey', 
                            fontSize: 16, fontWeight: '500'
                        }} numberOfLines={1} ellipsizeMode="tail">
                            {chanelTitle}
                        </Text>
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
        elevation: 5
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