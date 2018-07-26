/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    SwipeableFlatList,
    TouchableHighlight
} from 'react-native';


type Props = {};
const CITY_NAMES = ['北京', '上海', '广州', '深圳', '湖南', '四川', '湖北',];

export default class SwipeableFlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES,
        }
    }

    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true
            });
        }

        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
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

    genQuickActions() {
        return <View style={styles.quickContainer}>
            <TouchableHighlight
                onPress={() => {
                    alert("确认删除")
                }
                }
            >

                <View style={styles.quick}>
                    <Text style={styles.text}>
                        删除
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    }

    _renderItem(data) {
        return <View style={styles.item}>
            <Text style={styles.text}>
                {data.item}
            </Text>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    data={this.state.dataArray}
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
                    onEndReached={() => {
                        this.loadData();
                    }}

                    renderQuickActions={() => this.genQuickActions()}
                    maxSwipeDistance={100}
                    bounceFirstRowOnMount={false}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    item: {
        backgroundColor: '#169',
        height: 100,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    indictorContainer: {
        alignItems: 'center'
    },
    indictor: {
        color: 'red',
        margin: 10
    },
    quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        width: 200
    },
    quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15
    }
});
