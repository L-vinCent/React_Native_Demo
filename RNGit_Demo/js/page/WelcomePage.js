import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,

} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import NavigatorUtil from "./NavigatorUtil";
import ThemeDao from "./util/ThemeDao";
export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        SplashScreen.hide();

        new ThemeDao().getTheme().then((data)=>{
            this.theme = data;
        })

        this.timer = setTimeout(() => {
            NavigatorUtil.resetToHomePage({
                theme:this.theme,
                navigation: this.props.navigation,

            })

        }, 1000);
    }

    componentWillUnmount() {

        this.timer && clearTimeout(this.timer);
    }

    render() {
        return <View style={styles.container}>

            <Text style={styles.text}>欢迎</Text>

        </View>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    text:{
        textAlign:'center',
        justifyContent: 'center',
        fontSize:20,
    }

});