import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

export default class StopIcon extends React.Component {
  render() {
    return (
      <Icon
        style={{ paddingLeft: 20 }}
        name="md-pause"
        size={60}
      />
    )
  }
}