import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";
import { Container, Card, CardItem, Text, Body } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';

class EventsGrid extends Component {
    renderEvents = events => {
        mappedEvents = events.length !== 0 ? (
            events.map(event =>
                (
                    <Card style={styles.cardItem} key={event.id}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Event', { eventId: event.id }) }}
                        >
                            <Image source={require('../assets/cat.jpg')} style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                    </Card>
                ))
        ) : (
                <Text>No events found</Text>
            )

        return mappedEvents
    }
    render() {
        const { events } = this.props
        return (
            <View style={styles.container}>
                {this.renderEvents(events)}
            </View>
        );
    }
}
export default withNavigation(EventsGrid);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        flexWrap: 'wrap'
    },
    cardItem: {
        width: '30%',
        height: 100
    }
});

