import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

let positions = ["1", "2" , "3", "5", "6"];

class Blink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };

    // Toggle the text after 15 seconds
    setTimeout(() => (
      setInterval(() => (
        this.setState(previousState => (
          { isShowingText: !previousState.isShowingText }
        ))
      ), 100)
    ), 15000);
  }
  render() {
    if (!this.state.isShowingText) {
      return null;
    }
    return (
      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>{this.props.text}</Text>
    );
  }
}

class Auto extends React.Component {
    render () {

        return (
          <Text>hello</Text>
        )
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