import React, {Component} from 'react';
import {
    FlatList, Image, StyleSheet, Text, TouchableOpacity, View,
    ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    state = {
        isLoading: false,
        redditPosts: [],
        countries: [
            {name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"},
            {name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"},
            {name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"},
            {name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"},
            {name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"},
            {name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"},
            {name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"},
            {name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"},
            {name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"},
            {name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"},
            {name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"},
            {name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"},
            {name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"},
            {name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"},
            {name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"},
            {name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"},
            {name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"},
        ],
    };
    static navigationOptions = {
        title: 'Recent Reddit Posts',
    };

    handleListTap = item => {
        const {navigate} = this.props.navigation;
        navigate('Profile', {
            title: item.data.title,
            imageSrc: item.data.preview.images[0].source.url
        });
    };

    componentDidMount() {
        return fetch('https://reddit.com/r/aww.json?raw_json')
            .then((response) => response.json())
            .then(dataFromResponse => {
                this.setState({
                    isLoading: false,
                    redditPosts: dataFromResponse.data.children,
                });
            }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={() =>
                        <View
                            style={{height: 1, width: '100%', backgroundColor: 'lightgray'}}
                        />
                    }
                    data={this.state.redditPosts}
                    keyExtractor={item => item.data.id}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
                            onPress={() => this.handleListTap(item)}
                        >
                            <Image
                                style={{width: 50, height: 50, borderRadius: 20}}
                                source={{uri: item.data.thumbnail}}
                            />
                            <Text style={{padding: 10, flex: 1}}>{item.data.title}</Text>
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
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});