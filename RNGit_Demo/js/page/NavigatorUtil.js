import {NavigationActions, StackActions} from 'react-navigation'

export default class NavigatorUtil {

    static goBack(navigation) {
        navigation.goBack();
    }

    //跳转到首页,Reset方法会清除原来的路由记录，添加上新设置的路由信息, 可以指定多个action，index是指定默认显示的那个路由页面, 注意不要越界
    static resetToHomePage(params) {
        const {navigation,theme,selectedTab} = params;
        const resetAction = StackActions.reset({
            index: 0,
            action: [
                NavigationActions.navigate({

                })
            ]
        });
        // navigation.dispatch(resetAction);
        navigation.dispatch(NavigationActions.navigate({
            routeName:"HomePage",
            params:{
                theme: theme,
                selectedTab:selectedTab,
            },
            action:resetAction,
        }));

    }
}