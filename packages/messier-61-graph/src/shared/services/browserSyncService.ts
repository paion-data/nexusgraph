/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
