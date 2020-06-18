import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

// let positions = ["1", "2", "3", "5", "6"];
let powerport = require('../assets/button_settings/powerport.json');

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
    this.state = { data: {}, isPowerCellModalVisible: false, isControlPanellVisible: false, lowerclicks: 0, outerclicks: 0, innerclicks: 0 }
  }

  componentDidMount() {
    var time = new Date(); // initial time used as reference point for other timestamps
    let data = this.props.navigation.getParam('data')
    data.autoEvents = []
    data.lower = 0;
    data.outer = 0;
    data.inner = 0;
    // data.rotation = false;
    // data.position = false;
    this.setState({ data: data, initialTime: time })
  }

  render() {
    const alliance = this.state.data.alliance;
    const fieldOrientation = this.props.navigation.getParam("fieldOrientation");
    const pos = powerport[fieldOrientation];
    return (
      <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
        <View style={{ flex: 0.874 }}>
          <View style={autoStyles.MainContainer}>
            <View style={{ flex: 0.7, borderWidth: 4, borderColor: '#d4d4d4' }}>
              <ImageBackground style={{ flex: 1, resizeMode: 'contain', aspectRatio: 1.33 }} source={fieldImages[fieldOrientation][alliance]}>{

                pos.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{ position: 'absolute', left: item.left, right: item.right, top: item.top, paddingHorizontal: item.paddingHorizontal, paddingTop: item.paddingTop, paddingBottom: item.paddingBottom, paddingLeft: item.paddingLeft, paddingRight: item.paddingRight }}
                    onPress={() => this._openModal()}
                  >
                    <Icon name='plus-circle' type='material-community' size={30} color='#1cfc03' style={autoStyles.Center} />
                  </TouchableOpacity>
                ))
              }
              </ImageBackground>
            </View>
            <View style={{ flex: 0.245, marginLeft: 300 }}>
              <ScrollView style={{ flex: 0.88 }}>
                <Text style={[{ fontWeight: 'bold' }, autoStyles.Font]}>Event Feed</Text>
                <View style={{flex: 1, marginTop: 10}}>
                  <Text style={[autoStyles.Font, {fontSize: 15}]}><Text style={{fontWeight: 'bold'}}>Item Scored </Text>{JSON.stringify(this.state.data.autoEvents)}</Text>
                </View>
              </ScrollView>
              <View style={{ flex: 0.1, marginTop: 10, marginBottom: 50 }}>
              <Text style={autoStyles.Font}>Lower: {this.state.data.lower}</Text>
                <Text style={autoStyles.Font}>Outer: {this.state.data.outer}</Text>
                <Text style={autoStyles.Font}>Inner: {this.state.data.inner}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.126, paddingHorizontal: 40, flexDirection: 'row' }}>
          <TouchableOpacity style={[autoStyles.UndoButton, { marginHorizontal: 30, marginBottom: 25 }]}>
            <View style={autoStyles.Center}>
              <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Undo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[prematchStyles.NextButton, { marginHorizontal: 30, marginBottom: 25 }]}>
            <View style={autoStyles.Center}>
              <Blink text='Continue to Teleop' />
            </View>
          </TouchableOpacity>
        </View>
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={this.state.isModalVisible}>
          <View style={autoStyles.ModalContent}>
            <View style={[autoStyles.Center]}>
              <View style={{ flex: 1 }}>
                <Text style={[autoStyles.Font, { textAlign: 'center' }]}>Select Goal</Text>
              </View>
            </View>
            <View style={[autoStyles.Left, { marginBottom: 10 }]}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 20, marginBottom: 50, marginTop: -200 }}>
                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreButton, { width: '100%' }]} >
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Lower</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreButton, { width: '100%' }]}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Outer</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreButton, { width: '100%' }]}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Inner</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 450 }}>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]} onPress={() => { this._addLower(1) }}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]} onPress={() => { this._addOuter(1) }}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]} onPress={() => { this._addInner(1) }}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 525 }}>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]} onPress={() => { this._addLower(-1) }} >
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]} onPress={() => { this._addOuter(-1) }} >
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                  <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]} onPress={() => { this._addInner(-1) }} >
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 600 }}>
                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreView, { width: '100%' }]} >
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont], { color: '#000000' }}>{this.state.lowerclicks}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreView, { width: '100%' }]}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont], { color: '#000000' }}>{this.state.outerclicks}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                  <View style={[autoStyles.ScoreView, { width: '100%' }]}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont], { color: '#000000' }}>{this.state.innerclicks}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 0.62, flexDirection: 'row', marginBottom: 30 }}>
                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                  <TouchableOpacity style={[autoStyles.CancelButton, { width: '100%' }]} onPress={() => this._closemodal()}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                  <TouchableOpacity style={[autoStyles.SaveButton, { width: '100%' }]} onPress={() => {this._updateScore(); this._closemodal();}}>
                    <View style={[autoStyles.Center]}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    );
  }

  _openModal() {
    this.setState({ isModalVisible: true })
  }
  _closemodal() {
    this.setState({ isModalVisible: false })
  }
  _addLower(n) {
      let newclicks = Math.max(0, this.state.lowerclicks + n);
      if (newclicks < 6){
        this.setState({ lowerclicks: newclicks });
      }
      
    // console.log(this.state.lowerclicks);
  };
  _addOuter(n) {
    let newclicks = Math.max(0, this.state.outerclicks + n);
    if (newclicks < 6){
      this.setState({ outerclicks: newclicks });
    }
}
  _addInner(n) {
    let newclicks = Math.max(0, this.state.innerclicks + n);
    if (newclicks < 6){
      this.setState({ innerclicks: newclicks })
    }
  }
  
  _updateScore() {
    let data = this.state.data;
    var time = new Date() - new Date(this.state.initialTime);
    time /= 1000
    var lower = this.state.lowerclicks;
    var outer = this.state. outerclicks;
    var inner = this.state.innerclicks;
    var event = {Lowergoal: lower, Outergoal: outer, Innergoal: inner};
    data.autoEvents.push({"time": time.toString(), "event": event});
    this.setState({data: data});
    console.log(JSON.stringify(data.autoEvents));
    console.log(new Date())
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
  Left: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
  },
  Right: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
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
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#d63e3e'
  },
  SaveButton: {
      flex: 1,
      backgroundColor: '#2E8B57',
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#006400'
  },
  ScoreButton: {
      flex: 1,
      backgroundColor: '#24a2b6',
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#13616d'
  },
  AddStackButton: {
      flex: 1,
      backgroundColor: '#32CD32',
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#13616d'
  }, 
  SubtractStackButton: {
      flex: 1,
      backgroundColor: '#d63e3e',
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
  },
  ScoreView: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderBottomWidth: 5,
      borderColor: '#13616d'
  }
})
export default Auto;