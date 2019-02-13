import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
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

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A nested details Screen')
    };
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'default');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {otherParam}</Text>
        <Button
          title='Go to details... again'
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title='Go to Home'
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title='Go back'
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title='Update the title'
          onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />

      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#697a96',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }

  }
);

const Home = createStackNavigator(
  {
    Feed: ExampleScreen,
  }
)

const AppContaianer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContaianer />;
  }
}