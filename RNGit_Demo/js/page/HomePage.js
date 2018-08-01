/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, DeviceEventEmitter} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import BaseComponent from "../common/BaseComponent";
import ThemeFactory, {ThemeFlags} from "../../res/styles/ThemeFactory";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export const FLAG_TAB = {
    flag_popularTab: 'tb_popular',
    flag_trendingTab: 'tb_trending',
    flag_favoriteTab: 'tb_favorite',
    flag_my: 'tb_my',
};

export const EVENT_TYPE_HOME_TAB_SELECT = "home_tab_select";

export const ACTION_HOME = {
    A_SHOW_TOAST: 'showToast', A_RESTART: 'restart', A_THEME: 'theme',
    A_HOME_TAB_SELECT: 'home_tab_select'
};


export default class HomePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        let selectedTab = this.params.selectedTab ? this.params.selectedTab : 'tb_popular';
        this.state = {
            selectedTab: selectedTab,
            theme: this.params.theme || ThemeFactory.createTheme(ThemeFlags.Default),
        }

    }

    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                title={title}
                renderIcon={() => <Image style={styles.image} source={renderIcon}/>}
                renderSelectedIcon={() => <Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]}
                                                 source={renderIcon}/>}
                onPress={() => this.onTabClick(this.state.selectedTab, selectedTab)}
            >

                <Component {...this.props} theme={this.state.theme}/>

            </TabNavigator.Item>
        )
    }

    onTabClick(from, to) {
        this.setState({selectedTab: to})
        DeviceEventEmitter.emit(EVENT_TYPE_HOME_TAB_SELECT, from, to)
    }

    render() {

        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(PopularPage, FLAG_TAB.flag_popularTab, '最热', require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, FLAG_TAB.flag_trendingTab, '趋势', require('../../res/images/ic_trending.png'))}
                    {this._renderTab(FavoritePage, FLAG_TAB.flag_favoriteTab, '收藏', require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MyPage, FLAG_TAB.flag_my, '我的', require('../../res/images/ic_my.png'))}
                </TabNavigator>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        width: 26,
        height: 26,
    },

});
