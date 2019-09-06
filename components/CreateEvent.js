import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    TextInput
} from "react-native";
import { Container, DatePicker, Button, Icon } from 'native-base';
import { createEvent } from '../redux/actionCreators/eventActions'

class CreateEvent extends Component {
    state = {}

    handleSave = () => {
        const { createEvent } = this.props;
        createEvent(this.state);
    }

    render() {
        const { loading, createEventSuccess } = this.props;
        if (createEventSuccess) this.props.navigation.navigate("Feed")
        return (
            <ScrollView style={styles.scrollView}>
                <Container style={styles.container}>
                    {/* <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.closeModal}
                    >
                        <Icon name='close' style={styles.closeModalIcon} />
                    </Button> */}
                    <View>
                        <Text style={styles.headerText}>Create Event</Text>
                    </View>
                    <Text>Title: </Text>
                    <View>
                        <TextInput
                            placeholder="Title"
                            style={styles.textInput}
                            onChangeText={(title) => this.setState({ title })}

                        />
                    </View><Text style={styles.inputLabel}>Description: </Text>
                    <View>
                        <TextInput
                            placeholder="Description"
                            style={styles.textInput}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(description) => this.setState({ description })}
                        />
                    </View>
                    <Text style={styles.inputLabel}>Location: </Text>
                    <View>
                        <TextInput
                            placeholder="Location"
                            style={styles.textInput}
                            onChangeText={(location_name) => this.setState({ location_name })}
                        />
                    </View>
                    <Text style={styles.inputLabel}>Charges: </Text>
                    <View>
                        <TextInput
                            placeholder="Charges"
                            style={styles.textInput}
                            onChangeText={(charges) => this.setState({ charges })}
                        />
                    </View>
                    <Text>Start Date: </Text>
                    <View>
                        <DatePicker
                            style={styles.textInput}
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            value={this.state.start_date}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select start date"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={(start_date) => this.setState({ start_date })}
                            disabled={false}
                        />
                    </View>
                    <Text>End Date: </Text>
                    <View>
                        <DatePicker
                            style={styles.textInput}
                            defaultDate={this.state.start_date}
                            minimumDate={this.state.start_date}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            value={this.state.end_date}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select end date"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={(end_date) => this.setState({ end_date })}
                            disabled={false}
                        />
                    </View>
                    <TouchableHighlight style={styles.saveButton} onPress={this.handleSave}>
                        {loading ?
                            <ActivityIndicator color='white' /> :
                            <Text style={styles.saveButtonText}>Save</Text>}
                    </TouchableHighlight>
                </Container>
            </ScrollView>
        );
    }
}
const mapStateToProps = ({ eventsReducer }) => ({
    loading: eventsReducer.loading,
    createEventSuccess: eventsReducer.createEventSuccess
})

export default connect(mapStateToProps, { createEvent })(CreateEvent);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        width: '90%',
        alignSelf: 'center'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        alignSelf: 'center'
    },
    inputLabel: {
        fontSize: 15,
        marginBottom: 10
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
        height: 40
    },
    saveButton: {
        backgroundColor: '#ffffff',
        width: '100%',
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
    saveButtonText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    closeModal: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // backgroundColor: 'red',
        position: 'absolute',
        top: 50,
        right: 0,
    },
    closeModalIcon: {
        fontSize: 26
    }
});
