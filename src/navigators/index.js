import {
    AuthOTPScreen,
    CinemaScreen,
    HomeScreen,
    LoginScreen,
    MovieScreen,
    ProfileScreen,
    RegisterScreen,
    TicketScreen,
    WelcomeScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components';

const Drawer = createDrawerNavigator();
const AppDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
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
            initialRouteName="MovieSelectCard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Drawer" component={AppDrawer} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="Cinema" component={CinemaScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="AuthOTP" component={AuthOTPScreen} />
        </Stack.Navigator>
    );
};

export default Navigator;
