import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl
} from "react-native";
import { getExploreEvents } from '../redux/actionCreators/eventActions'
import EventsGrid from './EventsGrid'

class Explore extends Component {
    state = {
        refreshing: false
    }

    componentDidMount() {
        const { getExploreEvents } = this.props;
        getExploreEvents()
    }

    _onRefresh = () => {
        const { getExploreEvents } = this.props;
        getExploreEvents()
    }

    render() {
        const { events, loading } = this.props;
        if (loading === true) {
            return <ActivityIndicator size='large' color='black' style={styles.activityIndicator} />
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh} />
                    }
                >
                    <EventsGrid events={events} />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ eventsReducer }) => ({
    loading: eventsReducer.loading,
    events: eventsReducer.exploreEvents
})
export default connect(mapStateToProps, { getExploreEvents })(Explore);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
