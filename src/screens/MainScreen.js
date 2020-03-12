import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'


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

MainScreen.navigationOptions = {

}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
