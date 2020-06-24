import React from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { ButtonGroup, Slider } from 'react-native-elements';

class QRCode extends React.Component {
    static navigationOptions = ({navigation})=> {
        return {
          title: `QRCode | ${navigation.getParam('data').match} - ${navigation.getParam('data').team.toString()}`
        };
      };

    render () {
        return (
            <Text>QRCode</Text>
        )
    }
}

export default QRCode; 