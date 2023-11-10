import React from 'react';
import Navigator from './src/navigators';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar
                    animated={true}
                    barStyle="light-content"
                    backgroundColor="black"
                />
                <Navigator />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
