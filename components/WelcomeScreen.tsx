import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import hexToRgba from 'hex-to-rgba'

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function WelcomeScreen() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          This is a React Native application written by Richard Zilahi
        </Text>

        <MonoText style={[styles.monoText]}>(laurea id: 2108162)</MonoText>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Use the <MonoText style={[styles.monoText, styles.highLighted]}>
            bottom navigator,
          </MonoText>
          Or Sign in on the top right corner
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monoText: {
    backgroundColor: hexToRgba('fdfd96', 1),
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  highLighted: {
    backgroundColor: hexToRgba('00c851', 0.5),
    marginHorizontal: 10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
