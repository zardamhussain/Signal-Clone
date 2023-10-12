import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { db } from '../firebase';
import { collection, doc, setDoc, } from 'firebase/firestore'

const addChat = () => {
  const [input, setInput] = useState('');

  const createChat = async () => {
    try {
        const ref = collection(db, 'chats');
        await setDoc(doc(ref), { chatName: input});
        router.back();
    }catch(err) {
        Alert.alert(
			'Error',
			`${err}`,
			[ {text: 'Ok', onPress: () => {}}],
			{ cancelable: true }
		)
    }
  };

  return (
    <View style={{padding: 20}}>
      <Stack.Screen options={{title: 'Add A New Chat'}}/>
      <Input
        style={{textAlign: 'center'}}
        placeholder='Enter Chat Name'
        value={input}
        onChangeText={text => setInput(text)}
        leftIcon={() => <AntDesign name="wechat" size={24} color="black" />}
      />
      <Button onPress={createChat} title='Create New Chat'/>
    </View>
  )
}

export default addChat

const styles = StyleSheet.create({})
