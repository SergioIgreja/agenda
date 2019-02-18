import React from 'react';
import SettingsScreen from "./src/screens/Settings";
import AboutScreen from "./src/screens/About";
import TasksScreen from "./src/screens/Tasks";
import AlarmsScreen from "./src/screens/Alarms";
import Icon from '@expo/vector-icons/Ionicons';

import {
        createBottomTabNavigator,
        createAppContainer,
        createStackNavigator,
        createDrawerNavigator
} from "react-navigation"

const homeTabNavigator = createBottomTabNavigator(
        {
                Tasks: { screen: TasksScreen },
                Alarms: { screen: AlarmsScreen },
        }, {
                navigationOptions: ({ navigation }) => {
                        const { routeName } = navigation.state.routes[navigation.state.index]
                        return {
                                headerTitle: routeName
                        }
                },
                initialRouteName: 'Alarms',
        })

const homeStackNavigator = createStackNavigator({
        HomeTabNavigator: homeTabNavigator
}, {
                defaultNavigationOptions: ({ navigation }) => {
                        return {
                                headerLeft: (
                                        <Icon
                                                style={{ paddingLeft: 10 }}
                                                onPress={() => navigation.openDrawer()}
                                                name="md-menu"
                                                size={40}
                                        />
                                )
                        };
                }
        })

const homeDrawerNavigator = createDrawerNavigator({
        Home: homeStackNavigator,
        About: { screen: AboutScreen },
        Settings: { screen: SettingsScreen },
})


const appContainer = createAppContainer(homeDrawerNavigator);

export default appContainer;