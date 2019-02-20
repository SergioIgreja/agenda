import React from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import {
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    StyleSheet,
    Vibration,
} from 'react-native';
import PlayIcon from "assets/components/PlayIcon";
import StopIcon from "assets/components/StopIcon";
import ResetIcon from "assets/components/ResetIcon";
import config from "../config"

export default class AlarmsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfSprints: 1,
            seconds: config.POMODORO_SPRINT_DURATION,
            countDown: false,
            interval: null,
            percentage: 0,
            break: false,
        };
    }

    //Total reset of the pomodoro clock
    reset() {
        clearInterval(this.state.interval);

        this.setState({
            seconds: config.POMODORO_SPRINT_DURATION,
            countDown: false,
            interval: null,
            percentage: 0,
            numberOfSprints: 0,
            break: false,
        });
    }

    //Reset some of the values (Used during the transition from sprint to break and viceversa)
    clear() {
        clearInterval(this.state.interval);
        this.setState({
                interval: null,
                countDown: false,
                percentage: 0,
        })
    }

    //Stops the timer be it in the sprint or the break
    stopTimer() {
        clearInterval(this.state.interval);

        this.setState(prevState => {
            return {
                seconds: prevState.seconds,
                interval: null,
                countDown: false,
                percentage: prevState.percentage,
            }
        })
    }

    //Increments the percentage to give visual feedback to the user
    incrementPercentage() {
        this.setState(prevState => {
            return {
                percentage: prevState.percentage + prevState.percentageIncrease
            }
        });
    }

    /*
        Called every second when the clock is active. Updates the seconds and the percentage.
        When the seconds reach zero it transitions between sprint/break and vibrates to give
        the user a physical feedback
    */
    tick() {
        this.setState({
            seconds: this.state.seconds - 1
        })
        this.incrementPercentage()
        if (this.state.seconds === 0) {
            Vibration.vibrate();
            this.clear();
            this.state.break ? this.pomodoro() : this.break();
        }
    }

    /*
        Starts the timer by setting an interval that calls the tick function every second.
        Updates the countDown and interval and calculates the percentage increase based on the
        seconds of the pomodoro sprint or break so it can be used to give visual feedback.
    */
    startTimer() {

        let interval = setInterval(() => {
            if ((this.state.seconds > 0) && this.state.countDown) {
                this.tick()
            }
        }, 1000);

        this.setState(prevState => {
            return {
                countDown: true,
                interval: interval,
                percentageIncrease: this.state.percentage === 0 ? 100 / this.state.seconds : prevState.percentageIncrease,
            }
        });
    }

    /*
        Updates the seconds to be a normal break or a long break based on the number of sprints done.
        These values can be altered at config.js.
    */
    break() {
        this.setState(prevState => {
            return {
                seconds: prevState.numberOfSprints === 4 ? config.POMODORO_LONG_BREAK_DURATION : config.POMODORO_BREAK_DURATION,
                break: true,
            }
        })
    }

    /*
        Similarly to the break function, it updates the seconds to be the sprint duration defined in 
        config.js.
        Increments the numberOfSprints or resets to 0 if the number of sprints reaches 4.
    */
    pomodoro() {
        this.setState(prevState => {
            return {
                seconds: config.POMODORO_SPRINT_DURATION,
                break: false,
                numberOfSprints: prevState.numberOfSprints === 4 ? 0 : prevState.numberOfSprints + 1,
            }
        })
    }

    //Auxiliary function to transform seconds to minutes and pads the result to get the format 01:02 / x 1:2
    secondsToMinutes() {
        const minutes = Math.floor(this.state.seconds / 60);
        const seconds = this.state.seconds % 60;

        return `${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    //Appends a 0 to the digit if the digit is less than 10, otherwise returns the number
    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                    <View style={styles.sprints}><Text style={styles.text}>{this.state.numberOfSprints}</Text></View>
                    <Text style= {styles.mode}>{this.state.break ? 'Break' : 'Sprint'}</Text>
                    <TouchableOpacity onPress={() => { this.reset() }}>
                        <ResetIcon></ResetIcon>
                    </TouchableOpacity>
                </View>
                <PercentageCircle radius={150} bgcolor={!this.state.break ? '#000' : '#f39c12'} color={!this.state.break ? '#f39c12' : '#000'} borderWidth={20} percent={this.state.percentage}>
                    <Text style={styles.time}>{this.secondsToMinutes()}</Text>
                </PercentageCircle>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => this.startTimer()} style={this.state.countDown ? styles.buttonDisabled : styles.button} disabled={this.state.countDown}>
                        <PlayIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.stopTimer()} style={!this.state.countDown ? styles.buttonDisabled : styles.button} disabled={!this.state.countDown}>
                        <StopIcon />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    time: {
        fontSize: 48,
        color: 'black'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1.0
    },
    buttonDisabled: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.3
    },
    text: {
        fontSize: 25,
    },
    mode: {
        fontSize: 40,
        alignSelf: 'center'
    },
    sprints: {
        width: 45,
        height: 45,
        alignSelf: 'flex-start',
        backgroundColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 9,
        borderRadius: 22.5
    }

});
