import * as React from 'react';
import { StyleSheet } from 'react-native';

import WelcomeScreen from '../components/WelcomeScreen';
import { Text, View } from '../components/Themed';
import DetailsScreen from './DetailsScreen';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <DetailsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
