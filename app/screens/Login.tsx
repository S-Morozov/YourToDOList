import {View,Text, Button, StyleSheet, TextInput, ActivityIndicator, ImageBackground} from 'react-native';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';


const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email,password);
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }


    const signUp = async() => {
        setLoading(true);

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('check your emails!');
        } catch(error: any) {
            console.log(error)
            alert('Registration failed: ' + error.message);
        } finally{
            setLoading(false);
        }
    
    };

    const image = {uri: 'http://wallpapers.net/web/wallpapers/top-view-of-colored-pencils-hd-wallpaper/640x960.jpg'};



  
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.containerform}>
            <Text style={styles.Text}> Your ToDoList </Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={(text: string) => setEmail(text)}
            value={email} autoCapitalize='none' // Pass the email state variable as the value
          />
          <TextInput
            style={styles.input} secureTextEntry={true}
            textContentType='password'
            placeholder='Password'
            onChangeText={(text: string) => setPassword(text)}
            value={password} // Pass the password state variable as the value
          />

          {loading ? (
            <ActivityIndicator size='large' color={'#0000ff'}/>
          ) : (
            <>
          <Button onPress={signUp} title='Create account' />
          <Button onPress={signIn} title='Sign in' />
          </>
          )}

        </View>
        </ImageBackground>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
      },
      containerform: {
        flex:1,
        marginHorizontal: 20,
        flexDirection: 'column',
        paddingVertical: 40,
      },
      input: {
        marginVertical: 4,
        height: 60,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'white',
      },

      Text: {
        padding: 5,
        fontFamily: 'Cochin',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red',
      },
    });
    
    export default Login;