/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,SectionList, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator,TouchableHighlight} from 'react-native';


type Props = {};
const CITY_NAMES = [
    {data:['北京', '上海', '广州'],title:'一线'},
    {data:['湖南', '四川', '湖北'],title:'二线'},
    {data:['云南', '日本', '韩国'],title:'三线'}
    ]

export default class SectiontionListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES,
        }
    }

    loadData(refreshing) {
        if(refreshing){
            this.setState({
                isLoading: true
            });
        }

        setTimeout(() => {
            let dataArray = [];
            if(refreshing){
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            }else
            {
                dataArray=this.state.dataArray.concat(CITY_NAMES);
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false,
            })
        }, 2000)
    }

    genIndiactor() {
        return <View style={styles.indictorContainer}>
            <ActivityIndicator
                style={styles.indictor}
                size={'large'}
                animating={true}
                color={'red'}

            />
            <Text>正在加载更高</Text>

        </View>
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>
                {data.item}
            </Text>
        </View>
    }

    genQuickActions(){
        return <View>
            <TouchableHighlight>
                <View>
                    <Text style={styles.text }></Text>
                </View>
            </TouchableHighlight>
        </View>
    }

    _renderSectionHeader({section}){
            return <View style={styles.sectionHeader}>
                <Text style={styles.text}>{section.title}</Text>
            </View>
    }


    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}

                    refreshing={this.state.isLoading}
                    //
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            tintColor={'red'}
                            titleColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true);
                            }}
                        />
                    }
                    ListFooterComponent={() => this.genIndiactor()}
                    onEndReached={()=>{
                        this.loadData();
                    }}

                    renderSectionHeader={(data)=>this._renderSectionHeader(data)}
                    ItemSeparatorComponent={()=><View style={styles.separLine}></View>}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fafafa',

    },
    item: {
        height: 100,
        marginTop:10,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'gray',
        fontSize: 20,
    },
    indictorContainer: {
        alignItems: 'center'
    },
    indictor: {
        color: 'red',
        margin: 10
    },
    sectionHeader:{
        height:30,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
    },
    separLine:{
        height:1,
        backgroundColor:'gray',
        flex:1,
    }

});
