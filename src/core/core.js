import React from 'react';
import { TextInput, Text, View} from 'react-native'
import moment from 'moment'
import 'moment-timezone';

export class AlarmClock extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTime: '',
            alarmTime: ''
        };
        this.setAlarmTime = this.setAlarmTime.bind(this);
    }

    componentDidMount() {
        this.clock = setInterval(
            () => this.setCurrentTime(),
            1000
        )
        this.interval = setInterval(
            () => this.checkAlarmClock(),
            1000)
    }

    componentWillUnmount() {
        clearInterval(this.clock);
        clearInterval(this.interval);
    }

    setCurrentTime() {
        let mom = moment()
        this.setState({
            currentTime: mom.tz('Europe/Moscow').format('HH:mm')
        });
    }

    setAlarmTime(text) {
        console.log(moment(text, 'HH:mm:ss'))
        this.setState({
            alarmTime: moment(text, 'HH:mm:ss')
        })
    }

    checkAlarmClock() {
        if (!moment(this.state.alarmTime).isValid() || !this.state.alarmTime) {
          console.log("No alarm right now")
        } else {
           console.log(`Your alarm is set for ${this.state.alarmTime.format('HH:mm')}`)
            if (this.state.currentTime === this.state.alarmTime) {
                console.log("its time!");
            }
        }
    }

}
