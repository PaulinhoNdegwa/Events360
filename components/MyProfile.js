import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import GenericUserProfile from './GenericUserProfile'

class MyProfile extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            user: {}
        }
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem("user")
        this.setState({
            user: JSON.parse(user),
            loading: false
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {!this.state.loading ? <GenericUserProfile userEmail={this.state.user.email} navigation={this.props.navigation} /> : null}
            </View>
        );
    }
}
export default MyProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
