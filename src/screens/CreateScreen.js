import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    FlatList,
    SafeAreaView
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { addEvent } from '../store/actions/eventAction'
import {DarkTheme, LightTheme, THEME} from "../theme"
import DateTimePicker from '@react-native-community/datetimepicker';
import {ReModal} from "../components/RememberModal"
import {RepModal} from "../components/RepeatableModal"
import moment from "moment"


export const CreateScreen = ({ navigation }) => {
    const MainTheme = useSelector(state => state.theme.theme)
    let curTheme = (MainTheme) ? DarkTheme : LightTheme


    const [repeatable, setRepeatable] = useState({days: 0, weeks: 0, month: 0})
    const [remind, setRemind] = useState([])


    const [date, setDate] = useState(new Date(1598051730000))
    const handleRemind = (NewDate) => {
        setRemind(prev => [
            ...prev,
            NewDate
        ])

        getterFunk(remind, date)
        setDisabledTwo(false)
        setBtnsColorTwo(curTheme.color.color)
    }

    const getterFunk = (remind, date) => {
        const m = moment(date)
        return(remind.map(p => m.clone().subtract(Number(p),'days').format('MMMM Do YYYY, h:mm:ss a')))
    }



    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDisplayDate('flex')
      setBtnsColor(curTheme.color.color)
        setDisabled(false)
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };


    const [modalVisible, setModalVisible] = useState(false)
    const [secModalVisible, setSecModalVisible] = useState(false)
    const [displayRep, setDisplayRep] = useState('none')
    const [displayRem, setDisplayRem] = useState('none')
    const [displayDate, setDisplayDate] = useState('none')


    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [color, setColor] = useState('#696969')
    const [btnsColor, setBtnsColor] = useState('#696969')
    const [btnsColorTwo, setBtnsColorTwo] = useState('#696969')
    const [disabled, setDisabled] = useState(true)
    const [disabledTwo, setDisabledTwo] = useState(true)
    const [mainDisabled, setMaiDisabled] = useState(true)

    useEffect(() => {
        if(text && remind.length >= 1) {
            setColor(curTheme.color.color)
            setMaiDisabled(false)
        }
            if(repeatable.days || repeatable.month || repeatable.weeks) {
                setDisplayRep('flex')
            }
            if(remind.length >= 1) {
                setDisplayRem('flex')
            }
        else {
                setMaiDisabled(true)
        }
    })


    const saveHandler = () => {
        const post = {
            id: Date.now().toString(),
            date: date.toJSON(),
            text: text,
            repeat: Object.values(repeatable).join(),
            remind: remind.join()
        }
        //console.log(Object.values(repeatable).join())
        dispatch(addEvent(post))
        console.log(post)
        navigation.navigate('Main')
    }


    return (
        <TouchableWithoutFeedback>
            <SafeAreaView onPress={() => Keyboard.dismiss()}>
                <View style={{...styles.wrapper, ...curTheme.back}}>
                    <Text style={{...styles.title, marginBottom: 10, ...curTheme.text}}>Создай новый пост</Text>
                    <TextInput
                        style={{...styles.textarea, ...curTheme.back, ...curTheme.text,}}
                        placeholder='Введите текст заметки'
                        value={text}
                        onChangeText={setText}
                        multiline
                    />

                    <ReModal curTheme={curTheme}
                             modalVisible={modalVisible}
                             setModalVisible={setModalVisible}
                             handleRemind={handleRemind}
                    />
                    <RepModal curTheme={curTheme}
                              modalVisible={secModalVisible}
                              setModalVisible={setSecModalVisible}
                              setRepeatable={setRepeatable}
                              remind={remind}
                    />

                    <View style={{flexDirection: 'row', marginVertical:10}}>
                        <View style={styles.doubleButtons}>
                            <Button onPress={showDatepicker} color={curTheme.color.color} title="Дата события" />
                        </View>
                        <View style={styles.doubleButtons}>
                            <Button onPress={showTimepicker} color={curTheme.color.color} title="Время события" />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style = {{...styles.lineStyle, ...curTheme.back}} />
                    <View style={{flexDirection: 'row', marginVertical:10}}>
                    <View style={styles.doubleButtons}>
                   <TouchableOpacity  disabled={disabled}
                                      onPress= {() => setModalVisible(!modalVisible) }
                                      style={{...styles.touchable, backgroundColor: btnsColor}} >
                       <Text style={styles.touchableText}>ЗА СКОЛЬКО НАПОМНИТЬ? </Text>
                   </TouchableOpacity>
                    </View>
                    <View style={styles.doubleButtons}>
                        <TouchableOpacity  disabled={disabledTwo}
                                           onPress= {() => setSecModalVisible(!secModalVisible) }
                                           style={{...styles.touchable, backgroundColor: btnsColorTwo}} >
                            <Text style={styles.touchableText}>СОБЫТИЕ ПОВТОРЯЕТСЯ? </Text>
                        </TouchableOpacity>
                </View>
                    </View>
                    <View style = {{...styles.lineStyle, ...curTheme.back}} />
                    <Text style={{...styles.title, ...curTheme.text, display: displayDate}}>Дата вашего события: </Text>
                    <Text style={{...styles.title, ...curTheme.text, alignSelf: 'flex-start', color: '#A9A9A9', display: displayDate}}>
                        {new Date(date).toLocaleString('ru-RU')}
                    </Text>
                    <Text style={{...styles.title, ...curTheme.text, display: displayRep}}>Повторяется: </Text>
                    <Text style={{...curTheme.text, color: '#A9A9A9', fontSize: 18,  display: displayRep}}>
                        Каждые {Number(repeatable.days) + Number(repeatable.weeks) + Number(repeatable.month)} дней</Text>
                    <Text style={{...styles.title, ...curTheme.text, display: displayRem}}>Напомнить: </Text>

                    <FlatList
                        data={getterFunk(remind, date)}
                        extraData={date}
                        keyExtractor={(item, index) => "" + index}
                        renderItem={({ item }) => <Text
                            style={{...styles.title, ...curTheme.text, alignSelf: 'flex-start', color: '#A9A9A9'}}>
                            {item.toString()}</Text>}
                    />

                    <View style = {{...styles.lineStyle, ...curTheme.back}} />

                    <TouchableOpacity  disabled={mainDisabled}
                                       onPress= {saveHandler }
                                       style={{...styles.touchable, backgroundColor: color, alignItems: 'center'}} >
                        <Text style={styles.touchableText}>СОЗДАТЬ ПОСТ </Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            </TouchableWithoutFeedback>
    )
}

CreateScreen.navigationOptions = ({ navigation }) => {
    const c = navigation.getParam('color')
   return {
       headerTitle: 'Создать пост',
       headerStyle: {
           backgroundColor: c
       }
   }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        width: '100%',
        height: '100%'
    },
    doubleButtons: {
      marginHorizontal: '5%',
      width: '40%'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 5,
        color: THEME.MAIN_COLOR
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
    },
    lineStyle:{
        borderWidth: 1,
        borderColor:THEME.MAIN_COLOR,
        marginVertical:10,
    },
    touchable: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3,
    },
    touchableText: {
        color: 'white',
        fontSize: 15
    }
})
