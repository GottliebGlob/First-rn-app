import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/AppHeaderIcon"
import { FontAwesome } from '@expo/vector-icons'
import {PostList} from "../components/PostList"
import {useDispatch, useSelector} from "react-redux";
import {loadEvents} from "../store/actions/eventAction"
import {DarkTheme, LightTheme, THEME} from "../theme"




export const MainScreen = ({navigation}) => {
    const MainTheme = useSelector(state => state.theme.theme)
    let curTheme = (MainTheme) ? DarkTheme : LightTheme

    useEffect(() => {
        navigation.setParams({
            color: curTheme.color.color
        });
    }, [curTheme])

    const openPostHandler = event => {
        navigation.navigate('Event', {
            postId: event.id,
            date: event.date,
            repeat: event.repeat,
            remind: event.remind,
            text: event.text,
            color: curTheme.color.color
    })
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadEvents())
    }, [dispatch])

    const [modal, setModal] = useState(false)
    const [mainFilter, setMainFilter] = useState(0)

    const actPosts = useSelector(state => state.event.actEvents)
    const multiPosts = useSelector(state => state.event.multiEvents)
    let allPosts = []


    const PostFunk = () => {
        switch(mainFilter) {
            case 0: {
               allPosts = actPosts.concat(multiPosts)
                return allPosts.sort((a, b) => a.date > b.date ? 1 : -1)


            }
            case 1: {
                return allPosts = multiPosts
            }
            case 2: {
                return allPosts = actPosts
            }
        }

    }
    const ModalFunk = (m) => {
        setMainFilter(m)
        setModal(!modal)
    }

    return (
        <View style={{...styles.botButton, ...curTheme.back}}>

            <PostList data={PostFunk()} onOpen={openPostHandler} rerender={mainFilter} theme={curTheme}/>

        <TouchableOpacity style={{...styles.btnHeight, ...curTheme.background}} onPress= {() => setModal(!modal)} >
               <View>
            <Text style={styles.text}>Filter</Text>
               </View>
                <FontAwesome name="filter" size={26} style={{marginHorizontal: 30}}
                             color={'white'} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}>
                <View style={{...styles.modal, ...curTheme.back}}>
                    <View>
                        <Text style={{fontSize: 30, color: curTheme.color.color}}>Filter: </Text>
                        <TouchableHighlight style={{...styles.unoModal, ...curTheme.background, ...curTheme.border}}
                                            onPress={() => {
                                                ModalFunk(1);
                                            }}>
                            <Text style={styles.textModal}>Single</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{...styles.unoModal, ...curTheme.background, ...curTheme.border}}
                                            onPress={() => {
                                                ModalFunk(2);
                                            }}>
                            <Text style={styles.textModal}>Multi</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{...styles.unoModal, ...curTheme.background, ...curTheme.border}}
                                            onPress={() => {
                                                ModalFunk(0);
                                            }}>
                            <Text style={styles.textModal}>Default</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

MainScreen.navigationOptions = ({navigation}) => {
    let b = navigation.getParam('color');
    return {
    headerTitle: 'NeverMore',
    headerStyle: {
        backgroundColor: b},
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title="Right">
        <Item  iconName="plus" title="Add"
               onPress={() => navigation.navigate('Create', {color: b})} />
    </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon} title="Left" >
        <Item title="Drawer" iconName="gears"
              onPress={() => navigation.navigate('Settings', {color: b})} />
    </HeaderButtons>
}}




const styles = StyleSheet.create({

    botButton: {
        flex: 1,
        justifyContent: "space-between",
    },
    btnHeight: {
    height: '10%',
        backgroundColor: THEME.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 22
    },
    modal: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: '10%'

    },
    unoModal: {
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        padding: 10,
        marginVertical: 30,
        alignItems: 'center'


    },
    textModal: {
        fontSize: 20,
        color: '#fff'
    }

})
