import {
    CinemaScreen,
    HomeScreen,
    ProfileScreen,
    TicketScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MovieScreen from '../screens/MovieScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import AuthOTPScreen from '../screens/AuthOTPScreen';
import { CustomDrawerContent } from '../components';

const Drawer = createDrawerNavigator();
const AppDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                swipeEnabled: false,
                drawerPosition: 'right',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Movie" component={MovieScreen} />
            <Drawer.Screen name="Cinema" component={CinemaScreen} />
            <Drawer.Screen name="Ticket" component={TicketScreen} />
        </Drawer.Navigator>
    );
};

const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Drawer" component={AppDrawer} />
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
