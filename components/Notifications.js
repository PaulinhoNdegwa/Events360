import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'

import { Container, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, View } from 'native-base';
import { getAllNotifications } from '../redux/actionCreators/notificationsActions'

class Notifications extends Component {
    state = {
        refreshing: false
    }

    componentDidMount() {
        const { getAllNotifications } = this.props;
        getAllNotifications();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { getAllNotifications } = this.props;
        getAllNotifications();
        this.setState({ refreshing: false });
    }

    mapNotifications = (notificationsArray) => {
        mappedNotifications = notificationsArray.map(notification => {
            return (
                <Card style={styles.notificationCard} key={notification.id}>
                    <CardItem style={notification.read_at ? null : styles.notificationUnreadCard}>
                        <Left>
                            <Thumbnail source={require('../assets/cat.jpg')} style={styles.notificationThumbnail} />
                            <Body>
                                {
                                    notification.data.sender ? (
                                        <Text style={styles.notificationText}>{notification.data.sender.name} {notification.data.message}</Text>

                                    ) : (
                                            <Text style={styles.notificationText}>{notification.data.follower.name} {notification.data.message}</Text>
                                        )
                                }
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )
        })
        return mappedNotifications;
    }

    render() {
        const { loading, notifications } = this.props;
        if (loading === true) {
            return <ActivityIndicator size='large' color='black' />
        }
        return (
            <View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh} />
                    }
                >
                    <Container style={styles.container}>
                        {notifications.length > 0 ?
                            this.mapNotifications(notifications) :
                            <Text style={styles.emptyNotificationContainer}>No notifications yet!</Text>
                        }
                    </Container>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = ({ notificationsReducer }) => ({
    loading: notificationsReducer.loading,
    notifications: notificationsReducer.notifications
});

export default connect(mapStateToProps, { getAllNotifications })(Notifications);

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    emptyNotificationContainer: {
        top: '40%',
        alignSelf: 'center'
    },
    notificationCard: {
        height: 53,
    },
    notificationUnreadCard: {
        height: 53,
        backgroundColor: '#e6e8eb'
    },
    notificationText: {
        fontSize: 13
    },
    notificationThumbnail: {
        width: 30,
        height: 30
    }
});
