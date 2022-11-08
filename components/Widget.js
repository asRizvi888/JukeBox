import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Entypo from 'react-native-vector-icons/Entypo';
import { CurrentQueueContext, CurrentIndexContext} from '../lib/ContextJB';

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

const Widget = () => {
  
  const {currentQueue, setCurrentQueue} = React.useContext(CurrentQueueContext);
  const {currentIndex, setCurrentIndex} = React.useContext(CurrentIndexContext);
  
  const playbackState = usePlaybackState();
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container}
      onPress = {()=>{
        navigation.navigate('AudioPlayer', {props:{data: currentQueue, index: currentIndex, path: 'widget'}}
        )}}
    >
      <View style={styles.widget}>
          <Image source={{uri: `${currentQueue[currentIndex].artwork}`}} style={styles.img}/>
        <View style={{
          marginLeft: 10,
          justifyContent: 'center',
          width: '35%'
        }}>
          <Text numberOfLines={1} ellipsizeMode='tail'
            style={{color: '#fff', fontSize: 20, fontWeight: '700'}}
          >{currentQueue[currentIndex].title}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail'
            style={{color: '#fff', fontSize: 14, fontWeight: '500'}}
          >{currentQueue[currentIndex].artist}</Text>
        </View>
        <View style={{
          marginHorizontal: 15,
          width: '30%',
          height: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
          }}>
        <TouchableOpacity onPress={()=>{togglePlayBack(playbackState)}}>
          <View style={styles.btn}>
            <Entypo name={playbackState === State.Paused ? 'controller-play':'controller-paus'} color='#ff0047' size={26} />
          </View>
        </TouchableOpacity>
			<TouchableOpacity onPress={()=>{
          TrackPlayer.reset();
          setCurrentQueue([]);
          setCurrentIndex(0);
        }}>
				<View style={styles.btn}>
					<Entypo name='cross' color='#ff0047' size={28}/>
				</View>
			</TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      alignItems: 'center'
    },
   widget : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ff0047',
    width: '95%',
    height: 100,
    borderRadius: 15,
    position: 'absolute',
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: '100%',
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
   },
   img: {
    //backgroundColor: 'yellow',
    height: 100,
    width: '27%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
   },
   btn: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
   }
})

export default Widget;