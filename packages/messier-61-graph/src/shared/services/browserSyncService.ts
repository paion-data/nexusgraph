// Copyright 2023 Paion Data. All rights reserved.
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const appIsInitialized = () => firebase.apps.length && firebase.apps.length > 0

export const authenticate = (dataToken: any, onSignout: any = null) => {
  return firebase
    .auth()
    .signInWithCustomToken(dataToken)
    .then(a => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user || !user.uid) {
          onSignout && onSignout()
        }
      })
      return a
    })
}

export const initialize = (config: any) => {
  if (appIsInitialized()) {
    return
  }

  return firebase.initializeApp(config)
}

export const status = () => {
  return firebase.database().ref('.info/connected')
}

export const getResourceFor = (userId: any) => {
  return firebase.database().ref(`users/${userId}`)
}

export const syncResourceFor = (userId: any, key: any, value: any) => {
  const userRef = firebase.database().ref(`users/${userId}`)
  userRef.child(key).set(value)
}

export const setupUser = (userId: any, initialData: any) => {
  firebase.database().ref(`users/${userId}`).set(initialData)
}

export const signOut = () => {
  if (appIsInitialized()) {
    firebase.auth().signOut()
  }
}
