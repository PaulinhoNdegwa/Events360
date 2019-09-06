import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { updateUserProfile } from '../redux/actionCreators/userProfileActions'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const { profile } = this.props.navigation.state.params
        this.setState({
            name: profile.name,
            email: profile.email,
            bio: profile.bio,
            location: profile.location,
            search_radius: profile.search_radius
        })
    }

    handleSubmit = () => {
        const { updateUserProfile } = this.props
        updateUserProfile(this.state)
    }

    render() {
        const { name, email, bio, location, search_radius } = this.state
        const { updateProfileSuccess, loading } = this.props
        if (updateProfileSuccess) this.props.navigation.navigate("Profile")
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Edit Profile</Text>
                    </View>
                    <Text style={styles.label}>Name:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </View>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email })}
                            editable={false}
                        />
                    </View>
                    <Text style={styles.label}>Bio:</Text>
                    <View style={styles.inputTextAreaContainer}>
                        <TextInput
                            placeholder="Bio"
                            value={bio}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(bio) => this.setState({ bio })}
                        />
                    </View>
                    <Text style={styles.label}>Location:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Location"
                            value={location}
                            onChangeText={(location) => this.setState({ location })}
                        />
                    </View>
                    <Text style={styles.label}>Search Radius(km):</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Event search radius"
                            value={search_radius ? search_radius.toString() : ''}
                            onChangeText={(search_radius) => this.setState({ search_radius })}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableHighlight style={styles.submitButton}
                        onPress={this.handleSubmit} activeOpacity={1.0} underlayColor="grey">
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>Save</Text>}
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.userProfilesReducer.isLoading,
        updateProfileSuccess: state.userProfilesReducer.updateProfileSuccess
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUserProfile: (payload) => dispatch(updateUserProfile(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginTop: 15,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: 10,
        color: '#808080'
    },
    inputContainer: {
        borderBottomColor: 'black',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: "90%",
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputTextAreaContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 5,
        width: '90%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: 35,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black'
    }
});
