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

export const RepModal = ({curTheme, modalVisible, setModalVisible, setRepeatable, remind}) => {

    const [days, setDays] = useState(0)
    const [weeks, setWeeks] = useState(0)
    const [months, setMonths] = useState(0)

    const [btnColor, setBtnColor] = useState(THEME.DANGER_COLOR)
    const [btnText, setBtnText] = useState('Закрыть')
    const [alert, setAlert] = useState(false)


    useEffect(() => {
        if(days || weeks || months) {
            setBtnColor('#4682B4')
            setBtnText('Принять')
        }
        else {
            setBtnColor(THEME.DANGER_COLOR)
            setBtnText('Закрыть')
        }
    }, [days, weeks, months])

    const isntBigger = (element) => {
        return element.value <= Number(days) + Number(weeks*7) + Number(months* 31)
    }

    const repeatHandler = () => {
        if (days || weeks || months) {
            if(!remind.some(isntBigger)) {
            setAlert(!alert)
                stateClear()
                return;
            }
            else submitHandler(days, weeks, months)
        }
        setModalVisible(!modalVisible)
        stateClear()
    }

    const submitHandler = (days, weeks, months) => {
       setRepeatable({days: days, weeks: weeks, month: months})
    }

    const stateClear = () => {
        setDays(0)
        setWeeks(0)
        setMonths(0)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}>
            <View style={{...styles.modal, ...curTheme.back}}>
                <View>
                    <Text style={{fontSize: 30, ...curTheme.text}}>Ваше событие будет повторяться раз в: </Text>
                    <View style = {{...styles.lineStyle, ...curTheme.back}} />
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Дней: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько дней?'
                            value={days}
                            onChangeText={setDays}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Недель: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько недель?'
                            value={weeks}
                            onChangeText={setWeeks}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 30, ...curTheme.text}}>Месяцев: </Text>
                        <TextInput
                            style={{...styles.textarea, ...curTheme.back, ...curTheme.text, width: '50%'}}
                            placeholder='Сколько месяцев?'
                            value={months}
                            onChangeText={setMonths}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <TouchableOpacity style={{...styles.unoModal, backgroundColor: btnColor, borderColor: btnColor}}
                                      onPress={() => {
                                          repeatHandler();
                                      }}>
                        <Text style={styles.textModal}>{btnText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={alert}>
                <View style={{...styles.alert, ...curTheme.back}}>
            <Text style={{fontSize: 22, ...curTheme.text}}>
                Упс! Время между событиями не может быть меньше времени, за которое необходимо о них напомнить! </Text>
            <TouchableOpacity style={styles.unoModal} onPress={() => {
                setAlert(!alert)
            }}>
                <Text style={{fontSize: 20, color: 'white'}}>Close</Text>
            </TouchableOpacity>
                </View>
            </Modal>
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
    },
    alert: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
    }
})
