import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    redirect = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? "Home" : "Login");
    };

    render() {
        setTimeout(this.redirect, 500)
        return (
            <ImageBackground source={require('../assets/backgroundphoto.jpeg')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Event360</Text>
                    <Text style={styles.description}>Forget posters. Digital events are here!</Text>
                    <ActivityIndicator size="large" style={styles.loader} color="black" />
                </View>
            </ImageBackground>
        );
    }
}
export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, header: {
        marginTop: 200,
        fontSize: 30,
        color: "black",
        fontWeight: '800'
    }, description: {
        marginTop: 7,
        fontSize: 15,
        fontStyle: 'italic',
        color: "black",
        fontWeight: '800'
    }, loader: {
        marginTop: 15
    }
});
