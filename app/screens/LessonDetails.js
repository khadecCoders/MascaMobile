import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Components/Header';
import { ScrollView,useWindowDimensions, StyleSheet,View } from 'react-native'
import myTheme from '../utils/theme';
import {  Button, Text } from 'react-native-paper';
import RenderHTML from "react-native-render-html";
import { useLogin } from '../utils/LoginProvider';
import { auth, db, storage } from '../config';
import { ref, set,push, onValue, update } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

var newMessages=[];

function LessonDetails({route}) {
 const { profile, themeDark } = useLogin();
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const { width } = useWindowDimensions();
 const {title} = route.params;
 const { navigate } = useNavigation()
 const {details} = route.params;
 const {target, readByArray, status} = route.params;
 const what = {html:details}
 const {userName, userIds} = route.params;
 const [messages, setMessages] = useState([]);
 const [currMessage, setCurrMessage] = useState('');
 console.log("Target: ", target);

 useEffect(() => {
  console.log("Read by array: ", readByArray)

  setCurrMessage('');
  const chatsRef = ref(db, 'chats/');
  onValue(chatsRef, async(snapshot) => {

  const data = snapshot.val();

  setMessages([]);
  newMessages=[];

  if (data) {
    newData = Object.keys(data)
     .map(key => ({
         id: key,
         ...data[key]
     }));

     const whatever = (newData.filter((item) => item.receiver_id === target || item.user._id === profile.userId).reverse()); 
    // //console.log(whatever); 
     for(const item in whatever){

      if(whatever[item].receiver_id === target && whatever[item]){
        newMessages.push(whatever[item]);
      }
      // if(whatever[item].user._id === profile.userId && whatever[item].receiver_id=== userIds){
      //     newMessages.push(whatever[item]);
      // }
     }
     console.log("Messages: ",newMessages)
    //  setMessages(newMessages);
    }
  })
}, [userIds]);

 const finishUp = () => {
  console.log("Target: ", target);
  onSend(currMessage);
 }
  
  const onSend = useCallback((currMessage) => {
    console.log("Uploading");

    let _id = new Date().toISOString().replace(/[^1-9a-zA-Z]/g, "");

    push(ref(db, 'chats'), {
      _id: _id,
      receiver_id:target,
      text: "Done",
      createdAt:new Date().toISOString(),
      user: {
        _id: profile.userId,
        name: profile.username,
        avatar: profile.profilePicture,
      },
      sent: true,
      received: true

    }).then(async() => {
     await readByArray.push(profile.userId);
      console.log(readByArray);
      update(ref(db, 'tasks/' + target), {
        readBy: readByArray
      }).then(() => {
        alert("Done");
      })
    }).catch((error) => {
      let errorMessage = error.message.replace(/[()]/g," ");
      console.log(errorMessage);
    })
  }, []);

  const BackHandler = () => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', borderRadius: 60, paddingRight: 0}} onPress={() => {
            navigate('Tasks')
        }}>
            <AntDesign color={COLORS.outline} name='left' size={18}/>
        </TouchableOpacity>
    </View>
   )


  return (
    <View style={{flex: 1}}>
      <StatusBar style={themeDark ? 'light' : 'dark'} />

      <Header leftView={<BackHandler />} title="Lesson Content" titleColor={COLORS.outline}/>
      <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <Text style={{fontSize: 20, fontFamily: 'DMSansBold', color: COLORS.outline,textDecorationLine: 'underline'}}>{title}</Text>
          <RenderHTML contentWidth={width} classesStyles source={ what } />
            {status === "Pending" ? (
              <>
                <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline ,paddingTop:20}}>Click Done Below When you have finished!
          </Text>
              <Button style={{backgroundColor: "#2ac780", borderRadius: 0}} mode="contained" labelStyle={{fontSize:20}} onPress={() => finishUp()}>
                Done
              </Button>
              </>
            ):(
              <></>
            )}
          <View style={{height:30}}>

          </View>
      </ScrollView>
    </View>
  )
}

export default LessonDetails;