import React from 'react';
import { Image } from 'react-native';
import images from 'res/images';

class MenuIcon extends React.Component {
    render() {
      return (
        <Image
          source={images.menu}
          style={{ flex: 1, width: 40, height: 40, marginLeft: 3 }}
          resizeMode='contain'
        />
      )
    }
  }

export default MenuIcon;