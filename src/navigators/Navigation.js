import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';
import { MovieHomeItem } from '../components';
import DiscountScreen from '../screens/DiscountScreen';
import BillScreen from '../screens/BillScreen';

const Navigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
