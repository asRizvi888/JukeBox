import * as React from 'react';
import {View, FlatList, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import ListItem from '../components/ListItem';
import { LoadingContext } from '../lib/ContextJB';
import FetchInfo from '../lib/FetchInfo';
import { useNetInfo } from '@react-native-community/netinfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Widget from '../components/Widget';
import { CurrentQueueContext } from '../lib/ContextJB';

const PlayList = ({route, navigation}) => {

    const {props} = route.params;

    const {currentQueue} = React.useContext(CurrentQueueContext);
    
    let arr = FetchInfo(props);
    console.log(arr);
    const {loading} = React.useContext(LoadingContext);
    const netInfo = useNetInfo();

    // TrackPlayer.reset();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('Home');
                    }}
                > 
                    <AntDesign name='arrowleft' color="#FF0047" size={24} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            {loading?
                <View style = {{flex:1, marginBottom: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={'#FF0047'} size="large"/>
                </View> :
                <FlatList
                    data={arr}
                    renderItem={({item, index})=>
                        <ListItem
                            title={item.title}
                            duration={item.duration}
                            chanelTitle={item.artist}
                            imageUri={item.artwork}
                            props={{data: arr, index: index}}
                        />
                    }
                    ListHeaderComponent={() => {
                        return (

                            <View style={{
                                alignItems: 'center', 
                                justifyContent: 'center',
                                padding: 25
                            }}>
                                <Text 
                                numberOfLines={2}
                                ellipsizeMode='middle'
                                style={{
                                    fontSize: 36,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>{props.toUpperCase()}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={()=>{
                        return (
                            <View>
                                <Image
                                    source={require('../assets/no-result.gif')}
                                    resizeMode="cover"
                                    style={styles.img}
                                />
                            </View>
                        );
                    }}
                    ListFooterComponent = {
                        currentQueue.length !== 0 ? 
                            <View style={{height: 120}}/> : undefined
                    }
                />
            }
            {currentQueue.length !== 0 ? <Widget/> : undefined}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    img: {
        height: 400,
        width:400,
    }
})

export default PlayList;