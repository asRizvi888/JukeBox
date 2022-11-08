/**
 * TODO: check youtube auto-suggestion API 
 *
 */

 import * as React from 'react';
 import {
     View, 
     Text,
     FlatList,
     StyleSheet,
     TextInput,
     TouchableOpacity,
     Image,
     Dimensions
 } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Widget from '../components/Widget';
import { CurrentQueueContext } from '../lib/ContextJB';

const AutoSuggestion = ({navigation}) => {
 
     const [query, setQuery] = React.useState('');
     const [suggestion, setSuggestion] = React.useState([]);

     const keyBoardRef = React.useRef(null);

     const {currentQueue} = React.useContext(CurrentQueueContext);

     const ListItem = ({props}) => {
         return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
             <TouchableOpacity 
                style={styles.listItem}
                onPress={()=>{
                    navigation.navigate('PlayList', {props})
                }}
             >
                <AntDesign name='search1' size={18} color="grey"/>
                 <Text
                     numberOfLines={1}
                     ellipsizeMode='middle'
                     style={{
                         marginLeft: 10,
                         fontSize: 16,
                         fontWeight: '500'
                     }}
                 >{props}</Text>
             </TouchableOpacity>
            <TouchableOpacity style = {{width: '10%', alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                setQuery(props.toString());
                keyBoardRef.current.focus(); 
            }}>
                <Feather name='arrow-up-right' size={20} color="grey" />
            </TouchableOpacity>
            </View>
         );
     }

    React.useEffect(()=>{
        if (query.length == 0) {
            setQuery('');
            setSuggestion([]);
        } else {
            fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`)
                .then((response) => response.json())
                .then(data => {
                    setSuggestion(data[1]);
                    // console.log(data)
                }).catch((e) => {
                    console.log("Can't process your request!")
                })
        }
    },[query])

    return (
        <View style={styles.contiainer}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
        <View style={styles.input}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name='search1' size={24} color="#FF0047" style={{marginLeft: 5}}/>
                <TextInput
                    placeholder='Search for songs'
                    placeholderTextColor={'#FF0047'}
                    style={{fontSize: 16, width: !query ? '50%' : '75%', marginHorizontal: !query ? '20%' : 10}}
                    value={query}
                    onChangeText = {(Query)=>{setQuery(Query)}}
                    autoFocus
                    ref={keyBoardRef}
                    returnKeyType='search'
                    onSubmitEditing={() => {
                        navigation.navigate('PlayList', {props: query})
                        setQuery('') 
                    }}
                />
                {(query.length!=0) ? 
                    <TouchableOpacity
                        style={{right: '10%'}}
                        onPress={()=>{
                            setQuery('');
                            setSuggestion([]); 
                        }}
                    >
                        <MaterialIcons name='cancel' size={22} color="darkgrey"/> 
                    </TouchableOpacity> : undefined }
            </View>
        </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Text style={styles.btn}>
                    CANCEL
                </Text>
            </TouchableOpacity>
        </View>
            <FlatList
                data = {suggestion}
                renderItem = {({item}) => (
                    <ListItem props={item} />
                )}
                ListEmptyComponent = {()=>(
                <View style={[styles.contiainer, {alignItems: 'center'}]}>
                    <Text style={{marginTop: '75%'}}>
                        Search by song, artist & playlist
                    </Text>
                </View>
                )}
            />
            {currentQueue.length !== 0 ? <View style={{height: 120}}/> : undefined}
            {currentQueue.length !== 0 ? <Widget/> : undefined}
        </View>
    );
}
 
 const styles = StyleSheet.create({
     contiainer: {
         flex: 1,
         justifyContent: 'center',
         backgroundColor: 'white'
     },
     listItem: {
         backgroundColor: 'white',
         width: Dimensions.get('screen').width * 0.75,
         height: 50,
         padding: 10,
         borderRadius: 20,
         marginHorizontal: 20,
         marginVertical: 5,
         flexDirection: 'row',
         alignItems: 'center'
     },
     input: {
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width * 0.75,
        height: 50,
        alignItems: 'center',
        margin: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        paddingHorizontal: 10
     },
     btn: {
        color: '#FF0047',
        fontSize: 14,
        right: '15%'
     },
    img: {
        height: 400,
        width:400,
        marginTop: '25%'
    }
 })
 
 export default AutoSuggestion;
 