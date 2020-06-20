import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

class Teleop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isControlPanellVisible: false, isPowerCellModalVisible1: false, lower1: 0, outer1: 0, inner1: 0, isPowerCellModalVisible2: false, lower2: 0, outer2: 0, inner2: 0, isPowerCellModalVisible3: false, lower3: 0, outer3: 0, inner3: 0, isPowerCellModalVisible4: false, lower4: 0, outer4: 0, inner4: 0, isPowerCellModalVisible5: false, lower5: 0, outer5: 0, inner5: 0, isPowerCellModalVisible6: false, lower6: 0, outer6: 0, inner6: 0 }
    }

    componentDidMount() {
        var time = new Date();
        let data = this.props.navigation.getParam('data');
        data.telellower1 = 0;
        data.teleouter1 = 0;
        data.teleinner1 = 0;
        data.telellower2 = 0;
        data.teleouter2 = 0;
        data.teleinner2 = 0;
        data.telellower3 = 0;
        data.teleouter3 = 0;
        data.teleinner3 = 0;
        data.telellower4 = 0;
        data.teleouter4 = 0;
        data.teleinner4 = 0;
        data.telellower4 = 0;
        data.teleouter4 = 0;
        data.teleinner4 = 0;
        data.telellower5 = 0;
        data.teleouter5 = 0;
        data.teleinner5 = 0;
        data.telellower6 = 0;
        data.teleouter6 = 0;
        data.teleinner6 = 0;
        data.teleEvents = [];
        this.setState({ data: data, initialTime: time });
    }

    render() {
        const alliance = this.state.data.alliance;
        const fieldOrientation = this.props.navigation.getParam("fieldOrientation");
        return (
            <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
                <View style={{ flex: 0.874 }}>
                    <View style={autoStyles.MainContainer}>
                        <View style={{ flex: 0.755, borderWidth: 4, borderColor: '#d4d4d4' }}>
                            <ImageBackground style={{flex: 1, resizeMode: 'contain', aspectRatio: 1.33}} source={fieldImages[fieldOrientation][alliance]}>

                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default Teleop;