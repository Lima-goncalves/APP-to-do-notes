import React, { useState } from "react";
import { Text,StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Alert, Keyboard,} from "react-native";
import * as Style from '../assets/styles';

//IMPOTE UI KITTEN PARA ICONS E  COMPONENTES 
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout,Icon} from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { PropsService } from "@ui-kitten/components/devsupport";
//ICONES


const Notes =({navigation,...props})=>{

    const [searchNote, setSearchNote] = useState();

    function deleteNotes(index){
        let newArray=[...props.notes];
        let movedNote=newArray.splice(index,1);
        props.setNotes(newArray);
        props.setMoveToBin(movedNote);

        let bin=[movedNote,...props.moveToBin];
        props.setMoveToBin(bin)
    }
    function search(){
        if(searchNote==''){
            Alert.alert('Não encontramos essa pesquisa...')
        }else if (searchNote !==''){
            props.notes.forEach((item,index)=> {
                if (item.includes(searchNote)){
                    let searchItem = [...props.notes]
                    let fristEloArry = searchItem[0]
                    let index =[...props.notes].indexOf(item)
                    searchItem[0]=item
                    searchItem[index]=fristEloArry
                    props.setNotes(searchItem)

                }
            })
        }
        setSearchNote('');
        Keyboard.dismiss();

    }
    function limparTudo(){
        let emptyArry =[...props.notes]
        let deleteitem =[...props.moveToBin]
        emptyArry=[];
        props.setNotes(emptyArry)
        
    }
    return(
       <View style={(styles.noteContener)}>
            <View style={(styles.headingContainer)}>

                    <Text style={(styles.heading)}>Suas Anotações</Text>

                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={[styles.button,{marginLeft:10}]} onPress={()=>navigation.navigate('Delete')}>
                            <IconRegistry icons={EvaIconsPack}/>
                            <ApplicationProvider {...eva} theme={eva.light}>
                                <Icon name='trash-2-outline' fill="white" style={{width:25, height: 50,}}/>
                            </ApplicationProvider>                   
                             
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate('AddNotes') } >
                            <IconRegistry icons={EvaIconsPack}/>
                            <ApplicationProvider {...eva} theme={eva.light}>
                                <Icon name='plus-outline' fill="white" style={{width:25, height: 50,}}/>
                            </ApplicationProvider>                   
                             
                        </TouchableOpacity>
                    </View>               
            </View> 
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'700',fontSize:18,color:Style.color}}>
                    Total: {props.notes.length}
                </Text>
            </View>
             <View style={styles.divider}></View>
             <View style={styles.searchContainer}>
                <TextInput placeholder='Pesquisar...' placeholderTextColor={Style.color} 
                style={[styles.input,{borderWidth:3}]}
                value={searchNote} onChangeText={(text)=> setSearchNote(text)}
                />
                <TouchableOpacity style= {[styles.searchButton,{width:50}]} onPress={()=>search()}>
                <IconRegistry icons={EvaIconsPack}/>
                            <ApplicationProvider {...eva} theme={eva.light}>
                                <Icon name='search' fill="white" style={{width:22, height: 40,}}/>
                            </ApplicationProvider> 
                            
                </TouchableOpacity>
                <TouchableOpacity style= {[styles.searchButton,]} onPress ={()=>limparTudo()}>
                            <Text style={styles.searchButtonText}>Limapr</Text>
                </TouchableOpacity>
                
             </View>
             <ScrollView style={[styles.scrollView]} showsVerticalScrollIndicator={false}>
                {props.notes.length === 0 
                ?
                <View style={styles.emptyNoteContainer}>
                    <Text style={styles.emptyNoteText}>Ainda não possui uma anotação, click no + para começar!...</Text>
                </View>
                :
                props.notes.map((item,index) =>
                <View Style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={styles.item} key={index}>
                        <View style={styles.note}>
                            <Text style={styles.index}> {index + 1}. </Text>
                            <Text style={styles.text}>{item}</Text>
                            <TouchableOpacity onPress={()=> deleteNotes(index)}>
                                <Text style={styles.delete}>       X</Text>
                            </TouchableOpacity>


                        </View>   
                        <View style={styles.dateContainer}>
                            <Text>{props.date}</Text>
                            <TouchableOpacity>
                            <Text style={styles.delete}>Edit</Text>
                            </TouchableOpacity> 
                        </View>
                        </View>
                    </View>
                
                )}
            </ScrollView>
       </View>
        


    )
}
export const styles = StyleSheet.create({
    noteContener:{
        paddingTop:10,
        paddingHorizontal:20,
        marginBottom:70,
        opacity:0.9,
    },
    heading:{
        fontSize:30,
        fontWeight:'700',
        color:Style.color
    },
    divider:{
        width:'100%',
        height:2,
        backgroundColor:Style.color,
        marginTop:5,
        marginBottom:5,
    },
    item:{
        marginBottom:20,
        padding:15,
        color:'black',
        opacity:0.8,
        marginTop:10,
        shadowColor:Style.color,
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:4}
        ,shadowRadius:8,
        elevation:5,
        backgroundColor:'white',
        borderColor:Style.color,
        borderWidth:2,
        borderRadius:5,
        borderLeftWidth:15,

    },

    input:{
        height:40,
        paddingHorizontal:20,
        width:'60%',
        fontSize:19,
        color:'black',
        fontWeight:'600',
        opacity:0.8,
        shadowColor:Style.color,
        shadowOpacity:0.4,
        shadowOffset:{width:0,height:4},
        shadowRadius:8,
        elevation:5,
        backgroundColor:'white',
        borderColor:Style.color,
        borderWidth:2,
        borderRadius:5,

    },
    delete:{
      color:Style.color,
      fontWeight:'700',
      fontSize:15,
    },
    text:{
        alignSelf:'700',
        fontWeight:'700',
        fontSize:17,
        width:'100%',
      },
    note:{
       flexDirection:'row',
       width:'75%',
      },
    scrollView:{
        marginBottom:70
       },
    buttonText:{
        color:'white',
        fontSize:32,
        fontWeight:'800'
       },
    button:{
       backgroundColor:Style.color,
       width:50,
       borderRadius:100,
       justifyContent:'center',

       alignItems:'center',
       marginLeft:10,
       height:50
       },
    headingContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    index:{
        fontSize:20,
        fontWeight:'800',
    },

    searchContainer:{
       flexDirection:'row'
       ,alignItems:"center",
       justifyContent:'space-between'
       ,marginVertical:8
    },
    searchButton:{
        backgroundColor:Style.color,
        alignItems:'center',
        justifyContent:'center',
        width:60,
        borderRadius:5,
        height:40,

    },
      searchButtonText:{
       color:'white',
       fontWeight:'700',
       fontSize:12, 
    }, 
     emptyNoteContainer:{
        alignItems:'center',
        marginTop:240,
    },
    emptyNoteText:{
        color:Style.color,
        fontWeight:'600',
        fontSize:15
    },
    dateContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    },
})
export default Notes;
