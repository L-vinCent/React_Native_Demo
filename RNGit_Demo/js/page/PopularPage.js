import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, ListView, RefreshControl,FlatList,Alert,DeviceEventEmitter} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository,{FLAG_STORAGE} from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from "../common/BaseComponent";
import RepositoryCell from "../common/RepositoryCell";
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from "./ProjectModel";
import FavoriteDao from "../expand/dao/FavoriteDao";
import Utils from "./util/Utils";
import ArrayUtils from "./util/ArrayUtils";
import {ppDevice} from "./FavoritePage";
import {DeviceEmitter_customerKey} from "./my/CustomKeyPage";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

type Props = {};
export default class PopularPage extends BaseComponent {
    constructor(props) {
        super(props)
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            languages: [],
            projectModels: [],
        }

    }

    componentDidMount() {

        this.LoadData();
        this.listener=DeviceEventEmitter.addListener(DeviceEmitter_customerKey,()=>{
            this.LoadData();
        })
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

        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                tabBarBackgroundColor='#2196F3'
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor='white'

                renderTabBar={() => <ScrollableTabBar/>}>
                {this.state.languages.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <PopularTab {...this.props} tabLabel={lan.name}></PopularTab> : null;
                })}

            </ScrollableTabView> : null;

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
        this.favoriteStateChange = false;
        this.unFavoriteItems = [];

        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            // dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
            favoriteKeys:[],
        }
    }

    componentDidMount() {

        this.loadData();
        this.listener=DeviceEventEmitter.addListener('favoriteChanged_popular',()=>{
            this.favoriteStateChange = true;
        })
    }

    componentWillUnmount() {
        if (this.listener){

            this.listener.remove();

        }
    }


    componentWillReceiveProps() {

        if (this.favoriteStateChange){
            this.getFavoriteKeys();
        }
    }

    onSelect(item) {

        this.props.navigation.navigate('RepositoryDetail', {item: item, ...this.props})

    }



    loadData() {
        this.setState({
            isLoading: true
        })
        let url = this.genUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.items = result && result.items?result.items:result?result:[];
                this.getFavoriteKeys();
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                    isLoading:false
                })
                alert(error)
            })
    }

    flushFavoriteState() {
        let projectModel = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModel.push(new ProjectModel(items[i], Utils.checkFavorite(
                items[i],
                this.state.favoriteKeys,
            )));
            // projectModel.push(new ProjectModel(items[i],true));
        }
        this.updateState({
            isLoading: false,
            projectModels:projectModel,
        })
    }

    getFavoriteKeys(){

        favoriteDao.getFavorites()
            .then(keys=>{
                if (keys){
                    this.updateState({favoriteKeys:keys})
                }
                this.flushFavoriteState();
            })
            .catch(e=>{
                this.flushFavoriteState();
            })

    }
    updateState(dic) {
        if (!this) return;
        this.setState(dic);

    }

    genUrl(key) {
        return URL + key + QUERY_STR;
    }

    onFavorite(item,isFavorite){

        if (isFavorite){
            favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item))
        } else
        {
            favoriteDao.removeFavoriteItem(item.id.toString());
        }

        ArrayUtils.updateArray(this.unFavoriteItems,item);
        
        if (this.unFavoriteItems.length>0) {
            DeviceEventEmitter.emit(ppDevice);
        }

    }

    renderRow(projectModel) {
        return <RepositoryCell
            onSelect={() => this.onSelect(projectModel)}
            key={projectModel.item.id}
            projectModel={projectModel}
            onFavorite={ (item,isFavorite)=>this.onFavorite(item,isFavorite)}
        />
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.projectModels}
                    renderItem={(data) =>
                        this.renderRow(data)
                    }
                    keyExtractor={item =>"" +item.item.id}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.loadData()}
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
