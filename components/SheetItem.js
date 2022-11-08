
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import TrackPlayer from 'react-native-track-player';

const WIDTH = Dimensions.get('screen').width;

const SheetItem = ({title, chanelTitle, imageUri, duration, props}) => {

    const [currentIndex, setCurrentIndex] = React.useState(null);

    TrackPlayer.getCurrentTrack().then(idx => {
        setCurrentIndex(idx);
    })

    return (
        <TouchableOpacity 
            style={{padding: 5}}
            onPress={async () => {
                await TrackPlayer.skip(props.index);
                //console.log(props.index);

                setTimeout(()=>{
                    props.ref.current?.close();
                },1000)
            }}    
        >
            <View style={[styles.container, {backgroundColor: props.index === currentIndex ? "#FF0047" : "#FFF"}]}>
                <Image source={{uri:imageUri}} style={styles.image} resizeMode="cover"/>
                <View>
                    <View style={{width: WIDTH * 0.7}}>
                        <Text style={{
                            color: props.index === currentIndex ? "#FFF" : "black",
                            fontSize: 22, fontWeight: "600", marginBottom: 10
                        }} numberOfLines={1} ellipsizeMode="tail">
                            {title}
                        </Text>
                    </View>
                    <View style={{height: 20, width: WIDTH * 1.2, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{width: '50%'}}>
                            <Text style={{
                                color: props.index === currentIndex ? "#FFF" : "grey",
                                flex:1, fontSize: 16, fontWeight: '600',
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
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        left: '5%'
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

export default SheetItem;