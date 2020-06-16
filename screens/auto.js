import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

let positions = ["1", "2", "3", "5", "6"];
let position1 = require('../assets/button_settings/Pos-1.json');

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
    this.state = { data: {}, isPowerCellModalVisible: false, isControlPanellVisible: false, currentScoreLocation: '' }
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
    this.setState({ data: data, initialTime: time })
  }

  render() {
    const alliance = this.state.data.alliance;
    const fieldOrientation = this.props.navigation.getParam("fieldOrientation");
    const pos1 = position1[`${alliance}-${fieldOrientation}`];
    return (
      <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
        <View style={{ flex: 0.874 }}>
          <View style={autoStyles.MainContainer}>
          <View style={{flex: 0.7, borderWidth: 4, borderColor: '#d4d4d4'}}>
            <ImageBackground style={{ flex: 1, resizeMode: 'contain', aspectRatio: 1.33 }} source={fieldImages[fieldOrientation][alliance]}>
            </ImageBackground>
            </View>
            <View style={{flex: 0.245, marginLeft: 300}}>
            <ScrollView style={{flex: 0.88}}>
            <Text style={[{fontWeight: 'bold'}, autoStyles.Font]}>Event Feed</Text>
            </ScrollView>
            <View style={{flex: 0.1, marginTop: 10, marginBottom: 50}}>
            <Text style={autoStyles.Font}>Lower: {this.state.data.lower}</Text>
            <Text style={autoStyles.Font}>Outer: {this.state.data.outer}</Text>
              <Text style={autoStyles.Font}>Inner: {this.state.data.inner}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 0.126, paddingHorizontal: 40, flexDirection: 'row'}}>
        <TouchableOpacity style={[autoStyles.UndoButton, {marginHorizontal: 30, marginBottom:25}]}>
        <View style={autoStyles.Center}>
                <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Undo</Text>
              </View>              
        </TouchableOpacity>
        <TouchableOpacity style={[prematchStyles.NextButton, {marginHorizontal: 30, marginBottom:25}]}>
        <View style={autoStyles.Center}>
                <Blink text='Continue to Teleop'/>
              </View>              
        </TouchableOpacity>
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