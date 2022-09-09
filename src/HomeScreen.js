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
  
  if (musicURL) {
    TrackPlayer.add(musicState);
    pause ? TrackPlayer.pause() : TrackPlayer.play();
  }

  //console.log(`MUSIC_STATE:\n${musicState.url}`)

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 7}}>
      <View style={{paddingLeft: 15}}>
        <Text style={{fontWeight: "700",fontSize: 32}}>
          {GREET}
        </Text>
        <Button title='player' onPress={()=>navigation.navigate('AudioPlayer')}/>
      </View>
      <View style={{padding: 15, flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style = {[
          styles.shadow,{
            flexDirection: 'row', 
            justifyContent: 'space-around', 
            backgroundColor: 'white', 
            height: 65, width: WIDTH, 
            alignItems:'center'
        }]}>
          <AntDesign name='search1' size={24} color="#FF0047"/>
          <TextInput
            placeholder='Search for songs'
            placeholderTextColor={'#FF0047'}
            style={{fontSize: 16, width: 130}}
            value={Query}
            onChangeText = {(Query)=>{setQuery(Query)}}
          />
          {(Query.length!=0) ? 
          <TouchableOpacity
            onPress={()=>{
              _playList.navigate('PlayList', {props: Query})
              setQuery('') 
            }}
          >
            <AntDesign name='arrowright' size={24} color="#FF0047"/> 
          </TouchableOpacity>: <View/>}
        </View>
        <TouchableOpacity style={[{
          height:65, width:65, 
          backgroundColor: "#FF0047", 
          alignItems: 'center', 
          justifyContent: 'center',
          marginLeft: 15,
          borderRadius: 15
        }, styles.shadow]}
          onPress={()=>{
            setPlaying(musicState);
            setPause(!pause);
            //!pause ? TrackPlayer.play() : TrackPlayer.pause();
            //TrackPlayer.play();
          }}
        >
          <Fontisto name='equalizer' size={26} color="#FFF"/>
        </TouchableOpacity>
      </View>
      <Button
        title= {pause ? 'play' : 'pause'}
        color={'tomato'}
        onPress = {()=>{
          //togglePlayback(playbackState)
          setPause(!pause);
        }}
      />
      {(netInfo.isInternetReachable && netInfo.isConnected) ? 
      <FlatList
        ListHeaderComponent={()=>{
          return(
          <View>
            <Text style={{fontWeight: "700", fontSize: 32, paddingLeft: 15}}>Trending</Text>
            {loading?
              <View style = {{height: 150, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color={'#FF0047'} size="large"/>
              </View> :
              <FlatList
                data={TrendingList}
                renderItem={({item})=>
                  <MiniCard 
                    title={item.title} 
                    duration={item.duration}
                    imageURI={item.imageURL}
                  /> 
                }
                keyExtractor={(item) => item.id}
                horizontal
                initialNumToRender={5}
                showsHorizontalScrollIndicator = {false}
                style={{paddingLeft: 10}}
              />
            }
            <Text style={{fontWeight: "700", fontSize: 32, paddingLeft: 15}}>GENRE</Text>
          </View>
          );
        }}
        data={catagories}
        renderItem={({item})=>{
        return(
          <Genre
            title = {item.title}
            col = {item.col}
          />
        );}}
        numColumns={2}
        contentContainerStyle={{alignContent: 'center'}}
        keyExtractor = {item=>item.title}
        showsVerticalScrollIndicator = {false}
        ListFooterComponent={()=>{
          return(
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity style={[styles.shadow, {
                marginVertical: 15,
                height: 65,
                width: Dimensions.get('screen').width * 0.95,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#FF0047',
                borderRadius: 18,
              }]}>
                <MaterialIcons name='history' size={26} color="#FFF" style={{marginRight: 5}}/>
                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '600', marginLeft:5}}>
                  Previously Played
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      /> : 
      <View style={{alignContent: 'center', marginBottom: '50%'}}>
        <Image 
          source={require("../assets/no-internet.webp")} 
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}  
        />
      </View>
    }
    </View>
    {playing == null ? undefined : <Widget/>}
    </SafeAreaView>
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