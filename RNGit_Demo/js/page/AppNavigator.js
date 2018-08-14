import React from 'react'
import {StackNavigator} from 'react-navigation'
import WelcomePage from "./WelcomePage"
import HomePage from "./HomePage"
import FavoritePage from './FavoritePage'
import TrendingPage from './TrendingPage'
import MyPage from './my/MyPage'
import CustomKeyPage from './my/CustomKeyPage'
import SortKeyPage from './my/SortKeyPage'
import RepositoryDetail from './RepositoryDetail'
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
        },
        CustomKeyPage:{
            screen:CustomKeyPage,
        },
        SortKeyPage:{
            screen:SortKeyPage,
        },
        RepositoryDetail:{
            screen:RepositoryDetail,
        }
    }, {
        navigationOptions: {
            header: null
        }
    }
)