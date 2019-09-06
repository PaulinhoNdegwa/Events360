import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import GenericUserProfile from './GenericUserProfile'

class UserProfile extends Component {
    render() {
        const { userEmail } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <GenericUserProfile userEmail={userEmail} navigation={this.props.navigation} />
            </View>
        );
    }
}
export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
