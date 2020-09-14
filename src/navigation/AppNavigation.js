import React from 'react'
import { MainScreen } from '../screens/MainScreen'
import {Settings} from '../screens/Settings'
import {SettingsHeader} from "../components/SettingsHeader";
import { CreateScreen } from '../screens/CreateScreen'
import {EventScreen} from "../screens/EventScreen"
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {THEME} from "../theme";


    const screens = {
        Main: MainScreen,
        Create: CreateScreen,
        Event: EventScreen,
        Settings: {
            screen: Settings,
            navigationOptions: ({ navigation }) => {
                return {
                    header: () => <SettingsHeader navigation={navigation}/>
                }
            }
        }
    }

const HeadNavigator = createStackNavigator(screens,{
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: THEME.MAIN_COLOR,
            },
            headerTintColor: '#fff',
        }
}
)

export const AppNavigation = createAppContainer(HeadNavigator)

