import {
    AuthOTPScreen,
    BillScreen,
    CinemaScreen,
    DetailScreen,
    DiscountScreen,
    HomeScreen,
    LoginScreen,
    MovieScreen,
    ProfileScreen,
    RegisterScreen,
    TicketHistoryScreen,
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
            <Drawer.Screen
                name="TicketHistory"
                component={TicketHistoryScreen}
            />
            <Drawer.Screen name="Bill" component={BillScreen} />
            <Drawer.Screen name="Detail" component={DetailScreen} />
        </Drawer.Navigator>
    );
};

const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Login"
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
            <Stack.Screen name="Bill" component={BillScreen} />
            <Stack.Screen name="Discount" component={DiscountScreen} />

            <Stack.Screen
                name="TicketHistory"
                component={TicketHistoryScreen}
            />
        </Stack.Navigator>
    );
};

export default Navigator;
