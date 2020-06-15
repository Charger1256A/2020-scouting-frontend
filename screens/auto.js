import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import fieldImages from '../index';


class Auto extends React.Component {
    render () {
        return (
            <TouchableOpacity style={[prematchStyles.NextButton, {width: '100%'}]} onPress={() => {
                this._toggleModal();
                }}>
                <View style={autoStyles.Center}>
                    <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Modal</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _toggleModal(){
        
    }
}
autoStyles = StyleSheet.create({
    MainContainer: {
      flex: 1, 
      backgroundColor: '#eaeaea', 
      paddingTop: 30, 
      paddingHorizontal: 20,
      marginBottom: 30,
      flexDirection: 'row', 
    },
    Font: {
      fontFamily: 'Helvetica-Light',
      fontSize: 25
    },
    Center: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    ModalContent: {
      flex: 0.9, 
      width: 900, 
      backgroundColor: 'white', 
      borderRadius: 15, 
      padding: 20
    },
    CancelButton: {
      flex: 1, 
      backgroundColor: '#f74c4c', 
      borderRadius: 7, 
      borderBottomWidth: 5, 
      borderColor: '#d63e3e'
    },
    ScoreButton: {
      flex: 1,
      backgroundColor: '#24a2b6',
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#13616d'
    },
    UndoButton: {
      flex: 1, 
      backgroundColor: '#ffae19', 
      borderRadius: 7, 
      borderBottomWidth: 5, 
      borderColor: '#c98302'
    }
  })

export default Auto;
