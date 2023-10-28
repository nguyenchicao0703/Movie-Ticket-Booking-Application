import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, TicketFuture } from '../constants';
import { Header } from '../components';

const TopTabsTicketHistory = [
    { id: 1, category: 'Phim sắp xem' },
    { id: 2, category: 'Phim đã xem' },
];

const TicketHistoryScreen = () => {
    const { width, height, fontScale } = useWindowDimensions();
    const [clickButton, setClickButton] = useState(0);

    const handleClickTopTab = (index) => {
        setClickButton(index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header titleHeader={'Vé của tôi'} />
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {TopTabsTicketHistory.map((value, index) => (
                    <Pressable
                        key={index}
                        style={[
                            {
                                width: '50%',
                                height: width * 0.05 + height * 0.05,
                                backgroundColor:
                                    Colors.DARK_INDIGO_TICKET_HISTORY,
                                justifyContent: 'center',
                            },
                            clickButton === index
                                ? {
                                      borderBottomWidth: 1.5,
                                      borderBottomColor: Colors.DARK_RED,
                                  }
                                : null,
                        ]}
                        onPress={() => handleClickTopTab(index)}
                    >
                        <Text
                            style={{
                                fontSize: fontScale * 20,
                                color:
                                    clickButton === index
                                        ? Colors.DARK_RED
                                        : Colors.LIGHT_GRAY,
                                fontFamily: Fonts.Medium,
                                textAlign: 'center',
                            }}
                        >
                            {value.category}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <FlatList
                style={{ marginHorizontal: 10 }}
                data={TicketFuture}
                extraData={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        style={{
                            width: '100%',
                            height: height * 0.32,
                            marginTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={item.image}
                                style={{
                                    width: width * 0.32,
                                    height: height * 0.28 + 10,
                                    borderRadius: 5,
                                    marginRight: 10,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'column',
                                }}
                            >
                                <View
                                    style={{
                                        width: width * 0.35,
                                        paddingVertical: 5,
                                        backgroundColor: Colors.MEDIUM_GREEN,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.DEFAULT_WHITE,
                                            fontSize: fontScale * 16,
                                            fontFamily: Fonts.Bold,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Mã vé: {item.id}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: Colors.DEFAULT_WHITE,
                                        fontSize: fontScale * 16,
                                        fontFamily: Fonts.Bold,
                                        maxWidth: 230,
                                        marginTop: 10,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        color: Colors.DARK_RED,
                                        fontSize: fontScale * 16,
                                        fontFamily: Fonts.SemiBold,
                                        maxWidth: 230,
                                        marginTop: 10,
                                    }}
                                >
                                    {item.price} đ
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
};

export default TicketHistoryScreen;
