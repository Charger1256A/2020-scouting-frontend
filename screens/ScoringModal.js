import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

class ScoringModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, isModalVisible: false, control: false }
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
                <TouchableOpacity onPress={() => this._openmodal()}>
                    <Text>Scoring Modal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._openControlPanel()}>
                    <Text>Control Pannel Modal</Text>
                </TouchableOpacity>


                <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={this.state.isModalVisible}>
                    <View style={autoStyles.ModalContent}>
                        <View style={[autoStyles.Center]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[autoStyles.Font, { textAlign: 'center' }]}>Select Goal</Text>
                            </View>
                        </View>
                        <View style={[autoStyles.Left, { marginBottom: 10 }]}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 20, marginBottom: 50, marginTop: -200 }}>
                                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]} >
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Lower</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Outer</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 390, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Inner</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 450 }}>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]} onPress={() => {console.log(this._addLower(1));}}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.AddStackButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>+</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 525 }}>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]} >
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 50, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.SubtractStackButton, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, marginTop: -295, marginLeft: 600 }}>
                                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreView, { width: '100%' }]} >
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Lower</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreView, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Outer</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: 200, height: 50, marginBottom: 10 }}>
                                    <TouchableOpacity style={[autoStyles.ScoreView, { width: '100%' }]}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Inner</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.62, flexDirection: 'row', marginBottom: 30 }}>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.CancelButton, { width: '100%' }]} onPress={() => this._closemodal()}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[autoStyles.Center, { marginHorizontal: 20 }]}>
                                    <TouchableOpacity style={[autoStyles.SaveButton, { width: '100%' }]} onPress={() => this._closemodal()}>
                                        <View style={[autoStyles.Center]}>
                                            <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={this.state.control}>
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
                                <TouchableOpacity style={autoStyles.CancelButton} onPress={() => this._closemodal()}>
                                    <View style={autoStyles.Center}>
                                        <Text style={[prematchStyles.Font, prematchStyles.ButtonFont]}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>




        )
    }
    _openmodal() {
        this.setState({ isModalVisible: true })
    }
    _closemodal() {
        this.setState({ isModalVisible: false, control: false })
    }
    _openControlPanel() {
        this.setState({ control: true })
    }
    _addLower(n) { 
        return (x) => {
            return x + n;   
        };
    };
}
autoStyles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#eaeaea',
        paddingTop: 30,
        paddingHorizontal: 20,
        marginBottom: 30,
        flexDirection: 'row',
    },
    Font: {
        fontFamily: 'Helvetica-Light',
        fontSize: 25
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    Right: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    ModalContent: {
        flex: 0.9,
        width: 900,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20
    },
    CancelButton: {
        flex: 1,
        backgroundColor: '#f74c4c',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#d63e3e'
    },
    SaveButton: {
        flex: 1,
        backgroundColor: '#2E8B57',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#006400'
    },
    ScoreButton: {
        flex: 1,
        backgroundColor: '#24a2b6',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#13616d'
    },
    AddStackButton: {
        flex: 1,
        backgroundColor: '#32CD32',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#13616d'
    }, 
    SubtractStackButton: {
        flex: 1,
        backgroundColor: '#d63e3e',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#13616d'
    }, 
    UndoButton: {
        flex: 1,
        backgroundColor: '#ffae19',
        borderRadius: 7,
        borderBottomWidth: 5,
        borderColor: '#c98302'
    },
    ScoreView: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#13616d'
    }
})

export default ScoringModal;