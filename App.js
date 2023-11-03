import React from 'react';
import Navigator from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor="black"
            />
            <Navigator />
        </NavigationContainer>
    );
};

export default App;
