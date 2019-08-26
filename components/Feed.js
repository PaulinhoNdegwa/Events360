import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Button, Icon } from 'native-base'
import Events from './Events'
import { TouchableOpacity } from "react-native-gesture-handler";

class Feed extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Events navigation={this.props.navigation} />
                <Button
                    small
                    onPress={() => navigation.navigate("NewEvent")}
                    style={styles.addEventButton}
                >
                    <Icon name='add' style={styles.addEventIcon} />
                </Button>
            </View>
        );
    }
}
export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addEventButton: {
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        backgroundColor: '#2c97f5',
        bottom: 30,
        right: 30,
        height: 50,
        borderRadius: 60,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.7
    },
    addEventIcon: {
        fontSize: 26
    }
});
