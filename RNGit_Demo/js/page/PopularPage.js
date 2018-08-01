import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput,ListView} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import BaseComponent from "../common/BaseComponent";
import RepositoryCell from "../common/RepositoryCell";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
export default class PopularPage extends BaseComponent {
    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
        this.state = {
            result: ''
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <NavigationBar
                    title='最热'
                    style={{backgroundColor: '#6495ED'}}
                />
                <ScrollableTabView renderTabBar={() => <ScrollableTabBar/>}>
                    <PopularTab tabLabel="Java">JAVA</PopularTab>
                    <PopularTab tabLabel="ios">iOS</PopularTab>
                    <PopularTab tabLabel="Android">Android</PopularTab>
                    <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
                </ScrollableTabView>


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
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {

        this.loadData();
    }

    loadData() {
        let url = this.genUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({

                    dataSource:this.state.dataSource.cloneWithRows(result.items)
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
        return <RepositoryCell data={data}/>
    }
    render() {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>
                        this.renderRow(data)
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
