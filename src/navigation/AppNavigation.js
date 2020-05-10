import React from 'react'
import { MainScreen } from '../screens/MainScreen'
import { Settings } from '../screens/Settings'
import { CreateScreen } from '../screens/CreateScreen'
import {EventScreen} from "../screens/EventScreen"
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {THEME} from "../theme";




const navigatorOptions= {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME.MAIN_COLOR,
        },
        headerTintColor: '#fff',
    }}

const HeadNavigator = createStackNavigator({
    Main: MainScreen,
    Create: CreateScreen,
    Event: EventScreen,
    Settings: Settings,
},
    navigatorOptions
)

export const AppNavigation = createAppContainer(HeadNavigator)

