import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { CardItem, Text, Thumbnail, Button, Left, Right } from 'native-base'

import { getFollowers } from '../redux/actionCreators/userProfileActions'
import { sendInvite } from '../redux/actionCreators/invitesActions'

class Invite extends Component {
    componentDidMount() {
        const { getFollowers } = this.props;
        getFollowers();
    }

    handleSendInvite = email => {
        const { sendInvite } = this.props;
        const { eventId } = this.props.navigation.state.params
        sendInvite(eventId, email)
    }

    mapFollowers = (users) => {
        const mappedFollowers = users.length !== 0 ?
            users.map(user => {
                return (
                    <CardItem key={user.id}>
                        <Left>
                            <Thumbnail source={require('../assets/cat.jpg')} style={styles.notificationThumbnail} />
                            <Text>{user.name}</Text>
                        </Left>
                        <Right>
                            <Button small style={styles.inviteButton} onPress={() => { this.handleSendInvite(user.email) }}>
                                <Text style={styles.inviteButtonText}>Invite</Text>
                            </Button>
                        </Right>
                    </CardItem >
                )
            })

            : (
                <Text>No users to invite</Text>
            )
        return mappedFollowers;
    }

    render() {
        const { loading, users } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Invite friends to this event</Text>
                {loading ? <ActivityIndicator /> : this.mapFollowers(users)}
            </View>
        );
    }
}

const mapStateToProps = ({ userProfilesReducer }) => ({
    loading: userProfilesReducer.isLoading,
    users: userProfilesReducer.users
})

export default connect(mapStateToProps, { getFollowers, sendInvite })(Invite);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        marginTop: 30,
        marginBottom: 10,
        fontWeight: '500'
    },
    notificationThumbnail: {
        height: 40,
        width: 40
    },
    inviteButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 60,
        height: 28,
        paddingLeft: 0,
        paddingRight: 0
    },
    inviteButtonText: {
        fontSize: 13
    }
});
