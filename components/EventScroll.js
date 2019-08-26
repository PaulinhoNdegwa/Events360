import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    ActivityIndicator,
    StyleSheet,
    Image,
    View,
    ScrollView,
    RefreshControl,
    FlatList
} from "react-native";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { getAllEvents } from '../redux/actionCreators/eventActions'
import { likeEvent, unlikeEvent } from '../redux/actionCreators/likeActions'
import { getTime, getTimeDifference } from '../utils/helpers.js';
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';

class Events extends Component {
    state = {
        refreshing: false
    }

    componentDidMount() {
        const { getAllEvents } = this.props;
        getAllEvents()
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { getAllEvents } = this.props;
        getAllEvents();
        this.setState({ refreshing: false });
    }

    renderMappedEvents = (events) => {
        const { likeEvent, unlikeEvent, likesCount } = this.props;
        const { user } = this.state;
        return events.map(event => {
            return (
                <Card style={styles.card} key={event.id}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../assets/cat.jpg')} style={styles.userThumbnail} />
                            <Body>
                                <Text>{event.title}</Text>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('UserProfile', { userEmail: event.host_email }) }}
                                >
                                    <Text note style={styles.eventOwner}>{event.host_email}</Text>
                                </TouchableOpacity>
                            </Body>
                        </Left>
                        <Right>
                            <Icon name='more' style={styles.eventMenu} />
                        </Right>
                    </CardItem>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Event', { eventId: event.id }) }}
                    >
                        <CardItem cardBody>
                            <Image source={require('../assets/cat.jpg')} style={{ height: 200, width: '100%' }} />
                        </CardItem>
                        <CardItem cardBody>
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventDetailsDesc}>{event.description}</Text>
                                <Text style={styles.eventCharges}>Charges: {event.charges}</Text>
                            </View>
                        </CardItem>
                    </TouchableOpacity>
                    <CardItem>
                        <Left>
                            <Button transparent small
                                style={styles.reactionButton}
                                onPress={
                                    event.liked ?
                                        () => unlikeEvent(event.id) :
                                        () => likeEvent({ event_id: event.id })
                                }
                            >
                                <Icon active name="thumbs-up" style={event.liked ? styles.likedButton : styles.buttonIcon}
                                />
                                <Text style={styles.iconText}>{event.likes_count} {event.likes_count === 1 ? 'Like' : 'Likes'}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent small style={styles.reactionButton} disabled={true}>
                                <Icon active name="chatbubbles" style={styles.buttonIcon} />
                                <Text style={styles.iconText}>{event.comments_count} {event.comments_count === 1 ? 'Comment' : 'Comments'}</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text style={styles.timeDifference}>{getTimeDifference(event.created_at)}</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
    }

    render() {
        const { events, loading } = this.props;
        if (loading === true) {
            return <ActivityIndicator size='large' color='black' />
        }
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} />
                }
            >
                <Container style={styles.container}>
                    {events && events.length > 0 ?
                        this.renderMappedEvents(events) :
                        <Text style={styles.notEventsText}>No events to display</Text>}
                </Container>
            </ScrollView>

        );
    }
}

const mapStateToProps = ({ eventsReducer }) => ({
    events: eventsReducer.events,
    loading: eventsReducer.loading,
    eventLiked: eventsReducer.eventLiked,
    eventUnliked: eventsReducer.eventUnliked
})

export default connect(mapStateToProps, { getAllEvents, likeEvent, unlikeEvent })(Events);

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    notEventsText: {
        top: '40%'
    },
    reactionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconText: {
        fontSize: 11,
        color: '#007aff'
    },
    card: {
        width: '100%'
    },
    userThumbnail: {
        width: 45,
        height: 45
    },
    eventOwner: {
        fontSize: 10
    },
    eventDetails: {
        paddingLeft: 20,
        marginTop: 10,
    },
    eventDetailsDesc: {
        fontSize: 12
    },
    eventCharges: {
        fontSize: 10,
    },
    timeDifference: {
        fontSize: 9,
        color: 'grey'
    },
    buttonIcon: {
        fontSize: 13,
        color: '#007aff'
    },
    eventMenu: {
        right: 10,
        color: 'black'
    },
    likedButton: {
        color: 'red'
    }
});
