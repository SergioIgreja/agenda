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

export default class AlarmsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfSprints: 0,
            seconds: 10,
            countDown: false,
            interval: null,
            percentage: 0,
        };
    }

    reset() {
        clearInterval(this.state.interval);

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
        if (this.state.seconds === 0) {
            Vibration.vibrate();
            this.reset();
        }
    }

    startTimer() {
        let interval = setInterval(() => {
            if ((this.state.seconds > 0) && this.state.countDown) {
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

        return `${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'space-between', width: Dimensions.get('window').width}}>
                    <View style={styles.sprints}><Text style={styles.text}>{this.state.numberOfSprints}</Text></View>
                    <TouchableOpacity onPress={() => {this.reset()}}>
                        <ResetIcon></ResetIcon>
                    </TouchableOpacity>
                </View>
                <PercentageCircle radius={150} bgcolor='#000' color='#f39c12' borderWidth={20} percent={this.state.percentage}>
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
    sprints: {
        width: 45,
        height: 45,
        alignSelf:'flex-start',
        backgroundColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 9,
        borderRadius: 22.5
    }

});
