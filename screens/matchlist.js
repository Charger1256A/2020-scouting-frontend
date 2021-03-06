import React from 'react';
import { TouchableOpacity, Button, ScrollView, StyleSheet, AlertIOS, AsyncStorage, Text, Alert, View } from 'react-native';
import { pullMatches } from '../utilities/TBAInteractor';
import { ListItem, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


// let alliance = "blue";


class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: [], currentEvent: "", alliance: "blue" }
 }
  
  static navigationOptions = ({ navigation }) => {    return {
      //   headerTitle: `Matches | ${navigation.getParam('currentEvent')}`,
      headerRight: (
        <View style={matchlistStyles.headerContainer}>
          <Button
            onPress={navigation.getParam('updateMatches')}
            title="Get Matches"
            color="#fff"
          />
        </View>
      ),
      headerTitleStyle: { fontFamily: 'Helvetica-Light' }
    }
  };

  componentDidMount() {
    const navigation = this.props.navigation;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      navigation.getParam('matches') == null ? this._getMatches() : this.setState(navigation.getParam('matches'));
    })
  }

  render() {
    const iconComplete = <Icon name='md-checkmark-circle' type='ionicon' color='#32CD32' />;
    const iconUnfinished = <Icon name='plus-circle' type='material-community' color='#4583E8' />;
    return (
      <ScrollView style={{ paddingHorizontal: 20, fontFamily: 'Helvetica-Light' }}>{
        this.state.matches.map((match, i) => (
          <TouchableOpacity
            key={i}
            onPress={
              () => this._navigate(match)}>
            <ListItem
              style={matchlistStyles.ListItem}
              key={i}
              title={`${match.matchNo}${match.scouted ? ` - Scouted by ${match.scouter}` : ''}`} // add scouted by name of person if scouted
              titleStyle={{ marginLeft: 10 }}
              rightTitle={match.team}
              rightTitleStyle={{ color: 'black' }}
              leftIcon={match.scouted ? iconComplete : iconUnfinished}
              rightIcon={<Icon name='chevron-right' color='#696969' />}
            />
          </TouchableOpacity>))
      }</ScrollView>
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _navigate(match) {
    const navigation = this.props.navigation;
    let event = navigation.getParam('currentEvent');
    if (match.scouted) {
      AsyncStorage.getItem(`${match.matchNo}_${event}`).then(data => {
        navigation.navigate('QRCode', { data: JSON.parse(data) })
      })
    } else {
      this.props.navigation.navigate('PrematchScreen', { team: match.team, match: match.matchNo, practice: false, alliance: this.state.alliance, event: event })
      // navigation.navigate('Prematch', {
      //   team: match.team,
      //   match: match.matchNo,
      //   practice: false,
      //   alliance: alliance,
      //   event: event
      // })
    }
  }

  _getMatches() {
    AsyncStorage.getItem("currentEvent").then(event => {
      if (event != null) {
        AsyncStorage.getItem(event).then(matches => {
          if (matches != null) {
            this.setState({ matches: JSON.parse(matches), currentEvent: event });
          }
          this.props.navigation.setParams({ currentEvent: event })
        });
      }
    });
    this.props.navigation.setParams({ updateMatches: this._updateMatches.bind(this) });
  }

  _updateMatches() {
    Alert.prompt(
      'Enter an event code:',
      null,
      text => {
        AsyncStorage.getItem(text).then(matches => {
          var all = ''
          if (matches == null) {
            if (text[8] === "B") {
              all = "blue"
            } else {
              all = "red"
            }
            this.setState({ alliance: all });
            pullMatches(text).then(matchData => {
              if (matchData != undefined) {
                this.setState({ matches: matchData });
                AsyncStorage.setItem(text, JSON.stringify(matchData)).then(() => {
                  alert(`Successfully saved ${text} match data.`);
                });
                AsyncStorage.setItem("currentEvent", text);
              }
            });
          }
          else {
            AsyncStorage.setItem("currentEvent", text);
            this.setState({ 'matches': JSON.parse(matches) });
          }
          this.props.navigation.setParams({ currentEvent: text })
        });
      },
    )
  }
  
  _updateNumber(number1) {
    this.setState({
      number: number1
    })
  }

}
matchlistStyles = StyleSheet.create({
  ListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    borderTopWidth: 0.5,
    borderTopColor: '#d4d4d4',
    fontFamily: 'Helvetica-Light'
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row"
  }
})


export default MatchList;

