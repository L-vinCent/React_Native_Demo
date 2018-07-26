/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FlatListDemo from './pages/FlatListDemo'
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo'
import SectiontionListDemo from './pages/SectiontionListDemo'
import {StackNavigator} from 'react-navigation'

const APPRoot = StackNavigator({
    App: {
        screen: App,
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    },
    SwipeableFlatListDemo: {
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: 'SwipeableFlatListDemo'
        }
    },

    SectiontionListDemo: {
        screen: SectiontionListDemo,
        navigationOptions: {
            title: 'SectiontionListDemo'
        }
    },
});

AppRegistry.registerComponent(appName, () => APPRoot);
