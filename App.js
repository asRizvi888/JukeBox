import * as React from 'react';
import {
  StatusBar,
  PermissionsAndroid
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Screens';
import AnimatedComponent from './src/AnimatedComponent';
import DownloadTest from './src/DownloadTest';
import TestCRUD from './screens/TestCRUD';
import FsCRUD from './src/FsCRUD';
import TrackPlayer, {Event, useTrackPlayerEvents, Capability} from 'react-native-track-player';

import { 
  LoadingProvider, 
  RepeatModeProvider, 
  CurrentQueueProvider, 
  CurrentIndexProvider,
  CurrentIndexContext,
} from './lib/ContextJB';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  },[]);

  const InitContext = () => {
      const {setCurrentIndex} = React.useContext(CurrentIndexContext);
      const events = [Event.RemoteNext, Event.RemotePrevious, Event.PlaybackTrackChanged]; 
      return (
      <>
        {
          useTrackPlayerEvents(events, event => {
            if (event.type === Event.RemoteNext || event.type === Event.RemotePrevious || event.type == Event.PlaybackTrackChanged) {
              // console.log(event);
              TrackPlayer.getCurrentTrack().then(index => {
                setCurrentIndex(index);
              })
            }
          })
        }
      </>
    );
  }

  TrackPlayer.updateOptions({
    stopWithApp:true,
    alwaysPauseOnInterruption:true,
    // media control capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],

    notificationCapabilities: [
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
   <GestureHandlerRootView style={{flex: 1}}>
    <LoadingProvider>
      <CurrentQueueProvider>
      <RepeatModeProvider>   
        <CurrentIndexProvider>
          <NavigationContainer>
            <MyStack />
            <InitContext />
            <StatusBar 
              backgroundColor={'white'} 
              barStyle='dark-content'
            />
          </NavigationContainer>
        </CurrentIndexProvider>
     </RepeatModeProvider>
     </CurrentQueueProvider>
    </LoadingProvider>
   </GestureHandlerRootView>
  );
}

export default App;
