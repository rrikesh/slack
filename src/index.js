import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

import Tutorial from './containers/tutorial';

export default class WalkThrough extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Tutorial style={styles.mainContent} />
        <View style={[ styles.center, styles.footer]}>
          <TouchableHighlight style={[styles.btn, styles.round]} onPress={this.buttonPressed}>
              <Text style={styles.btnText}>Create a new Slack team</Text>
          </TouchableHighlight>
          <Text style={styles.footerText} >Sign in to an existing team</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1
 },
 center: {
   justifyContent: 'center',
   alignItems: 'center',
 },
 mainContent:{
   flex: 1,
 },
 footer: {
   flex: 1,
   maxHeight: 150,
   alignItems:'stretch',
 },
 btn: {
    backgroundColor: '#36a1ec',
    height: 52,
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:  { width: 4, height: 4},
    shadowColor: '#f1f1f1',
    shadowOpacity: .4
  },
  round:{
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white'
  },
  footerText:{
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '400',
    color: '#36a1ec'
  }
});
