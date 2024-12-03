import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import { ref, set, onValue, remove, update, push } from 'firebase/database';
import Header from '../Components/Header';
import myTheme from '../utils/theme';
import { useNavigation } from "@react-navigation/native";
import { useLogin } from '../utils/LoginProvider';
import { auth, db, storage } from '../config';
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import TaskCard from '../Components/TaskCardOne';
import { StatusBar } from 'expo-status-bar';

var Messages = [];
const messages3 = [];

const MessagesScreen = () => {

  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const navigation = useNavigation();
  const { profile, themeDark } = useLogin();
  const [messages, setMessages] = useState([]);
  const [fb, setFb] = useState([]);

  useEffect(() => {
    const fbRef = ref(db, 'chats/');
    
    onValue(fbRef, async(snapshot) => {
      const data = snapshot.val();
      if (data) {
          const newData = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key]
        }));

        setFb(newData);
      }else{
        console.log('No replies')
      }
    })
  }, [])
  
  useEffect(() => {
    const chatsRef = ref(db, 'tasks/');
    const usersRef = ref(db, 'users/');

    var usersNewData = [];
    Messages=[];

    onValue(chatsRef, async(snapshot) => {
        const data = snapshot.val();
        if (data) {

          const newData = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key]
        }));
   
       var userMessages = newData;
       //console.log(newData);

       for(const item in userMessages){
            Messages.push({
            id: userMessages[item].id,
            userId:userMessages[item].id,
            userName: 'Lesson '+ userMessages[item].id + ' Feedback',
            userImg: require('../assets/images/icon.png'),
            messageTime: userMessages[item].uploadTime.split('T')[0] + ' '+userMessages[item].uploadTime.split('T')[1].split(':')[0]+':'+userMessages[item].uploadTime.split('T')[1].split(':')[1]+'         ',
            messageText:''})
          }
        }
        else{
          console.log('no data')
        }
        
      });

  }, [])

const onSend = useCallback((currMessage) => {
  setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, currMessage),
  );

  let _id = new Date().toISOString().replace(/[^1-9a-zA-Z]/g, "");

  push(ref(db, 'chats'), {
    _id: _id,
    receiver_id:userIdsa,
    text: currMessage,
    createdAt:new Date().toISOString(),
    user: {
      _id: profile.userId,
      name: profile.username,
      avatar: profile.profilePicture,
    },
    sent: true,
    received: false

  }).then(() => {
    // sendPushNotification(`New message`, `${profile.username} has sent you a new chat message.`, userTkn);     
  }).catch((error) => {
    let errorMessage = error.message.replace(/[()]/g," ");
    //console.log(errorMessage);
  })
}, []);


const onScroll = ({ nativeEvent }) => {
  const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

  setIsExtended(currentScrollPosition <= 0);
};

const CustomHeader = () => (
  <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>

  </View>
 )
    return (
      <View style={[styles.container, {backgroundColor: COLORS.surface}]}>
      <StatusBar style={themeDark ? 'light' : 'dark'} />

      <Header 
        style={{width:screenWidth}}
        title='Lessons Feedback' 
        titleColor={COLORS.outline}
        rightView={<CustomHeader/>}
      />
      <ScrollView horizontal={true} onScroll={onScroll} showsVerticalScrollIndicator={true}>
        <FlatList 
          data={Messages}
          key={(item, index) => index}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
          <TaskCard
              size="large"
              title={item.userName} 
              author={item.id} 
              uploadTime={item.messageTime}
              image={item.profilePicture ? ({uri: item.profilePicture}):(require('../assets/Welcome2.png'))} 
              onCardPress={() => {
                const myFB = fb.filter((fb) => fb.receiver_id === item.id)
                console.log("My feedbacks, ", myFB)
                navigation.navigate('FeedBackDetails',{details:item.content,title:item.title,target:item.id})
              }} 
              status={item.messageText}
          />
          )}
        />
      </ScrollView>
      </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});