import React from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { ButtonGroup, Slider } from 'react-native-elements';

class Postmatch extends React.Component {
    constructor (props) {
      super(props)
      this.state = { data: {}, driverRating: 0, defenseRating: 0, powercellIntakeRating: 0, shootingRating: 0, notes: "", hangNotes: "", robotDied: false, initiationLine: false}
      this._updateSoloHang = this._updateSoloHang.bind(this)
      this._updateAssistedHang = this._updateAssistedHang.bind(this)
    }

    static navigationOptions = ({navigation})=> {
      return {
        title: `Postmatch | ${navigation.getParam('data').match} - ${navigation.getParam('data').team.toString()}`
      };
    };

    componentDidMount() {
      let data = this.props.navigation.getParam('data');
      data.soloHang = 0
      data.assistedHang = 0
      this.setState({data: data})
    }

    render() {
      const soloHangText = ['No Hang', 'Hang', 'Balanced Hang'];
      const assistedHangText = ['No Assisting Hang', 'Assisted Hang', 'Assisted Balance Hang'];
      return (
        <View style={{ flex: 1, marginHorizontal: 40 }}>
          {/* Notes */}
          <View style={prematchStyles.Row}>
            <Text style={[prematchStyles.Font, {fontSize: 22, flex: 0.15}]}>Notes</Text>
            <View style={postmatchStyles.InputContainer}>
              <TextInput
                style={postmatchStyles.TextInputContainer}
                placeholder="Topics to Note: Ease of intaking game pieces, speed of cycles, unique aspects of robot (good or bad), etc.. Max Char: 200"
                multiline={true}
                maxLength = {200}
                onChangeText={(text) => this.setState({notes: text})}
              />
            </View>
          </View>
          <View style={prematchStyles.Row}>
            <Text style={[prematchStyles.Font, {fontSize: 22, flex: 0.15}]}>Hang Notes</Text>
            <View style={[postmatchStyles.InputContainer, {flex: 0.65}]}>
              <TextInput
                style={postmatchStyles.TextInputContainer}
                placeholder="Topics to Note: Time at which robot began climbing, ease of assisted climb, why robot failed, etc.. Max Char: 150"
                multiline={true}
                maxLength = {150}
                onChangeText={(text) => this.setState({hangNotes: text})}
              />
            </View>
            <View style={{flex: 0.1, marginLeft: 25}}>
              <Text style={[prematchStyles.Font, {fontSize: 16, flex: 0.3}]}>Robot Died</Text>
              <Switch
                style={{flex: 0.7}}
                onValueChange = {(value) => this.setState({robotDied: value})}
                value = {this.state.robotDied}
              />
            </View>
            <View style={{flex: 0.1, marginLeft: 25}}>
              <Text style={[prematchStyles.Font, {fontSize: 16, flex: 0.3}]}>Initiaton Line</Text>
              <Switch
                style={{flex: 0.7}}
                onValueChange = {(value) => this.setState({initiationLine: value})}
                value = {this.state.initiationLine}
              />
            </View>
          </View>
          {/* Hanging Selections */}
          <View style={[prematchStyles.Row, {marginTop: 10}]}>
            <View style={{flex: 1}}>
              <ButtonGroup 
                  onPress={this._updateSoloHang}
                  selectedIndex={this.state.data.soloHang}
                  buttons={soloHangText}
                  buttonStyle={postmatchStyles.ButtonGroup}
                  containerStyle={{height: 50}}
                  selectedButtonStyle={{backgroundColor: '#24a2b6', borderBottomColor: '#188191'}}
                />
            </View>
          </View>
          <View style={[prematchStyles.Row, {marginTop: 10}]}>
            <View style={{flex: 1}}>
              <ButtonGroup 
                  onPress={this._updateAssistedHang}
                  selectedIndex={this.state.data.assistedHang}
                  buttons={assistedHangText}
                  buttonStyle={postmatchStyles.ButtonGroup}
                  containerStyle={{height: 50}}
                  selectedButtonStyle={{backgroundColor: '#24a2b6', borderBottomColor: '#188191'}}
                />
            </View>
          </View>
          {/* Slider Ratings */}
          <View style={prematchStyles.Row}>
            <Text style={[prematchStyles.LabelText, prematchStyles.Font, {fontSize: 22, marginTop: 10}]}>Driving</Text>
            <View style={{flex: 0.5, alignItems: 'stretch'}}>
              <Slider
                thumbTintColor='#24a2b6'
                value={this.state.driverRating}
                onValueChange={(driverRating) => this.setState({driverRating})} />
              <Text>{Math.round(this.state.driverRating*5)}</Text>
            </View>
            <Text style={[prematchStyles.LabelText, prematchStyles.Font, {fontSize: 22, marginTop: 10, marginLeft: 45}]}>Defense</Text>
            <View style={{flex: 0.5, alignItems: 'stretch'}}>
              <Slider
                thumbTintColor='#24a2b6'
                value={this.state.defenseRating}
                onValueChange={(defenseRating) => this.setState({defenseRating})} />
              <Text>{Math.round(this.state.defenseRating*6)-1 == -1 ? 'N/a' : Math.round(this.state.defenseRating*6)-1}</Text>
            </View>
          </View>
          <View style={prematchStyles.Row}>
            <Text style={[prematchStyles.LabelText, prematchStyles.Font, {fontSize: 22, marginTop: 10}]}>Powercell Intake</Text>
            <View style={{flex: 0.5, alignItems: 'stretch'}}>
              <Slider
                thumbTintColor='#24a2b6'
                value={this.state.powercellIntakeRating}
                onValueChange={(powercellIntakeRating) => this.setState({powercellIntakeRating})} />
              <Text>{Math.round(this.state.powercellIntakeRating*6)-1 == -1 ? 'N/a' : Math.round(this.state.powercellIntakeRating*6)-1}</Text>
            </View>
            <Text style={[prematchStyles.LabelText, prematchStyles.Font, {fontSize: 22, marginTop: 10, marginLeft: 35}]}>Shooting</Text>
            <View style={{flex: 0.5, alignItems: 'stretch'}}>
              <Slider
                thumbTintColor='#24a2b6'
                value={this.state.shootingRating}
                onValueChange={(shootingRating) => this.setState({shootingRating})} />
              <Text>{Math.round(this.state.shootingRating*6)-1 == -1 ? 'N/a' : Math.round(this.state.shootingRating*6)-1}</Text>
            </View>
          </View>
          {/* Continue Button */}
          <View style={[prematchStyles.Row, {height: 90}]}>
            <TouchableOpacity style={[prematchStyles.NextButton, {marginHorizontal: 60, marginBottom:25}]}
            onPress={() => this._compileData()}
            >
              <View style={autoStyles.Center}>
                <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Continue to QRCode</Text>
              </View>    
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    /* 
      compiles data and navigates to QRCode Screen
    */
    _compileData () {
      let data = this.state.data;
      // round ratings and set to data
      data.driverRating = Math.round(this.state.driverRating*5);
      data.defenseRating = Math.round(this.state.defenseRating*6)-1;
      data.powercellIntakeRating = Math.round(this.state.powercellIntakeRating*6)-1;
      data.shootingRating = Math.round(this.state.shootingRating*6)-1;
      data.notes = this.state.notes.replace(/ /g, '>').replace(/,/g, '<');
      data.hangNotes = this.state.hangNotes.replace(/ /g, '>').replace(/,/g, '<');
      data.robotDied = this.state.robotDied ? 1 : 0;
      data.initiationLine = this.state.initiationLine ? 1 : 0;
      console.log(data);
      if (data.notes != '' && data.hangNotes != '') { // checks that notes have content
        this.props.navigation.navigate('QRCodeScreen', {
          data: this.state.data
        })
      } else {
        alert('Please fill in all the notes.');
      }
    }

    // methods to update button group selections
    _updateSoloHang (selectedIndex) {
      let data = this.state.data;
      data.soloHang = selectedIndex;
      this.setState({data: data});
    }
    _updateAssistedHang (selectedIndex) {
      let data = this.state.data;
      data.assistedHang = selectedIndex;
      this.setState({data: data});
    }
}

postmatchStyles = StyleSheet.create({
  TextInputContainer: {
    borderWidth: 2,
    borderColor: '#d4d4d4',
    flex: 0.7,
    padding: 10,
    fontSize: 19,
    fontFamily: 'Helvetica-Light'
  },
  InputContainer: {
    height: 110,
    flex: 0.8
  },
  ButtonGroup: {
    borderBottomWidth: 3, 
    borderBottomColor: '#dadada', 
  }
});

export default Postmatch;

