import * as React from 'react';
import {
  View,
  Text,
  StyleSheet ,
  Button,
  Dimensions
} from 'react-native';

const Widget = () => {
  return (
    <View style={styles.widget}>
      <View style = {{
        backgroundColor: 'black',//'#ff0047',
        height: '95%',
        width: '100%',
        borderRadius: 15,
      }}>

      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
   widget : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
   }
})

export default Widget;