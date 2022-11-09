import * as React from 'react';
import {View, Text, Button, Alert, TextInput, Dimensions, Image, FlatList} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const {fs} = RNFetchBlob;
//const DIR = fs.dirs.DocumentDir + '/.jb/db';
const DIR = fs.dirs.DocumentDir + '/test';

const img = '-24zBDFTG28';
// https://reactnative.dev/img/logo-og.png
const local = `file:///${fs.dirs.MusicDir}/.jukebox/thumbnails/${img}.jpg`;

const FsCRUD = () => {

    const [key, setKey] = React.useState('');
    const [value, setValue] = React.useState('');
    const [fileData, setFileData] = React.useState([]);
    
    React.useEffect(() => {
        fs.exists(DIR).then(res => {
            if (!res) {
                fs.createFile(DIR);
            }
        })
        _read(DIR);
    },[]);

    const _create = (path) => {
        _read(path);
        //fileData[key] = {name: value};
        let data = {
            key: key,
            value: value,
            //_id: 6969
        }

        //data._id = 420;

        let buffer = [...fileData, data];
        setFileData(buffer);
        fs.writeFile(path, JSON.stringify(buffer), 'utf8').then(() => {
            Alert.alert('Successfully created data.');
            _read(path);
        }).catch(err => {
            console.error(err);
        })
    }

    const _read = (path) => {
        fs.readFile(path).then((response) => {
            // Alert.alert(response);
            if (response) {
                setFileData(JSON.parse(response));
            }
        }).catch((err) => {
            console.error(err);
        })    
    }

    const _delete = (path) => {
        fs.unlink(path).then(()=>{
            Alert.alert('Successfully Deleted');
            setFileData([]);
            //_read(path);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            fs.createFile(path);
        })
    }

    const _getItem = (path, key) => {
        _read(path);

        if (key && fileData) {
            fileData.forEach(item => {
                if (item.key === key) {
                    Alert.alert(item.value);
                    console.log(item.value);
                }
            })
        }
    }

    const _removeItem = (path, key) => {
        _read(path);

        if (key && fileData) {
            //delete fileData[key];
            let temp = fileData.filter(item => {
                return item.key !== key;
            })

            setFileData(temp);
            
            fs.writeFile(path, JSON.stringify(temp), 'utf8').then(() => {
                Alert.alert('Item removed succesfully');
                _read(path);
            }).catch(err => {
                console.error(err);
            })

            console.log('After: ', fileData)
        }
    }
    
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white'
        }}>
            {/*
            <Image 
                source={{uri:`${local}`}}
                resizeMode='center'
                style={{
                    height: 250,
                    width: 500
                }}
            />
            */}
            <TextInput 
                placeholder='Enter Key here'
                value={key}
                onChangeText={(prev) => {setKey(prev)}}
                style={{textAlign: 'center'}}
            />
            <TextInput 
                placeholder='Enter value here'
                value={value}
                onChangeText={(prev) => {setValue(prev)}}
                style={{textAlign: 'center'}}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: Dimensions.get('screen').width
            }}>
                <Button 
                    title='Create'
                    onPress={() => {
                        // Alert.alert(value)
                        _create(DIR);
                    }}
                    disabled={!value}
                />
                <Button 
                    title='Read'
                    color={'green'}
                    onPress={() => {
                        //Alert.alert('Read operation')
                        _read(DIR);
                        Alert.alert(JSON.stringify(fileData));
                        console.log(`RESPONSE: ${fileData}`);
                    }}
                />
                <Button 
                    title='Delete'
                    color={'red'}
                    onPress={() => {
                        //Alert.alert('DELETE operation')
                        _delete(DIR);
                        setFileData({});
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: Dimensions.get('screen').width
            }}>
                <Button 
                    title='Get Item'
                    color={'lightblue'}
                    onPress={() => {
                        //Alert.alert('Read operation')
                        _getItem(DIR, key);
                    }}
                />
                <Button 
                    title='Remove Item'
                    color={'tomato'}
                    onPress={() => {
                        //Alert.alert('DELETE operation')
                        _removeItem(DIR, key);
                    }}
                />
            </View>
            <FlatList 
                data={fileData}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Text>
                                {item.key}  {item.value}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default FsCRUD;