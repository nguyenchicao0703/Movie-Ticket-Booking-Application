import React from 'react';
import Navigator from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

const App = () => {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
};

export default App;
