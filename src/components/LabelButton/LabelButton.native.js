import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './LabelButton.styles';

class LabelButton extends Component {
  render() {
    return (
      <View className={styles.labelButtonComponent}>
        <Text>==> That is a button&nbsp;</Text>
        <Button title="Hello button">Hello button</Button>
      </View>
    );
  }
}

export default LabelButton;
