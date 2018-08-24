import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import keys from '../../../res/data/keys'

export var FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {

    constructor(flag) {

        this.flag = flag;
        this.FavoriteFlag = FAVORITE_KEY_PREFIX + flag;

    }

    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error) => {

            if (!error) {
                this.updateFavoriteKeys(key,true);
            }
        })
    }

    removeFavoriteItem(key){
        AsyncStorage.removeItem(key,(error) => {

            if (!error) {
                this.updateFavoriteKeys(key,false);
            }
        })
    }

    getFavorites(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.FavoriteFlag,(error,result)=>{
                if (!error){
                    try {
                        resolve(JSON.parse(result));
                    }catch (e) {
                        reject(e);
                    }
                } else
                {
                    reject(error);
                }

            })

        })
    }

    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.FavoriteFlag,(error,result)=>{
            if (!error){
                var favoriteKeys = [];
                if (result){
                    favoriteKeys  = JSON.parse(result);
                }

                var index = favoriteKeys.indexOf(key);

                if (isAdd){
                    if (index === -1) favoriteKeys.push(key);
                } else
                {
                    if (index !==-1) favoriteKeys.splice(index,1);
                }

                AsyncStorage.setItem(this.FavoriteFlag,JSON.stringify(favoriteKeys))
            }
        })
    }

    getAllItems(){

        return new Promise((resolve,reject)=>{

            this.getFavorites().then(keys=>{
                var items = [];
                if (keys){
                    AsyncStorage.multiGet(keys,(err,stores)=>{
                       try {
                           stores.map((result,i,store)=>{
                               let key = store[i][0];
                               let value = store[i][1];
                               if (value) items.push(JSON.parse(value));
                           })
                           resolve(items);
                       }catch (e) {
                           reject(e);
                       }
                    })
                }else
                {
                    resolve(items);
                }
            })
        })
    }

}

