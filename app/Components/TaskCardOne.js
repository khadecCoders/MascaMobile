import { View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider, Text, Menu } from 'react-native-paper'
import myTheme from '../utils/theme'

const TaskCard = ({title, author, image, uploadTime, onCardPress,size,status, reactions}) => {
  console.log(reactions, " reactions")
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  return (
    <>
   <View style={{justifyContent: 'center', alignItems: 'center'}}>
     <TouchableOpacity onPress={onCardPress} style={{flex: 1,flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginVertical: 5, width: screenWidth}}>
        <Image source={image} style={size === "large" ? STYLES.homeCardImageLarge : STYLES.homeCardImage} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
            <View>
                <Text style={[STYLES.textNormal, {fontFamily: 'DMSansBold', color: COLORS.onTertiaryContainer}]}>{title}</Text>
                <Text style={[STYLES.textNormal]}>{uploadTime}</Text>
                <Text style={STYLES.textNormal1}>{reactions}</Text>
            </View>
        </View>
    </TouchableOpacity>
   </View>
    <Divider/>
    </>
  )
}

export default TaskCard;