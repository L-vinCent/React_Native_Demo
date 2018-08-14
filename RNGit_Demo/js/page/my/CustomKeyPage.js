import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Image,Alert} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../util/ViewUtils";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'
import ArrayUtils from "../util/ArrayUtils";

export default class CustomKeyPage extends Component {
    constructor(props) {

        super(props);
        this.changeValues = [];
        this.state = {
            dataArray: [],
        }
    }


    LoadData() {
        this.LanguageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);

        this.LoadData();
    }

    onSave() {
        if(this.changeValues.length===0){
            this.props.navigation.pop()
            return;
        }
        this.LanguageDao.save(this.state.dataArray);
        this.props.navigation.pop()
    }

    onBack() {
        if(this.changeValues.length===0){

            this.props.navigation.pop()
            return;
        }

        Alert.alert('提示','要保存修改?',[
            {text:'不保存',onPress:()=>{this.props.navigation.pop()},style:'cancel'},
            {text:'保存',onPress:()=>{this.onSave()},style:'OK Pressed'},
        ])

    }
    renderView() {
        let len = this.state.dataArray.length;

        if (!this.state.dataArray || len === 0) return null;
        let views = [];
        for (let i = 0; i < parseInt(len / 2); i++) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i * 2])}
                        {this.renderCheckBox(this.state.dataArray[i * 2 + 1])}

                    </View>
                    <View style={styles.line}></View>

                </View>


            )
        }
        if (len % 2) {
            views.push(
                <View key={len - 1}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[len - 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        return views;

    }

    onClick(data) {

        data.checked=!data.checked;
        ArrayUtils.updateArray(this.changeValues,data)
        this.setState({})


    }


    renderCheckBox(data) {
        let leftText = data.name;
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data)}
            isChecked={data.checked}
            leftText={leftText}
            unCheckedImage={<Image style={{tintColor: '#2196F3'}}
                                   source={require('./img/ic_check_box_outline_blank.png')}/>}
            checkedImage={<Image style={{tintColor: '#2196F3'}} source={require('./img/ic_check_box.png')}/>}


        />
    }

    render() {

        return (

            <View style={styles.container}>

                <NavigationBar
                    title='自定义标签'
                    style={{backgroundColor: '#2196F3'}}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={ViewUtils.getRightButton("保存", () => this.onSave())}
                />

                <ScrollView>
                    {/*<Text style={styles.welcome}>CustomKeyPage</Text>*/}
                    {this.renderView()}
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

    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
