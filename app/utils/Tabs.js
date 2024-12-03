import { StyleSheet, View, Platform } from 'react-native'
import React from 'react'
import { shadow, Text } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Orders from "../screens/Orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Account from "../screens/Account";
import About from "../screens/About"
import TermsAndCons from "../screens/TermsAndCons";
import More from "../screens/More";
import Chats from "../screens/Chats";
import MessagesScreen from "../screens/MessagesScreen";
import Help from "../screens/Help";
import myTheme from './theme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useLogin } from './LoginProvider';
import LessonDetails from '../screens/LessonDetails';
import FeedBackDetails from '../screens/FeedBackDetails';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const { profile } = useLogin();

  return (
    <Tab.Navigator
        screenOptions = {({ route }) =>({
          tabBarLabel: '',
          headerShown: false,
          tabBarStyle: {
            width: '100%',
            backgroundColor: COLORS.background,
            paddingBottom: Platform.OS === 'android' ? 10 : 0,
            height: 70,
            paddingHorizontal: 10
          }    
    })}
    >
        <Tab.Screen name='Tasks' component={Orders} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='file-document-multiple-outline' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Tasks</Text>
            </View>
          ) 
        }}/>

        <Tab.Screen name='Messages' component={MessagesScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='wechat' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Feedback</Text>
            </View>
          ),
          
        }}/>

        <Tab.Screen name='Chats' component={Chats} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='wechat' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Messages</Text>
            </View>
          ) ,  tabBarButton: () => null
        }}/>

       <Tab.Screen name='LessonDetails' component={LessonDetails} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='wechat' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Lesson</Text>
            </View>
          ) ,  tabBarButton: () => null
        }}/>

       <Tab.Screen name='FeedBackDetails' component={FeedBackDetails} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='wechat' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Lesson</Text>
            </View>
          ) ,  tabBarButton: () => null
        }}/>


        <Tab.Screen name='Account' component={Account} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='account' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Account</Text>
            </View>
          ), 
          tabBarButton: () => {
            if(profile.accountType === "Public"){
              return null
            } else {return true}
          }
        }}/>

        <Tab.Screen name='More' component={More} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='forwardburger' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>More</Text>
            </View>
          )
        }}/>

        <Tab.Screen name='About'  component={About} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='backburger' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>About</Text>
            </View>
          ),
          tabBarButton: () => null
        }}/>

        <Tab.Screen name='T&C'  component={TermsAndCons} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='backburger' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Terms</Text>
            </View>
          ),
          tabBarButton: () => null
        }}/>

        <Tab.Screen name='Terms'  component={TermsAndCons} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='backburger' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Terms</Text>
            </View>
          ),
          tabBarButton: () => null
        }}/>

        <Tab.Screen name='Help'  component={Help} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <MaterialCommunityIcons name='help' size={20} color={focused ? COLORS.button : COLORS.outline}/>
              <Text style={{color: focused ? COLORS.button : COLORS.outline, fontSize: 13}}>Help Desk</Text>
            </View>
          ),
          tabBarButton: () => null
        }}/>
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
})