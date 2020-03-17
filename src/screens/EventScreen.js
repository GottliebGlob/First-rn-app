import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {removeEvent} from "../store/actions/eventAction"
import { DATA } from '../data'


export const EventScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const eventId = navigation.getParam('postId')

    const post = DATA.find(p => p.id === eventId)

    // useEffect(() => {
    //   navigation.setParams({ booked: post.booked })
    // }, [])

    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel'
                },
                { text: 'Удалить', style: 'destructive', onPress: () => { navigation.navigate('Main')
                        dispatch(removeEvent(eventId))} }
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView>
            <View style={styles.textWrap}>
                <Text>{post.text}</Text>
            </View>
            <Button
                title='Удалить'
                onPress={removeHandler}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textWrap: {
        padding: 10
    }
})
