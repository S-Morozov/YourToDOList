import {View, Text, Button, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons'
import {Entypo} from "@expo/vector-icons"
import { NavigationProp } from '@react-navigation/native';
import Login from './Login';


export interface Todo {
    title: string;
    done: boolean;
    id: string;
}


interface RouterProps{
    navigation: NavigationProp<any, any>;
}



const List = ({navigation}: RouterProps) => {
    const [todos, setTodos] = useState <any[]> ([]);
    const [todo, setTodo]=useState('');


    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');


    const subscriber = onSnapshot(todoRef, {
        next: (querySnapshot) => {
            console.log('UPDATED');



        const todos: any[] = [];
        querySnapshot.docs.forEach((doc) => {
            console.log(doc.data());
            
            todos.push({
                id: doc.id,
                ...doc.data(),
                } as Todo);
            });
      // Update the state with the todos array
      setTodos(todos);
    },
  });

  return () => subscriber();
    }, []);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo, done:false});
        setTodo('')
    }



    const renderTodo = ({item}: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)

       
        const toggleDone = async() => {
            updateDoc(ref, {done: !item.done});
        };

        const deleteItem = async()=>{
            deleteDoc(ref);

        }

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                {item.done && <Ionicons name= 'md-checkmark-circle'/>}
                {!item.done && <Entypo name= 'circle' size={24} color='black'/>}
                <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size={24} color='red' onPress={deleteItem}/>
            </View>
        )

    };

  return (
    <View style={styles.container}>
        <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Add new todo' onChangeText={(text: string) => setTodo(text)}value={todo}/>
        <Button onPress={addTodo} title='Add Todo' disabled={todo===''}></Button>
        </View>
            {todos.length > 0 && (
                <View>
                    <FlatList data={todos} renderItem={(item)=> renderTodo(item)} keyExtractor={(todo: Todo) => todo.id}/>
                </View>
            )}
            <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'></Button>

    </View>
  )
}

export default List;

const styles= StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },

    form: {
        marginVertical:20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:10,
    },

    input: {
        flex:1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'white',
    },

    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginVertical: 4,

    },

    todoText: {
        flex: 1,
        paddingHorizontal:5,
    },

    todo: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',

    }


})