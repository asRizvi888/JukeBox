import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

const PlayereModal = () => {
  let [ShowComment, setShowModelComment] = React.useState(false);
  let [animateModal, setanimateModal] = React.useState(false);
    return (

      <SwipeUpDownModal
        modalVisible={ShowComment}
        PressToanimate = {animateModal}
        ContentModal = {
          <View style={{flex:1, marginTop: 30}}>
            <Text>
              This is modal
            </Text>
            <TouchableOpacity 
              onPress={(()=>{
                setShowModelComment(false);
                setanimateModal(false);
              })}
            >
              <Text>
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        }
        ContentModalStyle = {{
          backgroundColor: 'pink',
          borderRadius: 25
        }}
       onClose = {(()=>{
         //setShowModelComment(false)
         setanimateModal(false)
       })} 
      />
    );
}