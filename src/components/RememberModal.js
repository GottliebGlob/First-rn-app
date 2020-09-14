import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Modal,
    TouchableOpacity
} from 'react-native'
import {THEME} from "../theme"

export const ReModal = ({curTheme, modalVisible, setModalVisible, handleRemind}) => {


    const [day, setDay] = useState('')
    const [week, setWeek] = useState('')
    const [month, setMonth] = useState('')

    const [subBtnColor, setSubBtnColor] = useState('#696969')
    const [btnColor, setBtnColor] = useState(THEME.DANGER_COLOR)
    const [btnText, setBtnText] = useState('Закрыть')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(day || week || month) {
            setBtnColor('#4682B4')
            setBtnText('Принять')
            setSubBtnColor(curTheme.color.color)
            setDisabled(false)
        }
        else {
            setBtnColor(THEME.DANGER_COLOR)
            setBtnText('Закрыть')
            setSubBtnColor('#696969')
            setDisabled(true)
        }
    }, [day, week, month])


    const submitHandler = (day, week, month) => {
        let NewDate = Number(day) + Number(week) * 7 + Number(month) * 31
        handleRemind(NewDate)
        stateClear()
    }
    const closeHandler = () => {
        setModalVisible(!modalVisible)
        if (day || week || month) {
            submitHandler(day, week, month)
        }
        stateClear()
    }

    const stateClear = () => {
        setDay(0)
        setWeek(0)
        setMonth(0)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}>
            <View style={{...styles.modal, ...curTheme.back}}>
                <View>
                    <Text style={{fontSize: 30, ...curTheme.text}}>Необходимо напомнить за: </Text>
                    <View style = {{...styles.lineStyle, ...curTheme.back}} />
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Дней: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько дней?'
                            value={day}
                            onChangeText={setDay}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Недель: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько недель?'
                            value={week}
                            onChangeText={setWeek}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Месяцев: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько месяцев?'
                            value={month}
                            onChangeText={setMonth}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                    <TouchableOpacity disabled={disabled} style={{...styles.unoModal, width: '45%', backgroundColor: subBtnColor, borderColor: subBtnColor}}
                                      onPress={() => {
                                          submitHandler(day, week, month)
                                      }}>
                        <Text style={styles.textModal}>Добавить</Text>
                    </TouchableOpacity>

                        <TouchableOpacity style={{...styles.unoModal, width: '45%', backgroundColor: btnColor, borderColor: btnColor}}
                                          onPress={() => {
                                              closeHandler()
                                          }}>
                            <Text style={styles.textModal}>{btnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        paddingHorizontal: '10%',

    },
    unoModal: {
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: THEME.MAIN_COLOR,
        borderColor: THEME.MAIN_COLOR,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center'
    },

    textModal: {
        fontSize: 20,
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lineStyle:{
        borderWidth: 1,
        borderColor:THEME.MAIN_COLOR,
        marginVertical:10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
    }
})
