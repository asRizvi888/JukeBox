import * as React from 'react';
import {View, FlatList, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import ListItem from '../components/ListItem';
import { LoadingContext } from '../lib/ContextJB';
import FetchInfo from '../lib/FetchInfo';
import { useNetInfo } from '@react-native-community/netinfo';

const PlayList = ({route}) => {

    const {props} = route.params;

    let arr = FetchInfo(props);
    console.log(arr);
    const {loading} = React.useContext(LoadingContext);
    const netInfo = useNetInfo();
    
    return (
        <View style={styles.container}>
            <View style={{
                alignItems: 'center', 
                justifyContent: 'center',
                padding: 35
            }}>
                <Text style={{
                    fontSize: 42,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>{props.toUpperCase()}</Text>
            </View>
            {loading?
                <View style = {{flex:1, marginBottom: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={'#FF0047'} size="large"/>
                </View> :
                <FlatList
                    data={arr}
                    renderItem={({item})=>
                        <ListItem
                            title={item.title}
                            duration={item.duration}
                            chanelTitle={item.chanelTitle}
                            imageUri={item.imageURL}
                        />
                    }
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
                />
            }
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