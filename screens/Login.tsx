import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { themeColors } from '../utils/consts';
import { createNewUser, User } from '../store/actions/createNewUser';
import { authuser } from '../store/actions/auth'
import { findUserByUserName } from '../utils/api/findUser';
import { TopLevelState } from '../store/configureStore';
import { RootTabScreenProps } from '../types';

enum LoginState {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

interface Error {
  isPasswordCorrect?: boolean,
  doesPasswordMatch?: boolean
  isUserExists?: boolean,
  unAuth?: boolean
}

const ErrorMessages = {
  isPasswordCorrect: "The password you provided must be at last 5 character long",
  isUserExists: "The user you provided already exists",
  unAuth: "Incorrect login details! Please try again!",
  doesPasswordMatch: "Provided passwords are not matching"
}

type IUser = Omit<User, 'userId'>

export default function ModalScreen({navigation}: RootTabScreenProps<'Details'>) {

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordVerify, setPasswordVerify] = useState<string>('')
  const [activeScreen, setActiveScreen] = useState<LoginState>(LoginState.SIGNUP)
  const [error, setError] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Error>()
  const dispatch = useDispatch()
  const allUsers = useSelector((store: TopLevelState) => store.users.users)

  function handleScreenChange(selectedScreen: LoginState) {
    setActiveScreen(selectedScreen)
    setError(false)
  }

  function validateInput({userName, password}: IUser):boolean {
    const isUserExists = findUserByUserName(allUsers, userName.toLowerCase())
    let errorMessages = {} as Error
    const isPasswordCorrect = password.length >= 6
    const doesPassowrdMatch = password === passwordVerify
    console.log('passwordMatch', doesPassowrdMatch)
    if (isUserExists) {
      // this user already exists
      errorMessages.isUserExists = true
    }
    if (!isPasswordCorrect) {
      // the provided password is not correct
      errorMessages.isPasswordCorrect = false
    }

    // check whether the provided passwords are matches
    if (!doesPassowrdMatch) {
      errorMessages.doesPasswordMatch = false
    }
    // set the error messages
    setErrorMessages(errorMessages)
    return !isUserExists && isPasswordCorrect
  }

  const isActive = (thisState: LoginState) => thisState === activeScreen && styles.activeLoginState

  function handleOnSubmit(): void {
    if (activeScreen === LoginState.LOGIN) {
      // we are dispatcin login action
      const isUserExists = findUserByUserName(allUsers, userName.toLowerCase());
      if (isUserExists) {
        // creating new users
        // using our fake API
        // which is basically a non persistent Redux storage
        dispatch(authuser(isUserExists));
        // and navigation the user the only Protected Route we have
        navigation.navigate('Details')
      } else {
        setError(true)
        setErrorMessages({
          unAuth: true,
        })
      }
    } else if (activeScreen === LoginState.SIGNUP) {
      // clearing up perviously stored error's if there's any
      setError(false)
      const isValid = validateInput({userName, password})
      // we are dispatching user creating action

      if (isValid) {
        // no error, we can create the new user
        // by dispatching it's action
        dispatch(createNewUser({
          userName: userName.toLowerCase(),
          password,
        }))
        // show some message to the user about the success
        Alert.alert("Success", "You have successfull signed up, Now, you can login", [
          {
            text: 'OK',
            onPress: () => handleScreenChange(LoginState.LOGIN)
          }
        ])
        // clear the values
        setUserName('')
        setPassword('')
        setPasswordVerify('')
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
        error && errorMessages && (
          Object.keys(errorMessages).map((errorKey) => (
            <View key={errorKey} style={[styles.errorContainer]}>
              <ErrorItem errorMessage={ErrorMessages[errorKey as keyof typeof ErrorMessages] as string} />
            </View>
          ))
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
