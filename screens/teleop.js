import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

let postions = require('../assets/button_settings/teleoppositions.json');

class Teleop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isControlPanellVisible: false, isPowerCellModalVisible: false, lower1: 0, outer1: 0, inner1: 0, lower2: 0, outer2: 0, inner2: 0, lower3: 0, outer3: 0, inner3: 0, lower4: 0, outer4: 0, inner4: 0, lower5: 0, outer5: 0, inner5: 0, lower6: 0, outer6: 0, inner6: 0, telelower: 0, teleouter: 0, teleinner: 0, lowerclicks: 0, outerclicks: 0, innerclicks: 0, rotationControl: false, positionControl: false }
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
        data.teleEvents = []
        data.rotatiocontrol = false;
        data.positioncontrol = false;
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
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <Text style={[autoStyles.Font, { fontSize: 15 }]}><Text style={{ fontWeight: 'bold' }}>Item Scored </Text>{JSON.stringify(this.state.data.teleEvents)}</Text>
                                </View>
                            </ScrollView>
                            <View style={{ flex: 0.1, marginTop: 10, marginBottom: 50 }}>
                                <Text style={autoStyles.Font}>Lower: {this.state.data.telelower}</Text>
                                <Text style={autoStyles.Font}>Outer: {this.state.data.teleouter}</Text>
                                <Text style={autoStyles.Font}>Inner: {this.state.data.teleinner}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.126, flexDirection: 'row', paddingHorizontal: 40 }}>
                    <TouchableOpacity style={[autoStyles.UndoButton, { marginHorizontal: 30, marginBottom: 25 }]}>
                        <View style={autoStyles.Center}>
                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Undo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[prematchStyles.NextButton, { marginHorizontal: 60, marginBottom: 25 }]}>
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
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]} onPress={() => {this._updateCPModal('rotation');}}>
                                        <View style={[autoStyles.Center, { marginBottom: 20 }]}>
                                            <Image style={{ flex: 1, resizeMode: 'contain', marginTop: 25 }} source={require('../assets/game_pieces/rotation-control.png')} />
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Rotation Control</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]} onPress={() => {this._updateCPModal('position');}}>
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
                <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={this.state.isPowerCellModalVisible}>
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
                                    <TouchableOpacity style={[autoStyles.CancelButton, { width: '100%' }]} onPress={() => this._closeModal()}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.SaveButton, { width: '100%' }]} onPress={() => { this._closeModal(); this._updateScore(); }}>
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
    _openModal(id) {
        if (id == "CP") {
            this._openCPModal();
        } else {
            this._openPCModal();
        }
    }
    _openPCModal(id) {
        this.setState({ isPowerCellModalVisible: true });
        // Alert.alert("You are attempting to open a model");
    }
    _openCPModal() {
        this.setState({ isControlPanellVisible: true });
    }
    _closeModal() {
        this.setState({ isControlPanellVisible: false, isPowerCellModalVisible: false });
        this.setState({ lowerclicks: 0, outerclicks: 0, innerclicks: 0 });
    }
    _addLower(n) {
        let newclicks = Math.max(0, this.state.lowerclicks + n);
        if (newclicks < 6) {
            this.setState({ lowerclicks: newclicks });
            this.setState({ lowerclickscurrent: newclicks });
        }
    };
    _addOuter(n) {
        let newclicks = Math.max(0, this.state.outerclicks + n);
        if (newclicks < 6) {
            this.setState({ outerclicks: newclicks });
            this.setState({ outerclickscurrent: newclicks });
        }
    }
    _addInner(n) {
        let newclicks = Math.max(0, this.state.innerclicks + n);
        if (newclicks < 6) {
            this.setState({ innerclicks: newclicks });
            this.setState({ innerclickscurrent: newclicks });
        }
    }
    _updateScore() {
        let data = this.state.data;
        var time = new Date() - new Date(this.state.initialTime);
        time /= 1000
        var lower = this.state.lowerclicks;
        powercells.push(lower);
        var outer = this.state.outerclicks;
        powercells.push(outer);
        var inner = this.state.innerclicks;
        powercells.push(inner);
        var event = { Lowergoal: lower, Outergoal: outer, Innergoal: inner };
        data.teleEvents.push({ "time": time.toString(), "event": event });
        data.telelower += lower;
        data.teleouter += outer;
        data.teleouter += inner;
        this.setState({ data: data });
        console.log(JSON.stringify(data.teleEvents));
        console.log(new Date())
    }
    _updateCPModal(event) {
        let data = this.state.data;
        var time = new Date() - new Date(this.state.initialTime);
        time /= 1000;
        if (this.state.rotationControl == false && event == 'rotation'){
            this.setState({ rotationControl: true});
            data.teleEvents.push({ "rotation control": "complete" })
            this.state.data.rotatiocontrol = true;
        } else if (this.state.positionControl == false && this.state.rotationControl == true && event == 'position'){
            this.setState({ positionControl: true });
            data.teleEvents.push({ "position control": "complete" })
            this.state.data.positioncontrol = true;
        }
        this._closeModal();
       
    }
}
export default Teleop;