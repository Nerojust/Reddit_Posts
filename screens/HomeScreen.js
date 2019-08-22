import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

export default class HomeScreen extends React.Component {
    state = {
        loading: true,
        posts: [],
        message: 'I am state',
    };
    static navigationOptions = {
        title: 'Recent Reddit Posts',
    };

    handleListTap = item => {
        console.log(item.name);
        this.props.navigation.navigate('Profile', {
            title: item.data.title,
            imageSrc: item.data.preview.images[0].source.url
        });
    };

    componentDidMount() {
        fetch('https://reddit.com/r/aww.json?raw_json=1')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    posts: data.data.children
                });
            });
    }

    render() {

        return (
            <View style={styles.container}>
                {this.state.loading &&
                <ActivityIndicator size="large" color="#0000ff" />
                }

                <FlatList
                    ItemSeparatorComponent={() =>
                        <View
                            style={{ height: 1, width: '100%', backgroundColor: 'lightgray' }}
                        />
                    }
                    data={this.state.posts}
                    keyExtractor={item => item.data.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
                            onPress={() => this.handleListTap(item)}
                        >
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                source={{ uri: item.data.thumbnail }}
                            />
                            <Text style={{ padding: 10 }}>{item.data.title}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        flex: 1,
        backgroundColor: '#fdf4ff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});