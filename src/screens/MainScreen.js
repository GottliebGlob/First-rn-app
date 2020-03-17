import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity, FlatList} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/AppHeaderIcon"
import { FontAwesome } from '@expo/vector-icons'
import {PostList} from "../components/PostList"
import {useDispatch, useSelector} from "react-redux";
import {loadEvents} from "../store/actions/eventAction";


export const MainScreen = ({navigation}) => {
    const goCreate = () => {
        navigation.navigate('Create')
    }

    const openPostHandler = post => {
        navigation.navigate('Event', {
            postId: post.id,
            date: post.date,
            repeat: post.repeat,
            text: post.text
    })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadEvents())
    }, [dispatch])

    const actPosts = useSelector(state => state.event.actEvents)
    const multiPosts = useSelector(state => state.event.multiEvents)
    const allPosts = actPosts.concat(multiPosts)

    return (
        <View style={styles.botButton}>
            <PostList data={allPosts} onOpen={openPostHandler} />
           <TouchableOpacity style={styles.btnHeight} onPress={goCreate}>
               <View>
            <Text>Add event</Text>
               </View>
                <FontAwesome name="plus" size={28} style={{marginHorizontal: 30}} onPress={goCreate} />
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
