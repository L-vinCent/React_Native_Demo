/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class PP_RNDemo extends Component {

  constructor(props){
    super(props)
    this.state={

        selectedTab:'home',

    }
  }

  render() {
      return <View style={styles.container}>
          <TabNavigator>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_polular'}
                  title="最热"
                  selectedTitleStyle={{color:'red'}}
                  renderIcon={() => <Image style={[styles.image]} source={require('./res/images/ic_polular.png')}/>}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}

                  // badgeText="1"
                  onPress={() => this.setState({selectedTab: 'tb_polular'})}>
                  <View style={styles.page1}></View>
              </TabNavigator.Item>

              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_trending'}
                  title="趋势"
                  selectedTitleStyle={{color:'yellow'}}
                  renderIcon={() => <Image style={[styles.image]} source={require('./res/images/ic_trending.png')}/>}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')}/>}
                  // renderBadge={() => <CustomBadgeView />}
                  onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                  <View style={styles.page2}></View>

              </TabNavigator.Item>

              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_favorite'}
                  title="收藏"
                  selectedTitleStyle={{color:'red'}}
                  renderIcon={() => <Image style={[styles.image]} source={require('./res/images/ic_polular.png')}/>}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}

                  // badgeText="1"
                  onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                  <View style={styles.page1}></View>
              </TabNavigator.Item>

              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_my'}
                  title="我的"
                  selectedTitleStyle={{color:'yellow'}}
                  renderIcon={() => <Image style={[styles.image]} source={require('./res/images/ic_trending.png')}/>}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')}/>}
                  // renderBadge={() => <CustomBadgeView />}
                  onPress={() => this.setState({selectedTab: 'tb_my'})}>
                  <View style={styles.page2}></View>

              </TabNavigator.Item>
          </TabNavigator>


      </View>;
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',

    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    image: {
        height: 22,
        width: 22,
    }

});

AppRegistry.registerComponent('PP_RNDemo', () => PP_RNDemo);
