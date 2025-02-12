import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import svg, { G, Circle, Svg } from 'react-native-svg';
import AntDesign from '@expo/vector-icons/AntDesign';

const NextButton = ({ percentage, scrollTo }) => {
    const size = 60;   
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }
    
    useEffect(() => {
        animation(percentage)
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
 
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        }, [percentage]);
    });
 
  return (
    <View style={styles.container}>
        <Svg width={size} height={size}>
           <G rotation="-90" origin={center}>
            <Circle stroke="rgb(218, 37, 29)" cx={center} cy={center} fill='none' r={radius} strokeWidth={strokeWidth}
                
                />
           </G>
        </Svg>
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.3}>
            <AntDesign name="arrowright" size={32} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
    container: {
        // flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        backgroundColor: 'rgb(218, 37, 29)',
        borderRadius: 100,
        padding: 5
    }
})