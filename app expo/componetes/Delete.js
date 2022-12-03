import React from "react"
import { Text, StyleSheet, ScrollView, View, Touchable, TouchableOpacity, Alert } from "react-native";
import * as Style from '../assets/styles';
import { styles } from "./Notes";

const Delete = ({ navigation, ...props }) => {
    function emptyBin() {
        Alert.alert(
            'Deletar',
            'Deletar permanentemente todo o cahe?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Não Deletado'),
                    style: 'cancel'
                },
                {
                    text: "Yes",
                    onPress: () => {
                        let emptyArray = [...props.moveToBin];
                        emptyArray = [];
                        props.setMoveToBin(emptyArray);
                    }
                }
            ]
        )
    }
    function permanentementeDelete(index) {
        Alert.alert(
            'Deletar',
            'Deletar permanentemente ?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Não Deletado'),
                    style: 'cancel'
                },
                {
                    text: "Yes",
                    onPress: () => {
                        let newArray = [...props.moveToBin];
                        newArray.splice(index,1)
                        props.setMoveToBin(newArray)
                    }
                }
            ]
        )
    }
    function undoAllNote(){
        let deletedNotes=[...props.moveToBin];
        let notes=[...props.notes];
        deletedNotes.forEach((item,index)=>{
            notes.push(item)
        }) 
        props.setMoveToBin([])
        props.setNotes(deletedNotes)

    }
    function undoNote(index){
        let getBack = props.moveToBin[index];
        let array = [getBack,...props.notes];
        props.setNotes(array)

        let newArray = [...props.moveToBin];
        newArray.splice(index,1);
        props.setMoveToBin(newArray);
    }


    return (
        <ScrollView>
            <View style={styles.noteContener}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={style.emputyButton} onPress={() => undoAllNote()}>
                        <Text style={style.emputyButtonText}>  Undo All </Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: Style.color }}>Total: {props.moveToBin.length}</Text>
                    <TouchableOpacity style={style.emputyButton} onPress={() => emptyBin()}>
                        <Text style={style.emputyButtonText}>    Empyt</Text>
                    </TouchableOpacity>

                </View>
                <View style={style.divider}></View>

                {props.moveToBin.length === 0
                    ?
                    <View style={style.emptyNoteContainer}>
                        <Text style={styles.emptyNoteText}>
                            Lixeira vazia!...
                        </Text>
                    </View>
                    :
                    props.moveToBin.map((item, index) =>

                        <View Style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.item} key={index}>
                                <View style={styles.note}>
                                    <Text style={styles.index}> {index + 1}. </Text>
                                    <Text style={styles.text}>{item}</Text>
                                    <TouchableOpacity onPress={() => undoNote(index)}>
                                        <Text style={styles.delete}>Undo</Text>
                                    </TouchableOpacity>


                                </View>
                                <View style={styles.dateContainer}>
                                    <Text>{props.date}</Text>
                                    <TouchableOpacity  onPress={()=> permanentementeDelete(index)}>
                                        <Text style={styles.delete}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    )}


            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    emputyButton: {
        backgroundColor: Style.color,
        width: '25%',
        borderRadius: 100,
        justifyContent: 'center',
        height: 35,
        marginBottom: 5

    },
    emputyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divider: {
        width: '100%',
        height: 3,
        backgroundColor: Style.color,
        marginTop: 5,
        marginBottom: 5,
    },
    emptyNoteContainer: {
        alignItems: 'center',
        marginTop: 240,
    },
})
export default Delete;