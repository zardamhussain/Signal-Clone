import { StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Text, Button } from 'react-native-elements'
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { router } from 'expo-router'

const register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setimageURL] = useState('');

  const getRandomNo = () => Math.floor(Math.random() * 100) + 1;


  const register = async () => {
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageURL || `https://source.unsplash.com/random/200x200?sig=${getRandomNo()}`,
      })

      router.replace('/homeScreen')

    }
    catch(err) {
      Alert.alert(
        'Error',
        `${err}`,
        [ {text: 'Ok', onPress: () => {}}],
        { cancelable: true }
        )
    };

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='light'></StatusBar>

      <Text h3 style={{marginBottom: 50, }}>Create a Signal Account</Text>

      <View style={styles.inputContainer}>
        <Input style={styles.input}
            autoFocus
						placeholder='Full Name'
            value={name}
						onChangeText={text => setName(text)}
			  />
        <Input style={styles.input}
            placeholder='Email'
            value={email}
						onChangeText={text => setEmail(text)}
			  />
        <Input style={styles.input}
            secureTextEntry
            placeholder='Password'
            value={password}
						onChangeText={text => setPassword(text)}
			  />
        <Input style={styles.input}
            placeholder='Profile Pic URL (Optional)'
            value={imageURL}
						onChangeText={text => setimageURL(text)}
            onSubmitEditing={register}
			  />
      </View>

      <Button
				title='Register'
				containerStyle={styles.button}
				onPress={register}
			/>

    </KeyboardAvoidingView>
  )
}

export default register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: 300
  },
  input: {
    textAlign: 'center',
  },
  button : {
    width: 200
  }
})
