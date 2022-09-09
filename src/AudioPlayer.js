import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HEIGHT = Dimensions.get('screen').height;

const AudioPlayer = ({navigation, props}) => {
    const [play, setPlay] = React.useState(true);

    return (
        <View style={{alignItems: 'center', backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={{alignItems : 'center'}}>
                    <Image 
                        source={{uri: 'https://cdn.dribbble.com/users/3547568/screenshots/14395014/media/0b94c75b97182946d495f34c16eab987.jpg?compress=1&resize=400x300&vertical=top' }}
                        style={{height: 350, width: 350, borderRadius: 35}}  
                    />
                </View>
                <View style={{paddingLeft: 25}}>
                    <Text style={{color: 'black', fontSize: 32, fontWeight: '700'}}>Title</Text>
                    <Text style={{color: 'purple', fontSize: 24, fontWeight: '700'}}>Artist</Text>
                </View>
            </View>
            <View style={styles.controller}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <AntDesign name='banckward' size={42} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => setPlay(!play) }
                    >
                        <AntDesign name={play ? "play" : "pausecircle"} size={64} color="#FF0047"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name='forward' size={42} color="black"/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingHorizontal: '14%',
                    paddingVertical: 25
                }}>
                    <TouchableOpacity>
                        <AntDesign name='bars' size={32} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name='download' size={32} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT * 0.6,
        width: '95%',
        justifyContent: 'space-around',
    },
    controller: {
        height: HEIGHT * 0.4,
        width: '95%',
    }
})

export default AudioPlayer;