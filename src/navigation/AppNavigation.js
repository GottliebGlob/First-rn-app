import React from 'react'
import { MainScreen } from '../screens/MainScreen'
import { Settings } from '../screens/Settings'
import { CreateScreen } from '../screens/CreateScreen'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const HeadNavigator = createStackNavigator({
    Main: MainScreen,
    Create: CreateScreen
})

export const AppNavigation = createAppContainer(HeadNavigator)
