import { Stack } from "expo-router";

export default () => <Stack screenOptions={{
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerBackVisible: false,
}}
>
    <Stack.Screen name="index" options={{title: "Login"}}></Stack.Screen>
    <Stack.Screen name="register" options={{title: "Register"}}></Stack.Screen>
    <Stack.Screen name="homeScreen" options={{title: "Signal", headerStyle: { backgroundColor: 'white'}, headerTitleStyle: {color: 'black'}, headerShadowVisible:false }}></Stack.Screen>

</Stack>
