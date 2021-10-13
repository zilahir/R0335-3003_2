import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react'
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { themeColors } from '../utils/consts';

export default function ModalScreen() {

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => setUserName(value)}
        />
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => setUserName(value)}
        />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
    marginVertical: 10,
    backgroundColor: themeColors.textInputBgColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
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
