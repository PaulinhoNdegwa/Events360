import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    ScrollView,
    RefreshControl,
    TextInput
} from "react-native";
import { Container, Card, CardItem, Thumbnail, Button, Text, Icon, Left, Body, Right } from 'native-base';
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

import { getTime, getTimeDifference } from '../utils/helpers';
import { likeEvent, unlikeEvent } from '../redux/actionCreators/likeActions'
import { getSingleEvent } from '../redux/actionCreators/eventActions';
import { postComment } from '../redux/actionCreators/commentsActions';

class Event extends Component {
    state = {
        refreshing: false,
        comment: '',
    }

    componentDidMount() {
        const { eventId } = this.props.navigation.state.params;
        const { getSingleEvent } = this.props;
        getSingleEvent(eventId)
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { eventId } = this.props.navigation.state.params;
        const { getSingleEvent } = this.props;
        getSingleEvent(eventId);
        this.setState({ refreshing: false });
    }

    handleSaveComment = () => {
        const { eventId } = this.props.navigation.state.params;
        const { postComment } = this.props;
        const { comment } = this.state;
        postComment({
            comment: comment,
            event_id: eventId
        })
        this.setState({ comment: '' })
    }

    renderEvent = (event) => {
        const { likeEvent, unlikeEvent } = this.props;
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
                </CardItem>
                <CardItem cardBody>
                    <Image source={require('../assets/cat.jpg')} style={{ height: 250, width: '100%' }} />
                </CardItem>
                <CardItem>
                    <Button small onPress={() => { this.props.navigation.navigate('Invite', { eventId: event.id }) }}><Text>Invite</Text></Button>
                </CardItem>
                <CardItem cardBody>
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventDetailsDesc}>{event.description}</Text>
                        <Text style={styles.eventDetailsText}>Charges: {event.charges}</Text>
                        <Text style={styles.eventDetailsText}>Start Date: {getTime(event.start_date)}</Text>
                        <Text style={styles.eventDetailsText}>End Date: {getTime(event.end_date)}</Text>
                    </View>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent
                            small style={styles.reactionButton}
                            onPress={
                                event.liked ?
                                    () => unlikeEvent(event.id) :
                                    () => likeEvent({ event_id: event.id })
                            }>
                            <Icon active name="thumbs-up" style={event.liked ? styles.likedButton : styles.buttonIcon} />
                            <Text style={styles.iconText}>{event.likes_count} {event.likes_count === 1 ? 'Like' : 'Likes'}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent small style={styles.reactionButton}>
                            <Icon active name="chatbubbles" style={styles.buttonIcon} />
                            <Text style={styles.iconText}>{event.comments_count} {event.comments_count === 1 ? 'Comment' : 'Comments'}</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text style={styles.timeDifference}>{getTimeDifference(event.created_at)}</Text>
                    </Right>
                </CardItem>
            </Card >
        )

    }

    renderComments = comments => {
        mappedComments = comments.length !== 0 ? (
            comments.map(comment => {
                return (
                    <View style={styles.notificationCard} key={comment.id}>
                        <CardItem style={styles.commentItem}>
                            <Left>
                                <Thumbnail source={require('../assets/cat.jpg')} style={styles.commentThumbnail} />
                                <Body>
                                    <Text style={styles.commentOwner}>{comment.user.name}</Text>
                                    <Text style={styles.commentText}> {comment.comment}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem style={styles.commentReactionBox}>
                            <Button
                                small transparent style={styles.commentReactionButton}
                            >
                                <Text style={styles.commentReactionButtonText}>Like</Text>
                            </Button>
                            <Button
                                small transparent style={styles.commentReactionButton}
                            >
                                <Text style={styles.commentReactionButtonText}>Reply</Text>
                            </Button>
                        </CardItem>
                    </View>
                )
            })
        ) :
            null
        return mappedComments;
    }

    render() {
        const { eventLoading, event, comments } = this.props;
        const { comment } = this.state;
        if (eventLoading === true) {
            return <ActivityIndicator size='large' color='black' style={styles.activityIndicator} />
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
                    <View>
                        {this.renderEvent(event)}
                    </View>
                    <CardItem style={styles.commentsInputBox}>
                        <TextInput
                            style={styles.commentsInput}
                            placeholder='Add a comment...'
                            multiline={true}
                            value={comment}
                            onChangeText={(comment) => { this.setState({ comment }) }}
                        />
                        <Right>
                            <TouchableOpacity
                                transparent
                                style={styles.sendButton}
                                activeOpacity={0}
                                onPress={this.handleSaveComment}
                            >
                                <Icon style={styles.sendIcon} name='send' />
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                    <View>
                        {this.renderComments(comments)}
                    </View>
                </Container>
            </ScrollView>

        );
    }
}

const mapStateToProps = ({ eventsReducer }) => ({
    eventLoading: eventsReducer.singleEventLoading,
    event: eventsReducer.event,
    comments: eventsReducer.comments,
    postCommentSuccess: eventsReducer.postCommentSuccess
})

export default connect(mapStateToProps, { getSingleEvent, postComment, likeEvent, unlikeEvent })(Event);

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    activityIndicator: {
        flex: 1,
    },
    reactionButton: {
        alignItems: 'center'
    },
    iconText: {
        fontSize: 11
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
    eventDetailsText: {
        fontSize: 10
    },
    timeDifference: {
        fontSize: 9,
        color: 'grey'
    },
    buttonIcon: {
        fontSize: 13
    },
    sendIcon: {
        fontSize: 26,
        color: '#007aff',
        alignSelf: 'center'
    },
    likedButton: {
        color: 'red'
    },
    commentsInputBox: {
        width: '100%',
        alignSelf: 'center'
    },
    commentsInput: {
        paddingLeft: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.7,
        width: '80%',
        height: 25
    },
    sendButton: {
        height: 30,
    },
    commentItem: {
        paddingBottom: 0
    },
    commentThumbnail: {
        width: 29,
        height: 29
    },
    commentOwner: {
        fontSize: 11,
        color: '#007aaf'
    },
    commentText: {
        fontSize: 10,
        marginTop: 2
    },
    commentReactionBox: {
        justifyContent: 'flex-end',
        borderRadius: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        marginRight: 50
    },
    commentReactionButton: {
        // height: 15
    },
    commentReactionButtonText: {
        fontSize: 11
    }
});
