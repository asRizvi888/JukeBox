import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Screens';
import { LoadingProvider, StateProvider } from './lib/ContextJB';
import TrackPlayer, {Capability} from 'react-native-track-player';
import AudioPlayer from './src/AudioPlayer';

const App = () => {

  React.useEffect(()=>{
    const initPlayer = async () => {
      await TrackPlayer.setupPlayer();
    }
    initPlayer();
  },[])
  
  TrackPlayer.updateOptions({
    // Media controls capabilities

    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],

    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  return (
    <LoadingProvider>
      <StateProvider>
        <NavigationContainer>
          <MyStack/>
        </NavigationContainer>
      </StateProvider>
    </LoadingProvider>
  );
}

export default App;
