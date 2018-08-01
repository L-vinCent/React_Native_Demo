import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';

export default class RepositoryCell extends Component{

    render(){
        return <View style={{margin:10}}>
            <Text>{this.props.data.full_name}</Text>
            <Text>{this.props.data.description}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Aythor:</Text>
                    <Image
                        style={{height:22,width:22}}
                        source={{uri:this.props.data.owner.avatar_url}}
                    />
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>Stars:</Text>
                    <Text>{this.props.data.stargazers_count}</Text>

                </View>
                <Image
                    style={{height:22, width:22}}
                    source={require('../../res/images/ic_star.png')}
                />
            </View>

        </View>
    }
}