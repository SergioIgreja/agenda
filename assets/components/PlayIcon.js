import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

export default class PlayIcon extends React.Component {
  render() {
    return (
      <Icon
        style={{ paddingRight: 20 }}
        name="md-play"
        size={60}
      />
    )
  }
}