import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { Colors, Fonts } from '../constants';

const CinemaAPI = () => {
    const [data, setData] = useState([]);
    const { height, width } = useWindowDimensions();
    const fontSize = height * 0.024;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://10.0.2.2:1234/api/Danh-sach-rap.php',
            );
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            {data.map((item) => (
                <Pressable onPress={{}}>
                    <View style={[styles.container, { height: height * 0.08 }]}>
                        <Text style={[styles.brandMTB, { fontSize }]}>MTB</Text>
                        <Text
                            style={[styles.cinemaName, { fontSize }]}
                            key={item.id_rap}
                        >
                            {item.ten_rap}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
};

export default CinemaAPI;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
        backgroundColor: Colors.DARK_BG,
        flexDirection: 'row',
    },
    brandMTB: {
        color: Colors.DARK_RED,
        fontFamily: Fonts.Medium,
        marginLeft: 10,
    },
    cinemaName: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginLeft: 5,
    },
});
