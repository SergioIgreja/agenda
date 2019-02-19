import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';

export default class ResetIcon extends React.Component {
  render() {
    return (
      <Icon
        name="md-refresh"
        style={{alignSelf: 'flex-end', paddingRight: 10}}
        size={60}
      />
    )
  }
}