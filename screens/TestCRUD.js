import * as React from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native'; 
import RNFetchBlob from 'rn-fetch-blob';
import { getData, setData, del } from '../lib/AsyncStorageCRUD';

const TestCRUD = () => {
    const [val, setVal] = React.useState('');
    const {fs} = RNFetchBlob;

    const DIR = fs.dirs.DocumentDir + '/.jukebox/JBtest.txt';

    //const [arr, setArr] = React.useState([]);
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder='Enter value'
                value={val}
                onChangeText = {(value)=>setVal(value)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 30}}>
            <Button title='insert' onPress={()=>{
                getData('DWNLD').then(res => {
                    setData('DWNLD', [...res, val]).then(() => {
                        console.log('Successful');
                        //Alert.alert(res.toString());
                    }).catch(e => {
                        console.error(e);
                    })
                })
            }}/>
            <Button title='Show' onPress={()=>{
                getData('DWNLD').then(res => {
                    console.log(res);
                    Alert.alert(JSON.stringify(res));
                })
            }}/>
            <Button title='Delete' onPress={()=>{
                getData('DWNLD').then(res => {
                    const newArr = res.filter(e => {
                        return e!== val;
                    })
                    setData('DWNLD', newArr).then(() => {
                        console.log('Successful');
                        //Alert.alert(res.toString());
                    }).catch(e => {
                        console.error(e);
                    })
                })
            }}/>
            <Button title='Reset' onPress={()=>{
                del('DWNLD')
            }}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button 
                    title='write'
                    onPress={()=>{
                        fs.writeFile(DIR, 'Hello, World! from RN-Fetch-Blob FS as JSON...').then(()=>{
                            console.log('Successfully writen to File System as JSON.');
                        }).catch(e => {
                            console.error(e);
                        })
                    }}
                />
                <Button 
                    title='read'
                    onPress={()=>{
                        fs.readFile(DIR).then((data)=>{
                            console.log(data);
                        }).catch(e => {
                            console.error(e);
                        })
                    }}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30
    }
})
export default TestCRUD;