import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `chats/messages/${id}`), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
            // console.log(doc.data().message);
        });
        setChatMessages(data);
    });
    return unsubscribe;
  }, []);

  return (
    <ListItem onPress={ () => enterChat(id, chatName)} key={id} bottomDivider>
        <Avatar
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL || "https://i.pinimg.com/736x/a2/11/7e/a2117e75dc55c149c2c68cbadee1f16e.jpg"
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>{chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})



