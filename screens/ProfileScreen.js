import React from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';


export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Details',
    };
    state: {
        isLoading: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    {this.props.navigation.getParam('title', 'no title')}
                </Text>
                <Image
                    style={{width: '100%', height: '70%'}}
                    source={{uri: this.props.navigation.getParam('imageSrc', '')}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    textTitle: {
        fontSize: 17,
        padding: 10
    }
});