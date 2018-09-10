import React, {Component} from 'react';
import {NativeEventEmitter,NativeModules,Platform, StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Image} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import CustomKeyPage from "./CustomKeyPage";
import ViewUtils from "../util/ViewUtils";
import {MORE_MENU} from "../../common/MoreMenu";
import GlobalStyles from "../../../res/styles/GlobalStyles"

import codePush from 'react-native-code-push'
var testObject = NativeModules.OpenNativeModule;


var NativeBridge = NativeModules.RNMethodTool;
const NativeModule = new  NativeEventEmitter(NativeModules.RNMethodTool)



export default class MyPage extends Component {
    constructor(props) {

        super(props)

    }

    update(){

        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix:'更新内容：',
                title:'更新',
                mandatoryUpdateMessage:'',
                mandatoryContinueButtonLabel:'更新',
            },
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
        });

    }
    componentDidMount() {
        NativeBridge.pp_startObserving();

        NativeModule.addListener('EventReminder',(data)=>{

            var dic = JSON.stringify(data);

            alert('我是 RN 弹框，原生 调用 RN方法' + '   ' + '原生带过来的参数'+ dic);

        })
    }


        componentWillUnmount(){
        NativeModule.remove();
        }


    onClick(tag) {
        switch (tag) {

            case MORE_MENU.Custom_Key:
                this.props.navigation.push('CustomKeyPage',{...this.params})

                break;

            case MORE_MENU.Sort_Key:

                this.props.navigation.push('SortKeyPage',{...this.params})

                break;

            case MORE_MENU.Custom_Language:

                NativeBridge.doSomething('RN传递的参数');

                break;
            case '更新':

                this.update();

                break;
        }

    }

    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(() => this.onClick(tag), icon, text, {tintColor: '#2196F3'}, null);
    }



    render() {



        var navigationBar =
            <NavigationBar
                title='我的'
                style={{backgroundColor: '#2196F3'}}
            />;

        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}

                <ScrollView>
                    <TouchableHighlight
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.item}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../res/images/ic_trending.png')}
                                       style={
                                           [{width: 40, height: 40, marginRight: 10}, {tintColor: '#2196F3'}]
                                       }
                                />
                                <Text>Github Popular</Text>
                            </View>
                            <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                   style={
                                       [{marginRight: 10, width: 22, height: 22}, {tintColor: '#2196F3'}]
                                   }
                            />

                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyles.line}/>

                    <Text style={styles.groupTitle}>标签管理</Text>

                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Key, require('./img/ic_custom_language.png'), '自定义标签')}

                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key, require('./img/ic_custom_language.png'), '语言排序')}

                    <Text style={styles.groupTitle}>交互</Text>

                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Language, require('./img/ic_custom_language.png'), '跳转到原生模块')}


                    <View style={GlobalStyles.line}/>
                    {this.getItem('更新', require('./img/ic_custom_language.png'), '热更新')}

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
        backgroundColor: 'white',
    },

    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray',
    }
});
