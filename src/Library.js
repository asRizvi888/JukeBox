import * as React from 'react';
import { SafeAreaView, View, StyleSheet , Text, Dimensions, TouchableOpacity, Alert, TextInput, FlatList, StatusBar, Pressable, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Widget from '../components/Widget';
import RNFetchBlob from 'rn-fetch-blob';
import { CurrentQueueContext } from '../lib/ContextJB';

import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { PanGestureHandler } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('screen').width;

const { fs } = RNFetchBlob;
const DIR = fs.dirs.MusicDir + '/.jukebox';

const trackDIR = DIR + '/tracks/';
const thumbDIR = DIR + '/thumbnails/';
const PATH = fs.dirs.DocumentDir + '/.jb/db';

const img = '-24zBDFTG28';
// https://reactnative.dev/img/logo-og.png
const local = `file:///${fs.dirs.MusicDir}/.jukebox/thumbnails/${img}.jpg`;

const arr = [];
for (let i = 0; i<10; ++i) {
    arr.push(i);
}

const Library = ({navigation}) => {

    const [trackList, setTrackList] = React.useState([]);
    const {currentQueue} = React.useContext(CurrentQueueContext);
    const [query, setQuery] = React.useState('');
    // fs states
    const [fileData, setFileData] = React.useState([]);
    const [offlineList, setOfflineList] = React.useState([]);

    const _read = (path) => {
        fs.exists(path).then(res => {
            if (!res) {
                fs.createFile(path);
            }
        })
        fs.readFile(path).then((response) => {
            // Alert.alert(response);
            if (response) {
                setFileData(JSON.parse(response));
            }
        }).catch((err) => {
            console.error(err);
        })    
    }
    
    const _removeItem = (path, key) => {
        // _read(path);

        if (key && fileData) {
            //delete fileData[key];
            let temp = fileData.filter(item => {
                return item.key !== key;
            })

            setFileData(temp);

            fs.unlink(`${trackDIR}${key}.mp3`);
            fs.unlink(`${thumbDIR}${key}.jpg`);
            
            fs.writeFile(path, JSON.stringify(temp), 'utf8').then(() => {
                //Alert.alert('Item removed succesfully');
                _read(path);
            }).catch(err => {
                console.error(err);
            })
            //console.log('After: ', fileData)
        }
    }
   
    React.useState(() => {
       // fs.ls(trackDIR).then(tracks => {
       //     setTrackList(tracks.map(e => e.split('.')[0]));
       // })

        _read(PATH);

        //console.log('INside:', fileData)

        // const _id = fileData.map(item => item.id);

        // console.log("ID:", _id);

        // trackList.forEach( e => {
        //     if (_id.includes(e)) {
        //         setOfflineList((prev) => {
        //             [...prev, e]
        //         })
        //     }
        // })
    },[])
  
    if (offlineList.length !== 0) {
        console.log(offlineList[0].title);
    }

    console.log(fileData)
    // console.log('Outside:', fileData);

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTintColor: 'white',
            headerTitle: () => (
                <View style={styles.searchBar}>
                    <TextInput 
                        style = {{width: query ? '90%' : undefined}}
                        placeholder='Search your library'
                        value={query}
                        onChangeText = {
                            (val)=>setQuery(val)
                        }
                    />
                    {!query ? 
                        undefined :  
                        <TouchableOpacity onPress={()=>{setQuery('')}}>
                            <AntDesign name='delete' color={'#FF0047'} size={18} />
                        </TouchableOpacity>
                    }
                </View>
            ),
            headerStyle: {
                backgroundColor: '#FF0047'
            }
        })
    },[query, navigation]);

    const AnimatedComponent = ({props}) => {

        const position = useSharedValue(0);
        const scale = useSharedValue(0);
        
        const [swipe, setSwipe] = React.useState(false);

        const panGestureEvent = useAnimatedGestureHandler({
            onStart: (event, context) => {
                context.startX = position.value;
            },
            onActive: (event, context) => {
                if (event.translationX < 0) {
                    position.value = withSpring(context.startX + event.translationX); 
                    scale.value = withSpring(1);
                }
            },
            onEnd: (event, context) => {
                if (event.translationX < 0) {
                    position.value = withSpring(-50, {damping: 7});
                    runOnJS(setSwipe)(true);
                } else {
                    position.value = withSpring(0);        
                    scale.value = withSpring(0);
                    runOnJS(setSwipe)(false);
                }
            }
        });

        const animatedStyle = useAnimatedStyle(()=>{
            return({
                transform: [{
                    translateX: position.value
                }] 
            });
        },[])

        const zoomStyle = useAnimatedStyle(()=>{
            return({
                transform: [{
                    scale: scale.value
                }] 
            });
        },[])

        return (
            <SafeAreaView style={styles.container}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: WIDTH,
                    backgroundColor: !swipe ? '#ffffff' : "#ff0047"
                }}>
                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View style={[{
                            width: WIDTH * 0.95,
                            height: 95,
                            borderRadius: 15,
                            backgroundColor: '#FFF',
                            alignItems: 'center',
                            left: WIDTH * 0.05,
                            flexDirection: 'row'
                        }, animatedStyle]}>
                                <Image source={{uri:props.imageUri}} style={styles.image} resizeMode="cover"/>
                                <View>
                                    <View style={{width: WIDTH * 0.7}}>
                                        <Text style={{
                                            color: "black",
                                            fontSize: 22, fontWeight: "600", marginBottom: 10
                                        }} numberOfLines={1} ellipsizeMode="tail">
                                            {props.title}
                                        </Text>
                                    </View>
                                    <View style={{height: 20, width: WIDTH * 1.2, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{width: '50%'}}>
                                            <Text style={{
                                                color: "grey",
                                                flex:1, fontSize: 16, fontWeight: '600',
                                            }} numberOfLines={1} ellipsizeMode="tail">
                                                {props.chanelTitle}
                                            </Text>
                                        </View>
                                        <Text style={{flex:1, color: "#FF0027", fontSize: 16, fontWeight: '600'}}>{props.duration}</Text>
                                    </View>
                                </View>
                        </Animated.View>
                    </PanGestureHandler>
                    <View style={{
                        width: WIDTH * 0.1,
                        right: WIDTH * 0.05,
                        alignItems: 'center'
                    }}>
                    <Animated.View style={[zoomStyle]}>
                        <TouchableOpacity disabled={!swipe} onPress={()=>{
                            Alert.alert(`Delete Item: ${props.index}`, 'Are you sure to delete this item?',[
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => {
                                        position.value = runOnJS(withSpring)(0);
                                        scale.value = 0;
                                        setSwipe(false);
                                    }
                                },
                                {
                                    text: 'Delete',
                                    onPress: () => {
                                        console.warn('Item Deleted Successfully')
                                        
                                        position.value = runOnJS(withSpring)(-WIDTH);
                                        scale.value = 0;
                                        setSwipe(false);

                                        _removeItem(PATH, offlineList[props.index].id);
                                        
                                        let newList = offlineList.filter(e => {
                                            return e !== trackList[props.index];
                                        })
                                        
                                        setOfflineList(newList);
                                    }
                                }
                            ]);
                        }}>
                            <IonIcons name='close' color='#FFF' size={36} />
                        </TouchableOpacity>
                    </Animated.View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style = {{
                    height: 50,
                    width: 100,
                    backgroundColor: '#FF0047',
                    margin: 15,
                    padding: 5,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '700'
                }}>Offline</Text>
            </TouchableOpacity>
            <FlatList 
                data={fileData} 
                renderItem={({item, index})=>(
                    <Pressable onPress={()=>{
                        Alert.alert(JSON.stringify(index))
                    }}>
                        <AnimatedComponent props={{
                            title: item.title,
                            chanelTitle: item.artist,
                            duration: item.duration,
                            imageUri: item.artwork,
                            index: index
                        }}/>
                    </Pressable>
                )}
                // showsVerticalScrollIndicator = {false}
                ListFooterComponent = {
                    currentQueue.length !== 0 ? 
                        <View style={{height: 120}}/> : undefined
                }
                ListEmptyComponent = {
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Dimensions.get('screen').height * 0.35
                    }}>
                        <Text>No tracks available here</Text>
                    </View>
                }
            />
            {currentQueue.length !== 0 ? <Widget/> : undefined}
            <StatusBar backgroundColor={'#FF0047'} barStyle="light-content" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    searchBar: {
        backgroundColor: 'white',
        height: 40,
        width: Dimensions.get('screen').width * 0.75,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 20,
        right: '6%'
    },
    box: {
        height: 90,
        width: Dimensions.get('screen').width * 0.9,
        borderRadius: 10,
        backgroundColor: "#FF0047",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 15
    },
    icon: {
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        position: 'absolute'
    },
    image: {
        height: 70,
        width: 70,
        marginLeft: 5,
        marginRight: 10,
        borderRadius: 10
    }
})

export default Library;