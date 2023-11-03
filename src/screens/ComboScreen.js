import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import ComboList from '../components/list/ComboList';
import { SelectCombo } from '../constants/DataSelecteCombo';
import { Colors, Fonts } from '../constants';

const ComboScreen = ({ navigation }) => {
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };
    const handleButtonBack = () => {
        navigation.goBack(null);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Combo bắp  & nước'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ScrollView>
                <ComboList data={SelectCombo} />
            </ScrollView>
            <View
                style={{
                    width: '100%',
                    height: 80,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: Colors.DEFAULT_WHITE,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: Colors.DEFAULT_BLACK,
                        fontSize: 16,
                        fontFamily: Fonts.Bold,
                        marginLeft: 15,
                        maxWidth: 240,
                    }}
                    numberOfLines={1}
                >
                    SPIDER-MAN NO WAY HOME
                </Text>
                <Text
                    style={[
                        styles.displayInfomation,
                        { color: Colors.DEFAULT_BLACK },
                    ]}
                    numberOfLines={1}
                >
                    Ghế E09, E10
                </Text>
                <Text
                    style={[
                        styles.displayInfomation,
                        { color: Colors.DEFAULT_RED },
                    ]}
                    numberOfLines={1}
                >
                    Tạm tính: 220.000 đ
                </Text>
                <Pressable
                    style={{
                        width: 120,
                        height: 45,
                        backgroundColor: Colors.DARK_RED,
                        borderRadius: 40,
                        position: 'absolute',
                        right: 10,
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: Colors.DEFAULT_WHITE,
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: Fonts.Medium,
                        }}
                    >
                        Tiếp tục
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default ComboScreen;

const styles = StyleSheet.create({
    displayInfomation: {
        fontSize: 14,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
        maxWidth: 240,
    },
});
