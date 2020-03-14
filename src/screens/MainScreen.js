import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/AppHeaderIcon"


export const MainScreen = ({navigation}) => {
    const goCreate = () => {
        navigation.navigate('Create')
    }

    return (
        <View style={styles.center}>
            <Text> Main Screen!</Text>
            <Button title='Go to post' onPress={goCreate}/>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
