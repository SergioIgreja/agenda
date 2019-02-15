import React from 'react';
import { Image } from 'react-native';
import images from 'res/images';

class SettingsIcon extends React.Component {
    render() {
      return (
        <Image
          source={images.settings}
          style={{ flex: 1, width: 50, height: 50, marginRight: 3 }}
          resizeMode='contain'
        />
      )
    }
  }

export default SettingsIcon;