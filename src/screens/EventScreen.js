import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {DarkTheme, LightTheme, THEME} from '../theme'
import { removeEvent } from '../store/actions/eventAction'
import {FontAwesome} from "@expo/vector-icons";
import moment from "moment";

export const EventScreen = ({ navigation }) => {
    const MainTheme = useSelector(state => state.theme.theme)
    let curTheme = (MainTheme) ? DarkTheme : LightTheme

    const dispatch = useDispatch()

    const postId = navigation.getParam('postId')
    const repeat = navigation.getParam('repeat')
    const remind = navigation.getParam('remind')
    const text = navigation.getParam('text')
    const date = navigation.getParam('date')

    const [rep, setRep] = useState('none')

    useEffect(() => {
        getterFunk(remind, date)
        if(repeat.days || repeat.month || repeat.weeks) {
            setRep('flex')
        }
    })


    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress() {
                        navigation.navigate('Main')
                        dispatch(removeEvent(postId))
                    }
                }
            ],
            { cancelable: false }
        )
    }

    if(!postId) {
        return null;
    }

    const getterFunk = (remind, date) => {
        const m = moment(date)
        return(remind.map(p => m.clone().subtract(p.value,'days').format('MMMM Do YYYY, h:mm:ss a')))
    }


    return (
        <View style={{ flex: 1, justifyContent: 'space-between', ...curTheme.back}}>
            <View style={{padding: 10}}>
            <View style={{...styles.textWrap, ...curTheme.border}}>
                <Text style={{...styles.title, ...curTheme.text}}>{text}</Text>
            </View>

                <Text style={{...styles.title, ...curTheme.text}}>Дата вашего события: </Text>
                <Text style={{...styles.title, ...curTheme.text, alignSelf: 'flex-start', color: '#A9A9A9'}}>
                    {new Date(date).toLocaleString('ru-RU')}
                </Text>
                <Text style={{...styles.title, ...curTheme.text, display: rep}}>Повторяется: </Text>
                <Text style={{...curTheme.text, color: '#A9A9A9', fontSize: 18, display: rep}}>
                    Каждые {Number(repeat.days) + Number(repeat.weeks) + Number(repeat.month)} дней</Text>
                <Text style={{...styles.title, ...curTheme.text}}>Напомнить: </Text>

                <FlatList
                    data={getterFunk(remind, date)}
                    keyExtractor={(item, index) => "" + index}
                    renderItem={({ item }) => <Text
                        style={{...styles.title, ...curTheme.text, alignSelf: 'flex-start', color: '#A9A9A9'}}>
                        {item.toString()}</Text>}
                />


            </View>

            <TouchableOpacity style={styles.remove} onPress= {() => removeHandler()} >
                <View>
                    <Text style={styles.text}>Удалить</Text>
                </View>
                <FontAwesome name="remove" size={26} style={{marginHorizontal: 30}}
                             color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

EventScreen.navigationOptions = ({ navigation }) => {
    const date = navigation.getParam('date')
    const c = navigation.getParam('color')

    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
            headerStyle: {
                backgroundColor: c
            }
    }
}

const styles = StyleSheet.create({

    textWrap: {
        marginBottom: 15,
        padding: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        minHeight: 50
    },
    remove: {
    backgroundColor: THEME.DANGER_COLOR,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 22
    },
    title: {
        color: THEME.MAIN_COLOR,
        fontSize: 20
    }
})
