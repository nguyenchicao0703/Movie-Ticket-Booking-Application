import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    CinemaScreen,
    HomeScreen,
    ProfileScreen,
    TicketScreen,
} from '../screens';
import MovieScreen from '../screens/MovieScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import AuthOTPScreen from '../screens/AuthOTPScreen';

const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="Cinema" component={CinemaScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AuthOTPScreen" component={AuthOTPScreen} />
        </Stack.Navigator>
    );
};

export default Navigator;
