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
    SeatScreen,
    ShowtimeCinemaScreen,
    ShowtimeMovieScreen,
    TicketScreen,
    WelcomeScreen,
    UpdateProfileScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components';
import ComboScreen from '../screens/ComboScreen';
import PaymentScreen from '../screens/PaymentScreen';

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
            backBehavior="history"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Movie" component={MovieScreen} />
            <Drawer.Screen name="Cinema" component={CinemaScreen} />
            <Drawer.Screen name="Ticket" component={TicketScreen} />
            <Drawer.Screen name="Detail" component={DetailScreen} />
            <Drawer.Screen
                name="ShowtimeMovie"
                component={ShowtimeMovieScreen}
            />
            <Drawer.Screen
                name="ShowtimeCinema"
                component={ShowtimeCinemaScreen}
            />
            <Drawer.Screen name="Seat" component={SeatScreen} />
            <Drawer.Screen
                name="UpdateProfile"
                component={UpdateProfileScreen}
            />
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
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="AuthOTP" component={AuthOTPScreen} />
            <Stack.Screen name="Bill" component={BillScreen} />
            <Stack.Screen name="Discount" component={DiscountScreen} />
            <Stack.Screen name="Combo" component={ComboScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
    );
};

export default Navigator;
