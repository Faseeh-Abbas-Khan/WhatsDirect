import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';

const SplashScreen = () => {
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../assets/splashScreen.jpg')}
        >
            <StatusBar backgroundColor='#2E5C43' />
        </ImageBackground>
    )
}

export default SplashScreen;