import { ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = () => {
    return (
        <ActivityIndicator
            size="large"
            color="#FF0000"
            style={{ marginTop: 10 }}
        />
    );
};

export default Loading;
