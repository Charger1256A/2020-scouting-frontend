import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

class Teleop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isControlPanellVisible: false, isPowerCellModalVisible1: false, lower1: 0, outer1: 0, inner1: 0, isPowerCellModalVisible2: false, lower2: 0, outer2: 0, inner2: 0, isPowerCellModalVisible3: false, lower3: 0, outer3: 0, inner3: 0, isPowerCellModalVisible4: false, lower4: 0, outer4: 0, inner4: 0, isPowerCellModalVisible5: false, lower5: 0, outer5: 0, inner5: 0, isPowerCellModalVisible6: false, lower6: 0, outer6: 0, inner6: 0, telelower: 0, teleouter: 0, teleinner: 0 }
    }

    componentDidMount() {
        var time = new Date();
        let data = this.props.navigation.getParam('data');
        data.tele1 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
        data.tele2 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
        data.tele3 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
        data.tele4 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
        data.tele5 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
        data.tele6 = {
            lower: 0,
            outer: 0,
            inner: 0,
        }
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
                            <ImageBackground style={{ flex: 1, resizeMode: 'contain', aspectRatio: 1.33 }} source={fieldImages[fieldOrientation][alliance]}>

                            </ImageBackground>
                        </View>
                        <View style={{ flex: 0.245, marginLeft: 15 }}>
                            <ScrollView style={{ flex: 0.88 }}>
                                <Text style={[{ fontWeight: 'bold' }, autoStyles.Font]}>Event Feed</Text>
                            </ScrollView>
                            <View style={{ flex: 0.1, marginTop: 10, marginBottom: 50 }}>
                                <Text style={autoStyles.Font}>Lower: {this.state.data.telelower}</Text>
                                <Text style={autoStyles.Font}>Outer: {this.state.data.teleouter}</Text>
                                <Text style={autoStyles.Font}>Inner: {this.state.data.teleinner}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.126, flexDirection: 'row', paddingHorizontal: 40}}>
                <TouchableOpacity style={[autoStyles.UndoButton, {marginHorizontal: 30, marginBottom:25}]}>
                <View style={autoStyles.Center}>
                <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Undo</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={[prematchStyles.NextButton, {marginHorizontal: 60, marginBottom:25}]}>
                <View style={autoStyles.Center}>
                    <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Finish Match</Text>
                  </View>              
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Teleop;