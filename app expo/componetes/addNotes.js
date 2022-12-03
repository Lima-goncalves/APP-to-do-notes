import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {Text,StyleSheet,View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput,TouchableOpacity, Alert} from "react-native";
import * as Style from '../assets/styles';
const AddNotes =({navigation,...props}) =>{
    return(
      <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS ==='ios'? 'padding' : 'height'} >
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{padding:20,justifyContent:'space-around'}}>
                            <TextInput style={styles.input} placeholder="Escreva aqui..."
                            multiline={true}
                            value={props.note} onChangeText={(text) => props.setNote(text)}/>

                             <TouchableOpacity style={styles.button} onPress={() => {

                                if(props.note ===''){
                                    Alert.alert('plase type something');
                                }else{
                                    props.handleNote();
                                    navigation.navigate('Notes')
                                }
                            }}>
                                <Text style={styles.buttonText}>Adicionar</Text>
                            </TouchableOpacity>
                    </View>
                    
                </TouchableWithoutFeedback>


            </KeyboardAvoidingView>

      </ScrollView>
    )
}
export const styles = StyleSheet.create({
    AddNoteContainer:{
        paddingHorizontal:20,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',

    },
    button:{
        backgroundColor:Style.color,
        width:'40%',
        borderRadius:100,
        justifyContent:'center',

        alignItems:'center',
        alignSelf: 'flex-end',
        height:40,
        marginTop:20,
        },
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'800'
    },
    headingContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    input:{
       padding:20,
       paddingTop:20,
       width:'100%',
       fontSize:19,
       color:'black',
       fontWeight:'600',
       opacity:0.8,
       shadowColor:Style.color,
       shadowOpacity:0.4,
       shadowOffset:{width:0,height:4},
       shadowRadius:8,
       elevation:5,
        borderColor:Style.color,
        borderWidth:2,
        borderRadius:5,
        height:300,


    },
})



export default AddNotes;