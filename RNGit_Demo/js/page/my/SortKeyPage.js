import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight, Image, DeviceEventEmitter,Alert} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import CustomKeyPage from "./CustomKeyPage";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import ArrayUtils from "../util/ArrayUtils";
import SortableListView from 'react-native-sortable-listview'
import ViewUtils from "../util/ViewUtils";
import NavigatorUtil from "../NavigatorUtil";
import {ACTION_HOME, FLAG_TAB} from "../HomePage";


export default class SortKeyPage extends Component {
    constructor(props){

        super(props);
        this.dataArray=[];
        this.sortResultArray=[];
        this.originalCheckedArray=[];
        this.state = {
            checkedArray:[]
        }
    }

    componentDidMount() {
        this.languageDao = new  LanguageDao(FLAG_LANGUAGE.flag_key)
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
            })
            .catch(error=>{

            })
    }

    getCheckedItems(result){

        this.dataArray = result;
        let checkedArray = [];
        for (let i=0,len=result.length;i<len;i++){
            let  data =result[i];
            if(data.checked)checkedArray.push(data)
        }
        this.setState({

            checkedArray:checkedArray,

        })
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    onSave(haChecked) {
        if (!haChecked) {
            if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
                NavigatorUtil.goBack(this.props.navigation);
                return;
            }
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        NavigatorUtil.goBack(this.props.navigation);
    }

    onBack() {
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            Alert.alert(
                '提示',
                '是否要保存修改呢?',
                [
                    {
                        text: '否', onPress: () => {
                            NavigatorUtil.goBack(this.props.navigation);
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ]
            )
        } else {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, j = this.originalCheckedArray.length; i < j; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    render() {

        return (

            <View style={styles.container}>

                <NavigationBar
                    title='标签排序'
                    style={{backgroundColor: '#2196F3'}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={ViewUtils.getRightButton('保存',()=>this.onSave())}


                />

                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.params}/>}
                />
            </View>
        );
    }
}

class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[{
                    opacity: 1,
                    width: 16,
                    height: 16,
                    marginRight: 10,
                }]}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
