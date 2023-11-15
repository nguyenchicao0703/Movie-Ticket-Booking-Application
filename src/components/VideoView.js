import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoView = ({ ref }) => {
    return (
        <View style={styles.container}>
            <Video
                source={{
                    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                }}
                style={styles.video}
                controls={true}
                resizeMode="cover"
                ref={ref}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default VideoView;
