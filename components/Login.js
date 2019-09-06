import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image
} from 'react-native';
import { Toast, Spinner } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../redux/actionCreators/loginActions'

class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleClick = () => {
        const { login } = this.props
        if (this.state.email === "" || this.state.password === "") {
            Toast.show({
                text: 'All fields are required!',
                buttonText: 'Okay',
                position: "top",
                type: "warning"
            })
        } else {
            login(this.state)
        }
    }

    componentDidUpdate() {
        const { user, token, loginSuccess } = this.props
        if (loginSuccess) {
            Toast.show({
                text: 'Welcome to EventBook',
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
                    <Text style={styles.header}>Log In to EventBook</Text>
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

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleClick}>
                    {loading ? <Spinner color='white' /> : <Text style={styles.loginText}>Login</Text>}
                </TouchableHighlight>
                <TouchableHighlight style={[styles.signupLink]}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    activeOpacity={1.0} underlayColor="grey">
                    <Text style={styles.signupLinkText}>Create new account</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loginReducer.isLoading,
        loginSuccess: state.loginReducer.loginSuccess,
        user: state.loginReducer.user,
        token: state.loginReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (login_data) => dispatch(login(login_data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header: {
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
    signupLinkText: {
        color: "black"
    }
});

