import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import { encodeStringData } from '../utilities/encode';

class QRCodeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: {}, teleEventModalVisible: false, autoEventModalVisible: false, qrString: "" }
    }
    static navigationOptions = ({navigation})=> {
      return {
        title: `QRCode | ${navigation.getParam('data').match} - ${navigation.getParam('data').team.toString()}`
      };
    };

    componentWillMount() {
      let data = this.props.navigation.getParam('data');
      this.setState({data: data});
      this._encode(data);
    }

    render() { 
      return (
        <View style={qrcodeStyles.MainContainer}>
          <View style={{width: '100%', flexDirection: 'row', flex: 1}}>
            <View style={{flex: 0.455}}>
              <View style={{borderWidth: 6, borderColor: '#d4d4d4', height: 415}}>
                <QRCode 
                  value={this.state.qrString}
                  size={405}
                />
              </View>
              <View style={{flex: 1, marginTop: 20, marginBottom: 40}}>
                <View style={{flex: 0.5, marginTop: 10}}>
                  <TouchableOpacity style={prematchStyles.NextButton} onPress={() => this._finishMatch()}>
                    <View style={autoStyles.Center}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Finish</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flex: 0.545, marginLeft: 50, marginBottom: 50}}>
              <Text style={[prematchStyles.LabelText, prematchStyles.Font, {fontSize: 27, marginBottom: 10}]}>Data</Text>
              <ScrollView>
              {Object.keys(this.state.data).map( key => 
              <View style={qrcodeStyles.Border}>
              {!key.includes('Events') ? 
                (<ListItem 
                  key={key}
                  title={key}
                  rightTitle={JSON.stringify(this.state.data[key]).replace(/</g, ',').replace(/>/g, ' ')}
                  rightIcon={<Icon/>}
                />) : (
                <TouchableOpacity
                  key={key}
                  onPress={() => this._toggleEventModal(key)}
                >
                  <ListItem
                    key={key}
                    title={key}
                    rightTitle='Edit'
                    />
                </TouchableOpacity>
              )}
              </View>  
              )}
              </ScrollView>
            </View>           
          </View>
          {/* event modals */}
          {
            ['auto', 'tele'].map(key => (
            <Modal animationInTiming={150} animationIn='fadeIn' animationOutTiming={150} animationOut='fadeOut' style={{alignItems: 'center'}} isVisible={this.state[`${key}EventModalVisible`]}>
              <View style={[autoStyles.ModalContent, {flex: 0.8}]}>
                <View style={{flex: 0.15}}>
                  <Text style={[autoStyles.Font, {textAlign: 'center'}]}>{key.charAt(0).toUpperCase() + key.slice(1)} Events</Text>
                </View>
                <ScrollView style={{flex: 0.7}}>{
                  this.state.data[`${key}Events`].map((item, i) => (
                    <View key={i} style={qrcodeStyles.Border}>
                      <Text style={[autoStyles.Font, {fontSize: 15, fontWeight: 'bold', color: '#0f5863'}]}>{item.time.slice(0, -3)}.{item.time.slice(item.time.length-3)}</Text>
                      <Text style={[autoStyles.Font, {fontSize: 15}]}>Item Scored: {item.event.itemScored}</Text>
                      <Text style={[autoStyles.Font, {fontSize: 15}]}>Location: {item.event.location}</Text>
                      <Text style={[autoStyles.Font, {fontSize: 15}]}>Position: {item.event.position}</Text>
                      {item.event.success != null ? <Text style={[autoStyles.Font, {fontSize: 15}]}>Status: {item.event.success == 1 ? "success" : "fail"}</Text> : <Text></Text>}
                      <TouchableOpacity
                      onPress={() => Alert.alert(
                        'Delete Event',
                        'Are you sure you want to delete this event?',
                        [
                          {text: 'Yes', onPress: () => this._deleteEvent(key, i)},
                          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                        ],
                        { cancelable: true }
                      )
                      }>
                        <Text style={[autoStyles.Font, {fontSize: 15, fontWeight: 'bold', color: '#f74c4c'}]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                }</ScrollView>
                <View style={{flex: 0.15}}>
                  <TouchableOpacity style={autoStyles.CancelButton} onPress={() => this._toggleEventModal(`${key}Events`)}>
                    <View style={autoStyles.Center}>
                      <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Finish</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            ))
          }
        </View> 
      ); 
    }

    /* 
      encodes the data to a smaller format to be used as the string for the qrcode 
      data - data that you want to encode
    */
    _encode(data) {
      let codeData = JSON.parse(JSON.stringify(data));
      let qrString = encodeStringData(codeData);
      this.setState({qrString: qrString});
    }
    
    // saves all the data to local storage, then navigates to home screen
    _finishMatch() {
      AsyncStorage.getItem("currentEvent").then(event => {
        AsyncStorage.getItem(event).then(matches => {
          matches = JSON.parse(matches); // data must be updated for the homescreen to add a scouted match
          let matchNo = parseInt(this.state.data.match.replace('Q', ''))-1;
          matches[matchNo].scouted = true;
          matches[matchNo].scouter = this.state.data.name;
          AsyncStorage.setItem(this.state.data.event, JSON.stringify(matches)); // set list of new matches
          AsyncStorage.setItem(`${this.state.data.match}_${this.state.data.event}`, JSON.stringify(this.state.data)); // set new match data for event. pulled when you want to review a previous match
          this.props.navigation.navigate('Matches', matches);
        });      
      });
    }

    _rescoutMatch() {
      AsyncStorage.getItem("currentEvent").then(event => {
        AsyncStorage.getItem(event).then(matches => {
          matches = JSON.parse(matches); // data must be updated for the homescreen to add a scouted match
          let matchNo = parseInt(this.state.data.match.replace('Q', ''))-1;
          matches[matchNo].scouted = false;
          matches[matchNo].scouter = "";
          AsyncStorage.setItem(this.state.data.event, JSON.stringify(matches)); // set list of new matches
          AsyncStorage.removeItem(`${this.state.data.match}_${this.state.data.event}`); // remove match data for that match
          this.props.navigation.navigate('Matches', matches);
        });      
      });
    }

    /* 
      toggles event modal to view event list
      key - mode to view (auto or teleop)
    */
    _toggleEventModal(key) {
      key == 'teleEvents' ? this.setState({teleEventModalVisible: !this.state.teleEventModalVisible}) : this.setState({autoEventModalVisible: !this.state.autoEventModalVisible})
    }

    /*
      deletes a specified event
      key - mode to delete from (auto or teleop)
      index - position in array of events
    */
    _deleteEvent(key, index) {
      let data = this.state.data;
      let removed = data[`${key}Events`].splice(index, 1)[0];
      let item = removed.event.itemScored;
      removed.event.success != 0 ? data[`${key}${item}`] -= 1 : "";
      this.setState({data: data})
      this._encode(data); // re encode data for qrcode
    }
}

qrcodeStyles = StyleSheet.create({
  MainContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 30, 
    paddingVertical: 30
  }, 
  Border: {
    borderWidth: 2.5,
    borderColor: '#d4d4d4',
    margin: 3,
    padding: 4
  }
})

export default QRCodeScreen;