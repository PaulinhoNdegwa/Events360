import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import { Text } from 'native-base'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import { getUserProfile } from '../redux/actionCreators/userProfileActions'
import { followUser, unfollowUser } from '../redux/actionCreators/followingActions'
import EventsGrid from './EventsGrid'

class GenericUserProfile extends Component {

    state = {
        user: {},
        refreshing: false
    }

    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(user => {
                this.setState({ user: JSON.parse(user) })
            })
        const { userEmail, getUserProfile } = this.props
        getUserProfile(userEmail)
    }

    _onRefresh = () => {
        const { userEmail, getUserProfile } = this.props
        getUserProfile(userEmail)
    }

    render() {
        const { loading, profile, userEmail, followUser, unfollowUser } = this.props
        const { user } = this.state;
        if (loading === true) {
            return <ActivityIndicator size='large' color='black' />
        }

        const renderFollowButton = profile && user && user.email !== userEmail ? (

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={profile.is_following ? () => unfollowUser(profile.id) : () => followUser(profile.id)}
            >
                <Text style={styles.buttonText}>{profile.is_following ? 'Unfollow' : 'Follow'}</Text>
            </TouchableOpacity>
        ) : (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate("EditProfile", { profile: profile })}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            )

        const renderUserProfile = profile !== undefined ? (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{profile.name}</Text>
                        <Text style={styles.info}>{profile.email}</Text>
                        <Text style={styles.info}>{profile.location || "No location yet!"}</Text>
                        <Text style={styles.description}>{profile.bio || "Hey there, I'm using Event360"}</Text>
                    </View>
                </View>
            </View>
        ) : (null)
        return (
            <ScrollView
                style={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} />
                }
            >
                {renderUserProfile}
                {renderFollowButton}
                <EventsGrid events={profile !== undefined && profile.events ? profile.events : []} />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.userProfilesReducer.isLoading,
        profile: state.userProfilesReducer.profile
    }
}

export default connect(mapStateToProps, { getUserProfile, followUser, unfollowUser })(GenericUserProfile);

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    header: {
        backgroundColor: "#c9c9c9",
        height: 120,
        width: 400
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        left: 20,
        position: 'absolute',
        top: 55
    },
    name: {
        fontSize: 16,
        color: "black",
        fontWeight: '500',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        padding: 20,
    },
    info: {
        fontSize: 14,
        color: "grey",
        fontWeight: '400',
        marginTop: 10
    },
    description: {
        fontSize: 13,
        color: "#696969",
        marginTop: 10,
        fontWeight: '500'
    },
    buttonContainer: {
        position: 'absolute',
        right: 50,
        top: 140,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        // height: 23,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: "#ffffff",
    },
    buttonText: {
        fontSize: 14
    }
});
