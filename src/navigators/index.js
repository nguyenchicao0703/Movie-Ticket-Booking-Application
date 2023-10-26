import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    CinemaScreen,
    HomeScreen,
    ProfileScreen,
    TicketScreen,
} from '../screens';
import MovieScreen from '../screens/MovieScreen';

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
        </Stack.Navigator>
    );
};

export default Navigator;
