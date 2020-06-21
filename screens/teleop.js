import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';

let postions = require('../assets/button_settings/teleoppositions.json');

class Teleop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isControlPanellVisible: false, isPowerCellModalVisible: false, lower1: 0, outer1: 0, inner1: 0, lower2: 0, outer2: 0, inner2: 0, lower3: 0, outer3: 0, inner3: 0, lower4: 0, outer4: 0, inner4: 0, lower5: 0, outer5: 0, inner5: 0, lower6: 0, outer6: 0, inner6: 0, telelower: 0, teleouter: 0, teleinner: 0 }
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
        const pos = postions[fieldOrientation]
        return (
            <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
                <View style={{ flex: 0.874 }}>
                    <View style={autoStyles.MainContainer}>
                        <View style={{ flex: 0.755, borderWidth: 4, borderColor: '#d4d4d4' }}>
                            <ImageBackground style={{ flex: 1, resizeMode: 'contain', aspectRatio: 1.33 }} source={fieldImages[fieldOrientation][alliance]}>{
                            pos.map((item, i) => (
                                <TouchableOpacity 
                                key={i}
                                style={{ position: 'absolute', left: item.left, right: item.right, top: item.top, paddingHorizontal: item.paddingHorizontal, paddingTop: item.paddingTop, paddingBottom: item.paddingBottom, paddingLeft: item.paddingLeft, paddingRight: item.paddingRight }}
                                onPress={() => this._openModal(item.id)}>
                                     <Icon name='plus-circle' type='material-community' size={30} color='#1cfc03' style={autoStyles.Center} />
                                </TouchableOpacity>  
                            ))
                            }
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
                <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={this.state.isControlPanellVisible}>
                    <View style={autoStyles.ModalContent}>
                        <View style={[autoStyles.Center, { margin: 10 }]}>
                            <View style={{ flex: 0.2 }}>
                                <Text style={[autoStyles.Font, { textAlign: 'center' }]}>Control Panel</Text>
                            </View>
                            <View style={{ flex: 0.62, flexDirection: 'row', marginBottom: 50, marginHorizontal: 40 }}>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center, { marginBottom: 20 }]}>
                                            <Image style={{ flex: 1, resizeMode: 'contain', marginTop: 25 }} source={require('../assets/game_pieces/rotation-control.png')} />
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Rotation Control</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center, { marginBottom: 20 }]}>
                                            <Image style={{ flex: 1, resizeMode: 'contain', marginTop: 25 }} source={require('../assets/game_pieces/position-control.png')} />
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Position Control</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.18, width: '80%' }}>
                                <TouchableOpacity style={autoStyles.CancelButton} onPress={() => this._closeModal()}>
                                    <View style={autoStyles.Center}>
                                        <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    _openModal(id) {
        if (id == "CP"){
            this._openCPModal()
        }
    }
    _openCPModal(){
        this.setState({ isControlPanellVisible: true })
    }
    _closeModal() {
        this.setState({ isControlPanellVisible: false, isPowerCellModalVisible: false})
    }
}
export default Teleop;