import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addEvent } from '../store/actions/eventAction'

export const CreateScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            repeat: false
        }
        dispatch(addEvent(post))
        navigation.navigate('Main')
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Создай новый пост</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder='Введите текст заметки'
                        value={text}
                        onChangeText={setText}
                        multiline
                    />

                    <Button
                        title='Создать пост'
                        onPress={saveHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Создать пост',
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})
