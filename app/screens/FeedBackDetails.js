import React, { useCallback, useEffect, useState } from 'react'
import Header from '../Components/Header';
import { ScrollView,useWindowDimensions, StyleSheet,View, Platform, KeyboardAvoidingView } from 'react-native'
import myTheme from '../utils/theme';
import {  Button, Text } from 'react-native-paper';
import RenderHTML from "react-native-render-html";
import { useLogin } from '../utils/LoginProvider';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import { auth, db, storage } from '../config';
import { ref, set,push, onValue, update } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

var newMessages=[];

function FeedBackDetails({route}) {
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

 useEffect(() => {

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
     for(const item in whatever){

      if(whatever[item].receiver_id === target &&  whatever[item].user._id===profile.userId){
        newMessages.push(whatever[item]);
      }
      if(whatever[item].user._id === profile.userId && whatever[item].receiver_id=== target){
          newMessages.push(whatever[item]);
      }
     }
     console.log("Messages: ",whatever)
     setMessages(whatever);
    }
  })
}, [userIds]);


 const onSend = useCallback((currMessage) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, currMessage),
    );

    let _id = new Date().toISOString().replace(/[^1-9a-zA-Z]/g, "");

    push(ref(db, 'chats'), {
      _id: _id,
      receiver_id:target,
      text: currMessage,
      createdAt:new Date().toISOString(),
      user: {
        _id: profile.userId,
        name: profile.username,
        avatar: profile.profilePicture,
      },
      sent: true,
      received: true

    }).then(() => {
    //   sendPushNotification(`New message`, `${profile.username} has sent you a new chat message.`, userTkn); 
    setCurrMessage('')

    }).catch((error) => {
      let errorMessage = error.message.replace(/[()]/g," ");
      //console.log(errorMessage);
    })
  }, []);

  const renderSend = (props) => {
    return (
      <TouchableOpacity onPress={() => {
        if(currMessage){
          onSend(currMessage)
        }else{
        }
      }}>
        <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
      </TouchableOpacity>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
      onPress={() => console.log(1)}
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left: {
            backgroundColor: '#fff',
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left:{
            color: COLORS.outline
          }
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const BackHandler = () => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', borderRadius: 60, paddingRight: 0}} onPress={() => {
            navigate('Messages')
        }}>
            <AntDesign color={COLORS.outline} name='left' size={18}/>
        </TouchableOpacity>
    </View>
   )


  return (
    <View style={{backgroundColor: COLORS.surface, flex: 1}}>
      <StatusBar style={themeDark ? 'light' : 'dark'} />
      <Header leftView={<BackHandler />} title="Feedback" titleColor={COLORS.outline}/>
        <GiftedChat
          messages={messages}
          onSend={()=> setCurrMessage('')}
          user={{
            _id: profile.userId,
          }}
          messagesContainerStyle={{
            backgroundColor: COLORS.surface,
            width: '100%'
          }}
          onInputTextChanged={(val) => setCurrMessage(val)}
          renderBubble={renderBubble}
          renderUsernameOnMessage={true}
          renderSend={renderSend}
          scrollToBottom
          text={currMessage}
          scrollToBottomComponent={scrollToBottomComponent}
        />
        {
            Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />
        }
    </View>
  )
}

export default FeedBackDetails;