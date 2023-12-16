import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState, Suspense } from 'react';
import { Colors, Fonts } from '../constants';
import { Header, Loading, NoShowtimeMessage } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { ticketsSelector, usersSelector } from '../redux/selectors';
import { fetchTicket } from '../redux/slice/ticketsSlice';

const MovieList = React.lazy(() => import('../components/list/MovieList'));

const TopTabsTicketHistory = [
    { id: 1, category: 'Phim sắp xem' },
    { id: 2, category: 'Phim đã xem' },
];

let listCase;

const TicketScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [clickTab, setClickTab] = useState(0);
    const [data, setData] = useState([]);
    const [movie, setMovie] = useState([]);

    const dispatch = useDispatch();
    const idUser = useSelector(usersSelector);
    const ticketMovie = useSelector(ticketsSelector);

    useEffect(() => {
        dispatch(fetchTicket(idUser.users.data?.id_user));
    }, []);

    useEffect(() => {
        const filterTypeTicket = ticketMovie.filter((item) =>
            clickTab === 0 ? item.loaikc === 1 : item.loaikc === 2,
        );
        setMovie(filterTypeTicket);
        clickTab === 0
            ? (listCase = 'TicketViewed')
            : (listCase = 'TicketUnView');
    }, [ticketMovie, clickTab]);

    useEffect(() => {
        const filterTypeTicket = data.filter((item) =>
            clickTab === 0 ? item.loaikc === 1 : item.loaikc === 2,
        );
        setMovie(filterTypeTicket);
        clickTab === 0
            ? (listCase = 'TicketViewed')
            : (listCase = 'TicketUnView');
    }, [data, clickTab]);

    const handleClickTopTab = (index) => {
        setClickTab(index);
    };

    const handleButtonBack = () => {
        navigation.goBack();
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

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
            {movie.length === 0 ? (
                <NoShowtimeMessage
                    title={'Chưa có dữ liệu vé của bạn'}
                    listCase={'NoTicket'}
                />
            ) : (
                <Suspense fallback={<Loading />}>
                    <MovieList data={movie} listCase={listCase} />
                </Suspense>
            )}
        </View>
    );
};

export default TicketScreen;
