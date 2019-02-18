import React from 'react';
import {View, Text, Card} from 'react-native'
import {} from 'react-native-elements'

class TasksScreen extends React.Component {
    render() {
        const date = new Date().toLocaleDateString();
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>date</Text>
            </View>
        );
    }
}

export default TasksScreen;