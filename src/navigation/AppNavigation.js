import React from 'react'
import { MainScreen } from '../screens/MainScreen'
import { Settings } from '../screens/Settings'
import { CreateScreen } from '../screens/CreateScreen'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { FontAwesome} from "@expo/vector-icons"

const HeadNavigator = createStackNavigator({
    Main: MainScreen,
    Create: CreateScreen
})

const MainNavigator = createDrawerNavigator({
    Main: {
        screen: HeadNavigator,
    },
    Create: CreateScreen,
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: info => (
                <FontAwesome name='gears' size={25} />
            )
        }
    }
})

export const AppNavigation = createAppContainer(MainNavigator)
