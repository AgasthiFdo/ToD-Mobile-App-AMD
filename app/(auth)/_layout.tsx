import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome To Your Private To Do App</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b1d5f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
























// import { View, Text } from "react-native"
// import React from "react"
// import { Slot, Stack } from "expo-router"

// const AuthLayout = () => {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         animation: "slide_from_right"
//       }}
//     >
//       <Stack.Screen name="login" options={{ title: "Login" }} />
//       <Stack.Screen name="register" options={{ title: "Register" }} />
//     </Stack>
//   )
// }

// export default AuthLayout
