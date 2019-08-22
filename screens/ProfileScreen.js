import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View,} from 'react-native';

export default class AnotherScreen extends React.Component {
    static navigationOptions = {
        title: 'Details',
    };
    state = {
        loading: true,
        message: 'I am state',
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading &&
                <ActivityIndicator size="large" color="#0000ff"/>
                }

                <Text style={styles.textTitle}>
                    {this.props.navigation.getParam('title', 'no title')}
                </Text>
                <Image
                    style={{width: '100%', height: '70%'}}
                    source={{uri: this.props.navigation.getParam('imageSrc', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjIvLiXm5TkAhXCzIUKHffRDeQQjRx6BAgBEAQ&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Floading&psig=AOvVaw2f_RVshoWsQWjdA1lBqSgC&ust=1566485412419552')}}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fdf4ff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    textTitle: {
        fontSize: 17,
        padding: 10
    }
});