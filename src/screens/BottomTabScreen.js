import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MovieScreen from './MovieScreen';
import { BottomTabImage, Colors } from '../constants';
import TicketScreen from './TicketScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Movie"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    left: 10,
                    elevation: 0,
                    height: 80,
                    backgroundColor: '#B73131',
                    borderRadius: 25,
                },
                tabBarIcon: () => {
                    if (route.name === 'Movie') {
                        return <Image source={BottomTabImage[1].image} />;
                    } else if (route.name === 'Home') {
                        return <Image source={BottomTabImage[0].image} />;
                    } else if (route.name === 'Ticket') {
                        return <Image source={BottomTabImage[2].image} />;
                    } else if (route.name === 'Profile') {
                        return <Image source={BottomTabImage[3].image} />;
                    }
                },
                headerShown: false,
                tabBarInactiveTintColor: Colors.DEFAULT_WHITE,
                tabBarActiveTintColor: Colors.DEFAULT_WHITE,
                tabBarLabelStyle: {
                    marginBottom: 8,
                    fontSize: 14,
                },
            })}
        >
            <Tab.Screen name="Movie" component={MovieScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Ticket" component={TicketScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabScreen;

const styles = StyleSheet.create({});
