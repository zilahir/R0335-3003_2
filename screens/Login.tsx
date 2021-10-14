import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react'
import { Platform, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { themeColors } from '../utils/consts';

enum LoginState {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

export default function ModalScreen() {

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordVerify, setPasswordVerify] = useState<string>('')
  const [activeScreen, setActiveScreen] = useState<LoginState>(LoginState.SIGNUP)

  const isActive = (thisState: LoginState) => thisState === activeScreen && styles.activeLoginState

  return (
    <View style={styles.container}>
      <View style={[styles.loginStateContainer]}>
        <Pressable onPress={() => setActiveScreen(LoginState.LOGIN)} style={[isActive(LoginState.LOGIN)]}>
          <Text style={styles.title}>{LoginState.LOGIN}</Text>
        </Pressable>
        <Pressable style={[isActive(LoginState.SIGNUP)]} onPress={() => setActiveScreen(LoginState.SIGNUP)}>
          <Text style={styles.title}>{LoginState.SIGNUP}</Text>
        </Pressable>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TextInput
          placeholder="Username"
          style={[styles.textInput]}
          value={userName}
          onChangeText={(value) => setUserName(value)}
        />
        <TextInput
          placeholder="Password"
          style={[styles.textInput]}
          value={password}
          secureTextEntry
          onChangeText={(value) => setUserName(value)}
        />
        {
          activeScreen === LoginState.SIGNUP && (
            <TextInput
              placeholder="Verify Password"
              value={passwordVerify}
              style={[styles.textInput]}
              secureTextEntry
              onChangeText={(value) => setPasswordVerify(value)}
            />
          )
        }
        <Pressable style={[styles.submitButton]}>
          <Text style={styles.submitBtnText}>
            {LoginState[activeScreen]}
          </Text>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  activeLoginState: {
    backgroundColor: themeColors.minimumFeature,
    padding: 10,
    borderRadius: 10,
  },
  loginStateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "600",
    textTransform: 'capitalize'
  },
  textInput: {
    height: 40,
    width: 300,
    marginVertical: 10,
    paddingLeft: 10,
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
  submitButton: {
    backgroundColor: themeColors.minimumFeature,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    marginTop: 20,
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
