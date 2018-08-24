import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, ListView, RefreshControl,FlatList,Alert,DeviceEventEmitter} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository,{FLAG_STORAGE} from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from "../common/BaseComponent";
import RepositoryCell from "../common/RepositoryCell";
import RepositoryDetail from './RepositoryDetail'
import ProjectModel from "./ProjectModel";
import FavoriteDao from "../expand/dao/FavoriteDao";
import Utils from "./util/Utils";
import ArrayUtils from "./util/ArrayUtils";


export const ppDevice = '123123';


export default class FavoritePage extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
        
        }

    }

    componentDidMount() {

    }


  
    render() {

        let content = 

               
                <FavoriteTab tabLabel = '收藏' {...this.props}/>


        return (


            <View style={styles.container}>
                <NavigationBar
                    title='收藏'
                    style={{backgroundColor: '#2196F3'}}

                />
                {content}


            </View>

        );
    }
}

class FavoriteTab extends BaseComponent {
    


    constructor(props) {
        super(props)
        
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.favoriteStateChange = false;
        this.unFavoriteItems = [];
        this.state = {
            result: '',
            isLoading: false,
            favoriteKeys:[],
            projectsModels:[],
        }
    }



    componentDidMount() {

        this.loadData();
        this.listener=DeviceEventEmitter.addListener(ppDevice,()=>{
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
            this.loadData();
        }
    }

    onSelect(item) {

        this.props.navigation.navigate('RepositoryDetail', {item: item, ...this.props})

    }



    loadData() {

        this.setState({
            isLoading: true
        })
        
      this.favoriteDao.getAllItems()
          .then((items)=>{
              var resultData = [];
              for (var i = 0, len = items.length; i < len; i++) {
                  resultData.push(new ProjectModel(items[i],true))
              }
              this.updateState({
                  isLoading:false,
                  projectModels:resultData,
              })
              })
          .catch(e=>{
              this.updateState({
                  
                      isLoading:false

                  }
              )
          })
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);

    }


    onFavorite(item,isFavorite){

        if (isFavorite){
            this.favoriteDao.saveFavoriteItem(item.id.toString(),JSON.stringify(item))
        } else
        {
            this.favoriteDao.removeFavoriteItem(item.id.toString());
        }
        
        ArrayUtils.updateArray(this.unFavoriteItems,item);
        if (this.unFavoriteItems.length>0) {
            DeviceEventEmitter.emit('favoriteChanged_popular');
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
