import * as React from 'react';
import { SafeAreaView, View, StyleSheet , Text, Dimensions, TouchableOpacity, Alert, Button, FlatList} from 'react-native';
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { PanGestureHandler } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('screen').width;

const AnimatedComponent = ({props}) => {

    const position = useSharedValue(0);
    const scale = useSharedValue(0);
    
    const [swipe, setSwipe] = React.useState(false);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.startX = position.value;
        },
        onActive: (event, context) => {
            if (event.translationX < 0) {
                position.value = withSpring(context.startX + event.translationX); 
                scale.value = withSpring(1);
            }
        },
        onEnd: (event, context) => {
            if (event.translationX < 0) {
                position.value = withSpring(-50, {damping: 7});
                runOnJS(setSwipe)(true);
            } else {
                position.value = withSpring(0);        
                scale.value = withSpring(0);
                runOnJS(setSwipe)(false);
            }
        }
    });

    const animatedStyle = useAnimatedStyle(()=>{
        return({
            transform: [{
                translateX: position.value
            }] 
        });
    },[])

    const zoomStyle = useAnimatedStyle(()=>{
        return({
            transform: [{
                scale: scale.value
            }] 
        });
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                width: WIDTH,
                marginTop: 10,
            }}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={[{
                        width: WIDTH * 0.9,
                        height: 100,
                        borderRadius: 15,
                        backgroundColor: 'cyan',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: WIDTH * 0.05
                    }, animatedStyle]}>
                        <Text>New component</Text>
                    </Animated.View>
                </PanGestureHandler>
                <View style={{
                    width: WIDTH * 0.1,
                    right: WIDTH * 0.05,
                    alignItems: 'center'
                }}>
                <Animated.View style={[zoomStyle]}>
                    <TouchableOpacity disabled={!swipe} onPress={()=>{
                        Alert.alert(`Delete Item: ${props.index}`, 'Are you sure to delete this item?',[
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => {
                                    position.value = runOnJS(withSpring)(0);
                                    scale.value = 0;
                                    setSwipe(false);
                                }
                            },
                            {
                                text: 'Delete',
                                onPress: () => {
                                    console.warn('Item Deleted Successfully')
                                    
                                    position.value = runOnJS(withSpring)(-WIDTH);
                                    scale.value = 0;
                                    setSwipe(false);
                                }
                            }
                        ]);
                    }}>
                        <IonIcons name='close' color='#FF0047' size={36} />
                    </TouchableOpacity>
                </Animated.View>
                </View>
             </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    box: {
        height: 90,
        width: Dimensions.get('screen').width * 0.9,
        borderRadius: 10,
        backgroundColor: "#FF0047",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 15
    },
    icon: {
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        position: 'absolute'
    }
})

export default AnimatedComponent;