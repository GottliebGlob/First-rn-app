import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const Post = ({ post, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
        <View style={styles.post}>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>
                        {post.text}
                    </Text>
                </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    textWrap: {
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
    }
})
