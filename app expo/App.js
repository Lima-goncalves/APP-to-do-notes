import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from './componetes/Notes';
import AddNotes from './componetes/addNotes'
import Delete from './componetes/Delete';

const Stack = createNativeStackNavigator();

export default function App() {
  const [note,setNote]=useState();
  const [notes,setNotes]=useState([]);
  const[date,setDate]=useState(new Date().toUTCString());
  const [moveToBin,setMoveToBin]= useState ([])

  function handleNote(){
    let newNote = note;
    let newNotes = [newNote,...notes];
    setNotes(newNotes);
    setNote('');
    

  }

  return (
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Notes'>
          {props => <Notes {...props}  moveToBin={moveToBin} 
           setMoveToBin={setMoveToBin}  notes={notes} setNotes={setNotes} note={note} setNote={setNote} date={date} setDate={setDate}/>}
        </Stack.Screen>
        <Stack.Screen name="AddNotes">
          {props => <AddNotes {...props} note={note} setNote={setNote} handleNote={handleNote}/>}
        </Stack.Screen>
        <Stack.Screen name="Delete">
          {props => <Delete {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} date={date}/>}
        </Stack.Screen>
      </Stack.Navigator>
   </NavigationContainer>
  );
}


