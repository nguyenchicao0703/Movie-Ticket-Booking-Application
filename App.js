import React from 'react';
import Navigator from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
};

export default App;
