import React from 'react';
import { Text, ScrollView } from 'react-native';

class Prematch extends React.Component {
    render () {
        const team = this.props.navigation.getParam('team')
        const match = this.props.navigation.getParam('match')
        const practice = this.props.navigation.getParam('practice')
        const alliance = this.props.navigation.getParam('alliance')
        const event = this.props.navigation.getParam('event')
        return (
            <ScrollView style={{paddingHorizontal: 20, fontFamily: 'Helvetica-Light'}}>
                <Text>{team}</Text>
                <Text>{match}</Text>
                <Text>{alliance}</Text>
                <Text>{event}</Text>
            </ScrollView>
            
        )
    }
}

export default Prematch;
