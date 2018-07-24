import  {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import React from 'react'
import {Button} from 'react-native'
import IonIcons from  'react-native-vector-icons/Ionicons'

export const AppTabNavigator = TabNavigator({

    Page1:{
        screen:Page1,
        navigationOptions:{
            tabBarLabel:'Page1',
            tabBarIcon:({tintColor,focused})=> (
                <IonIcons
                    name = {focused?'ios-home':'ios-home-outline'}
                    size = {26}
                    style = {{color:tintColor}}
                />

            ),

        }
    },

    Page2:{
        screen:Page2,
        navigationOptions:{
            tabBarLabel:'Page1',
            tabBarIcon:({tintColor,focused})=> (
                <IonIcons
                    name = {focused?'ios-people':'ios-people-outline'}
                    size = {26}
                    style = {{color:tintColor}}
                />

            ),

        }
    },


    });

export  const AppStackNavigator = StackNavigator({
    HomePage:{

        screen:HomePage,
        navigationOptions: {

            title:"Home",
        }
    },
    Page1:{

        screen:Page1,
        navigationOptions:({navigation})=>({

            title:`${navigation.state.params.name}页面名`,

        })
    },
    Page2:{

        screen:Page2,
        navigationOptions:(props)=> {

                title:"page2"
            }

    },
    Page3:{

        screen:Page3,
        navigationOptions:(props)=> {
            const {navigation}=props;
            const {state,setParams}=navigation;
            const {params}=state;
            return {
                title:params.title?params.title:'This is page3',
                headerRight:(
                <Button
                    title = {params.mode === 'edit'?'保存':'编辑'}
                    onPress={()=>{

                        setParams({mode:params.mode === 'edit'?"":"edit"})
                    }}
                />)
            }
        }
    },

    TabNav:{
        screen:AppTabNavigator,
        navigationOptions:{

            title:"AppTabNavigator",
        }
    }

});