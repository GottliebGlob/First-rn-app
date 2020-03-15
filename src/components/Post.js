import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export const Post = ({ post }) => {
    return (
        <View style={styles.post}>
                <View style={styles.textWrap}>
                    <Text style={styles.title}>
                        {post.text}
                    </Text>
                </View>
        </View>
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
