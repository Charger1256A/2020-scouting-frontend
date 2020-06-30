import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import fieldImages from '../index';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { pow } from 'react-native-reanimated';

let postions = require('../assets/button_settings/teleoppositions.json');

class Teleop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isControlPanellVisible: false, isPowerCellModalVisible: false, lower1: 0, outer1: 0, inner1: 0, lower2: 0, outer2: 0, inner2: 0, lower3: 0, outer3: 0, inner3: 0, lower4: 0, outer4: 0, inner4: 0, lower5: 0, outer5: 0, inner5: 0, lower6: 0, outer6: 0, inner6: 0, lowerclicks: 0, outerclicks: 0, innerclicks: 0, rotationControl: false, positionControl: false, position: "0" }
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
        data.rotationcontrol = false;
        data.positioncontrol = false;
        data.teleLower = 0;
        data.teleOuter = 0;
        data.teleInner = 0;
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
                                <Text style={autoStyles.Font}>Lower: {this.state.data.teleLower}</Text>
                                <Text style={autoStyles.Font}>Outer: {this.state.data.teleOuter}</Text>
                                <Text style={autoStyles.Font}>Inner: {this.state.data.teleInner}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.126, flexDirection: 'row', paddingHorizontal: 40 }}>
                    <TouchableOpacity style={[autoStyles.UndoButton, { marginHorizontal: 30, marginBottom: 25 }]} onPress = {() => { this._undo() }} >
                        <View style={autoStyles.Center}>
                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Undo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[prematchStyles.NextButton, { marginHorizontal: 60, marginBottom: 25 }]} onPress={() => { this.props.navigation.navigate('PostmatchScreen', { data: this.state.data }) }} >
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
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]} onPress={() => { this._updateCPModal('rotation'); }}>
                                        <View style={[autoStyles.Center, { marginBottom: 20 }]}>
                                            <Image style={{ flex: 1, resizeMode: 'contain', marginTop: 25 }} source={require('../assets/game_pieces/rotation-control.png')} />
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Rotation Control</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]} onPress={() => { this._updateCPModal('position'); }}>
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
            this._openPCModal(id);
        }
    }
    _openPCModal(id) {
        this.setState({ isPowerCellModalVisible: true, position: id });
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
        var position = this.state.position
        var lower = this.state.lowerclicks;
        powercells.push(lower);
        var outer = this.state.outerclicks;
        powercells.push(outer);
        var inner = this.state.innerclicks;
        powercells.push(inner);
        var event = { Lowergoal: lower, Outergoal: outer, Innergoal: inner };
        data.teleEvents.push({ "time": time.toString(), "event": event, "position": position });
        data.teleLower += lower;
        data.teleOuter += outer;
        data.teleInner += inner;
        
        console.log(JSON.stringify(data.teleEvents));
        console.log(new Date())
        if (position == 1) {
            data.tele1.lower += lower;
            data.tele1.outer += outer;
            data.tele1.inner += inner;
        }
        if (position == 2) {
            data.tele2.lower += lower;
            data.tele2.outer += outer;
            data.tele2.inner += inner;
        }
        if (position == 3) {
            data.tele3.lower += lower;
            data.tele3.outer += outer;
            data.tele3.inner += inner;
        }
        if (position == 4) {
            data.tele4.lower += lower;
            data.tele4.outer += outer;
            data.tele4.inner += inner;
        }
        if (position == 5) {
            data.tele5.lower += lower;
            data.tele5.outer += outer;
            data.tele5.inner += inner;
        }
        if (position == 6) {
            data.tele6.lower += lower;
            data.tele6.outer += outer;
            data.tele6.inner += inner;
        }

        this.setState({ data: data });
    }
    _updateCPModal(event) {
        let data = this.state.data;
        var time = new Date() - new Date(this.state.initialTime);
        time /= 1000;
        if (this.state.rotationControl == false && event == 'rotation') {
            this.setState({ rotationControl: true });
            powercells.push('RC')
            data.teleEvents.push({ "time": time.toString(), "rotation control": "complete" })
            data.rotationcontrol = true;
            this._closeModal();
        } else if (this.state.positionControl == false && this.state.rotationControl == false && event == 'position') {
            Alert.alert(
                'Control Panel',
                'Rotation Control must be achieved before Position Control',
                { cancelable: false },
            );
        }
        else if (this.state.positionControl == false && this.state.rotationControl == true && event == 'position') {
            this.setState({ positionControl: true });
            powercells.push('PC')
            data.teleEvents.push({ "time": time.toString(), "position control": "complete" })
            data.positioncontrol = true;
            this._closeModal();
        } else if (this.state.rotationControl == true && event == 'rotation') {
            Alert.alert(
                'Rotation Control',
                'Rotation Control has already been achieved',
                [
                    { text: 'OK', onPress: () => this._closeModal() },
                ],
                { cancelable: false },
            );
        } else if (this.state.positionControl == true && event == 'position') {
            Alert.alert(
                'Position Control',
                'Position Control has already been achieved',
                [
                    { text: 'OK', onPress: () => this._closeModal() },
                ],
                { cancelable: false },
            );
        }

        this.setState({ data: data });

        // this._closeModal();

    }

    _undo() {
        let data = this.state.data;
        let last = data.teleEvents.pop();
        var len = powercells.length

        if (last != null && powercells[len - 1] != "RC" && powercells[len - 1] != "PC") {
        //   last.event.success == 1 ? data[`auto${this._titleCase(last.event.itemScored)}`] -= 1 : "";
          var i;
          for (i = 0; i < powercells.length; i++) {
            if (i == powercells.length - 3) {
              let lastlower = powercells[i];
              data.teleLower -= lastlower;
            }
            if (i == powercells.length - 2) {
              let lastouter = powercells[i];
              data.teleOuter -= lastouter;
            }
            if (i == powercells.length - 1) {
              let lastinner = powercells[i]
              data.teleInner -= lastinner;
            }
          }
          var n = 0;
          while (n < 3) {
            n += 1
            powercells.splice(-1, 1);
          }
    
          this.setState({ data: data })
        }

        if (powercells[len - 1] == "RC") {
            this.setState({ rotationControl: false });
            data.rotationcontrol = false;
            powercells.splice(-1, 1);
        }

        if (powercells[len - 1] == "PC") {
            this.setState({ positionControl: false });
            data.positioncontrol = false;
            powercells.splice(-1, 1);
        }


        this.setState({ data: data });
      }
}
export default Teleop;