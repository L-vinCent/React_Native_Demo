import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput,ListView,RefreshControl} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from "../common/BaseComponent";
import RepositoryCell from "../common/RepositoryCell";
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import RepositoryDetail from './RepositoryDetail'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
export default class PopularPage extends BaseComponent {
    constructor(props) {
        super(props)
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            languages:[],
            
        }
    }

    componentDidMount(){

        this.LoadData();
    }

   
    LoadData() {
        this.LanguageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        let content = this.state.languages.length>0?
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                tabBarBackgroundColor='#2196F3'
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor = 'white'

                renderTabBar={() => <ScrollableTabBar/>}>
                {this.state.languages.map((result,i,arr)=>{
                    let lan=arr[i];
                    return lan.checked?<PopularTab {...this.props} tabLabel={lan.name}></PopularTab>:null;
                })}

            </ScrollableTabView>:null;

        return (


            <View style={styles.container}>
                <NavigationBar
                    title='最热'
                    style={{backgroundColor: '#2196F3'}}

                />
                {content}


            </View>

        );
    }
}

class PopularTab extends BaseComponent {
    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading:false
        }
    }

    componentDidMount() {

        this.loadData();
    }
    
    onSelect(item){

        this.props.navigation.navigate('RepositoryDetail',{item:item,...this.props})

    }
    
    loadData() {
        this.setState({
            isLoading:true
        })
        let url = this.genUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({

                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    genUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderRow(data){
        return <RepositoryCell 
            onSelect = {()=>this.onSelect(data)}
            key={data.id}
            data={data}/>
    }
    render() {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>
                        this.renderRow(data)
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.loadData()}
                        />
                    }
                />
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    tips: {
        fontSize: 29,
    }


});
