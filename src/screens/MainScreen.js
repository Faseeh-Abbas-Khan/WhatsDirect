/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ImageBackground, ScrollView, Alert, Linking, BackHandler, Modal, Pressable } from 'react-native';

//other libraries
import Clipboard from '@react-native-clipboard/clipboard';
import CountryPicker from 'react-native-country-picker-modal';
import LinearGradient from 'react-native-linear-gradient';



//fonts
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const MainScreen = ({ navigation }) => {


    //back-handler
    useEffect(() => {
        const backAction = () => {
            setModalVisible(true);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    //data
    const [modalVisible, setModalVisible] = React.useState(false);
    const [countryCode, setCountryCode] = useState('PK');
    const [callingCode, setCallingCode] = useState('92');
    const [number, setNumber] = useState('');
    const [MessageText, setMessageText] = useState('');


    //text from clipboard
    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        if (text.startsWith('+')) {
            Alert.alert(
                'Error',
                `Please don't enter country Code`, [
                {
                    text: "ok",
                },
            ]
            )
            setNumber(text);
        }
        else {
            if (!isNaN(parseInt(text))) {
                setNumber(text);
            } else {
                Alert.alert(
                    'Error',
                    `You have copied text which is other then phone number.`, [
                    {
                        text: "ok",
                    },
                ]
                )
            }
        }
    };

    //setting number
    const setMsgNumber = (val) => {
        setNumber(`${val}`)
    }

    //setting message
    const setMessage = (val) => {
        setMessageText(val)
    }


    //validation
    const handelForm = (val) => {
        if (val.startsWith('+')) {
            Alert.alert(
                'Error',
                `Please don't enter country Code`, [
                {
                    text: "ok",
                },
            ]
            )
        }
    }

    const sendMessage = () => {
        if (number.startsWith('+')) {
            Alert.alert(
                'Error',
                `Please don't enter country Code`, [
                {
                    text: "ok",
                },
            ]
            )
        }
        else if (number.length < 8 || number.length > 16) {
            Alert.alert(
                'Error',
                `Please Enter Valid Number`, [
                {
                    text: "ok",
                },
            ]
            )
        }
        else
            Linking.openURL(
                `http://api.whatsapp.com/send?phone=+${callingCode}${number}&text=${MessageText}`)
    }

    const makeCall = () => {
        if (number.startsWith('+')) {
            Alert.alert(
                'Error',
                `Please don't enter country Code`, [
                {
                    text: "ok",
                },
            ]
            )
        } else if (number.length < 8 || number.length > 16) {
            Alert.alert(
                'Error',
                `Please Enter Valid Number`, [
                {
                    text: "ok",
                },
            ]
            )
        }
        else
            Linking.openURL(
                `http://api.whatsapp.com/send?phone=+${callingCode}${number}`)
    }

    //body
    return (
        <ImageBackground source={require('../assets/bgimageDrw.jpg')} style={styles.container} blurRadius={4}>
            <View>
                <ScrollView
                    keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                >
                    <StatusBar backgroundColor='#1E5B44' />

                    {/* Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hold On!</Text>
                                <Text style={{ fontSize: 15, marginVertical: 5, color: 'lightgrey' }}>Do you really want to leave this app?</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonExit]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                            BackHandler.exitApp()
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: '700', color: 'white' }}>Exit</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: '700', color: 'white' }}>Stay on app!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.wrapper}>
                        <View style={styles.inputSection}>
                            {/* number */}
                            <View style={styles.inputNumber}>
                                <CountryPicker
                                    withFilter
                                    countryCode={countryCode}
                                    withFlag
                                    withAlphaFilter={false}
                                    withCurrencyButton={false}
                                    withCallingCode
                                    onSelect={country => {
                                        const { cca2, callingCode } = country;
                                        setCountryCode(cca2);
                                        setCallingCode(callingCode[0]);
                                    }}
                                    containerButtonStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 30,
                                    }}
                                />
                                <FontAwesome name='angle-down' size={15} style={{ marginLeft: -10, marginRight: 4, color: 'grey' }} />
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Phone Number..."
                                    placeholderTextColor="grey"
                                    keyboardType='number-pad'
                                    multiline={true}
                                    maxLength={16}
                                    value={number}
                                    onChangeText={(val) => {
                                        setMsgNumber(val);
                                    }}
                                    onEndEditing={(e) => handelForm(e.nativeEvent.text)}
                                />
                                <TouchableOpacity
                                    style={{ width: 40, }}
                                    onPress={fetchCopiedText}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name='paste' size={15} color='#767676' />
                                        <Text style={{ fontSize: 13, color: '#767676', }}>paste</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* Message */}
                            <View style={styles.inputMsg} >
                                <TextInput
                                    style={styles.inputTextMsg}
                                    placeholder="Enter your message here..."
                                    multiline
                                    maxLength={500}
                                    placeholderTextColor="grey"
                                    onChangeText={(val) => setMessage(val)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                <LinearGradient
                                    colors={['#20bf55', '#3bb78f']}
                                    style={styles.Btn}>
                                    <TouchableOpacity
                                        style={styles.btnProp}
                                        onPress={sendMessage}
                                    >
                                        <Text style={styles.BtnText}>Send Text</Text>
                                        <FontAwesome name='envelope' size={15} color='white' />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#20bf55', '#3bb78f']}
                                    style={styles.Btn}>
                                    <TouchableOpacity
                                        style={styles.btnProp}
                                        onPress={makeCall}
                                    >
                                        <Text style={styles.BtnText}>Make Call</Text>
                                        <FontAwesome name='phone' size={17} color='white' />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', margin: 5 }}>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://sites.google.com/view/whatsdirectapp`)}>
                        <Text style={{ color: 'lightgrey' }}>Terms & Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://inbound.ltd`)}>
                        <Text style={{ color: 'lightgrey' }}>Inbound.ltd</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground >
    );
};

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#013137',
        alignItems: 'center',
        justifyContent: 'center',
    },
    add1: {
        width: '100%',
        marginVertical: 15,
        alignItems: 'center',
    },
    header: {
        marginHorizontal: 10,
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white'
    },
    wrapper: {
        height: 430,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 0,
        marginBottom: -20,
    },
    add2: {
        height: 170,
        width: 350,
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 0
    },
    inputNumber: {
        flexDirection: 'row',
        width: 335,
        backgroundColor: "#ECE9E9",
        borderRadius: 15,
        height: 60,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    inputMsg: {
        width: 335,
        backgroundColor: "#ECE9E9",
        borderRadius: 15,
        height: 140,
        marginBottom: 20,
        alignItems: "flex-start",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5.46,
        elevation: 9,
    },
    inputText: {
        height: 50,
        width: 225,
        color: "black",
        fontSize: 15,
        borderLeftWidth: 2,
        borderLeftColor: 'lightgrey',
        borderRightWidth: 2,
        borderRightColor: 'lightgrey',
        paddingLeft: 15,
        marginRight: 10
    },
    inputTextMsg: {
        height: "100%",
        width: '100%',
        color: "black",
        marginLeft: 5,
        fontSize: 17,
    },
    BtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Btn: {
        width: 150,
        marginHorizontal: 5,
        backgroundColor: "#388939",
        borderRadius: 15,
        height: 55,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 10
    },
    BtnText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginTop: -3
    },
    btnProp: {
        flexDirection: 'row',
        height: 60,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 20,
        marginTop: 250,
        backgroundColor: "#406E55",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        textAlign: "center",
        color: 'white',
        fontSize: 15,
        fontWeight: '600'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,
        marginTop: 20
    },
    buttonExit: {
        backgroundColor: "#35C27F",
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: "#0BC7D9",
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default MainScreen;
