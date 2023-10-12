import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, } from 'react-native';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements';
import { Link, useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const login = () => {
	const router =  useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, authUser => {
			if(authUser) router.replace('/homeScreen')
		})
		return unSub;
	}, []);

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
		.catch(err => Alert.alert(
			'Error',
			`${err}`,
			[ {text: 'Ok', onPress: () => {}}],
			{ cancelable: true }
		  )
		);
	}

  return (
    <KeyboardAvoidingView style={styles.login}>
      <StatusBar style='auto' />
      <Image
          source={{
              uri: "https://imgs.search.brave.com/ZJq_9wl-P0lE0bOAk9C2Ls9v6Zag5OucEAXBcZMTsxg/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi84LzhkL1Np/Z25hbC1Mb2dvLnN2/Zy82NDBweC1TaWdu/YWwtTG9nby5zdmcu/cG5n"
          }}
          style={{width:180, height:180, borderRadius:20}}
      />

      <View style={styles.inputContainer}>
          <Input
						style={styles.input}
						autoFocus
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

      </View>

			<Button
				title='LOGIN'
				containerStyle={styles.button}
				onPress={signIn}
			/>

			<Button
				title='Register'
				type='outline'
				containerStyle={styles.button}
				onPress={() => router.push('/register')}
			/>

    </KeyboardAvoidingView>
  )
}

export default login


const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
				justifyContent: 'center',
				gap: 5
    },
    inputContainer: {
			paddingTop: 20,
      width: 300,
    },
    input : {
        textAlign: 'center',
    },
    button : {
			width: 200
    }
})
