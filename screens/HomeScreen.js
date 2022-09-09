import * as React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Dimensions,
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Button
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

import MiniCard from '../components/MiniCard';
import Genre from '../components/Genre';
import catagories from '../components/CatagoryList';
import { LoadingContext, StateContext } from '../lib/ContextJB';

import FetchInfo from '../lib/FetchInfo';
import { AudioFetch } from '../lib/AudioFetch';
import Widget from '../components/Widget';
import TrackPlayer, {Capability} from 'react-native-track-player';

const primary = '#FF0047';

const HomeScreen = ({navigation}) => {
  
  let TrendingList = FetchInfo("vevo music");
  
  const _playList = useNavigation();
  const netInfo = useNetInfo();

  const { loading } = React.useContext(LoadingContext);
  const {playing, setPlaying} = React.useContext(StateContext);
  
  //console.log(loading);
  console.log(TrendingList);

  const GREET = "A blissful \naudio experience ✨";
  const WIDTH = Dimensions.get('screen').width * 0.75;

  const [Query, setQuery] = React.useState('');
  const [musicURL, setMusicURL] = React.useState('');
  const [pause, setPause] = React.useState(true);

  const videoID = 'Pkh8UtuejGw'; 
  
  const getURL = async (videoID) => {
    let url = await AudioFetch(videoID);
    setMusicURL(url);
  }
  
  React.useEffect (()=>{
    getURL(videoID);     
  },[])
  
  console.log(musicURL);

  // senorita
  const mURL = 'https://rr6---sn-jpgjax-q5je.googlevideo.com/videoplayback?expire=1661546409&ei=SdsIY9rZEpKr3LUPzbem-Ac&ip=119.148.102.7&id=o-AM1scSRCRBP7he5INTaqbpW-smlQT4Qkvb0OxZUW392h&itag=251&source=youtube&requiressl=yes&mh=xD&mm=31%2C29&mn=sn-jpgjax-q5je%2Csn-npoldn7e&ms=au%2Crdu&mv=m&mvi=6&pl=24&gcr=bd&initcwndbps=350000&vprv=1&mime=audio%2Fwebm&ns=D76ZIa0fstVVAROn7gBsB2gH&gir=yes&clen=3444884&dur=205.401&lmt=1653012100395242&mt=1661524397&fvip=2&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=4532434&n=WkkVYCczV46FCoPP4s9t&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgK51Z08JQWj7PeiiZNH6JKt9FA2JJ59M1V-mZMRzI4m8CIQCwyrEHWjFmSfbidtIhZun-V_1tQUEuSQP543-cxcnk4g%3D%3D&ratebypass=yes&sig=AOq0QJ8wRgIhALxX5CO797CET54VQYZ11v8dAySIEepn9XWS2Q4dq-20AiEAzJiGzfVtBgSBL4GsVQdB1jJRBqL449k5CI_6dO6Fodo%3D' 
  const musicState = {
    url: musicURL,
    title: 'Song Name',
    artist: 'Singer',
    artwork: 'https://us.123rf.com/450wm/stockshoppe/stockshoppe1704/stockshoppe170400024/75997064-abstract-music-collage-background.jpg?ver=6'
  }
  
  
  //TrackPlayer.add(musicState);
  //pause ? TrackPlayer.pause() : TrackPlayer.play();

  //console.log(`MUSIC_STATE:\n${musicState.url}`)
    return (
        <View style={styles.container}>
            <Text>
                HomeScreen
            </Text>
            <Button 
                title='GO TO DETAILS'
                color={primary}
                onPress={()=>navigation.navigate('details')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
});

export default HomeScreen;