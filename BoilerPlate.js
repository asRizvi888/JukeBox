import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  PermissionsAndroid
} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';

const musicURL = 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3';
const artwork = 'https://townsquare.media/site/812/files/2020/05/Illustrated-album-covers.jpg?w=1200';
const offlineURL = 'file:///storage/emulated/0/Music/offline/offline.mp3'; 


const track = 
  {
    url: musicURL,
    title: 'offline',
    artist: 'unknown',
    artwork: artwork
  }
// function to request permission
const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "JUKEBOX",
          message:
            "This app needs your permission to work properly",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the EXTERNAL_STORAGE");
      } else {
        console.log("EXTERNAL_STORAGE permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

const App = () => {
  const [initialized, setInitialized] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  
  React.useEffect(()=>{
    requestStoragePermission();
    const initPlayer = async () => {
      // To make the player ready to use
      await TrackPlayer.setupPlayer();
      setInitialized(true);
    }
    initPlayer();

    return () => TrackPlayer.destroy();
  },[])

  RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MusicDir + '/JukeBox/')
    .then((files)=>{
      console.log(files);
    }).catch((e)=>{
      RNFetchBlob.fs.mkdir(RNFetchBlob.fs.MusicDir + '/JukeBox')
      console.error(e);
    })

  TrackPlayer.updateOptions({
    // media control capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],

    // control capabilities in collapsed mode
    compactCapabilities: [
      Capability.Play,
      Capability.Pause
    ]
  })

  const addTack = async (trackList) => {
    try {
      await TrackPlayer.add(trackList);

      console.log('Tracks Loaded!');
    } catch (e) {
      Alert.alert(e);
    }
  }

  const trackIndex = async () => {
    let currIndex = await TrackPlayer.getCurrentTrack();
    return currIndex;
  }

  let index = trackIndex();

  if ( initialized ) {
    console.log(`status: ${initialized}`);
    addTack(track);
  } else {
    console.log('Not initialized');
  }

  // file manger
  const { fs, config } = RNFetchBlob;
  const DIR = fs.dirs.MusicDir;
  console.log(DIR);

  // download track
  const download = (url, filename) => {
    return config ({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: DIR + '/JukeBox/' + filename + '.mp3'
      }
    }).fetch('GET', url).then(()=>{

      RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MusicDir + '/JukeBox/')
        .then((dir)=>{
          setFiles(dir);
        })
    })
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{track.title}</Text>
      <View>
        <View style={{
          flexDirection: 'row', 
          alignItems: 'baseline',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: 'lightblue', width: '49%'}]}
            onPress={()=>{TrackPlayer.play()}}
          >
            <Text style={styles.btnText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {backgroundColor: 'tomato', width: '49%'}]}
            onPress={()=>{TrackPlayer.pause()}}
          >
            <Text style={styles.btnText}>Pause</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'space-between'}}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: 'lightgreen', width: '100%'}]}
          onPress={()=>{download(track.url, track.title)}}
        >
          <Text style={styles.btnText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor: 'teal', width: '100%'}]}
          onPress={requestStoragePermission}
        >
          <Text style={styles.btnText}>Play Offline</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'space-around',
    padding: 25
  },
  text : {
    color: 'black',
    fontSize: 42,
    fontWeight: '900'
  },
  btn: {
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  }
});

export default App;