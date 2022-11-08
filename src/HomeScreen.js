import * as React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable,
  Dimensions,
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNetInfo} from '@react-native-community/netinfo';

import MiniCard from '../components/MiniCard';
import Genre from '../components/Genre';
import catagories from '../components/CatagoryList';
import { LoadingContext, CurrentQueueContext } from '../lib/ContextJB';

import FetchInfo from '../lib/FetchInfo';
import Widget from '../components/Widget';

const HomeScreen = ({navigation}) => {
  
  let TrendingList = FetchInfo("vevo music");
  
  const netInfo = useNetInfo();

  const { loading } = React.useContext(LoadingContext);
  const { currentQueue } = React.useContext(CurrentQueueContext);
  
  const GREET = "A blissful \naudio experience ✨";
  const WIDTH = Dimensions.get('screen').width * 0.75;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 7}}>
      <View style={{paddingLeft: 15}}>
        <Text style={{fontWeight: "700",fontSize: 36, color: '#000'}}>
          {GREET}
        </Text>
      </View>
      <View style={{padding: 15, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Pressable onPress={()=>navigation.navigate('SearchScreen')}>
        <View style = {[
          styles.shadow,{
            flexDirection: 'row', 
            justifyContent: 'center', 
            backgroundColor: 'white', 
            height: 65, width: WIDTH, 
            alignItems:'center'
        }]}>
          <AntDesign name='search1' size={24} color="#FF0047" style={{paddingHorizontal: 10}}/>
          <Text style={{fontSize: 16, color:"#FF0047", marginHorizontal: 25}}>
            Search for songs
          </Text>
        </View>
        </Pressable>
        <TouchableOpacity style={[{
          height:65, width:65, 
          backgroundColor: "#FF0047", 
          alignItems: 'center', 
          justifyContent: 'center',
          marginLeft: 15,
          borderRadius: 15
        }, styles.shadow]}
          onPress={()=>{
            navigation.navigate('Library');
          }}
        >
          <Fontisto name='equalizer' size={26} color="#FFF"/>
        </TouchableOpacity>
      </View>
      {(netInfo.isInternetReachable && netInfo.isConnected) ? 
      <FlatList
        ListHeaderComponent={()=>{
          return(
          <View>
            <Text style={{fontWeight: "700", fontSize: 32, paddingLeft: 15, paddingVertical: 5,color: 'black'}}>Trending⚡</Text>
            {loading?
              <View style = {{height: 150, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color={'#FF0047'} size="large"/>
              </View> :
              <FlatList
                data={TrendingList}
                renderItem={({item, index})=>
                  <MiniCard 
                    title = {item.title} 
                    duration = {item.duration}
                    imageURI = {item.artwork}
                    props = {{data: TrendingList, index: index}}
                  /> 
                }
                keyExtractor={(item) => item.id}
                horizontal
                initialNumToRender={5}
                showsHorizontalScrollIndicator = {false}
                style={{paddingLeft: 10}}
              />
            }
            <Text style={{fontWeight: "700", fontSize: 32, paddingLeft: 15, paddingVertical: 7, color: 'black'}}>Catagories ❤️</Text>
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
              
              {currentQueue.length !== 0 ? <View style={{height: 120}}/> : undefined}

            </View>
          );
        }}
      /> : 
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Image 
          source={require("../assets/no-internet.webp")} 
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}  
        />
        <TouchableOpacity style={{bottom: '25%'}}
          onPress = {() => navigation.navigate('Library')}
        >
          <Text style={{color: '#ff0047', fontSize: 16}}>GO TO OFFLINE LIBRARY</Text>
        </TouchableOpacity>
      </View>
    }
    </View>
    {currentQueue.length !== 0 ? <Widget/> : undefined}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center' // added
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