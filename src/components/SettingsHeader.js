import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {DarkTheme, LightTheme} from "../theme";
import {Item} from "react-navigation-header-buttons";

export const SettingsHeader = ({navigation}) => {
    const MainTheme = useSelector(state => state.theme.theme)
    let curTheme = (MainTheme) ? DarkTheme : LightTheme

    return (
        <View style={{...styles.header, ...curTheme.background}}>
            <TouchableOpacity  onPress={() => navigation.navigate('Main')}>
                <FontAwesome name="arrow-left" size={24} style={{marginHorizontal: 20}}
                             color={'white'} />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 22}}>Настройки</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center'

    }
})
