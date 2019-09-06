import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert,
    ImageBackground
} from 'react-native';
import { Toast, Spinner } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { signup } from '../redux/actionCreators/signupActions'

class SignUp extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    handleClick = () => {
        const { signup } = this.props
        if (this.state.email === "" || this.state.password === "" || this.state.name === "" || this.state.confirm_password === "") {
            Toast.show({
                text: 'All fields are required!',
                buttonText: 'Okay',
                position: "top",
                type: "warning"
            })
        } else {
            signup(this.state)
        }
    }

    componentDidUpdate() {
        const { user, token, signupSuccess } = this.props
        if (signupSuccess) {
            Toast.show({
                text: 'Hello ' + user.name + ', Welcome to Eventbook',
                buttonText: 'Okay',
                position: "top",
                type: "success"
            })
            AsyncStorage.setItem('userToken', token)
            AsyncStorage.setItem('user', JSON.stringify(user))
            this.props.navigation.navigate("Home");
        }
    }

    render() {
        const { loading } = this.props
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>Welcome to EventBook</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({ name })} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(confirm_password) => this.setState({ confirm_password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleClick}>
                    {loading ? <Spinner color='white' /> : <Text style={styles.loginText}>Sign Up</Text>}
                </TouchableHighlight>
                <TouchableHighlight style={[styles.signupLink]}
                    onPress={() => this.props.navigation.navigate("Login")}
                    activeOpacity={1.0} underlayColor="grey">
                    <Text style={styles.loginLinkText}>I already have an account</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signupReducer.isLoading,
        signupSuccess: state.signupReducer.signupSuccess,
        user: state.signupReducer.user,
        token: state.signupReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (signup_data) => dispatch(signup(signup_data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#D3D3D3',

    },
    header: {
        // fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 30,
        color: 'black',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderBottomWidth: 1,
        width: "80%",
        height: 40,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: "80%",
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#A9A9A9",
    },
    loginText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 16
    },
    signupLink: {
        // backgroundColor: "white"
    },
    loginLinkText: {
        color: "black"
    }
});

