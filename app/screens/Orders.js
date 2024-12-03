import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import myTheme from '../utils/theme';
import {
    MaterialIcons,
  } from "@expo/vector-icons";
import {Button} from 'react-native-paper';
import Header from '../Components/Header';
import TaskCard from '../Components/TaskCard';
import { ref, set, onValue, remove, update, push } from 'firebase/database'
import { auth, db, storage } from '../config'
import { useLogin } from '../utils/LoginProvider';
import { StatusBar } from 'expo-status-bar';

var currentTask=[];

const Orders = ({ navigation }) => {
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const [tasks, setTasks] = useState([]);
  const { profile, themeDark } = useLogin();

  useEffect(() => {
    const tasksRef = ref(db, 'tasks/');
    onValue(tasksRef, (snapshot) => {
        setTasks([]);
        currentTask=[];
        const data = snapshot.val();
        if (data) {
            const newTasks = Object.keys(data)
                .map(key => ({
                    id: key,
                    ...data[key]
                }));
            for (const item in newTasks){
              if(newTasks[item].readBy){
                var readByArray= newTasks[item].readBy;
              var tempReadBy=readByArray.filter((item)=> item === profile.userId);
              if(tempReadBy.length>0){
                currentTask.push({id: newTasks[item].id,title:newTasks[item].title,uploadTime:newTasks[item].uploadTime,status:'Done',author:newTasks[item].author,size:newTasks[item].size,content:newTasks[item].content, readByArray: readByArray})
              }
              else{
                currentTask.push({id: newTasks[item].id,title:newTasks[item].title,uploadTime:newTasks[item].uploadTime,status:'Pending',author:newTasks[item].author,size:newTasks[item].size,content:newTasks[item].content, readByArray: readByArray})
              }
              }
            }
            setTasks(currentTask);
        }
    });
}, [])

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
        Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
};
  const CustomHeader = () => (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
       <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
         console.log('create task')
       }}>
         <MaterialIcons color={COLORS.outline} name='search' size={15}/>
       </TouchableOpacity>
    </View>
   )
      return (
        <View style={[styles.container, {backgroundColor: COLORS.surface}]}>
        <StatusBar style={themeDark ? 'light' : 'dark'} />
        <Header 
          style={{width:screenWidth}}
          title='Tasks' 
          titleColor={COLORS.outline}
          rightView={<CustomHeader/>}
        />
        <ScrollView horizontal={true} onScroll={onScroll} showsVerticalScrollIndicator={true}>
            <FlatList
                data={currentTask}
                key={(item, index) => index}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                <TaskCard
                    size="large"
                    title={item.title} 
                    author={item.author} 
                    uploadTime={item.uploadTime}
                    image={item.profilePicture ? ({uri: item.profilePicture}):(require('../assets/Welcome2.png'))} 
                    onCardPress={() => navigation.navigate('LessonDetails',{details:item.content,title:item.title,target:item.id, readByArray: item.readByArray, status: item.status})} 
                    status={item.status}
                />
                )}
            />
        </ScrollView>
        </View>
        )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    map: {
      flex: 1,
      width: '100%',
      height: 300,
      borderRadius: 10
  },
  markerFixed: {
      left: '50%',
      marginLeft: -24,
      marginTop: -48,
      position: 'absolute',
      top: '50%'
    },
    marker: {
      height: 48,
      width: 48
    },
    shadow: {
        shadowOffset: {
          width: 3,
          height: 0.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        
    }
})