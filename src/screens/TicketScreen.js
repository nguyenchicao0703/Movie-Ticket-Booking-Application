import {
    FlatList,
    Image,
    Pressable,
    Text,
    ToastAndroid,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { Header, MovieList, NoShowtimeMessage } from '../components';
import ticketAPI from '../api/ticketAPI';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';

const TopTabsTicketHistory = [
    { id: 1, category: 'Phim sắp xem' },
    { id: 2, category: 'Phim đã xem' },
];

const TicketScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [clickTab, setClickTab] = useState(0);
    const [data, setData] = useState([]);
    const [movie, setMovie] = useState([]);
    const [index, setIndex] = useState('1');

    const idUser = useSelector(usersSelector);

    const handleClickTopTab = (index) => {
        setClickTab(index);
    };

    const handleButtonBack = () => {
        navigation.goBack();
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await ticketAPI.getAll(
                    idUser.users.data.id_user,
                );
                // console.log('response ticket', response.data);
                console.log('fetch');
                response.status ? setData(response.data) : setData([]);
                console.log('thay đổi');
            } catch (error) {
                console.log('Error fetching tickets', error);
            }
        };
        fetchTickets();
    }, [index]);

    useEffect(() => {
        // console.log('data', data);
        let filterTypeTicket =
            data !== undefined
                ? data.filter((item) =>
                      clickTab === 0 ? item.loaikc === 1 : item.loaikc === 2,
                  )
                : [];
        setMovie(filterTypeTicket);
        // console.log({ movie });
        console.log('movie đã đc render');
    }, [clickTab, data]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Vé của tôi'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {TopTabsTicketHistory.map((value, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleClickTopTab(index)}
                        style={[
                            {
                                width: '50%',
                                height: width * 0.05 + height * 0.05,
                                backgroundColor:
                                    Colors.DARK_INDIGO_TICKET_HISTORY,
                                justifyContent: 'center',
                            },
                            clickTab === index
                                ? {
                                      borderBottomWidth: 1.5,
                                      borderBottomColor: Colors.DARK_RED,
                                  }
                                : null,
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: fontScale * 20,
                                color:
                                    clickTab === index
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
            {clickTab === 0 ? (
                movie.length === 0 ? (
                    <NoShowtimeMessage title={'Chưa có dữ liệu vé của bạn'} />
                ) : (
                    <MovieList data={movie} listCase={'TicketUnView'} />
                )
            ) : movie.length === 0 ? (
                <NoShowtimeMessage title={'Chưa có dữ liệu vé của bạn'} />
            ) : (
                <MovieList data={movie} listCase={'TicketViewed'} />
            )}
        </View>
    );
};

export default TicketScreen;
