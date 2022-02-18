/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from 'react-native-popup-menu';

//drw
import MainStack from './route/mainStack'
import SplashScreen from "./screens/SplashScreen";

const app = () => {

  const [splash, setSplash] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1000)
  }, [])

  return (
    <NavigationContainer>
      <MenuProvider>
        {(splash) ? <SplashScreen /> :
          <MainStack />
        }
      </MenuProvider>
    </NavigationContainer>
  )
}

export default app