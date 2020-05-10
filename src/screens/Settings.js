import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Switch} from 'react-native'
import {THEME} from "../theme";
import {useSelector, useDispatch} from "react-redux"
import {enableDark, enableLight} from "../store/actions/themeAction"
import {LightTheme, DarkTheme} from "../theme"
import {FontAwesome} from "@expo/vector-icons";



export const Settings = ({navigation}) => {
    const MainTheme = useSelector(state => state.theme.theme)
    let curTheme = (MainTheme) ? DarkTheme : LightTheme
    useEffect(() => {
        navigation.setParams({
            color: curTheme.color.color
        });
    }, [])

    const dispatch = useDispatch()

    const [theme, setTheme] = useState(MainTheme)
    const dispatcher = () => {
        (!theme) ? dispatch(enableDark()) : dispatch(enableLight())
    }
    const toggleSwitch = () => {
       dispatcher()
        setTheme(!theme)

    }

    return (
        <View style={{...styles.center, ...curTheme.back}}>
            <View style={styles.switchView}>
                <Text style={{...styles.text, ...curTheme.text}}>Dark mode </Text>
            <Switch
                trackColor={{ false: "#767577", true: curTheme.color.color }}
                onValueChange={toggleSwitch}
                thumbColor={theme ? "#A9A9A9" : "#f4f3f4"}
                value={MainTheme}
                style={{ transform:[{ scaleX: 1.5 }, { scaleY: 1.5 }], marginLeft: 20 }}
            />
            </View>
        </View>
    )
}

Settings.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Настройки',
        headerStyle: {
            backgroundColor: navigation.getParam('color')
        }
    }
}

const styles = StyleSheet.create({
    center: {
        padding: 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    },
    switchView: {
        flexDirection: 'row',
    },
    text: {
    fontSize: 22,
    color: THEME.MAIN_COLOR
    }
})
