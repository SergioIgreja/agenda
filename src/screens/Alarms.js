import React from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
} from 'react-native';

export default class AlarmsScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <PercentageCircle radius={150} bgcolor='#000' color='#f39c12' borderWidth={20} percent={40} padding={10}>
                    <Text style={styles.time}>25:00</Text>
                </PercentageCircle>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('start')}>
                        <Text style={styles.text}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('stop')}>
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
