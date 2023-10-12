import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native'
import React, { useEffect,  useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Stack, router } from 'expo-router';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { db } from '../firebase';
import { collection, doc, onSnapshot, query} from 'firebase/firestore'


const homeScreen = () => {

  const [chats, setChats] = useState([]);

  useEffect(() => {

    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsRooms = [];
      querySnapshot.forEach((doc) => {
        chatsRooms.push([doc.id, doc.data().chatName]);
      });
      setChats(chatsRooms);
    });
    return unsubscribe;
  }, []);

  const signOutUser = async () => {
    await signOut(auth);
    router.replace('/login')
  }

  const enterChat = (id, chatName) => {
    router.push({pathname: `/${chatName}`, params:{id}});
    console.log(id, chatName)
  }

  return (

    <SafeAreaView>
      <Stack.Screen options={{
        headerTitleAlign: 'left',
        headerLeft: () => (
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser} style={{paddingRight: 10}}>
              <Avatar rounded source={{ uri:  auth.currentUser.photoURL }}/>
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}>

            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={25} color='black'/>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={() => router.push('/addChat')}>
              <SimpleLineIcons name='pencil' size={22} color='black'/>
            </TouchableOpacity>

          </View>
        )
      }} />

      <ScrollView style={{height: '100%'}}>
        {chats.map((c) => (<CustomListItem key={c[0]} id={c[0]} chatName={c[1]} enterChat={enterChat}/>))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default homeScreen

const styles = StyleSheet.create({})

