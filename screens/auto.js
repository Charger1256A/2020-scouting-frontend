import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

let positions = ["1", "2" , "3", "5", "6"];
let power_port = require('../assets/button_settings/powerPort.json');

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
  constructor(props) {
    super(props);
    this.state = {data: {}, isPowerCellModalVisible: false, isControlPanellVisible: false, currentScoreLocation: ''}
  }

  componentDidMount() {
    var time = new Date(); // initial time used as reference point for other timestamps
    let data = this.props.navigation.getParam('data')
    data.autoEvents = []
    data.lower = 0;
    data.outer = 0;
    data.inner = 0;
    data.rotation = false;
    data.position = false;
    this.setState({data: data, initialTime: time})
  }
  
  render () {
        const alliance = this.state.data.alliance;
        const fieldOrientation = this.props.navigation.getParam("fieldOrientation");
        const powerPort = power_port[`${alliance}-${fieldOrientation}`];
        return (
          <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
             <View style={{flex: 0.874}}>
                <View style={autoStyles.MainContainer}>
                <ImageBackground style={{flex: 1, resizeMode: 'contain', aspectRatio: 1.33}} source={fieldImages[fieldOrientation + 2][alliance]}>
                </ImageBackground>
                </View>
             </View>
          </View>

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