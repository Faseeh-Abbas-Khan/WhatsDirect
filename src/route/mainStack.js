import React from 'react';
import { StyleSheet, Text, Linking, Share, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

//screens
import MainScreen from '../screens/MainScreen';

//menu
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function MainStack() {

    const FacebookLink = () => {
        Linking.openURL(`https://www.facebook.com/inboundpk`);
    };
    const InstagramLink = () => {
        Linking.openURL(`https://www.instagram.com/inboundpk`);
    };
    const Inboundltd = () => {
        Linking.openURL(`https://inbound.ltd`);
    };
    const TermsAndPrivacy = () => {
        Linking.openURL(`https://sites.google.com/view/
        whatsdirectapp`);
    };
    const Rateus = () => {
        Linking.openURL(`https://play.google.com/store/apps/details?id=com.inbound.whatsdirectchat`);
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Hey check out this small app to send WhatsApp without saving contacts. Send WhatsApp messages and media to any number without saving contact. Download it from playstore.
                    https://play.google.com/store/apps/details?id=com.inbound.whatsdirectchat`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <Stack.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#1E5B44',
                    position: 'absolute',
                    bottom: 5,
                    marginHorizontal: 50,
                    height: 50,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 30
                },
            }}
        >
            <Stack.Screen name="Home" component={MainScreen}
                options={
                    {
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: '#1E5B44',
                        },
                        headerRight: () => (
                            <Menu>
                                <MenuTrigger>
                                    <View style={styles.trigger} >
                                        <Ionicons name='menu' size={30} color='white' />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions optionsContainerStyle={styles.menuOpt}>
                                    <MenuOption onSelect={Inboundltd}>
                                        <Text style={styles.lable}>About Us</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={TermsAndPrivacy}>
                                        <Text style={styles.lable}>Terms and Privacy</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={FacebookLink}>
                                        <Text style={styles.lable}>Like us on Facebook</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={InstagramLink}>
                                        <Text style={styles.lable}>Follow us on Instagram</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={onShare}>
                                        <Text style={styles.lable}>Share App</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={Rateus}>
                                        <Text style={styles.lable}>Rate Us</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>),
                        title: 'Whats-Direct-Chat',
                    }
                }
            />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    menuOpt: {
        marginTop: 40,
        backgroundColor: '#1E5B44',
        borderRadius: 5
    },
    lable: {
        height: 20,
        fontSize: 15,
        margin: 5,
        color: 'lightgrey'
    },
    trigger: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})