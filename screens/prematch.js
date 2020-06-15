import React from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import fieldImages from '../index';

let startingPositions = require('../assets/button_settings/StartingPositions.json');

class Prematch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', team: '', match: '', currentRobotPosition: '', currentRobotPositionName: 'Please set a starting position.', alliance: '', event: '', fieldOrientation: 1 };
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    if (!navigation.getParam('practice')) {
      this.setState({ team: navigation.getParam('team') });
      this.setState({ match: navigation.getParam('match') });
      this.setState({ alliance: navigation.getParam('alliance') });
      this.setState({ event: navigation.getParam('event') });
    }
    navigation.getParam('alliance') == 'blue' ? this.setState({ fieldOrientation: 1 }) : this.setState({ fieldOrientation: 2 });
  }

  render() {
    const team = this.props.navigation.getParam('team')
    const match = this.props.navigation.getParam('match')
    const practice = this.props.navigation.getParam('practice')
    const alliance = this.props.navigation.getParam('alliance')
    const event = this.props.navigation.getParam('event')
    const navigation = this.props.navigation;
    const startingPos = this.state.currentRobotPosition;
    const fieldOrientation = this.state.fieldOrientation;
    const habButtonSettings = fieldOrientation == 1 ? startingPositions.blue : startingPositions.red;
    return (
      <View style={{ flex: 1, backgroundColor: '#eaeaea', paddingLeft: 60, paddingRight: 20 }}>
        <View style={prematchStyles.InputContainer}>
          <View style={prematchStyles.Row}>
            <Text style={[prematchStyles.LabelText, prematchStyles.Font, { fontSize: 22 }]}>Name</Text>
            <View style={prematchStyles.TextInputContainer}>
              <TextInput
                style={[prematchStyles.Font, { flex: 1 }]}
                placeholder="Scouter Name, Ex: Barbie Selwyn"
                onChangeText={(text) => this.setState({ name: text })}
              />
            </View>
          </View>
        </View>
        <View style={[prematchStyles.FieldContainer, prematchStyles.Row]}>
          <View style={{ flex: 0.8, borderWidth: 4, borderColor: '#d4d4d4' }}>
            <ImageBackground style={prematchStyles.Field} source={fieldImages[fieldOrientation][alliance]}>
              <View style={{ alignItems: 'flex-end', flex: 1 }}>{
                habButtonSettings.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[{ position: 'absolute', borderRadius: 5, borderWidth: 3, borderColor: 'transparent', left: item.left, right: item.right, top: item.top, padding: item.padding, paddingLeft: item.paddingLeft, paddingRight: item.paddingRight },
                    startingPos == item.id ? prematchStyles.Highlighted : {}
                    ]}
                    onPress={() => this._setPosition(item.id, item.name)}
                  >
                    <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>{item.id.replace(/[0-9]/g, '')}</Text>
                  </TouchableOpacity>
                ))
              }</View>
            </ImageBackground>

          </View>
          <View style={{ flex: 0.3, marginLeft: 30 }}>
            <View style={{ flex: 0.7 }}>
              <Text style={[prematchStyles.Font, { fontWeight: 'bold' }]}>Starting Position</Text>
              <Text style={[prematchStyles.Font, { fontSize: 18 }, startingPos == '' ? { color: '#a3a3a3' } : {}]}>{this.state.currentRobotPositionName}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <TouchableOpacity style={[prematchStyles.NextButton, { backgroundColor: '#ffae19', borderColor: '#c98302', marginBottom: 10 }]} onPress={() => this.state.fieldOrientation == 1 ? this.setState({ fieldOrientation: 2 }) : this.setState({ fieldOrientation: 1 })}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[prematchStyles.Font, prematchStyles.ButtonFont, { fontSize: 18 }]}>Toggle Field Orientation</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={prematchStyles.NextButton}
                // continue button - checks if all fields have been filled out, alert user if fields are empty
                onPress={() =>
                  this.state.name != '' && this.state.team != '' && this.state.currentRobotPosition != '' ? this.props.navigation.navigate('ModalScreen', {
                    data: { "team": this.state.team, "name": this.state.name, "match": this.state.match, "alliance": this.state.alliance, "startingPosition": this.state.currentRobotPosition, "event": this.state.event },
                    fieldOrientation: this.state.fieldOrientation
                  }) : alert('Please fill in all the information before proceeding.')
                }
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Begin Match</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>



    )
  }
  _setPosition(key, name) {
    this.setState({ currentRobotPosition: key, currentRobotPositionName: name });
  }
}
prematchStyles = StyleSheet.create({
  Font: {
    fontFamily: 'Helvetica-Light',
    fontSize: 20
  },
  InputContainer: {
    height: 130,
    paddingLeft: 20,
    alignItems: 'center',
  },
  FieldContainer: {
    flex: 2,
    marginBottom: 60,
    marginTop: 50,

  },
  Row: {
    flexDirection: 'row',
    marginTop: 25,
  },
  LabelText: {
    marginRight: 20,
  },
  TextInputContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#d4d4d4',
    flex: 0.7
  },
  ButtonFont: {
    color: 'white',
    fontSize: 25
  },
  Field: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  Highlighted: {
    borderColor: 'yellow'
  },
  NextButton: {
    flex: 1,
    backgroundColor: '#2E8B57',
    borderRadius: 7,
    borderBottomWidth: 5,
    borderColor: '#006400'
  }
})

export default Prematch;
