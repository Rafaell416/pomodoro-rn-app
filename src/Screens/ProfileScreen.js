import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet
} from 'react-native'
import { SecureStore } from 'expo'
import Header from '../Components/Header'
import ActionButton from '../Components/ActionButton'
import TouchableIcon from '../Components/TouchableIcon'

export default class ProfileScreen extends Component {
  constructor(props){
    super(props)
  }

  _logOut = async () => {
    await SecureStore.deleteItemAsync('access-token')
    await SecureStore.deleteItemAsync('uid')
    this.props.navigation.navigate('AuthenticationStack')
  }

  render () {
    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          titleColor="#e74c3c"
          left={
            <TouchableIcon
              name='arrow-left'
              size={30}
              color='#e74c3c'
              actionToExecuteWhenPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <View style={styles.topView}>
          <View style={styles.profileInfoView}>
            <View style={styles.profileImageView}>
              <Image fadeDuration={0} style={styles.profileImage} source={{uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </View>
            <Text style={styles.username}>Rafa</Text>
            <Text style={styles.email}>rvillarreal416@gmail.com</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <ActionButton
            text="LOG OUT"
            textColor="white"
            buttonColor="#e74c3c"
            actionToExecuteWhenPress={() => this._logOut()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topView: {
    width: '100%',
    height: 200,
  },
  profileInfoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: null,
    width: null,
    flex: 1
  },
  username: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0f705d'
  },
  email: {
    marginTop: 5,
    color: '#00a887',
    fontSize: 18
  },
  profileImageView: {
    borderRadius: 50,
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor: '#1abc9c',
    overflow: 'hidden'
  },
  bottomView: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
