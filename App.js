import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  StyleSheet
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import store from './redux/store/index'

import { Button, Root, Icon, Text } from "native-base";
import Welcome from './components/Welcome'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import EditProfile from './components/EditProfile'
import Feed from './components/Feed'
import Event from './components/Event'
import CreateEvent from './components/CreateEvent'
// import FlatList from './components/FlatList'
import Notifications from './components/Notifications'
import InvitePeople from './components/InvitePeople'
import Explore from './components/Explore'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
export default App;


const LogoutDrawer = (props) => (
  <View style={{ flex: 1 }}>
    <SafeAreaView >
      <View style={{ height: 120, alignItems: 'center' }}>
        <Image style={{
          width: 100,
          height: 100,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom: 10,
          alignSelf: 'center',
          position: 'absolute',
          marginTop: 10
        }} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      </View>
      <DrawerItems {...props} />
      <TouchableOpacity onPress={() =>
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            { text: 'Cancel', onPress: () => { return null } },
            {
              text: 'Confirm', onPress: () => {
                AsyncStorage.clear();
                props.navigation.navigate('Login')
              }
            },
          ],
          { cancelable: false }
        )
      }>
        <Text style={{ margin: 16, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </View>
)


const CreateEventStack = createStackNavigator({
  Create: {
    screen: CreateEvent,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'New Event',
        headerLeft: (
          <Button
            transparent
            style={{ marginLeft: 5 }}
            onPress={() => navigation.navigate('Feed')}
            iconLeft size={30} >
            <Text>Back</Text>
          </Button>
        )
      }
    }
  }
})

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Feed',
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            ios='ios-menu' android="md-menu" size={30} />
        )
      }
    }
  },
  UserProfile: {
    screen: UserProfile
  },
  Event: {
    screen: Event
  },
  Invite: {
    screen: InvitePeople
  }
})

const NewEventFeedStack = createStackNavigator({
  Home: {
    screen: FeedStack
  },
  NewEvent: {
    screen: CreateEventStack
  }
},
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const ProfileStack = createStackNavigator({
  Profile: {
    screen: MyProfile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            ios='ios-menu' android="md-menu" size={30} />
        )
      }
    }
  },
  EditProfile: {
    screen: EditProfile
  },
  Event: {
    screen: Event
  }
})

const NotificationsStack = createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Notifications',
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            ios='ios-menu' android="md-menu" size={30} />
        )
      }
    }
  }
})


const ExploreStack = createStackNavigator({
  ExploreStack: {
    screen: Explore,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Search',
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            ios='ios-menu' android="md-menu" size={30} />
        )
      }
    }
  },
  Event: {
    screen: Event
  }
})

const DashboardTabNavigator = createBottomTabNavigator({
  Feed: {
    screen: NewEventFeedStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color='#007aff' style={styles.tabIcon} />
      )
    }
  },
  Explore: {
    screen: ExploreStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="search" color={tintColor} style={styles.tabIcon} />
      )
    }
  },
  Notifications: {
    screen: NotificationsStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="notifications" color={tintColor} style={styles.tabIcon} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" color={tintColor} style={styles.tabIcon} />
      )
    }
  }
}, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        header: null,
        headerTitle: routeName
      }
    },
    tabBarOptions: {
      activeTintColor: '#007aff',
      inactiveTintColor: 'gray',
      showIcon: true,
      style: {
        paddingBottom: 15
      }
    }
  })

const DashBoardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
            ios='ios-menu' android="md-menu" size={30} />
        )
      }
    }
  })
const AppDrawerNavigator = createDrawerNavigator({
  DashBoard: { screen: DashBoardStackNavigator }
}, {
    contentComponent: (props) => (<LogoutDrawer {...props} />),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  })

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Home: { screen: AppDrawerNavigator },
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 16
  }
})
