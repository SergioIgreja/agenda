import React from 'react';
import {View, Text} from 'react-native'

class TasksScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Tasks</Text>
            </View>
        );
    }
}

export default TasksScreen;