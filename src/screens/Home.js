import  React  from 'react';
import { Text, Button, View, TouchableHighlight } from 'react-native';
import SettingsIcon from 'assets/components/SettingsIcon';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Agenda',
        headerRight: (
          <TouchableHighlight onPress={() => navigation.navigate('Settings')}>
            <SettingsIcon />
          </TouchableHighlight>
        ),
      }
    };

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title='Go to Details'
            onPress={() => {
              this.props.navigation.navigate('Details', {
                itemId: 86,
                otherParam: 'anything',
              });
            }}
          />
        </View>
      );
    }
  }

  export default HomeScreen;