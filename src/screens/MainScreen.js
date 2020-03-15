import React from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity, FlatList} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/AppHeaderIcon"
import { FontAwesome } from '@expo/vector-icons'
import {DATA} from "../data"
import {PostList} from "../components/PostList"
import {Post} from "../components/Post";


export const MainScreen = ({navigation}) => {
    const goCreate = () => {
        navigation.navigate('Create')
    }

    const openPostHandler = post => {
        navigation.navigate('Create', {
            postId: post.id,
            date: post.date,
            repeat: post.repeat,
            text: post.text
    })
    }

    return (
        <View style={styles.botButton}>
            <PostList data={DATA} onOpen={openPostHandler} />
           <TouchableOpacity style={styles.btnHeight} onPress={goCreate}>
               <View>
            <Text>Add event</Text>
               </View>
                <FontAwesome name="plus" size={28} style={{marginHorizontal: 30}} />
            </TouchableOpacity>
        </View>
    )
}

MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'NeverMore',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title="App" >
    <Item title="Filter" iconName="filter"
    onPress={() => console.log('Press')} />
    </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title="App" >
        <Item title="Filter" iconName="align-justify"
              onPress={() => navigation.toggleDrawer()} />
    </HeaderButtons>
})


const styles = StyleSheet.create({

    botButton: {
        flex: 1,
        justifyContent: "space-between"
    },
    btnHeight: {
    height: '10%',
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

})
