import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {THEME} from "../theme";

export const Post = ({ post, onOpen, theme }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
        <View style={{...styles.post, ...theme.back}}>
                <View style={styles.textWrap}>
                    <Text style={{...styles.title, ...theme.text}}>
                        {(post.text.length > 30) ? post.text.substring(0,27) + '...' : post.text}
                    </Text>
                </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        minHeight: 50
    },
    textWrap: {
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        color: THEME.MAIN_COLOR,
        fontSize: 20
    }
})
