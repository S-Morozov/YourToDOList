
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';



const Stack = createNativeStackNavigator();

const insideStack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);



function insideLayout() {
  return  (
    <insideStack.Navigator>
      <insideStack.Screen name='My todos' component={List}/>
    </insideStack.Navigator>
  )
}

useEffect(()=>{
  onAuthStateChanged(FIREBASE_AUTH, (user)=>{
    console.log('user', user);
    setUser(user);
  });
},[]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
  
        {user ? (
                <Stack.Screen name='Inside' component={insideLayout} options={{headerShown:false}}/> ): <Stack.Screen name='Login' options={{headerShown:false}} component={Login}/>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
