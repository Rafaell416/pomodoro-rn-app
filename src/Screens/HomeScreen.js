import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { SecureStore } from 'expo'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Snackbar } from 'react-native-paper'

import Header from '../Components/Header'
import Timer from '../Containers/Timer'
import PlayPauseButton from '../Containers/PlayPauseButton'
import TouchableIcon from '../Components/TouchableIcon'


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      snackBarMessage: '',
      snackBarVisible: false,
    }
  }

  componentDidMount () {
    const showWelcomeAlert = this.props.navigation.state.params ? this.props.navigation.state.params.showWelcomeAlert : false
    if (showWelcomeAlert) this.setState({ snackBarVisible: true, snackBarMessage: 'Welcome to pomodoro, we hope you to be productive :)' })
  }

  _handleChangeTimerType = async (type) => {
    const uid = await SecureStore.getItemAsync('uid')
    this.props.changeTimerTypeMutation({variables: { uid, type }})
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err))
  }

  _handleResetTimer = async () => {
    const uid = await SecureStore.getItemAsync('uid')
    this.props.resetTimerMutation({ variables: { uid } })
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err))
  }

  render () {
    const { snackBarMessage, snackBarVisible } = this.state
    return (
      <View style={styles.container}>
        <Header title="Pomodoro"
          left= {
            <TouchableIcon
              name='user'
              size={30}
              color='white'
              actionToExecuteWhenPress={() => this.props.navigation.navigate('ProfileScreen')}
            />
          }
        />
        <View style={[styles.flexView, styles.alignCenterView]}>
          <Timer />
        </View>
        <View style={[styles.flexView, styles.controlsView]}>
          <View style={[styles.flexView, styles.playPauseButtonView]}>
            <PlayPauseButton />
          </View>
          <View style={[styles.flexView, styles.modesButtonsView]}>
            <TouchableOpacity
              onPress={() => this._handleChangeTimerType('work')}
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="cpu"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleChangeTimerType('short_break')}
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="battery-charging"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Short Break</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleChangeTimerType('long_break')}
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="clock"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Long Break</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._handleResetTimer()}
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="refresh-cw"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
         visible={snackBarVisible}
         onDismiss={() => this.setState({ snackBarVisible: false })}
         duration={2000}
        >
         {snackBarMessage}
       </Snackbar>
      </View>
    )
  }
}

const changeTimerType = gql`
  mutation changeTimerType ($uid: String!, $type: String!) {
    timerChangeType (uid: $uid, type: $type) {
      type
      active
      duration
      minutes
      seconds
    }
  }
`

const resetTimer = gql`
  mutation resetTimer ($uid: String!) {
    timerReset(uid: $uid){
      type
      active
      duration
      minutes
      seconds
    }
  }
`

const changeLocalTimerType = gql`
  mutation changeLocalTimerType ($type: String!) {
    changeLocalTimerType (type: $type) @client
  }
`


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c'
  },
  flexView: {
    flex: 1,
  },
  alignCenterView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  playPauseButtonView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modesButtonsView: {
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8
  }
})

const HomeScreen = compose(
  graphql(resetTimer, { name: 'resetTimerMutation' }),
  graphql(changeTimerType, { name: 'changeTimerTypeMutation' }),
  graphql(changeLocalTimerType, { name: 'changeLocalTimerType' })
)(Home)

export default HomeScreen
