/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View,
    Linking,
    ViewPropTypes
} from 'react-native'


export const MORE_MENU = {
    Custom_Language: {name: '自定义语言', icon: require('../page/my/img/ic_custom_language.png')},
    Sort_Language: {name: '语言排序', icon: require('../page/my/img/ic_swap_vert.png')},
    Custom_Theme: {name: '自定义主题', icon: require('../page/my/img/ic_view_quilt.png')},
    Custom_Key: {name: '自定义标签', icon: require('../page/my/img/ic_custom_language.png')},
    Sort_Key: {name: '标签排序', icon: require('../page/my/img/ic_swap_vert.png')},
    Remove_Key: {name: '标签移除', icon: require('../page/my/img/ic_remove.png')},
    About_Author: {name: '关于作者', icon: require('../page/my/img/ic_insert_emoticon.png')},
    About: {name: '关于', icon: require('../../res/images/ic_trending.png')},
    Website: {name: 'Website', icon: require('../../res/images/ic_computer.png')},
    Feedback: {name: '反馈', icon: require('../../res/images/ic_feedback.png')},
    Share: {name: '分享', icon: require('../../res/images/ic_share.png')},
};
