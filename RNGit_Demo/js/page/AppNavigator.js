import React from 'react'
import {StackNavigator} from 'react-navigation'
import WelcomePage from "./WelcomePage"
import HomePage from "./HomePage"
import FavoritePage from './FavoritePage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'

export default AppNavigator = StackNavigator({

        WelcomePage: {
            screen: WelcomePage,
        },
        HomePage: {
            screen: HomePage,
        },
        FavoritePage:{
            screen: FavoritePage,
        },
        MyPage:{
            screen:MyPage,
        },
        TrendingPage:{

            screen:TrendingPage,
        }
    }, {
        navigationOptions: {
            header: null
        }
    }
)