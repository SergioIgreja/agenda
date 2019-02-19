import React from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Vibration,
} from 'react-native';

export default class AlarmsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            seconds: 10,
            countDown: false,
            interval: null,
            percentage: 0,
        };
    }

    reset() {
        this.setState({
            seconds: 10,
            countDown: false,
            interval: null,
            percentage: 0
        });
    }

    stopTimer() {
        clearInterval(this.state.interval);

        this.setState(prevState => {
            return {
                seconds: prevState.seconds,
                interval: null,
                countDown: false,
                percentage: prevState.percentage
            }
        })
    }

    calculatePercentage() {
        const percentageIncrease = 10;
        this.setState(prevState => {
            return {
                percentage: prevState.percentage + percentageIncrease
            }
        });
    }

    tick() {
        this.setState({
            seconds: this.state.seconds - 1
        })
        this.calculatePercentage()
        if(this.state.seconds === 0) {
            this.stopTimer();
            Vibration.vibrate();
            this.reset();
        }
    }

    startTimer() {
        let interval = setInterval(() => {
            if((this.state.seconds > 0 ) && this.state.countDown) {
                this.tick()
            }
        }, 1000);

        this.setState(prevState => {
            return {
                seconds: prevState.seconds,
                countDown: true,
                interval: interval
            };
        });
    }

    secondsToMinutes() {
        const minutes = Math.floor(this.state.seconds / 60);
        const seconds = this.state.seconds % 60;

        return `${minutes}:${seconds}`;
    }

    render() {
        return (
            <View style={styles.container}>
                <PercentageCircle radius={150} bgcolor='#000' color='#f39c12' borderWidth={20} percent={this.state.percentage} padding={10}>
                    <Text style={styles.time}>{this.secondsToMinutes()}</Text>
                </PercentageCircle>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={this.state.countDown ? styles.buttonDisabled : styles.button} onPress={() => this.startTimer()} disabled={this.state.countDown}>
                        <Text style={styles.text}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.countDown ? styles.button : styles.buttonDisabled} onPress={() => this.stopTimer()} disabled={!this.state.countDown}>
                        <Text style={styles.text}>Stop</Text>
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
        backgroundColor: '#f39c12',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        opacity: 1.0
    },
    buttonDisabled: {
        backgroundColor: '#f39c12',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        opacity: 0.3
    },
    text: {
        fontSize: 25,
    },
    progressLayer: {
        width: 300,
        height: 300,
        borderWidth: 10,
        borderRadius: 150,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
    }

});
