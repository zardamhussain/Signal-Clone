
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, Timestamp, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Avatar } from 'react-native-elements';


const chatRoom = ( prop ) => {
  const { chat, id } = useLocalSearchParams();
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `chats/messages/${id}`), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push([doc.id, doc.data()]);
            // console.log(doc.data().message);
        });
        setMsg(data);
    });
    return unsubscribe;
  }, []);


  const sendMessage = async () => {
    Keyboard.dismiss();
    const ref = collection(db, `chats/messages/${id}`);
    await setDoc(doc(ref), {
        timestamp: Timestamp.now(),
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        message:  input,
        photoURL: auth.currentUser.photoURL,
    });
    setInput('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Screen options={{
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerTitle: () => (
              <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Avatar rounded source={{
                    uri: msg[0]?.[1]?.photoURL || "https://i.pinimg.com/736x/a2/11/7e/a2117e75dc55c149c2c68cbadee1f16e.jpg"
                }}/>
                <Text style={{ color:'white', marginLeft:10, fontWeight:'700', fontSize: 17 }}>{chat}</Text>
            </View>
        ),
        headerRight: () => (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
                marginRight: 10
            }}>
                <TouchableOpacity>
                <Ionicons name="videocam" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }}/>

      <StatusBar style='light'/>

      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        style={styles.container}
        >

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
            <ScrollView contentContainerStyle={{paddingTop: 10}}>{
              msg.map(([id, data]) => (
                auth.currentUser.email === data.email ? (
                    <View key={id} style={styles.receiver}>
                        <Avatar
                            position='absolute'
                            bottom={-15}
                            right={-5}
                            size={30}
                            rounded
                            source={{ uri: data.photoURL }}
                        />
                        <Text style={styles.receiverText}>{data.message}</Text>
                    </View>
                ) : (
                    <View key={id} style={styles.sender}>
                        <Avatar
                          position='absolute'
                          bottom={-15}
                          left={-5}
                          size={30}
                          rounded
                          source={{ uri: data.photoURL }}
                        />
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                )
              ))
            }</ScrollView>

            <View style={styles.footer}>
                <TextInput style={styles.input} value={input} placeholder='Signal Message'
                onChangeText={text => setInput(text)} onSubmitEditing={sendMessage}/>
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons name='send' size={24} color='#2B68E6' />
                </TouchableOpacity>
            </View>
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default chatRoom

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15
    },
    input: {
        flex: 1,
        bottom: 0,
        height: 40,
        backgroundColor: '#ECECEC',
        borderRadius: 20,
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        marginRight: 10
    },
    receiver : {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        borderRadius:20,
        position: 'relative'
    },
    sender : {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        borderRadius:20,
        position: 'relative'
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 15,
        marginBottom: 2
    },
    receiverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10
    }
})
