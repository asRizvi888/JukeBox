import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

import SheetItem from '../components/SheetItem';

import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RNFetchBlob from 'rn-fetch-blob';
import download from './DownloadTest';
import { getData, setData } from '../lib/AsyncStorageCRUD';

import TrackPlayer, {
    RepeatMode,
    State,
    usePlaybackState, 
    useProgress,
}from 'react-native-track-player';

import BottomSheet, {BottomSheetView, BottomSheetFlatList} from '@gorhom/bottom-sheet';

import { RepeatModeContext, CurrentQueueContext, CurrentIndexContext, DownloadContext} from '../lib/ContextJB';

const togglePlayBack = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
        if (playbackState === State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
}

const { fs } = RNFetchBlob;
const DIR = fs.dirs.MusicDir + '/.jukebox';

const trackDIR = DIR + '/tracks/';
const thumbDIR = DIR + '/thumbnails/';
const PATH = fs.dirs.DocumentDir + '/.jb/db';

const templateString = (dir, file, ext) => { return `file://${dir}${file}.${ext}` };

const AudioPlayer = ({navigation, route}) => {
    const {data, index} = route.params.props;
  
    const {repeatMode, setRepeatMode} = React.useContext(RepeatModeContext);
    const {currentQueue, setCurrentQueue} = React.useContext(CurrentQueueContext);
    const {currentIndex, setCurrentIndex} = React.useContext(CurrentIndexContext);

    const [isVisible, setIsVisible] = React.useState(false);
    const [offlineList, setOfflineList] = React.useState([]);
    const [downloadQueue, setDownloadQueue] = React.useState([]);
    
    // fs states
    const [fileData, setFileData] = React.useState([]);

    const _create = (path) => {
        _read(path);
        
        let _data = currentQueue[currentIndex];

        _data.url = templateString(trackDIR, _data.id, 'mp3');
        _data.artwork = templateString(thumbDIR, _data.id, 'jpg');

        let buffer = [...fileData, _data];
        setFileData(buffer);
        fs.writeFile(path, JSON.stringify(buffer), 'utf8').then(() => {
            //Alert.alert('Successfully created data.');
            _read(path);
        }).catch(err => {
            console.error(err);
        })
    }

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

    const updateOfflineList = async () => {
        fs.ls(trackDIR).then(files => {
            let arr  = [];
            files.forEach(e => {
                if (e !== null) {
                    arr.push(e.split('.')[0]);
                }
            })
            setOfflineList(arr);
        })
    }

    const updateDownloadQueue = () => {
        let newQueue = [];
        downloadQueue.forEach(item => {
            if (!offlineList.includes(item)) {
                newQueue.push(item);
            }
        })
        setData('DWNLD', newQueue);
        setDownloadQueue(newQueue);
    }

    React.useEffect(()=>{
        getData('DWNLD').then(res => {
            setDownloadQueue(res);
        })
        updateOfflineList();
    },[])

    fs.ls(trackDIR).then(files => {
        if (files.length !== offlineList.length) {
            updateOfflineList().then(() => {
                updateDownloadQueue();
            })
        }    
    })     
    console.log("Downloaded:",offlineList);
    console.log("QUEUE:",downloadQueue);
    
    // TrackPlayer.getQueue().then((queue) => {
    //     TrackPlayer.getCurrentTrack().then((idx) => {
    //         console.log(queue[idx]);
    //     })
    // })

    const snapPoints = ["60%","90%"];
    const sheetRef = React.useRef(null);
    const listRef = React.useRef(null);

    const playbackState = usePlaybackState();
    const progress = useProgress();

    const toggleDownloadIcon = (id) => {
        
        if (!offlineList.includes(id) && !downloadQueue.includes(id)) {
            // console.log('1st');
            return (
                <TouchableOpacity onPress={()=>{
                    let arr = [...downloadQueue, id];
                    console.log(arr);
                    //_create(PATH);
                    setData('DWNLD', arr); // async storage
                    setDownloadQueue(arr); 
                    download(`${data[currentIndex].url}`, trackDIR, `${data[currentIndex].id}.mp3`);
                    download(`${data[currentIndex].artwork}`, thumbDIR, `${data[currentIndex].id}.jpg`);
                }}>
                    <AntDesign name='download' size={22} color="white"/>
                </TouchableOpacity> 
            );
        }

        if (downloadQueue.includes(id) && !offlineList.includes(id)) {
            // console.log('2nd');
            return (
                <ActivityIndicator color={'white'} />
            );
        }

        if (offlineList.includes(id)) {
            // console.log('3rd');
            return (
                <Ionicons name='cloud-done-outline' size={28} color="#FFF"/>
            );
        }
    }

    const toggleRepeatMode = async () => {
        
        const mode = await TrackPlayer.getRepeatMode();

        if (mode == 0) {
            setRepeatMode(1);
            TrackPlayer.setRepeatMode(RepeatMode.Track);
        }

        if (mode == 1) {
            setRepeatMode(0);
            TrackPlayer.setRepeatMode(RepeatMode.Off);
        }
    }

    // const objectsEqual = (o1, o2) => {
    //     return Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p] === o2[p]);
    // }

    const convert = (elements) => {
        let arr = [];
    
        elements.forEach(element => {
            arr.push(JSON.stringify(element));
        })
        return arr;
    }
    
    const isSame = (a1, a2) => {
        
        if (a1.length !== a2.length) {
            return false;
        }
        
        const n1 = convert(a1);
        const n2 = convert(a2);
    
        const n = new Set(n1);
    
        let cnt = 0;
    
        n.forEach(e => {
            //console.log(e);
            if (n2.includes(e)) {
                cnt++;
            } 		
        })
    
        return n1.length === cnt;
    }
    

    const initQueue = async () => {

        await TrackPlayer.reset();
        await TrackPlayer.add(data);

        setCurrentQueue(data);
        setCurrentIndex(index);

        await TrackPlayer.skip(index);
        await TrackPlayer.play();

    }

    React.useEffect(()=>{
        if (!isSame(data, currentQueue)) {
            initQueue();
        }

        if (isSame(data, currentQueue) && route.params.props.path !== 'widget'){
            TrackPlayer.skip(currentIndex);
            //setCurrentIndex(index);
        } 

    },[data])
  
    return (
        <ImageBackground 
            style={{flex:1, opacity: 1}}
            source={{uri: data[currentIndex].artwork}}
            blurRadius={25}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Feather name='chevron-down' color={'white'} size={28} />
                </TouchableOpacity>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                    STREAMING ONLINE
                </Text>
                <View/>
            </View>
        <View style={{alignItems: 'center'}}>
            <View style={styles.container}>
                <View style={{alignItems : 'center'}}>
                    <Image 
                        source={{uri:  data[currentIndex].artwork}}
                        style={{height: 350, width: 350, borderRadius: 35, marginTop: 15}}  
                    />
                </View>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 25,
                }}>
                    <View style={{width: '80%'}}>
                        <Text 
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={{color: 'white', fontSize: 32, fontWeight: '700', marginVertical: 7}}
                        >{data[currentIndex].title}</Text>
                        <Text 
                            numberOfLines={1}
                            ellipsizeMode={'clip'}
                            style={{color: 'darkgrey', fontSize: 20, fontWeight: '700'}}
                        >{data[currentIndex].artist}</Text>
                    </View>
                    <View style={{marginTop: 35}}>
                        <TouchableOpacity onPress={() => {toggleRepeatMode()}}>
                            <Feather name='repeat' size={24} color={repeatMode == 0 ? "#FFFFFF" : "#FF0047"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.controller}>
                <View style={{marginVertical: 15, marginHorizontal: 15, height:45}}>
                    <Slider
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor="#FF0047"
                        minimumTrackTintColor='#FF0047'
                        maximumTrackTintColor='#FFF'
                        onSlidingComplete={async(value)=>{
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                    <View style={{
                        flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-between', 
                        marginHorizontal: 15, 
                        marginTop: 5,
                    }}>
                        <Text style={{fontWeight: '500', color: '#FFF'}}>
                            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                        </Text>
                        <Text style={{fontWeight: '500', color: '#FFF'}}>
                            {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity onPress={async()=>{await TrackPlayer.skipToPrevious()}}>
                        <AntDesign name='banckward' size={36} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => {togglePlayBack(playbackState)} }
                    >
                        <AntDesign name={playbackState === State.Paused ? "play" : "pausecircle"} size={64} color="#FF0047"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async()=>{await TrackPlayer.skipToNext()}}>
                        <AntDesign name='forward' size={36} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    alignItems: 'center', 
                    paddingVertical: 25
                }}>
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
                        <AntDesign name='bars' size={26} color="white"/>
                    </TouchableOpacity>
                    <View />
                    <View />
                    {toggleDownloadIcon(data[currentIndex].id)}
                </View>
            </View>
        </View>
        {isVisible ?
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={()=>{setIsVisible(false)}}
        >
                <BottomSheetView style={{margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color: '#000', fontSize: 34, fontWeight: '900'}}>
                        PLAYLIST
                    </Text>
                    <TouchableOpacity
                        onPress={()=>{
                            listRef.current?.scrollToIndex({animated: true, index:currentIndex});
                            sheetRef.current?.snapToIndex(1);
                            //console.log(currentIndex);
                        }}
                    >
                        <Octicons name='multi-select' size={28} color="#FF0047"/>
                    </TouchableOpacity>
                </BottomSheetView>
                <BottomSheetFlatList
                    data={currentQueue}
                    ref = {listRef}
                    renderItem={({item, index})=>
                        <SheetItem
                            title={item.title}
                            duration={item.duration}
                            chanelTitle={item.artist}
                            imageUri={item.artwork}
                            props={{index: index, ref: sheetRef}}
                        />
                    }
                    
                />
        </BottomSheet> : undefined}
        <StatusBar hidden/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '60%',
        width: '95%',
        justifyContent: 'space-around',
    },
    controller: {
        height: '40%',
        width: '95%',
    },
    header: {
        flexDirection: 'row',
        height: '10%',
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})


export default AudioPlayer;