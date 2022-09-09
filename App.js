import * as React from 'react';
import {
  StatusBar,
  PermissionsAndroid
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Screens';
import AudioPlayer from './src/AudioPlayer';
import { LoadingProvider, StateProvider } from './lib/ContextJB';
import TrackPlayer, {Capability} from 'react-native-track-player';
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
  
  React.useEffect(()=>{
    requestStoragePermission();
    const initPlayer = async () => {
      // To make the player ready to use
      await TrackPlayer.setupPlayer();
    }
    initPlayer();

    return () => TrackPlayer.destroy();
  },[])
  
  TrackPlayer.updateOptions({
    stopWithApp:true,
    alwaysPauseOnInterruption:false,
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

  return (
    <LoadingProvider>
      <StateProvider>
        <NavigationContainer>
          <MyStack/>
          <StatusBar 
            backgroundColor={'white'} 
            barStyle='dark-content'
          />
        </NavigationContainer>
      </StateProvider>
    </LoadingProvider>
  );
}

export default App;
