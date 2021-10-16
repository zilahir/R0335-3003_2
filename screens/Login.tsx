import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { themeColors } from '../utils/consts';
import { createNewUser, User } from '../store/actions/createNewUser';

enum LoginState {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

interface Error {
  isPasswordCorrect: boolean,
  isUserExists: boolean,
}

const ErrorMessages = {
  isPasswordCorrect: "The password you provided must be at last 5 character long",
  isUserExists: "The user you provided already exists"
}

type IUser = Omit<User, 'userId'>

export default function ModalScreen() {

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordVerify, setPasswordVerify] = useState<string>('')
  const [activeScreen, setActiveScreen] = useState<LoginState>(LoginState.SIGNUP)
  const [error, setError] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Error>()
  const dispatch = useDispatch()
  const store = useSelector(store => store)

  useEffect(() => {
    console.log('store', store)
  }, [store])

  function handleScreenChange(selectedScreen: LoginState) {
    setActiveScreen(selectedScreen)
    setError(false)
  }

  function validateInput({userName, password}: IUser):boolean {
    const isUserExists = false
    const isPasswordCorrect = password.length >= 6

    return !isUserExists && isPasswordCorrect
  }

  const isActive = (thisState: LoginState) => thisState === activeScreen && styles.activeLoginState

  function handleOnSubmit(): void {
    if (activeScreen === LoginState.LOGIN) {
      // we are dispatcin login action
    } else if (activeScreen === LoginState.SIGNUP) {
      // clearing up perviously stored error's if there's any
      const isValid = validateInput({userName, password})
      // we are dispatching user creating action
      console.log('isValid', isValid)

      if (isValid) {
        // no error, we can create the new user
        // by dispatching it's action
        dispatch(createNewUser({
          userName,
          password,
        }))
      } else {
        setError(true)
      }
    }
  }

  interface IError {
    errorMessage: string
  }
  
  const ErrorItem = ({errorMessage}: IError) => (
    <View style={[styles.errorItem]}>
      <Text style={[styles.errorText]}>
        {errorMessage}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={[styles.loginStateContainer]}>
        <Pressable onPress={() => handleScreenChange(LoginState.LOGIN)} style={[isActive(LoginState.LOGIN)]}>
          <Text style={styles.title}>{LoginState.LOGIN}</Text>
        </Pressable>
        <Pressable style={[isActive(LoginState.SIGNUP)]} onPress={() => handleScreenChange(LoginState.SIGNUP)}>
          <Text style={styles.title}>{LoginState.SIGNUP}</Text>
        </Pressable>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      { 
        error && (
          <View style={[styles.errorContainer]}>
              <ErrorItem errorMessage="lorem ipsum dolor sit amet" />
          </View>
        )
      }
      <View style={[styles.inputContainer]}>
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
          onChangeText={(value) => setPassword(value)}
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
        <Pressable onPress={() => handleOnSubmit()} style={[styles.submitButton]}>
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
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '10%',
  },
  errorText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
  errorItem: {
    backgroundColor: themeColors.extraFeature,
    flex: 1,
    borderRadius: 10,
  },
  errorContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
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
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "600",
    textTransform: 'capitalize'
  },
  textInput: {
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: themeColors.textInputBgColor,
    borderRadius: 10,
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
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
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
