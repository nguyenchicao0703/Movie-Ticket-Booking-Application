import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
import { MovieHomeItem } from '../components';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AuthOTPScreen from '../screens/AuthOTPScreen';

const Navigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Register"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Register" component={AuthOTPScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
